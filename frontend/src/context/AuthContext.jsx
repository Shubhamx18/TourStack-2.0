import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        const adminToken = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminUser');
        if (token && userData) setUser(JSON.parse(userData));
        if (adminToken && adminData) setAdminUser(JSON.parse(adminData));
        setLoading(false);
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const adminLogin = (token, adminData) => {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        setAdminUser(adminData);
    };

    const adminLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setAdminUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, adminUser, login, logout, adminLogin, adminLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
