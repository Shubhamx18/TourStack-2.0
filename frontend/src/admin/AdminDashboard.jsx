import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import AdminSidebar from '../components/AdminSidebar';
import api from '../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const chartDefaults = { color: 'rgba(240,244,255,0.6)', borderColor: 'rgba(255,255,255,0.05)' };

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { api.get('/admin/stats').then(r => { setData(r.data); setLoading(false); }).catch(() => setLoading(false)); }, []);

    const fmtCurrency = (n) => '₹' + parseFloat(n || 0).toLocaleString('en-IN');

    const statCards = data ? [
        { label: 'Total Revenue', value: fmtCurrency(data.stats.revenue), icon: 'fas fa-rupee-sign', color: '#ff4757', bg: 'rgba(255,71,87,0.1)', trend: '+12%', up: true },
        { label: 'Total Bookings', value: data.stats.totalBookings, icon: 'fas fa-calendar-check', color: '#00d2d3', bg: 'rgba(0,210,211,0.1)', trend: '+8%', up: true },
        { label: 'Registered Users', value: data.stats.users, icon: 'fas fa-users', color: '#ffd32a', bg: 'rgba(255,211,42,0.1)', trend: '+15%', up: true },
        { label: 'Pending Bookings', value: data.stats.pending, icon: 'fas fa-clock', color: '#a29bfe', bg: 'rgba(162,155,254,0.1)', trend: '-3%', up: false },
    ] : [];

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const barData = data ? {
        labels: (data.monthly || []).map(m => MONTHS[m.month - 1]),
        datasets: [{ label: 'Bookings', data: (data.monthly || []).map(m => m.count), backgroundColor: 'rgba(255,71,87,0.7)', borderColor: '#ff4757', borderWidth: 1, borderRadius: 6, borderSkipped: false }]
    } : null;

    const doughnutData = data ? {
        labels: (data.statusDist || []).map(s => s.booking_status),
        datasets: [{ data: (data.statusDist || []).map(s => s.count), backgroundColor: ['rgba(0,230,118,0.8)', 'rgba(255,211,42,0.8)', 'rgba(255,71,87,0.8)', 'rgba(0,210,211,0.8)'], borderWidth: 0 }]
    } : null;

    const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'rgba(240,244,255,0.6)', font: { family: 'Plus Jakarta Sans', size: 12 } } } },
        scales: { x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(240,244,255,0.5)' } }, y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(240,244,255,0.5)' } } }
    };
    const doughnutOptions = {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: { legend: { position: 'bottom', labels: { color: 'rgba(240,244,255,0.6)', font: { family: 'Plus Jakarta Sans', size: 12 }, padding: 16 } } }
    };

    const getStatusBadge = (s) => {
        const map = { confirmed: 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger', completed: 'badge-info' };
        return `badge ${map[s] || 'badge-info'}`;
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <div className="admin-topbar">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back — here's what's happening today</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                    <>
                        <div className="admin-stats-row">
                            {statCards.map((s, i) => (
                                <div className="admin-stat-card" key={i}>
                                    <div className="admin-stat-icon" style={{ background: s.bg }}>
                                        <i className={s.icon} style={{ color: s.color }}></i>
                                    </div>
                                    <div className="admin-stat-value">{s.value}</div>
                                    <div className="admin-stat-label">{s.label}</div>
                                    <div className="admin-stat-trend" style={{ color: s.up ? 'var(--success)' : 'var(--danger)' }}>
                                        <i className={`fas fa-arrow-${s.up ? 'up' : 'down'}`}></i>{s.trend} this month
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="admin-charts-row">
                            <div className="chart-card">
                                <h3><i className="fas fa-chart-bar" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>Monthly Bookings</h3>
                                <div style={{ height: '260px' }}>
                                    {barData ? <Bar data={barData} options={chartOptions} /> : <div className="empty-state" style={{ padding: '2rem' }}><p>No data</p></div>}
                                </div>
                            </div>
                            <div className="chart-card">
                                <h3><i className="fas fa-chart-pie" style={{ color: 'var(--accent)', marginRight: '0.5rem' }}></i>Status Distribution</h3>
                                <div style={{ height: '260px' }}>
                                    {doughnutData ? <Doughnut data={doughnutData} options={doughnutOptions} /> : <div className="empty-state" style={{ padding: '2rem' }}><p>No data</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="admin-table-card">
                            <div className="admin-table-header">
                                <h3>Recent Bookings</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="admin-table">
                                    <thead><tr>
                                        <th>Customer</th><th>Item</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th>
                                    </tr></thead>
                                    <tbody>
                                        {(data?.recentBookings || []).map((b, i) => (
                                            <tr key={i}>
                                                <td>{b.user_name}</td>
                                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.item_name}</td>
                                                <td><span className={`badge ${b.type === 'tour' ? 'badge-primary' : b.type === 'room' ? 'badge-info' : 'badge-warning'}`}>{b.type}</span></td>
                                                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{parseFloat(b.total_amount).toLocaleString('en-IN')}</td>
                                                <td><span className={getStatusBadge(b.booking_status)}>{b.booking_status}</span></td>
                                                <td>{new Date(b.created_at).toLocaleDateString('en-IN')}</td>
                                            </tr>
                                        ))}
                                        {!(data?.recentBookings?.length) && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No recent bookings</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};
export default AdminDashboard;
