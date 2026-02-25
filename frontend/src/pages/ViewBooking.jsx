import { useState, useEffect } from 'react'; import { useParams, Link } from 'react-router-dom'; import Header from '../components/Header'; import Footer from '../components/Footer'; import api from '../utils/api';
const ViewBooking = () => {
    const { type, id } = useParams(); const [booking, setBooking] = useState(null); const [loading, setLoading] = useState(true);
    useEffect(() => { api.get(`/bookings/details/${type}/${id}`).then(r => { setBooking(r.data); setLoading(false); }).catch(() => setLoading(false)); }, [type, id]);
    const getStatusBadge = s => ({ pending: 'badge-warning', confirmed: 'badge-success', cancelled: 'badge-danger', completed: 'badge-info', paid: 'badge-success' }[s] || 'badge-warning');
    if (loading) return <><Header /><div className="loading-spinner"><div className="spinner"></div></div><Footer /></>;
    if (!booking) return <><Header /><div className="container" style={{ padding: '4rem', textAlign: 'center' }}><h2>Booking not found</h2><Link to="/my-bookings">My Bookings</Link></div><Footer /></>;
    return (
        <>
            <Header />
            <div className="page-banner"><h1>Booking Details</h1></div>
            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '700px' }}>
                <div className="booking-detail-card">
                    <div className="booking-detail-header">
                        <h2>{booking.tour_name || booking.room_name || booking.package_name}</h2>
                        <div><span className={`badge ${getStatusBadge(booking.booking_status)}`}>{booking.booking_status}</span> <span className={`badge ${getStatusBadge(booking.payment_status)}`}>{booking.payment_status}</span></div>
                    </div>
                    <div className="booking-detail-grid">
                        <div><strong>Booking ID:</strong> #{booking.id}</div>
                        <div><strong>Type:</strong> {type}</div>
                        <div><strong>Customer:</strong> {booking.user_name}</div>
                        <div><strong>Email:</strong> {booking.email}</div>
                        {booking.phone && <div><strong>Phone:</strong> {booking.phone}</div>}
                        {type === 'room' ? (<><div><strong>Check-In:</strong> {new Date(booking.check_in_date).toLocaleDateString()}</div><div><strong>Check-Out:</strong> {new Date(booking.check_out_date).toLocaleDateString()}</div><div><strong>Nights:</strong> {booking.total_nights}</div><div><strong>Guests:</strong> {booking.adults} adults, {booking.children} children</div></>) : (<div><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</div>)}
                        {booking.people && <div><strong>People:</strong> {booking.people}</div>}
                        {booking.number_of_guests && <div><strong>Guests:</strong> {booking.number_of_guests}</div>}
                        <div><strong>Total Amount:</strong> ₹{parseFloat(booking.total_amount).toLocaleString()}</div>
                        {booking.special_requests && <div style={{ gridColumn: '1/-1' }}><strong>Special Requests:</strong> {booking.special_requests}</div>}
                    </div>
                    <div style={{ marginTop: '1.5rem' }}><Link to="/my-bookings" className="btn btn-outline"><i className="fas fa-arrow-left"></i> Back to Bookings</Link></div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default ViewBooking;
