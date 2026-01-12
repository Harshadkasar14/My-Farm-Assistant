const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function apiGetArea(id) {
  return fetch(`${API}/api/areas/${id}`).then(r => r.json());
}

export async function apiGetField(id) {
  return fetch(`${API}/api/fields/${id}`).then(r => r.json());
}

export async function apiGetCropInstances(areaId) {
  return fetch(`${API}/api/cropInstances/area/${areaId}`).then(r => r.json());
}

export async function apiGetLibraryCrops() {
  return fetch(`${API}/api/crop-libraries`).then(r => r.json());
}

export async function apiCreateCropInstance(payload) {
  return fetch(`${API}/api/cropInstances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(r => r.json());
}
