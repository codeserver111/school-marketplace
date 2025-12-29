export interface Review {
  id: string;
  schoolId: string;
  parentName: string;
  parentAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  childGrade?: string;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: "r1",
    schoolId: "1",
    parentName: "Priya Sharma",
    rating: 5,
    comment: "Excellent school with great infrastructure. My daughter has been studying here for 3 years and I've seen tremendous improvement in her confidence and academics.",
    date: "2024-12-15",
    verified: true,
    childGrade: "Grade 5",
    helpful: 24
  },
  {
    id: "r2",
    schoolId: "1",
    parentName: "Rajesh Kumar",
    rating: 4,
    comment: "Good teaching staff and curriculum. The transport facility could be improved but overall a great choice for holistic education.",
    date: "2024-11-28",
    verified: true,
    childGrade: "Grade 8",
    helpful: 18
  },
  {
    id: "r3",
    schoolId: "1",
    parentName: "Anita Verma",
    rating: 5,
    comment: "The extracurricular activities are amazing. My son loves the robotics club and has won several competitions.",
    date: "2024-10-05",
    verified: true,
    childGrade: "Grade 10",
    helpful: 32
  },
  {
    id: "r4",
    schoolId: "2",
    parentName: "Suresh Patel",
    rating: 4,
    comment: "Great sports facilities. The basketball program is excellent. Teachers are supportive and approachable.",
    date: "2024-12-01",
    verified: true,
    childGrade: "Grade 7",
    helpful: 15
  },
  {
    id: "r5",
    schoolId: "2",
    parentName: "Meera Reddy",
    rating: 5,
    comment: "My child has flourished here. The MUN program helped build his public speaking skills tremendously.",
    date: "2024-11-15",
    verified: true,
    childGrade: "Grade 11",
    helpful: 21
  },
  {
    id: "r6",
    schoolId: "3",
    parentName: "Vikram Singh",
    rating: 5,
    comment: "Top-notch education with a perfect blend of traditional values and modern teaching methods. Worth every penny.",
    date: "2024-12-10",
    verified: true,
    childGrade: "Grade 6",
    helpful: 45
  },
  {
    id: "r7",
    schoolId: "3",
    parentName: "Kavitha Nair",
    rating: 5,
    comment: "The cultural exchange programs are exceptional. My daughter got to visit Cambridge and it was a life-changing experience.",
    date: "2024-09-20",
    verified: true,
    childGrade: "Grade 9",
    helpful: 38
  },
  {
    id: "r8",
    schoolId: "4",
    parentName: "Amit Joshi",
    rating: 4,
    comment: "The value-based education approach is wonderful. My kids have become more mindful and compassionate.",
    date: "2024-11-05",
    verified: true,
    childGrade: "Grade 4",
    helpful: 12
  },
  {
    id: "r9",
    schoolId: "5",
    parentName: "Neha Gupta",
    rating: 5,
    comment: "Best school in Delhi hands down. The innovation lab and arts program are world-class. Highly recommend!",
    date: "2024-12-18",
    verified: true,
    childGrade: "Grade 12",
    helpful: 56
  },
  {
    id: "r10",
    schoolId: "5",
    parentName: "Rohit Mehta",
    rating: 4,
    comment: "Premium education with premium fees. But the quality justifies the cost. Teachers are exceptional.",
    date: "2024-10-25",
    verified: true,
    childGrade: "Grade 3",
    helpful: 29
  },
  {
    id: "r11",
    schoolId: "6",
    parentName: "Sunita Rao",
    rating: 4,
    comment: "Good STEM focus and modern facilities. The entrepreneurship program is unique and beneficial.",
    date: "2024-11-20",
    verified: true,
    childGrade: "Grade 8",
    helpful: 17
  },
  {
    id: "r12",
    schoolId: "9",
    parentName: "Arjun Kapoor",
    rating: 5,
    comment: "IB curriculum is challenging but rewarding. The international exposure my son gets is unparalleled.",
    date: "2024-12-20",
    verified: true,
    childGrade: "Grade 10",
    helpful: 34
  },
  {
    id: "r13",
    schoolId: "9",
    parentName: "Sarah Thomas",
    rating: 4,
    comment: "Excellent faculty with international experience. The fees are high but the quality matches it.",
    date: "2024-11-10",
    verified: false,
    childGrade: "Grade 7",
    helpful: 19
  },
  {
    id: "r14",
    schoolId: "10",
    parentName: "Deepika Malhotra",
    rating: 5,
    comment: "Perfect for toddlers! The teachers are so caring and patient. My daughter loves going to school every day.",
    date: "2024-12-22",
    verified: true,
    childGrade: "Nursery",
    helpful: 28
  },
  {
    id: "r15",
    schoolId: "12",
    parentName: "Michael D'Souza",
    rating: 5,
    comment: "Strong values and excellent academics. The school has been in our family for three generations.",
    date: "2024-10-15",
    verified: true,
    childGrade: "Grade 6",
    helpful: 42
  },
  {
    id: "r16",
    schoolId: "14",
    parentName: "Ravi Agarwal",
    rating: 5,
    comment: "My son learned Python programming in Grade 4! The tech-focused curriculum is amazing for future-ready education.",
    date: "2024-12-05",
    verified: true,
    childGrade: "Grade 5",
    helpful: 51
  },
  {
    id: "r17",
    schoolId: "15",
    parentName: "Nandini Shah",
    rating: 5,
    comment: "Small class sizes mean personalized attention. My child has blossomed in this nurturing environment.",
    date: "2024-11-25",
    verified: true,
    childGrade: "Grade 2",
    helpful: 23
  },
  {
    id: "r18",
    schoolId: "1",
    parentName: "Guest User",
    rating: 3,
    comment: "Good school but the admission process was quite lengthy. Wish it was more streamlined.",
    date: "2024-08-10",
    verified: false,
    childGrade: "Grade 1",
    helpful: 5
  }
];

export const getReviewsBySchoolId = (schoolId: string): Review[] => {
  return reviews.filter(review => review.schoolId === schoolId);
};

export const getAverageRating = (schoolId: string): { average: number; count: number } => {
  const schoolReviews = getReviewsBySchoolId(schoolId);
  if (schoolReviews.length === 0) return { average: 0, count: 0 };
  
  const total = schoolReviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    average: Math.round((total / schoolReviews.length) * 10) / 10,
    count: schoolReviews.length
  };
};

export const getRatingDistribution = (schoolId: string): Record<number, number> => {
  const schoolReviews = getReviewsBySchoolId(schoolId);
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  schoolReviews.forEach(review => {
    distribution[review.rating]++;
  });
  
  return distribution;
};

// Simulated add review function
export const addReview = (review: Omit<Review, 'id' | 'date' | 'helpful'>): Review => {
  const newReview: Review = {
    ...review,
    id: `r${Date.now()}`,
    date: "2024-01-15",
    helpful: 0
  };
  reviews.push(newReview);
  return newReview;
};
