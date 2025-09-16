import { clerkClient } from "@clerk/clerk-sdk-node";

// This middleware checks if the user has the 'admin' role in their Clerk metadata.
export const requireAdmin = async (req, res, next) => {
  try {
    // req.auth is populated by ClerkExpressRequireAuth
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    // Fetch the full user object from Clerk's API
    const user = await clerkClient.users.getUser(req.auth.userId);

    // Check the public metadata for the role
    if (user.publicMetadata?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not have admin privileges." });
    }

    // If the user is an admin, proceed to the next function in the chain
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    return res.status(500).json({ message: "Error verifying admin status." });
  }
};
