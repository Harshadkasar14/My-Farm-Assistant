import { useState } from "react";
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  CalendarX,
  CloudRain,
  X,
} from "lucide-react";

/**
 * Calendar Page Component
 * Converted from your original HTML
 */
 function Calendar() {
  const [view, setView] = useState("week"); // week or month
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [weatherVisible, setWeatherVisible] = useState(true);

  return (
    <main className="flex-1 p-6 overflow-y-auto min-h-screen bg-background text-gray-800">
      <section className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900">
              Calendar
            </h1>
            <p className="text-sm leading-[1.375rem] text-gray-600 mt-1">
              Plan your farming activities with visual scheduling
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle View Buttons */}
            <div className="flex items-center bg-gray-100 rounded p-1">
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 text-sm font-medium rounded ${
                  view === "week"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1.5 text-sm font-medium rounded ${
                  view === "month"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                Month
              </button>
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              <span className="hidden bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900 min-w-[200px] text-center">
              November 2025
            </h2>

            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
            Today
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Week View Header */}
          {view === "week" && (
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div
                  key={d}
                  className="p-3 text-sm font-medium text-gray-600 text-center"
                >
                  {d}
                </div>
              ))}
            </div>
          )}

          {/* Month View Header */}
          {view === "month" && (
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div
                  key={d}
                  className="p-2 text-xs font-medium text-gray-600 text-center"
                >
                  {d}
                </div>
              ))}
            </div>
          )}

          {/* Calendar Body */}
          <div className="min-h-[400px] flex items-center justify-center text-gray-400">
            (Calendar events go here)
          </div>
        </div>

        {/* Empty State */}
        <div className="hidden text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CalendarX className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-[1.25rem] font-semibold text-gray-900 mb-2">
            No tasks in this timeframe
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Add a Crop to start scheduling work.
          </p>
          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Add Crop
          </button>
        </div>

        {/* Weather Notice Banner */}
        {weatherVisible && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8 rounded-r-lg">
            <div className="flex items-start">
              <CloudRain className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  Rain expected today.
                  <button className="ml-2 text-blue-600 underline hover:text-blue-800">
                    Skip watering tasks?
                  </button>
                </p>
              </div>
              <button
                onClick={() => setWeatherVisible(false)}
                className="text-blue-400 hover:text-blue-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Filter Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex justify-end">
          <div className="w-80 bg-white h-full shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-[1.25rem] font-semibold text-gray-900">
                Filters
              </h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Quick Date Range
                </h3>
                <div className="space-y-2">
                  {["This Week", "Next 2 Weeks", "This Month"].map((r) => (
                    <button
                      key={r}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 space-y-3">
              <button className="w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90">
                Apply Filters
              </button>
              <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Calendar;

