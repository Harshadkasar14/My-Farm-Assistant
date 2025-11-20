import express from "express";
import Crop from "../models/crop.model.js";

const router = express.Router();

/* Get all crops */
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Create a crop */
router.post("/", async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.json(crop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
