
import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axiosApi.js";


function CropCard({ crop }) {
  const [expanded, setExpanded] = useState(false);

     useEffect(() => {
      if (window.lucide) {
        window.lucide.replace();
      }
     }, [expanded]);


  return (
    <article className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-semibold text-lg">
            {crop.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{crop.name}</h3>
                <p className="text-xs text-gray-500 italic">{crop.scientificName}</p>
              </div>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {crop.category}
              </span>
            </div>
            
            <div className="mt-3 flex gap-4 text-xs text-gray-500">
              {crop.totalDurationDays && (
                <span className="flex items-center gap-1">
                  <i data-lucide="calendar" className="w-3 h-3"></i>
                  {crop.totalDurationDays} days
                </span>
              )}
              {crop.stages && (
                <span className="flex items-center gap-1">
                  <i data-lucide="layers" className="w-3 h-3"></i>
                  {crop.stages.length} stages
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors text-sm font-medium"
        >
          <i data-lucide={expanded ? "chevron-up" : "chevron-down"} className="w-4 h-4"></i>
          {expanded ? "Hide Details" : "View Full Info"}
        </button>
      </div>

      {expanded && (
        <div className="border-t bg-gray-50/50 p-4 space-y-4">
          {/* Ideal Conditions */}
          {crop.idealConditions && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <i data-lucide="thermometer" className="w-4 h-4 text-primary"></i>
                Ideal Conditions
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {crop.idealConditions.soil && (
                  <div className="bg-white p-2 rounded border text-xs">
                    <p className="font-medium text-gray-700 mb-1">Soil</p>
                    <ul className="text-gray-500 space-y-0.5">
               {crop.idealConditions?.soil?.preferredType?.length > 0 && (
                  <li>
                    Type: {crop.idealConditions.soil.preferredType.join(", ")}
                  </li>
                )}

                      {crop.idealConditions.soil.pHRange && <li>pH: {crop.idealConditions.soil.pHRange}</li>}
                    </ul>
                  </div>
                )}
                {crop.idealConditions.climate && (
                  <div className="bg-white p-2 rounded border text-xs">
                    <p className="font-medium text-gray-700 mb-1">Climate</p>
                    <ul className="text-gray-500 space-y-0.5">
                      {crop.idealConditions.climate.temperatureRange && <li>{crop.idealConditions.climate.temperatureRange}</li>}
                      {crop.idealConditions.climate.sunlight && <li>{crop.idealConditions.climate.sunlight}</li>}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Planting */}
          {crop.planting && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <i data-lucide="sprout" className="w-4 h-4 text-primary"></i>
                Planting
              </h4>
              <div className="bg-white p-2 rounded border text-xs text-gray-500">
                {crop.planting.method && <p>Method: {crop.planting.method}</p>}
                {crop.planting.seedRate && <p>Seed Rate: {crop.planting.seedRate}</p>}
                {crop.planting.spacing && <p>Spacing: {crop.planting.spacing.rowToRow} × {crop.planting.spacing.plantToPlant}</p>}
              </div>
            </div>
          )}

          {/* Stages */}
          {crop.stages && crop.stages.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <i data-lucide="git-branch" className="w-4 h-4 text-primary"></i>
                Growth Stages
              </h4>
              <div className="space-y-2">
                {crop.stages.map((stage) => (
                  <div key={`${stage.stageName}-${stage.startDay}`} className="bg-white p-2 rounded border">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{stage.stageName}</span>
                      <span className="text-gray-400">Day {stage.startDay}-{stage.endDay}</span>
                    </div>
                    {stage.tasks && stage.tasks.length > 0 && (
                      <ul className="text-xs text-gray-500">
                        {stage.tasks.slice(0, 3).map((task) => (
                          <li key={`${task.title}-${task.taskType}`}>• {task.title}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Harvest */}
          {crop.harvestDetails && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <i data-lucide="scissors" className="w-4 h-4 text-primary"></i>
                Harvest
              </h4>
              <div className="bg-white p-2 rounded border text-xs text-gray-500">
                {crop.harvestDetails.harvestMethod && <p>Method: {crop.harvestDetails.harvestMethod}</p>}
                {crop.harvestDetails.averageYield && <p>Yield: {crop.harvestDetails.averageYield}</p>}
              </div>
            </div>
          )}

          {/* Tips */}
          {crop.generalTips && crop.generalTips.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <i data-lucide="lightbulb" className="w-4 h-4 text-primary"></i>
                Tips
              </h4>
              <ul className="bg-white p-2 rounded border text-xs text-gray-500 space-y-1">
                {crop.generalTips.map((tip) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}


export default function Library() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
 
  const [showPopover, setShowPopover] = useState(false);
  const [libraryVersion] = useState("1.0");
  const [lastUpdated] = useState(new Date().toLocaleDateString());
  const [errorMode, setErrorMode] = useState(false);
 

  useEffect(() => {
    // Replace lucide icons if script available
    if (typeof window !== "undefined" && window.lucide && window.lucide.replace) {
      window.lucide.replace();
    }
  }, [crops, showPopover]);

  useEffect(() => {
  async function loadFromBackend() {
    try {
      const res = await api.get("/api/crop-libraries");
      setCrops(res.data);
    } catch (err) {
      console.error("Error loading crops", err);
      setErrorMode(true);
    }
  }

  loadFromBackend();
}, []);


  const filtered = useMemo(() => {
    if (errorMode) return [];
    return crops.filter((c) => {
      const cropName = c.name || "";
      const matchesSearch = cropName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? c.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [crops, search, category, errorMode]);

 

 

  return (
    <div className="bg-background min-h-screen text-gray-800">

      <div className="flex">
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background" id="pageContent" role="main">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1">
                <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900 mb-2">Crop Library</h1>
                <p className="text-sm leading-[1.375rem] text-gray-600">Choose from our curated crop templates to quickly set up care schedules for your fields.</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg border-2 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <i data-lucide="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                  <input
                    type="text"
                    id="searchInput"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search crops by name..."
                    className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="sm:w-48">
                <select
                  id="categoryFilter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                >
                  <option value="">All Categories</option>
                  <option value="Tree">Tree</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Grain">Grain</option>
                  <option value="Flower">Flower</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Library Info Panel */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <i data-lucide="info" className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"></i>
              <div className="text-sm">
                <p className="text-gray-700 mb-1">
                  <strong>Library Version:</strong> <span id="libraryVersion">{libraryVersion}</span> • <strong>Last Updated:</strong> <span id="lastUpdated">{lastUpdated}</span>
                </p>
                <p className="text-gray-600">Pick a crop to get preset care tasks. You can always edit before saving to your field.</p>
              </div>
            </div>
          </div>

            {/* Crops Grid */}
            <div id="cropsGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {errorMode ? null : filtered.map((crop) => (
                <CropCard key={crop._id || crop.name} crop={crop} />
              ))}
            </div> 

          {/* Empty State */}
          <div id="emptyState" className={`${!errorMode && filtered.length === 0 ? "flex" : "hidden"} flex-col items-center justify-center py-12 text-center`}>
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <i data-lucide="seedling" className="w-8 h-8 text-gray-400"></i>
            </div>
            <h3 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900 mb-2">No crops found</h3>
            <p className="text-gray-600 mb-4 max-w-md">Try adjusting your search or filter criteria, or add a custom crop to get started.</p>
          </div>

          {/* Error State */}
          <div id="errorState" className={`${errorMode ? "flex" : "hidden"} flex-col items-center justify-center py-12 text-center`}>
            <div className="w-16 h-16 bg-error/10 rounded-xl flex items-center justify-center mb-4">
              <i data-lucide="alert-circle" className="w-8 h-8 text-error"></i>
            </div>
            <h3 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900 mb-2">Library unavailable offline</h3>
            <p className="text-gray-600 mb-4 max-w-md">The crop library couldn't be loaded. You can still create custom crops for your fields.</p>
          </div>



        </main>
      </div>
    </div>
  );
}


