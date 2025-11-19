import { Link } from "react-router-dom";
import { Calendar, BookOpen, Map, Settings, Layers, ClipboardList } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-2 h-screen fixed">
      <nav className="space-y-2">

        <Link to="/calendar" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <Calendar className="w-5 h-5" />
          <span>Calendar</span>
        </Link>

        <Link to="/field_details" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <Layers className="w-5 h-5" />
          <span>Field Details</span>
        </Link>

        <Link to="/field_list" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <Map className="w-5 h-5" />
          <span>Field List</span>
        </Link>

        <Link to="/library" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <BookOpen className="w-5 h-5" />
          <span>Library</span>
        </Link>

        <Link to="/logbook" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <ClipboardList className="w-5 h-5" />
          <span>Logbook</span>
        </Link>

        <Link to="/task_details" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <ClipboardList className="w-5 h-5" />
          <span>Task Details</span>
        </Link>

        <Link to="/setting" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

      </nav>
    </aside>
  );
}
