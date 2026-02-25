import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Swal from 'sweetalert2';

const AdminLogin = () => {
    const { adminLogin } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/admin/login', form);
            adminLogin(data.token, data.admin);
            navigate('/admin/dashboard');
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Access Denied', text: err.response?.data?.error || 'Invalid credentials', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        } finally { setLoading(false); }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,var(--primary),#c0392b)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.6rem', color: '#fff', boxShadow: '0 8px 30px var(--primary-glow)' }}>
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.3rem' }}>Admin Access</h1>
                    <p style={{ color: 'var(--text3)', fontSize: '0.875rem' }}>Restricted area — authorized personnel only</p>
                </div>

                <div className="form-card" style={{ border: '1px solid var(--border2)' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <div className="input-with-icon">
                                <i className="fas fa-user"></i>
                                <input className="form-input" type="text" placeholder="admin" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} autoFocus />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                <i className="fas fa-lock"></i>
                                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                                <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
                                    <i className={`fas fa-eye${showPass ? '-slash' : ''}`}></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
                            {loading ? <><i className="fas fa-spinner fa-spin"></i> Authenticating...</> : <><i className="fas fa-sign-in-alt"></i> Access Dashboard</>}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text3)' }}>
                    <Link to="/" style={{ color: 'var(--text3)' }}><i className="fas fa-arrow-left"></i> Back to Main Site</Link>
                </p>
            </div>
        </div>
    );
};
export default AdminLogin;
