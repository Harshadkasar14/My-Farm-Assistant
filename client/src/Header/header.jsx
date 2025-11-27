import { HelpCircle, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-surface px-6 py-4 flex justify-between items-center border-b shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Open Menu"
        >
          <i data-lucide="menu" className="w-6 h-6"></i>
        </button>

        {/* App Title */}
        <h1 className="text-display-lg font-bold text-primary text-2xl">
          Farm Assistant
        </h1>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">

        {/* Help Button */}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Help"
        >
          <HelpCircle className="w-6 h-6 text-gray-600" />
        </button>

        {/* Import Button */}
        <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          Import App Data
        </button>

        {/* Export Button */}
        <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          Export App Data
        </button>

        {/* Hidden File Input */}
        <input type="file" id="importFile" accept="application/json" className="hidden" />

        {/* User Profile Button */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-green-600 text-white rounded-xl flex items-center justify-center text-sm font-medium">
            H
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-700">Harshad</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

      </div>
    </header>
  );
}
