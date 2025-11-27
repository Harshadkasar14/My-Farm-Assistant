import express from "express";
import Area from "../models/area_detail.model.js";

const router = express.Router();

// GET /api/areas/:id
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findById(req.params.id).lean();

    if (!area) {
      return res.status(404).json({ error: "Area not found", areaId: req.params.id });
    }

    // Normalize ID keys for frontend consistency
    return res.json({
      id: area._id,
      ...area
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;

