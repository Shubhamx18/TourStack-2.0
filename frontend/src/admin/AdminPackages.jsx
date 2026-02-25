import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import Swal from 'sweetalert2';

const empty = { name: '', description: '', price: '', duration: '', accommodation: '', meals: '', location: '', status: 'active' };

const AdminPackages = () => {
    const [pkgs, setPkgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    const fetch = async () => { setLoading(true); try { const r = await api.get('/admin/packages'); setPkgs(r.data); } catch (e) { } finally { setLoading(false); } };
    useEffect(() => { fetch(); }, []);

    const openAdd = () => { setForm(empty); setEditing(null); setModal(true); };
    const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); setModal(true); };
    const closeModal = () => { setModal(false); setEditing(null); };
    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) return Swal.fire({ icon: 'warning', title: 'Required fields missing', background: '#0d1526', color: '#f0f4ff' });
        setSaving(true);
        try {
            editing ? await api.put(`/admin/packages/${editing}`, form) : await api.post('/admin/packages', form);
            Swal.fire({ icon: 'success', title: editing ? 'Package Updated' : 'Package Created', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            closeModal(); fetch();
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', background: '#0d1526', color: '#f0f4ff' }); }
        finally { setSaving(false); }
    };

    const del = async (id, name) => {
        const c = await Swal.fire({ title: `Delete "${name}"?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#ff4757', background: '#0d1526', color: '#f0f4ff' });
        if (!c.isConfirmed) return;
        try { await api.delete(`/admin/packages/${id}`); fetch(); } catch (e) { }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div><h1>Packages</h1><p>{pkgs.length} holiday packages</p></div>
                    <button onClick={openAdd} className="btn btn-primary"><i className="fas fa-plus"></i> Add Package</button>
                </div>
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>All Packages</h3></div>
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>Package</th><th>Location</th><th>Price</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {pkgs.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No packages found</td></tr>
                                        : pkgs.map(p => (
                                            <tr key={p.id}>
                                                <td><div style={{ fontWeight: 600 }}>{p.name}</div>{p.meals && <small>{p.meals}</small>}</td>
                                                <td>{p.location || '—'}</td>
                                                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{parseFloat(p.price).toLocaleString('en-IN')}</td>
                                                <td>{p.duration || '—'}</td>
                                                <td><span className={`badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{p.status}</span></td>
                                                <td><div className="table-actions">
                                                    <button className="action-btn" onClick={() => openEdit(p)}><i className="fas fa-pen"></i></button>
                                                    <button className="action-btn danger" onClick={() => del(p.id, p.name)}><i className="fas fa-trash"></i></button>
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
                    <div className="modal modal-lg">
                        <div className="modal-header">
                            <h3>{editing ? 'Edit Package' : 'Add Package'}</h3>
                            <button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group"><label className="form-label">Package Name *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} /></div>
                                    <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => f('location', e.target.value)} /></div>
                                    <div className="form-group"><label className="form-label">Price (₹) *</label><input className="form-input" type="number" value={form.price} onChange={e => f('price', e.target.value)} /></div>
                                    <div className="form-group"><label className="form-label">Duration</label><input className="form-input" value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="e.g. 5 Days 4 Nights" /></div>
                                    <div className="form-group"><label className="form-label">Accommodation</label><input className="form-input" value={form.accommodation} onChange={e => f('accommodation', e.target.value)} placeholder="e.g. 4-Star Hotel" /></div>
                                    <div className="form-group"><label className="form-label">Meals</label><input className="form-input" value={form.meals} onChange={e => f('meals', e.target.value)} placeholder="e.g. Breakfast + Dinner" /></div>
                                    <div className="form-group"><label className="form-label">Status</label><select className="form-input" value={form.status} onChange={e => f('status', e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                                </div>
                                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={4} value={form.description} onChange={e => f('description', e.target.value)} /></div>
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
export default AdminPackages;
