import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { getImage, TOUR_FALLBACKS, ROOM_FALLBACKS, PKG_FALLBACKS, HERO_IMAGES } from '../utils/images';



const Home = () => {
    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState({ check_in: '', check_out: '', adults: 1, children: 0 });

    useEffect(() => {
        api.get('/tours').then(r => setTours(r.data.slice(0, 3))).catch(() => { });
        api.get('/rooms').then(r => setRooms(r.data.slice(0, 3))).catch(() => { });
        api.get('/packages').then(r => setPackages(r.data.slice(0, 3))).catch(() => { });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/available-rooms', { state: search });
    };

    const stats = [{ num: '5000+', label: 'Happy Travelers' }, { num: '50+', label: 'Destinations' }, { num: '100+', label: 'Tour Packages' }, { num: '4.9★', label: 'Average Rating' }];
    const features = [
        { icon: 'fas fa-star', label: 'Curated Experiences', desc: 'Handpicked tours and accommodations verified by our travel experts.' },
        { icon: 'fas fa-shield-alt', label: 'Secure Booking', desc: 'End-to-end encryption and secure payment processing every time.' },
        { icon: 'fas fa-headset', label: '24/7 Support', desc: 'Round-the-clock assistance from our dedicated travel concierge team.' },
        { icon: 'fas fa-tags', label: 'Best Price Guarantee', desc: 'We match any price, ensuring you always get the best deal.' },
        { icon: 'fas fa-map-marked-alt', label: 'Local Expertise', desc: 'Deep local knowledge and connections at every destination.' },
        { icon: 'fas fa-undo', label: 'Free Cancellation', desc: 'Flexible booking policies with easy cancellation on most tours.' },
    ];

    return (
        <>
            <Header />

            {/* HERO */}
            <section className="hero">
                <div className="hero-bg">
                    <img src={HERO_IMAGES.home} alt="Travel" />
                </div>
                <div className="container" style={{ paddingTop: '5rem' }}>
                    <div className="hero-content">
                        <div className="hero-tag"><i className="fas fa-compass"></i> Discover India's finest destinations</div>
                        <h1>Your Next<br /><span className="grad-text">Adventure</span><br />Starts Here</h1>
                        <p>Curated tours, luxurious rooms, and all-inclusive holiday packages. Book with confidence and create memories that last forever.</p>
                        <div className="hero-btns">
                            <Link to="/tours" className="btn btn-primary btn-lg"><i className="fas fa-compass"></i> Explore Tours</Link>
                            <Link to="/packages" className="btn btn-ghost btn-lg"><i className="fas fa-suitcase-rolling"></i> View Packages</Link>
                        </div>
                    </div>
                </div>
                <div className="hero-scroll" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                    <span>Scroll Down</span>
                    <div className="hero-scroll-line"></div>
                </div>
            </section>

            {/* STATS */}
            <div className="stats-bar">
                <div className="container">
                    <div className="stats-bar-inner">
                        {stats.map((s, i) => (
                            <div className="stat-item" key={i}>
                                <div className="stat-item-num">{s.num}</div>
                                <div className="stat-item-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SEARCH / AVAILABILITY */}
            <div className="search-wrapper">
                <div className="container">
                    <form onSubmit={handleSearch}>
                        <div className="search-box">
                            <div className="search-field">
                                <label><i className="fas fa-calendar-check"></i> Check-In</label>
                                <input type="date" min={new Date().toISOString().split('T')[0]} value={search.check_in} onChange={e => setSearch({ ...search, check_in: e.target.value })} />
                            </div>
                            <div className="search-field">
                                <label><i className="fas fa-calendar-times"></i> Check-Out</label>
                                <input type="date" min={search.check_in || new Date().toISOString().split('T')[0]} value={search.check_out} onChange={e => setSearch({ ...search, check_out: e.target.value })} />
                            </div>
                            <div className="search-field">
                                <label><i className="fas fa-users"></i> Guests</label>
                                <select value={search.adults} onChange={e => setSearch({ ...search, adults: e.target.value })}>
                                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--r)', width: '100%' }}>
                                <i className="fas fa-search"></i> Search Rooms
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* FEATURED TOURS */}
            <section className="section">
                <div className="container">
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                        <div>
                            <div className="section-tag"><i className="fas fa-map-marker-alt"></i> Popular Destinations</div>
                            <h2>Featured <span className="grad-text">Tours</span></h2>
                            <p>Hand-picked adventures across India's most breathtaking landscapes</p>
                        </div>
                        <Link to="/tours" className="btn btn-ghost">View All <i className="fas fa-arrow-right"></i></Link>
                    </div>
                    <div className="cards-grid">
                        {tours.map((t, i) => (
                            <div className="card" key={t.id}>
                                <div className="card-img">
                                    <img src={getImage(t, TOUR_FALLBACKS, i)} alt={t.name} loading="lazy" />
                                    <div className="card-img-overlay"></div>
                                    <div className="card-badges">{t.tag && <span className="badge badge-primary">{t.tag}</span>}</div>
                                    <div className="card-wishlist"><i className="far fa-heart"></i></div>
                                </div>
                                <div className="card-body">
                                    {t.location && <div className="card-location"><i className="fas fa-map-marker-alt"></i>{t.location}</div>}
                                    <h3>{t.name}</h3>
                                    <p className="card-desc">{t.description}</p>
                                    <div className="card-meta">
                                        {t.duration && <span><i className="fas fa-clock"></i>{t.duration}</span>}
                                        {t.max_people && <span><i className="fas fa-users"></i>Max {t.max_people}</span>}
                                    </div>
                                    <div className="card-footer">
                                        <div className="card-price">₹{parseFloat(t.price).toLocaleString('en-IN')}<small> /person</small></div>
                                        <Link to={`/tours/${t.id}`} className="btn btn-primary btn-sm">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <div className="section-tag"><i className="fas fa-award"></i> Why TourStack</div>
                        <h2>Travel Smarter, Not <span className="grad-text">Harder</span></h2>
                        <p>Everything you need for a seamless travel experience, all in one place</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
                        {features.map((f, i) => (
                            <div className="value-card" key={i}>
                                <div className="value-icon"><i className={f.icon}></i></div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.label}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED ROOMS */}
            <section className="section">
                <div className="container">
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                        <div>
                            <div className="section-tag"><i className="fas fa-bed"></i> Luxury Stays</div>
                            <h2>Premium <span className="grad-text">Rooms</span></h2>
                            <p>Handpicked accommodations for the perfect night's rest</p>
                        </div>
                        <Link to="/rooms" className="btn btn-ghost">View All <i className="fas fa-arrow-right"></i></Link>
                    </div>
                    <div className="cards-grid">
                        {rooms.map((r, i) => (
                            <div className="card" key={r.id}>
                                <div className="card-img">
                                    <img src={getImage(r, ROOM_FALLBACKS, i)} alt={r.name} loading="lazy" />
                                    <div className="card-img-overlay"></div>
                                    <div className="card-badges"><span className="badge badge-info">Room</span></div>
                                </div>
                                <div className="card-body">
                                    <h3>{r.name}</h3>
                                    <p className="card-desc">{r.description}</p>
                                    <div className="card-meta">
                                        {r.capacity && <span><i className="fas fa-user-friends"></i>Up to {r.capacity} guests</span>}
                                        <span><i className="fas fa-wifi"></i>Free WiFi</span>
                                    </div>
                                    <div className="card-footer">
                                        <div className="card-price">₹{parseFloat(r.price).toLocaleString('en-IN')}<small> /night</small></div>
                                        <Link to={`/rooms/${r.id}`} className="btn btn-primary btn-sm">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PACKAGES CTA BANNER */}
            <section style={{ background: 'linear-gradient(135deg,var(--primary) 0%,#8e2323 100%)', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-100px', top: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
                <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
                    <div className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff', margin: '0 auto 1rem' }}><i className="fas fa-suitcase-rolling"></i> All-Inclusive</div>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Discover Our Holiday Packages</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>Complete vacation bundles with flights, hotels, meals, and guided tours—all at unbeatable prices.</p>
                    <Link to="/packages" className="btn btn-accent btn-lg"><i className="fas fa-gift"></i> Explore Packages</Link>
                </div>
            </section>

            {/* FEATURED PACKAGES */}
            <section className="section">
                <div className="container">
                    <div className="section-header centered" style={{ marginBottom: '2.5rem' }}>
                        <div className="section-tag"><i className="fas fa-gift"></i> Best Value</div>
                        <h2>Featured <span className="grad-text">Packages</span></h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {packages.map((p, i) => (
                            <div className="pkg-card" key={p.id}>
                                <div className="pkg-card-img">
                                    <img src={getImage(p, PKG_FALLBACKS, i)} alt={p.name} loading="lazy" />
                                </div>
                                <div className="pkg-card-body">
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                        {p.location && <span className="badge badge-info"><i className="fas fa-map-marker-alt"></i> {p.location}</span>}
                                        <span className="badge badge-success">All Inclusive</span>
                                    </div>
                                    <h3>{p.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6, margin: '0.5rem 0' }}>{p.description?.substring(0, 150)}...</p>
                                    <div className="pkg-highlights">
                                        {p.duration && <div className="pkg-highlight"><i className="fas fa-clock"></i>{p.duration}</div>}
                                        {p.accommodation && <div className="pkg-highlight"><i className="fas fa-hotel"></i>{p.accommodation}</div>}
                                        {p.meals && <div className="pkg-highlight"><i className="fas fa-utensils"></i>{p.meals}</div>}
                                        <div className="pkg-highlight"><i className="fas fa-bus"></i>Transfers</div>
                                    </div>
                                    <div className="pkg-price-row">
                                        <div>
                                            <div className="pkg-price">₹{parseFloat(p.price).toLocaleString('en-IN')}</div>
                                            <small style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>per person</small>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <Link to={`/packages/${p.id}`} className="btn btn-ghost">Details</Link>
                                            <Link to={`/book-package/${p.id}`} className="btn btn-primary">Book Now <i className="fas fa-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};
export default Home;
