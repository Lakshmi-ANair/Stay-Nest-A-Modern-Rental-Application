import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import './ListingCard.css'; 

const ListingCard = ({ listing }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const FALLBACK_IMAGE = 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = FALLBACK_IMAGE;
  };


  const goToNext = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    const isLastSlide = currentIndex === listing.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrevious = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? listing.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  if (!listing || !listing.images || listing.images.length === 0) {
    return null; 
  }

  return (
    
    <Link to={`/listings/${listing.id}`} className="listing-card-link">
      <div className="listing-card">
        {}
        <div className="slider-container">
          {}
          <button onClick={goToPrevious} className="slider-button prev">
            ❮
          </button>
          {}
          <button onClick={goToNext} className="slider-button next">
            ❯
          </button>
          
          <img
            src={listing.images[currentIndex]} 
            alt={listing.title}
            className="listing-image"
            onError={handleImageError}
          />

          {}
          <div className="slider-dots">
            {listing.images.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
        {}
        
        <div className="listing-info">
          <h3 className="listing-title">{listing.title}</h3>
          <p className="listing-price">
            {listing.currency.symbol}{listing.price.toLocaleString()} / {listing.price_period}
          </p>
          <p className="listing-details">
            {listing.bedrooms} • {listing.city}, {listing.country}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;