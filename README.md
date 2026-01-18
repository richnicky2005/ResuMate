# ResuMate

ResuMate is a resume-to-job-matching platform that helps candidates discover roles that align with their skills. It parses a user's resume, extracts key skills, and compares them against job postings. Users can optionally filter by location and job title, then receive a ranked list of roles by match percentage.

## High-level workflow

1. **Resume ingestion**: Upload a resume, parse it, and normalize the content.
2. **Skill extraction**: Identify the candidate's key skills.
3. **Job discovery**: Load curated job postings.
4. **Filtering**: Apply optional filters for job title and location.
5. **Matching & ranking**: Compare job-posting skills to resume skills and rank by match percentage.

## Example user flow

1. Upload your resume.
2. (Optional) Enter a job title and location.
3. View a ranked list of job matches with match percentages.

## Project structure

- **backend**: Express API for matching.
- **frontend**: React UI for resume upload and results.

## Running locally

### Backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` and will connect to the backend at `http://localhost:3001`.
