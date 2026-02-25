

const mysql = require('mysql2/promise');
const path = require('path');

// ── MASTER IMAGE CONFIG ─────────────────────────────────────────
// Keep this in sync with frontend/src/config/images.config.js
// (Node.js CJS can't directly import the ES-module version,
//  so we maintain the same data here as a plain object.)

const TOUR_IMAGES = {
    'Mumbai Heritage Walk':
        'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80',

    'Manali Highland Trek':
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',

    'Ranthambore Wildlife Safari':
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',

    'Taj Mahal Sunrise Tour':
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',

    'Jaipur Pink City Day Tour':
        'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&q=80',

    'Goa Beach & Culture Tour':
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',

    'Kerala Backwaters Cruise':
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',

    'Varanasi Ghat & Ganga Aarti':
        'https://thumbs.dreamstime.com/b/ganges-river-varanasi-india-march-indian-people-ghats-ceremony-morning-bathing-277359840.jpg',
};

const ROOM_IMAGES = {
    'Deluxe Room':
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',

    'Classic Room':
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',

    'Supreme Suite':
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',

    'Heritage Haveli Room':
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',

    'Private Pool Villa':
        'https://uploads-ssl.webflow.com/576fd5a8f192527e50a4b95c/606c7d85cc754d7c84b7d8f1_Villa%20Sabai%20Jai.jpg',

    'Mountain View Cottage':
        'https://i.pinimg.com/originals/1a/9f/8c/1a9f8cae69c22cd9b8990e2eb052c68a.jpg',

    'Honeymoon Suite':
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
};

const PACKAGE_IMAGES = {
    'Goa Beach Escape':
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',

    'Rajasthan Royal Heritage':
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',

    "Kerala God's Own Country":
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',

    'Himachal Adventure Quest':
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',

    'Andaman Island Paradise':
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',

    'Varanasi Spiritual Sojourn':
        'https://cdn.powertraveller.com/media/varanasi-spiritual-3-days-varanasi-tour-with-accommodation-t772087-2.jpg',

    'Kashmir Valley of Heaven':
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
};

// ── DB CONFIG ────────────────────────────────────────────────────
const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Shubham@6024',
    database: process.env.DB_NAME || 'tourstack',
};

// ── SYNC FUNCTION ────────────────────────────────────────────────
async function syncImages() {
    const db = await mysql.createConnection(DB_CONFIG);
    let updated = 0, skipped = 0;

    console.log('\n🔄  TourStack Image Sync — starting...\n');

    // Helper: update one row by exact name match
    async function applyUpdate(table, name, url) {
        const [r] = await db.query(
            `UPDATE ${table} SET image_url = ? WHERE name = ?`,
            [url, name]
        );
        if (r.affectedRows > 0) {
            console.log(`  ✅  [${table}] "${name}"  →  set`);
            updated++;
        } else {
            console.log(`  ⚠️   [${table}] "${name}"  →  NOT FOUND in DB (check the name spelling)`);
            skipped++;
        }
    }

    console.log('📷  Tours:');
    for (const [name, url] of Object.entries(TOUR_IMAGES))
        await applyUpdate('tours', name, url);

    console.log('\n🛏️   Rooms:');
    for (const [name, url] of Object.entries(ROOM_IMAGES))
        await applyUpdate('rooms', name, url);

    console.log('\n📦  Packages:');
    for (const [name, url] of Object.entries(PACKAGE_IMAGES))
        await applyUpdate('packages', name, url);

    console.log(`\n${'─'.repeat(54)}`);
    console.log(`✅  Done — ${updated} updated, ${skipped} skipped / not found.`);
    console.log(`\n💡  Tip: Hard-refresh your browser (Ctrl+Shift+R) to see changes.\n`);

    await db.end();
}

syncImages().catch(err => {
    console.error('\n❌  Sync failed:', err.message);
    process.exit(1);
});
