import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function FieldList() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [areaDrawerOpen, setAreaDrawerOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, target: null });
  const [editField, setEditField] = useState(null);
  const [editingAreaContext, setEditingAreaContext] = useState({ fieldId: null, area: null });

  const [fieldForm, setFieldForm] = useState({ name: '', size: '', sizeUnit: 'm2', notes: '' });
  const [areaForm, setAreaForm] = useState({ name: '', typeId: '', size: '', sizeUnit: 'm2', notes: '' });

const navigate = useNavigate();

  useEffect(() => {
    loadFields();
  }, []);

  async function loadFields() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/fields`);
      const data = await res.json();
      setFields(data);
    } catch (err) {
      console.error('Failed to load fields', err);
      alert('Failed to load fields');
    } finally {
      setLoading(false);
    }
  }

  function openAddDrawer() {
    setEditField(null);
    setFieldForm({ name: '', size: '', sizeUnit: 'm2', notes: '' });
    setDrawerOpen(true);
  }

  function openEditDrawer(field) {
    setEditField(field);
    setFieldForm({
      name: field.name || '',
      size: field.size ?? '',
      sizeUnit: field.sizeUnit || 'm2',
      notes: field.notes || ''
    });
    setDrawerOpen(true);
  }

  async function saveField() {
    if (!fieldForm.name.trim()) {
      alert('Field name is required');
      return;
    }

    try {
      if (editField) {
        const res = await fetch(`${API_BASE}/api/fields/${editField._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fieldForm.name,
            size: fieldForm.size ? Number(fieldForm.size) : null,
            sizeUnit: fieldForm.sizeUnit,
            notes: fieldForm.notes
          })
        });
        if (!res.ok) throw new Error('Update failed');
      } else {
        const res = await fetch(`${API_BASE}/api/fields`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fieldForm.name,
            size: fieldForm.size ? Number(fieldForm.size) : null,
            sizeUnit: fieldForm.sizeUnit,
            notes: fieldForm.notes
          })
        });
        if (!res.ok) throw new Error('Create failed');
      }
      await loadFields();
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save field');
    }
  }

  function confirmDeleteField(field) {
    setDeleteModal({ open: true, target: { type: 'field', id: field._id, name: field.name } });
  }

  async function handleDeleteConfirmed() {
    if (!deleteModal.target) return;
    const { type, id } = deleteModal.target;
    try {
      if (type === 'field') {
        const res = await fetch(`${API_BASE}/api/fields/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
      } else if (type === 'area') {
        // payload includes fieldId and areaId in target
        const res = await fetch(`${API_BASE}/api/fields/${deleteModal.target.fieldId}/areas/${deleteModal.target.areaId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
      }
      await loadFields();
      setDeleteModal({ open: false, target: null });
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  }

  function openAddAreaDrawer(fieldId) {
    setEditingAreaContext({ fieldId, area: null });
    setAreaForm({ name: '', typeId: '', size: '', sizeUnit: 'm2', notes: '' });
    setAreaDrawerOpen(true);
  }

  function openEditAreaDrawer(fieldId, area) {
    setEditingAreaContext({ fieldId, area });
    setAreaForm({
      name: area.name || '',
      typeId: area.typeId || '',
      size: area.size ?? '',
      sizeUnit: area.sizeUnit || 'm2',
      notes: area.notes || ''
    });
    setAreaDrawerOpen(true);
  }

  async function saveArea() {
    if (!areaForm.name.trim()) {
      alert('Area name is required');
      return;
    }
    const { fieldId, area } = editingAreaContext;
    try {
      if (area) {
        const res = await fetch(`${API_BASE}/api/fields/${fieldId}/areas/${area._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: areaForm.name,
            typeId: areaForm.typeId,
            size: areaForm.size ? Number(areaForm.size) : null,
            sizeUnit: areaForm.sizeUnit,
            notes: areaForm.notes
          })
        });
        if (!res.ok) throw new Error('Update area failed');
      } else {
        const res = await fetch(`${API_BASE}/api/fields/${fieldId}/areas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: areaForm.name,
            typeId: areaForm.typeId,
            size: areaForm.size ? Number(areaForm.size) : null,
            sizeUnit: areaForm.sizeUnit,
            notes: areaForm.notes
          })
        });
        if (!res.ok) throw new Error('Create area failed');
      }
      await loadFields();
      setAreaDrawerOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save area');
    }
  }

  function confirmDeleteArea(fieldId, area) {
    setDeleteModal({
      open: true,
      target: { type: 'area', fieldId, areaId: area._id, name: area.name }
    });
  }

  function toggleExpand(fieldId) {
    setFields(prev => prev.map(f => f._id === fieldId ? { ...f, _open: !f._open } : f));
  }

  if (loading) {
    return <div className="p-8 text-center">Loading fields...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Fields</h1>
          <p className="text-gray-600 text-sm">Manage your fields, areas and crops</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md" onClick={openAddDrawer}>
          <Plus size={16} /> Add Field
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-lg">No fields created yet.</div>
      ) : (
        <div className="space-y-4">
          {fields.map(field => (
            <div
              key={field._id} 
              className="bg-white rounded-lg shadow p-4 border cursor-pointer"
              onClick={() => toggleExpand(field._id)} 
             >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{field.name}</h2>
                  {field.size && <p className="text-sm text-gray-600">{field.size} {field.sizeUnit}</p>}
                  {field.notes && <p className="text-sm text-gray-500 mt-1">{field.notes}</p>}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border rounded hover:bg-gray-100 cursor-pointer" 
                    onClick={(e) => {
                    e.stopPropagation();
                    openEditDrawer(field)
                  }}                  >
                    <Edit size={16} />
                  </button>
                  <button className="p-2 border rounded hover:bg-red-50 text-red-600 cursor-pointer" 
                    onClick={(e) => {
                    e.stopPropagation();
                    confirmDeleteField(field)
                  }}>
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
                   onClick={(e) => {
                   e.stopPropagation();
                   toggleExpand(field._id)
                   }}>
                    <span className="sr-only">Expand</span>▼
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center mt-4">
                <div>
                  <p className="font-semibold">{field.areas?.length || 0}</p>
                  <p className="text-sm text-gray-600">Areas</p>
                </div>
                <div>
                  <p className="font-semibold">{(field.areas || []).reduce((s,a)=>s+(a.cropInstancesCount||0),0)}</p>
                  <p className="text-sm text-gray-600">Crops</p>
                </div>
                <div>
                  <p className="font-semibold text-red-500">{(field.areas || []).reduce((s,a)=>s+(a.overdueTasksCount||0),0)}</p>
                  <p className="text-sm text-gray-600">Overdue</p>
                </div>
              </div>

              {/* Expandable areas */}
              {/* Expandable areas */}
{field._open && (
  <div className="mt-6 bg-gray-50 rounded-lg border overflow-hidden">
    
    {/* Header */}
    <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-100">
      <h4 className="font-medium text-gray-900">
        Areas ({field.areas?.length || 0})
      </h4>

      <button
        onClick={() => openAddAreaDrawer(field.id || field._id)}
        className="text-green-700 text-sm font-medium hover:underline"
      >
        + Add Area
      </button>
    </div>

    {/* Area List */}
    <div className="p-4 space-y-3">
      {field.areas?.length > 0 ? (
        field.areas.map(area => (
          <div
            key={area.id || area._id}
            className="bg-white border p-4 rounded-lg shadow-sm flex justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{area.name}</p>

                {area.typeId && (
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {area.typeId}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                {area.size} {area.sizeUnit}
              </p>

              {area.notes && (
                <p className="text-sm text-gray-500 mt-1">{area.notes}</p>
              )}

              <p className="text-sm text-gray-700 mt-2">
                {area.cropInstancesCount || 0} crops
              </p>
            </div>

            <div className="flex flex-col gap-2 text-right">
              <button
                onClick={() =>
                  navigate(`/area/${area.id || area._id}`)
                }
                className="text-blue-600 hover:underline text-sm"
              >
                + Add Crop
              </button>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() =>
                    openEditAreaDrawer(field.id || field._id, area)
                  }
                  className="p-1 border rounded hover:bg-gray-100"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() =>
                    confirmDeleteArea(field.id || field._id, area)
                  }
                  className="p-1 border rounded text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center py-4">
          No areas yet. Add your first area.
        </p>
      )}
    </div>
  </div>
)}


            </div>
          ))}
        </div>
      )}

      {/* Field Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editField ? 'Edit Field' : 'Add Field'}</h2>
              <button onClick={() => setDrawerOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Field Name *</label>
                <input className="w-full border p-2 rounded mt-1" value={fieldForm.name} onChange={(e)=>setFieldForm({...fieldForm, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm">Size</label>
                  <input className="w-full border p-2 rounded mt-1" value={fieldForm.size} onChange={(e)=>setFieldForm({...fieldForm, size: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm">Unit</label>
                  <select className="w-full border p-2 rounded mt-1" value={fieldForm.sizeUnit} onChange={(e)=>setFieldForm({...fieldForm, sizeUnit: e.target.value})}>
                    <option value="m2">m²</option>
                    <option value="acres">acres</option>
                    <option value="hectares">hectares</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm">Notes</label>
                <textarea className="w-full border p-2 rounded mt-1" rows="3" value={fieldForm.notes} onChange={(e)=>setFieldForm({...fieldForm, notes: e.target.value})}></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 border rounded" onClick={()=>setDrawerOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={saveField}>{editField ? 'Update' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Area Drawer */}
      {areaDrawerOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editingAreaContext.area ? 'Edit Area' : 'Add Area'}</h2>
              <button onClick={() => setAreaDrawerOpen(false)}><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Area Name *</label>
                <input className="w-full border p-2 rounded mt-1" value={areaForm.name} onChange={(e)=>setAreaForm({...areaForm, name: e.target.value})} />
              </div>

              <div>
                <label className="text-sm">Area Type</label>
                <input className="w-full border p-2 rounded mt-1" value={areaForm.typeId} onChange={(e)=>setAreaForm({...areaForm, typeId: e.target.value})} placeholder="e.g., atype-bed" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm">Size</label>
                  <input className="w-full border p-2 rounded mt-1" value={areaForm.size} onChange={(e)=>setAreaForm({...areaForm, size: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm">Unit</label>
                  <select className="w-full border p-2 rounded mt-1" value={areaForm.sizeUnit} onChange={(e)=>setAreaForm({...areaForm, sizeUnit: e.target.value})}>
                    <option value="m2">m²</option>
                    <option value="acres">acres</option>
                    <option value="hectares">hectares</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm">Notes</label>
                <textarea className="w-full border p-2 rounded mt-1" rows="3" value={areaForm.notes} onChange={(e)=>setAreaForm({...areaForm, notes: e.target.value})}></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 border rounded" onClick={()=>setAreaDrawerOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={saveArea}>Save Area</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
            <p className="text-sm text-gray-700 mb-4">Are you sure you want to delete <strong>{deleteModal.target?.name}</strong>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 border rounded" onClick={()=>setDeleteModal({open:false,target:null})}>Cancel</button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded" onClick={handleDeleteConfirmed}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
