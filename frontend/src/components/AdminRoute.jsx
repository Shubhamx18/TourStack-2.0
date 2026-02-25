import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const AdminRoute = ({ children }) => {
    const { adminUser, loading } = useAuth();
    if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
    return adminUser ? children : <Navigate to="/admin/login" />;
};
export default AdminRoute;
