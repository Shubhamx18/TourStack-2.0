import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';

const defaultFacilities = [
    { name: 'Free WiFi', description: 'High-speed internet throughout our properties', icon: 'fas fa-wifi' },
    { name: 'Swimming Pool', description: 'Heated indoor and outdoor pools with lounging areas', icon: 'fas fa-swimming-pool' },
    { name: 'Fitness Center', description: 'State-of-the-art gym equipment and personal trainers', icon: 'fas fa-dumbbell' },
    { name: 'Restaurant & Bar', description: 'Multi-cuisine dining with local and international flavors', icon: 'fas fa-utensils' },
    { name: 'Spa & Wellness', description: 'Rejuvenating treatments and relaxation therapies', icon: 'fas fa-spa' },
    { name: 'Conference Rooms', description: 'Fully equipped meeting facilities for business travelers', icon: 'fas fa-briefcase' },
    { name: 'Airport Transfers', description: 'Complimentary pickup and drop at major airports', icon: 'fas fa-shuttle-van' },
    { name: 'Concierge Service', description: 'Round-the-clock assistance for all your travel needs', icon: 'fas fa-concierge-bell' },
    { name: 'Parking', description: 'Secure covered parking available for all guests', icon: 'fas fa-parking' },
    { name: 'Kids Play Area', description: 'Safe and fun recreation zone for younger travelers', icon: 'fas fa-child' },
    { name: 'Tour Desk', description: 'On-site travel planning and excursion booking', icon: 'fas fa-map-marked-alt' },
    { name: 'Medical Support', description: 'In-house medical assistance and emergency services', icon: 'fas fa-heartbeat' },
];

const iconList = ['fas fa-wifi', 'fas fa-swimming-pool', 'fas fa-dumbbell', 'fas fa-utensils', 'fas fa-spa', 'fas fa-briefcase', 'fas fa-shuttle-van', 'fas fa-concierge-bell', 'fas fa-parking', 'fas fa-child', 'fas fa-map-marked-alt', 'fas fa-heartbeat', 'fas fa-bed', 'fas fa-tv', 'fas fa-suitcase-rolling'];

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/facilities')
            .then(r => { setFacilities(r.data?.length ? r.data : defaultFacilities); setLoading(false); })
            .catch(() => { setFacilities(defaultFacilities); setLoading(false); });
    }, []);

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>Facilities</span></div>
                    <h1>Our <span className="grad-text">Facilities</span></h1>
                    <p>World-class amenities designed for your comfort and pleasure</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="section-header centered" style={{ marginBottom: '3rem' }}>
                        <div className="section-tag"><i className="fas fa-star"></i> Premium Amenities</div>
                        <h2>Everything You <span className="grad-text">Need</span></h2>
                        <p>From wellness to dining, we've covered every aspect of a perfect stay</p>
                    </div>

                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : (
                        <div className="facilities-grid">
                            {facilities.map((f, i) => (
                                <div className="facility-card" key={i}>
                                    <div className="facility-icon">
                                        <i className={f.icon || iconList[i % iconList.length]}></i>
                                    </div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{f.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{f.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA BANNER */}
            <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '4rem 2rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="section-tag" style={{ margin: '0 auto 1rem' }}><i className="fas fa-phone"></i> Book Now</div>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to Experience <span className="grad-text">Luxury?</span></h2>
                    <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>Book your stay today and enjoy all our world-class facilities</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/rooms" className="btn btn-primary btn-lg"><i className="fas fa-bed"></i> Book a Room</Link>
                        <Link to="/packages" className="btn btn-ghost btn-lg"><i className="fas fa-suitcase-rolling"></i> View Packages</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default Facilities;
