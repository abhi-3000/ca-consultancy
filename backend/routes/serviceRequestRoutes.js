import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import ServiceRequest from "../models/serviceRequestModel.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ROUTE 1: Create a new service request
// PROTECTED: Only authenticated users can create a request.
// The ClerkExpressRequireAuth middleware runs first. If the user is authenticated,
// it attaches the user's session details to `req.auth`.
router.post("/", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { serviceId, formData } = req.body;

    if (!serviceId || !formData) {
      return res
        .status(400)
        .json({ message: "Service ID and form data are required." });
    }

    // We can trust req.auth.userId because the middleware has verified it.
    const newRequest = new ServiceRequest({
      clerkUserId: req.auth.userId,
      serviceId: serviceId,
      formData: formData,
    });

    await newRequest.save();
    res
      .status(201)
      .json({
        message: "Service request created successfully",
        request: newRequest,
      });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ROUTE 2: Get all requests for the currently logged-in user
// PROTECTED: Only authenticated users can access their own requests.
router.get("/my-requests", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    // The middleware guarantees that req.auth.userId is the authenticated user.
    // This query securely fetches ONLY the requests matching that user's ID.
    const requests = await ServiceRequest.find({ clerkUserId: req.auth.userId })
      .populate("serviceId", "title") // Replaces serviceId with the actual service document, but only includes name and description fields
      .sort({ createdAt: -1 }); // Show newest requests first

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- NEW ROUTE ---
// ROUTE 3: Client uploads a document for their own service request.
// PROTECTED: User must be authenticated and be the owner of the request.
// POST /api/requests/:requestId/upload
router.post(
  "/:requestId/upload",
  ClerkExpressRequireAuth(),
  upload.single("document"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      const { requestId } = req.params;
      const clerkUserId = req.auth.userId;

      const serviceRequest = await ServiceRequest.findById(requestId);
      if (!serviceRequest || serviceRequest.clerkUserId !== clerkUserId) {
        return res
          .status(403)
          .json({
            message: "Forbidden: You cannot upload files to this request.",
          });
      }

      // --- UPDATED LOGIC: Explicitly set resource_type for non-image files ---
      const uploadOptions = {
        folder: `client-uploads/${clerkUserId}`,
        // Default to 'auto', which is great for images and videos.
        resource_type: "auto",
      };

      // If the uploaded file is NOT a standard image, tell Cloudinary to treat it as a 'raw' file.
      // This is the key to ensuring PDFs, DOCX, XLSX, etc., work correctly.
      if (!req.file.mimetype.startsWith("image/")) {
        uploadOptions.resource_type = "raw";
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res
              .status(500)
              .json({ message: "Error uploading file to cloud storage." });
          }

          serviceRequest.clientDocuments.push({
            fileName: req.file.originalname,
            filePath: result.secure_url,
          });
          await serviceRequest.save();

          res.status(200).json(serviceRequest);
        }
      );

      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error("Server error during client file upload:", error);
      res.status(500).json({ message: "An unexpected server error occurred." });
    }
  }
);


export default router;

