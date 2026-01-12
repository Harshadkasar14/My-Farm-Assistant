import dotenv from "dotenv";
dotenv.config();

console.log("JWT_SECRET at startup:", process.env.JWT_SECRET);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cropLibraryRoutes from "./routes/cropLibrary.routes.js";
import fieldsRouter from "./routes/fields.routes.js";
import fieldDetail  from "./routes/fieldDetail.routes.js";
import areaRoutes from "./routes/area.routes.js";
import cropInstanceRoutes from "./routes/cropInstances.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/farm_assistant")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


  
export const InMemoryStore = {
  fields: [],
  areas: [],
};

export function genId(prefix = "") {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/crop-libraries", cropLibraryRoutes);
app.use("/api/fields", fieldsRouter);
app.use("/api/fieldDetails", fieldDetail);
app.use("/api/areas", areaRoutes);
app.use("/api/cropInstances", cropInstanceRoutes);


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
