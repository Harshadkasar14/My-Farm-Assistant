import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Sprout,
  Edit,
  Search,
  RefreshCcw,
  Droplets,
  AlertCircle,
} from "lucide-react";
import {
  apiGetArea,
  apiGetField,
  apiGetLibraryCrops,
  apiGetCropInstances,
  apiCreateCropInstance,
} from "../api/areaApi.js";

export default function AreaDetail() {
  const { areaId } = useParams();
  const navigate = useNavigate();

  const [area, setArea] = useState(null);
  const [field, setField] = useState(null);
  const [libraryCrops, setLibraryCrops] = useState([]);
  const [cropInstances, setCropInstances] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Drawer form state
  const [form, setForm] = useState({
    cropType: "library",
    libraryCropId: "",
    customName: "",
    instanceName: "",
    startDate: new Date().toISOString().split("T")[0],
  });

  // Load initial data
  useEffect(() => {
    loadAreaPage();
  }, [areaId]);

  async function loadAreaPage() {
    const areaData = await apiGetArea(areaId);
    setArea(areaData);

    const fieldData = await apiGetField(areaData.fieldId);
    setField(fieldData);

    const crops = await apiGetCropInstances(areaId);
    setCropInstances(crops);

    const lib = await apiGetLibraryCrops();
    setLibraryCrops(lib);
  }

  async function saveCrop() {
    const payload = {
      areaId,
      startDate: form.startDate + "T00:00:00Z",
      custom: form.cropType === "custom",
      name:
        form.cropType === "library"
          ? form.instanceName ||
            libraryCrops.find((c) => c._id === form.libraryCropId)?.nameEn +
              " - " +
              area.name
          : form.customName,
    };

    if (form.cropType === "library") {
      payload.libraryCropId = form.libraryCropId;
    }

    await apiCreateCropInstance(payload);

    setDrawerOpen(false);
    loadAreaPage();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{area?.name}</h1>
              <p className="text-sm text-gray-600">{field?.name} › {area?.name}</p>
            </div>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={16} /> Add Crop
          </button>
        </div>

        {/* INFO BOXES */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">Area Size</p>
            <p className="text-lg font-semibold">
              {area?.size} {area?.sizeUnit}
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">Crop Instances</p>
            <p className="text-lg font-semibold">{cropInstances.length}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">Pending Tasks</p>
            <p className="text-lg font-semibold">
              {cropInstances.reduce((count, ci) => count + (ci.pendingTasks || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* CROPS LIST */}
      <div className="bg-white border rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Crops in this Area</h2>
          <p className="text-sm text-gray-600">Manage crop instances and tasks</p>
        </div>

        <div className="p-6 space-y-4">
          {cropInstances.length === 0 ? (
            <div className="text-center py-8">
              <Sprout className="w-16 h-16 mx-auto text-green-600 opacity-50" />
              <h3 className="text-xl font-semibold mt-4">No crops yet</h3>
              <button
                onClick={() => setDrawerOpen(true)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              >
                Add First Crop
              </button>
            </div>
          ) : (
            cropInstances.map((ci) => (
              <div
                key={ci._id}
                className="border rounded-lg p-4 flex justify-between hover:shadow-md cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold">{ci.name}</h3>
                  
                  <p className="text-sm text-gray-600">
                    Started {new Date(ci.startDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
                

                <button className="p-2 rounded hover:bg-gray-100">
                  <Edit size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ADD CROP DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Crop</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {/* Crop type */}
              <div>
                <label className="block text-sm font-medium mb-2">Crop Type</label>
                <select
                  className="w-full border p-2 rounded"
                  value={form.cropType}
                  onChange={(e) => setForm({ ...form, cropType: e.target.value })}
                >
                  <option value="library">Library Crop</option>
                  <option value="custom">Custom Crop</option>
                </select>
              </div>

              {form.cropType === "library" && (
                <div>
                  <label className="text-sm font-medium">Select Library Crop</label>
                  <select
                    className="w-full border p-2 mt-1 rounded"
                    value={form.libraryCropId}
                    onChange={(e) => setForm({ ...form, libraryCropId: e.target.value })}
                  >
                    <option value="">Select Crop</option>
                    {libraryCrops.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {form.cropType === "custom" && (
                <div>
                  <label className="text-sm font-medium">Custom Crop Name</label>
                  <input
                    className="w-full border p-2 mt-1 rounded"
                    value={form.customName}
                    onChange={(e) => setForm({ ...form, customName: e.target.value })}
                  />
                </div>
              )}

              {/* Start Date */}
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  className="w-full border p-2 mt-1 rounded"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>

              {/* Instance Name */}
              <div>
                <label className="text-sm font-medium">Instance Name (Optional)</label>
                <input
                  className="w-full border p-2 mt-1 rounded"
                  value={form.instanceName}
                  onChange={(e) => setForm({ ...form, instanceName: e.target.value })}
                />
              </div>

              {/* Save Button */}
              <button
                onClick={saveCrop}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold"
              >
                Add Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
