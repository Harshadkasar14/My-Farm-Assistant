import express from "express";
import { getAllCropLibraries } from "../controllers/cropLibrary.controller.js";

const router = express.Router();

router.get("/", getAllCropLibraries);

export default router;
