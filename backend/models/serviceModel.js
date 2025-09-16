import mongoose from "mongoose";

const formFieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g., "PAN Card Number"
    name: { type: String, required: true }, // e.g., "panNumber"
    fieldType: {
      type: String,
      enum: ["text", "email", "tel", "file", "date", "textarea"],
      required: true,
    },
    required: { type: Boolean, default: true },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    idealClients: [{ type: String }],
    deliverables: [{ type: String }],
    turnaroundTime: { type: String, required: true },
    formFields: [formFieldSchema], 
    price: {
      display: { type: String, required: true },
      amount: { type: Number, required: true }, 
    },
  },
  { timestamps: true }
); 

const Service = mongoose.model("Service", serviceSchema);

export default Service;
