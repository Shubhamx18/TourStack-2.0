/**
 * Image resolver utility — imports from the master config.
 *
 * To change any image:
 *   → Edit  frontend/src/config/images.config.js
 *   → Then run: node backend/scripts/syncImages.js  (updates the database)
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

const BACKEND = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

/**
 * Resolve the best image URL for an API item (tour / room / package).
 *
 * Priority:
 *   1. item.image_url  — set by admin in dashboard
 *   2. item.image_path — uploaded file served from /uploads/
 *   3. fallbacks[index % fallbacks.length] — curated fallback from config
 *
 * @param {Object}   item      - row from the API
 * @param {string[]} fallbacks - TOUR_FALLBACKS | ROOM_FALLBACKS | PKG_FALLBACKS
 * @param {number}   index     - card index for cycling fallbacks
 */
export function getImage(item, fallbacks, index = 0) {
    if (item?.image_url) return item.image_url;
    if (item?.image_path && item.image_path !== '')
        return `${BACKEND}/uploads/${item.image_path}`;
    return fallbacks[index % fallbacks.length];
}
