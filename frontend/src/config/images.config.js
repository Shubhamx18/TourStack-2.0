/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║           TourStack — MASTER IMAGE CONFIGURATION FILE               ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║                                                                      ║
 * ║  This is the ONE file you edit to change any image in the app.      ║
 * ║                                                                      ║
 * ║  HOW TO CHANGE AN IMAGE:                                             ║
 * ║  ─────────────────────────────────────────────────────────────────  ║
 * ║  1. Find the tour / room / package you want to update below.        ║
 * ║  2. Replace the URL with any public image URL you like.             ║
 * ║     - Unsplash: https://images.unsplash.com/photo-XXXXX?w=800&q=80 ║
 * ║     - Pexels:   https://images.pexels.com/photos/ID/photo.jpeg     ║
 * ║     - Any direct image link (ends in .jpg / .png / .webp)          ║
 * ║  3. Save this file, then run from the backend/ folder:              ║
 * ║       npm run sync-images                                            ║
 * ║     That one command pushes all changes to the database.            ║
 * ║                                                                      ║
 * ║  KEY RULES:                                                          ║
 * ║  • The key strings (e.g. 'Mumbai Heritage Walk') must match the     ║
 * ║    exact name stored in your database. Do NOT rename them unless     ║
 * ║    you also rename the DB row.                                       ║
 * ║  • FALLBACK arrays are used when the DB item has no image.          ║
 * ║    They pull from the images already defined above, so you only      ║
 * ║    need to change a URL in one place.                                ║
 * ║  • HERO_IMAGES control the big banner on each page.                  ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

// ════════════════════════════════════════════════════════════════════════
// 🗺️  TOURS
//     Key  = exact tour name in the database
//     Value = image URL (public, direct link)
// ════════════════════════════════════════════════════════════════════════
export const TOUR_IMAGES = {

    'Mumbai Heritage Walk':
        'https://cdn.britannica.com/79/188879-050-25E7733E/Gateway-of-India-Mumai-monument-2012.jpg',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=800&q=80'  ← Mumbai city wide
    // 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80'  ← India landscape

    'Manali Highland Trek':
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'  ← aerial Himalayas
    // 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'  ← mountain peak

    'Ranthambore Wildlife Safari':
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80'     ← jungle animals

    'Taj Mahal Sunrise Tour':
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'     ← Taj at dusk

    'Jaipur Pink City Day Tour':
        'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'  ← Jaipur cityscape
    // 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=800&q=80'  ← Jaipur pink view

    'Goa Beach & Culture Tour':
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'  ← tropical beach
    // 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=800&q=80'  ← Goa beach aerial

    'Kerala Backwaters Cruise':
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'     ← Kerala green water
    // 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?w=800&q=80'  ← Kerala houseboat

    'Varanasi Ghat & Ganga Aarti':
        'https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/04/Ganga-Aarti-Varanasi-1.jpg?fit=1200%2C800&ssl=1',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&q=80'  ← Varanasi ghats
    // 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&q=80'  ← Ganga aarti lamps
};


// ════════════════════════════════════════════════════════════════════════
// 🛏️  ROOMS
//     Key  = exact room name in the database
//     Value = image URL
// ════════════════════════════════════════════════════════════════════════
export const ROOM_IMAGES = {

    'Deluxe Room':
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'  ← hotel room bright

    'Classic Room':
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800&q=80'  ← cosy room

    'Supreme Suite':
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80'  ← luxury suite wide

    'Heritage Haveli Room':
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'  ← ornate room

    'Private Pool Villa':
        'https://www.sripanwa.com/images/villas/presidential-five-bedroom-residence-villa-in-phuket-private-pool-villa.jpg',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'  ← villa pool night

    'Mountain View Cottage':
        'https://tse1.mm.bing.net/th/id/OIP.-noVYh1Hahl10tQxz8cJiwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80'  ← forest cabin

    'Honeymoon Suite':
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'  ← suite balcony
};


