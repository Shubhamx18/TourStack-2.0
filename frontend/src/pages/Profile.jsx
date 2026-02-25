import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, login } = useAuth();
    const [tab, setTab] = useState('profile');
    const [profile, setProfile] = useState({ name: '', email: '', phone: '', dob: '' });
    const [passwords, setPasswords] = useState({ current_password: '', new_password: '', confirm_password: '' });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/auth/profile').then(r => setProfile({ name: r.data.name || '', email: r.data.email || '', phone: r.data.phone || '', dob: r.data.dob ? r.data.dob.split('T')[0] : '' })).catch(() => { });
    }, []);

    const saveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/auth/profile', profile);
            login(localStorage.getItem('token'), { ...user, name: profile.name });
            Swal.fire({ icon: 'success', title: 'Profile Updated', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.error || 'Update failed', background: '#0d1526', color: '#f0f4ff' });
        } finally { setSaving(false); }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        if (passwords.new_password !== passwords.confirm_password) return Swal.fire({ icon: 'error', title: 'Mismatch', text: 'Passwords do not match', background: '#0d1526', color: '#f0f4ff' });
        setSaving(true);
        try {
            await api.put('/auth/change-password', passwords);
            Swal.fire({ icon: 'success', title: 'Password Changed Successfully', timer: 1800, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            setPasswords({ current_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.error || 'Change failed', background: '#0d1526', color: '#f0f4ff' });
        } finally { setSaving(false); }
    };

    const initials = profile.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>Profile</span></div>
                    <h1>My <span className="grad-text">Profile</span></h1>
                </div>
            </div>
            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div className="profile-layout">
                        <div className="profile-card">
                            <div className="profile-avatar-wrap">{initials}</div>
                            <div className="profile-name">{profile.name || 'Traveler'}</div>
                            <div className="profile-email">{profile.email}</div>
                            <div className="profile-nav">
                                {[['profile', 'fas fa-user', 'Profile Info'], ['password', 'fas fa-lock', 'Change Password'], ['bookings', 'fas fa-bookmark', 'My Bookings']].map(([t, icon, label]) => (
                                    t === 'bookings'
                                        ? <Link key={t} to="/my-bookings" className="profile-nav-btn"><i className={icon}></i>{label}</Link>
                                        : <button key={t} className={`profile-nav-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}><i className={icon}></i>{label}</button>
                                ))}
                            </div>
                        </div>

                        <div className="profile-main-card">
                            {tab === 'profile' && (
                                <>
                                    <div className="profile-section-title">Personal Information</div>
                                    <form onSubmit={saveProfile}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Full Name</label>
                                                <div className="input-with-icon"><i className="fas fa-user"></i>
                                                    <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Your name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email Address</label>
                                                <div className="input-with-icon"><i className="fas fa-envelope"></i>
                                                    <input className="form-input" value={profile.email} readOnly style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Phone Number</label>
                                                <div className="input-with-icon"><i className="fas fa-phone"></i>
                                                    <input className="form-input" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 98765 43210" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Date of Birth</label>
                                                <div className="input-with-icon"><i className="fas fa-birthday-cake"></i>
                                                    <input className="form-input" type="date" value={profile.dob} onChange={e => setProfile({ ...profile, dob: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary" disabled={saving}>
                                            {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Changes</>}
                                        </button>
                                    </form>
                                </>
                            )}
                            {tab === 'password' && (
                                <>
                                    <div className="profile-section-title">Change Password</div>
                                    <form onSubmit={changePassword} style={{ maxWidth: '420px' }}>
                                        {[['current_password', 'fas fa-key', 'Current Password'], ['new_password', 'fas fa-lock', 'New Password'], ['confirm_password', 'fas fa-lock', 'Confirm New Password']].map(([field, icon, label]) => (
                                            <div className="form-group" key={field}>
                                                <label className="form-label">{label}</label>
                                                <div className="input-with-icon"><i className={icon}></i>
                                                    <input className="form-input" type="password" placeholder="••••••••" value={passwords[field]} onChange={e => setPasswords({ ...passwords, [field]: e.target.value })} />
                                                </div>
                                            </div>
                                        ))}
                                        <button type="submit" className="btn btn-primary" disabled={saving}>
                                            {saving ? <><i className="fas fa-spinner fa-spin"></i> Updating...</> : <><i className="fas fa-key"></i> Change Password</>}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default Profile;
