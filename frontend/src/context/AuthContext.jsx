import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
axios.defaults.baseURL = 'http://localhost:5001';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const userJson = localStorage.getItem('user');
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [dashboardRefetchTrigger, setDashboardRefetchTrigger] = useState(0);
    const navigate = useNavigate();

    const triggerDashboardRefetch = () => {
        setDashboardRefetchTrigger(prev => prev + 1);
    };

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/login', { email, password });
        const { access_token, refresh_token, user: userData } = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setToken(access_token);
        setUser(userData);
        return userData;
    };

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/auth');
    }, [navigate]);
    
    const signup = async ({ email, password, firstName, lastName }) => {
        const response = await axios.post('/api/auth/register', { email, password, firstName, lastName });
        if (response.status !== 201) { throw new Error(response.data?.msg || "Signup failed"); }
        return true;
    };

    const updateUserPreferencesFlag = () => {
        if(user) {
            const updatedUser = { ...user, has_set_preferences: true };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    useEffect(() => {
        if (token) { axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = () => { setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light'); };
    
    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(r => r, async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) { logout(); return Promise.reject(error); }
                try {
                    const { data } = await axios.post('/api/auth/refresh', {}, { headers: { Authorization: `Bearer ${refreshToken}` } });
                    localStorage.setItem('token', data.access_token); setToken(data.access_token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                    return axios(originalRequest);
                } catch (refreshError) { logout(); return Promise.reject(refreshError); }
            }
            return Promise.reject(error);
        });
        return () => axios.interceptors.response.eject(responseInterceptor);
    }, [logout]);

    const value = { 
        user, token, loading, theme, toggleTheme, 
        login, logout, signup, updateUserPreferencesFlag,
        dashboardRefetchTrigger, triggerDashboardRefetch
    };

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

export default AuthContext;