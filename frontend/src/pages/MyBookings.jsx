import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import Swal from 'sweetalert2';

const TABS = ['tours', 'rooms', 'packages'];
const ROOM_IMGS = ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200'];
const TOUR_IMGS = ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200'];
const PKG_IMGS = ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200', 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=200'];

const statusClass = { confirmed: 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger', completed: 'badge-info' };
const payClass = { paid: 'badge-success', unpaid: 'badge-danger', pending: 'badge-warning' };

const MyBookings = () => {
    const [tab, setTab] = useState('tours');
    const [bookings, setBookings] = useState({ tours: [], rooms: [], packages: [] });
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        setLoading(true);
        try {
            const r = await api.get('/bookings/my-bookings');
            setBookings({ tours: r.data.tours || [], rooms: r.data.rooms || [], packages: r.data.packages || [] });
        } catch (e) { } finally { setLoading(false); }
    };
    useEffect(() => { fetch(); }, []);

    const cancel = async (type, id) => {
        const confirm = await Swal.fire({ title: 'Cancel Booking?', text: 'This action cannot be undone.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, Cancel', confirmButtonColor: '#ff4757', background: '#0d1526', color: '#f0f4ff' });
        if (!confirm.isConfirmed) return;
        try {
            await api.put(`/bookings/cancel/${type}/${id}`);
            Swal.fire({ icon: 'success', title: 'Cancelled', timer: 1500, showConfirmButton: false, background: '#0d1526', color: '#f0f4ff' });
            fetch();
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.error || 'Could not cancel', background: '#0d1526', color: '#f0f4ff' }); }
    };

    const list = bookings[tab];
    const imgList = tab === 'tours' ? TOUR_IMGS : tab === 'rooms' ? ROOM_IMGS : PKG_IMGS;

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>My Bookings</span></div>
                    <h1>My <span className="grad-text">Bookings</span></h1>
                    <p>Manage and track all your travel plans</p>
                </div>
            </div>
            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div className="tabs">
                        {TABS.map(t => (
                            <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                                <i className={`fas fa-${t === 'tours' ? 'map-marked-alt' : t === 'rooms' ? 'bed' : 'suitcase-rolling'}`}></i> {t.charAt(0).toUpperCase() + t.slice(1)} ({bookings[t].length})
                            </button>
                        ))}
                    </div>

                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : list.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon"><i className="fas fa-calendar-times"></i></div>
                            <h3>No {tab} bookings yet</h3>
                            <p>Book your first {tab.slice(0, -1)} and it'll appear here</p>
                            <Link to={`/${tab}`} className="btn btn-primary">Explore {tab.charAt(0).toUpperCase() + tab.slice(1)}</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {list.map((b, i) => {
                                const isCancellable = b.booking_status === 'pending' || b.booking_status === 'confirmed';
                                return (
                                    <div className="booking-card-item" key={b.id}>
                                        <div className="booking-thumb">
                                            <img src={imgList[i % imgList.length]} alt="" />
                                        </div>
                                        <div className="booking-info">
                                            <h4>{b.tour_name || b.room_name || b.package_name || `Booking #${b.id}`}</h4>
                                            <div className="booking-meta">
                                                <span><i className="fas fa-hashtag"></i>#{b.id}</span>
                                                {(b.booking_date || b.check_in_date) && <span><i className="fas fa-calendar"></i>{new Date(b.booking_date || b.check_in_date).toLocaleDateString('en-IN')}</span>}
                                                {b.check_out_date && <span><i className="fas fa-calendar-check"></i>{new Date(b.check_out_date).toLocaleDateString('en-IN')}</span>}
                                                {b.total_amount && <span><i className="fas fa-rupee-sign"></i>₹{parseFloat(b.total_amount).toLocaleString('en-IN')}</span>}
                                            </div>
                                            <div className="booking-badges">
                                                <span className={`badge ${statusClass[b.booking_status] || 'badge-info'}`}>{b.booking_status}</span>
                                                <span className={`badge ${payClass[b.payment_status] || 'badge-warning'}`}>{b.payment_status}</span>
                                            </div>
                                        </div>
                                        <div className="booking-actions-col">
                                            <Link to={`/view-booking/${tab.slice(0, -1)}/${b.id}`} className="btn btn-ghost btn-sm"><i className="fas fa-eye"></i> View</Link>
                                            {isCancellable && <button onClick={() => cancel(tab.slice(0, -1), b.id)} className="btn btn-danger btn-sm"><i className="fas fa-times"></i> Cancel</button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};
export default MyBookings;
