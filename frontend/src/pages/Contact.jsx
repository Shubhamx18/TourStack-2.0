import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import Swal from 'sweetalert2';

const contactInfo = [
    ['fas fa-map-marker-alt', 'Our Office', '123 Travel Street, Bandra West, Mumbai, MH 400050'],
    ['fas fa-phone', 'Phone', '+91 98765 43210 / +91 22 4567 8900'],
    ['fas fa-envelope', 'Email', 'info@tourstack.com / support@tourstack.com'],
    ['fas fa-clock', 'Working Hours', 'Monday – Saturday: 9:00 AM – 6:00 PM IST'],
];

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Please fill in all required fields.', background: '#0d1526', color: '#f0f4ff' });
        setLoading(true);
        try {
            await api.post('/contact', form);
            Swal.fire({ icon: 'success', title: 'Message Sent!', text: 'We\'ll get back to you within 24 hours.', background: '#0d1526', color: '#f0f4ff', confirmButtonColor: '#ff4757' });
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (e) {
            Swal.fire({ icon: 'error', title: 'Send Failed', text: e.response?.data?.error || 'Please try again later.', background: '#0d1526', color: '#f0f4ff' });
        } finally { setLoading(false); }
    };

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>Contact</span></div>
                    <h1>Get in <span className="grad-text">Touch</span></h1>
                    <p>We'd love to hear from you — our team is always ready to help</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div>
                            <div className="section-tag" style={{ marginBottom: '1rem' }}><i className="fas fa-headset"></i> We're Here to Help</div>
                            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Let's Plan Your <span className="grad-text">Perfect Trip</span></h2>
                            <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>Whether you have questions about our tours, need help booking, or want to design a custom itinerary — our travel experts are here for you.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {contactInfo.map(([icon, label, text], i) => (
                                    <div className="contact-info-item" key={i}>
                                        <div className="contact-icon"><i className={icon}></i></div>
                                        <div><strong>{label}</strong><p>{text}</p></div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Follow Us</p>
                                <div style={{ display: 'flex', gap: '0.6rem' }}>
                                    {[['fab fa-instagram', '#'], ['fab fa-facebook', '#'], ['fab fa-twitter', '#'], ['fab fa-youtube', '#'], ['fab fa-linkedin', '#']].map(([icon, href], i) => (
                                        <a key={i} href={href} className="footer-social" style={{ display: 'flex' }}>
                                            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', transition: 'var(--t)', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text3)'; }}>
                                                <i className={icon} style={{ fontSize: '0.9rem' }}></i>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-card">
                            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.75rem' }}>Send Us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Full Name *</label>
                                        <div className="input-with-icon"><i className="fas fa-user"></i><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} placeholder="Your name" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email *</label>
                                        <div className="input-with-icon"><i className="fas fa-envelope"></i><input className="form-input" type="email" value={form.email} onChange={e => f('email', e.target.value)} placeholder="you@example.com" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <div className="input-with-icon"><i className="fas fa-phone"></i><input className="form-input" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="+91 98765 43210" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject</label>
                                        <select className="form-input" value={form.subject} onChange={e => f('subject', e.target.value)}>
                                            <option value="">Select a subject</option>
                                            <option value="Tour Inquiry">Tour Inquiry</option>
                                            <option value="Room Booking">Room Booking</option>
                                            <option value="Package Info">Package Info</option>
                                            <option value="Cancellation">Cancellation</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message *</label>
                                    <textarea className="form-input" rows={5} value={form.message} onChange={e => f('message', e.target.value)} placeholder="Tell us how we can help you..." />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                                    {loading ? <><i className="fas fa-spinner fa-spin"></i> Sending...</> : <><i className="fas fa-paper-plane"></i> Send Message</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default Contact;
