function fmt(dateStr) {
  if (!dateStr) return "";
  const [y, m] = dateStr.split("-");
  return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const breakWord = { wordBreak: "break-word", overflowWrap: "break-word" };
const gold = "#8B7355";
const divider = { borderBottom: "1px solid #d4c5a9", marginBottom: "12px", paddingBottom: "4px" };

export default function ExecutiveTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1a1a1a", fontSize: "12px", fontFamily: "'Georgia', serif", padding: "40px 48px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "4px", textTransform: "uppercase", color: "#1a1a1a", marginBottom: "6px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ borderTop: "2px solid #1a1a1a", borderBottom: "2px solid #1a1a1a", padding: "6px 0", margin: "8px auto", display: "inline-block", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", fontSize: "11px", color: "#4b5563" }}>
            {personalInfo.email && <span style={breakWord}>{personalInfo.email}</span>}
            {personalInfo.phone && <span>| {personalInfo.phone}</span>}
            {personalInfo.location && <span>| {personalInfo.location}</span>}
            {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#e2a800", textDecoration: "underline", ...breakWord }}>🔗 {personalInfo.linkedin}</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" style={{ color: "#e2a800", textDecoration: "underline", ...breakWord }}>💻 {personalInfo.portfolio}</a>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
            Profile Summary
          </h2>
          <p style={{ color: "#374151", lineHeight: "1.8", fontSize: "12px", ...breakWord }}>
            {personalInfo.summary}
          </p>
        </section>
      )}
      
       {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <p style={{ fontWeight: "bold", fontSize: "12px", ...breakWord }}>{edu.degree}{edu.field && `, ${edu.field}`}</p>
                <p style={{ fontSize: "11px", color: "#4b5563", ...breakWord }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: "11px", color: "#6b7280" }}>GPA: {edu.gpa}</p>}
              </div>
              <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>
                {fmt(edu.startDate)} – {fmt(edu.endDate)}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Skills — Two Column */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section style={{ marginBottom: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {skills.technical.length > 0 && (
              <div>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
                  Technical Skills
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                  {skills.technical.map((s, i) => (
                    <span key={i} style={{ fontSize: "11px", color: "#374151", ...breakWord }}>• {s}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
                  Soft Skills
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                  {skills.soft.map((s, i) => (
                    <span key={i} style={{ fontSize: "11px", color: "#374151", ...breakWord }}>• {s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
            Work Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>{exp.role}</p>
                <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>
                  {fmt(exp.startDate)} – {exp.current ? "Present" : fmt(exp.endDate)}
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "#4b5563", marginBottom: "4px", ...breakWord }}>{exp.company}</p>
              {exp.description && (
                <p style={{ fontSize: "11px", color: "#374151", whiteSpace: "pre-line", ...breakWord }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
            Projects
          </h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p style={{ fontWeight: "bold", fontSize: "12px", ...breakWord }}>{p.title}
                {p.techStack && <span style={{ fontWeight: "normal", color: "#6b7280", fontSize: "11px" }}> — {p.techStack}</span>}
              </p>
              {p.description && <p style={{ fontSize: "11px", color: "#374151", ...breakWord }}>{p.description}</p>}
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "10px", color: "#4338ca", textDecoration: "underline", ...breakWord }}>{p.link}</a>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", color: gold, ...divider }}>
            Certifications
          </h2>
          {certifications.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <div>
                <span style={{ fontWeight: "600", fontSize: "12px", ...breakWord }}>{c.name}</span>
                {c.issuer && <span style={{ color: "#6b7280", fontSize: "11px", marginLeft: "8px" }}>— {c.issuer}</span>}
                {c.url && <a href={c.url} target="_blank" rel="noreferrer" style={{ display: "block", fontSize: "10px", color: "#4338ca", textDecoration: "underline", ...breakWord }}>{c.url}</a>}
              </div>
              {c.date && <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>{fmt(c.date)}</span>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}