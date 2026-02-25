import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Swal from 'sweetalert2';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm_password: '', phone: '', dob: '' });
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [step, setStep] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) return Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Please fill in all required fields.', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        if (form.password !== form.confirm_password) return Swal.fire({ icon: 'error', title: 'Password Mismatch', text: 'Passwords do not match.', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        if (form.password.length < 6) return Swal.fire({ icon: 'warning', title: 'Weak Password', text: 'Password must be at least 6 characters.', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', form);
            login(data.token, data.user);
            Swal.fire({ icon: 'success', title: 'Account Created!', text: `Welcome to TourStack, ${data.user.name}!`, timer: 1800, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            navigate('/');
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.response?.data?.error || 'Something went wrong', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
        } finally { setLoading(false); }
    };

    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    return (
        <>
            <Header />
            <div className="auth-layout" style={{ paddingTop: '72px' }}>
                <div className="auth-left">
                    <div className="auth-left-content">
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                            <i className="fas fa-globe-asia" style={{ color: 'var(--primary)' }}></i>Tour<span style={{ color: 'var(--primary)' }}>Stack</span>
                        </div>
                        <h2>Join thousands of happy <span className="grad-text">travelers</span></h2>
                        <p>Create a free account and start planning your dream vacation with India's premier travel platform.</p>
                        <div className="auth-features">
                            {[['fas fa-gift', 'Exclusive member benefits and early access'], ['fas fa-map', 'Personalized travel recommendations'], ['fas fa-shield-alt', 'Safe and secure booking guarantee']].map(([icon, text], i) => (
                                <div className="auth-feature" key={i}><i className={icon}></i><span>{text}</span></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-card">
                        <div className="auth-logo"><i className="fas fa-globe-asia"></i>Tour<span>Stack</span></div>
                        <h2>Create account</h2>
                        <p>Join TourStack today — it's completely free</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <div className="input-with-icon"><i className="fas fa-user"></i>
                                        <input className="form-input" type="text" placeholder="John Doe" value={form.name} onChange={e => f('name', e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <div className="input-with-icon"><i className="fas fa-phone"></i>
                                        <input className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => f('phone', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <div className="input-with-icon"><i className="fas fa-envelope"></i>
                                    <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => f('email', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <div className="input-with-icon"><i className="fas fa-birthday-cake"></i>
                                    <input className="form-input" type="date" value={form.dob} onChange={e => f('dob', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Password *</label>
                                    <div className="input-with-icon" style={{ position: 'relative' }}><i className="fas fa-lock"></i>
                                        <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={e => f('password', e.target.value)} />
                                        <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
                                            <i className={`fas fa-eye${showPass ? '-slash' : ''}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Confirm Password *</label>
                                    <div className="input-with-icon"><i className="fas fa-lock"></i>
                                        <input className="form-input" type="password" placeholder="Repeat password" value={form.confirm_password} onChange={e => f('confirm_password', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating Account...</> : <><i className="fas fa-user-plus"></i> Create Account</>}
                            </button>
                        </form>
                        <div className="auth-footer">Already have an account? <Link to="/login">Sign in here</Link></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Register;
