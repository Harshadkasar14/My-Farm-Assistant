
import React, { useEffect, useState, useRef } from "react";



const STORAGE_KEY = "farm_diary_v1";
const DEFAULT_USER = { id: "u-001", name: "Farmer", lang: "en" };


const T = {
  en: {
    appTitle: "Farm Diary",
    addField: "Add Field",
    fieldName: "Field name",
    addArea: "Add Area",
    areaName: "Area name",
    addCrop: "Add Crop",
    cropName: "Crop name (e.g. Coconut)",
    quickActions: "Quick Actions",
    water: "Water",
    fertilize: "Fertilize",
    spray: "Spray",
    harvest: "Harvest",
    dueToday: "Due Today",
    dueWeek: "This Week",
    calendar: "Tasks Calendar",
    addTask: "Add Task",
    notes: "Notes",
    amount: "Amount",
    save: "Save",
    cancel: "Cancel",
    done: "Done",
    markDone: "Mark Done",
    photo: "Photo",
    guide: "Crop Guide",
    language: "தமிழ் / EN",
    search: "Search...",
    noData: "No items yet",
    offline: "Offline",
    online: "Online",
  },
  ta: {
    appTitle: "பண்ணை நற்செய்தி",
    addField: "கிளை சேர்",
    fieldName: "கள பெயர்",
    addArea: "பகுதியை சேர்க்கவும்",
    areaName: "பகுதி பெயர்",
    addCrop: "பலாப்பழம் சேர்க்கவும்",
    cropName: "பயிர் பெயர் (உதா: தேங்காய்)",
    quickActions: "அவசர நடவடிக்கைகள்",
    water: "நீர்வழி",
    fertilize: " உரம் இடு",
    spray: "பூச்சி சிதவல்",
    harvest: "கழிவு சேர்",
    dueToday: "இன்றைக்கு",
    dueWeek: "இந்த வாரம்",
    calendar: "பணிகளின் காலண்டர்",
    addTask: "பணி சேர்",
    notes: "குறிப்புகள்",
    amount: "அளவு",
    save: "சேமி",
    cancel: "ரத்து",
    done: "முடிந்தது",
    markDone: "முடித்துவையுங்கள்",
    photo: "படம்",
    guide: "பயிர் வழிகாட்டு",
    language: "தமிழ் / EN",
    search: "தேடுக...",
    noData: "யாரும் இல்லை",
    offline: "ஆஃப்லைன்",
    online: "ஆன்லைன்",
  },
};

// Basic crop guide content (editable)
const CROP_GUIDE = {
  coconut: {
    name: "Coconut / தேங்காய்",
    needs: [
      "Water weekly for young palms; deeply during dry season",
      "Apply NPK once every 3 months for mature palms",
      "Spray for rhinoceros beetle / mite as needed",
    ],
  },
  banana: {
    name: "Banana / வாழை",
    needs: [
      "Keep soil moist; frequent watering",
      "Split-apply fertilizer every 6–8 weeks",
      "Remove dead leaves, watch for Panama disease",
    ],
  },
  papaya: {
    name: "Papaya / பப்பாளி",
    needs: ["Water every 3-4 days in hot weather", "Apply NPK monthly", "Thin fruits for larger sizes"],
  },
  tomato: {
    name: "Tomato / தக்காளி",
    needs: [
      "Frequent watering; avoid water on leaves",
      "Use balanced fertilizer every 3 weeks",
      "Staking and pruning recommended",
    ],
  },
};

/* ----------------- STORAGE HELPERS ----------------- */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // create seed
      const seed = {
        user: DEFAULT_USER,
        fields: [],
        tasks: [], // tasks are global: { id, cropId, areaId, fieldId, name, type, dueDateISO, done, doneAt, note, amount, photoDataUrl }
        crops: [], // crops: { id, areaId, fieldId, name }
        areas: [],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("loadState error", e);
    return {
      user: DEFAULT_USER,
      fields: [],
      tasks: [],
      crops: [],
      areas: [],
    };
  }
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ----------------- UTIL ----------------- */
const uid = (p = "") => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const todayISO = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
const addDaysISO = (dISO, days) => {
  const d = new Date(dISO);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};
const isSameDay = (aISO, bISO) => new Date(aISO).toDateString() === new Date(bISO).toDateString();

