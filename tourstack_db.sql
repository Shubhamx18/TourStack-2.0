-- TourStack Database Schema
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS tourstack;
USE tourstack;

-- ============================================================
-- Table for user accounts
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  dob DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table for admin users
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (username: admin, password: admin123)
INSERT IGNORE INTO admin_users (username, password) VALUES
('admin', '$2y$10$uE6pS4OivGYMWN0WBk69wOS8r9FpAK2t0kTj2jCIQAXR0k6FEyUDC');

-- ============================================================
-- Table for room types
-- ============================================================
CREATE TABLE IF NOT EXISTS room_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  max_capacity INT NOT NULL DEFAULT 2,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table for rooms   (image_url added for external photo URLs)
-- ============================================================
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  capacity INT NOT NULL,
  image_path VARCHAR(255) NOT NULL DEFAULT '',
  image_url VARCHAR(500) DEFAULT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active'
);


-- ============================================================
-- Table for facilities
-- ============================================================
CREATE TABLE IF NOT EXISTS facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  image_path VARCHAR(255) DEFAULT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active'
);

-- ============================================================
-- Table for tours
-- ============================================================
CREATE TABLE IF NOT EXISTS tours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  max_people INT NOT NULL DEFAULT 10,
  location VARCHAR(255) DEFAULT NULL,
  image_path VARCHAR(255) NOT NULL DEFAULT '',
  image_url VARCHAR(500) DEFAULT NULL,
  tag VARCHAR(50) DEFAULT NULL,
  includes JSON DEFAULT NULL,
  itinerary JSON DEFAULT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table for packages
-- ============================================================
CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration VARCHAR(50) DEFAULT NULL,
  accommodation VARCHAR(100) DEFAULT NULL,
  meals VARCHAR(100) DEFAULT NULL,
  location VARCHAR(255) DEFAULT NULL,
  image_path VARCHAR(255) DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table for tour bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS tour_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tour_id INT NOT NULL,
  booking_date DATE NOT NULL,
  people INT NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  special_requests TEXT DEFAULT NULL,
  payment_status ENUM('pending', 'paid', 'cancelled', 'refunded') DEFAULT 'pending',
  booking_status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- ============================================================
-- Table for room bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS room_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  adults INT NOT NULL DEFAULT 1,
  children INT NOT NULL DEFAULT 0,
  total_nights INT NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  special_requests TEXT DEFAULT NULL,
  payment_status ENUM('pending', 'paid', 'cancelled', 'refunded') DEFAULT 'pending',
  booking_status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- ============================================================
-- Table for package bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS package_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  package_id INT NOT NULL,
  booking_date DATE NOT NULL,
  number_of_guests INT NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  special_requests TEXT DEFAULT NULL,
  payment_status ENUM('pending', 'paid', 'cancelled', 'refunded') DEFAULT 'pending',
  booking_status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

-- ============================================================
-- Table for payments
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  booking_type ENUM('tour', 'room', 'package') NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'online',
  transaction_id VARCHAR(255) DEFAULT NULL,
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- Table for customers (admin-managed)
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Contact messages table
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) DEFAULT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SEED DATA — Tours (8 entries with matching images)
-- ============================================================
-- Image URLs verified HTTP 200 as of Feb 2026
INSERT IGNORE INTO tours (id, name, description, price, duration, max_people, location, image_path, image_url, tag, includes, itinerary, status) VALUES

(1, 'Mumbai Heritage Walk',
'Step into the soul of India''s financial capital. Explore the iconic Gateway of India, the colonial Chhatrapati Shivaji Maharaj Terminus, Colaba Causeway market, and taste authentic Mumbai street food along the way.',
1500.00, '5 Hours', 15, 'Mumbai, Maharashtra',
'', 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80',
'Popular',
'[{"icon":"fas fa-bus","text":"Air-conditioned transport"},{"icon":"fas fa-utensils","text":"Street food tasting"},{"icon":"fas fa-ticket-alt","text":"Entry fees included"},{"icon":"fas fa-user-tie","text":"Expert heritage guide"},{"icon":"fas fa-camera","text":"Photography spots"}]',
'[{"time":"9:00 AM","activity":"Hotel pickup"},{"time":"9:30 AM","activity":"Gateway of India"},{"time":"10:30 AM","activity":"CSMT & colonial buildings"},{"time":"12:00 PM","activity":"Street food tour, Mohammed Ali Road"},{"time":"1:30 PM","activity":"Colaba Causeway Market"},{"time":"3:30 PM","activity":"Drop at hotel"}]',
'active'),

