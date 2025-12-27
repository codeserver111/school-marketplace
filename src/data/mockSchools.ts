export type ClassLevel = "Play School" | "Primary" | "Middle" | "High School";

export interface School {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  board: string;
  rating: number;
  reviewCount: number;
  annualFee: number;
  feeRange: string;
  address: string;
  city: string;
  distance: number;
  lat: number;
  lng: number;
  images: string[];
  hasHostel: boolean;
  hasTransport: boolean;
  established: number;
  studentCount: number;
  teacherRatio: string;
  grades: string;
  classLevels: ClassLevel[];
  amenities: string[];
  highlights: string[];
  description: string;
  timings: string;
  contactPhone: string;
  contactEmail: string;
  isPopular?: boolean;
}

export const schools: School[] = [
  {
    id: "1",
    name: "Delhi Public School",
    slug: "delhi-public-school-vasant-kunj",
    tagline: "Excellence in Education Since 1949",
    board: "CBSE",
    rating: 4.5,
    reviewCount: 324,
    annualFee: 180000,
    feeRange: "₹1.5L - ₹2L",
    address: "Sector C, Vasant Kunj",
    city: "New Delhi",
    distance: 2.3,
    lat: 28.5245,
    lng: 77.1570,
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
    ],
    hasHostel: true,
    hasTransport: true,
    established: 1949,
    studentCount: 4500,
    teacherRatio: "1:25",
    grades: "Nursery - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Swimming Pool", "Sports Complex", "Science Labs", "Library", "Auditorium", "Smart Classrooms", "Cafeteria", "Medical Room"],
    highlights: ["CBSE National Toppers", "100% Board Results", "International Collaborations"],
    description: "Delhi Public School is one of the largest chains of private schools in India. Known for academic excellence and holistic development of students through sports, arts, and extracurricular activities.",
    timings: "8:00 AM - 2:30 PM",
    contactPhone: "+91 98765 43210",
    contactEmail: "admissions@dpsvasantkunj.edu.in",
    isPopular: true
  },
  {
    id: "2",
    name: "Ryan International School",
    slug: "ryan-international-school-mayur-vihar",
    tagline: "Building Leaders of Tomorrow",
    board: "ICSE",
    rating: 4.3,
    reviewCount: 256,
    annualFee: 145000,
    feeRange: "₹1.2L - ₹1.6L",
    address: "Mayur Vihar Phase 1",
    city: "New Delhi",
    distance: 4.1,
    lat: 28.6070,
    lng: 77.2930,
    images: [
      "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=800",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 1976,
    studentCount: 3200,
    teacherRatio: "1:28",
    grades: "Nursery - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Basketball Court", "Computer Labs", "Music Room", "Dance Studio", "Library", "Playground"],
    highlights: ["Award-winning Sports Program", "Robotics Club", "MUN Participation"],
    description: "Ryan International School focuses on developing well-rounded individuals through a balanced curriculum emphasizing academics, sports, and values education.",
    timings: "7:45 AM - 2:00 PM",
    contactPhone: "+91 98765 43211",
    contactEmail: "info@ryanmayurvihar.edu.in"
  },
  {
    id: "3",
    name: "Sanskriti School",
    slug: "sanskriti-school-chanakyapuri",
    tagline: "Where Tradition Meets Innovation",
    board: "CBSE",
    rating: 4.8,
    reviewCount: 189,
    annualFee: 225000,
    feeRange: "₹2L - ₹2.5L",
    address: "Dr. S. Radhakrishnan Marg, Chanakyapuri",
    city: "New Delhi",
    distance: 5.6,
    lat: 28.5965,
    lng: 77.1810,
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 1996,
    studentCount: 1800,
    teacherRatio: "1:20",
    grades: "Nursery - XII",
    classLevels: ["Primary", "Middle", "High School"],
    amenities: ["Art Gallery", "Amphitheatre", "Tennis Courts", "Gymnasium", "Research Labs", "Recording Studio"],
    highlights: ["IIT/NEET Coaching", "Cultural Exchange Programs", "State-of-art Infrastructure"],
    description: "Sanskriti School is known for its progressive approach to education, combining academic rigor with cultural awareness and environmental consciousness.",
    timings: "8:15 AM - 3:00 PM",
    contactPhone: "+91 98765 43212",
    contactEmail: "admissions@sanskritischool.edu.in",
    isPopular: true
  },
  {
    id: "4",
    name: "Mother's International School",
    slug: "mothers-international-school",
    tagline: "Nurturing Hearts and Minds",
    board: "CBSE",
    rating: 4.2,
    reviewCount: 145,
    annualFee: 120000,
    feeRange: "₹1L - ₹1.4L",
    address: "Sri Aurobindo Marg, Hauz Khas",
    city: "New Delhi",
    distance: 3.2,
    lat: 28.5494,
    lng: 77.2001,
    images: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800"
    ],
    hasHostel: true,
    hasTransport: true,
    established: 1956,
    studentCount: 2800,
    teacherRatio: "1:22",
    grades: "Play School - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Yoga Hall", "Meditation Center", "Organic Garden", "Library", "Sports Fields", "Art Studios"],
    highlights: ["Value-based Education", "Holistic Development", "Eco-friendly Campus"],
    description: "Inspired by Sri Aurobindo's philosophy, the school emphasizes integral education that develops the physical, vital, mental, psychic, and spiritual aspects of each child.",
    timings: "8:00 AM - 2:15 PM",
    contactPhone: "+91 98765 43213",
    contactEmail: "info@themothersinternational.org"
  },
  {
    id: "5",
    name: "The Shri Ram School",
    slug: "shri-ram-school-vasant-vihar",
    tagline: "Inspiring Minds, Shaping Futures",
    board: "CBSE",
    rating: 4.7,
    reviewCount: 412,
    annualFee: 350000,
    feeRange: "₹3L - ₹4L",
    address: "Vasant Vihar",
    city: "New Delhi",
    distance: 1.8,
    lat: 28.5564,
    lng: 77.1590,
    images: [
      "https://images.unsplash.com/photo-1564429238922-5765b7c5c238?w=800",
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 1988,
    studentCount: 2200,
    teacherRatio: "1:15",
    grades: "Nursery - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Olympic Pool", "Theatre", "Innovation Lab", "Counseling Center", "Sports Academy", "Digital Library"],
    highlights: ["Cambridge Partnership", "Global Student Exchange", "Award-winning Arts Program"],
    description: "The Shri Ram School is one of India's premier educational institutions, known for its innovative teaching methodology and exceptional results in board examinations.",
    timings: "8:00 AM - 2:45 PM",
    contactPhone: "+91 98765 43214",
    contactEmail: "admissions@tsrs.org",
    isPopular: true
  },
  {
    id: "6",
    name: "Amity International School",
    slug: "amity-international-school-saket",
    tagline: "Global Standards, Indian Values",
    board: "CBSE",
    rating: 4.1,
    reviewCount: 287,
    annualFee: 165000,
    feeRange: "₹1.5L - ₹1.8L",
    address: "Saket, Sector 6",
    city: "New Delhi",
    distance: 4.5,
    lat: 28.5244,
    lng: 77.2090,
    images: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
      "https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe?w=800"
    ],
    hasHostel: true,
    hasTransport: true,
    established: 2003,
    studentCount: 3800,
    teacherRatio: "1:24",
    grades: "Nursery - XII",
    classLevels: ["Primary", "Middle", "High School"],
    amenities: ["Robotics Lab", "3D Printing", "Sports Complex", "Auditorium", "Language Lab", "Cafeteria"],
    highlights: ["STEM Focus", "International Trips", "Entrepreneurship Program"],
    description: "Part of the Amity Education Group, the school combines academic excellence with exposure to global opportunities and cutting-edge technology.",
    timings: "7:30 AM - 2:00 PM",
    contactPhone: "+91 98765 43215",
    contactEmail: "info@amitysaket.edu.in"
  },
  {
    id: "7",
    name: "Little Angels Play School",
    slug: "little-angels-play-school",
    tagline: "Where Learning Begins with Joy",
    board: "CBSE",
    rating: 4.4,
    reviewCount: 89,
    annualFee: 65000,
    feeRange: "₹50K - ₹80K",
    address: "Green Park Extension",
    city: "New Delhi",
    distance: 2.1,
    lat: 28.5600,
    lng: 77.2100,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 2010,
    studentCount: 450,
    teacherRatio: "1:10",
    grades: "Play Group - KG",
    classLevels: ["Play School"],
    amenities: ["Play Area", "Sandpit", "Art Room", "Activity Zone", "Rest Room", "Garden"],
    highlights: ["Montessori Approach", "Safe Environment", "Qualified Teachers"],
    description: "A nurturing environment for early learners focusing on play-based learning and holistic child development.",
    timings: "9:00 AM - 12:30 PM",
    contactPhone: "+91 98765 43216",
    contactEmail: "info@littleangels.edu.in"
  },
  {
    id: "8",
    name: "Bright Future High School",
    slug: "bright-future-high-school",
    tagline: "Preparing Leaders for Tomorrow",
    board: "State Board",
    rating: 4.0,
    reviewCount: 156,
    annualFee: 85000,
    feeRange: "₹70K - ₹1L",
    address: "Lajpat Nagar",
    city: "New Delhi",
    distance: 3.8,
    lat: 28.5700,
    lng: 77.2400,
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 1995,
    studentCount: 1200,
    teacherRatio: "1:30",
    grades: "IX - XII",
    classLevels: ["High School"],
    amenities: ["Science Labs", "Computer Lab", "Library", "Sports Ground"],
    highlights: ["Board Exam Focus", "Career Counseling", "Affordable Fees"],
    description: "Focused on providing quality high school education with emphasis on board exam preparation and career guidance.",
    timings: "7:30 AM - 2:00 PM",
    contactPhone: "+91 98765 43217",
    contactEmail: "info@brightfuture.edu.in"
  },
  {
    id: "9",
    name: "Cambridge International School",
    slug: "cambridge-international-school-gurgaon",
    tagline: "Global Education for Global Citizens",
    board: "IB",
    rating: 4.6,
    reviewCount: 198,
    annualFee: 420000,
    feeRange: "₹4L - ₹5L",
    address: "Sector 45, Golf Course Road",
    city: "Gurgaon",
    distance: 8.2,
    lat: 28.4595,
    lng: 77.0266,
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
    ],
    hasHostel: true,
    hasTransport: true,
    established: 2005,
    studentCount: 1600,
    teacherRatio: "1:12",
    grades: "Nursery - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Olympic Pool", "Indoor Sports", "Music Academy", "Art Studio", "Science Labs", "Digital Library", "Cafeteria", "Medical Center"],
    highlights: ["IB Curriculum", "100% University Placement", "International Faculty"],
    description: "Cambridge International School offers world-class IB education with a focus on developing internationally-minded students who are prepared for success in a global environment.",
    timings: "8:00 AM - 3:00 PM",
    contactPhone: "+91 98765 43218",
    contactEmail: "admissions@cambridgeinternational.edu.in",
    isPopular: true
  },
  {
    id: "10",
    name: "Tiny Tots Nursery",
    slug: "tiny-tots-nursery-south-delhi",
    tagline: "Where Every Child is a Star",
    board: "CBSE",
    rating: 4.5,
    reviewCount: 67,
    annualFee: 55000,
    feeRange: "₹45K - ₹65K",
    address: "Defence Colony",
    city: "New Delhi",
    distance: 2.8,
    lat: 28.5722,
    lng: 77.2311,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 2015,
    studentCount: 280,
    teacherRatio: "1:8",
    grades: "Play Group - Nursery",
    classLevels: ["Play School"],
    amenities: ["Play Area", "Sandpit", "Art Corner", "Music Room", "Nap Room", "Outdoor Garden"],
    highlights: ["Play-based Learning", "CCTV Monitored", "Trained Caregivers"],
    description: "A safe and nurturing environment designed specifically for toddlers and young children, focusing on early childhood development through play.",
    timings: "9:00 AM - 1:00 PM",
    contactPhone: "+91 98765 43219",
    contactEmail: "info@tinytots.edu.in"
  },
  {
    id: "11",
    name: "Modern Public School",
    slug: "modern-public-school-noida",
    tagline: "Excellence Through Innovation",
    board: "CBSE",
    rating: 4.2,
    reviewCount: 234,
    annualFee: 135000,
    feeRange: "₹1.2L - ₹1.5L",
    address: "Sector 62",
    city: "Noida",
    distance: 12.5,
    lat: 28.6270,
    lng: 77.3650,
    images: [
      "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=800",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 1998,
    studentCount: 3500,
    teacherRatio: "1:26",
    grades: "Nursery - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Computer Labs", "Science Labs", "Sports Ground", "Library", "Auditorium", "Cafeteria"],
    highlights: ["Smart Classrooms", "Olympiad Training", "Career Counseling"],
    description: "Modern Public School combines traditional values with modern teaching methodologies to provide quality education accessible to all.",
    timings: "7:45 AM - 2:15 PM",
    contactPhone: "+91 98765 43220",
    contactEmail: "info@modernpublic.edu.in"
  },
  {
    id: "12",
    name: "St. Mary's Convent School",
    slug: "st-marys-convent-school",
    tagline: "Faith, Knowledge, Service",
    board: "ICSE",
    rating: 4.4,
    reviewCount: 312,
    annualFee: 125000,
    feeRange: "₹1L - ₹1.5L",
    address: "Connaught Place",
    city: "New Delhi",
    distance: 6.1,
    lat: 28.6320,
    lng: 77.2200,
    images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
    ],
    hasHostel: true,
    hasTransport: true,
    established: 1952,
    studentCount: 2600,
    teacherRatio: "1:22",
    grades: "Nursery - XII",
    classLevels: ["Play School", "Primary", "Middle", "High School"],
    amenities: ["Chapel", "Library", "Music Room", "Sports Fields", "Computer Lab", "Art Room"],
    highlights: ["Values Education", "Strong Alumni Network", "Community Service"],
    description: "St. Mary's Convent School has been providing quality education rooted in Christian values for over 70 years, nurturing students to become responsible citizens.",
    timings: "8:00 AM - 2:00 PM",
    contactPhone: "+91 98765 43221",
    contactEmail: "admissions@stmarys.edu.in"
  },
  {
    id: "13",
    name: "Vedanta Academy",
    slug: "vedanta-academy-faridabad",
    tagline: "Ancient Wisdom, Modern Excellence",
    board: "CBSE",
    rating: 4.3,
    reviewCount: 145,
    annualFee: 95000,
    feeRange: "₹80K - ₹1.1L",
    address: "Sector 21",
    city: "Faridabad",
    distance: 15.3,
    lat: 28.4089,
    lng: 77.3178,
    images: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 2008,
    studentCount: 1800,
    teacherRatio: "1:25",
    grades: "LKG - X",
    classLevels: ["Play School", "Primary", "Middle"],
    amenities: ["Yoga Hall", "Vedic Studies Center", "Library", "Computer Lab", "Sports Ground"],
    highlights: ["Sanskrit Education", "Yoga & Meditation", "Cultural Programs"],
    description: "Vedanta Academy integrates ancient Indian wisdom with modern education, focusing on holistic development of mind, body, and spirit.",
    timings: "7:30 AM - 1:30 PM",
    contactPhone: "+91 98765 43222",
    contactEmail: "info@vedantaacademy.edu.in"
  },
  {
    id: "14",
    name: "Tech Valley School",
    slug: "tech-valley-school-gurgaon",
    tagline: "Coding the Future",
    board: "CBSE",
    rating: 4.5,
    reviewCount: 89,
    annualFee: 275000,
    feeRange: "₹2.5L - ₹3L",
    address: "Cyber City",
    city: "Gurgaon",
    distance: 9.7,
    lat: 28.4950,
    lng: 77.0895,
    images: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
      "https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 2018,
    studentCount: 850,
    teacherRatio: "1:15",
    grades: "Grade 1 - XII",
    classLevels: ["Primary", "Middle", "High School"],
    amenities: ["Coding Labs", "Robotics Center", "AI Lab", "3D Printing", "VR Room", "Maker Space"],
    highlights: ["Coding Curriculum", "Tech Partnerships", "Startup Incubator"],
    description: "Tech Valley School is a STEM-focused institution preparing students for the digital age with cutting-edge technology education and hands-on learning.",
    timings: "8:30 AM - 3:00 PM",
    contactPhone: "+91 98765 43223",
    contactEmail: "admissions@techvalley.edu.in"
  },
  {
    id: "15",
    name: "Rainbow Kids School",
    slug: "rainbow-kids-school",
    tagline: "Colors of Learning",
    board: "CBSE",
    rating: 4.6,
    reviewCount: 112,
    annualFee: 72000,
    feeRange: "₹60K - ₹85K",
    address: "Dwarka Sector 12",
    city: "New Delhi",
    distance: 7.2,
    lat: 28.5921,
    lng: 77.0460,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800"
    ],
    hasHostel: false,
    hasTransport: true,
    established: 2012,
    studentCount: 620,
    teacherRatio: "1:12",
    grades: "Play Group - Grade 5",
    classLevels: ["Play School", "Primary"],
    amenities: ["Indoor Play Zone", "Music Room", "Art Studio", "Garden", "Dance Room", "Story Corner"],
    highlights: ["Activity-based Learning", "Parent Workshops", "Small Class Sizes"],
    description: "Rainbow Kids School provides a colorful and creative learning environment for young children, focusing on experiential and activity-based education.",
    timings: "8:30 AM - 1:30 PM",
    contactPhone: "+91 98765 43224",
    contactEmail: "hello@rainbowkids.edu.in"
  }
];

