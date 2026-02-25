import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import Swal from 'sweetalert2';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetch = async () => { setLoading(true); try { const r = await api.get('/admin/users'); setUsers(r.data); } catch (e) { } finally { setLoading(false); } };
    useEffect(() => { fetch(); }, []);

    const del = async (id, name) => {
        const c = await Swal.fire({ title: `Delete user "${name}"?`, text: 'This will permanently remove the user and all their data.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete User', confirmButtonColor: '#ff4757', background: '#0d1526', color: '#f0f4ff' });
        if (!c.isConfirmed) return;
        try { await api.delete(`/admin/users/${id}`); Swal.fire({ icon: 'success', title: 'User Deleted', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' }); fetch(); }
        catch (e) { Swal.fire({ icon: 'error', title: 'Error', background: '#0d1526', color: '#f0f4ff' }); }
    };

    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    const initials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div><h1>Users</h1><p>{users.length} registered users</p></div>
                </div>
                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>All Users</h3>
                        <input className="form-input" style={{ width: 240 }} placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr><th>User</th><th>Email</th><th>Phone</th><th>DOB</th><th>Joined</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {filtered.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No users found</td></tr>
                                        : filtered.map(u => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials(u.name)}</div>
                                                        <div style={{ fontWeight: 600 }}>{u.name}</div>
                                                    </div>
                                                </td>
                                                <td>{u.email}</td>
                                                <td>{u.phone || '—'}</td>
                                                <td>{u.dob ? new Date(u.dob).toLocaleDateString('en-IN') : '—'}</td>
                                                <td>{u.created_at ? new Date(u.created_at).toLocaleDateString('en-IN') : '—'}</td>
                                                <td>
                                                    <button className="action-btn danger" onClick={() => del(u.id, u.name)} title="Delete"><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
export default AdminUsers;
