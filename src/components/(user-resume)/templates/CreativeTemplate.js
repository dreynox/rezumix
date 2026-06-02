function fmt(dateStr) {
  if (!dateStr) return "";
  const [y, m] = dateStr.split("-");
  return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const breakWord = { wordBreak: "break-word", overflowWrap: "break-word" };

export default function CreativeTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1a1a1a", fontSize: "12px", fontFamily: "'Helvetica Neue', Arial, sans-serif", display: "flex", minHeight: "100%" }}>

      {/* LEFT SIDEBAR */}
      <div style={{ width: "38%", backgroundColor: "#2d3748", color: "#ffffff", padding: "36px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Name */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", marginBottom: "4px", ...breakWord }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
        </div>

        {/* Contact */}
        <div>
          <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", letterSpacing: "1px", marginBottom: "12px", textTransform: "uppercase" }}>
            Contact
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {personalInfo.phone && (
              <div>
                <p style={{ fontSize: "10px", color: "#a0aec0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Phone</p>
                <p style={{ fontSize: "12px", color: "#e2e8f0" }}>{personalInfo.phone}</p>
              </div>
            )}
            {personalInfo.email && (
              <div>
                <p style={{ fontSize: "10px", color: "#a0aec0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Email</p>
                <p style={{ fontSize: "12px", color: "#e2e8f0", ...breakWord }}>{personalInfo.email}</p>
              </div>
            )}
            {personalInfo.location && (
              <div>
                <p style={{ fontSize: "10px", color: "#a0aec0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Address</p>
                <p style={{ fontSize: "12px", color: "#e2e8f0", ...breakWord }}>{personalInfo.location}</p>
              </div>
            )}
            {personalInfo.linkedin && (
              <div>
                <p style={{ fontSize: "10px", color: "#a0aec0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>LinkedIn</p>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#90cdf4", textDecoration: "underline", ...breakWord }}>{personalInfo.linkedin}</a>
              </div>
            )}
            {personalInfo.portfolio && (
              <div>
                <p style={{ fontSize: "10px", color: "#a0aec0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Portfolio</p>
                <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#90cdf4", textDecoration: "underline", ...breakWord }}>{personalInfo.portfolio}</a>
              </div>
           )}
         </div>
        </div>

     
        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", letterSpacing: "1px", marginBottom: "12px", textTransform: "uppercase" }}>
              Skills 
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[...skills.technical, ...skills.soft].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#a0aec0", fontSize: "14px" }}>•</span>
                  <span style={{ fontSize: "12px", color: "#e2e8f0", ...breakWord }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1, padding: "36px 28px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <p style={{ color: "#4a5568", fontSize: "12px", lineHeight: "1.8", ...breakWord }}>
              {personalInfo.summary}
            </p>
          </div>
        )}
           {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#2d3748", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px" }}>
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <p style={{ fontSize: "10px", color: "#a0aec0" }}>{fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ""}</p>
                <p style={{ fontWeight: "700", fontSize: "12px", color: "#ffffff", ...breakWord }}>{edu.degree}</p>
                {edu.field && <p style={{ fontSize: "11px", color: "#e2e8f0", ...breakWord }}>{edu.field}</p>}
                <p style={{ fontSize: "11px", color: "#a0aec0", ...breakWord }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: "10px", color: "#718096" }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#2d3748", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px" }}>
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "18px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px" }}>
                {/* Timeline dot */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2d3748", flexShrink: 0 }} />
                  {i < experience.length - 1 && (
                    <div style={{ width: "1px", flex: 1, backgroundColor: "#e2e8f0", marginTop: "4px" }} />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#718096", marginBottom: "2px" }}>
                    {fmt(exp.startDate)} – {exp.current ? "Present" : fmt(exp.endDate)}
                  </p>
                  <p style={{ fontSize: "11px", color: "#718096", marginBottom: "2px", ...breakWord }}>{exp.company}</p>
                  <p style={{ fontWeight: "700", fontSize: "13px", color: "#2d3748", marginBottom: "4px" }}>{exp.role}</p>
                  {exp.description && (
                    <p style={{ fontSize: "11px", color: "#4a5568", lineHeight: "1.7", whiteSpace: "pre-line", ...breakWord }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#2d3748", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px" }}>
              Projects
            </h2>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "14px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2d3748", flexShrink: 0 }} />
                  {i < projects.length - 1 && (
                    <div style={{ width: "1px", flex: 1, backgroundColor: "#e2e8f0", marginTop: "4px" }} />
                  )}
                </div>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "13px", color: "#2d3748", ...breakWord }}>{p.title}</p>
                  {p.techStack && <p style={{ fontSize: "11px", color: "#718096" }}>{p.techStack}</p>}
                  {p.description && <p style={{ fontSize: "11px", color: "#4a5568", lineHeight: "1.7", ...breakWord }}>{p.description}</p>}
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "10px", color: "#4338ca", textDecoration: "underline", ...breakWord }}>{p.link}</a>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#2d3748", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px" }}>
              Certifications
            </h2>
            {certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: "12px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2d3748", flexShrink: 0 }} />
                  {i < certifications.length - 1 && (
                    <div style={{ width: "1px", flex: 1, backgroundColor: "#e2e8f0", marginTop: "4px" }} />
                  )}
                </div>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "13px", color: "#2d3748", ...breakWord }}>{c.name}</p>
                  {c.issuer && <p style={{ fontSize: "11px", color: "#718096" }}>{c.issuer}</p>}
                  {c.date && <p style={{ fontSize: "11px", color: "#718096" }}>{fmt(c.date)}</p>}
                  {c.url && <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: "10px", color: "#4338ca", textDecoration: "underline", ...breakWord }}>{c.url}</a>}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}