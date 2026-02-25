import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import Swal from 'sweetalert2';

const empty = { name: '', description: '', price: '', duration: '', max_people: 10, location: '', tag: '', status: 'active' };

const AdminTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');

    const fetch = async () => { setLoading(true); try { const r = await api.get('/admin/tours'); setTours(r.data); } catch (e) { } finally { setLoading(false); } };
    useEffect(() => { fetch(); }, []);

    const openAdd = () => { setForm(empty); setEditing(null); setModal(true); };
    const openEdit = (t) => { setForm({ ...t }); setEditing(t.id); setModal(true); };
    const closeModal = () => { setModal(false); setEditing(null); setForm(empty); };
    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) return Swal.fire({ icon: 'warning', title: 'Required', text: 'Name and price are required', background: '#0d1526', color: '#f0f4ff' });
        setSaving(true);
        try {
            editing ? await api.put(`/admin/tours/${editing}`, form) : await api.post('/admin/tours', form);
            Swal.fire({ icon: 'success', title: editing ? 'Tour Updated' : 'Tour Created', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            closeModal(); fetch();
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.error, background: '#0d1526', color: '#f0f4ff' }); }
        finally { setSaving(false); }
    };

    const del = async (id, name) => {
        const c = await Swal.fire({ title: `Delete "${name}"?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#ff4757', background: '#0d1526', color: '#f0f4ff' });
        if (!c.isConfirmed) return;
        try { await api.delete(`/admin/tours/${id}`); fetch(); } catch (e) { Swal.fire({ icon: 'error', title: 'Error', background: '#0d1526', color: '#f0f4ff' }); }
    };

    const filtered = tours.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div><h1>Tours</h1><p>{tours.length} tours in the system</p></div>
                    <button onClick={openAdd} className="btn btn-primary"><i className="fas fa-plus"></i> Add Tour</button>
                </div>

                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>All Tours</h3>
                        <input className="form-input" style={{ width: 240 }} placeholder="Search tours..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>Name</th><th>Location</th><th>Price</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {filtered.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No tours found</td></tr>
                                        : filtered.map(t => (
                                            <tr key={t.id}>
                                                <td><div style={{ fontWeight: 600 }}>{t.name}</div>{t.tag && <span className="badge badge-primary" style={{ marginTop: '0.25rem' }}>{t.tag}</span>}</td>
                                                <td>{t.location || '—'}</td>
                                                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{parseFloat(t.price).toLocaleString('en-IN')}</td>
                                                <td>{t.duration || '—'}</td>
                                                <td><span className={`badge ${t.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{t.status}</span></td>
                                                <td><div className="table-actions">
                                                    <button className="action-btn" onClick={() => openEdit(t)} title="Edit"><i className="fas fa-pen"></i></button>
                                                    <button className="action-btn danger" onClick={() => del(t.id, t.name)} title="Delete"><i className="fas fa-trash"></i></button>
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
                            <h3>{editing ? 'Edit Tour' : 'Add New Tour'}</h3>
                            <button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group"><label className="form-label">Tour Name *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} placeholder="Tour name" /></div>
                                    <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Goa, India" /></div>
                                    <div className="form-group"><label className="form-label">Price (₹) *</label><input className="form-input" type="number" value={form.price} onChange={e => f('price', e.target.value)} placeholder="0" /></div>
                                    <div className="form-group"><label className="form-label">Duration</label><input className="form-input" value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="e.g. 3 Days 2 Nights" /></div>
                                    <div className="form-group"><label className="form-label">Max People</label><input className="form-input" type="number" value={form.max_people} onChange={e => f('max_people', e.target.value)} /></div>
                                    <div className="form-group"><label className="form-label">Tag</label><input className="form-input" value={form.tag} onChange={e => f('tag', e.target.value)} placeholder="e.g. Popular" /></div>
                                    <div className="form-group"><label className="form-label">Status</label><select className="form-input" value={form.status} onChange={e => f('status', e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                                </div>
                                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={4} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Tour description..." /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update Tour' : 'Create Tour'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminTours;
