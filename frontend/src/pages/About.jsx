import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const stats = [['5,000+', 'Happy Travelers'], ['50+', 'Destinations'], ['10+', 'Years Experience'], ['4.9★', 'Average Rating']];
const values = [
    ['fas fa-heart', 'Guest First', 'Every decision is made with our guests\' happiness at the forefront. Your satisfaction is our measure of success.'],
    ['fas fa-leaf', 'Sustainable Travel', 'We partner with eco-friendly operators and promote responsible tourism that preserves India\'s natural beauty.'],
    ['fas fa-shield-alt', 'Trust & Safety', 'Complete transparency in pricing and policies. We ensure every booking is secure and every experience is safe.'],
    ['fas fa-star', 'Premium Quality', 'Only the finest accommodations, most experienced guides, and highest-rated experiences make it onto our platform.'],
];
const team = [
    { name: 'Rajesh Mehta', role: 'Founder & CEO', img: 'https://i.pravatar.cc/120?img=11' },
    { name: 'Priya Sharma', role: 'Head of Operations', img: 'https://i.pravatar.cc/120?img=5' },
    { name: 'Arjun Patel', role: 'Travel Experience Lead', img: 'https://i.pravatar.cc/120?img=12' },
    { name: 'Sneha Iyer', role: 'Customer Success', img: 'https://i.pravatar.cc/120?img=9' },
];

const About = () => (
    <>
        <Header />
        <div className="page-banner">
            <div className="container">
                <div className="breadcrumb"><Link to="/">Home</Link><i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }}></i><span>About</span></div>
                <h1>About <span className="grad-text">TourStack</span></h1>
                <p>India's most trusted travel companion since 2015</p>
            </div>
        </div>

        <section className="section">
            <div className="container">
                <div className="about-grid">
                    <div>
                        <div className="section-tag"><i className="fas fa-info-circle"></i> Our Story</div>
                        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem' }}>We make travel <span className="grad-text">extraordinary</span></h2>
                        <p style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1rem' }}>Founded in 2015, TourStack was born from a simple idea: every Indian deserves access to exceptional travel experiences. What started as a small tour operation in Mumbai has grown into a full-service travel platform trusted by thousands.</p>
                        <p style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1.5rem' }}>We handpick every tour, vet every accommodation, and train every guide to ensure your experience exceeds expectations. Our team of passionate travel experts work tirelessly to curate journeys that are not just trips, but transformative experiences.</p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/tours" className="btn btn-primary"><i className="fas fa-compass"></i> Explore Tours</Link>
                            <Link to="/contact" className="btn btn-ghost"><i className="fas fa-envelope"></i> Get in Touch</Link>
                        </div>
                        <div className="about-stats-grid">
                            {stats.map(([num, label], i) => (
                                <div className="about-stat" key={i}><div className="about-stat-num">{num}</div><div className="about-stat-label">{label}</div></div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80" alt="Travel" className="about-hero-img" style={{ objectPosition: 'center' }} />
                    </div>
                </div>

                <div className="section-header centered" style={{ marginBottom: '2.5rem' }}>
                    <div className="section-tag"><i className="fas fa-heart"></i> Our Values</div>
                    <h2>What Drives <span className="grad-text">Us</span></h2>
                </div>
                <div className="values-grid">
                    {values.map(([icon, title, desc], i) => (
                        <div className="value-card" key={i}>
                            <div className="value-icon"><i className={icon}></i></div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '5rem' }}>
                    <div className="section-header centered" style={{ marginBottom: '2.5rem' }}>
                        <div className="section-tag"><i className="fas fa-users"></i> Our Team</div>
                        <h2>Meet the <span className="grad-text">Experts</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' }}>
                        {team.map((m, i) => (
                            <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', padding: '2rem', textAlign: 'center', transition: 'var(--t)' }} className="card" onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
                                <img src={m.img} alt={m.name} style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 1rem', border: '3px solid var(--primary)', objectFit: 'cover' }} />
                                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{m.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>{m.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
);
export default About;
