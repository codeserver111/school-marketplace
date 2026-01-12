# Backend Development Guide - Skool.ai Marketplace

## 1. Platform Overview
Skool.ai Marketplace is a premium school discovery and admission platform. It allows parents to search for schools, view detailed profiles, use AI-powered matchmaking to find the best fit for their child, and manage the admission application process.

The platform relies on a sophisticated backend to handle:
- User Authentication (Parents)
- School Data Management
- AI/OCR Services for Document Processing
- Application Lifecycle Management

---

## 2. Authentication & Security
The platform uses a secure **JWT (JSON Web Token)** based authentication system.

### Auth Flow
1.  **Access Token**: Short-lived (e.g., 15 minutes), used for API authorization. Sent in `Authorization: Bearer <token>` header.
2.  **Refresh Token**: Long-lived (e.g., 7 days), used to obtain new access tokens. **Must be stored in a secure, HTTP-only cookie.**

### Endpoints

#### POST `/api/auth/signup`
Creates a new user account.
- **Request Body**:
  ```json
  {
    "name": "Rahul Sharma",
    "phone": "+919876543210",
    "email": "rahul@example.com",
    "password": "securepassword123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "user": {
      "id": "u_123",
      "name": "Rahul Sharma",
      "phone": "+919876543210",
      "email": "rahul@example.com",
      "role": "parent"
    },
    "accessToken": "ey..." // JWT
  }
  ```
- **Cookie**: Set `refresh_token` as HTTPOnly cookie.

#### POST `/api/auth/login`
Authenticates a user.
- **Request Body**:
  ```json
  {
    "phone": "+919876543210",
    "password": "securepassword123"
  }
  ```
- **Response** (200 OK): Same as Signup.

#### POST `/api/auth/refresh`
Refreshes the access token using the HTTPOnly cookie.
- **Request**: No body, requires valid `refresh_token` cookie.
- **Response** (200 OK):
  ```json
  {
    "accessToken": "ey...new_token"
  }
  ```

#### POST `/api/auth/logout`
Invalidates the refresh token.
- **Response** (200 OK): Clears the `refresh_token` cookie.

#### POST `/api/auth/forgot-password`
Initiates password recovery.
- **Request Body**:
  ```json
  { "phone": "+919876543210" }
  ```
- **Response** (200 OK): Message indicating OTP/Link sent.

---

## 3. Core API Routes

### A. Admissions & AI

#### POST `/api/admission/ocr`
Extracts data from uploaded documents.
- **Headers**: `Content-Type: multipart/form-data`
- **Body**:
  - `file`: (Binary) The document image/PDF.
  - `documentType`: String (`birth_certificate`, `marksheet`, etc.)
- **Response**:
  ```json
  {
    "extractedData": {
      "childName": "Aarav Sharma",
      "dateOfBirth": "2018-05-15",
      "grades": { "math": "95" } // properties vary by documentType
    }
  }
  ```

#### POST `/api/admission/match`
Calculates match scores for schools based on child profile.
- **Request Body**:
  ```json
  {
    "childProfile": {
      "age": 6,
      "location": { "lat": 28.1, "lng": 77.2 },
      "budget": { "min": 50000, "max": 150000 },
      "board": "CBSE",
      "academicLevel": "Above Average"
    }
  }
  ```
- **Response**:
  ```json
  {
    "matches": [
      {
        "schoolId": "s_101",
        "score": 85, // 0-100
        "chance": "High",
        "factors": [
          { "name": "Distance", "status": "positive", "detail": "1.2 km away" }
        ]
      }
    ]
  }
  ```

#### POST `/api/admission/validate-doc`
Validates extracted document data against the user's profile claims.
- **Request Body**:
  ```json
  {
    "documentType": "birth_certificate",
    "extractedData": { "dateOfBirth": "2018-05-15" },
    "profileData": { "dateOfBirth": "2018-05-15" }
  }
  ```
- **Response**:
  ```json
  {
    "isValid": true,
    "mismatches": [] // List of strings if valid is false
  }
  ```

### B. Applications

#### POST `/api/applications`
Submits or saves a new application draft.
- **Request Body**:
  ```json
  {
    "schoolId": "s_101",
    "status": "draft", // or "submitted"
    "childData": { ... },
    "documents": [ ... ]
  }
  ```
- **Response**:
  ```json
  {
    "id": "app_555",
    "status": "draft",
    "timeline": [
      { "title": "Application Started", "status": "completed", "date": "..." }
    ]
  }
  ```

#### GET `/api/applications`
Retrieves all applications for the logged-in user (Applied Schools).
- **Response** (200 OK):
  ```json
  {
    "applications": [
      {
        "id": "app_555",
        "status": "under_review",
        "submittedAt": "2023-11-15T10:00:00Z",
        "school": {
          "id": "s_101",
          "name": "Delhi Public School",
          "address": "Sector 12, RK Puram",
          "image": "https://images.unsplash.com...",
          "board": "CBSE"
        },
        "timeline": [
          { "title": "Application Started", "status": "completed", "date": "..." },
          { "title": "School Review", "status": "current", "date": "..." }
        ]
      }
    ]
  }
  ```

### C. Schools

#### GET `/api/schools`
Fetched list of schools with filtering options.
- **Query Params**: `?city=delhi&board=CBSE&budget_max=200000`

#### GET `/api/schools/:id`
Get full details for a specific school.

---

## 4. Integration Guidelines
- **Base URL**: `/api/v1` (suggested)
- **Error Handling**: All 4xx and 5xx responses must follow this format:
  ```json
  {
    "error": "ErrorType",
    "message": "Human readable error message",
    "details": {} // Optional validation errors
  }
  ```
- **Date Format**: ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`) for all timestamps.
