import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-brand-logo"><i className="fas fa-globe-asia" style={{ color: 'var(--primary)' }}></i>Tour<span>Stack</span></div>
                    <p>India's premium travel platform. We craft extraordinary journeys, luxurious stays, and unforgettable holiday experiences tailored just for you.</p>
                    <div className="footer-social">
                        {[['fab fa-instagram', '#'], ['fab fa-facebook', '#'], ['fab fa-twitter', '#'], ['fab fa-youtube', '#']].map(([icon, href], i) => (
                            <a href={href} key={i} target="_blank" rel="noreferrer"><i className={icon}></i></a>
                        ))}
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Explore</h4>
                    <div className="footer-links">
                        {[['Tours', '/tours'], ['Rooms', '/rooms'], ['Packages', '/packages'], ['Facilities', '/facilities'], ['About Us', '/about']].map(([l, h]) => (
                            <Link to={h} key={h}>{l}</Link>
                        ))}
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Account</h4>
                    <div className="footer-links">
                        {[['Login', '/login'], ['Register', '/register'], ['My Bookings', '/my-bookings'], ['Profile', '/profile'], ['Contact Us', '/contact']].map(([l, h]) => (
                            <Link to={h} key={h}>{l}</Link>
                        ))}
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Contact</h4>
                    {[['fas fa-map-marker-alt', '123 Travel Street, Mumbai, MH 400001'], ['fas fa-phone', '+91 98765 43210'], ['fas fa-envelope', 'info@tourstack.com'], ['fas fa-clock', 'Mon–Sat: 9AM – 6PM']].map(([icon, text], i) => (
                        <div className="footer-contact-item" key={i}><i className={icon}></i><span>{text}</span></div>
                    ))}
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2025 TourStack. All rights reserved.</span>
                <span>Crafted with <i className="fas fa-heart" style={{ color: 'var(--primary)' }}></i> for travelers</span>
            </div>
        </div>
    </footer>
);
export default Footer;
