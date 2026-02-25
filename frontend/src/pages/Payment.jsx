import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import Swal from 'sweetalert2';

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [method, setMethod] = useState('cash');
    const [loading, setLoading] = useState(false);

    if (!state) { navigate('/my-bookings'); return null; }
    const { booking_id, booking_type, amount, item_name } = state;

    const handlePayment = async () => {
        setLoading(true);
        try {
            if (method === 'razorpay') {
                const orderRes = await api.post('/payment/razorpay/create', { amount });
                const options = {
                    key: orderRes.data.key_id,
                    amount: orderRes.data.amount,
                    currency: orderRes.data.currency,
                    name: 'TourStack',
                    description: item_name,
                    order_id: orderRes.data.order_id,
                    handler: async (response) => {
                        await api.post('/payment/razorpay/verify', { ...response, booking_id, booking_type, amount });
                        navigate('/payment-success', { state: { booking_id, booking_type, amount, item_name } });
                    },
                    prefill: { name: 'TourStack Customer' },
                    theme: { color: '#e83e3e' }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                await api.post('/payment/process', { booking_id, booking_type, amount, payment_method: method });
                navigate('/payment-success', { state: { booking_id, booking_type, amount, item_name } });
            }
        } catch (err) { Swal.fire('Error', err.response?.data?.error || 'Payment failed', 'error'); }
        finally { setLoading(false); }
    };

    return (
        <>
            <Header />
            <div className="page-banner"><h1>Payment</h1></div>
            <div className="container payment-container">
                <div className="payment-card">
                    <h2>Complete Your Payment</h2>
                    <div className="payment-summary">
                        <h3>{item_name}</h3>
                        <div className="summary-row"><span>Booking ID</span><span>#{booking_id}</span></div>
                        <div className="summary-row"><span>Booking Type</span><span className="capitalize">{booking_type}</span></div>
                        <div className="summary-row total"><span>Total Amount</span><span>₹{parseFloat(amount).toLocaleString()}</span></div>
                    </div>
                    <div className="payment-methods">
                        <h3>Select Payment Method</h3>
                        <div className="method-options">
                            {[
                                { value: 'cash', label: 'Cash / Pay at Counter', icon: 'fas fa-money-bill-wave' },
                                { value: 'card', label: 'Credit / Debit Card (Demo)', icon: 'fas fa-credit-card' },
                                { value: 'razorpay', label: 'Razorpay Online', icon: 'fas fa-bolt' },
                            ].map(m => (
                                <label key={m.value} className={`method-option ${method === m.value ? 'selected' : ''}`}>
                                    <input type="radio" name="method" value={m.value} checked={method === m.value}
                                        onChange={e => setMethod(e.target.value)} />
                                    <i className={m.icon}></i>
                                    <span>{m.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={handlePayment} disabled={loading}>
                        {loading ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : `Pay ₹${parseFloat(amount).toLocaleString()}`}
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Payment;
