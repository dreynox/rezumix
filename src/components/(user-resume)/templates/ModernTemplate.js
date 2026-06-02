function fmt(dateStr) {
  if (!dateStr) return "";
  const [y, m] = dateStr.split("-");
  return new Date(y, m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ModernTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#111827", fontSize: "13px", lineHeight: "1.6", fontFamily: "Georgia, serif" }}>
      
      {/* Header */}
      <div style={{ backgroundColor: "#1e1b4b", color: "#ffffff", padding: "28px 32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", color: "#c7d2fe", fontSize: "12px" }}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#c7d2fe", textDecoration: "underline" }}>🔗 {personalInfo.linkedin}</a>}
          {personalInfo.portfolio && <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" style={{ color: "#c7d2fe", textDecoration: "underline" }}>💻 {personalInfo.portfolio}</a>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#1e1b4b", borderBottom: "1px solid #c7d2fe", paddingBottom: "4px", marginBottom: "8px" }}>
              Summary
            </h2>
            <p style={{ color: "#374151", fontSize: "13px", wordBreak: "break-word", overflowWrap: "break-word" }}>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#1e1b4b", borderBottom: "1px solid #c7d2fe", paddingBottom: "4px", marginBottom: "12px" }}>
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "5px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: "bold", color: "#111827" }}>{exp.role}</p>
                    <p style={{ color: "#4338ca", fontSize: "12px", fontWeight: "500" }}>{exp.company}</p>
                  </div>
                  <p style={{ color: "#9ca3af", fontSize: "12px", whiteSpace: "nowrap" }}>
                    {fmt(exp.startDate)} — {exp.current ? "Present" : fmt(exp.endDate)}
                  </p>
                </div>
                {exp.description && (
                  <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "6px", whiteSpace: "pre-line", wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#1e1b4b", borderBottom: "1px solid #c7d2fe", paddingBottom: "4px", marginBottom: "12px" }}>
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                <div>
                  <p style={{ fontWeight: "bold", color: "#111827" }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p style={{ color: "#4338ca", fontSize: "12px" }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ color: "#9ca3af", fontSize: "12px" }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ color: "#9ca3af", fontSize: "12px", whiteSpace: "nowrap" }}>
                  {fmt(edu.startDate)} — {fmt(edu.endDate)}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#1e1b4b", borderBottom: "1px solid #c7d2fe", paddingBottom: "4px", marginBottom: "12px" }}>
              Skills
            </h2>
            {skills.technical.length > 0 && (
              <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                <strong>Technical:</strong> {skills.technical.join(" · ")}
              </p>
            )}
            {skills.soft.length > 0 && (
              <p style={{ fontSize: "12px" }}>
                <strong>Soft Skills:</strong> {skills.soft.join(" · ")}
              </p>
            )}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#1e1b4b", borderBottom: "1px solid #c7d2fe", paddingBottom: "4px", marginBottom: "12px" }}>
              Projects
            </h2>
           {projects.map((p, i) => (
           <div key={i} style={{ marginBottom: "3px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <p style={{ fontWeight: "bold", color: "#111827" }}>{p.title}</p>
             {p.link && (
             <a href={p.link} target="_blank" rel="noreferrer"
             style={{ color: "#4338ca", fontSize: "11px", textDecoration: "underline" }}>
             {p.link}
             </a>
             )}
           </div>
           {p.techStack && <p style={{ color: "#4338ca", fontSize: "12px" }}>{p.techStack}</p>}
           {p.description && <p style={{ color: "#4b5563", fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word" }}>{p.description}</p>}
          </div>
))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#1e1b4b", borderBottom: "1px solid #c7d2fe", paddingBottom: "4px", marginBottom: "12px" }}>
              Certifications
            </h2>
           {certifications.map((c, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontWeight: "600", color: "#111827" }}>{c.name}</span>
                 {c.issuer && <span style={{ color: "#6b7280", fontSize: "12px", marginLeft: "8px", wordBreak: "break-word", overflowWrap: "break-word"}}>— {c.issuer}</span>}
              </div>
                {c.date && <span style={{ color: "#9ca3af", fontSize: "12px" }}>{fmt(c.date)}</span>}
            </div>
              {c.url && (
              <a href={c.url} target="_blank" rel="noreferrer"
              style={{ color: "#4338ca", fontSize: "11px", textDecoration: "underline" }}>
              {c.url}
              </a>
            )}
          </div>
))}
          </section>
        )}
      </div>
    </div>
  );
}