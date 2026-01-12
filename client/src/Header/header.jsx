import { HelpCircle, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, email, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get first letter for avatar
  const avatarLetter = email ? email.charAt(0).toUpperCase() : "U";

  return (
    <header className="bg-surface px-6 py-4 flex justify-between items-center border-b shadow-sm">
      
      {/* Left side */}
      <div className="flex items-center gap-3">
        <h1 className="text-display-lg font-bold text-primary text-2xl">
          Farm Assistant
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Help */}
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <HelpCircle className="w-6 h-6 text-gray-600" />
        </button>

        {/* Show only if logged in */}
        {isAuthenticated && (
          <div className="relative">

            {/* Profile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-green-600 text-white rounded-xl flex items-center justify-center text-sm font-medium">
                {avatarLetter}
              </div>

              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-gray-700">
                  {email}
                </div>
              </div>

              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Show login if NOT logged in */}
        {!isAuthenticated && (
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