/* ----------------- APP ----------------- */
export default function App() {
  const [state, setState] = useState(() => loadState());
  const [lang, setLang] = useState(state.user?.lang || "en");
  const t = (k) => T[lang][k] || T.en[k] || k;

  const [screen, setScreen] = useState({ name: "dashboard" }); // dashboard | fields | fieldDetail(fieldId)
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [query, setQuery] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // persist user lang
    const ns = { ...state, user: { ...state.user, lang } };
    setState(ns);
    saveState(ns);
    // eslint-disable-next-line
  }, [lang]);

  useEffect(() => {
    function onOnline() {
      setOnline(true);
      // Optionally: attempt sync to backend here
    }
    function onOffline() {
      setOnline(false);
    }
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // central updater: mutate state -> persist
  function upState(mutator) {
    setState((prev) => {
      const next = mutator(JSON.parse(JSON.stringify(prev)));
      saveState(next);
      return next;
    });
  }

  /* ----------------- CRUD: Fields / Areas / Crops / Tasks ----------------- */
  function addField(name, size, sizeUnit) {
    if (!name?.trim()) return;
    upState((s) => {
      const f = { id: uid("f-"), name: name.trim(), size: size || null, sizeUnit: sizeUnit || "m2", createdAt: new Date().toISOString() };
      s.fields.push(f);
      return s;
    });
  }
  function updateField(id, patch) {
    upState((s) => {
      const i = s.fields.findIndex((x) => x.id === id);
      if (i >= 0) s.fields[i] = { ...s.fields[i], ...patch };
      return s;
    });
  }
  function deleteField(id) {
    if (!confirm("Delete field and all areas/crops/tasks?")) return;
    upState((s) => {
      s.fields = s.fields.filter((f) => f.id !== id);
      s.areas = s.areas.filter((a) => a.fieldId !== id);
      s.crops = s.crops.filter((c) => c.fieldId !== id);
      s.tasks = s.tasks.filter((t) => t.fieldId !== id);
      return s;
    });
  }

  function addArea(fieldId, name) {
    if (!name?.trim()) return;
    upState((s) => {
      const a = { id: uid("a-"), fieldId, name: name.trim(), createdAt: new Date().toISOString() };
      s.areas.push(a);
      return s;
    });
  }
  function addCrop(fieldId, areaId, cropName) {
    if (!cropName?.trim()) return;
    upState((s) => {
      const c = { id: uid("c-"), fieldId, areaId, name: cropName.trim(), createdAt: new Date().toISOString() };
      s.crops.push(c);
      return s;
    });
  }

  function addTask({ fieldId, areaId, cropId, name, type = "manual", dueDateISO = new Date().toISOString(), note = "", amount = null, photo = null }) {
    upState((s) => {
      const tTask = {
        id: uid("t-"),
        fieldId,
        areaId,
        cropId,
        name,
        type,
        dueDateISO,
        done: false,
        createdAt: new Date().toISOString(),
        note,
        amount,
        photo,
        doneAt: null,
      };
      s.tasks.push(tTask);
      return s;
    });
  }

  function markTaskDone(taskId, extras = {}) {
    upState((s) => {
      const i = s.tasks.findIndex((x) => x.id === taskId);
      if (i >= 0) {
        s.tasks[i] = { ...s.tasks[i], done: true, doneAt: new Date().toISOString(), ...extras };
      }
      return s;
    });
  }

  function updateTask(taskId, patch) {
    upState((s) => {
      const i = s.tasks.findIndex((x) => x.id === taskId);
      if (i >= 0) s.tasks[i] = { ...s.tasks[i], ...patch };
      return s;
    });
  }

  function deleteTask(taskId) {
    if (!confirm("Delete task?")) return;
    upState((s) => {
      s.tasks = s.tasks.filter((x) => x.id !== taskId);
      return s;
    });
  }

  /* ----------------- Derived lists ----------------- */
  const today = new Date();
  const startOfTodayISO = todayISO(today);
  const endOfWeekISO = addDaysISO(startOfTodayISO, 7);

  const tasksDueToday = state.tasks.filter((t) => !t.done && isSameDay(t.dueDateISO, startOfTodayISO));
  const tasksDueWeek = state.tasks.filter((t) => !t.done && new Date(t.dueDateISO) >= new Date(startOfTodayISO) && new Date(t.dueDateISO) <= new Date(endOfWeekISO));

  /* ----------------- Quick action helpers ----------------- */
  function quickAction(actionType, fieldId, areaId, cropId) {
    const nameMap = { water: t("water"), fertilize: t("fertilize"), spray: t("spray"), harvest: t("harvest") };
    // default due today
    addTask({
      fieldId,
      areaId,
      cropId,
      name: `${nameMap[actionType] || actionType}`,
      type: actionType,
      dueDateISO: startOfTodayISO,
    });
  }

  /* ----------------- Photo helper ----------------- */
  function handlePhotoFile(file, cb) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      cb(e.target.result); // dataURL
    };
    reader.readAsDataURL(file);
  }

  /* ----------------- UI components inside single file ----------------- */

  function Header() {
    return (
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold">{t("appTitle")}</div>
          <div className="text-sm text-gray-500">{state.user?.name || "Farmer"}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-2 py-1 rounded border">{online ? t("online") : t("offline")}</div>
          <button onClick={() => setLang((l) => (l === "en" ? "ta" : "en"))} className="text-sm px-2 py-1 border rounded">
            {t("language")}
          </button>
        </div>
      </div>
    );
  }

  function Dashboard() {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{t("dueToday")}</h2>
          <button className="text-sm" onClick={() => setScreen({ name: "tasks" })}>
            {t("calendar")}
          </button>
        </div>

        <div className="space-y-2">
          {tasksDueToday.length === 0 ? (
            <div className="text-sm text-gray-500">{t("noData")}</div>
          ) : (
            tasksDueToday.slice(0, 5).map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>

        <div className="pt-4">
          <h3 className="font-semibold">{t("dueWeek")}</h3>
          <div className="space-y-2 mt-2">
            {tasksDueWeek.length === 0 ? <div className="text-sm text-gray-500">{t("noData")}</div> : tasksDueWeek.slice(0, 6).map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold">{t("quickActions")}</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={() => setScreen({ name: "fields" })}>
              {t("addField")}
            </button>
            <button className="px-3 py-2 rounded bg-green-600 text-white" onClick={() => setScreen({ name: "fields" })}>
              {t("addArea")}
            </button>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold">{t("guide")}</h3>
          <div className="mt-2 space-y-2">
            {Object.keys(CROP_GUIDE).map((k) => (
              <div key={k} className="p-2 border rounded">
                <strong>{CROP_GUIDE[k].name}</strong>
                <ul className="text-sm mt-1 list-disc ml-4">
                  {CROP_GUIDE[k].needs.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function FieldsScreen() {
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [unit, setUnit] = useState("m2");
    const [areaName, setAreaName] = useState("");
    const [cropName, setCropName] = useState("");

    const listed = state.fields.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

    return (
      <div className="p-4 space-y-4">
        <div>
          <div className="flex gap-2">
            <input className="flex-1 border p-2 rounded" placeholder={t("search")} value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="px-3 py-2 border rounded" onClick={() => setQuery("")}>
              X
            </button>
          </div>
        </div>

        <div className="bg-white p-3 rounded shadow-sm space-y-2">
          <h4 className="font-semibold">+ {t("addField")}</h4>
          <input placeholder={t("fieldName")} className="w-full border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="grid grid-cols-3 gap-2">
            <input placeholder="size" value={size} onChange={(e) => setSize(e.target.value)} className="border p-2 rounded col-span-2" />
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className="border p-2 rounded">
              <option value="m2">m²</option>
              <option value="acres">acres</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => { addField(name, size, unit); setName(""); setSize(""); }}>
              {t("save")}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {listed.length === 0 ? (
            <div className="text-sm text-gray-500">{t("noData")}</div>
          ) : (
            listed.map((f) => (
              <div key={f.id} className="bg-white p-3 rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-sm text-gray-500">{f.size ? `${f.size} ${f.sizeUnit}` : ""}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 border rounded" onClick={() => { setSelectedFieldId(f.id); setScreen({ name: "fieldDetail", fieldId: f.id }); }}>
                    Open
                  </button>
                  <button className="px-2 py-1 border rounded" onClick={() => { const nm = prompt("Rename field", f.name); if (nm) updateField(f.id, { name: nm }); }}>
                    Edit
                  </button>
                  <button className="px-2 py-1 border text-red-600 rounded" onClick={() => deleteField(f.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 bg-white p-3 rounded shadow">
          <h4 className="font-semibold">Add Area / Crop</h4>
          <div className="grid grid-cols-3 gap-2">
            <select className="col-span-1 border p-2 rounded" onChange={(e) => setSelectedFieldId(e.target.value)} value={selectedFieldId || ""}>
              <option value="">Choose field</option>
              {state.fields.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <input placeholder={t("areaName")} value={areaName} onChange={(e) => setAreaName(e.target.value)} className="border p-2 rounded col-span-1" />
            <button className="px-3 py-2 bg-blue-600 text-white rounded col-span-1" onClick={() => { if (selectedFieldId && areaName) { addArea(selectedFieldId, areaName); setAreaName(""); } else alert("Select field and enter area"); }}>
              {t("addArea")}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <select className="col-span-1 border p-2 rounded" onChange={(e) => setSelectedFieldId(e.target.value)} value={selectedFieldId || ""}>
              <option value="">Field</option>
              {state.fields.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <select className="col-span-1 border p-2 rounded" onChange={(e) => setSelectedAreaId(e.target.value)} value={selectedAreaId || ""}>
              <option value="">Area</option>
              {state.areas.filter(a => a.fieldId === selectedFieldId).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <input placeholder={t("cropName")} value={cropName} onChange={(e) => setCropName(e.target.value)} className="border p-2 rounded col-span-1" />
            <div className="col-span-3 flex gap-2 mt-2">
              <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => { if (!selectedFieldId || !selectedAreaId || !cropName) return alert("select field/area and enter crop name"); addCrop(selectedFieldId, selectedAreaId, cropName); setCropName(""); }}>
                {t("addCrop")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function FieldDetailScreen({ fieldId }) {
    const field = state.fields.find((f) => f.id === fieldId);
    const areas = state.areas.filter((a) => a.fieldId === fieldId);
    const crops = state.crops.filter((c) => c.fieldId === fieldId);

    if (!field) return <div className="p-4">Field not found</div>;

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">{field.name}</h2>
            <div className="text-sm text-gray-500">{field.size ? `${field.size} ${field.sizeUnit}` : ""}</div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border rounded" onClick={() => deleteField(fieldId)}>Delete</button>
            <button className="px-3 py-2 border rounded" onClick={() => { const nm = prompt("Rename field", field.name); if (nm) updateField(fieldId, { name: nm }); }}>Edit</button>
          </div>
        </div>

        <div className="bg-white p-3 rounded space-y-3">
          <h4 className="font-semibold">Areas</h4>
          {areas.length === 0 ? <div className="text-sm text-gray-500">{t("noData")}</div> : areas.map(a => (
            <div key={a.id} className="p-2 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm text-gray-500">Crops: {state.crops.filter(c => c.areaId === a.id).length}</div>
              </div>
              <div className="flex gap-1">
                <button className="px-2 py-1 border rounded" onClick={() => { const nm = prompt("Rename area", a.name); if (nm) upState(s => { const x = s.areas.findIndex(z => z.id === a.id); if (x>=0) s.areas[x].name = nm; return s; }); }}>Edit</button>
                <button className="px-2 py-1 border rounded" onClick={() => { if (!confirm("delete area?")) return; upState(s => { s.areas = s.areas.filter(z => z.id !== a.id); s.crops = s.crops.filter(z => z.areaId !== a.id); s.tasks = s.tasks.filter(z => z.areaId !== a.id); return s; }); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-3 rounded space-y-3">
          <h4 className="font-semibold">Crops</h4>
          {crops.length === 0 ? <div className="text-sm text-gray-500">{t("noData")}</div> : crops.map(c => (
            <div key={c.id} className="p-2 border rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-500">Area: {state.areas.find(a => a.id === c.areaId)?.name || "-"}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 border rounded" onClick={() => { setSelectedCropId(c.id); }}>Open</button>
                  <button className="px-2 py-1 border rounded" onClick={() => { const nm = prompt("Rename crop", c.name); if (nm) upState(s => { const i = s.crops.findIndex(x => x.id === c.id); if (i>=0) s.crops[i].name = nm; return s; }); }}>Edit</button>
                  <button className="px-2 py-1 border text-red-600 rounded" onClick={() => { if (!confirm("delete crop?")) return; upState(s => { s.tasks = s.tasks.filter(t => t.cropId !== c.id); s.crops = s.crops.filter(x => x.id !== c.id); return s; }); }}>Delete</button>
                </div>
              </div>

              <div className="mt-2 flex gap-2">
                <button className="px-2 py-1 rounded bg-blue-600 text-white" onClick={() => quickAction("water", fieldId, c.areaId, c.id)}>{t("water")}</button>
                <button className="px-2 py-1 rounded bg-yellow-600 text-white" onClick={() => quickAction("fertilize", fieldId, c.areaId, c.id)}>{t("fertilize")}</button>
                <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => quickAction("spray", fieldId, c.areaId, c.id)}>{t("spray")}</button>
                <button className="px-2 py-1 rounded bg-green-600 text-white" onClick={() => quickAction("harvest", fieldId, c.areaId, c.id)}>{t("harvest")}</button>
                <button className="px-2 py-1 border rounded" onClick={() => { const dd = prompt("Due date (YYYY-MM-DD)", new Date().toISOString().slice(0, 10)); if (dd) addTask({ fieldId, areaId: c.areaId, cropId: c.id, name: "Manual task", dueDateISO: new Date(dd + "T00:00:00").toISOString() }); }}>+ Task</button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button className="px-3 py-2 border rounded" onClick={() => setScreen({ name: "fields" })}>Back</button>
        </div>
      </div>
    );
  }

  function TasksScreen() {
    // Group tasks by date (including done ones if needed)
    const tasksByDate = state.tasks.reduce((acc, tsk) => {
      const d = new Date(tsk.dueDateISO).toDateString();
      acc[d] = acc[d] || [];
      acc[d].push(tsk);
      return acc;
    }, {});
    const dates = Object.keys(tasksByDate).sort((a, b) => new Date(a) - new Date(b));
    return (
      <div className="p-4 space-y-4">
        <h3 className="font-semibold">{t("calendar")}</h3>
        {dates.length === 0 ? <div className="text-sm text-gray-500">{t("noData")}</div> : dates.map((d) => (
          <div key={d} className="bg-white p-3 rounded">
            <div className="font-medium">{d}</div>
            <div className="mt-2 space-y-2">
              {tasksByDate[d].map((tsk) => <TaskCard key={tsk.id} task={tsk} />)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function TaskCard({ task }) {
    const crop = state.crops.find((c) => c.id === task.cropId);
    const area = state.areas.find((a) => a.id === task.areaId);
    const field = state.fields.find((f) => f.id === task.fieldId);

    return (
      <div className={`p-3 border rounded ${task.done ? "opacity-60 bg-gray-50" : ""}`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{task.name}</div>
            <div className="text-sm text-gray-500">
              {field?.name || ""} / {area?.name || ""} / {crop?.name || ""}
            </div>
            <div className="text-xs text-gray-500 mt-1">Due: {new Date(task.dueDateISO).toLocaleDateString()}</div>
            {task.note ? <div className="mt-1 text-sm">{task.note}</div> : null}
            {task.amount ? <div className="mt-1 text-sm">Amount: {task.amount}</div> : null}
            {task.photo ? <img src={task.photo} alt="photo" className="mt-2 w-32 h-20 object-cover rounded" /> : null}
          </div>
          <div className="flex flex-col gap-2 items-end">
            {!task.done ? (
              <>
                <button className="px-2 py-1 bg-green-600 text-white rounded text-sm" onClick={() => {
                  // quick done prompt: amount/note/photo
                  const amt = prompt("Amount given (optional)");
                  const note = prompt("Note (optional)");
                  const takePhoto = confirm("Add photo from device? (choose OK to open file picker)");
                  if (takePhoto) {
                    // open invisible file input
                    fileInputRef.current.onchange = (e) => {
                      const f = e.target.files[0];
                      handlePhotoFile(f, (dataUrl) => {
                        markTaskDone(task.id, { amount: amt || null, note: note || null, photo: dataUrl });
                        fileInputRef.current.value = "";
                      });
                    };
                    fileInputRef.current.click();
                  } else {
                    markTaskDone(task.id, { amount: amt || null, note: note || null });
                  }
                }}>{t("markDone")}</button>
                <button className="px-2 py-1 border rounded text-sm" onClick={() => {
                  const note = prompt("Note for task", task.note || "");
                  updateTask(task.id, { note });
                }}>Note</button>
                <button className="px-2 py-1 border rounded text-sm" onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            ) : (
              <>
                <div className="text-xs text-green-600">{t("done")}: {new Date(task.doneAt || task.createdAt).toLocaleString()}</div>
                <button className="px-2 py-1 border rounded text-sm" onClick={() => updateTask(task.id, { done: false, doneAt: null })}>Undo</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ----------------- Main render ----------------- */
  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      <Header />
      <div className="h-[calc(100vh-64px)] overflow-auto">
        {screen.name === "dashboard" && <Dashboard />}
        {screen.name === "fields" && <FieldsScreen />}
        {screen.name === "fieldDetail" && <FieldDetailScreen fieldId={screen.fieldId} />}
        {screen.name === "tasks" && <TasksScreen />}
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button className="px-3 py-2 rounded-full bg-blue-600 text-white" onClick={() => setScreen({ name: "dashboard" })}>🏠</button>
        <button className="px-3 py-2 rounded-full bg-green-600 text-white" onClick={() => setScreen({ name: "fields" })}>📁</button>
        <button className="px-3 py-2 rounded-full bg-orange-500 text-white" onClick={() => setScreen({ name: "tasks" })}>📅</button>
      </div>

      {/* invisible file input for photos */}
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} />
    </div>
  );
}
