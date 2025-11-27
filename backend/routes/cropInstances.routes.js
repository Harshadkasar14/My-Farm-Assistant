import express from "express";
import CropInstance from "../models/cropInstance.model.js";

const router = express.Router();

router.get("/area/:areaId", async (req, res) => {
  const list = await CropInstance.find({ areaId: req.params.areaId }).lean();
  res.json(list);
});

router.post("/", async (req, res) => {
  const doc = new CropInstance(req.body);
  await doc.save();
  res.json({ success: true, cropInstance: doc });
});

export default router;
