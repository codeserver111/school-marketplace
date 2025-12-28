// Mock Admission API Services

import { 
  ChildProfile, 
  ApplicationData, 
  DocumentUpload, 
  SchoolMatch, 
  MatchFactor,
  TimelineEvent,
  ExtractedDocData,
  DocumentType
} from "@/types/admission";
import { schools } from "@/data/mockSchools";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock OCR extraction based on document type
export async function mockOcrExtraction(
  documentType: DocumentType, 
  childProfile: Partial<ChildProfile>
): Promise<ExtractedDocData> {
  await delay(1500); // Simulate OCR processing

  const mockData: Record<DocumentType, ExtractedDocData> = {
    birth_certificate: {
      childName: childProfile.name || "Aarav Sharma",
      dateOfBirth: childProfile.dateOfBirth || "2018-05-15",
    },
    transfer_certificate: {
      childName: childProfile.name || "Aarav Sharma",
      previousSchool: "ABC Public School",
      grades: { "overall": "A" },
    },
    marksheet: {
      childName: childProfile.name || "Aarav Sharma",
      grades: {
        "Mathematics": "95",
        "English": "88",
        "Science": "92",
        "Social Studies": "85",
        "Hindi": "90",
      },
    },
    address_proof: {
      address: childProfile.location || "Vasant Kunj, New Delhi",
    },
    photo: {},
    parent_id: {},
  };

  return mockData[documentType];
}

// Validate document against profile
export function validateDocument(
  extractedData: ExtractedDocData,
  childProfile: Partial<ChildProfile>
): { isValid: boolean; mismatchDetails?: string } {
  const mismatches: string[] = [];

  if (extractedData.childName && childProfile.name) {
    const extractedName = extractedData.childName.toLowerCase().trim();
    const profileName = childProfile.name.toLowerCase().trim();
    if (!extractedName.includes(profileName) && !profileName.includes(extractedName)) {
      mismatches.push(`Name mismatch: Document shows "${extractedData.childName}" but profile has "${childProfile.name}"`);
    }
  }

  if (extractedData.dateOfBirth && childProfile.dateOfBirth) {
    if (extractedData.dateOfBirth !== childProfile.dateOfBirth) {
      mismatches.push(`DOB mismatch: Document shows "${extractedData.dateOfBirth}" but profile has "${childProfile.dateOfBirth}"`);
    }
  }

  return {
    isValid: mismatches.length === 0,
    mismatchDetails: mismatches.length > 0 ? mismatches.join("; ") : undefined,
  };
}

