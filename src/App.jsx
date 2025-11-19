import { Routes, Route } from "react-router-dom";
import Sidebar from "./Route/sidebar";

import Calendar from "./components/calendar";
import FieldDetails from "./components/field_details";
import FieldList from "./components/field_list";

import Library from "./components/library";
import Logbook from "./components/logbook";
import Setting from "./components/setting";
import TaskDetails from "./components/task_details";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />

          <Route path="/field_details" element={<FieldDetails />} />
          <Route path="/field_list" element={<FieldList />} />

          <Route path="/library" element={<Library />} />

          <Route path="/logbook" element={<Logbook />} />

          <Route path="/task_details" element={<TaskDetails />} />

          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
}
