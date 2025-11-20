import { Plus, Globe, WifiOff, Search, CheckCircle, X } from "lucide-react";

export default function TodaysWork() {
  return (
    <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background" role="main">
      <section className="h-full flex flex-col">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900">
              Today's Work
            </h1>
            <p className="text-sm leading-[1.375rem] text-gray-600 mt-1">
              Your daily farming tasks at a glance
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* Quick Note Button */}
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Quick Note</span>
            </button>

            {/* Language Toggle */}
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">EN</span>
            </button>

            {/* Offline Badge */}
            <div className="hidden flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">Offline</span>
            </div>

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-red-800">Overdue</div>
            <div className="text-2xl font-bold text-red-800 mt-1">0</div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-800">Due Today</div>
            <div className="text-2xl font-bold text-blue-800 mt-1">0</div>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-800">This Week</div>
            <div className="text-2xl font-bold text-green-800 mt-1">0</div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-800">Completed Today</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">0</div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, crops, or areas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <select className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white">
            <option value="">All Statuses</option>
            <option value="overdue">Overdue</option>
            <option value="due">Due Today</option>
            <option value="planned">Planned This Week</option>
          </select>

          <select className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white">
            <option value="">All Areas</option>
          </select>
        </div>

        {/* Tasks Area */}
        <div className="flex-1 space-y-4 overflow-y-auto" />

        {/* Empty State */}
        <div className="hidden flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">All caught up!</h2>
          <p className="text-gray-600">No pending tasks match your filters. Great job!</p>
        </div>

      </section>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2"></div>

      {/* Quick Log Modal */}
      <div className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative">
          <div className="p-6"></div>

          <button className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Photo Capture Modal */}
      <div className="hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 space-y-4">
          <h3 className="text-lg font-semibold">Add Photo</h3>

          <div className="hidden">
            <img className="max-h-64 rounded-lg mx-auto" alt="" />
          </div>

          <div className="hidden flex gap-3">
            <button className="flex-1 px-4 py-2 bg-gray-200 rounded-lg">Retake</button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Confirm</button>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Use Camera
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-200 rounded-lg">
              Select the file
            </button>
          </div>

          <input type="file" accept="image/*" className="hidden" />
        </div>

        <button className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}
