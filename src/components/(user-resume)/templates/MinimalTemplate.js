function fmt(dateStr) {
  if (!dateStr) return "";
  const [y, m] = dateStr.split("-");
  return new Date(y, m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function MinimalTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-800 px-10 py-9 text-[13px]"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* Header */}
      <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-0.5">
        {personalInfo.fullName || "Your Name"}
      </h1>
      <div className="flex flex-wrap gap-x-3 text-xs text-gray-400 mb-6">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 underline break-words">{personalInfo.linkedin}</a>}
        {personalInfo.portfolio && <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-blue-500 underline break-words">{personalInfo.portfolio}</a>}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <p className="text-sm text-gray-600 mb-6 leading-relaxed border-l-2 border-gray-200 pl-3 break-words">
          {personalInfo.summary}
        </p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3 grid grid-cols-[1fr_auto] gap-x-4">
              <div>
                <p className="font-semibold text-gray-900">{exp.role}</p>
                <p className="text-xs text-gray-500">{exp.company}</p>
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 whitespace-pre-line break-words">
                    {exp.description}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-400 whitespace-nowrap pt-0.5">
                {fmt(exp.startDate)} – {exp.current ? "Now" : fmt(exp.endDate)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto] gap-x-4 mb-2">
              <div>
                <p className="font-semibold text-gray-900">
                  {edu.degree}{edu.field && ` · ${edu.field}`}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.institution}{edu.gpa && ` · GPA ${edu.gpa}`}
                </p>
              </div>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {fmt(edu.startDate)} – {fmt(edu.endDate)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {[...skills.technical, ...skills.soft].map((s, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">
            Projects
          </h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-gray-900">
                {p.title}{" "}
                {p.techStack && (
                  <span className="font-normal text-xs text-gray-400">
                    — {p.techStack}
                  </span>
                )}
              </p>
              {p.description && (
                <p className="text-xs text-gray-600 break-words">{p.description}</p>
              )}
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer"
                  className="text-xs text-blue-500 underline">
                  {p.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3">
            Certifications
          </h2>
          {certifications.map((c, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{c.name}</span>
                  {c.issuer && (
                    <span className="text-gray-400 text-xs ml-2">— {c.issuer}</span>
                  )}
                </div>
                {c.date && (
                  <span className="text-gray-400 text-xs">{fmt(c.date)}</span>
                )}
              </div>
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer"
                  className="text-xs text-blue-500 underline">
                  {c.url}
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}