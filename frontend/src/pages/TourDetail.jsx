import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const IMGS = ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900'];

const TourDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { api.get(`/tours/${id}`).then(r => { setTour(r.data); setLoading(false); }).catch(() => setLoading(false)); }, [id]);

    if (loading) return <><Header /><div className="page-loader"><div className="spinner"></div></div><Footer /></>;
    if (!tour) return <><Header /><div className="container" style={{ padding: '4rem', textAlign: 'center' }}><h2>Tour not found</h2><Link to="/tours" className="btn btn-ghost" style={{ marginTop: '1rem' }}>Back to Tours</Link></div><Footer /></>;

    const img = IMGS[parseInt(id) % IMGS.length];
    const perks = ['Free cancellation up to 24hrs', 'Instant confirmation', 'Expert local guides', 'Small group experience'];

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><Link to="/tours">Tours</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>{tour.name}</span></div>
                </div>
            </div>

            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div className="detail-layout">
                        {/* MAIN */}
                        <div>
                            <div className="detail-hero">
                                <img src={img} alt={tour.name} />
                                <div className="detail-hero-overlay"></div>
                                <div className="detail-tags">{tour.tag && <span className="badge badge-primary">{tour.tag}</span>}<span className="badge badge-success">Available</span></div>
                            </div>

                            <h1 className="detail-main" style={{ fontFamily: "'Syne',sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>{tour.name}</h1>

                            <div className="detail-meta">
                                {tour.location && <div className="detail-meta-item"><i className="fas fa-map-marker-alt"></i>{tour.location}</div>}
                                {tour.duration && <div className="detail-meta-item"><i className="fas fa-clock"></i>{tour.duration}</div>}
                                {tour.max_people && <div className="detail-meta-item"><i className="fas fa-users"></i>Max {tour.max_people} people</div>}
                                <div className="detail-meta-item"><i className="fas fa-language"></i>English, Hindi</div>
                            </div>

                            <div className="detail-main">
                                <h3>About This Tour</h3>
                                <p className="detail-desc">{tour.description || 'Experience an incredible journey through one of India\'s most beautiful destinations. Our expert guides will take you through hidden gems, cultural landmarks, and breathtaking natural wonders.'}</p>

                                <h3>What\'s Included</h3>
                                <div className="includes-grid">
                                    {['Professional Guide', 'Transportation', 'Accommodation', 'Meals (Breakfast)', 'Entry Fees', 'First Aid Kit'].map((item, i) => (
                                        <div className="include-item" key={i}><i className="fas fa-check-circle"></i>{item}</div>
                                    ))}
                                </div>

                                <h3 style={{ marginTop: '2rem' }}>Tour Highlights</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '0.75rem' }}>
                                    {['Visit iconic landmarks', 'Local cultural experiences', 'Photography opportunities', 'Scenic viewpoints', 'Traditional cuisine tasting', 'Small group (max 12)'].map((h, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', fontSize: '0.85rem', color: 'var(--text2)' }}>
                                            <i className="fas fa-star" style={{ color: 'var(--accent)', fontSize: '0.72rem' }}></i>{h}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR */}
                        <div className="booking-sidebar">
                            <div className="booking-box">
                                <div className="booking-box-header">
                                    <div className="booking-price-big">₹{parseFloat(tour.price).toLocaleString('en-IN')}<small> /person</small></div>
                                    <div className="booking-price-label">Starting price per person</div>
                                </div>
                                <div className="booking-box-body">
                                    <div className="summary-row"><span>Duration</span><span>{tour.duration || 'Custom'}</span></div>
                                    <div className="summary-row"><span>Group Size</span><span>Up to {tour.max_people || 10}</span></div>
                                    <div className="summary-row"><span>Location</span><span>{tour.location || 'India'}</span></div>
                                    <div className="summary-row"><span>Language</span><span>English, Hindi</span></div>

                                    <div className="booking-perks">
                                        {perks.map((p, i) => <div className="booking-perk" key={i}><i className="fas fa-check"></i>{p}</div>)}
                                    </div>

                                    {user ? (
                                        <Link to={`/book-tour/${tour.id}`} className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
                                            <i className="fas fa-calendar-check"></i> Book This Tour
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
                                            <i className="fas fa-sign-in-alt"></i> Login to Book
                                        </Link>
                                    )}
                                    <Link to="/contact" className="btn btn-ghost btn-block" style={{ marginTop: '0.5rem' }}>
                                        <i className="fas fa-headset"></i> Ask a Question
                                    </Link>
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
export default TourDetail;
