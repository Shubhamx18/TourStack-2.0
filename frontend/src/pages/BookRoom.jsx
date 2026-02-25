import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import Swal from 'sweetalert2';

const BookRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [form, setForm] = useState({ check_in_date: '', check_out_date: '', adults: 1, children: 0, special_requests: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => { api.get(`/rooms/${id}`).then(r => setRoom(r.data)).catch(() => navigate('/rooms')); }, [id]);

    const nights = form.check_in_date && form.check_out_date ? Math.max(1, Math.ceil((new Date(form.check_out_date) - new Date(form.check_in_date)) / (1000 * 60 * 60 * 24))) : 1;
    const totalAmount = room ? parseFloat(room.price) * nights : 0;

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const res = await api.post('/bookings/room', { room_id: id, ...form });
            navigate('/payment', { state: { booking_id: res.data.booking_id, booking_type: 'room', amount: res.data.total_amount, item_name: room.name } });
        } catch (err) { Swal.fire('Error', err.response?.data?.error || 'Booking failed', 'error'); }
        finally { setLoading(false); }
    };

    if (!room) return <><Header /><div className="loading-spinner"><div className="spinner"></div></div><Footer /></>;

    return (
        <>
            <Header />
            <div className="page-banner"><h1>Book Room</h1></div>
            <div className="container booking-form-container">
                <div className="booking-form-main">
                    <h2>Room Booking Details</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-row">
                            <div className="form-group"><label>Check-In Date *</label>
                                <input type="date" min={new Date().toISOString().split('T')[0]} value={form.check_in_date}
                                    onChange={e => setForm({ ...form, check_in_date: e.target.value })} required />
                            </div>
                            <div className="form-group"><label>Check-Out Date *</label>
                                <input type="date" min={form.check_in_date || new Date().toISOString().split('T')[0]} value={form.check_out_date}
                                    onChange={e => setForm({ ...form, check_out_date: e.target.value })} required />
                            </div>
                            <div className="form-group"><label>Adults</label>
                                <input type="number" min="1" max={room.capacity} value={form.adults}
                                    onChange={e => setForm({ ...form, adults: parseInt(e.target.value) })} />
                            </div>
                            <div className="form-group"><label>Children</label>
                                <input type="number" min="0" max="5" value={form.children}
                                    onChange={e => setForm({ ...form, children: parseInt(e.target.value) })} />
                            </div>
                        </div>
                        <div className="form-group"><label>Special Requests</label>
                            <textarea rows="4" value={form.special_requests} onChange={e => setForm({ ...form, special_requests: e.target.value })}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Processing...' : `Proceed to Payment — ₹${totalAmount.toLocaleString()}`}
                        </button>
                    </form>
                </div>
                <div className="booking-form-sidebar">
                    <div className="booking-card">
                        <h3>{room.name}</h3>
                        <div className="booking-summary">
                            <div className="summary-row"><span>Price per night</span><span>₹{parseFloat(room.price).toLocaleString()}</span></div>
                            <div className="summary-row"><span>Nights</span><span>× {nights}</span></div>
                            <div className="summary-row total"><span>Total Amount</span><span>₹{totalAmount.toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default BookRoom;
