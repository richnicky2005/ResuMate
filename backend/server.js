import express from "express";
import cors from "cors";
import { jobs, skillKeywords } from "./jobs.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const normalize = (value = "") => value.toLowerCase().trim();

const extractSkills = (resumeText = "") => {
  const normalized = normalize(resumeText);
  return skillKeywords.filter((skill) => normalized.includes(skill));
};

const scoreJob = (job, resumeSkills) => {
  const matched = job.skills.filter((skill) => resumeSkills.includes(skill));
  const score = job.skills.length
    ? Math.round((matched.length / job.skills.length) * 100)
    : 0;
  return {
    ...job,
    matchPercentage: score,
    matchedSkills: matched
  };
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/match", (req, res) => {
  const { resumeText, title, location } = req.body || {};
  if (!resumeText) {
    return res.status(400).json({ error: "Resume text is required." });
  }

  const resumeSkills = extractSkills(resumeText);
  const titleFilter = normalize(title);
  const locationFilter = normalize(location);

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = titleFilter
      ? normalize(job.title).includes(titleFilter)
      : true;
    const matchesLocation = locationFilter
      ? normalize(job.location).includes(locationFilter)
      : true;
    return matchesTitle && matchesLocation;
  });

  const rankedJobs = filteredJobs
    .map((job) => scoreJob(job, resumeSkills))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  res.json({
    resumeSkills,
    results: rankedJobs
  });
});

app.listen(PORT, () => {
  console.log(`ResuMate backend running on port ${PORT}`);
});
