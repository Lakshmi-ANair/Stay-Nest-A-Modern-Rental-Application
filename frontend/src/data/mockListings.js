export const mockListings = [
  // ==========================
  // ========== INDIA ==========
  // ==========================
  {
    id: 1,
    title: "Modern 2 Bedroom for Families in Mumbai",
    country: "India", city: "Mumbai", occupantType: "Family", accommodationType: "Apartment", bedrooms: "2 Bedrooms", furnishing: "Fully Furnished",
    price: 35000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg", "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg", "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg"],
    description: "A beautifully designed, spacious 2-bedroom apartment in a prime Mumbai location. Perfect for families, with easy access to schools and markets. Features a modern kitchen and ample natural light.",
    amenities: ["WiFi", "Air Conditioning", "Washing Machine", "Security", "Parking", "Gym"],
    owner: { name: "Rohan Sharma", phone: "+91 98765 43210", email: "rohan.s@staynest.dev" }
  },
  {
    id: 2,
    title: "Shared Room for Students near Tech Park",
    country: "India", city: "Bangalore", occupantType: "Students", accommodationType: "Shared / Co-living", bedrooms: "Studio / 1 Room", furnishing: "Semi-Furnished",
    price: 9500, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg", "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg", "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg", "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg"],
    description: "Affordable and clean shared living space, ideal for students and young professionals. Located just minutes from the Electronic City tech park. Includes a common kitchen and high-speed internet.",
    amenities: ["WiFi", "Kitchen", "Hot Water", "Housekeeping"],
    owner: { name: "Priya Singh", phone: "+91 98765 11223", email: "priya.s@staynest.dev" }
  },
  {
    id: 3,
    title: "Quiet Studio for Professionals in Delhi",
    country: "India", city: "Delhi", occupantType: "Individual / Couple", accommodationType: "Apartment", bedrooms: "Studio / 1 Room", furnishing: "Unfurnished",
    price: 16000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg", "https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg","https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg"],
    description: "A quiet and private studio apartment in a peaceful neighborhood of South Delhi. Perfect for focusing on work. The space is a blank canvas for you to furnish as you wish.",
    amenities: ["Security", "Parking", "Power Backup"],
    owner: { name: "Ankit Kumar", phone: "+91 98765 44556", email: "ankit.k@staynest.dev" }
  },
  {
    id: 4,
    title: "Independent House with Terrace",
    country: "India", city: "Chennai", occupantType: "Family", accommodationType: "House", bedrooms: "3+ Bedrooms", furnishing: "Semi-Furnished",
    price: 28000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg", "https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg"],
    description: "Enjoy the luxury of space in this independent house with a private terrace. Semi-furnished with essential appliances and wardrobes. Located in a family-friendly community.",
    amenities: ["Terrace", "Parking", "Air Conditioning", "Washing Machine"],
    owner: { name: "Lakshmi Reddy", phone: "+91 98765 77889", email: "lakshmi.r@staynest.dev" }
  },
  {
    id: 5,
    title: "Affordable Co-living for Singles",
    country: "India", city: "Kolkata", occupantType: "Individual / Couple", accommodationType: "Shared / Co-living", bedrooms: "Studio / 1 Room", furnishing: "Fully Furnished",
    price: 8000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg", "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg", "https://images.pexels.com/photos/271649/pexels-photo-271649.jpeg", "https://images.pexels.com/photos/8581023/pexels-photo-8581023.jpeg"],
    description: "A modern and vibrant co-living space designed for individuals. Meet new people in our common areas or relax in your fully-furnished private room. All bills included.",
    amenities: ["WiFi", "Kitchen", "Housekeeping", "Community Events"],
    owner: { name: "Sanjay Gupta", phone: "+91 98765 12345", email: "sanjay.g@staynest.dev" }
  },
  {
    id: 6,
    title: "Any Occupant - 2 Bedroom in Bangalore",
    country: "India", city: "Bangalore", occupantType: "Any", accommodationType: "Apartment", bedrooms: "2 Bedrooms", furnishing: "Unfurnished",
    price: 20000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg", "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg", "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg", "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"],
    description: "A spacious 2-bedroom apartment available for any type of occupant. Located in a central area with great connectivity. Ample space to set up your home as you like.",
    amenities: ["Security", "Parking", "Elevator"],
    owner: { name: "Vikram Mehta", phone: "+91 98765 67890", email: "vikram.m@staynest.dev" }
  },
  {
    id: 7,
    title: "Compact Studio for Singles",
    country: "India", city: "Mumbai", occupantType: "Individual / Couple", accommodationType: "Apartment", bedrooms: "Studio / 1 Room", furnishing: "Fully Furnished",
    price: 25000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg", "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg", "https://images.pexels.com/photos/7031405/pexels-photo-7031405.jpeg"],
    description: "A smart, fully-furnished studio apartment in a modern building. Ideal for a single person or a couple. Includes a small kitchenette and a stylishly designed living/sleeping area.",
    amenities: ["WiFi", "Air Conditioning", "Smart TV", "Security"],
    owner: { name: "Neha Patel", phone: "+91 98765 11111", email: "neha.p@staynest.dev" }
  },
  {
    id: 8,
    title: "Sea View 3 Bedroom Apartment",
    country: "India", city: "Mumbai", occupantType: "Family", accommodationType: "Apartment", bedrooms: "3+ Bedrooms", furnishing: "Fully Furnished",
    price: 80000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/3958958/pexels-photo-3958958.jpeg", "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg", "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg", "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg"],
    description: "Experience luxury living with this stunning sea-view apartment in Bandra. This spacious 3-bedroom flat is perfect for a large family seeking comfort and style.",
    amenities: ["WiFi", "Air Conditioning", "Swimming Pool", "Gym", "Security"],
    owner: { name: "Aditya Roy", phone: "+91 98765 22222", email: "aditya.r@staynest.dev" }
  },
  {
    id: 9,
    title: "Student Co-living near IIT Madras",
    country: "India", city: "Chennai", occupantType: "Students", accommodationType: "Shared / Co-living", bedrooms: "Studio / 1 Room", furnishing: "Semi-Furnished",
    price: 9000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg", "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg", "https://images.pexels.com/photos/271649/pexels-photo-271649.jpeg", "https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg"],
    description: "A comfortable and secure co-living space designed for students. Located conveniently near IIT Madras. Each room has a bed, desk, and wardrobe. Common areas for study and recreation.",
    amenities: ["WiFi", "Hot Water", "Housekeeping", "CCTV Security"],
    owner: { name: "Kavitha Murthy", phone: "+91 98765 33333", email: "kavitha.m@staynest.dev" }
  },
  {
    id: 10,
    title: "Professional's Den in Kolkata",
    country: "India", city: "Kolkata", occupantType: "Individual / Couple", accommodationType: "Apartment", bedrooms: "2 Bedrooms", furnishing: "Fully Furnished",
    price: 25000, price_period: "mo", currency: { symbol: "₹", code: "INR" },
    images: ["https://images.pexels.com/photos/5998051/pexels-photo-5998051.jpeg", "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg", "https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg"],
    description: "A stylish and fully-equipped 2-bedroom apartment in the heart of Kolkata. Perfect for working professionals, offering a quiet environment with all modern comforts.",
    amenities: ["WiFi", "Air Conditioning", "Power Backup", "Washing Machine"],
    owner: { name: "Arjun Banerjee", phone: "+91 98765 44444", email: "arjun.b@staynest.dev" }
  },

  // =========================
  // ========== USA ==========
  // =========================
  {
    id: 11,
    title: "Cozy Room in Shared Brooklyn Apt",
    country: "USA", city: "New York", occupantType: "Students", accommodationType: "Shared / Co-living", bedrooms: "Studio / 1 Room", furnishing: "Fully Furnished",
    price: 1400, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg", "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", "https://images.pexels.com/photos/271649/pexels-photo-271649.jpeg", "https://images.pexels.com/photos/7031405/pexels-photo-7031405.jpeg"],
    description: "A private room in a stylish, shared 3-bedroom apartment in Brooklyn. Close to subway lines for easy access to NYU and other Manhattan universities. All utilities included.",
    amenities: ["WiFi", "Kitchen", "Heating", "Washer/Dryer"],
    owner: { name: "Jessica Miller", phone: "+1 (212) 555-0199", email: "jess.m@staynest.dev" }
  },
  {
    id: 12,
    title: "Student Room near UChicago",
    country: "USA", city: "Chicago", occupantType: "Students", accommodationType: "Shared / Co-living", bedrooms: "Studio / 1 Room", furnishing: "Semi-Furnished",
    price: 1100, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/7512041/pexels-photo-7512041.jpeg", "https://images.pexels.com/photos/6585613/pexels-photo-6585613.jpeg", "https://images.pexels.com/photos/7031405/pexels-photo-7031405.jpeg"],
    description: "Walk to class from this convenient room for rent near the University of Chicago campus. The room includes a bed and desk. Shared bathroom and kitchen with two other students.",
    amenities: ["WiFi", "Heating", "Kitchen"],
    owner: { name: "David Chen", phone: "+1 (312) 555-0150", email: "david.c@staynest.dev" }
  },
  {
    id: 13,
    title: "Suburban Family Home",
    country: "USA", city: "San Francisco", occupantType: "Family", accommodationType: "House", bedrooms: "3+ Bedrooms", furnishing: "Fully Furnished",
    price: 4800, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg", "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"],
    description: "A beautiful, fully-furnished family home in a safe and quiet suburban neighborhood. Features a backyard, a two-car garage, and modern appliances. Excellent school district.",
    amenities: ["Parking", "Backyard", "Washer/Dryer", "Dishwasher", "Heating"],
    owner: { name: "Sarah Johnson", phone: "+1 (415) 555-0111", email: "sarah.j@staynest.dev" }
  },
  {
    id: 14,
    title: "Chicago High-Rise for Professionals",
    country: "USA", city: "Chicago", occupantType: "Individual / Couple", accommodationType: "Apartment", bedrooms: "2 Bedrooms", furnishing: "Fully Furnished",
    price: 3200, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg", "https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg", "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"],
    description: "Stunning 2-bedroom apartment on a high floor with breathtaking city views. Building includes a gym and 24/7 doorman. Perfect for professionals working in the Loop.",
    amenities: ["Gym", "Security", "Air Conditioning", "Dishwasher"],
    owner: { name: "Michael Rodriguez", phone: "+1 (312) 555-0187", email: "michael.r@staynest.dev" }
  },
  {
    id: 15,
    title: "Boston Commons Apartment",
    country: "USA", city: "Boston", occupantType: "Any", accommodationType: "Apartment", bedrooms: "1 Bedroom", furnishing: "Semi-Furnished",
    price: 2900, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/6782476/pexels-photo-6782476.jpeg", "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg"],
    description: "A bright and airy 1-bedroom apartment located steps from Boston Commons. Semi-furnished, allowing you to bring your own style. Pet-friendly building.",
    amenities: ["Heating", "Elevator", "Pet Friendly"],
    owner: { name: "Emily White", phone: "+1 (617) 555-0123", email: "emily.w@staynest.dev" }
  },
  {
    id: 16,
    title: "Techie's Pad in San Francisco",
    country: "USA", city: "San Francisco", occupantType: "Individual / Couple", accommodationType: "Apartment", bedrooms: "1 Bedroom", furnishing: "Fully Furnished",
    price: 4200, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg", "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg", "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg", "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg"],
    description: "Live in the heart of the tech world. This fully-furnished 1-bedroom apartment is perfect for professionals in the SOMA district. Features high-speed internet and a dedicated workspace.",
    amenities: ["WiFi", "Heating", "Workspace", "Dishwasher"],
    owner: { name: "Alex Chen", phone: "+1 (415) 555-0134", email: "alex.c@staynest.dev" }
  },
  {
    id: 17,
    title: "Shared House near NYU",
    country: "USA", city: "New York", occupantType: "Students", accommodationType: "Shared / Co-living", bedrooms: "Studio / 1 Room", furnishing: "Unfurnished",
    price: 1200, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/7061419/pexels-photo-7061419.jpeg", "https://images.pexels.com/photos/6585627/pexels-photo-6585627.jpeg", "https://images.pexels.com/photos/8581023/pexels-photo-8581023.jpeg", "https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg"],
    description: "An unfurnished room in a large house shared with other NYU students. A great opportunity to find community and live affordably in the city. Large common living room and kitchen.",
    amenities: ["Kitchen", "Washer/Dryer", "Heating"],
    owner: { name: "Maria Garcia", phone: "+1 (212) 555-0145", email: "maria.g@staynest.dev" }
  },
  {
    id: 18,
    title: "Unfurnished Loft in LA",
    country: "USA", city: "Los Angeles", occupantType: "Any", accommodationType: "Apartment", bedrooms: "2 Bedrooms", furnishing: "Unfurnished",
    price: 2500, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg", "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg", "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg", ],
    description: "A massive, unfurnished loft space in the Downtown LA Arts District. High ceilings and industrial-style windows. Perfect for artists or anyone looking for a blank canvas to create their dream home.",
    amenities: ["Parking", "Elevator", "Pet Friendly"],
    owner: { name: "Kevin Lee", phone: "+1 (213) 555-0156", email: "kevin.l@staynest.dev" }
  },
  {
    id: 19,
    title: "Family House in Boston Suburbs",
    country: "USA", city: "Boston", occupantType: "Family", accommodationType: "House", bedrooms: "3+ Bedrooms", furnishing: "Unfurnished",
    price: 4000, price_period: "mo", currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg", "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg", "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg", "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"],
    description: "A classic American suburban house with a large yard, perfect for families with children. Located in a top-rated school district just outside of Boston.",
    amenities: ["Backyard", "Parking", "Washer/Dryer", "Heating"],
    owner: { name: "The Thompson Family", phone: "+1 (617) 555-0167", email: "thompson@staynest.dev" }
  },
  {
    id: 20,
    title: "Artist's Retreat in Los Angeles",
    country: "USA",
    city: "Los Angeles",
    occupantType: "Individual / Couple",
    accommodationType: "House",
    bedrooms: "2 Bedrooms",
    furnishing: "Semi-Furnished",
    price: 3500,
    price_period: "mo",
    currency: { symbol: "$", code: "USD" },
    images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", "https://images.pexels.com/photos/129494/pexels-photo-129494.jpeg", "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", "https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg"],
    description: "A unique house with great natural light and an open floor plan, perfect for artists and creatives. Semi-furnished to give you flexibility. Located in the vibrant Silver Lake neighborhood.",
    amenities: ["WiFi", "Patio", "Workspace", "Pet Friendly"],
    owner: { name: "Leo Martinez", phone: "+1 (213) 555-0178", email: "leo.m@staynest.dev" }
  }
];