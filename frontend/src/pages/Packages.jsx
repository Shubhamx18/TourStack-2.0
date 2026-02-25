import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { getImage, PKG_FALLBACKS } from '../utils/images';



const Packages = () => {
    const [pkgs, setPkgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { api.get('/packages').then(r => { setPkgs(r.data); setLoading(false); }).catch(() => setLoading(false)); }, []);

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>Packages</span></div>
                    <h1>Holiday <span className="grad-text">Packages</span></h1>
                    <p>All-inclusive vacation bundles at unbeatable prices</p>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : pkgs.length === 0 ? (
                        <div className="empty-state"><div className="empty-state-icon"><i className="fas fa-suitcase-rolling"></i></div><h3>No packages available</h3></div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                            {pkgs.map((p, i) => (
                                <div className="pkg-card" key={p.id}>
                                    <div className="pkg-card-img">
                                        <img src={getImage(p, PKG_FALLBACKS, i)} alt={p.name} loading="lazy" />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(7,11,20,0.5),transparent)' }}></div>
                                    </div>
                                    <div className="pkg-card-body">
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                            {p.location && <span className="badge badge-info"><i className="fas fa-map-marker-alt"></i> {p.location}</span>}
                                            <span className="badge badge-success">All Inclusive</span>
                                            {p.tag && <span className="badge badge-primary">{p.tag}</span>}
                                        </div>
                                        <h3>{p.name}</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.7, margin: '0.65rem 0' }}>{p.description?.substring(0, 180)}...</p>
                                        <div className="pkg-highlights">
                                            {p.duration && <div className="pkg-highlight"><i className="fas fa-clock"></i>{p.duration}</div>}
                                            {p.accommodation && <div className="pkg-highlight"><i className="fas fa-hotel"></i>{p.accommodation}</div>}
                                            {p.meals && <div className="pkg-highlight"><i className="fas fa-utensils"></i>{p.meals}</div>}
                                            <div className="pkg-highlight"><i className="fas fa-bus"></i>Airport Transfers</div>
                                            <div className="pkg-highlight"><i className="fas fa-map"></i>Guided Tours</div>
                                        </div>
                                        <div className="pkg-price-row">
                                            <div>
                                                <div className="pkg-price">₹{parseFloat(p.price).toLocaleString('en-IN')}</div>
                                                <small style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>per person, all taxes included</small>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                <Link to={`/packages/${p.id}`} className="btn btn-ghost"><i className="fas fa-eye"></i> Details</Link>
                                                <Link to={`/book-package/${p.id}`} className="btn btn-primary">Book Now <i className="fas fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};
export default Packages;
