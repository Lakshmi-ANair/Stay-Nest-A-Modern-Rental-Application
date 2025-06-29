import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './BookingConfirmationPage.css';

function BookingConfirmationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const bookingDetails = location.state?.bookingDetails;

    useEffect(() => {
        if (!bookingDetails) {
            console.warn("Navigated to confirmation page without booking details. Redirecting home.");
            navigate('/');
        }
    }, [bookingDetails, navigate]);

    if (!bookingDetails) {
        return <div>Loading confirmation...</div>;
    }

    const { title, city, images, startDate, endDate, numberOfNights, totalPrice, currency } = bookingDetails;
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const pricePerNight = Math.round(totalPrice / numberOfNights);

    return (
        <div className="confirmation-page-container">
            <div className="confirmation-card">
                <div className="confirmation-header">
                    <span className="success-icon">✔</span>
                    <h1>Booking Confirmed!</h1>
                    <p>Your stay has been successfully reserved. You can view it on your dashboard.</p>
                </div>
                <div className="booking-summary">
                    <div className="summary-image">
                        <img 
                            src={images && images.length > 0 ? images[0] : 'https://via.placeholder.com/150/1F2937/FFFFFF?text=StayNest'} 
                            alt={title} 
                        />
                    </div>
                    <div className="summary-details">
                        <h2>{title}</h2>
                        <p className="summary-city">{city}</p>
                        <div className="summary-dates">
                            <div className="date-item"><span>Check-in</span><strong>{formattedStartDate}</strong></div>
                            <div className="date-item"><span>Check-out</span><strong>{formattedEndDate}</strong></div>
                        </div>
                    </div>
                </div>
                <div className="price-details">
                    <h3>Price Details</h3>
                    <div className="price-row">
                        <span>{currency.symbol}{pricePerNight.toLocaleString()} x {numberOfNights} nights</span>
                        <span>{currency.symbol}{(pricePerNight * numberOfNights).toLocaleString()}</span>
                    </div>
                    <div className="price-row total">
                        <span>Total Amount</span>
                        <span>{currency.symbol}{totalPrice.toLocaleString()}</span>
                    </div>
                </div>
                <div className="confirmation-actions">
                    <Link to="/listings" className="action-button secondary">Explore More</Link>
                    <Link to="/dashboard" className="action-button primary">Go to Your Dashboard</Link>
                </div>
            </div>
        </div>
    );
}

export default BookingConfirmationPage;