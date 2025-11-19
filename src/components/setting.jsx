import {
  Globe,
  Bell,
  CloudUpload,
  Cloud,
  Calendar,
  Info,
  X,
  LogOut
} from "lucide-react";

export default function Setting() {
  return (
    <div className="bg-background min-h-screen text-gray-800">
      {/* Skip link */}
      <a
        href="#pageContent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-1 rounded shadow-lg z-50"
      >
        Skip to main content
      </a>

      {/* User Profile Popover (hidden by default) */}
      <div
        id="userProfilePopover"
        className="absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50 hidden"
      >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-medium" />
          <div>
            <div className="font-medium text-gray-900">User Name</div>
            <div className="text-xs text-gray-500">email@example.com</div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center text-sm gap-2 px-3 py-2 text-left text-error hover:bg-red-50 focus:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-error rounded-md transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Layout wrapper */}
      <div className="flex">
        {/* Mobile overlay (hidden) */}
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 hidden md:hidden" />

        {/* Content Area */}
        <main
          id="pageContent"
          role="main"
          className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background"
        >
          <section className="max-w-4xl mx-auto space-y-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-[1.75rem] leading-[2.25rem] font-bold text-gray-900">
                  Settings
                </h1>
                <p className="text-sm leading-[1.375rem] font-normal text-gray-600">
                  Configure your preferences and app settings
                </p>
              </div>
            </div>

            {/* Settings grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Language */}
              <div className="bg-surface rounded-lg border-2 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900">
                      Language
                    </h2>
                    <p className="text-sm text-gray-600">Choose your preferred language</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-gray-50 focus-within:bg-gray-50">
                    <input
                      type="radio"
                      name="language"
                      value="EN"
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">English</div>
                      <div className="text-sm text-gray-500">English interface</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-gray-50 focus-within:bg-gray-50">
                    <input
                      type="radio"
                      name="language"
                      value="TA"
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">தமிழ் (Tamil)</div>
                      <div className="text-sm text-gray-500">Tamil interface / தமிழ் இடைமுகம்</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-surface rounded-lg border-2 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900">
                      Notifications
                    </h2>
                    <p className="text-sm text-gray-600">Manage notification preferences</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Push Notifications</div>
                      <div className="text-sm text-gray-500">Get reminders for tasks and alerts</div>
                    </div>

                    <button
                      type="button"
                      id="notificationToggle"
                      className="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-300"
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        id="notificationThumb"
                        className="inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform translate-x-0"
                      />
                    </button>
                  </div>

                  <div id="notificationStatus" className="p-3 rounded-lg bg-gray-500 border">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">
                          Permission Status: <span id="permissionStatusText">Checking...</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Enable notifications to receive task reminders
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Backup */}
              <div className="bg-surface rounded-lg border-2 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <CloudUpload className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900">
                      Data Backup
                    </h2>
                    <p className="text-sm text-gray-600">Automatic backup to secure storage</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Enable Backup</div>
                      <div className="text-sm text-gray-500">Automatically sync your farm data</div>
                    </div>

                    <button
                      type="button"
                      id="backupToggle"
                      className="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-400"
                    >
                      <span className="sr-only">Enable backup</span>
                      <span
                        id="backupThumb"
                        className="inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform translate-x-0"
                      />
                    </button>
                  </div>

                  <div id="backupStatus" className="p-3 rounded-lg bg-gray-50 border">
                    <div className="flex items-start gap-2">
                      <Cloud className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">
                          Last Sync: <span id="lastSyncText">Never</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Photos remain stored locally unless backup is enabled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar / Week start */}
              <div className="bg-surface rounded-lg border-2 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900">
                      Calendar
                    </h2>
                    <p className="text-sm text-gray-600">Configure calendar preferences</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-gray-50 focus-within:bg-gray-50">
                    <input
                      type="radio"
                      name="weekStart"
                      value="MON"
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Monday</div>
                      <div className="text-sm text-gray-500">Week starts on Monday</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-gray-50 focus-within:bg-gray-50">
                    <input
                      type="radio"
                      name="weekStart"
                      value="SUN"
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Sunday</div>
                      <div className="text-sm text-gray-500">Week starts on Sunday</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="bg-surface rounded-lg border-2 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h2 className="text-[1.25rem] leading-[1.75rem] font-semibold text-gray-900">App Information</h2>
                  <p className="text-sm text-gray-600">Version and support details</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">Version</div>
                  <div className="text-gray-600">1.0.0</div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium text-gray-900">Last Updated</div>
                  <div className="text-gray-600" id="appLastUpdated">Loading...</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 leading-relaxed">
                  <p>
                    Farm Assistant helps you manage your farming tasks efficiently. For support or feedback, please contact your system administrator.
                  </p>
                  <p className="mt-2">
                    தோட்ட உதவியாளர் உங்கள் விவசாய பணிகளை திறம்பட நிர்வகிக்க உதவுகிறது.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Backup confirmation modal (hidden) */}
          <div
            id="backupConfirmModal"
            className="fixed inset-0 z-50 hidden items-center justify-center bg-gray-900 bg-opacity-50"
          >
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <CloudUpload className="w-4 h-4 text-secondary" />
                </div>
                <h3 className="text-[1.25rem] font-semibold text-gray-900">Enable Data Backup</h3>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600">
                  When you enable backup, your farm data will be automatically synchronized to secure cloud storage.
                </p>

                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-2">Privacy & Data:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Photos remain stored locally on your device</li>
                    <li>• Only farm records and task data are backed up</li>
                    <li>• Data is encrypted during transmission</li>
                    <li>• You can disable backup anytime</li>
                  </ul>
                </div>

                <p className="text-xs text-gray-500">
                  गोपनीयता: फोटो स्थानीय रूप से संग्रहीत रहते हैं<br />
                  தனியுரிமை: புகைப்படங்கள் உங்கள் சாதனத்தில் உள்ளூரில் சேமிக்கப்படும்
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  id="cancelBackupBtn"
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="enableBackupBtn"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg"
                >
                  Enable Backup
                </button>
              </div>
            </div>
          </div>

          {/* Toast container */}
          <div id="toastContainer" className="fixed top-4 right-4 z-50 space-y-2" />
        </main>
      </div>
    </div>
  );
}
