import { Routes, Route } from "react-router-dom";
import Sidebar from "./Route/sidebar";

import Calendar from "./components/calendar";
import FieldDetails from "./components/field_details";
import FieldList from "./components/field_list";
import AreaDetail from "./components/area_detail";
import Library from "./components/library";
import Logbook from "./components/logbook";
import Setting from "./components/setting";
import TaskDetails from "./components/task_details";
import Header from "./Header/header";
import TodaysWork from "./components/todays_work";

export default function App() {
  return (
    <>
    <Header />
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Routes>
          <Route path="/" element={<TodaysWork />} />
          <Route path="/todays_work" element={<TodaysWork />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/area/:areaId" element={<AreaDetail />} />

          <Route path="/field_details" element={<FieldDetails />} />
          <Route path="/field_list" element={<FieldList />} />

          <Route path="/library" element={<Library />} />

          <Route path="/logbook" element={<Logbook />} />

          <Route path="/task_details" element={<TaskDetails />} />

          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
    </>
  );
}
