const mysql = require('mysql2/promise');

async function seed() {
    const db = await mysql.createConnection({
        host: 'localhost', user: 'root', password: 'Shubham@6024', database: 'tourstack'
    });

    // ── TOURS ────────────────────────────────────────────────────
    const tours = [
        {
            name: 'Mumbai Heritage Walk',
            description: "Step into the soul of India's financial capital. Explore the iconic Gateway of India, the colonial Chhatrapati Shivaji Maharaj Terminus, Colaba Causeway market, and taste authentic Mumbai street food along the way.",
            price: 1500, duration: '5 Hours', max_people: 15,
            location: 'Mumbai, Maharashtra',
            image_url: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80',
            tag: 'Popular',
            includes: JSON.stringify([
                { icon: "fas fa-bus", text: "Air-conditioned transport" },
                { icon: "fas fa-utensils", text: "Street food tasting included" },
                { icon: "fas fa-ticket-alt", text: "All entry fees covered" },
                { icon: "fas fa-user-tie", text: "Expert heritage guide" },
                { icon: "fas fa-camera", text: "Photography spots" }
            ]),
            itinerary: JSON.stringify([
                { time: "9:00 AM", activity: "Hotel pickup" },
                { time: "9:30 AM", activity: "Gateway of India" },
                { time: "10:30 AM", activity: "CSMT & colonial architecture" },
                { time: "12:00 PM", activity: "Street food tour – Mohammed Ali Road" },
                { time: "1:30 PM", activity: "Colaba Causeway Market" },
                { time: "3:30 PM", activity: "Drop at hotel" }
            ])
        },
        {
            name: 'Manali Highland Trek',
            description: "Conquer the breathtaking trails of Himachal Pradesh. Trek through pine forests, glacial streams, and alpine meadows with Himalayan peaks as your backdrop. A thrilling adventure for all fitness levels.",
            price: 2500, duration: '1 Day', max_people: 12,
            location: 'Manali, Himachal Pradesh',
            image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
            tag: 'Adventure',
            includes: JSON.stringify([
                { icon: "fas fa-hiking", text: "Experienced trek guide" },
                { icon: "fas fa-shoe-prints", text: "Trekking gear provided" },
                { icon: "fas fa-hamburger", text: "Packed lunch & snacks" },
                { icon: "fas fa-first-aid", text: "First aid & safety kit" },
                { icon: "fas fa-shuttle-van", text: "Base camp transport" }
            ]),
            itinerary: JSON.stringify([
                { time: "6:30 AM", activity: "Departure from Manali town" },
                { time: "8:00 AM", activity: "Reach Solang Valley base camp" },
                { time: "8:30 AM", activity: "Equipment briefing & warm-up" },
                { time: "9:00 AM", activity: "Begin highland trek" },
                { time: "12:30 PM", activity: "Lunch at Beas Kund viewpoint" },
                { time: "3:00 PM", activity: "Summit photos & panoramic views" },
                { time: "5:30 PM", activity: "Return to hotel" }
            ])
        },
        {
            name: 'Ranthambore Wildlife Safari',
            description: "Get up close with the majestic Royal Bengal Tiger and over 300 bird species in one of India's finest national parks. Our expert naturalist guides guarantee unforgettable wildlife encounters.",
            price: 2800, duration: '8 Hours', max_people: 10,
            location: 'Ranthambore, Rajasthan',
            image_url: 'https://images.unsplash.com/photo-1564348908038-0c65d9fe8aae?w=800&q=80',
            tag: 'Wildlife',
            includes: JSON.stringify([
                { icon: "fas fa-car", text: "Open-top 4x4 safari jeep" },
                { icon: "fas fa-binoculars", text: "Binoculars provided" },
                { icon: "fas fa-utensils", text: "Packed lunch & refreshments" },
                { icon: "fas fa-user-tie", text: "Expert naturalist guide" },
                { icon: "fas fa-ticket-alt", text: "Park entry & jeep fees" }
            ]),
            itinerary: JSON.stringify([
                { time: "5:30 AM", activity: "Hotel pickup" },
                { time: "6:30 AM", activity: "Morning safari zone entry" },
                { time: "9:30 AM", activity: "Breakfast at forest lodge" },
                { time: "10:30 AM", activity: "Ranthambore Fort walk" },
                { time: "1:00 PM", activity: "Lunch break" },
                { time: "2:30 PM", activity: "Afternoon game drive" },
                { time: "5:30 PM", activity: "Return to hotel" }
            ])
        },
        {
            name: 'Taj Mahal Sunrise Tour',
            description: "Witness the world's greatest monument to love at the most magical hour. As dawn's golden light transforms the marble wonder, you'll understand why it's called a teardrop on the cheek of time.",
            price: 3500, duration: '12 Hours', max_people: 14,
            location: 'Agra, Uttar Pradesh',
            image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
            tag: 'Featured',
            includes: JSON.stringify([
                { icon: "fas fa-ticket-alt", text: "Taj Mahal & Agra Fort entry" },
                { icon: "fas fa-car", text: "AC vehicle Delhi/Agra transfer" },
                { icon: "fas fa-user-tie", text: "Licensed guide" },
                { icon: "fas fa-utensils", text: "Authentic Mughlai lunch" },
                { icon: "fas fa-camera", text: "Sunrise photography session" }
            ]),
            itinerary: JSON.stringify([
                { time: "4:00 AM", activity: "Hotel pickup" },
                { time: "6:00 AM", activity: "Taj Mahal sunrise entry" },
                { time: "8:30 AM", activity: "Breakfast at rooftop café with Taj view" },
                { time: "9:30 AM", activity: "Agra Fort exploration" },
                { time: "12:30 PM", activity: "Mughlai lunch" },
                { time: "2:00 PM", activity: "Marble inlay craft workshop" },
                { time: "5:00 PM", activity: "Return drive" }
            ])
        },
        {
            name: 'Jaipur Pink City Day Tour',
            description: "Explore the royal splendour of the Pink City — majestic Amber Fort, the wind-latticed Hawa Mahal, City Palace, and Jantar Mantar. Shop for handcrafted jewellery and tie-dye textiles at Johari Bazaar.",
            price: 2000, duration: '10 Hours', max_people: 16,
            location: 'Jaipur, Rajasthan',
            image_url: 'https://images.unsplash.com/photo-1603393325543-5af28f85d3f3?w=800&q=80',
            tag: 'Popular',
            includes: JSON.stringify([
                { icon: "fas fa-car", text: "AC vehicle throughout" },
                { icon: "fas fa-ticket-alt", text: "All monument entry fees" },
                { icon: "fas fa-user-tie", text: "Expert local guide" },
                { icon: "fas fa-utensils", text: "Rajasthani thali lunch" },
                { icon: "fas fa-horse", text: "Elephant/horse ride (optional)" }
            ]),
            itinerary: JSON.stringify([
                { time: "8:00 AM", activity: "Hotel pickup" },
                { time: "9:00 AM", activity: "Amber Fort (jeep ride)" },
                { time: "11:30 AM", activity: "Hawa Mahal photo stop" },
                { time: "12:00 PM", activity: "City Palace & Museum" },
                { time: "1:30 PM", activity: "Rajasthani thali lunch" },
                { time: "3:00 PM", activity: "Jantar Mantar observatory" },
                { time: "4:30 PM", activity: "Johari Bazaar shopping" },
                { time: "6:30 PM", activity: "Hotel drop" }
            ])
        },
        {
            name: 'Goa Beach & Culture Tour',
            description: "Soak up Goa's legendary spirit — pristine beaches, Portuguese-era churches, aromatic spice plantations, and lively beach shacks serving fresh seafood. The perfect blend of culture and coastal bliss.",
            price: 1800, duration: '8 Hours', max_people: 18,
            location: 'Goa',
            image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
            tag: 'Beach',
            includes: JSON.stringify([
                { icon: "fas fa-umbrella-beach", text: "Beach time included" },
                { icon: "fas fa-leaf", text: "Spice plantation tour" },
                { icon: "fas fa-church", text: "Heritage church visits" },
                { icon: "fas fa-fish", text: "Fresh seafood lunch" },
                { icon: "fas fa-car", text: "AC transport" }
            ]),
            itinerary: JSON.stringify([
                { time: "9:00 AM", activity: "Hotel pickup" },
                { time: "10:00 AM", activity: "Bom Jesus Basilica & Se Cathedral" },
                { time: "12:00 PM", activity: "Spice plantation walk & lunch" },
                { time: "2:30 PM", activity: "Calangute Beach" },
                { time: "4:30 PM", activity: "Anjuna Flea Market" },
                { time: "6:00 PM", activity: "Sunset at Chapora Fort" },
                { time: "7:00 PM", activity: "Hotel drop" }
            ])
        },
        {
            name: 'Kerala Backwaters Cruise',
            description: "Glide through the emerald labyrinth of Kerala's UNESCO-listed backwaters on a traditional wooden kettuvallam houseboat. Spot kingfishers, toddy tappers, and coconut-fringed villages reflected in still waters.",
            price: 3200, duration: '9 Hours', max_people: 8,
            location: 'Alleppey, Kerala',
            image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
            tag: 'Scenic',
            includes: JSON.stringify([
                { icon: "fas fa-ship", text: "Traditional houseboat cruise" },
                { icon: "fas fa-utensils", text: "Kerala sadya meals on deck" },
                { icon: "fas fa-fish", text: "Backwaters fishing experience" },
                { icon: "fas fa-user-tie", text: "Naturalist guide" },
                { icon: "fas fa-spa", text: "Ayurveda massage demo" }
            ]),
            itinerary: JSON.stringify([
                { time: "8:30 AM", activity: "Alleppey town pickup" },
                { time: "9:30 AM", activity: "Board houseboat at jetty" },
                { time: "10:00 AM", activity: "Backwaters cruise begins" },
                { time: "12:30 PM", activity: "Kerala sadya lunch on deck" },
                { time: "2:00 PM", activity: "Village walk & toddy shop" },
                { time: "4:00 PM", activity: "Bird watching & kayak option" },
                { time: "5:30 PM", activity: "Deboard & hotel drop" }
            ])
        },
        {
            name: 'Varanasi Ghat & Ganga Aarti',
            description: "Experience the spiritual heart of India. Witness the mesmerising Ganga Aarti at Dashashwamedh Ghat, take a sunrise boat ride past 84 ghats, visit ancient temples, and stroll through timeless silk-weaving alleys.",
            price: 2200, duration: '10 Hours', max_people: 12,
            location: 'Varanasi, Uttar Pradesh',
            image_url: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80',
            tag: 'Spiritual',
            includes: JSON.stringify([
                { icon: "fas fa-om", text: "Ganga Aarti ceremony" },
                { icon: "fas fa-ship", text: "Sunrise Ganga boat ride" },
                { icon: "fas fa-praying-hands", text: "Temple darshan" },
                { icon: "fas fa-utensils", text: "Banarasi breakfast" },
                { icon: "fas fa-user-tie", text: "Spiritual guide" }
            ]),
            itinerary: JSON.stringify([
                { time: "5:00 AM", activity: "Hotel pickup" },
                { time: "5:30 AM", activity: "Sunrise rowing boat ride on Ganga" },
                { time: "7:30 AM", activity: "Kashi Vishwanath Temple darshan" },
                { time: "9:00 AM", activity: "Banarasi breakfast – kachori sabzi" },
                { time: "10:30 AM", activity: "Silk weaving lanes & shopping" },
                { time: "1:00 PM", activity: "Lunch at local dhaba" },
                { time: "5:30 PM", activity: "Dashashwamedh Ghat Ganga Aarti" },
                { time: "8:00 PM", activity: "Hotel drop" }
            ])
        }
    ];

    for (const t of tours) {
        await db.query(
            'INSERT INTO tours (name, description, price, duration, max_people, location, image_path, image_url, tag, includes, itinerary, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [t.name, t.description, t.price, t.duration, t.max_people, t.location, '', t.image_url, t.tag, t.includes, t.itinerary, 'active']
        );
    }
    console.log(`✅ ${tours.length} tours inserted`);

    // ── ROOMS ────────────────────────────────────────────────────
    const rooms = [
        {
            name: 'Deluxe Room',
            description: 'Elegantly furnished with a king-size bed, plush bedding, and panoramic city views. Features a 55" smart TV, premium minibar, and a marble en-suite bathroom with rain shower.',
            price: 6000, capacity: 2,
            image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
        },
        {
            name: 'Classic Room',
            description: 'A beautifully styled room for solo travellers or couples on a budget. Includes a comfortable queen-size bed, work desk, free high-speed Wi-Fi, and a modern private bathroom.',
            price: 3000, capacity: 2,
            image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'
        },
        {
            name: 'Supreme Suite',
            description: 'The pinnacle of luxury — a sprawling suite with a separate living area, private plunge pool, butler service, floor-to-ceiling Himalayan views, and a 24-hour private chef on request.',
            price: 12000, capacity: 3,
            image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
        },
        {
            name: 'Heritage Haveli Room',
            description: 'Live like royalty in our hand-painted haveli-inspired room. Rich block-print textiles, jharokha windows, antique brass artefacts, and a four-poster bed create an authentic Rajasthani experience.',
            price: 8500, capacity: 2,
            image_url: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa5f?w=800&q=80'
        },
        {
            name: 'Private Pool Villa',
            description: 'Your own private retreat — a standalone villa with direct pool access, outdoor rain shower, open-air deck with loungers, kitchenette, and lush landscaped garden views.',
            price: 15000, capacity: 4,
            image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
        },
        {
            name: 'Mountain View Cottage',
            description: 'Nestled among pine trees with sweeping valley views, this cosy cottage features a fireplace, hand-crafted wooden furniture, a private balcony, and warm Himalayan handicraft decor.',
            price: 7500, capacity: 3,
            image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
        },
        {
            name: 'Honeymoon Suite',
            description: 'Designed for romance — a lavish suite with a canopy bed draped in silk, petal-decorated en-suite jacuzzi, champagne on arrival, mood lighting, and a private balcony for stargazing.',
            price: 18000, capacity: 2,
            image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'
        }
    ];

    for (const r of rooms) {
        await db.query(
            'INSERT INTO rooms (name, description, price, capacity, image_path, image_url, status) VALUES (?,?,?,?,?,?,?)',
            [r.name, r.description, r.price, r.capacity, '', r.image_url, 'active']
        );
    }
    console.log(`✅ ${rooms.length} rooms inserted`);

    // ── PACKAGES ─────────────────────────────────────────────────
    const packages = [
        {
            name: 'Goa Beach Escape',
            description: "Leave your worries behind on the golden shores of Goa. This all-inclusive package covers beach resort stays, guided sightseeing of Portuguese churches and spice farms, vibrant beach shack evenings, a sunset cruise on the Arabian Sea, and a full-day North vs South Goa tour.",
            price: 15000, duration: '3 Days / 2 Nights', accommodation: '4-Star Beach Resort',
            meals: 'Breakfast & Dinner', location: 'Goa',
            image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80'
        },
        {
            name: 'Rajasthan Royal Heritage',
            description: "A regal journey through the Land of Kings. Visit Jaipur's grand palaces, ride elephants at Amber Fort, go camel trekking in the Thar Desert at Sam Sand Dunes, explore the mighty Mehrangarh Fort in Jodhpur, and watch a magical sunset over Lake Pichola in Udaipur.",
            price: 32000, duration: '6 Days / 5 Nights', accommodation: '5-Star Heritage Hotels',
            meals: 'All Meals', location: 'Rajasthan',
            image_url: 'https://images.unsplash.com/photo-1603393325543-5af28f85d3f3?w=800&q=80'
        },
        {
            name: "Kerala God's Own Country",
            description: "Discover Kerala's serene backwaters, misty tea estates of Munnar, wildlife at Periyar Tiger Reserve, and the pristine cliffs of Varkala beach. Features a night on a traditional houseboat, a full Ayurvedic massage session, and a spice-laden Kerala fish curry cooking class.",
            price: 22000, duration: '5 Days / 4 Nights', accommodation: 'Houseboat + Jungle Resort',
            meals: 'Breakfast & Lunch', location: 'Kerala',
            image_url: 'https://images.unsplash.com/photo-1578764932892-4a56a1a6aa86?w=800&q=80'
        },
        {
            name: 'Himachal Adventure Quest',
            description: "Fuel your adrenaline in the mountains. White-water raft the Beas River, paraglide over Bir Billing (Asia's paragliding capital), trek to Triund ridgeline, ride the UNESCO Shimla Toy Train, and camp under a billion stars in the surreal Spiti Valley.",
            price: 18000, duration: '5 Days / 4 Nights', accommodation: 'Mountain Camps & Boutique Hotel',
            meals: 'All Meals', location: 'Himachal Pradesh',
            image_url: 'https://images.unsplash.com/photo-1618245318763-453825cd2fb4?w=800&q=80'
        },
        {
            name: 'Andaman Island Paradise',
            description: "Crystal-clear turquoise waters, pristine coral reefs, and powder-white sands await. Go scuba diving at Elephant Beach, snorkelling at Neil Island, sea walking at North Bay, visit the haunting Cellular Jail at sunset, and experience a magical bioluminescent night beach.",
            price: 35000, duration: '5 Days / 4 Nights', accommodation: '4-Star Beach Resort',
            meals: 'Breakfast & Dinner', location: 'Andaman Islands',
            image_url: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80'
        },
        {
            name: 'Varanasi Spiritual Sojourn',
            description: "A profound pilgrimage to India's oldest living city. Attend the hypnotic Ganga Aarti with thousands of oil lamps illuminating the ghats, take a dawn boat ride, visit Sarnath where the Buddha preached his first sermon, experience a private yoga session and taste Banarasi chaat.",
            price: 12000, duration: '3 Days / 2 Nights', accommodation: 'Heritage Boutique Hotel',
            meals: 'Breakfast & Dinner', location: 'Varanasi, UP',
            image_url: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80'
        },
        {
            name: 'Kashmir Valley of Heaven',
            description: "Glide on a shikara across the mirror-like Dal Lake, stay in a luxurious floating houseboat adorned with walnut carvings, visit the magnificent Mughal Gardens of Shalimar Bagh, shop for Pashmina shawls and saffron at Lal Chowk, and take a breathtaking cable car to snow-capped Gulmarg.",
            price: 28000, duration: '5 Days / 4 Nights', accommodation: 'Floating Houseboat + Hotel',
            meals: 'All Meals', location: 'Kashmir',
            image_url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80'
        }
    ];

    for (const p of packages) {
        await db.query(
            'INSERT INTO packages (name, description, price, duration, accommodation, meals, location, image_path, image_url, status) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [p.name, p.description, p.price, p.duration, p.accommodation, p.meals, p.location, '', p.image_url, 'active']
        );
    }
    console.log(`✅ ${packages.length} packages inserted`);

    // ── FACILITIES ───────────────────────────────────────────────
    const facilities = [
        { name: 'Rooftop Infinity Pool', description: 'Relax in our stunning rooftop infinity pool overlooking the city skyline — open sunrise to sunset with poolside cocktail service.', icon: 'fas fa-swimming-pool' },
        { name: '24h Fitness Center', description: 'State-of-the-art gym with Technogym cardio machines, free weights, and personal trainers available on request.', icon: 'fas fa-dumbbell' },
        { name: 'Ayurvedic Spa', description: 'Indulge in traditional Kerala Ayurveda massages, aromatherapy, hot stone therapy, and holistic wellness retreats.', icon: 'fas fa-spa' },
        { name: 'Fine Dining Restaurant', description: 'Multi-cuisine restaurant serving Pan-Indian, Continental and Asian dishes prepared by award-winning chefs.', icon: 'fas fa-utensils' },
        { name: 'Rooftop Bar & Lounge', description: 'Sip signature cocktails and mocktails while enjoying panoramic sunset views at our stylish sky lounge.', icon: 'fas fa-cocktail' },
        { name: 'Concierge & Events', description: 'Full concierge, tour planning, and a banquet hall for up to 300 guests with AV support and fine catering.', icon: 'fas fa-chalkboard-teacher' }
    ];

    for (const f of facilities) {
        await db.query(
            'INSERT INTO facilities (name, description, icon, image_path, status) VALUES (?,?,?,?,?)',
            [f.name, f.description, f.icon, '', 'active']
        );
    }
    console.log(`✅ ${facilities.length} facilities inserted`);

    await db.end();
    console.log('\n🎉 All seed data loaded successfully!');
}

seed().catch(e => { console.error('SEED ERROR:', e.message); process.exit(1); });
