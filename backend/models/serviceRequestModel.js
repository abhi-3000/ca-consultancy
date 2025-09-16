import mongoose from "mongoose";

// This schema defines the structure for storing uploaded document information
const documentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true }, // This will be the URL from Cloudinary
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const serviceRequestSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, index: true },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Under Process", "Payment Due", "Completed"],
      default: "Pending",
    },
    formData: {
      type: Map,
      of: String,
    },
    clientDocuments: [documentSchema],
    adminDocuments: [documentSchema],

    // --- UPDATED: This is the new, official structure for invoice data ---
    // This creates the 'invoice' object in your database documents.
    invoice: {
      amount: { type: Number }, // The field for the invoice amount
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
      filePath: { type: String }, // For the downloadable receipt PDF
      fileName: { type: String },
      razorpayOrderId: { type: String }, // To track Razorpay transactions
      paymentId: { type: String },
    },
  },
  { timestamps: true }
);

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

export default ServiceRequest;
