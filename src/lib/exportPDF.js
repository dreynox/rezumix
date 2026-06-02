// ─── PDF Export ───────────────────────────────────────────────────────────────
export async function exportToPDF(elementId, filename = "resume") {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[exportPDF] Element #${elementId} not found`);
    return;
  }

  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const clone = element.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "794px";
    clone.style.backgroundColor = "#ffffff";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
      onclone: (doc) => {
        const allElements = doc.querySelectorAll("*");
        allElements.forEach((el) => {
          try {
            const computed = window.getComputedStyle(el);
            const bg = computed.backgroundColor;
            const color = computed.color;
            const border = computed.borderColor;
            if (bg && (bg.includes("lab") || bg.includes("oklch") || bg.includes("color("))) {
              el.style.backgroundColor = "#ffffff";
            }
            if (color && (color.includes("lab") || color.includes("oklch") || color.includes("color("))) {
              el.style.color = "#111827";
            }
            if (border && (border.includes("lab") || border.includes("oklch") || border.includes("color("))) {
              el.style.borderColor = "#e5e7eb";
            }
          } catch (e) {}
        });
      },
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
   const imgHeight = (canvas.height * pageWidth) / canvas.width;

const pdf2 = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: [pageWidth, imgHeight], // custom size = exact content height
});

pdf2.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight);
pdf2.save(`${filename.replace(/\s+/g, "_")}.pdf`);
return; // skip the old pdf.save below
  } catch (err) {
    console.error("[exportPDF] Export failed:", err);
  }
}

// JSON Export 
export function exportToJSON(resumeData, filename = "resume") {
  const json = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.download = `${filename.replace(/\s+/g, "_")}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

// TXT Export
export function exportToTXT(resumeData, filename = "resume") {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;
  let txt = "";

  txt += `${personalInfo.fullName || "Your Name"}\n`;
  txt += `${[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" | ")}\n`;
  if (personalInfo.linkedin) txt += `${personalInfo.linkedin}\n`;
  if (personalInfo.portfolio) txt += `${personalInfo.portfolio}\n`;
  txt += "\n";

  if (personalInfo.summary) {
    txt += `SUMMARY\n${"─".repeat(40)}\n${personalInfo.summary}\n\n`;
  }

  if (experience.length > 0) {
    txt += `EXPERIENCE\n${"─".repeat(40)}\n`;
    experience.forEach((exp) => {
      txt += `${exp.role} | ${exp.company}\n`;
      txt += `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}\n`;
      if (exp.description) txt += `${exp.description}\n`;
      txt += "\n";
    });
  }

  if (education.length > 0) {
    txt += `EDUCATION\n${"─".repeat(40)}\n`;
    education.forEach((edu) => {
      txt += `${edu.degree}${edu.field ? ` in ${edu.field}` : ""} | ${edu.institution}\n`;
      if (edu.gpa) txt += `GPA: ${edu.gpa}\n`;
      txt += "\n";
    });
  }

  if (skills.technical.length > 0 || skills.soft.length > 0) {
    txt += `SKILLS\n${"─".repeat(40)}\n`;
    if (skills.technical.length > 0) txt += `Technical: ${skills.technical.join(", ")}\n`;
    if (skills.soft.length > 0) txt += `Soft Skills: ${skills.soft.join(", ")}\n`;
    txt += "\n";
  }

  if (projects.length > 0) {
    txt += `PROJECTS\n${"─".repeat(40)}\n`;
    projects.forEach((p) => {
      txt += `${p.title}\n`;
      if (p.techStack) txt += `Tech: ${p.techStack}\n`;
      if (p.description) txt += `${p.description}\n`;
      if (p.link) txt += `Link: ${p.link}\n`;
      txt += "\n";
    });
  }

  if (certifications.length > 0) {
    txt += `CERTIFICATIONS\n${"─".repeat(40)}\n`;
    certifications.forEach((c) => {
      txt += `${c.name}${c.issuer ? ` | ${c.issuer}` : ""}\n`;
      if (c.date) txt += `Date: ${c.date}\n`;
      if (c.url) txt += `URL: ${c.url}\n`;
      txt += "\n";
    });
  }

  const blob = new Blob([txt], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = `${filename.replace(/\s+/g, "_")}.txt`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

// DOCX Export
export async function exportToDOCX(resumeData, filename = "resume") {
  const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = await import("docx");
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

  const doc = new Document({
    sections: [{
      children: [
        // Name
        new Paragraph({
          text: personalInfo.fullName || "Your Name",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),

        // Contact
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" | "),
              size: 20,
            }),
          ],
        }),

        new Paragraph({ text: "" }),

        // Summary
        ...(personalInfo.summary ? [
          new Paragraph({ text: "SUMMARY", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: personalInfo.summary }),
          new Paragraph({ text: "" }),
        ] : []),

        // Experience
        ...(experience.length > 0 ? [
          new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_2 }),
          ...experience.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.role, bold: true }),
                new TextRun({ text: ` | ${exp.company}`, color: "4338ca" }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`,
                  color: "6b7280",
                  size: 18,
                }),
              ],
            }),
            ...(exp.description ? [new Paragraph({ text: exp.description })] : []),
            new Paragraph({ text: "" }),
          ]),
        ] : []),

        // Education
        ...(education.length > 0 ? [
          new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2 }),
          ...education.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`, bold: true }),
              ],
            }),
            new Paragraph({ text: edu.institution }),
            ...(edu.gpa ? [new Paragraph({ text: `GPA: ${edu.gpa}` })] : []),
            new Paragraph({ text: "" }),
          ]),
        ] : []),

        // Skills
        ...((skills.technical.length > 0 || skills.soft.length > 0) ? [
          new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2 }),
          ...(skills.technical.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: "Technical: ", bold: true }),
                new TextRun({ text: skills.technical.join(", ") }),
              ],
            }),
          ] : []),
          ...(skills.soft.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: "Soft Skills: ", bold: true }),
                new TextRun({ text: skills.soft.join(", ") }),
              ],
            }),
          ] : []),
          new Paragraph({ text: "" }),
        ] : []),

        // Projects
        ...(projects.length > 0 ? [
          new Paragraph({ text: "PROJECTS", heading: HeadingLevel.HEADING_2 }),
          ...projects.flatMap((p) => [
            new Paragraph({
              children: [
                new TextRun({ text: p.title, bold: true }),
                ...(p.techStack ? [new TextRun({ text: ` (${p.techStack})`, color: "6b7280" })] : []),
              ],
            }),
            ...(p.description ? [new Paragraph({ text: p.description })] : []),
            ...(p.link ? [new Paragraph({ children: [new TextRun({ text: p.link, color: "4338ca" })] })] : []),
            new Paragraph({ text: "" }),
          ]),
        ] : []),

        // Certifications
        ...(certifications.length > 0 ? [
          new Paragraph({ text: "CERTIFICATIONS", heading: HeadingLevel.HEADING_2 }),
          ...certifications.flatMap((c) => [
            new Paragraph({
              children: [
                new TextRun({ text: c.name, bold: true }),
                ...(c.issuer ? [new TextRun({ text: ` — ${c.issuer}`, color: "6b7280" })] : []),
              ],
            }),
            ...(c.date ? [new Paragraph({ text: c.date })] : []),
            ...(c.url ? [new Paragraph({ children: [new TextRun({ text: c.url, color: "4338ca" })] })] : []),
            new Paragraph({ text: "" }),
          ]),
        ] : []),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const link = document.createElement("a");
  link.download = `${filename.replace(/\s+/g, "_")}.docx`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}