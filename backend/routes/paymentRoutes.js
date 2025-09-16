// Import necessary libraries and modules
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto"; // Node.js module for cryptographic functions
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import ServiceRequest from "../models/serviceRequestModel.js";

// Initialize the Razorpay client instance.
// It's a best practice to check if the environment variables exist to prevent crashes.
let razorpayInstance;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

const router = express.Router();

// ROUTE 1: Create a Razorpay Order
// This endpoint is called by the client's frontend when they click "Pay Now".
// It is protected, meaning only a logged-in user can create a payment order.
router.post("/create-order", ClerkExpressRequireAuth(), async (req, res) => {
  // If Razorpay keys are not configured on the server, return an error.
  if (!razorpayInstance) {
    return res
      .status(500)
      .json({ message: "Razorpay is not configured on the server." });
  }

  try {
    const { amount, requestId } = req.body;
    console.log(amount);
    const options = {
      amount: Math.round(amount * 100), // Razorpay requires the amount in the smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: `receipt_order_${requestId}`, // A unique receipt ID for your records
    };

    // Ask the Razorpay API to create an order
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).send("Error creating Razorpay order.");
  }
});

// ROUTE 2: Verify the payment after the client completes the checkout
// This is the most crucial step for security.
router.post("/verify", ClerkExpressRequireAuth(), async (req, res) => {
  if (!razorpayInstance) {
    return res
      .status(500)
      .json({ message: "Razorpay is not configured on the server." });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      requestId,
    } = req.body;
    console.log(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      requestId
    );
    // This is the cryptographic verification step recommended by Razorpay.
    // We create our own signature using the order details and our secret key.
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(body);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // If our generated signature matches the one from Razorpay, the payment is genuine.
    if (expectedSignature === razorpay_signature) {
      // If verification is successful, update the database.
      await ServiceRequest.findByIdAndUpdate(requestId, {
        "invoice.paymentStatus": "Paid",
        "invoice.razorpayOrderId": razorpay_order_id,
        "invoice.paymentId": razorpay_payment_id,
        status: "Under Process", // Automatically move the service to the next stage
      });
      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).send("Server error during payment verification.");
  }
});

export default router;