(2, 'Manali Highland Trek',
'Conquer the breathtaking trails of Himachal Pradesh. Trek through pine forests, glacial streams, and alpine meadows with the Himalayan peaks as your backdrop. A thrilling experience for all adventure lovers.',
2500.00, '1 Day', 12, 'Manali, Himachal Pradesh',
'', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
'Adventure',
'[{"icon":"fas fa-hiking","text":"Experienced trek guide"},{"icon":"fas fa-shoe-prints","text":"Trekking gear provided"},{"icon":"fas fa-hamburger","text":"Packed lunch & snacks"},{"icon":"fas fa-first-aid","text":"First aid & safety kit"},{"icon":"fas fa-shuttle-van","text":"Base camp transport"}]',
'[{"time":"6:30 AM","activity":"Departure from Manali town"},{"time":"8:00 AM","activity":"Reach Solang Valley base camp"},{"time":"8:30 AM","activity":"Equipment briefing & warm-up"},{"time":"9:00 AM","activity":"Begin highland trek"},{"time":"12:30 PM","activity":"Lunch at Beas Kund"},{"time":"3:00 PM","activity":"Summit & panoramic views"},{"time":"5:30 PM","activity":"Return to hotel"}]',
'active'),

(3, 'Ranthambore Wildlife Safari',
'Get up close with the majestic Royal Bengal Tiger and over 300 bird species in one of India''s finest national parks. Our expert naturalist guides guarantee unforgettable wildlife encounters.',
2800.00, '8 Hours', 10, 'Ranthambore, Rajasthan',
'', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
'Wildlife',
'[{"icon":"fas fa-car","text":"Open-top 4x4 safari jeep"},{"icon":"fas fa-binoculars","text":"Binoculars provided"},{"icon":"fas fa-utensils","text":"Packed lunch & refreshments"},{"icon":"fas fa-user-tie","text":"Expert naturalist guide"},{"icon":"fas fa-ticket-alt","text":"Park entry & jeep fees"}]',
'[{"time":"5:30 AM","activity":"Hotel pickup"},{"time":"6:30 AM","activity":"Morning safari zone entry"},{"time":"9:30 AM","activity":"Breakfast at forest lodge"},{"time":"10:30 AM","activity":"Ranthambore Fort walk"},{"time":"1:00 PM","activity":"Lunch break"},{"time":"2:30 PM","activity":"Afternoon safari"},{"time":"5:30 PM","activity":"Return to hotel"}]',
'active'),

(4, 'Taj Mahal Sunrise Tour',
'Witness the world''s greatest monument to love at the most magical hour. Stand before the marble wonder as the first light of dawn turns it golden, then explore the Agra Fort and local marble-craft workshops.',
3500.00, '12 Hours', 14, 'Agra, Uttar Pradesh',
'', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
'Featured',
'[{"icon":"fas fa-ticket-alt","text":"Taj Mahal & Agra Fort entry"},{"icon":"fas fa-car","text":"AC vehicle from Delhi/Agra"},{"icon":"fas fa-user-tie","text":"Licensed guide"},{"icon":"fas fa-utensils","text":"Authentic Mughlai lunch"},{"icon":"fas fa-camera","text":"Sunrise photography session"}]',
'[{"time":"4:00 AM","activity":"Hotel pickup (Delhi or Agra)"},{"time":"6:00 AM","activity":"Taj Mahal sunrise entry"},{"time":"8:30 AM","activity":"Breakfast at rooftop café"},{"time":"9:30 AM","activity":"Agra Fort exploration"},{"time":"12:30 PM","activity":"Mughlai lunch"},{"time":"2:00 PM","activity":"Marble inlay craft workshop"},{"time":"5:00 PM","activity":"Return drive"}]',
'active'),

