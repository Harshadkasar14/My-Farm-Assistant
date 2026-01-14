import api from "./axiosApi.js";



// Get single area
export async function apiGetArea(id) {
  const res = await api.get(`/api/areas/${id}`);
  return res.data;
}

// Get single field
export async function apiGetField(id) {
  const res = await api.get(`/api/fields/${id}`);
  return res.data;
}

// Get crop instances by area
export async function apiGetCropInstances(areaId) {
  const res = await api.get(`/api/cropInstances/area/${areaId}`);
  return res.data;
}

// Get crop library
export async function apiGetLibraryCrops() {
  const res = await api.get(`/api/crop-libraries`);
  return res.data;
}


// Create crop instance
export async function apiCreateCropInstance(payload) {
  const res = await api.post(`/api/cropInstances`, payload);
  return res.data;
}
