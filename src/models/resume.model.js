import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    // Existing fields
    resumeUrl: {
      type: String,
      default: "",
    },

    resumeText: {
      type: String,
      default: "",
    },

    userEmail: {
      type: String,
      required: true,
    },

    // New fields for live editable resume data
    title: {
      type: String,
      default: "Untitled Resume",
    },

    template: {
      type: String,
      default: "modern",
    },

    personalInfo: {
      type: Object,
      default: {},
    },

    education: {
      type: Array,
      default: [],
    },

    experience: {
      type: Array,
      default: [],
    },

    projects: {
      type: Array,
      default: [],
    },

    skills: {
      type: Array,
      default: [],
    },

    certifications: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resume ||
  mongoose.model("Resume", resumeSchema);