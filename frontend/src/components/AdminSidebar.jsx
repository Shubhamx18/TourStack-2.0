import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
    { section: 'Main' },
    { to: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { section: 'Management' },
    { to: '/admin/bookings', icon: 'fas fa-calendar-check', label: 'Bookings' },
    { to: '/admin/tours', icon: 'fas fa-map-marked-alt', label: 'Tours' },
    { to: '/admin/rooms', icon: 'fas fa-bed', label: 'Rooms' },
    { to: '/admin/packages', icon: 'fas fa-suitcase-rolling', label: 'Packages' },
    { section: 'People' },
    { to: '/admin/customers', icon: 'fas fa-users', label: 'Customers' },
    { to: '/admin/users', icon: 'fas fa-user-circle', label: 'Users' },
];

const AdminSidebar = () => {
    const { adminLogout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { adminLogout(); navigate('/admin/login'); };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon"><i className="fas fa-globe-asia"></i></div>
                <div>
                    <div className="sidebar-logo-text">TourStack</div>
                    <div className="sidebar-logo-sub">Admin Panel</div>
                </div>
            </div>
            <nav className="sidebar-nav">
                {links.map((item, i) =>
                    item.section ? (
                        <div className="sidebar-section" key={`s-${i}`}>{item.section}</div>
                    ) : (
                        <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}>
                            <i className={item.icon}></i>{item.label}
                        </NavLink>
                    )
                )}
            </nav>
            <div className="sidebar-footer">
                <div style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem', background: 'rgba(255,71,87,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#ff4757,#c0392b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-shield-alt" style={{ fontSize: '0.75rem', color: '#fff' }}></i>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text1)' }}>Administrator</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>Full Access</div>
                    </div>
                </div>
                <a href="/" className="sidebar-item" style={{ color: 'var(--text2)', fontSize: '0.82rem' }}>
                    <i className="fas fa-external-link-alt"></i> Main Site
                </a>
                <button onClick={handleLogout} className="sidebar-item" style={{ color: 'var(--danger)' }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </aside>
    );
};
export default AdminSidebar;
