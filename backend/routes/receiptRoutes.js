import express from "express";
import PDFDocument from "pdfkit";
import ServiceRequest from "../models/serviceRequestModel.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

// Helper function to get the client's name from the form data
const getClientName = (formData) => {
  return (
    formData?.get("fullName") ||
    formData?.get("entityName") ||
    formData?.get("firmName") ||
    "Valued Client"
  );
};

// This route is protected. A user can only download their own receipt.
router.get(
  "/:requestId/download",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const { requestId } = req.params;
      const clerkUserId = req.auth.userId;

      // Security check: Find the request and ensure it belongs to the logged-in user
      const request = await ServiceRequest.findById(requestId).populate(
        "serviceId",
        "title"
      );
      if (!request || request.clerkUserId !== clerkUserId) {
        return res.status(404).send("Receipt not found or access denied.");
      }

      if (request.invoice?.paymentStatus !== "Paid") {
        return res
          .status(403)
          .send("Payment for this service is not complete.");
      }

      // --- PDF Generation using pdfkit ---
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      // Set headers to trigger a download in the browser
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="receipt-${request._id}.pdf"`
      );

      // Pipe the PDF output directly to the response stream
      doc.pipe(res);

      // --- UPDATED: Add a more professional PDF structure ---

      // Helper function for drawing horizontal lines
      const drawLine = (y) =>
        doc
          .strokeColor("#cccccc")
          .lineWidth(0.5)
          .moveTo(50, y)
          .lineTo(550, y)
          .stroke();

      // Header Section
      doc.fontSize(24).font("Helvetica-Bold").text("NK Consultancy", 50, 50);
      doc
        .fontSize(14)
        .font("Helvetica")
        .text("INVOICE / RECEIPT", { align: "right" });
      doc.moveDown(2);
      drawLine(doc.y);
      doc.moveDown();

      // Client and Invoice Details Section
      const clientName = getClientName(request.formData);
      doc.fontSize(12).font("Helvetica-Bold").text("Bill To:");
      doc.font("Helvetica").text(clientName);
      doc.text(
        `Client ID: ...${clerkUserId.substring(clerkUserId.length - 6)}`
      );

      const invoiceDetailsX = 350;
      doc
        .font("Helvetica-Bold")
        .text("Receipt #:", invoiceDetailsX, doc.y - 36); // Align with "Bill To"
      doc.font("Helvetica").text(`${request._id}`, { align: "right" });
      doc.font("Helvetica-Bold").text("Date of Issue:", invoiceDetailsX, doc.y);
      doc
        .font("Helvetica")
        .text(`${new Date(request.updatedAt).toLocaleDateString()}`, {
          align: "right",
        });
      doc.moveDown(2);
      drawLine(doc.y);
      doc.moveDown();

      // Services Table Header
      doc.font("Helvetica-Bold");
      doc.text("Service Description", 50, doc.y);
      doc.text("Amount", { align: "right" });
      doc.moveDown();
      drawLine(doc.y);
      doc.moveDown();

      // Services Table Row
      doc.font("Helvetica");
      doc.text(request.serviceId.title, 50, doc.y);
      doc.text(`Rs. ${request.invoice.amount.toFixed(2)}`, { align: "right" });
      doc.moveDown(2);
      drawLine(doc.y);
      doc.moveDown();

      // Total Section
      doc.font("Helvetica-Bold").text("Total Paid:", 350, doc.y);
      doc.text(`Rs. ${request.invoice.amount.toFixed(2)}`, { align: "right" });
      doc.moveDown(3);

      // Transaction Details Section
      doc.font("Helvetica-Bold").text("Transaction Details:");
      doc.font("Helvetica");
      doc.text(`Payment Method: Online (Razorpay)`);
      doc.text(`Transaction ID: ${request.invoice.paymentId}`);
      doc.text(`Order ID: ${request.invoice.razorpayOrderId}`);
      doc.moveDown(4);

      // Footer
      doc
        .fontSize(10)
        .text(
          "Thank you for your business! For any queries, please contact us.",
          { align: "center" }
        );

      // Finalize the PDF and end the stream
      doc.end();
    } catch (error) {
      console.error("Error generating PDF receipt:", error);
      res.status(500).send("Could not generate receipt.");
    }
  }
);

export default router;
