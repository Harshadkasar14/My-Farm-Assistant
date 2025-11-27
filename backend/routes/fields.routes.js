// server/routes/fields.js
import express from "express";
import Field from "../models/fields.model.js";
import Area from "../models/area_detail.model.js";
import { InMemoryStore, genId } from "../server.js";

const router = express.Router();

// GET all fields
router.get("/", async (req, res) => {
  try {
    // If connected to Mongo
    if (Field.db.readyState === 1) {
      const fields = await Field.find().lean();
      const result = await Promise.all(
        fields.map(async (f) => {
          const areas = await Area.find({ fieldId: f._id });
          return {
            id: f._id,
            ...f,
            areas, // ← ADD THIS
            totalAreas: areas.length,
            totalCrops: areas.reduce(
              (s, a) => s + (a.cropInstancesCount || 0),
              0
            ),
            totalOverdue: areas.reduce(
              (s, a) => s + (a.overdueTasksCount || 0),
              0
            ),
          };
        })
      );
      return res.json(result);
    }

    // In-memory fallback
    const result = InMemoryStore.fields.map((f) => {
      const areas = InMemoryStore.areas.filter((a) => a.fieldId === f.id);
      
      return {
        ...f,
        areas,
        totalAreas: areas.length,
      };
    });
    return res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one field
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (Field.db.readyState === 1) {
      const f = await Field.findById(id).lean();
      if (!f) return res.status(404).json({ error: "Not found" });
      return res.json({ id: f._id, ...f });
    }

    const f = InMemoryStore.fields.find((x) => x.id === id);
    return f ? res.json(f) : res.status(404).json({ error: "Not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  const payload = req.body;

  if (Field.db.readyState === 1) {
    const doc = new Field(payload);
    await doc.save();
    return res.status(201).json({ id: doc._id, ...doc.toObject() });
  }

  const obj = { id: genId("f-"), ...payload };
  InMemoryStore.fields.push(obj);
  res.status(201).json(obj);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (Field.db.readyState === 1) {
    const updated = await Field.findByIdAndUpdate(id, req.body, {
      new: true,
    }).lean();
    return updated
      ? res.json({ id: updated._id, ...updated })
      : res.status(404).json({ error: "Not found" });
  }

  const idx = InMemoryStore.fields.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  InMemoryStore.fields[idx] = { ...InMemoryStore.fields[idx], ...req.body };
  res.json(InMemoryStore.fields[idx]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (Field.db.readyState === 1) {
    await Area.deleteMany({ fieldId: id });
    await Field.findByIdAndDelete(id);
    return res.json({ ok: true });
  }

  InMemoryStore.fields = InMemoryStore.fields.filter((f) => f.id !== id);
  InMemoryStore.areas = InMemoryStore.areas.filter((a) => a.fieldId !== id);
  res.json({ ok: true });
});

router.post("/:fieldId/areas", async (req, res) => {
  const { fieldId } = req.params;
  const payload = req.body;

  try {
    if (Area.db.readyState === 1) {
      const areaDoc = new Area({ ...payload, fieldId });
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
      const updated = await Area.findByIdAndUpdate(areaId, req.body, {
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
      await Area.findByIdAndDelete(areaId);
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
