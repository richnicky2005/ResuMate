import { useState } from "react";

const initialResume = `Frontend engineer with React, JavaScript, CSS, and accessibility expertise.
Built Node and Express APIs, deployed on AWS, and tested with Jest.
`;

const MatchResult = ({ result }) => (
  <article className="result-card">
    <header>
      <div>
        <h3>{result.title}</h3>
        <p className="muted">
          {result.company} · {result.location}
        </p>
      </div>
      <span className="badge">{result.matchPercentage}% match</span>
    </header>
    <div className="skills">
      <span>Matched skills:</span>
      <ul>
        {result.matchedSkills.length ? (
          result.matchedSkills.map((skill) => <li key={skill}>{skill}</li>)
        ) : (
          <li className="muted">No overlaps yet.</li>
        )}
      </ul>
    </div>
  </article>
);

const App = () => {
  const [resumeText, setResumeText] = useState(initialResume);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [resumeSkills, setResumeSkills] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resumeText, title, location })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to score matches.");
      }

      const data = await response.json();
      setResults(data.results || []);
      setResumeSkills(data.resumeSkills || []);
      setStatus("success");
    } catch (fetchError) {
      setStatus("error");
      setError(fetchError.message);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">ResuMate</p>
          <h1>Match your resume to the right roles in seconds.</h1>
          <p className="subhead">
            Upload or paste your resume, apply optional filters, and see a
            ranked list of job matches with skill overlaps.
          </p>
        </div>
        <div className="hero-card">
          <h2>How it works</h2>
          <ol>
            <li>Paste your resume text.</li>
            <li>Optionally filter by title or location.</li>
            <li>Review the match results.</li>
          </ol>
        </div>
      </header>

      <main>
        <form className="panel" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="resume">Resume text</label>
            <textarea
              id="resume"
              rows={8}
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste your resume here"
              required
            />
          </div>

          <div className="grid">
            <div className="field">
              <label htmlFor="title">Target job title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Frontend Engineer"
              />
            </div>
            <div className="field">
              <label htmlFor="location">Preferred location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Remote, Austin, NY"
              />
            </div>
          </div>

          <button className="primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Matching..." : "Find matches"}
          </button>
          {error ? <p className="error">{error}</p> : null}
        </form>

        <section className="panel">
          <div className="panel-header">
            <h2>Match results</h2>
            <p className="muted">
              {resumeSkills.length
                ? `Detected skills: ${resumeSkills.join(", ")}`
                : "Submit your resume to see detected skills."}
            </p>
          </div>

          <div className="results">
            {status === "success" && results.length === 0 ? (
              <p className="muted">No matches found. Adjust your filters.</p>
            ) : null}
            {results.map((result) => (
              <MatchResult key={result.id} result={result} />
            ))}
            {status === "idle" ? (
              <p className="muted">Your ranked matches will appear here.</p>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
