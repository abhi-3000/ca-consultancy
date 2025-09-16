import express from "express";
import User from "../models/userModel.js";
import { clerkAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sync", clerkAuth, async (req, res) => {
  // If we get here, clerkAuth middleware was successful.
  // The authenticated user's Clerk ID is available in req.auth.userId
  if (!req.body) {
    console.error(
      "Request body is missing. Ensure express.json() middleware is used before this route in your main server file."
    );
    return res.status(400).json({
      message: "Request body is missing. Server configuration error.",
    });
  }

  const clerkUserId = req.auth.userId;

  // We get the user's latest details from the request body, sent by the frontend.
  const { email, name, profilePhoto } = req.body;

  // Basic validation
  if (!email || !name) {
    return res
      .status(400)
      .json({ message: "Email and name are required for sync." });
  }

  try {
    // This is the "upsert" operation.
    // It's a single, efficient database command that says:
    // "Find a document with this clerkUserId. If you find it, update it
    // with this new data. If you don't find it, create a new document
    // with all of this data."
    const user = await User.findOneAndUpdate(
      { clerkUserId: clerkUserId }, // The condition to find the user
      {
        $set: {
          // The data to update or set for a new user
          email: email,
          name: name,
          profilePhoto: profilePhoto,
        },
      },
      {
        upsert: true, // CRITICAL: This enables the "create if not exists" behavior
        new: true, // Return the document after the update/creation
        runValidators: true, // Ensure our schema rules are applied
      }
    );

    console.log(`User synced successfully: ${user.name}`);

    // Send the complete user profile from our database back to the frontend
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during user sync in database:", error);
    res.status(500).json({ message: "Server error while syncing user." });
  }
});

module.exports = router;
