import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { getImage, TOUR_FALLBACKS } from '../utils/images';
import Swal from 'sweetalert2';

const BookTour = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [form, setForm] = useState({ booking_date: '', people: 1, special_requests: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => { api.get(`/tours/${id}`).then(r => setTour(r.data)).catch(() => navigate('/tours')); }, [id]);

    const totalAmount = tour ? parseFloat(tour.price) * form.people : 0;

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const res = await api.post('/bookings/tour', { tour_id: id, ...form });
            navigate('/payment', { state: { booking_id: res.data.booking_id, booking_type: 'tour', amount: res.data.total_amount, item_name: tour.name } });
        } catch (err) { Swal.fire('Error', err.response?.data?.error || 'Booking failed', 'error'); }
        finally { setLoading(false); }
    };

    if (!tour) return <><Header /><div className="loading-spinner"><div className="spinner"></div></div><Footer /></>;

    return (
        <>
            <Header />
            <div className="page-banner"><h1>Book Tour</h1></div>
            <div className="container booking-form-container">
                <div className="booking-form-main">
                    <h2>Booking Details</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group"><label>Tour Date *</label>
                            <input type="date" min={new Date().toISOString().split('T')[0]} value={form.booking_date}
                                onChange={e => setForm({ ...form, booking_date: e.target.value })} required />
                        </div>
                        <div className="form-group"><label>Number of People *</label>
                            <input type="number" min="1" max={tour.max_people} value={form.people}
                                onChange={e => setForm({ ...form, people: parseInt(e.target.value) })} required />
                        </div>
                        <div className="form-group"><label>Special Requests</label>
                            <textarea rows="4" placeholder="Any special requirements?" value={form.special_requests}
                                onChange={e => setForm({ ...form, special_requests: e.target.value })}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Processing...' : `Proceed to Payment — ₹${totalAmount.toLocaleString()}`}
                        </button>
                    </form>
                </div>
                <div className="booking-form-sidebar">
                    <div className="booking-card">
                        <h3>{tour.name}</h3>
                        <img src={getImage(tour, TOUR_FALLBACKS)} alt={tour.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} onError={e => { e.target.src = TOUR_FALLBACKS[0] }} />
                        <div className="booking-summary">
                            <div className="summary-row"><span>Price per person</span><span>₹{parseFloat(tour.price).toLocaleString()}</span></div>
                            <div className="summary-row"><span>Persons</span><span>× {form.people}</span></div>
                            <div className="summary-row total"><span>Total Amount</span><span>₹{totalAmount.toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default BookTour;