// Calculate school matching score
export function calculateSchoolMatch(
  school: typeof schools[0],
  childProfile: ChildProfile
): SchoolMatch {
  const factors: MatchFactor[] = [];
  let score = 50; // Base score

  // Age cutoff check (assuming class mapping)
  const classToAge: Record<string, number> = {
    "Play Group": 2.5,
    "Nursery": 3,
    "LKG": 4,
    "UKG": 5,
    "Class 1": 6,
    "Class 2": 7,
    "Class 3": 8,
    "Class 4": 9,
    "Class 5": 10,
    "Class 6": 11,
  };
  
  const expectedAge = classToAge[childProfile.targetClass] || 6;
  const ageDiff = Math.abs(childProfile.age - expectedAge);
  
  if (ageDiff <= 0.5) {
    score += 15;
    factors.push({ name: "Age", status: "positive", detail: "Perfect age match for target class" });
  } else if (ageDiff <= 1) {
    score += 8;
    factors.push({ name: "Age", status: "neutral", detail: "Age within acceptable range" });
  } else {
    score -= 10;
    factors.push({ name: "Age", status: "negative", detail: "Age may not meet cutoff requirements" });
  }

  // Board preference match
  if (school.board === childProfile.board) {
    score += 15;
    factors.push({ name: "Board", status: "positive", detail: `${school.board} matches your preference` });
  } else {
    factors.push({ name: "Board", status: "neutral", detail: `School offers ${school.board} (you preferred ${childProfile.board})` });
  }

  // Distance check
  if (school.distance <= childProfile.maxDistance) {
    if (school.distance <= 3) {
      score += 12;
      factors.push({ name: "Distance", status: "positive", detail: `Only ${school.distance} km away` });
    } else {
      score += 5;
      factors.push({ name: "Distance", status: "neutral", detail: `${school.distance} km is within your range` });
    }
  } else {
    score -= 15;
    factors.push({ name: "Distance", status: "negative", detail: `${school.distance} km exceeds your ${childProfile.maxDistance} km limit` });
  }

  // Budget check
  if (school.annualFee <= childProfile.budget.max) {
    if (school.annualFee >= childProfile.budget.min) {
      score += 15;
      factors.push({ name: "Fees", status: "positive", detail: `₹${(school.annualFee / 1000).toFixed(0)}K is within your budget` });
    } else {
      score += 10;
      factors.push({ name: "Fees", status: "positive", detail: `₹${(school.annualFee / 1000).toFixed(0)}K is below your budget` });
    }
  } else {
    score -= 20;
    factors.push({ name: "Fees", status: "negative", detail: `₹${(school.annualFee / 1000).toFixed(0)}K exceeds your ₹${(childProfile.budget.max / 1000).toFixed(0)}K budget` });
  }

  // Academic level bonus
  if (childProfile.academicLevel === "Excellent") {
    score += 10;
    factors.push({ name: "Academics", status: "positive", detail: "Strong academic profile increases chances" });
  } else if (childProfile.academicLevel === "Above Average") {
    score += 5;
    factors.push({ name: "Academics", status: "positive", detail: "Good academic standing" });
  } else if (childProfile.academicLevel === "Average") {
    factors.push({ name: "Academics", status: "neutral", detail: "Average academics - competitive admission" });
  } else {
    score -= 5;
    factors.push({ name: "Academics", status: "negative", detail: "May need academic improvement" });
  }

  // School popularity penalty (more competitive)
  if (school.isPopular) {
    score -= 5;
    factors.push({ name: "Competition", status: "negative", detail: "High demand school - more competitive" });
  }

  // Rating bonus
  if (school.rating >= 4.5) {
    factors.push({ name: "Rating", status: "positive", detail: `Top-rated school (${school.rating}★)` });
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Determine chance level
  let chance: "High" | "Medium" | "Low";
  if (score >= 70) {
    chance = "High";
  } else if (score >= 45) {
    chance = "Medium";
  } else {
    chance = "Low";
  }

  return {
    schoolId: school.id,
    chance,
    score,
    factors,
  };
}

// Get matched schools for a profile
export async function getMatchedSchools(
  childProfile: ChildProfile
): Promise<SchoolMatch[]> {
  await delay(800);

  return schools
    .map(school => calculateSchoolMatch(school, childProfile))
    .sort((a, b) => b.score - a.score);
}

// Generate timeline for application
export function generateTimeline(status: string): TimelineEvent[] {
  const now = new Date();
  const events: TimelineEvent[] = [
    {
      id: "1",
      date: now.toISOString(),
      title: "Application Started",
      description: "You've begun your admission journey",
      status: "completed",
    },
    {
      id: "2",
      date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      title: "Documents Verification",
      description: "Our team will verify your uploaded documents",
      status: status === "draft" ? "upcoming" : "completed",
    },
    {
      id: "3",
      date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      title: "School Review",
      description: "Selected schools will review your application",
      status: ["under_review", "shortlisted", "interview_scheduled", "accepted"].includes(status) ? "current" : "upcoming",
    },
    {
      id: "4",
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      title: "Interview/Assessment",
      description: "If shortlisted, you'll be invited for interaction",
      status: status === "interview_scheduled" ? "current" : "upcoming",
    },
    {
      id: "5",
      date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      title: "Final Decision",
      description: "Estimated decision date",
      status: status === "accepted" || status === "rejected" ? "completed" : "upcoming",
    },
  ];

  return events;
}

// Generate AI status update message
export function generateStatusUpdate(status: string, schoolName?: string): string {
  const updates: Record<string, string[]> = {
    draft: [
      "Complete your profile to start matching with schools.",
      "Upload required documents to proceed with applications.",
    ],
    documents_pending: [
      "We're waiting for your documents. Upload them to proceed.",
      "Some documents are missing. Complete the upload to continue.",
    ],
    under_review: [
      `Great news! ${schoolName || "The school"} is reviewing your application.`,
      "Your application is being evaluated. We'll update you soon.",
    ],
    shortlisted: [
      `Congratulations! You've been shortlisted by ${schoolName || "the school"}!`,
      "Excellent progress! Prepare for the next round.",
    ],
    interview_scheduled: [
      "Interview scheduled! Check your email for date and time.",
      "Get ready for your interaction session. Tips have been sent to your email.",
    ],
    accepted: [
      `🎉 Congratulations! ${schoolName || "The school"} has accepted your application!`,
      "Welcome aboard! Complete the admission formalities.",
    ],
    waitlisted: [
      "You're on the waitlist. We'll notify you of any updates.",
      "Stay positive! Waitlist positions often convert to offers.",
    ],
    rejected: [
      "Unfortunately, this application wasn't successful. Consider other options.",
      "Don't lose hope! You can apply to other matching schools.",
    ],
  };

  const messages = updates[status] || ["Application in progress."];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Save application (mock)
export async function saveApplication(
  application: Partial<ApplicationData>
): Promise<ApplicationData> {
  await delay(500);

  const now = new Date().toISOString();
  return {
    id: `app_${Date.now()}`,
    childProfile: application.childProfile!,
    selectedSchools: application.selectedSchools || [],
    documents: application.documents || [],
    status: application.status || "draft",
    timeline: generateTimeline(application.status || "draft"),
    createdAt: application.createdAt || now,
    updatedAt: now,
  };
}

// Get required documents list
export function getRequiredDocuments(): { type: DocumentType; label: string; required: boolean; description?: string }[] {
  return [
    { type: "photo", label: "Child's Passport Photo", required: true, description: "Recent passport-size photo of your child" },
    { type: "parent_id", label: "Parent ID Proof", required: true, description: "Aadhaar, PAN, Passport or Voter ID" },
    { type: "birth_certificate", label: "Birth Certificate", required: false, description: "Optional - Helps verify age automatically" },
    { type: "transfer_certificate", label: "Transfer Certificate (TC)", required: false, description: "Optional - Required only for transfers" },
    { type: "marksheet", label: "Previous Year Marksheet", required: false, description: "Optional - Improves school matching accuracy" },
    { type: "address_proof", label: "Address Proof", required: false, description: "Optional - Utility bill or rent agreement" },
  ];
}
