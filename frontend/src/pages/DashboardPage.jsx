import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FiCalendar, FiClock, FiHome, FiPlusCircle, FiSearch, FiTrash2, FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './DashboardPage.css';

const MySwal = withReactContent(Swal);

const BookingCard = ({ booking, onCancel }) => {
    const formattedStartDate = new Date(booking.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const formattedEndDate = new Date(booking.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const nights = Math.ceil(Math.abs(new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24));
    return (
        <div className="pro-activity-card">
            <img src={booking.image || 'https://via.placeholder.com/150'} alt={booking.title} />
            <div className="pro-card-main-info">
                <h4>{booking.title}</h4>
                <p>{booking.city}</p>
                <div className="pro-card-dates"><FiCalendar /> {formattedStartDate} - {formattedEndDate} ({nights} nights)</div>
            </div>
            <div className="pro-card-actions">
                <span className="pro-card-price">{booking.currency.symbol}{booking.totalPrice.toLocaleString()}</span>
                <button onClick={() => onCancel(booking.id)} className="pro-card-button cancel">Cancel</button>
            </div>
        </div>
    );
};
const VisitCard = ({ visit, onCancel }) => {
    const visitDate = new Date(visit.visitDate).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
    return (
        <div className="pro-activity-card">
            <img src={visit.image || 'https://via.placeholder.com/150'} alt={visit.title} />
            <div className="pro-card-main-info">
                <h4>{visit.title}</h4>
                <p>{visit.city}</p>
                <div className="pro-card-dates"><FiClock /> {visitDate}</div>
            </div>
            <div className="pro-card-actions">
                <span className={`status-badge status-${visit.status.toLowerCase()}`}>{visit.status}</span>
                <button onClick={() => onCancel(visit.id)} className="pro-card-button cancel">Cancel</button>
            </div>
        </div>
    );
};
const PropertyCard = ({ property, onDelete }) => (
    <div className="pro-activity-card">
        <img src={property.images[0] || 'https://via.placeholder.com/150'} alt={property.title} />
        <div className="pro-card-main-info">
            <h4>{property.title}</h4>
            <p>{property.city}</p>
            <div className="pro-card-dates"><strong>Price:</strong> {property.currency.symbol}{property.price.toLocaleString()}/mo</div>
        </div>
        <div className="pro-card-actions">
            <button className="pro-card-button"><FiEdit /> Edit</button>
            <button onClick={() => onDelete(property.id)} className="pro-card-button cancel">Delete</button>
        </div>
    </div>
);
const EmptyState = ({ icon, title, text, buttonLink, buttonText }) => (
    <div className="empty-state-pro">
        <div className="empty-state-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={buttonLink} className="action-button-dashboard">{buttonText}</Link>
    </div>
);

function DashboardPage() {
    const { user, dashboardRefetchTrigger, triggerDashboardRefetch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [data, setData] = useState({ bookings: [], visits: [], properties: [] });
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [bookingsRes, visitsRes, propertiesRes] = await Promise.all([
                axios.get('/api/my-bookings'),
                axios.get('/api/my-visits'),
                axios.get('/api/my-listings')
            ]);
            setData({ bookings: bookingsRes.data, visits: visitsRes.data, properties: propertiesRes.data });
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            if (error.response?.status === 401 || error.response?.status === 422) {
                navigate('/auth');
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData, dashboardRefetchTrigger]);

    const showConfirmation = useCallback((title, text, confirmButtonText) => {
        return MySwal.fire({ title, text, icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#6e7881', confirmButtonText, background: 'var(--bg-container)', color: 'var(--text-primary)' });
    }, []);

    const handleCancelBooking = useCallback(async (bookingId) => {
        const result = await showConfirmation('Are you sure?', 'This booking will be permanently cancelled.', 'Yes, cancel it!');
        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/bookings/${bookingId}`);
                await MySwal.fire('Success!', 'Your booking has been cancelled.', 'success');
                triggerDashboardRefetch();
            } catch (err) {
                await MySwal.fire('Error!', err.response?.data?.msg || 'Could not cancel booking.', 'error');
            }
        }
    }, [showConfirmation, triggerDashboardRefetch]);

    const handleCancelVisit = useCallback(async (visitId) => {
        const result = await showConfirmation('Are you sure?', 'This scheduled visit will be cancelled.', 'Yes, cancel it!');
        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/visits/${visitId}`);
                await MySwal.fire('Success!', 'Your visit has been cancelled.', 'success');
                triggerDashboardRefetch();
            } catch (err) {
                await MySwal.fire('Error!', err.response?.data?.msg || 'Could not cancel visit.', 'error');
            }
        }
    }, [showConfirmation, triggerDashboardRefetch]);

    const handleDeleteProperty = useCallback(async (listingId) => {
        const result = await showConfirmation('Are you sure?', 'This property will be permanently deleted.', 'Yes, delete it!');
        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/listings/${listingId}`);
                await MySwal.fire('Success!', 'Your property has been deleted.', 'success');
                triggerDashboardRefetch();
            } catch (err) {
                await MySwal.fire('Error!', err.response?.data?.msg || 'Could not delete property.', 'error');
            }
        }
    }, [showConfirmation, triggerDashboardRefetch]);

    const renderContent = () => {
        if (isLoading) return <div className="loading-state">Loading your dashboard...</div>;
        switch (activeTab) {
            case 'bookings':
                return data.bookings.length > 0 ? (data.bookings.map(booking => <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />)) : (<EmptyState icon={<FiSearch/>} title="No Bookings Yet" text="You have no upcoming or past bookings. Time to find your next stay!" buttonLink="/listings" buttonText="Start Exploring" />);
            case 'visits':
                return data.visits.length > 0 ? (data.visits.map(visit => <VisitCard key={visit.id} visit={visit} onCancel={handleCancelVisit} />)) : (<EmptyState icon={<FiClock/>} title="No Visits Scheduled" text="Request a tour to see a place in person before you book." buttonLink="/listings" buttonText="Find a Place" />);
            case 'properties':
                return data.properties.length > 0 ? (data.properties.map(prop => <PropertyCard key={prop.id} property={prop} onDelete={handleDeleteProperty} />)) : (<EmptyState icon={<FiPlusCircle/>} title="No Properties Listed" text="Ready to earn? List your property on StayNest and connect with renters." buttonLink="/listings/new" buttonText="Become a Host" />);
            default: return null;
        }
    };

    return (
        <div className="dashboard-container-pro">
            <header className="dashboard-header-pro">
                <h1>Your Dashboard</h1>
                <p>Welcome back, {user?.firstName || 'StayNester'}! Here’s what’s happening.</p>
            </header>
            <div className="dashboard-tabs">
                <button className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}><FiCalendar /> My Bookings ({data.bookings.length})</button>
                <button className={`tab-button ${activeTab === 'visits' ? 'active' : ''}`} onClick={() => setActiveTab('visits')}><FiClock /> Scheduled Visits ({data.visits.length})</button>
                <button className={`tab-button ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}><FiHome /> My Properties ({data.properties.length})</button>
            </div>
            <div className="dashboard-content">{renderContent()}</div>
        </div>
    );
}

export default DashboardPage;