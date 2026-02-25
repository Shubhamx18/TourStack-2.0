/**
 * Image resolver utility — imports from the master config.
 *
 * To change any image:
 *   → Just edit  frontend/src/config/images.config.js
 *   → Save the file — Vite hot-reloads instantly. No database update needed!
 */
export {
    TOUR_IMAGES,
    ROOM_IMAGES,
    PACKAGE_IMAGES,
    HERO_IMAGES,
    TOUR_FALLBACKS,
    ROOM_FALLBACKS,
    PKG_FALLBACKS,
} from '../config/images.config.js';

import {
    TOUR_IMAGES,
    ROOM_IMAGES,
    PACKAGE_IMAGES,
} from '../config/images.config.js';

const BACKEND = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

/**
 * All config images merged into one lookup map  { name → url }
 * so we can match any item regardless of type.
 */
const CONFIG_LOOKUP = { ...TOUR_IMAGES, ...ROOM_IMAGES, ...PACKAGE_IMAGES };

/**
 * Resolve the best image URL for an API item (tour / room / package).
 *
 * Priority (CONFIG-FIRST approach):
 *   1. CONFIG file match  — images.config.js looked up by item.name
 *   2. item.image_path    — uploaded file served from /uploads/
 *   3. item.image_url     — value stored in database (last resort)
 *   4. fallbacks[index]   — curated fallback from config arrays
 *
 * @param {Object}   item      - row from the API
 * @param {string[]} fallbacks - TOUR_FALLBACKS | ROOM_FALLBACKS | PKG_FALLBACKS
 * @param {number}   index     - card index for cycling fallbacks
 */
export function getImage(item, fallbacks, index = 0) {
    // 1. Always prefer the config file (edit one file, done!)
    if (item?.name && CONFIG_LOOKUP[item.name]) return CONFIG_LOOKUP[item.name];

    // 2. Uploaded file on the server
    if (item?.image_path && item.image_path !== '')
        return `${BACKEND}/uploads/${item.image_path}`;

    // 3. Database image_url as a fallback
    if (item?.image_url) return item.image_url;

    // 4. Curated fallback list
    return fallbacks[index % fallbacks.length];
}

