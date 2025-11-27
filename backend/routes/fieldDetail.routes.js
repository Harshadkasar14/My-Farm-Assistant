// server/routes/FieldDetails.js
import express from "express";
import FieldDetail from "../models/fieldDetail.model.js";
import { InMemoryStore, genId } from "../server.js";

const router = express.Router();

// GET FieldDetails
router.get("/", async (req, res) => {
  const { fieldId } = req.query;

  if (FieldDetail.db.readyState === 1) {
    const q = fieldId ? { fieldId } : {};
    const list = await FieldDetail.find(q).lean();
    return res.json(list.map((a) => ({ id: a._id, ...a })));
  }

  const list = fieldId
    ? InMemoryStore.FieldDetails.filter((a) => a.fieldId === fieldId)
    : InMemoryStore.FieldDetails;

  res.json(list);
});

// CREATE
router.post("/", async (req, res) => {
  const payload = req.body;

  if (FieldDetail.db.readyState === 1) {
    const doc = new FieldDetail(payload);
    await doc.save();
    return res.status(201).json({ id: doc._id, ...doc.toObject() });
  }

  const obj = { id: genId("a-"), ...payload };
  InMemoryStore.FieldDetails.push(obj);
  res.status(201).json(obj);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (FieldDetail.db.readyState === 1) {
    const updated = await FieldDetail.findByIdAndUpdate(id, req.body, {
      new: true,
    }).lean();
    return updated
      ? res.json({ id: updated._id, ...updated })
      : res.status(404).json({ error: "Not found" });
  }

  const idx = InMemoryStore.FieldDetails.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  InMemoryStore.FieldDetails[idx] = { ...InMemoryStore.FieldDetails[idx], ...req.body };
  res.json(InMemoryStore.FieldDetails[idx]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (FieldDetail.db.readyState === 1) {
    await FieldDetail.findByIdAndDelete(id);
    return res.json({ ok: true });
  }

  InMemoryStore.FieldDetails = InMemoryStore.FieldDetails.filter((a) => a.id !== id);
  res.json({ ok: true });
});

export default router;
