import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
    const { state } = useLocation();
    if (!state) return <><Header /><div className="container" style={{ padding: '4rem', textAlign: 'center' }}><h2>No payment info found</h2><Link to="/">Go Home</Link></div><Footer /></>;
    return (
        <>
            <Header />
            <div className="container" style={{ padding: '4rem 1rem' }}>
                <div className="success-card">
                    <div className="success-icon"><i className="fas fa-check-circle"></i></div>
                    <h1>Payment Successful!</h1>
                    <p>Your booking has been confirmed. Thank you for choosing TourStack!</p>
                    <div className="success-details">
                        <div className="summary-row"><span>Item</span><span>{state.item_name}</span></div>
                        <div className="summary-row"><span>Booking ID</span><span>#{state.booking_id}</span></div>
                        <div className="summary-row"><span>Type</span><span className="capitalize">{state.booking_type}</span></div>
                        <div className="summary-row total"><span>Amount Paid</span><span>₹{parseFloat(state.amount).toLocaleString()}</span></div>
                    </div>
                    <div className="success-actions">
                        <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
                        <Link to="/" className="btn btn-outline">Back to Home</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default PaymentSuccess;