(5, 'Jaipur Pink City Tour',
'Explore the royal splendour of the Pink City — Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar. Shop for handcrafted jewellery & tie-dye textiles at Johari Bazaar.',
2000.00, '10 Hours', 16, 'Jaipur, Rajasthan',
'', 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&q=80',
'Popular',
'[{"icon":"fas fa-car","text":"AC vehicle"},{"icon":"fas fa-ticket-alt","text":"Monument entry fees"},{"icon":"fas fa-user-tie","text":"Expert local guide"},{"icon":"fas fa-utensils","text":"Rajasthani thali lunch"},{"icon":"fas fa-horse","text":"Elephant/horse ride optional"}]',
'[{"time":"8:00 AM","activity":"Hotel pickup"},{"time":"9:00 AM","activity":"Amber Fort (jeep/elephant ride)"},{"time":"11:30 AM","activity":"Hawa Mahal photo stop"},{"time":"12:00 PM","activity":"City Palace & Museum"},{"time":"1:30 PM","activity":"Rajasthani lunch"},{"time":"3:00 PM","activity":"Jantar Mantar"},{"time":"4:30 PM","activity":"Johari Bazaar shopping"},{"time":"6:30 PM","activity":"Hotel drop"}]',
'active'),

(6, 'Goa Beach & Spice Tour',
'Soak up Goa''s legendary spirit — pristine beaches, Portuguese-era churches, aromatic spice plantations, and lively beach shacks serving fresh seafood. The perfect mix of culture and coastal bliss.',
1800.00, '8 Hours', 18, 'Goa',
'', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
'New',
'[{"icon":"fas fa-umbrella-beach","text":"Beach time included"},{"icon":"fas fa-leaf","text":"Spice plantation tour"},{"icon":"fas fa-church","text":"Heritage church visits"},{"icon":"fas fa-fish","text":"Fresh seafood lunch"},{"icon":"fas fa-car","text":"AC transport"}]',
'[{"time":"9:00 AM","activity":"Hotel pickup"},{"time":"10:00 AM","activity":"Bom Jesus Basilica & Se Cathedral"},{"time":"12:00 PM","activity":"Spice plantation walk & lunch"},{"time":"2:30 PM","activity":"Calangute or Baga Beach"},{"time":"4:30 PM","activity":"Anjuna Flea Market"},{"time":"6:00 PM","activity":"Sunset beach shack"},{"time":"7:00 PM","activity":"Hotel drop"}]',
'active'),

(7, 'Kerala Backwaters Day Trip',
'Glide through the emerald labyrinth of Kerala''s UNESCO-listed backwaters on a traditional wooden kettuvallam (houseboat). Spot kingfishers, toddy tappers, and coconut-fringed villages.',
3200.00, '9 Hours', 8, 'Alleppey, Kerala',
'', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
'Scenic',
'[{"icon":"fas fa-ship","text":"Traditional houseboat cruise"},{"icon":"fas fa-utensils","text":"Kerala sadya meals"},{"icon":"fas fa-fish","text":"Backwaters fishing experience"},{"icon":"fas fa-user-tie","text":"Naturalist guide"},{"icon":"fas fa-spa","text":"Brief Ayurveda demo"}]',
'[{"time":"8:30 AM","activity":"Alleppey town pickup"},{"time":"9:30 AM","activity":"Board houseboat at jetty"},{"time":"10:00 AM","activity":"Pampa River cruise begins"},{"time":"12:30 PM","activity":"Kerala sadya lunch on deck"},{"time":"2:00 PM","activity":"Village walk & toddy shop"},{"time":"4:00 PM","activity":"Bird watching & kayak option"},{"time":"5:30 PM","activity":"Deboard & hotel drop"}]',
'active'),