// ════════════════════════════════════════════════════════════════════════
// 📦  PACKAGES
//     Key  = exact package name in the database
//     Value = image URL
// ════════════════════════════════════════════════════════════════════════
export const PACKAGE_IMAGES = {

    'Goa Beach Escape':
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'  ← tropical beach

    'Rajasthan Royal Heritage':
        'https://tse1.mm.bing.net/th/id/OIP.dxQWoEKugp8kjl3GjBzaXQAAAA?w=270&h=178&rs=1&pid=ImgDetMain&o=7&rm=3',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1601921004897-b7d582836990?w=800&q=80'  ← Rajasthan fort
    // 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&q=80'     ← Jaipur Amber Fort

    "Kerala God's Own Country":
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80'  ← houseboat blue
    // 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?w=800&q=80'  ← Kerala landscape

    'Himachal Adventure Quest':
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80'  ← Manali valley
    // 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'  ← mountain range

    'Andaman Island Paradise':
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'  ← clear turquoise water

    'Varanasi Spiritual Sojourn':
        'https://tse1.mm.bing.net/th/id/OIP.ygEKa9nQ-HTw5U2c7egsbAHaEm?w=900&h=560&rs=1&pid=ImgDetMain&o=7&rm=3',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&q=80'  ← Ganga lamps
    // 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&q=80'  ← ghats panorama

    'Kashmir Valley of Heaven':
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    // Alternatives:
    // 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&q=80'     ← Dal Lake shikara
};


// ════════════════════════════════════════════════════════════════════════
// 🏠  HERO / BANNER IMAGES
//     Large background image shown at the top of each page.
// ════════════════════════════════════════════════════════════════════════
export const HERO_IMAGES = {
    home: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80', // Taj Mahal
    tours: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=1920&q=80', // India wide
    rooms: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80', // Deluxe room
    packages: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80', // Beach sunset
};


// ════════════════════════════════════════════════════════════════════════
// 🔄  FALLBACK IMAGES
//     Shown automatically when a DB item has no image_url assigned.
//     They cycle through the list using the card's position index.
//     You do NOT need to change these manually — they pull from the
//     TOUR_IMAGES / ROOM_IMAGES / PACKAGE_IMAGES objects above.
// ════════════════════════════════════════════════════════════════════════
export const TOUR_FALLBACKS = [
    TOUR_IMAGES['Taj Mahal Sunrise Tour'],
    TOUR_IMAGES['Varanasi Ghat & Ganga Aarti'],
    TOUR_IMAGES['Kerala Backwaters Cruise'],
    TOUR_IMAGES['Goa Beach & Culture Tour'],
    TOUR_IMAGES['Manali Highland Trek'],
    TOUR_IMAGES['Ranthambore Wildlife Safari'],
    TOUR_IMAGES['Jaipur Pink City Day Tour'],
    TOUR_IMAGES['Mumbai Heritage Walk'],
];

export const ROOM_FALLBACKS = [
    ROOM_IMAGES['Deluxe Room'],
    ROOM_IMAGES['Classic Room'],
    ROOM_IMAGES['Supreme Suite'],
    ROOM_IMAGES['Private Pool Villa'],
    ROOM_IMAGES['Mountain View Cottage'],
    ROOM_IMAGES['Heritage Haveli Room'],
    ROOM_IMAGES['Honeymoon Suite'],
];

export const PKG_FALLBACKS = [
    PACKAGE_IMAGES['Goa Beach Escape'],
    PACKAGE_IMAGES['Himachal Adventure Quest'],
    PACKAGE_IMAGES["Kerala God's Own Country"],
    PACKAGE_IMAGES['Andaman Island Paradise'],
    PACKAGE_IMAGES['Kashmir Valley of Heaven'],
    PACKAGE_IMAGES['Varanasi Spiritual Sojourn'],
    PACKAGE_IMAGES['Rajasthan Royal Heritage'],
];
