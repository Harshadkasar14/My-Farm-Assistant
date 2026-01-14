import express from "express";
import Area from "../models/area_detail.model.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authenticate);
// GET /api/areas/:id
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findOne({_id: req.params.id,userId: req.userId}).lean();

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

