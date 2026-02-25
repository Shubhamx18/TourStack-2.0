import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { getImage, ROOM_FALLBACKS } from '../utils/images';



const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => { api.get('/rooms').then(r => { setRooms(r.data); setLoading(false); }).catch(() => setLoading(false)); }, []);

    const filtered = rooms.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Header />
            <div className="page-banner">
                <div className="container">
                    <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>Rooms</span></div>
                    <h1>Luxury <span className="grad-text">Rooms</span></h1>
                    <p>{rooms.length} premium accommodations available</p>
                </div>
            </div>

            <div className="search-wrapper">
                <div className="container">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <i className="fas fa-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }}></i>
                            <input className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Search rooms..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading ? <div className="page-loader"><div className="spinner"></div></div> : filtered.length === 0 ? (
                        <div className="empty-state"><div className="empty-state-icon"><i className="fas fa-bed"></i></div><h3>No rooms found</h3><button className="btn btn-ghost" onClick={() => setSearch('')}>Clear Search</button></div>
                    ) : (
                        <div className="cards-grid">
                            {filtered.map((r, i) => (
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
                                            {r.capacity && <span><i className="fas fa-user-friends"></i>Max {r.capacity} guests</span>}
                                            <span><i className="fas fa-wifi"></i>Free WiFi</span>
                                            <span><i className="fas fa-snowflake"></i>AC</span>
                                        </div>
                                        <div className="card-footer">
                                            <div className="card-price">₹{parseFloat(r.price).toLocaleString('en-IN')}<small> /night</small></div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link to={`/rooms/${r.id}`} className="btn btn-ghost btn-sm">Details</Link>
                                                <Link to={`/book-room/${r.id}`} className="btn btn-primary btn-sm">Book</Link>
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
export default Rooms;
