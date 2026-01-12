import fs from "fs";
import path from "path";

const libraryPath = path.join(process.cwd(), "crop_libraries");

export function getAllCropLibraries(req, res) {
  try {
    const files = fs.readdirSync(libraryPath);

    const crops = files
      .filter(file => file.endsWith(".json"))
      .map(file => {
        const filePath = path.join(libraryPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        return {
          _id: data.id,
          name: data.name,
          category: data.category,
          scientificName: data.scientificName,
          totalDurationDays: data.totalDurationDays,
          description: data.description || ""
        };
      });

    res.json(crops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load crop library" });
  }
}
