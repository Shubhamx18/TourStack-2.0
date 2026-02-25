import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Packages from './pages/Packages';
import Facilities from './pages/Facilities';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import BookTour from './pages/BookTour';
import BookRoom from './pages/BookRoom';
import BookPackage from './pages/BookPackage';
import AvailableRooms from './pages/AvailableRooms';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import ViewBooking from './pages/ViewBooking';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminBookings from './admin/AdminBookings';
import AdminCustomers from './admin/AdminCustomers';
import AdminTours from './admin/AdminTours';
import AdminRooms from './admin/AdminRooms';
import AdminPackages from './admin/AdminPackages';
import AdminUsers from './admin/AdminUsers';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/available-rooms" element={<AvailableRooms />} />

          {/* Protected user routes */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="/book-tour/:id" element={<PrivateRoute><BookTour /></PrivateRoute>} />
          <Route path="/book-room/:id" element={<PrivateRoute><BookRoom /></PrivateRoute>} />
          <Route path="/book-package/:id" element={<PrivateRoute><BookPackage /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/payment-success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
          <Route path="/booking/:type/:id" element={<PrivateRoute><ViewBooking /></PrivateRoute>} />
          <Route path="/view-booking/:type/:id" element={<PrivateRoute><ViewBooking /></PrivateRoute>} />

          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
          <Route path="/admin/tours" element={<AdminRoute><AdminTours /></AdminRoute>} />
          <Route path="/admin/rooms" element={<AdminRoute><AdminRooms /></AdminRoute>} />
          <Route path="/admin/packages" element={<AdminRoute><AdminPackages /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
