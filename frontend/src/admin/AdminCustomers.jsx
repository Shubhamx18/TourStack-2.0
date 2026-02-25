import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import Swal from 'sweetalert2';

const empty = { name: '', email: '', mobile: '', address: '' };

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');

    const fetch = async () => { setLoading(true); try { const r = await api.get('/admin/customers'); setCustomers(r.data); } catch (e) { } finally { setLoading(false); } };
    useEffect(() => { fetch(); }, []);

    const openAdd = () => { setForm(empty); setEditing(null); setModal(true); };
    const openEdit = (c) => { setForm({ ...c }); setEditing(c.id); setModal(true); };
    const closeModal = () => { setModal(false); setEditing(null); };
    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return Swal.fire({ icon: 'warning', title: 'Name and email required', background: '#0d1526', color: '#f0f4ff' });
        setSaving(true);
        try {
            editing ? await api.put(`/admin/customers/${editing}`, form) : await api.post('/admin/customers', form);
            Swal.fire({ icon: 'success', title: editing ? 'Customer Updated' : 'Customer Added', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            closeModal(); fetch();
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', background: '#0d1526', color: '#f0f4ff' }); }
        finally { setSaving(false); }
    };

    const del = async (id, name) => {
        const c = await Swal.fire({ title: `Delete "${name}"?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#ff4757', background: '#0d1526', color: '#f0f4ff' });
        if (!c.isConfirmed) return;
        try { await api.delete(`/admin/customers/${id}`); fetch(); } catch (e) { }
    };

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div><h1>Customers</h1><p>{customers.length} customers in the CRM</p></div>
                    <button onClick={openAdd} className="btn btn-primary"><i className="fas fa-plus"></i> Add Customer</button>
                </div>
                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>All Customers</h3>
                        <input className="form-input" style={{ width: 240 }} placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Address</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {filtered.length === 0 ? <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No customers found</td></tr>
                                        : filtered.map(c => (
                                            <tr key={c.id}>
                                                <td style={{ fontWeight: 600 }}>{c.name}</td>
                                                <td>{c.email}</td>
                                                <td>{c.mobile || '—'}</td>
                                                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.address || '—'}</td>
                                                <td><div className="table-actions">
                                                    <button className="action-btn" onClick={() => openEdit(c)}><i className="fas fa-pen"></i></button>
                                                    <button className="action-btn danger" onClick={() => del(c.id, c.name)}><i className="fas fa-trash"></i></button>
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
                            <h3>{editing ? 'Edit Customer' : 'Add Customer'}</h3>
                            <button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} /></div>
                                <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" value={form.email} onChange={e => f('email', e.target.value)} /></div>
                                <div className="form-group"><label className="form-label">Mobile</label><input className="form-input" value={form.mobile} onChange={e => f('mobile', e.target.value)} /></div>
                                <div className="form-group"><label className="form-label">Address</label><textarea className="form-input" rows={2} value={form.address} onChange={e => f('address', e.target.value)} /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Add Customer'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminCustomers;
