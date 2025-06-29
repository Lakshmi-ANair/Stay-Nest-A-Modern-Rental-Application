import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
    const { user, logout, loading, theme, toggleTheme } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false); 
        navigate('/auth');
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const displayName = user?.firstName || user?.email?.split('@')[0] || 'User';

    return (
        <nav className="navbar-container">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">StayNest</Link>
                {user && (
                    <div className="navbar-links">
                        <NavLink to="/dashboard" className="navbar-link">Dashboard</NavLink>
                        <NavLink to="/listings" className="navbar-link">Listings</NavLink>
                    </div>
                )}
            </div>
            <div className="navbar-right">
                <button onClick={toggleTheme} className="theme-toggle-button-nav" aria-label="Toggle theme">
                    {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
                </button>
                
                {loading ? (
                    <div className="navbar-user-greeting">Loading...</div>
                ) : user ? (
                    <>
                        <Link to="/listings/new" className="list-property-button">
                            List Your Property
                        </Link>
                        <div className="user-menu-container" ref={dropdownRef}>
                            <button className="user-menu-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                Hi, {displayName}
                                <span className="user-menu-avatar">{displayName.charAt(0)}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="user-dropdown">
                                    <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                        <FiUser /> My Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item logout">
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to="/auth" className="navbar-button primary-accent-button">
                        Login / Sign Up
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;