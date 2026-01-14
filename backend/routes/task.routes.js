import express from "express";
import TaskOccurrence from "../models/taskOccurrence.model.js";
import CropInstance from "../models/cropInstance.model.js";
import Area from "../models/area_detail.model.js";
import Field from "../models/fields.model.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
// router.use(authenticate);

router.get("/today", async (req, res) => {
  const userId = req.userId;

  // normalize overdue
  await TaskOccurrence.updateMany(
    {
      userId,
      status: { $ne: "completed" },
      dueDate: { $lt: new Date() }
    },
    { status: "overdue" }
  );

  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);

  const todayEnd = new Date();
  todayEnd.setHours(23,59,59,999);

  // 🔥 MAIN QUERY (with joins)
  const tasks = await TaskOccurrence.aggregate([
    {
      $match: {
        userId,
        status: { $in: ["planned", "due", "overdue"] },
        dueDate: { $lte: todayEnd }
      }
    },
    {
      $lookup: {
        from: "cropinstances",
        localField: "cropInstanceId",
        foreignField: "_id",
        as: "crop"
      }
    },
    { $unwind: "$crop" },
    {
      $lookup: {
        from: "areas",
        localField: "crop.areaId",
        foreignField: "_id",
        as: "area"
      }
    },
    { $unwind: "$area" },
    {
      $lookup: {
        from: "fields",
        localField: "crop.fieldId",
        foreignField: "_id",
        as: "field"
      }
    },
    { $unwind: "$field" },
    {
      $project: {
        _id: 1,
        status: 1,
        dueDate: 1,
        scheduledDate: 1,

        cropName: "$crop.name",
        cropInstanceId: "$crop._id",

        areaName: "$area.name",
        areaId: "$area._id",

        fieldName: "$field.name",
        fieldId: "$field._id",

        templateId: 1
      }
    },
    { $sort: { dueDate: 1 } }
  ]);

  // Stats for top cards
  const stats = {
    overdue: tasks.filter(t => t.status === "overdue").length,
    dueToday: tasks.filter(
      t => t.dueDate >= todayStart && t.dueDate <= todayEnd
    ).length,
    thisWeek: tasks.filter(
      t => t.dueDate > todayEnd
    ).length,
    completedToday: 0
  };

  res.json({ stats, tasks });
});


router.get("/:taskId", async (req, res) => {
  const userId = req.userId;
  const { taskId } = req.params;

  const task = await TaskOccurrence.aggregate([
    { $match: { _id: taskId, userId } },
    {
      $lookup: {
        from: "cropinstances",
        localField: "cropInstanceId",
        foreignField: "_id",
        as: "crop"
      }
    },
    { $unwind: "$crop" },
    {
      $lookup: {
        from: "areas",
        localField: "crop.areaId",
        foreignField: "_id",
        as: "area"
      }
    },
    { $unwind: "$area" },
    {
      $lookup: {
        from: "fields",
        localField: "crop.fieldId",
        foreignField: "_id",
        as: "field"
      }
    },
    { $unwind: "$field" },
    {
      $lookup: {
        from: "tasktemplates",
        localField: "templateId",
        foreignField: "_id",
        as: "template"
      }
    },
    { $unwind: "$template" },
    {
      $project: {
        status: 1,
        dueDate: 1,
        scheduledDate: 1,

        cropName: "$crop.name",
        areaName: "$area.name",
        fieldName: "$field.name",

        taskType: "$template.taskType",
        recommendedQuantity: "$template.recommendedQuantity",
        defaultUnit: "$template.defaultUnit",
        templateName: "$template.name"
      }
    }
  ]);

  if (!task.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task[0]);
});


export default router;
