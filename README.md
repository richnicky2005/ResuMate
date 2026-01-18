# ResuMate

ResuMate is a resume-to-job-matching platform that helps candidates discover roles that align with their skills. It parses a user's resume, extracts key skills via the Gemini API, and compares them against job postings scraped from Simplify's GitHub job board. Users can optionally filter by location and job title, then receive a ranked list of roles by match percentage.

## High-level workflow

1. **Resume ingestion**: Upload a resume, parse it, and normalize the content.
2. **Skill extraction**: Use the Gemini API to identify the candidate's key skills.
3. **Job discovery**: Scrape job postings from Simplify's GitHub repository.
4. **Filtering**: Apply optional filters for job title and location.
5. **Matching & ranking**: Compare job-posting skills to resume skills and rank by match percentage.

## Example user flow

1. Upload your resume.
2. (Optional) Enter a job title and location.
3. View a ranked list of job matches with match percentages.

## Planned components

- **Frontend**: Resume upload, filters, and ranked results UI.
- **Backend**: Resume parsing, skill extraction, job scraping, and scoring.
- **Integrations**: Gemini API for skill extraction; Simplify GitHub postings for jobs data.
