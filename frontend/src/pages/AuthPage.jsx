import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './AuthPage.css';
import authBackgroundImage from '../assets/images/auth-background.jpg';

function AuthPage() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login, signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isLoginView) {
            try {
                const loggedInUser = await login(email, password);
                if (loggedInUser.has_set_preferences) {
                    navigate('/dashboard');
                } else {
                    navigate('/preference-setup');
                }
            } catch (err) {
                setError(err.response?.data?.msg || 'Login failed. Check credentials.');
            }
        } else { 
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            try {
                await signup({ email, password, firstName, lastName });
                setSuccess('Signup successful! Please log in.');
                setIsLoginView(true);
                clearForm();
            } catch (err) {
                setError(err.response?.data?.msg || 'Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-page-background" style={{ backgroundImage: `url(${authBackgroundImage})` }}>
            <div className="auth-page-overlay"></div>
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-header">
                        <h2>{isLoginView ? 'Log In' : 'Sign Up'}</h2>
                        <p>
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <span onClick={() => setIsLoginView(!isLoginView)} className="toggle-link">
                                {isLoginView ? 'Sign up' : 'Log in'}
                            </span>
                        </p>
                    </div>
                    {error && <p className="message error-message">{error}</p>}
                    {success && <p className="message success-message">{success}</p>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLoginView && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name <span className="optional-text">(Optional)</span></label>
                                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                        </div>
                        {!isLoginView && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
                            </div>
                        )}
                        <button type="submit" className="auth-button">
                            {isLoginView ? 'Log In' : 'Sign Up'}
                        </button>
                    </form>
                    {isLoginView && (
                        <div className="forgot-password-link">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;