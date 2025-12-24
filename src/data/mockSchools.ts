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
  amenities: string[];
  highlights: string[];
  description: string;
  timings: string;
  contactPhone: string;
  contactEmail: string;
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
    amenities: ["Swimming Pool", "Sports Complex", "Science Labs", "Library", "Auditorium", "Smart Classrooms", "Cafeteria", "Medical Room"],
    highlights: ["CBSE National Toppers", "100% Board Results", "International Collaborations"],
    description: "Delhi Public School is one of the largest chains of private schools in India. Known for academic excellence and holistic development of students through sports, arts, and extracurricular activities.",
    timings: "8:00 AM - 2:30 PM",
    contactPhone: "+91 98765 43210",
    contactEmail: "admissions@dpsvasantkunj.edu.in"
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
    amenities: ["Art Gallery", "Amphitheatre", "Tennis Courts", "Gymnasium", "Research Labs", "Recording Studio"],
    highlights: ["IIT/NEET Coaching", "Cultural Exchange Programs", "State-of-art Infrastructure"],
    description: "Sanskriti School is known for its progressive approach to education, combining academic rigor with cultural awareness and environmental consciousness.",
    timings: "8:15 AM - 3:00 PM",
    contactPhone: "+91 98765 43212",
    contactEmail: "admissions@sanskritischool.edu.in"
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
    grades: "Nursery - XII",
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
    amenities: ["Olympic Pool", "Theatre", "Innovation Lab", "Counseling Center", "Sports Academy", "Digital Library"],
    highlights: ["Cambridge Partnership", "Global Student Exchange", "Award-winning Arts Program"],
    description: "The Shri Ram School is one of India's premier educational institutions, known for its innovative teaching methodology and exceptional results in board examinations.",
    timings: "8:00 AM - 2:45 PM",
    contactPhone: "+91 98765 43214",
    contactEmail: "admissions@tsrs.org"
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
    amenities: ["Robotics Lab", "3D Printing", "Sports Complex", "Auditorium", "Language Lab", "Cafeteria"],
    highlights: ["STEM Focus", "International Trips", "Entrepreneurship Program"],
    description: "Part of the Amity Education Group, the school combines academic excellence with exposure to global opportunities and cutting-edge technology.",
    timings: "7:30 AM - 2:00 PM",
    contactPhone: "+91 98765 43215",
    contactEmail: "info@amitysaket.edu.in"
  }
];

export const boards = ["All", "CBSE", "ICSE", "IB", "State Board"];
export const feeRanges = ["All", "Under ₹1L", "₹1L - ₹2L", "₹2L - ₹3L", "Above ₹3L"];

export const getSchoolBySlug = (slug: string): School | undefined => {
  return schools.find(school => school.slug === slug);
};

export const filterSchools = (filters: {
  board?: string;
  feeRange?: string;
  hasHostel?: boolean;
  hasTransport?: boolean;
  searchQuery?: string;
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
