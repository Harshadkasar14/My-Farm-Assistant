// server/routes/fields.js
import express from "express";
import Field from "../models/fields.model.js";
import Area from "../models/area_detail.model.js";
import { InMemoryStore, genId } from "../server.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import CropInstance from "../models/cropInstance.model.js";

const router = express.Router();
router.use(authenticate);

// GET all fields
router.get("/", async (req, res) => {
  try {
    if (Field.db.readyState === 1) {
      const fields = await Field.find({ userId: req.userId }).lean();

      // get all fieldIds
      const fieldIds = fields.map(f => f._id);

      // get all areas for these fields
      const areas = await Area.find({
        fieldId: { $in: fieldIds },
        userId: req.userId
      }).lean();

      // get all areaIds
      const areaIds = areas.map(a => a._id);

      // 🔥 AGGREGATE CROP COUNTS
      const cropCounts = await CropInstance.aggregate([
        { $match: { areaId: { $in: areaIds }} },
        { $group: { _id: "$areaId", count: { $sum: 1 } } }
      ]);

      const cropCountMap = Object.fromEntries(
        cropCounts.map(c => [c._id.toString(), c.count])
      );

      // attach counts to areas
      const areasByField = {};
      areas.forEach(area => {
        area.cropInstancesCount = cropCountMap[area._id.toString()] || 0;

        if (!areasByField[area.fieldId]) {
          areasByField[area.fieldId] = [];
        }
        areasByField[area.fieldId].push(area);
      });

      // build final response
      const result = fields.map(f => {
        const fieldAreas = areasByField[f._id.toString()] || [];

        return {
          id: f._id,
          ...f,
          areas: fieldAreas,
          totalAreas: fieldAreas.length,
          totalCrops: fieldAreas.reduce(
            (s, a) => s + a.cropInstancesCount,
            0
          ),
        };
      });

      return res.json(result);
    }

    return res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one field
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (Field.db.readyState === 1) {
      const f = await Field.findOne({
        _id: id,
        userId: req.userId
      }).lean();

      if (!f) return res.status(404).json({ error: "Not found" });
      return res.json({ id: f._id, ...f });
    }

    const f = InMemoryStore.fields.find(
      x => x.id === id && x.userId === req.userId
    );

    return f ? res.json(f) : res.status(404).json({ error: "Not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// CREATE
router.post("/", async (req, res) => {
  const payload = req.body;

  if (Field.db.readyState === 1) {
    const doc = new Field({...payload,  userId: req.userId });
    await doc.save();
    return res.status(201).json({ id: doc._id, ...doc.toObject() });
  }

  const obj = { id: genId("f-"), ...payload };
  InMemoryStore.fields.push(obj);
  res.status(201).json(obj);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (Field.db.readyState === 1) {
    const updated = await Field.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    ).lean();

    return updated
      ? res.json({ id: updated._id, ...updated })
      : res.status(404).json({ error: "Not found" });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (Field.db.readyState === 1) {
    await Area.deleteMany({ fieldId: id, userId: req.userId });
    await Field.findOneAndDelete({ _id: id, userId: req.userId });
    return res.json({ ok: true });
  }
});



router.post("/:fieldId/areas", async (req, res) => {
  const { fieldId } = req.params;
  const payload = req.body;

  try {
    if (Area.db.readyState === 1) {
      const areaDoc = new Area({ ...payload, fieldId, userId: req.userId });
      await areaDoc.save();
      return res.status(201).json({ id: areaDoc._id, ...areaDoc.toObject() });
    }

    // In-memory
    const obj = { id: genId("a-"), fieldId, ...payload };
    InMemoryStore.areas.push(obj);
    return res.status(201).json(obj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/* UPDATE AREA */
router.put("/:fieldId/areas/:areaId", async (req, res) => {
  const { fieldId, areaId } = req.params;

  try {
    if (Area.db.readyState === 1) {
      const updated = await Area.findOneAndUpdate({_id: areaId, userId: req.userId}, req.body, {
        new: true,
      }).lean();

      return updated
        ? res.json({ id: updated._id, ...updated })
        : res.status(404).json({ error: "Area not found" });
    }

    // In-memory
    const idx = InMemoryStore.areas.findIndex((a) => a.id === areaId);
    if (idx === -1) return res.status(404).json({ error: "Area not found" });

    InMemoryStore.areas[idx] = {
      ...InMemoryStore.areas[idx],
      ...req.body,
    };

    return res.json(InMemoryStore.areas[idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* DELETE AREA */
router.delete("/:fieldId/areas/:areaId", async (req, res) => {
  const { fieldId, areaId } = req.params;

  try {
    if (Area.db.readyState === 1) {
      await Area.findOneAndDelete({ _id: areaId, userId: req.userId });
      return res.json({ ok: true });
    }

    // In-memory
    InMemoryStore.areas = InMemoryStore.areas.filter((a) => a.id !== areaId);

    return res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
