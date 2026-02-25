import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';
import Swal from 'sweetalert2';

const statusOptions = ['pending', 'confirmed', 'cancelled', 'completed'];
const payOptions = ['unpaid', 'paid'];

const statusClass = { confirmed: 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger', completed: 'badge-info' };
const payClass = { paid: 'badge-success', unpaid: 'badge-danger' };

const AdminBookings = () => {
    const [data, setData] = useState({ tours: [], rooms: [], packages: [] });
    const [tab, setTab] = useState('tours');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    const fetch = async () => {
        setLoading(true);
        try { const r = await api.get('/admin/bookings'); setData(r.data); } catch (e) { } finally { setLoading(false); }
    };
    useEffect(() => { fetch(); }, []);

    const updateStatus = async (type, id, booking_status, payment_status) => {
        setUpdating(id + type);
        try {
            await api.put(`/admin/bookings/${type}/${id}`, { booking_status, payment_status });
            setData(prev => ({
                ...prev,
                [type + 's']: prev[type + 's'].map(b => b.id === id ? { ...b, booking_status, payment_status } : b)
            }));
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', background: '#0d1526', color: '#f0f4ff' }); }
        finally { setUpdating(null); }
    };

    const list = data[tab];
    const type = tab.slice(0, -1);

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div><h1>Bookings</h1><p>Manage all tour, room and package bookings</p></div>
                </div>

                <div className="tabs" style={{ marginBottom: '1.5rem' }}>
                    {['tours', 'rooms', 'packages'].map(t => (
                        <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                            {t.charAt(0).toUpperCase() + t.slice(1)} ({data[t].length})
                        </button>
                    ))}
                </div>

                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>{tab.charAt(0).toUpperCase() + tab.slice(1)} Bookings</h3>
                        <button onClick={fetch} className="btn btn-ghost btn-sm"><i className="fas fa-sync"></i> Refresh</button>
                    </div>
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead><tr>
                                    <th>#ID</th><th>Customer</th><th>Item</th><th>Amount</th>
                                    <th>Booking Status</th><th>Payment Status</th><th>Date</th>
                                </tr></thead>
                                <tbody>
                                    {list.length === 0
                                        ? <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2.5rem' }}>No {tab} bookings found</td></tr>
                                        : list.map(b => (
                                            <tr key={b.id}>
                                                <td><span style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>#{b.id}</span></td>
                                                <td>
                                                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{b.user_name}</div>
                                                    <small>{b.email}</small>
                                                </td>
                                                <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.item_name}</td>
                                                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{parseFloat(b.total_amount).toLocaleString('en-IN')}</td>
                                                <td>
                                                    <select
                                                        className="select-sm"
                                                        value={b.booking_status}
                                                        disabled={updating === b.id + type}
                                                        onChange={e => updateStatus(type, b.id, e.target.value, b.payment_status)}
                                                    >
                                                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="select-sm"
                                                        value={b.payment_status}
                                                        disabled={updating === b.id + type}
                                                        onChange={e => updateStatus(type, b.id, b.booking_status, e.target.value)}
                                                    >
                                                        {payOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                </td>
                                                <td>{b.created_at ? new Date(b.created_at).toLocaleDateString('en-IN') : '—'}</td>
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
export default AdminBookings;
