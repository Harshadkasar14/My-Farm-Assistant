import React from "react";
import {
  ArrowLeft,
  Droplets,
  Clock,
  Check,
  X,
  Edit3,
  Image,
  Camera,
  LogOut,
} from "lucide-react";

export default function TaskDetails() {
  return (
    <div className="bg-background min-h-screen text-gray-800 p-6">
      {/* MAIN SECTION */}
      <section className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div>
              <h1 className="text-[1.75rem] font-bold text-gray-900">
                Task Details
              </h1>
              <p className="text-sm text-gray-600">Task details</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-700">
            Status
          </div>
        </div>

        {/* Task Context Card */}
        <div className="bg-surface border-2 rounded-lg p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-primary" />

                <div>
                  <h2 className="text-[1.25rem] font-semibold text-gray-900">
                    Crop Name
                  </h2>
                  <p className="text-sm text-gray-600">Area details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium text-gray-900">--</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Due Window:</span>
                  <span className="font-medium text-gray-900">--</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Recommended Qty:</span>
                  <span className="font-medium text-gray-900">--</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">--</span>
                </div>
              </div>
            </div>
          </div>

          {/* Template Guidance */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">
              Template Guidance
            </h3>
            <p className="text-sm text-gray-600">Notes here...</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border-2 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[1.25rem] font-semibold text-gray-900">
              Recent Activity
            </h2>

            <button className="text-sm text-primary hover:text-primary/80">
              View Crop Details →
            </button>
          </div>

          <div className="space-y-3 text-center py-8 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Loading activity history...</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Done
            </button>

            <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <X className="w-4 h-4" />
              Skip
            </button>

            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Snooze
            </button>

            <button className="bg-gray-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </section>

      {/* DRAWERS PLACEHOLDER (UI only — hidden) */}
      <div className="hidden">
        <div className="bg-white p-4 rounded-xl shadow">Drawer UI Placeholder</div>
      </div>
    </div>
  );
}