export const boards = ["All", "CBSE", "ICSE", "IB", "State Board"];
export const feeRanges = ["All", "Under ₹1L", "₹1L - ₹2L", "₹2L - ₹3L", "Above ₹3L"];
export const classLevels: ClassLevel[] = ["Play School", "Primary", "Middle", "High School"];

export const getSchoolBySlug = (slug: string): School | undefined => {
  return schools.find(school => school.slug === slug);
};

export const getPopularSchools = (): School[] => {
  return schools.filter(school => school.isPopular);
};

export const getNearbySchools = (): School[] => {
  return [...schools].sort((a, b) => a.distance - b.distance).slice(0, 4);
};

export const filterSchools = (filters: {
  board?: string;
  feeRange?: string;
  hasHostel?: boolean;
  hasTransport?: boolean;
  searchQuery?: string;
  classLevel?: string;
  maxDistance?: number;
}): School[] => {
  return schools.filter(school => {
    if (filters.board && filters.board !== "All" && school.board !== filters.board) {
      return false;
    }
    
    if (filters.feeRange && filters.feeRange !== "All") {
      const fee = school.annualFee;
      switch (filters.feeRange) {
        case "Under ₹1L":
          if (fee >= 100000) return false;
          break;
        case "₹1L - ₹2L":
          if (fee < 100000 || fee > 200000) return false;
          break;
        case "₹2L - ₹3L":
          if (fee < 200000 || fee > 300000) return false;
          break;
        case "Above ₹3L":
          if (fee <= 300000) return false;
          break;
      }
    }
    
    if (filters.classLevel && filters.classLevel !== "All") {
      if (!school.classLevels.includes(filters.classLevel as ClassLevel)) {
        return false;
      }
    }
    
    // Distance filter
    if (filters.maxDistance && filters.maxDistance < 50) {
      if (school.distance > filters.maxDistance) {
        return false;
      }
    }
    
    if (filters.hasHostel && !school.hasHostel) return false;
    if (filters.hasTransport && !school.hasTransport) return false;
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        school.name.toLowerCase().includes(query) ||
        school.address.toLowerCase().includes(query) ||
        school.board.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
};
