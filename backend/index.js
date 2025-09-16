import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./db.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/services", serviceRoutes);
app.use("/api/requests", serviceRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/receipts", receiptRoutes);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/documents", documentRoutes);
// app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("CA Consultancy Platform API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
