import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './BookingWidget.css';

const MySwal = withReactContent(Swal);

const CustomDatePickerHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
    <div className="custom-datepicker-header">
        <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="datepicker-nav-button">❮</button>
        <span className="datepicker-month">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="datepicker-nav-button">❯</button>
    </div>
);

const BookingWidget = ({ listing }) => {
    const [mode, setMode] = useState('stay');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [visitDate, setVisitDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();
    const { triggerDashboardRefetch } = useContext(AuthContext);

    const numberOfNights = (startDate && endDate) ? Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;
    const pricePerNight = Math.round(listing.price / 30);
    const totalPrice = numberOfNights * pricePerNight;
    
    const timeSlots = ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
    const swalTheme = { background: 'var(--bg-container)', color: 'var(--text-primary)', confirmButtonColor: 'var(--accent-color)' };

    const handleReserve = async () => {
        if (!startDate || !endDate) {
            MySwal.fire({ title: 'Incomplete Selection', text: 'Please select a start and end date.', icon: 'warning', ...swalTheme });
            return;
        }

        const result = await MySwal.fire({
            title: 'Confirm Your Booking?',
            html: `You are about to book <strong>${listing.title}</strong> from <strong>${startDate.toLocaleDateString()}</strong> to <strong>${endDate.toLocaleDateString()}</strong>.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, book it!',
            cancelButtonText: 'Not now',
            ...swalTheme
        });

        if (result.isConfirmed) {
            const bookingDetailsForNextPage = {
                title: listing.title, city: listing.city, images: listing.images,
                startDate: startDate.toISOString(), endDate: endDate.toISOString(),
                numberOfNights, totalPrice, currency: listing.currency
            };
            const bookingDataForAPI = { 
                listingId: listing.id, 
                startDate: startDate.toISOString(), 
                endDate: endDate.toISOString(), 
                totalPrice 
            };

            try {
                await axios.post('/api/bookings', bookingDataForAPI);
                triggerDashboardRefetch();
                navigate('/booking/confirm', { state: { bookingDetails: bookingDetailsForNextPage } });
            } catch (error) {
                console.error("Booking failed:", error);
                MySwal.fire({ title: 'Error', text: error.response?.data?.msg || 'Could not create your booking. Please try again.', icon: 'error', ...swalTheme });
            }
        }
    };

    const handleRequestVisit = async () => {
        if (!visitDate || !selectedTime) {
            MySwal.fire({ title: 'Incomplete Selection', text: 'Please select a date and time for your visit.', icon: 'warning', ...swalTheme });
            return;
        }

        const [hourStr, minuteStr] = selectedTime.replace(/AM|PM/i, '').trim().split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        const isPM = selectedTime.toUpperCase().includes('PM');
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        
        const combinedDateTime = new Date(visitDate);
        combinedDateTime.setHours(hour, minute, 0, 0);

        const result = await MySwal.fire({
            title: 'Confirm Visit Request?',
            html: `Request a visit for <strong>${listing.title}</strong> on <strong>${combinedDateTime.toLocaleString()}</strong>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, request visit!',
            cancelButtonText: 'Cancel',
            ...swalTheme
        });

        if (result.isConfirmed) {
            const visitDetails = { listingId: listing.id, visitDate: combinedDateTime.toISOString() };
            try {
                await axios.post('/api/visits', visitDetails);
                triggerDashboardRefetch();
                await MySwal.fire({ 
                    title: 'Visit Requested!', 
                    text: `Your request has been sent. You can check its status on your dashboard.`, 
                    icon: 'success', 
                    ...swalTheme 
                });
                navigate('/dashboard'); 
            } catch (error) {
                console.error("Visit request failed:", error);
                MySwal.fire({ title: 'Error', text: error.response?.data?.msg || 'Could not request your visit. Please try again.', icon: 'error', ...swalTheme });
            }
        }
    };

    return (
        <div className="booking-widget">
            <div className="mode-toggle">
                <button type="button" className={`mode-button ${mode === 'stay' ? 'active' : ''}`} onClick={() => setMode('stay')}>Book a Stay</button>
                <button type="button" className={`mode-button ${mode === 'visit' ? 'active' : ''}`} onClick={() => setMode('visit')}>Schedule a Visit</button>
            </div>
            <div className="widget-content">
                {mode === 'stay' ? (
                    <>
                        <h3>{listing.currency.symbol}{pricePerNight.toLocaleString()} / night</h3>
                        <div className="date-picker-container">
                            <DatePicker
                                selected={startDate}
                                onChange={(dates) => { const [start, end] = dates; setStartDate(start); setEndDate(end); }}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                                minDate={new Date()}
                                monthsShown={1}
                                renderCustomHeader={CustomDatePickerHeader}
                            />
                        </div>
                        {numberOfNights > 0 && (
                            <div className="price-calculation">
                                <div className="price-row"><span>{listing.currency.symbol}{pricePerNight.toLocaleString()} x {numberOfNights} nights</span><span>{listing.currency.symbol}{totalPrice.toLocaleString()}</span></div>
                                <div className="price-row total"><span>Total</span><span>{listing.currency.symbol}{totalPrice.toLocaleString()}</span></div>
                            </div>
                        )}
                        <button type="button" className="main-action-button" onClick={handleReserve} disabled={!startDate || !endDate}>Reserve</button>
                    </>
                ) : (
                    <>
                        <h3>Request a property tour</h3>
                        <div className="date-picker-container">
                             <DatePicker
                                selected={visitDate}
                                onChange={(date) => setVisitDate(date)}
                                inline
                                minDate={new Date()}
                                renderCustomHeader={CustomDatePickerHeader}
                            />
                        </div>
                        <h4>Choose a time slot</h4>
                        <div className="time-slots-container">
                            {timeSlots.map(time => (<button type="button" key={time} className={`time-slot-button ${selectedTime === time ? 'selected' : ''}`} onClick={() => setSelectedTime(time)}>{time}</button>))}
                        </div>
                        <button type="button" className="main-action-button" onClick={handleRequestVisit} disabled={!visitDate || !selectedTime}>Request Visit</button>
                    </>
                )}
            </div>
            <div className="dealer-info">
                <h4>Contact Dealer</h4>
                <p><strong>Name:</strong> {listing.owner.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${listing.owner.email}`}>{listing.owner.email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${listing.owner.phone}`}>{listing.owner.phone}</a></p>
            </div>
        </div>
    );
};
export default BookingWidget;