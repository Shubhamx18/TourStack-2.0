import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const IMGS = ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900'];
const AMENITIES = [['fas fa-wifi', 'Free WiFi'], ['fas fa-snowflake', 'Air Conditioning'], ['fas fa-tv', 'Smart TV'], ['fas fa-bath', 'En-Suite Bathroom'], ['fas fa-coffee', 'Tea/Coffee'], ['fas fa-parking', 'Free Parking'], ['fas fa-concierge-bell', '24h Room Service'], ['fas fa-lock', 'In-Room Safe']];

const RoomDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nights, setNights] = useState(1);

    useEffect(() => { api.get(`/rooms/${id}`).then(r => { setRoom(r.data); setLoading(false); }).catch(() => setLoading(false)); }, [id]);

    if (loading) return <><Header /><div className="page-loader"><div className="spinner"></div></div><Footer /></>;
    if (!room) return <><Header /><div className="container" style={{ padding: '4rem', textAlign: 'center' }}><h2>Room not found</h2><Link to="/rooms" className="btn btn-ghost" style={{ marginTop: '1rem' }}>Back to Rooms</Link></div><Footer /></>;

    const total = parseFloat(room.price) * nights;

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><Link to="/rooms">Rooms</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>{room.name}</span></div>
                </div>
            </div>
            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div className="detail-layout">
                        <div>
                            <div className="detail-hero">
                                <img src={IMGS[parseInt(id) % IMGS.length]} alt={room.name} />
                                <div className="detail-hero-overlay"></div>
                                <div className="detail-tags"><span className="badge badge-info">Room</span><span className="badge badge-success">Available</span></div>
                            </div>
                            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>{room.name}</h1>
                            <div className="detail-meta">
                                {room.capacity && <div className="detail-meta-item"><i className="fas fa-user-friends"></i>Up to {room.capacity} guests</div>}
                                <div className="detail-meta-item"><i className="fas fa-expand-arrows-alt"></i>32 sqm</div>
                                <div className="detail-meta-item"><i className="fas fa-bed"></i>King Bed</div>
                                <div className="detail-meta-item"><i className="fas fa-eye"></i>Garden View</div>
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.5rem 0 0.75rem', color: 'var(--text)' }}>About This Room</h3>
                            <p className="detail-desc">{room.description || 'A luxurious and spacious room designed for your ultimate comfort. Featuring premium furnishings, a private bathroom, and all modern amenities to ensure an unforgettable stay.'}</p>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--text)' }}>Room Amenities</h3>
                            <div className="amenities-grid">
                                {AMENITIES.map(([icon, label], i) => (
                                    <div className="amenity" key={i}><i className={icon}></i>{label}</div>
                                ))}
                            </div>
                        </div>
                        <div className="booking-sidebar">
                            <div className="booking-box">
                                <div className="booking-box-header">
                                    <div className="booking-price-big">₹{parseFloat(room.price).toLocaleString('en-IN')}<small> /night</small></div>
                                    <div className="booking-price-label">Price per night</div>
                                </div>
                                <div className="booking-box-body">
                                    <div className="form-group">
                                        <label className="form-label">Nights (estimate)</label>
                                        <input type="number" className="form-input" min={1} max={30} value={nights} onChange={e => setNights(Math.max(1, parseInt(e.target.value) || 1))} />
                                    </div>
                                    <div className="summary-row"><span>Price per night</span><span>₹{parseFloat(room.price).toLocaleString('en-IN')}</span></div>
                                    <div className="summary-row"><span>Nights</span><span>× {nights}</span></div>
                                    <div className="summary-row total"><span>Estimated Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
                                    <div className="booking-perks" style={{ margin: '1rem 0' }}>
                                        {['Free cancellation', 'Instant confirmation', 'Breakfast available', '24hr room service'].map((p, i) => <div className="booking-perk" key={i}><i className="fas fa-check"></i>{p}</div>)}
                                    </div>
                                    {user ? <Link to={`/book-room/${room.id}`} className="btn btn-primary btn-block"><i className="fas fa-calendar-check"></i> Book This Room</Link>
                                        : <Link to="/login" className="btn btn-primary btn-block"><i className="fas fa-sign-in-alt"></i> Login to Book</Link>}
                                    <Link to="/contact" className="btn btn-ghost btn-block" style={{ marginTop: '0.5rem' }}><i className="fas fa-headset"></i> Enquire Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default RoomDetail;
