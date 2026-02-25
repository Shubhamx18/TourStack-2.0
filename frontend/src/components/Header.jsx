import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout, adminUser, adminLogout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => { logout(); navigate('/'); };
    const handleAdminLogout = () => { adminLogout(); navigate('/admin/login'); };

    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/tours', label: 'Tours' },
        { to: '/rooms', label: 'Rooms' },
        { to: '/packages', label: 'Packages' },
        { to: '/facilities', label: 'Facilities' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`header${scrolled ? ' scrolled' : ''}`}>
            <nav className="navbar">
                <Link to="/" className="nav-logo">
                    <i className="fas fa-globe-asia"></i>
                    Tour<span>Stack</span>
                </Link>

                <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
                    {navItems.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                                {label}
                            </NavLink>
                        </li>
                    ))}

                    {/* Mobile menu — admin logged in */}
                    {menuOpen && adminUser && (
                        <>
                            <li><Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                            <li><Link to="/admin/bookings" onClick={() => setMenuOpen(false)}><i className="fas fa-calendar-check"></i> Bookings</Link></li>
                            <li><Link to="/admin/tours" onClick={() => setMenuOpen(false)}><i className="fas fa-map-marked-alt"></i> Tours</Link></li>
                            <li><Link to="/admin/rooms" onClick={() => setMenuOpen(false)}><i className="fas fa-bed"></i> Rooms</Link></li>
                            <li><Link to="/admin/packages" onClick={() => setMenuOpen(false)}><i className="fas fa-suitcase-rolling"></i> Packages</Link></li>
                            <li>
                                <button onClick={handleAdminLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontFamily: 'inherit', fontSize: '0.87rem', fontWeight: 600, padding: '0.5rem 0.9rem', width: '100%', textAlign: 'left' }}>
                                    <i className="fas fa-sign-out-alt"></i> Admin Logout
                                </button>
                            </li>
                        </>
                    )}

                    {/* Mobile menu — regular user */}
                    {menuOpen && !adminUser && !user && (
                        <>
                            <li><Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Login</Link></li>
                            <li><Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Register</Link></li>
                        </>
                    )}
                    {menuOpen && !adminUser && user && (
                        <>
                            <li><Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link></li>
                            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                            <li>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontFamily: 'inherit', fontSize: '0.87rem', fontWeight: 600, padding: '0.5rem 0.9rem', width: '100%', textAlign: 'left' }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                <div className="nav-actions">

                    {/* ── ADMIN logged in ── */}
                    {adminUser ? (
                        <div className="user-menu">
                            <div className="user-trigger">
                                <div className="user-avatar" style={{ background: 'linear-gradient(135deg,#ff4757,#c0392b)', fontSize: '0.75rem' }}>
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <span className="user-name">Admin</span>
                                <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--text3)' }}></i>
                            </div>
                            <div className="dropdown glass">
                                <Link to="/admin/dashboard" className="dropdown-item"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                                <Link to="/admin/bookings" className="dropdown-item"><i className="fas fa-calendar-check"></i> Bookings</Link>
                                <Link to="/admin/tours" className="dropdown-item"><i className="fas fa-map-marked-alt"></i> Tours</Link>
                                <Link to="/admin/rooms" className="dropdown-item"><i className="fas fa-bed"></i> Rooms</Link>
                                <Link to="/admin/packages" className="dropdown-item"><i className="fas fa-suitcase-rolling"></i> Packages</Link>
                                <Link to="/admin/customers" className="dropdown-item"><i className="fas fa-users"></i> Customers</Link>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleAdminLogout} className="dropdown-item danger">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        </div>

                        /* ── Regular USER logged in ── */
                    ) : user ? (
                        <div className="user-menu">
                            <div className="user-trigger">
                                <div className="user-avatar">{initials}</div>
                                <span className="user-name">{user.name?.split(' ')[0]}</span>
                                <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', color: 'var(--text3)' }}></i>
                            </div>
                            <div className="dropdown glass">
                                <Link to="/my-bookings" className="dropdown-item"><i className="fas fa-bookmark"></i> My Bookings</Link>
                                <Link to="/profile" className="dropdown-item"><i className="fas fa-user"></i> Profile</Link>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleLogout} className="dropdown-item danger">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        </div>

                        /* ── NOT logged in ── */
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                        </>
                    )}

                    <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
                        <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
                    </button>
                </div>
            </nav>
        </header>
    );
};
export default Header;
