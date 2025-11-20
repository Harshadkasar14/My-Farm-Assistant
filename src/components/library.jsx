/*
FarmLibraryApp.jsx
React component version of the provided HTML page (frontend-only).

Instructions:
1. Put this file in your React project, e.g. src/components/FarmLibraryApp.jsx
2. In public/index.html add these script tags inside <head> (or install Tailwind properly):
   <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
   <script src="https://unpkg.com/lucide@latest"></script>
3. Import and render <FarmLibraryApp /> from your App.jsx or index.jsx.
4. The component uses Tailwind CSS classes directly. For production projects, set up Tailwind properly instead of the CDN.

This component contains sample data and implements:
- Search + category filter
- Crop cards grid
- Add custom crop drawer (UI only — adds to local state)
- Empty / error states
- User profile popover

Note: lucide icons will be replaced if lucide script is present in the page (we call window.lucide.replace()).
*/

import React, { useEffect, useMemo, useState } from "react";


export default function Library() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [libraryVersion] = useState("1.0");
  const [lastUpdated] = useState(new Date().toLocaleDateString());
  const [errorMode, setErrorMode] = useState(false);
  const [formValues, setFormValues] = useState({
    nameEn: "",
    nameTa: "",
    category: "",
    daysToMaturity: "",
    defaultCareTemplateId: "",
  });

  useEffect(() => {
    // Replace lucide icons if script available
    if (typeof window !== "undefined" && window.lucide && window.lucide.replace) {
      window.lucide.replace();
    }
  }, [crops, showDrawer, showPopover]);

  useEffect(() => {
  async function loadFromBackend() {
    try {
      const res = await fetch("http://localhost:5000/api/crops");
      const data = await res.json();
      setCrops(data);
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
      const matchesSearch = c.nameEn.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? c.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [crops, search, category, errorMode]);

  function openDrawer() {
    setFormValues({ nameEn: "", nameTa: "", category: "", daysToMaturity: "", defaultCareTemplateId: "" });
    setShowDrawer(true);
  }

  function closeDrawer() {
    setShowDrawer(false);
  }

 async function handleCreateCrop(e) {
  e.preventDefault();

  if (!formValues.nameEn.trim() || !formValues.category) {
    alert("Please provide English name and category.");
    return;
  }

  const newCrop = {
    nameEn: formValues.nameEn,
    nameTa: formValues.nameTa,
    category: formValues.category,
    daysToMaturity: formValues.daysToMaturity
      ? Number(formValues.daysToMaturity)
      : null,
    defaultCareTemplateId: formValues.defaultCareTemplateId || null,
  };

  try {
    const res = await fetch("http://localhost:5000/api/crops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCrop),
    });

    const savedCrop = await res.json();

    // Add to UI
    setCrops((prev) => [savedCrop, ...prev]);

    setShowDrawer(false);
  } catch (err) {
    console.error("Error creating crop", err);
    alert("Error: Could not save crop.");
  }
}


  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((s) => ({ ...s, [name]: value }));
  }

  return (
    <div className="bg-background min-h-screen text-gray-800">
      <a
        href="#pageContent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-1 rounded shadow-lg z-50"
      >
        Skip to main content
      </a>

      {/* User Profile Popover */}
      <div className={`absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50 ${showPopover ? "" : "hidden"}`}>
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          <div id="popoverUserAvatar" className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-medium">
            H
          </div>
          <div>
            <div id="popoverUserName" className="font-medium text-gray-900">Harshad</div>
            <div id="popoverUserEmail" className="text-xs text-gray-500">you@example.com</div>
          </div>
        </div>
        <div className="space-y-2">
          <button
            id="signOutButton"
            className="w-full flex items-center text-sm gap-2 px-3 py-2 text-left text-error hover:bg-red-50 focus:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-error rounded-md transition-colors"
          >
            <i data-lucide="log-out" className="w-4 h-4"></i>
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex">
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background" id="pageContent" role="main">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1">
                <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900 mb-2">Crop Library</h1>
                <p className="text-sm leading-[1.375rem] text-gray-600">Choose from our curated crop templates to quickly set up care schedules for your fields.</p>
              </div>
              <button
                id="addCustomCropBtn"
                onClick={openDrawer}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors font-medium"
              >
                <i data-lucide="plus" className="w-4 h-4"></i>
                Add Custom Crop
              </button>
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
                  <option value="tree">Tree</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                  <option value="grain">Grain</option>
                  <option value="flower">Flower</option>
                  <option value="other">Other</option>
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
              <article key={crop._id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-semibold">{crop.nameEn.charAt(0)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{crop.nameEn}</h3>
                        <p className="text-xs text-gray-500">{crop.nameTa}</p>
                      </div>
                      <div className="text-xs text-gray-500">{crop.category}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{crop.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          <div id="emptyState" className={`${!errorMode && filtered.length === 0 ? "flex" : "hidden"} flex-col items-center justify-center py-12 text-center`}>
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <i data-lucide="seedling" className="w-8 h-8 text-gray-400"></i>
            </div>
            <h3 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900 mb-2">No crops found</h3>
            <p className="text-gray-600 mb-4 max-w-md">Try adjusting your search or filter criteria, or add a custom crop to get started.</p>
            <button onClick={openDrawer} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors">
              <i data-lucide="plus" className="w-4 h-4"></i>
              Add Custom Crop
            </button>
          </div>

          {/* Error State */}
          <div id="errorState" className={`${errorMode ? "flex" : "hidden"} flex-col items-center justify-center py-12 text-center`}>
            <div className="w-16 h-16 bg-error/10 rounded-xl flex items-center justify-center mb-4">
              <i data-lucide="alert-circle" className="w-8 h-8 text-error"></i>
            </div>
            <h3 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900 mb-2">Library unavailable offline</h3>
            <p className="text-gray-600 mb-4 max-w-md">The crop library couldn't be loaded. You can still create custom crops for your fields.</p>
            <button onClick={openDrawer} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors">
              <i data-lucide="plus" className="w-4 h-4"></i>
              Add Custom Crop
            </button>
          </div>

          {/* Drawer */}
          {showDrawer && (
            <div id="customCropDrawer" className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={closeDrawer}></div>

              <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900">Add Custom Crop</h2>
                  <button id="closeCustomCropDrawer" onClick={closeDrawer} className="p-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-colors" aria-label="Close drawer">
                    <i data-lucide="x" className="w-5 h-5"></i>
                  </button>
                </div>

                <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
                  <form id="customCropForm" className="space-y-6" onSubmit={handleCreateCrop}>
                    <div>
                      <label htmlFor="cropNameEn" className="block text-sm font-medium text-gray-700 mb-2">English Name <span className="text-error">*</span></label>
                      <input type="text" id="cropNameEn" name="nameEn" required placeholder="e.g., Tomato" value={formValues.nameEn} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="cropNameTa" className="block text-sm font-medium text-gray-700 mb-2">Tamil Name (Optional)</label>
                      <input type="text" id="cropNameTa" name="nameTa" placeholder="e.g., தக்காளி" value={formValues.nameTa} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="cropCategory" className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-error">*</span></label>
                      <select id="cropCategory" name="category" required value={formValues.category} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
                        <option value="">Select category</option>
                        <option value="tree">Tree</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                        <option value="grain">Grain</option>
                        <option value="flower">Flower</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="daysToMaturity" className="block text-sm font-medium text-gray-700 mb-2">Days to Maturity (Optional)</label>
                      <input type="number" id="daysToMaturity" name="daysToMaturity" min="1" max="3650" placeholder="e.g., 90" value={formValues.daysToMaturity} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
                      <p className="text-sm text-gray-500 mt-1">Leave empty for perennial crops like trees</p>
                    </div>

                    <div>
                      <label htmlFor="defaultTemplate" className="block text-sm font-medium text-gray-700 mb-2">Default Care Template</label>
                      <select id="defaultTemplate" name="defaultCareTemplateId" value={formValues.defaultCareTemplateId} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors">
                        <option value="">Select existing template</option>
                      </select>
                      <p className="text-sm text-gray-500 mt-1">Choose a care template to apply default tasks</p>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <button type="button" id="cancelCustomCrop" onClick={closeDrawer} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors">Cancel</button>
                      <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors font-medium">Create Crop</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
