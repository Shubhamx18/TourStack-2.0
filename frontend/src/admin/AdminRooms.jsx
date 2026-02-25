import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import Swal from 'sweetalert2';

const empty = { name: '', description: '', price: '', capacity: 2, status: 'active' };

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    const fetch = async () => { setLoading(true); try { const r = await api.get('/admin/rooms'); setRooms(r.data); } catch (e) { } finally { setLoading(false); } };
    useEffect(() => { fetch(); }, []);

    const openAdd = () => { setForm(empty); setEditing(null); setModal(true); };
    const openEdit = (r) => { setForm({ ...r }); setEditing(r.id); setModal(true); };
    const closeModal = () => { setModal(false); setEditing(null); };
    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) return Swal.fire({ icon: 'warning', title: 'Required fields missing', background: '#0d1526', color: '#f0f4ff' });
        setSaving(true);
        try {
            editing ? await api.put(`/admin/rooms/${editing}`, form) : await api.post('/admin/rooms', form);
            Swal.fire({ icon: 'success', title: editing ? 'Room Updated' : 'Room Created', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            closeModal(); fetch();
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', background: '#0d1526', color: '#f0f4ff' }); }
        finally { setSaving(false); }
    };

    const del = async (id, name) => {
        const c = await Swal.fire({ title: `Delete "${name}"?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#ff4757', background: '#0d1526', color: '#f0f4ff' });
        if (!c.isConfirmed) return;
        try { await api.delete(`/admin/rooms/${id}`); fetch(); } catch (e) { }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div><h1>Rooms</h1><p>{rooms.length} rooms available</p></div>
                    <button onClick={openAdd} className="btn btn-primary"><i className="fas fa-plus"></i> Add Room</button>
                </div>
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>All Rooms</h3></div>
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>Room Name</th><th>Price/Night</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {rooms.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No rooms found</td></tr>
                                        : rooms.map(r => (
                                            <tr key={r.id}>
                                                <td><div style={{ fontWeight: 600 }}>{r.name}</div><small style={{ color: 'var(--text3)' }}>{r.description?.substring(0, 50)}...</small></td>
                                                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{parseFloat(r.price).toLocaleString('en-IN')}</td>
                                                <td><i className="fas fa-user-friends" style={{ marginRight: '0.3rem', color: 'var(--text3)', fontSize: '0.8rem' }}></i>{r.capacity} guests</td>
                                                <td><span className={`badge ${r.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{r.status}</span></td>
                                                <td><div className="table-actions">
                                                    <button className="action-btn" onClick={() => openEdit(r)}><i className="fas fa-pen"></i></button>
                                                    <button className="action-btn danger" onClick={() => del(r.id, r.name)}><i className="fas fa-trash"></i></button>
                                                </div></td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {modal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{editing ? 'Edit Room' : 'Add New Room'}</h3>
                            <button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <div className="form-group"><label className="form-label">Room Name *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} /></div>
                                <div className="form-row">
                                    <div className="form-group"><label className="form-label">Price/Night (₹) *</label><input className="form-input" type="number" value={form.price} onChange={e => f('price', e.target.value)} /></div>
                                    <div className="form-group"><label className="form-label">Capacity</label><input className="form-input" type="number" value={form.capacity} onChange={e => f('capacity', e.target.value)} /></div>
                                    <div className="form-group"><label className="form-label">Status</label><select className="form-input" value={form.status} onChange={e => f('status', e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                                </div>
                                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} value={form.description} onChange={e => f('description', e.target.value)} /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminRooms;
