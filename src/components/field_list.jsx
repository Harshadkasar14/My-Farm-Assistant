import {
  Plus,
  Map,
  X,
  AlertTriangle,
  MapPin
} from "lucide-react";

export default function FieldsPageUI() {
  return (
    <div className="bg-background min-h-screen text-gray-800">

      {/* Skip Link */}
      <a
        href="#pageContent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-1 rounded shadow-lg z-50"
      >
        Skip to main content
      </a>

      {/* USER PROFILE POPOVER */}
      <div
        id="userProfilePopover"
        className="absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50 hidden"
      >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-medium"></div>
          <div>
            <div className="font-medium text-gray-900">User Name</div>
            <div className="text-xs text-gray-500">email@example.com</div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center text-sm gap-2 px-3 py-2 text-left text-error hover:bg-red-50 rounded-md transition-colors">
            <i className="w-4 h-4"></i>
            Sign Out
          </button>
        </div>
      </div>

      {/* LAYOUT WRAPPER */}
      <div className="flex">

        {/* MAIN CONTENT */}
        <main
          className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background"
          id="pageContent"
          role="main"
        >
          <div className="space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900">
                  My Fields
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your fields, areas, and crop instances
                </p>
              </div>

              <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add Field</span>
              </button>
            </div>

            {/* FIELDS CONTAINER */}
            <div id="fieldsContainer" className="space-y-4">

              {/* LOADING STATE */}
              <div id="loadingState" className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading fields...</span>
                </div>
              </div>

              {/* EMPTY STATE */}
              <div id="emptyState" className="hidden">
                <div className="bg-white rounded-xl border-2 border-dashed p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Map className="w-8 h-8 text-primary" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[1.25rem] font-semibold text-gray-900">
                      Add your first Field
                    </h3>

                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Fields are your big plots. You can split them into areas to track corners or beds easily.
                    </p>

                    <div className="mt-6">
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                        <Plus className="w-4 h-4" /> Add Field
                      </button>
                    </div>
                  </div>

                  {/* Example card */}
                  <div className="mt-8 max-w-sm mx-auto">
                    <div className="bg-gray-50 rounded-lg border p-4 text-left">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">North Plot</h4>
                          <p className="text-sm text-gray-600">1,200 m²</p>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Example
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center text-sm">
                        <div>
                          <div className="font-medium text-gray-900">2</div>
                          <div className="text-gray-600">Areas</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">3</div>
                          <div className="text-gray-600">Crops</div>
                        </div>
                        <div>
                          <div className="font-medium text-accent">1</div>
                          <div className="text-gray-600">Overdue</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* POPULATED FIELDS LIST */}
              <div id="fieldsList" className="space-y-4"></div>
            </div>
          </div>

          {/* FIELD FORM DRAWER */}
          <div id="fieldDrawer" className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-xl hidden">
            <div className="flex flex-col h-full">

              {/* HEADER */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-[1.25rem] font-semibold" id="fieldDrawerTitle">
                  Add Field
                </h2>

                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form id="fieldForm" className="flex-1 overflow-y-auto p-4 space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Field Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-primary"
                    placeholder="e.g., North Plot"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-700">Size</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="1200"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Unit</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>m²</option>
                      <option>acres</option>
                      <option>hectares</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg resize-none"
                    placeholder="Optional notes..."
                  ></textarea>
                </div>

              </form>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">
                    Save Field
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AREA DRAWER */}
          <div id="areaDrawer" className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-xl hidden">
            <div className="flex flex-col h-full">

              {/* HEADER */}
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h2 className="text-[1.25rem] font-semibold">Add Area</h2>
                  <p className="text-sm text-gray-600">Parent Field Name</p>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CONTENT */}
              <form id="areaForm" className="flex-1 overflow-y-auto p-4 space-y-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Area Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Tomato Bed A"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Area Type</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>Select type</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-700">Size</label>
                    <input type="number" className="w-full px-3 py-2 border rounded-lg" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Unit</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>m²</option>
                      <option>acres</option>
                      <option>hectares</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg resize-none"
                  ></textarea>
                </div>
              </form>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">
                    Save Area
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DELETE MODAL */}
          <div id="deleteModal" className="fixed inset-0 z-50 hidden">
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-error" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[1.25rem] font-semibold">Confirm Deletion</h3>
                    <p className="text-sm text-gray-600">
                      Are you sure you want to permanently delete this item?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                  <button className="flex-1 px-4 py-2 bg-error text-white rounded-lg">
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
