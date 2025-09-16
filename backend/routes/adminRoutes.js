import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import ServiceRequest from "../models/serviceRequestModel.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { requireAdmin } from "../middleware/authMiddleware.js";

// Setup multer to handle multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// This middleware chain protects all routes in this file
router.use(ClerkExpressRequireAuth(), requireAdmin);

// ROUTE 1: Get all service requests
router.get("/requests", async (req, res) => {
  try {
    const allRequests = await ServiceRequest.find({})
      .populate("serviceId", "title formFields")
      .sort({ createdAt: -1 });
    res.status(200).json(allRequests);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ROUTE 2: Update the status of a request
router.put("/requests/:requestId/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (
      !["Pending", "Under Process", "Payment Due", "Completed"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.requestId,
      { status: status },
      { new: true }
    ).populate("serviceId", "title formFields");
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ROUTE 3: Add/Update invoice details for a request
// --- UPDATED: Added multer's `upload.none()` middleware ---
// This tells this specific route how to correctly parse FormData and find the 'amount'.
router.put("/requests/:requestId/invoice", upload.none(), async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount)
      return res.status(400).json({ message: "Amount is required." });

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.requestId,
      {
        "invoice.amount": parseFloat(amount),
        "invoice.paymentStatus": "Pending",
        status: "Payment Due",
      },
      { new: true }
    ).populate("serviceId", "title formFields");

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ROUTE 4: Admin uploads a document for a service request
router.post(
  "/requests/:requestId/upload",
  upload.single("document"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      // This is the intelligent file-handling logic from your client route.
      const uploadOptions = {
        folder: "admin-uploads", // Files are stored in a dedicated admin folder
        resource_type: "auto",
      };

      // If the uploaded file is NOT a standard image, we explicitly tell Cloudinary
      // to treat it as a 'raw' file. This is the key to making PDFs, DOCX, etc., work.
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
              .json({ message: "Error uploading file to cloud." });
          }

          const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.requestId,
            {
              $push: {
                adminDocuments: {
                  fileName: req.file.originalname,
                  filePath: result.secure_url,
                },
              },
            },
            { new: true }
          ).populate("serviceId", "title formFields");

          res.status(200).json(updatedRequest);
        }
      );
      uploadStream.end(req.file.buffer);
    } catch (error) {
      res.status(500).json({ message: "Server error during file upload." });
    }
  }
);

export default router;
