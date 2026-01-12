import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Sidebar from "./Route/sidebar";
import Header from "./Header/header";

import Login from "./auth/signIn";
import Signup from "./auth/signUp";

import Calendar from "./components/calendar";
import FieldDetails from "./components/field_details";
import FieldList from "./components/field_list";
import AreaDetail from "./components/area_detail";
import Library from "./components/library";
import Logbook from "./components/logbook";
import Setting from "./components/setting";
import TaskDetails from "./components/task_details";

import TodaysWork from "./components/todays_work";


export default function App() {

  const location = useLocation();

  // check auth pages
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
    {/* Show header/sidebar ONLY if not auth page */}
      {!isAuthPage && <Header />}

      <div className="flex">
        {!isAuthPage && <Sidebar />}

        <div className={!isAuthPage ? "ml-64 flex-1" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
