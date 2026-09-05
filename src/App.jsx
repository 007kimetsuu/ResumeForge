import { useEffect, useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import "./App.css";

const emptyResume = {
  name: "",
  email: "",
  phoneNumber: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",

  college: "",
  collegeLocation: "",
  degree: "",
  cgpa: "",
  educationStartYear: "",
  graduationYear: "",

  skills: [],
  experiences: [],
  projects: [],
  activities: [],
  certifications: [],

  skillCategories: {
    languages: "",
    frameworks: "",
    tools: "",
    databases: "",
    spokenLanguages: "",
  },
};

function normalizeResume(savedData) {
  return {
    ...emptyResume,
    ...savedData,

    skills: savedData.skills || [],
    experiences: savedData.experiences || [],
    projects: savedData.projects || [],
    activities: savedData.activities || [],
    certifications:
      savedData.certifications || [],

    skillCategories: {
      ...emptyResume.skillCategories,
      ...(savedData.skillCategories || {}),
    },
  };
}

function App() {
  const [resumeData, setResumeData] =
    useState(() => {
      const savedResume =
        localStorage.getItem("resumeData");

      if (savedResume) {
        try {
          return normalizeResume(
            JSON.parse(savedResume)
          );
        } catch {
          return emptyResume;
        }
      }

      return emptyResume;
    });

  // Stores what item is currently being edited
  // Example:
  // { type: "project", id: 12345 }
  const [
    editingItem,
    setEditingItem,
  ] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "resumeData",
      JSON.stringify(resumeData)
    );
  }, [resumeData]);

  const updateField = (
    field,
    value
  ) => {
    setResumeData(
      (previousData) => ({
        ...previousData,
        [field]: value,
      })
    );
  };

  const clearResume = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to clear the entire resume?"
      );

    if (!confirmed) return;

    setResumeData({
      ...emptyResume,

      skillCategories: {
        ...emptyResume.skillCategories,
      },
    });

    setEditingItem(null);

    localStorage.removeItem(
      "resumeData"
    );
  };

  return (
    <div className="app">
      <header className="app-header no-print">
        <div>
          <p className="eyebrow">
            RESUMEFORGE
          </p>

          <h1>
            Build your resume
          </h1>

          <p className="header-description">
            Create a clean,
            professional and
            ATS-friendly resume.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="secondary-button"
            onClick={clearResume}
          >
            Clear
          </button>

          <button
            className="primary-button"
            onClick={() =>
              window.print()
            }
          >
            Download PDF
          </button>
        </div>
      </header>

      <main className="builder-layout">
        <section className="form-panel no-print">
          <ResumeForm
            resumeData={
              resumeData
            }
            updateField={
              updateField
            }
            editingItem={
              editingItem
            }
            setEditingItem={
              setEditingItem
            }
          />
        </section>

        <section className="preview-panel">
          <div className="preview-label no-print">
            LIVE PREVIEW
          </div>

          <ResumePreview
            resumeData={
              resumeData
            }
            updateField={
              updateField
            }
            setEditingItem={
              setEditingItem
            }
          />
        </section>
      </main>
    </div>
  );
}

export default App;