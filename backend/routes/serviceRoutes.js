import express from "express";
import mongoose from "mongoose"; 
import Service from "../models/serviceModel.js";
import { sampleServices } from "../data/seedData.js"; // We will create this file next

const router = express.Router();

// GET /api/services - Fetches all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // --- ADDED VALIDATION ---
    // This is a professional check to ensure the ID from the URL is a valid MongoDB ObjectId format.
    // If not, we can immediately send a 404 without even querying the database.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Service not found" });
    }

    const service = await Service.findById(id);

    if (service) {
      res.json(service);
    } else {
      // If the ID format is valid but no service is found, it still means "not found".
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error fetching single service:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// --- THIS IS THE NEW SEED ROUTE ---
// POST /api/services/seed - A special route to populate the database
router.post("/seed", async (req, res) => {
  try {
    // Clear existing services to avoid duplicates
    await Service.deleteMany({});
    // Insert the new sample services
    const createdServices = await Service.insertMany(sampleServices);
    res
      .status(201)
      .json({
        message: "Database seeded successfully!",
        services: createdServices,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding database", error: error.message });
  }
});

export default router;

// // backend/routes/serviceRoutes.js
// const express = require("express");
// const router = express.Router();
// const Service = require("../models/serviceModel");

// // ROUTE 1: Get all services
// // GET /api/services
// router.get("/", async (req, res) => {
//   try {
//     const services = await Service.find({});
//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// // ROUTE 2: Create a new service (for admin)
// // POST /api/services
// router.post("/", async (req, res) => {
//   try {
//     // We will add admin-only protection to this later
//     const newService = new Service(req.body);
//     await newService.save();
//     res.status(201).json(newService);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating service", error: error.message });
//   }
// });

// module.exports = router;