(8, 'Varanasi Ghat & Ganga Aarti',
'Experience the spiritual heart of India. Witness the mesmerising Ganga Aarti at Dashashwamedh Ghat, take a sunrise boat ride past 84 ghats, visit ancient temples, and stroll through timeless silk-weaving alleys.',
2200.00, '10 Hours', 12, 'Varanasi, Uttar Pradesh',
'', 'https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/04/Ganga-Aarti-Varanasi-1.jpg?fit=1200%2C800&ssl=1',
'Spiritual',
'[{"icon":"fas fa-om","text":"Ganga Aarti ceremony"},{"icon":"fas fa-ship","text":"Sunrise boat ride on Ganges"},{"icon":"fas fa-praying-hands","text":"Temple darshan"},{"icon":"fas fa-utensils","text":"Banarasi breakfast"},{"icon":"fas fa-user-tie","text":"Spiritual guide"}]',
'[{"time":"5:00 AM","activity":"Hotel pickup"},{"time":"5:30 AM","activity":"Sunrise Ganga rowing boat ride"},{"time":"7:30 AM","activity":"Visit Kashi Vishwanath Temple"},{"time":"9:00 AM","activity":"Banarasi breakfast – kachori sabzi"},{"time":"10:30 AM","activity":"Silk weaving lanes & shopping"},{"time":"1:00 PM","activity":"Lunch at local dhaba"},{"time":"5:30 PM","activity":"Dashashwamedh Ghat Aarti"},{"time":"8:00 PM","activity":"Hotel drop"}]',
'active');

-- ============================================================
-- SEED DATA — Rooms (7 entries with matching images)
-- ============================================================
INSERT IGNORE INTO rooms (id, name, description, price, capacity, image_path, image_url, status) VALUES

(1, 'Deluxe Room',
'Elegantly furnished with a king-size bed, plush bedding, and panoramic city views. Features a 55" smart TV, premium minibar, and a marble en-suite bathroom with a rain shower.',
6000.00, 2, '',
'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
'active'),

(2, 'Classic Room',
'A beautifully styled room perfect for solo travellers or couples on a budget. Includes a comfortable queen-size bed, work desk, free high-speed Wi-Fi, and a tiled private bathroom.',
3000.00, 2, '',
'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
'active'),

(3, 'Supreme Suite',
'The epitome of luxury — a sprawling suite with a separate living area, private plunge pool, butler service, floor-to-ceiling windows offering Himalayan views, and a 24-hour private chef.',
12000.00, 3, '',
'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
'active'),

(4, 'Heritage Haveli Room',
'Live like royalty in our hand-painted haveli-inspired room. Rich block-print textiles, jharokha windows, antique brass artefacts, and a four-poster bed create an authentic Rajasthani experience.',
8500.00, 2, '',
'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
'active'),

(5, 'Pool Villa',
'Your own private retreat — a standalone villa with direct pool access, an outdoor rain shower, open-air deck with sun loungers, kitchenette, and lush landscaped garden views.',
15000.00, 4, '',
'https://www.sripanwa.com/images/villas/presidential-five-bedroom-residence-villa-in-phuket-private-pool-villa.jpg',
'active'),

(6, 'Mountain View Cottage',
'Nestled among pine trees with sweeping valley views, this cosy cottage features a fireplace, hand-crafted wooden furniture, a private balcony, and warm Himalayan handicraft decor.',
7500.00, 3, '',
'https://tse1.mm.bing.net/th/id/OIP.-noVYh1Hahl10tQxz8cJiwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
'active'),

(7, 'Honeymoon Suite',
'Designed for romance — a lavish suite with a canopy bed draped in silk, petal-decorated en-suite jacuzzi, champagne on arrival, mood lighting, and a private balcony for stargazing.',
18000.00, 2, '',
'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
'active');

-- ============================================================
-- SEED DATA — Facilities (6 entries)
-- ============================================================
INSERT IGNORE INTO facilities (id, name, description, icon, image_path, status) VALUES
(1, 'Infinity Pool', 'Relax in our stunning rooftop infinity pool overlooking the city skyline — open sunrise to sunset.', 'fas fa-swimming-pool', '', 'active'),
(2, 'Fitness Center', 'State-of-the-art 24-hour gym with cardio machines, free weights, and personal trainers on request.', 'fas fa-dumbbell', '', 'active'),
(3, 'Ayurvedic Spa', 'Indulge in traditional Kerala Ayurveda massages, aromatherapy, and holistic wellness treatments.', 'fas fa-spa', '', 'active'),
(4, 'Fine Dining Restaurant', 'Multi-cuisine restaurant serving Pan-Indian, Continental, and Asian dishes prepared by award-winning chefs.', 'fas fa-utensils', '', 'active'),
(5, 'Rooftop Bar & Lounge', 'Sip signature cocktails and mocktails while enjoying panoramic sunset views at our stylish rooftop lounge.', 'fas fa-cocktail', '', 'active'),
(6, 'Conference & Events Hall', 'Fully equipped banquet and conference facility for up to 300 guests with AV support and catering.', 'fas fa-chalkboard-teacher', '', 'active');

