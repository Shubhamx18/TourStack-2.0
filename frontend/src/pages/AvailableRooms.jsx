import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';

const AvailableRooms = () => {
    const { state } = useLocation();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (state?.check_in && state?.check_out) {
            api.post('/rooms/availability', state).then(r => { setRooms(r.data.rooms || []); setLoading(false); }).catch(() => setLoading(false));
        } else { setLoading(false); }
    }, []);

    return (
        <>
            <Header />
            <div className="page-banner"><h1>Available Rooms</h1>
                {state && <p>Check-in: {state.check_in} | Check-out: {state.check_out} | Guests: {parseInt(state.adults || 1) + parseInt(state.children || 0)}</p>}
            </div>
            <section className="section">
                <div className="container">
                    {loading ? <div className="loading-spinner"><div className="spinner"></div></div> :
                        rooms.length === 0 ? <div className="empty-state"><i className="fas fa-bed"></i><p>No rooms available for your dates</p><Link to="/rooms" className="btn btn-primary">View All Rooms</Link></div> :
                            <div className="cards-grid">
                                {rooms.map(room => (
                                    <div className="card" key={room.id}>
                                        <div className="card-img"><img src='https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400' alt={room.name} /></div>
                                        <div className="card-body">
                                            <h3>{room.name}</h3>
                                            <p className="card-desc">{room.description?.substring(0, 120)}...</p>
                                            <div className="card-meta"><span><i className="fas fa-user-friends"></i> Up to {room.capacity} guests</span></div>
                                            <div className="card-footer">
                                                <span className="card-price">₹{parseFloat(room.price).toLocaleString()}<small>/night</small></span>
                                                <Link to={`/book-room/${room.id}`} state={state} className="btn btn-sm">Book Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }
                </div>
            </section>
            <Footer />
        </>
    );
};
export default AvailableRooms;
