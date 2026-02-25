import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import Swal from 'sweetalert2';

const BookPackage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [form, setForm] = useState({ booking_date: '', number_of_guests: 1, special_requests: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => { api.get(`/packages/${id}`).then(r => setPkg(r.data)).catch(() => navigate('/packages')); }, [id]);

    const total = pkg ? parseFloat(pkg.price) * form.number_of_guests : 0;

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const res = await api.post('/bookings/package', { package_id: id, ...form });
            navigate('/payment', { state: { booking_id: res.data.booking_id, booking_type: 'package', amount: res.data.total_amount, item_name: pkg.name } });
        } catch (err) { Swal.fire('Error', err.response?.data?.error || 'Booking failed', 'error'); }
        finally { setLoading(false); }
    };

    if (!pkg) return <><Header /><div className="loading-spinner"><div className="spinner"></div></div><Footer /></>;

    return (
        <>
            <Header />
            <div className="page-banner"><h1>Book Package</h1></div>
            <div className="container booking-form-container">
                <div className="booking-form-main">
                    <h2>Package Booking Details</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group"><label>Travel Date *</label>
                            <input type="date" min={new Date().toISOString().split('T')[0]} value={form.booking_date}
                                onChange={e => setForm({ ...form, booking_date: e.target.value })} required />
                        </div>
                        <div className="form-group"><label>Number of Guests *</label>
                            <input type="number" min="1" max="20" value={form.number_of_guests}
                                onChange={e => setForm({ ...form, number_of_guests: parseInt(e.target.value) })} required />
                        </div>
                        <div className="form-group"><label>Special Requests</label>
                            <textarea rows="4" value={form.special_requests} onChange={e => setForm({ ...form, special_requests: e.target.value })}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Processing...' : `Proceed to Payment — ₹${total.toLocaleString()}`}
                        </button>
                    </form>
                </div>
                <div className="booking-form-sidebar">
                    <div className="booking-card">
                        <h3>{pkg.name}</h3>
                        <div className="booking-summary">
                            {pkg.duration && <div className="summary-row"><span>Duration</span><span>{pkg.duration}</span></div>}
                            {pkg.accommodation && <div className="summary-row"><span>Accommodation</span><span>{pkg.accommodation}</span></div>}
                            {pkg.meals && <div className="summary-row"><span>Meals</span><span>{pkg.meals}</span></div>}
                            <div className="summary-row"><span>Price per person</span><span>₹{parseFloat(pkg.price).toLocaleString()}</span></div>
                            <div className="summary-row"><span>Guests</span><span>× {form.number_of_guests}</span></div>
                            <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default BookPackage;
