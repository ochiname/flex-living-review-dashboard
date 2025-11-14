# Flex Living Reviews Dashboard

## Overview
This project is a **Reviews Dashboard** for Flex Living, designed to help property managers assess performance based on guest reviews. The platform includes:

- Mock integration with Hostaway reviews
- Manager dashboard with filtering and sorting
- Public property page displaying approved reviews
- Exploration of Google Reviews integration

---

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (for production-ready persistence; mock data used for assessment)
- **Real-time:** N/A
- **Authentication:** JWT (for role-based access, if extended)
- **API Documentation:** Swagger
- **Frontend:** Vanilla JavaScript, HTML, CSS, Chart.js
- **Environment Variables:** `.env` for API keys and configuration

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/api/review/hostaway` | Get mock Hostaway reviews |
| GET    | `/api/review/unapproved` | Get all unapproved reviews |
| GET    | `/api/review/approved` | Get all approved reviews |
| POST   | `/api/review/approve/{id}` | Approve a review |
| POST   | `/api/review/reject/{id}` | Reject a review |
| GET    | `/api/review/by-listing` | Get reviews grouped by listing |
| GET    | `/api/review/by-type` | Get reviews grouped by type (host-to-guest / guest-to-host) |
| GET    | `/api/review/by-channel` | Get reviews grouped by channel |
| GET    | `/api/review/by-date` | Get reviews grouped by date (YYYY-MM-DD) |
| GET    | `/api/review/google` | Fetch Google Place data for all approved properties |

---

## Features

- **Manager Dashboard**
  - View per-property performance
  - Filter by rating, category, channel, date
  - Approve or reject reviews to control public display
  - Visual charts to spot trends and recurring issues

- **Public Property Page**
  - Shows approved reviews only
  - Displays property information including type, rating, and submission date
  - Integrates (placeholder) Google Reviews per property

---

## Google Reviews Integration Exploration

### Objective
The goal was to explore fetching Google Reviews for **approved properties** using the **Google Places API** and display them on the property page.

### Findings and Limitations

1. **Billing Account Requirement**  
   - Google Places API requires a billing account to return live review data. Without it, API calls do not return results.

2. **Property Identification**  
   - Reviews are fetched based on business/building name, not internal listing names.

3. **Frontend Placeholder Handling**  
   - Without live data, the frontend displays:
     > “No Google reviews yet.”

4. **Backend Integration**  
   - Successfully implemented backend and frontend integration using mock data.
   - Once billing is enabled and correct Place IDs are used, reviews will fetch automatically.

### Conclusion
- Current system provides a functional framework for Google Reviews.
- Live review data fetching requires:
  - Active Google billing account
  - Correct Place IDs or business names
- Mock data can simulate Google reviews for now.

---

## Environment Variables (`.env`)

```env
PORT=5000
GOOGLE_PLACES_API_KEY=your_google_api_key
GOOGLE_PLACES_BASE_URL=https://maps.googleapis.com/maps/api/place/textsearch/json


## Running Locally

* Clone the repository

git clone https://github.com/yourusername/flex-living-dashboard.git
cd flex-living-dashboard


Install dependencies

npm install


Create .env file

Add the required environment variables (see above)

Run the server

npm run dev


The backend will start on http://localhost:5000

API documentation (Swagger) is available at http://localhost:5000/api-docs/

Open the frontend

Open index.html (or dashboard.html) in your browser

The frontend fetches data from the running backend