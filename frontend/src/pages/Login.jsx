import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Swal from 'sweetalert2';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) return Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Please fill in all fields.', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', form);
            login(data.token, data.user);
            Swal.fire({ icon: 'success', title: 'Welcome back!', text: `Hello, ${data.user.name}!`, timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            navigate('/');
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Login Failed', text: err.response?.data?.error || 'Invalid credentials', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        } finally { setLoading(false); }
    };

    return (
        <>
            <Header />
            <div className="auth-layout" style={{ paddingTop: '72px' }}>
                <div className="auth-left">
                    <div className="auth-left-content">
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                            <i className="fas fa-globe-asia" style={{ color: 'var(--primary)' }}></i>Tour<span style={{ color: 'var(--primary)' }}>Stack</span>
                        </div>
                        <h2>Your next <span className="grad-text">adventure</span> awaits you</h2>
                        <p>Login to access exclusive deals, manage your bookings, and discover amazing destinations across India.</p>
                        <div className="auth-features">
                            {[['fas fa-bookmark', 'Track all your bookings in one place'], ['fas fa-tags', 'Access member-only prices and deals'], ['fas fa-headset', 'Priority customer support 24/7']].map(([icon, text], i) => (
                                <div className="auth-feature" key={i}><i className={icon}></i><span>{text}</span></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-card">
                        <div className="auth-logo"><i className="fas fa-globe-asia"></i>Tour<span>Stack</span></div>
                        <h2>Welcome back</h2>
                        <p>Sign in to your account to continue</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-with-icon" style={{ position: 'relative' }}>
                                    <i className="fas fa-lock"></i>
                                    <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} autoComplete="current-password" />
                                    <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.85rem' }}>
                                        <i className={`fas fa-eye${showPass ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin"></i> Signing in...</> : <><i className="fas fa-sign-in-alt"></i> Sign In</>}
                            </button>
                        </form>
                        <div className="auth-footer">
                            Don't have an account? <Link to="/register">Create one free</Link>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                            <Link to="/admin/login" style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
                                <i className="fas fa-shield-alt"></i> Admin Panel Access
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Login;
