import {
  Book,
  Filter,
  Download,
  Sunrise,
  X,
  AlertTriangle
} from "lucide-react";

export default function Logbook() {
  return (
    <div className="bg-background min-h-screen text-gray-800">

      {/* Skip Nav */}
      <a
        href="#pageContent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-1 rounded shadow-lg z-50"
      >
        Skip to main content
      </a>

      {/* POPUP USER PROFILE */}
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
            <Download className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex">

        {/* CONTENT AREA */}
        <main
          className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background"
          id="pageContent"
          role="main"
        >
          <section className="h-full flex flex-col">

            {/* PAGE HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Book className="w-6 h-6 text-primary" />
                <h1 className="text-[1.75rem] font-bold text-gray-900">Logbook</h1>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
            </div>

            {/* AGGREGATION BAR */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
              <div
                id="aggregationStats"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              ></div>
            </div>

            {/* MAIN CONTENT SCROLL */}
            <div className="flex-1 overflow-hidden">

              {/* EMPTY STATE */}
              <div
                id="emptyState"
                className="hidden flex flex-col items-center justify-center min-h-[400px] text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Book className="w-8 h-8 text-gray-400" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-[1.25rem] font-semibold text-gray-900">No records yet</h2>

                  <p className="text-gray-600 max-w-md">
                    Your actions will appear here when you mark tasks done.
                  </p>

                  <a
                    href="#/page=todays_work"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
                  >
                    <Sunrise className="w-4 h-4" />
                    See Today's Work
                  </a>
                </div>
              </div>

              {/* LOGS LIST */}
              <div
                id="logsList"
                className="space-y-4 overflow-y-auto max-h-[calc(100vh-320px)]"
              ></div>

              {/* LOAD MORE */}
              <div id="loadMoreContainer" className="hidden mt-6 text-center">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                  Load More
                </button>
              </div>
            </div>
          </section>

          {/* FILTER DRAWER */}
          <div id="filterDrawer" className="fixed inset-0 z-50 hidden">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>

            <div
              id="filterPanel"
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform translate-x-full transition-transform"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-[1.25rem] font-semibold">Filters</h2>

                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>All Fields</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>All Areas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>All Crops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Type
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>All Task Types</option>
                  </select>
                </div>

                {/* DATE RANGE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="px-3 py-2 border rounded-lg text-sm" />
                    <input type="date" className="px-3 py-2 border rounded-lg text-sm" />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="space-y-2 pt-4 border-t">
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                    Apply Filters
                  </button>
                  <button className="w-full px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* EXPORT MODAL */}
          <div id="exportModal" className="fixed inset-0 z-50 hidden">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[1.25rem] font-semibold">Export Logs</h2>

                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                    Export summary will appear here.
                  </div>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">
                      Include photo references
                    </span>
                  </label>

                  <div className="text-xs text-gray-500">Estimated size: 0 MB</div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>

                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">
                    <Download className="w-4 h-4 inline mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PHOTO FULLSCREEN MODAL */}
          <div id="photoModal" className="fixed inset-0 z-50 hidden">
            <div className="fixed inset-0 bg-black bg-opacity-90"></div>

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="relative max-w-4xl max-h-full">

                <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>

                <img className="max-w-full max-h-full rounded-lg" alt="" />

                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
                  <div className="space-y-1 text-sm"></div>

                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 bg-green-600 bg-opacity-20 rounded text-sm">
                      <Download className="w-4 h-4 inline mr-1" /> Download
                    </button>

                    <button className="px-3 py-1 bg-red-500 bg-opacity-70 rounded text-sm">
                      <AlertTriangle className="w-4 h-4 inline mr-1" /> Delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
