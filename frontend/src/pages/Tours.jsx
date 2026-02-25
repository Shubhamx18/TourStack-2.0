import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { getImage, TOUR_FALLBACKS } from '../utils/images';



const Tours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => { api.get('/tours').then(r => { setTours(r.data); setLoading(false); }).catch(() => setLoading(false)); }, []);

    const filtered = tours.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        (t.location || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>Tours</span></div>
                    <h1>Explore <span className="grad-text">Tours</span></h1>
                    <p>{tours.length} incredible tours across India</p>
                </div>
            </div>

            <div className="search-wrapper">
                <div className="container">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <i className="fas fa-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: '0.85rem' }}></i>
                            <input className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Search tours by name or location..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        {search && <button className="btn btn-ghost btn-sm" onClick={() => setSearch('')}><i className="fas fa-times"></i> Clear</button>}
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon"><i className="fas fa-map-marked-alt"></i></div>
                            <h3>No tours found</h3>
                            <p>Try a different search or browse all tours</p>
                            <button className="btn btn-ghost" onClick={() => setSearch('')}>Clear Search</button>
                        </div>
                    ) : (
                        <>
                            <p style={{ color: 'var(--text3)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{filtered.length} tour{filtered.length !== 1 ? 's' : ''} found</p>
                            <div className="cards-grid">
                                {filtered.map((t, i) => (
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
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <Link to={`/tours/${t.id}`} className="btn btn-ghost btn-sm">Details</Link>
                                                    <Link to={`/book-tour/${t.id}`} className="btn btn-primary btn-sm">Book</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};
export default Tours;
