// Admission Flow Types

export interface ChildProfile {
  name: string;
  age: number;
  dateOfBirth: string;
  currentClass: string;
  targetClass: string;
  board: string;
  location: string;
  maxDistance: number;
  budget: {
    min: number;
    max: number;
  };
  academicLevel: "Below Average" | "Average" | "Above Average" | "Excellent";
  specialNeeds?: string;
  interests?: string[];
}

export interface ApplicationData {
  id: string;
  childProfile: ChildProfile;
  selectedSchools: string[];
  documents: DocumentUpload[];
  status: ApplicationStatus;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentUpload {
  id: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected" | "mismatch";
  extractedData?: ExtractedDocData;
  mismatchDetails?: string;
}

export type DocumentType = 
  | "birth_certificate"
  | "transfer_certificate"
  | "marksheet"
  | "address_proof"
  | "photo"
  | "parent_id";

export interface ExtractedDocData {
  childName?: string;
  dateOfBirth?: string;
  previousSchool?: string;
  grades?: Record<string, string>;
  address?: string;
}

export type ApplicationStatus = 
  | "draft"
  | "documents_pending"
  | "under_review"
  | "shortlisted"
  | "interview_scheduled"
  | "accepted"
  | "rejected"
  | "waitlisted";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  icon?: string;
}

export interface SchoolMatch {
  schoolId: string;
  chance: "High" | "Medium" | "Low";
  score: number;
  factors: MatchFactor[];
}

export interface MatchFactor {
  name: string;
  status: "positive" | "neutral" | "negative";
  detail: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  options?: ChatOption[];
  extractedData?: Partial<ChildProfile>;
}

export interface ChatOption {
  label: string;
  value: string;
}

export type AdmissionStep = 
  | "chat"
  | "school_matching"
  | "documents"
  | "review"
  | "timeline";
