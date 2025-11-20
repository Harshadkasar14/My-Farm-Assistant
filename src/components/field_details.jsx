import {
  ArrowLeft,
  Edit2,
  MoreHorizontal,
  Copy,
  Download,
  Trash2,
  Plus,
  Search,
  MapPin,
  X,
  AlertTriangle,
  Leaf,
} from "lucide-react";

export default function FieldDetails() {
  return (
    <div className="flex bg-background min-h-screen text-gray-800">

      {/* Main Content */}
      <main
        className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background"
        role="main"
      >
        <section className="space-y-6">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div>
                <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900">
                  Field Name
                </h1>
                <p className="text-sm text-gray-600 mt-1">Field subtitle</p>
              </div>
            </div>

            {/* Field actions */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
                <div className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4" /> Edit Field
                </div>
              </button>

              {/* Overflow Menu */}
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded transition">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>

                {/* Menu dropdown (static UI) */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-1">
                    <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50">
                      <Copy className="w-4 h-4 mr-2" /> Duplicate Field
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" /> Export Data
                    </button>
                    <div className="border-t my-1"></div>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Field
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Areas Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-[1.25rem] font-semibold text-gray-900">
                  Areas
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage planting areas within this field
                </p>
              </div>

              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                <Plus className="w-4 h-4 mr-2" /> Add Area
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search areas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Areas List (UI only) */}
            <div className="space-y-3 border border-gray-200 rounded p-4 text-gray-600">
              <p className="text-sm">Area cards will appear here...</p>
            </div>

            {/* Empty State */}
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>

              <h3 className="text-[1.25rem] font-semibold text-gray-900 mb-2">
                No areas yet
              </h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                Add an Area to start planting and organizing crops within this field.
              </p>

              <button className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> Add Area
              </button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-10"></div>

        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-[1.25rem] font-semibold text-gray-900">
              Welcome to Farm Assistant
            </h2>
            <p className="text-gray-600 max-w-md">
              Select a page from the sidebar to get started with managing your farming tasks and tracking your crops.
            </p>
          </div>
        </div>
      </main>

      {/* Add Area Drawer (UI only, always hidden) */}
      <div className="fixed inset-0 z-50 hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"></div>
      </div>

      {/* Delete Field Modal (UI only) */}
      <div className="fixed inset-0 z-50 hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Field</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this field? This will delete all areas and crop data inside.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-red-600 text-white rounded">
                Delete Field
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
