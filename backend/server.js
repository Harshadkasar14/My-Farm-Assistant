import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cropRoutes from "./routes/crops.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/farm_assistant")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/crops", cropRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
