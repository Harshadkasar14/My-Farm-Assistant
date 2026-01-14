import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    type: {
      type: String, // once | interval
      enum: ["once", "interval"],
      required: true
    },
    day: Number,        // for "once"
    everyDays: Number  // for "interval"
  },
  { _id: false }
);

const TaskSchema = new mongoose.Schema(
  {
    taskType: {
      type: String, // watering, fertilizer, spraying, harvest, etc.
      required: true
    },
    title: {
      type: String,
      required: true
    },
    schedule: {
      type: ScheduleSchema,
      required: true
    },
    defaultQuantity: String,
    notes: String,
    commonPests: [String],
    commonDiseases: [String]
  },
  { _id: false }
);

const StageSchema = new mongoose.Schema(
  {
    stageName: {
      type: String,
      required: true
    },
    startDay: {
      type: Number,
      required: true
    },
    endDay: {
      type: Number,
      required: true
    },
    tasks: {
      type: [TaskSchema],
      default: []
    }
  },
  { _id: false }
);

const CropLibrarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    category: {
      type: String,
      required: true
    },

    scientificName: String,

    totalDurationDays: {
      type: Number,
      required: true
    },

    idealConditions: {
      soil: {
        preferredType: [String],
        pHRange: String,
        drainage: String,
        soilPreparation: [String]
      },
      climate: {
        temperatureRange: String,
        rainfall: String,
        sunlight: String
      }
    },

    planting: {
      method: String,
      seedRate: String,
      seedTreatment: [String],
      spacing: {
        rowToRow: String,
        plantToPlant: String
      },
      nurseryPeriodDays: Number,
      transplantingNotes: [String]
    },

    stages: {
      type: [StageSchema],
      required: true
    },

    harvestDetails: {
      firstHarvestDays: Number,
      harvestMethod: String,
      averageYield: String
    },

    postHarvest: {
      sorting: String,
      storage: String,
      shelfLife: String
    },

    generalTips: {
      type: [String],
      default: []
    },

    version: {
      type: Number,
      default: 1
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("LibraryCrop", CropLibrarySchema);
