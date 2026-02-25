import axios from 'axios';

const api = axios.create({
    baseURL: '/api',   // Uses Vite proxy in dev, same-origin in production
    headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every request
api.interceptors.request.use(config => {
    // Use admin token for admin routes, user token for everything else
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('token');
    const token = config.url?.startsWith('/admin') ? adminToken : (userToken || adminToken);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 - clear stale tokens
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            const url = err.config?.url || '';
            if (url.startsWith('/admin')) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        return Promise.reject(err);
    }
);

export default api;