-- ============================================================
-- SEED DATA — Packages (7 entries with matching images)
-- ============================================================
INSERT IGNORE INTO packages (id, name, description, price, duration, accommodation, meals, location, image_path, image_url, status) VALUES

(1, 'Goa Beach Escape',
'Leave your worries behind on the golden shores of Goa. This all-inclusive package covers beach resort stays, guided sightseeing of Portuguese churches, spice farms, vibrant nightlife at beach shacks, sunset cruise, and a South Goa vs North Goa full-day tour.',
15000.00, '3 Days / 2 Nights', '4-Star Beach Resort', 'Breakfast & Dinner',
'Goa', '',
'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
'active'),

(2, 'Rajasthan Royal Heritage',
'A regal journey through the Land of Kings. Visit Jaipur''s palaces, ride elephants at Amber Fort, camel safari in the Thar Desert at Sam Dunes, explore Mehrangarh Fort in Jodhpur, and watch the sun set over Lake Pichola in Udaipur.',
32000.00, '6 Days / 5 Nights', '5-Star Heritage Hotels', 'All Meals',
'Rajasthan', '',
'https://tse1.mm.bing.net/th/id/OIP.dxQWoEKugp8kjl3GjBzaXQAAAA?w=270&h=178&rs=1&pid=ImgDetMain&o=7&rm=3',
'active'),

(3, 'Kerala God''s Own Country',
'Discover the serene backwaters, misty tea estates of Munnar, wildlife in Periyar, and pristine Varkala beach. Features a night stay on a traditional houseboat, Ayurvedic full-body massage, and a spicy Kerala seafood cooking class.',
22000.00, '5 Days / 4 Nights', 'Houseboat + Resort', 'Breakfast & Lunch',
'Kerala', '',
'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
'active'),

(4, 'Himachal Adventure Quest',
'Fuel your adrenaline in the mountains. Raft the Beas River, paraglide over Bir Billing (paragliding capital of Asia), trek to Triund, ride the Shimla Toy Train, and camp under stars in Spiti Valley.',
18000.00, '5 Days / 4 Nights', 'Mountain Camps & Hotel', 'All Meals',
'Himachal Pradesh', '',
'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
'active'),

(5, 'Andaman Island Paradise',
'Crystal-clear waters, pristine coral reefs, and powder-white sands await. Go scuba diving at Elephant Beach, snorkelling at Neil Island, sea walk at North Bay, visit the historic Cellular Jail, and enjoy a bioluminescent night beach experience.',
35000.00, '5 Days / 4 Nights', '4-Star Beach Resort', 'Breakfast & Dinner',
'Andaman & Nicobar Islands', '',
'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
'active'),

(6, 'Varanasi Spiritual Sojourn',
'A profound pilgrimage to India''s oldest living city. Attend the hypnotic Ganga Aarti ceremony, take a dawn boat ride past 84 ghats, visit Sarnath where Buddha preached his first sermon, experience a private yoga session, and savour Banarasi street food.',
12000.00, '3 Days / 2 Nights', 'Heritage Boutique Hotel', 'Breakfast & Dinner',
'Varanasi, Uttar Pradesh', '',
'https://tse1.mm.bing.net/th/id/OIP.ygEKa9nQ-HTw5U2c7egsbAHaEm?w=900&h=560&rs=1&pid=ImgDetMain&o=7&rm=3',
'active'),

(7, 'Kashmir Valley of Heaven',
'Glide on a shikara across the mirror-like Dal Lake, stay in a luxurious floating houseboat, visit the magnificent Mughal Gardens, shop for Pashmina shawls and saffron in Lal Chowk, and take a breathtaking cable car to Gulmarg for Himalayan views.',
28000.00, '5 Days / 4 Nights', 'Floating Houseboat + Hotel', 'All Meals',
'Kashmir', '',
'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
'active');