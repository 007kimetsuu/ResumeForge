import {
  useEffect,
  useState,
} from "react";

function ResumeForm({
  resumeData,
  updateField,
  editingItem,
  setEditingItem,
}) {
  const {
    name,
    email,
    phoneNumber,
    location,
    linkedin,
    github,
    summary,

    college,
    collegeLocation,
    degree,
    cgpa,
    educationStartYear,
    graduationYear,

    skills,
    experiences,
    projects,
    activities,
    certifications,
    skillCategories,
  } = resumeData;

  // =========================
  // INPUT STATES
  // =========================

  const [skillInput, setSkillInput] =
    useState("");

  // Experience

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [
    experienceDate,
    setExperienceDate,
  ] = useState("");

  const [
    experienceDescription,
    setExperienceDescription,
  ] = useState("");

  // Project

  const [
    projectTitle,
    setProjectTitle,
  ] = useState("");

  const [
    projectTech,
    setProjectTech,
  ] = useState("");

  const [
    projectDate,
    setProjectDate,
  ] = useState("");

  const [
    projectDescription,
    setProjectDescription,
  ] = useState("");

  const [
    projectGithub,
    setProjectGithub,
  ] = useState("");

  // Activity

  const [
    activityTitle,
    setActivityTitle,
  ] = useState("");

  const [
    activityOrganization,
    setActivityOrganization,
  ] = useState("");

  const [
    activityDate,
    setActivityDate,
  ] = useState("");

  const [
    activityDescription,
    setActivityDescription,
  ] = useState("");

  // Certification

  const [
    certificationTitle,
    setCertificationTitle,
  ] = useState("");

  const [
    certificationOrganization,
    setCertificationOrganization,
  ] = useState("");

  const [
    certificationYear,
    setCertificationYear,
  ] = useState("");

  // AI

  const [
    isGenerating,
    setIsGenerating,
  ] = useState(false);

  const [aiError, setAiError] =
    useState("");

  // Validation

  const [
    errors,
    setErrors,
  ] = useState({
    email: "",
    linkedin: "",
    github: "",
    project: "",
    projectGithub: "",
    experience: "",
    activity: "",
    certification: "",
  });

  // =========================
  // VALIDATION HELPERS
  // =========================

  const isValidEmail = (
    value
  ) => {
    if (!value.trim()) {
      return true;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value.trim()
    );
  };

  const isValidUrl = (
    value
  ) => {
    if (!value.trim()) {
      return true;
    }

    try {
      const preparedUrl =
        value.startsWith(
          "http://"
        ) ||
        value.startsWith(
          "https://"
        )
          ? value
          : `https://${value}`;

      const parsedUrl =
        new URL(preparedUrl);

      return (
        parsedUrl.hostname.includes(
          "."
        ) &&
        parsedUrl.hostname.length >
          3
      );
    } catch {
      return false;
    }
  };

  const updateError = (
    field,
    message
  ) => {
    setErrors(
      (previous) => ({
        ...previous,
        [field]: message,
      })
    );
  };

  const validateEmailField =
    () => {
      if (
        email &&
        !isValidEmail(email)
      ) {
        updateError(
          "email",
          "Enter a valid email address."
        );

        return;
      }

      updateError(
        "email",
        ""
      );
    };

  const validateLinkedIn =
    () => {
      if (
        linkedin &&
        !isValidUrl(
          linkedin
        )
      ) {
        updateError(
          "linkedin",
          "Enter a valid LinkedIn URL."
        );

        return;
      }

      updateError(
        "linkedin",
        ""
      );
    };

  const validateGithub =
    () => {
      if (
        github &&
        !isValidUrl(
          github
        )
      ) {
        updateError(
          "github",
          "Enter a valid GitHub URL."
        );

        return;
      }

      updateError(
        "github",
        ""
      );
    };

  // =========================
  // LOAD ITEM FOR EDITING
  // =========================

  useEffect(() => {
    if (!editingItem) {
      return;
    }

    if (
      editingItem.type ===
      "experience"
    ) {
      const item =
        experiences.find(
          (experience) =>
            experience.id ===
            editingItem.id
        );

      if (!item) {
        return;
      }

      setRole(
        item.role || ""
      );

      setCompany(
        item.company || ""
      );

      setExperienceDate(
        item.date || ""
      );

      setExperienceDescription(
        item.description || ""
      );

      updateError(
        "experience",
        ""
      );
    }

    if (
      editingItem.type ===
      "project"
    ) {
      const item =
        projects.find(
          (project) =>
            project.id ===
            editingItem.id
        );

      if (!item) {
        return;
      }

      setProjectTitle(
        item.title || ""
      );

      setProjectTech(
        item.tech || ""
      );

      setProjectDate(
        item.date || ""
      );

      if (
        item.bullets &&
        item.bullets.length > 0
      ) {
        setProjectDescription(
          item.bullets.join(
            "\n"
          )
        );
      } else {
        setProjectDescription(
          item.description || ""
        );
      }

      setProjectGithub(
        item.github || ""
      );

      updateError(
        "project",
        ""
      );

      updateError(
        "projectGithub",
        ""
      );
    }

    if (
      editingItem.type ===
      "activity"
    ) {
      const item =
        activities.find(
          (activity) =>
            activity.id ===
            editingItem.id
        );

      if (!item) {
        return;
      }

      setActivityTitle(
        item.title || ""
      );

      setActivityOrganization(
        item.organization || ""
      );

      setActivityDate(
        item.date || ""
      );

      setActivityDescription(
        item.bullets?.join(
          "\n"
        ) || ""
      );

      updateError(
        "activity",
        ""
      );
    }

    if (
      editingItem.type ===
      "certification"
    ) {
      const item =
        certifications.find(
          (certification) =>
            certification.id ===
            editingItem.id
        );

      if (!item) {
        return;
      }

      setCertificationTitle(
        item.title || ""
      );

      setCertificationOrganization(
        item.organization || ""
      );

      setCertificationYear(
        item.year || ""
      );

      updateError(
        "certification",
        ""
      );
    }
  }, [
    editingItem,
    experiences,
    projects,
    activities,
    certifications,
  ]);

  // =========================
  // RESET HELPERS
  // =========================

  const resetExperience =
    () => {
      setCompany("");
      setRole("");
      setExperienceDate("");
      setExperienceDescription("");

      updateError(
        "experience",
        ""
      );
    };

  const resetProject = () => {
    setProjectTitle("");
    setProjectTech("");
    setProjectDate("");
    setProjectDescription("");
    setProjectGithub("");

    updateError(
      "project",
      ""
    );

    updateError(
      "projectGithub",
      ""
    );
  };

  const resetActivity = () => {
    setActivityTitle("");
    setActivityOrganization("");
    setActivityDate("");
    setActivityDescription("");

    updateError(
      "activity",
      ""
    );
  };

  const resetCertification =
    () => {
      setCertificationTitle(
        ""
      );

      setCertificationOrganization(
        ""
      );

      setCertificationYear(
        ""
      );

      updateError(
        "certification",
        ""
      );
    };

  const cancelEdit = (
    type
  ) => {
    if (
      type === "experience"
    ) {
      resetExperience();
    }

    if (
      type === "project"
    ) {
      resetProject();
    }

    if (
      type === "activity"
    ) {
      resetActivity();
    }

    if (
      type ===
      "certification"
    ) {
      resetCertification();
    }

    setEditingItem(null);
  };

  // =========================
  // SKILLS
  // =========================

  const addSkill = () => {
    const cleanSkill =
      skillInput.trim();

    if (!cleanSkill) {
      return;
    }

    const alreadyExists =
      skills.some(
        (skill) =>
          skill.toLowerCase() ===
          cleanSkill.toLowerCase()
      );

    if (alreadyExists) {
      setSkillInput("");
      return;
    }

    updateField(
      "skills",
      [
        ...skills,
        cleanSkill,
      ]
    );

    setSkillInput("");
  };

  const removeSkill = (
    indexToRemove
  ) => {
    updateField(
      "skills",
      skills.filter(
        (_, index) =>
          index !==
          indexToRemove
      )
    );
  };

  // =========================
  // EXPERIENCE
  // =========================

  const saveExperience =
    () => {
      if (
        !role.trim() ||
        !company.trim()
      ) {
        updateError(
          "experience",
          "Role and company are required."
        );

        return;
      }

      updateError(
        "experience",
        ""
      );

      const data = {
        company:
          company.trim(),

        role:
          role.trim(),

        date:
          experienceDate.trim(),

        description:
          experienceDescription.trim(),
      };

      if (
        editingItem?.type ===
        "experience"
      ) {
        const updated =
          experiences.map(
            (item) =>
              item.id ===
              editingItem.id
                ? {
                    ...item,
                    ...data,
                  }
                : item
          );

        updateField(
          "experiences",
          updated
        );

        setEditingItem(null);
        resetExperience();

        return;
      }

      updateField(
        "experiences",
        [
          ...experiences,
          {
            id: Date.now(),
            ...data,
          },
        ]
      );

      resetExperience();
    };

  // =========================
  // PROJECT
  // =========================

  const saveProject =
    () => {
      if (
        !projectTitle.trim()
      ) {
        updateError(
          "project",
          "Project title is required."
        );

        return;
      }

      updateError(
        "project",
        ""
      );

      if (
        projectGithub &&
        !isValidUrl(
          projectGithub
        )
      ) {
        updateError(
          "projectGithub",
          "Enter a valid project URL."
        );

        return;
      }

      updateError(
        "projectGithub",
        ""
      );

      const bulletPoints =
        projectDescription
          .split("\n")
          .map((line) =>
            line.trim()
          )
          .filter(Boolean);

      const data = {
        title:
          projectTitle.trim(),

        tech:
          projectTech.trim(),

        date:
          projectDate.trim(),

        description:
          projectDescription.trim(),

        bullets:
          bulletPoints,

        github:
          projectGithub.trim(),
      };

      if (
        editingItem?.type ===
        "project"
      ) {
        const updated =
          projects.map(
            (item) =>
              item.id ===
              editingItem.id
                ? {
                    ...item,
                    ...data,
                  }
                : item
          );

        updateField(
          "projects",
          updated
        );

        setEditingItem(null);
        resetProject();

        return;
      }

      updateField(
        "projects",
        [
          ...projects,
          {
            id: Date.now(),
            ...data,
          },
        ]
      );

      resetProject();
    };

  // =========================
  // ACTIVITY
  // =========================

  const saveActivity =
    () => {
      if (
        !activityTitle.trim()
      ) {
        updateError(
          "activity",
          "Position or activity name is required."
        );

        return;
      }

      updateError(
        "activity",
        ""
      );

      const bulletPoints =
        activityDescription
          .split("\n")
          .map((line) =>
            line.trim()
          )
          .filter(Boolean);

      const data = {
        title:
          activityTitle.trim(),

        organization:
          activityOrganization.trim(),

        date:
          activityDate.trim(),

        bullets:
          bulletPoints,
      };

      if (
        editingItem?.type ===
        "activity"
      ) {
        const updated =
          activities.map(
            (item) =>
              item.id ===
              editingItem.id
                ? {
                    ...item,
                    ...data,
                  }
                : item
          );

        updateField(
          "activities",
          updated
        );

        setEditingItem(null);
        resetActivity();

        return;
      }

      updateField(
        "activities",
        [
          ...activities,
          {
            id: Date.now(),
            ...data,
          },
        ]
      );

      resetActivity();
    };

  // =========================
  // CERTIFICATION
  // =========================

  const saveCertification =
    () => {
      if (
        !certificationTitle.trim()
      ) {
        updateError(
          "certification",
          "Certification name is required."
        );

        return;
      }

      updateError(
        "certification",
        ""
      );

      const data = {
        title:
          certificationTitle.trim(),

        organization:
          certificationOrganization.trim(),

        year:
          certificationYear.trim(),
      };

      if (
        editingItem?.type ===
        "certification"
      ) {
        const updated =
          certifications.map(
            (item) =>
              item.id ===
              editingItem.id
                ? {
                    ...item,
                    ...data,
                  }
                : item
          );

        updateField(
          "certifications",
          updated
        );

        setEditingItem(null);
        resetCertification();

        return;
      }

      updateField(
        "certifications",
        [
          ...certifications,
          {
            id: Date.now(),
            ...data,
          },
        ]
      );

      resetCertification();
    };

  // =========================
  // TECHNICAL SKILLS
  // =========================

  const updateSkillCategory =
    (
      category,
      value
    ) => {
      updateField(
        "skillCategories",
        {
          ...skillCategories,
          [category]:
            value,
        }
      );
    };

  // =========================
  // AI SUMMARY
  // =========================

  const generateAISummary =
    async () => {
      try {
        setIsGenerating(true);
        setAiError("");

        const response =
          await fetch(
            "http://localhost:5000/api/generate-summary",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    name,
                    degree,
                    college,
                    skills,
                    experiences,
                    projects,
                  }
                ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to generate summary."
          );
        }

        updateField(
          "summary",
          data.summary
        );
      } catch (error) {
        console.error(
          "AI Summary Error:",
          error
        );

        setAiError(
          error.message ||
            "AI generation failed."
        );
      } finally {
        setIsGenerating(false);
      }
    };

  const handleEnter = (
    event,
    callback
  ) => {
    if (
      event.key === "Enter"
    ) {
      event.preventDefault();
      callback();
    }
  };

  return (
    <div className="resume-form">

      <div className="form-heading">
        <h2>
          Resume Details
        </h2>

        <p>
          Changes are saved automatically.
        </p>
      </div>

      {/* =====================
          PERSONAL
      ====================== */}

      <div className="form-card">

        <div className="section-number">
          01
        </div>

        <div className="section-content">

          <h3>
            Personal Information
          </h3>

          <label>
            Full Name
          </label>

          <input
            type="text"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) =>
              updateField(
                "name",
                e.target.value
              )
            }
          />

          <label>
            Location
          </label>

          <input
            type="text"
            placeholder="e.g. City, State"
            value={location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
          />

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={phoneNumber}
            onChange={(e) =>
              updateField(
                "phoneNumber",
                e.target.value
              )
            }
          />

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="e.g. name@example.com"
            value={email}
            className={
              errors.email
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              const value =
                e.target.value;

              updateField(
                "email",
                value
              );

              if (
                isValidEmail(
                  value
                )
              ) {
                updateError(
                  "email",
                  ""
                );
              }
            }}
            onBlur={
              validateEmailField
            }
          />

          {errors.email && (
            <p className="form-error">
              {errors.email}
            </p>
          )}

          <label>
            LinkedIn
          </label>

          <input
            type="text"
            placeholder="e.g. linkedin.com/in/username"
            value={linkedin}
            className={
              errors.linkedin
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              const value =
                e.target.value;

              updateField(
                "linkedin",
                value
              );

              if (
                isValidUrl(
                  value
                )
              ) {
                updateError(
                  "linkedin",
                  ""
                );
              }
            }}
            onBlur={
              validateLinkedIn
            }
          />

          {errors.linkedin && (
            <p className="form-error">
              {errors.linkedin}
            </p>
          )}

          <label>
            GitHub
          </label>

          <input
            type="text"
            placeholder="e.g. github.com/username"
            value={github}
            className={
              errors.github
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              const value =
                e.target.value;

              updateField(
                "github",
                value
              );

              if (
                isValidUrl(
                  value
                )
              ) {
                updateError(
                  "github",
                  ""
                );
              }
            }}
            onBlur={
              validateGithub
            }
          />

          {errors.github && (
            <p className="form-error">
              {errors.github}
            </p>
          )}

          <div className="summary-label-row">

            <label>
              Professional Summary
            </label>

            <button
              type="button"
              className="ai-button"
              onClick={
                generateAISummary
              }
              disabled={
                isGenerating
              }
            >
              {isGenerating
                ? "Generating..."
                : "✨ Generate with AI"}
            </button>

          </div>

          <textarea
            placeholder="Write a short professional summary or generate one using AI..."
            value={summary}
            onChange={(e) =>
              updateField(
                "summary",
                e.target.value
              )
            }
          />

          {aiError && (
            <p className="ai-error">
              {aiError}
            </p>
          )}

        </div>
      </div>

      {/* =====================
          EDUCATION
      ====================== */}

      <div className="form-card">

        <div className="section-number">
          02
        </div>

        <div className="section-content">

          <h3>
            Education
          </h3>

          <label>
            College / University
          </label>

          <input
            type="text"
            placeholder="e.g. University Name"
            value={college}
            onChange={(e) =>
              updateField(
                "college",
                e.target.value
              )
            }
          />

          <label>
            College Location
          </label>

          <input
            type="text"
            placeholder="e.g. State, Country"
            value={
              collegeLocation
            }
            onChange={(e) =>
              updateField(
                "collegeLocation",
                e.target.value
              )
            }
          />

          <label>
            Degree
          </label>

          <input
            type="text"
            placeholder="e.g. B.Tech Information Technology"
            value={degree}
            onChange={(e) =>
              updateField(
                "degree",
                e.target.value
              )
            }
          />

          <label>
            CGPA
          </label>

          <input
            type="text"
            placeholder="e.g. 8.2/10"
            value={cgpa}
            onChange={(e) =>
              updateField(
                "cgpa",
                e.target.value
              )
            }
          />

          <div className="two-input-grid">

            <div>
              <label>
                Start Year
              </label>

              <input
                type="text"
                placeholder="e.g. 2023"
                value={
                  educationStartYear
                }
                onChange={(e) =>
                  updateField(
                    "educationStartYear",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label>
                Graduation Year
              </label>

              <input
                type="text"
                placeholder="e.g. 2027"
                value={
                  graduationYear
                }
                onChange={(e) =>
                  updateField(
                    "graduationYear",
                    e.target.value
                  )
                }
              />
            </div>

          </div>

        </div>
      </div>

      {/* =====================
          PROJECTS
      ====================== */}

      <div
        id="form-project"
        className={`form-card ${
          editingItem?.type ===
          "project"
            ? "editing-card"
            : ""
        }`}
      >

        <div className="section-number">
          03
        </div>

        <div className="section-content">

          <h3>
            {editingItem?.type ===
            "project"
              ? "Edit Project"
              : "Projects"}
          </h3>

          <label>
            Project Title *
          </label>

          <input
            type="text"
            placeholder="e.g. AI Resume Builder"
            value={projectTitle}
            className={
              errors.project
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              setProjectTitle(
                e.target.value
              );

              if (
                e.target.value.trim()
              ) {
                updateError(
                  "project",
                  ""
                );
              }
            }}
          />

          {errors.project && (
            <p className="form-error">
              {errors.project}
            </p>
          )}

          <label>
            Tech Stack
          </label>

          <input
            type="text"
            placeholder="e.g. React, JavaScript, Node.js"
            value={projectTech}
            onChange={(e) =>
              setProjectTech(
                e.target.value
              )
            }
          />

          <label>
            Date / Status
          </label>

          <input
            type="text"
            placeholder="e.g. 2026 or Ongoing"
            value={projectDate}
            onChange={(e) =>
              setProjectDate(
                e.target.value
              )
            }
          />

          <label>
            Description / Bullet Points
          </label>

          <textarea
            placeholder={
              "Built a full-stack application...\nImplemented user authentication...\nDesigned a responsive interface..."
            }
            value={
              projectDescription
            }
            onChange={(e) =>
              setProjectDescription(
                e.target.value
              )
            }
          />

          <p className="field-help">
            Put each bullet point on a new line.
          </p>

          <label>
            GitHub / Project Link
            (optional)
          </label>

          <input
            type="text"
            placeholder="e.g. github.com/username/project"
            value={
              projectGithub
            }
            className={
              errors.projectGithub
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              const value =
                e.target.value;

              setProjectGithub(
                value
              );

              if (
                isValidUrl(
                  value
                )
              ) {
                updateError(
                  "projectGithub",
                  ""
                );
              }
            }}
          />

          {errors.projectGithub && (
            <p className="form-error">
              {
                errors.projectGithub
              }
            </p>
          )}

          <button
            className="add-button full-button"
            onClick={
              saveProject
            }
          >
            {editingItem?.type ===
            "project"
              ? "✓ Update Project"
              : "+ Add Project"}
          </button>

          {editingItem?.type ===
            "project" && (
            <button
              className="cancel-edit-button"
              onClick={() =>
                cancelEdit(
                  "project"
                )
              }
            >
              Cancel Edit
            </button>
          )}

        </div>
      </div>

      {/* =====================
          EXPERIENCE
      ====================== */}

      <div
        id="form-experience"
        className={`form-card ${
          editingItem?.type ===
          "experience"
            ? "editing-card"
            : ""
        }`}
      >

        <div className="section-number">
          04
        </div>

        <div className="section-content">

          <h3>
            {editingItem?.type ===
            "experience"
              ? "Edit Experience"
              : "Experience"}
          </h3>

          <label>
            Role *
          </label>

          <input
            type="text"
            placeholder="e.g. Frontend Developer Intern"
            value={role}
            className={
              errors.experience
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              setRole(
                e.target.value
              );

              if (
                e.target.value.trim() &&
                company.trim()
              ) {
                updateError(
                  "experience",
                  ""
                );
              }
            }}
          />

          <label>
            Company *
          </label>

          <input
            type="text"
            placeholder="e.g. Company Name"
            value={company}
            className={
              errors.experience
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              setCompany(
                e.target.value
              );

              if (
                e.target.value.trim() &&
                role.trim()
              ) {
                updateError(
                  "experience",
                  ""
                );
              }
            }}
          />

          {errors.experience && (
            <p className="form-error">
              {
                errors.experience
              }
            </p>
          )}

          <label>
            Date
          </label>

          <input
            type="text"
            placeholder="e.g. Jun 2026 – Aug 2026"
            value={
              experienceDate
            }
            onChange={(e) =>
              setExperienceDate(
                e.target.value
              )
            }
          />

          <label>
            Description
          </label>

          <textarea
            placeholder="Describe your responsibilities, work and achievements..."
            value={
              experienceDescription
            }
            onChange={(e) =>
              setExperienceDescription(
                e.target.value
              )
            }
          />

          <button
            className="add-button full-button"
            onClick={
              saveExperience
            }
          >
            {editingItem?.type ===
            "experience"
              ? "✓ Update Experience"
              : "+ Add Experience"}
          </button>

          {editingItem?.type ===
            "experience" && (
            <button
              className="cancel-edit-button"
              onClick={() =>
                cancelEdit(
                  "experience"
                )
              }
            >
              Cancel Edit
            </button>
          )}

        </div>
      </div>

      {/* =====================
          ACTIVITIES
      ====================== */}

      <div
        id="form-activity"
        className={`form-card ${
          editingItem?.type ===
          "activity"
            ? "editing-card"
            : ""
        }`}
      >

        <div className="section-number">
          05
        </div>

        <div className="section-content">

          <h3>
            {editingItem?.type ===
            "activity"
              ? "Edit Leadership / Activity"
              : "Leadership & Activities"}
          </h3>

          <label>
            Position / Activity *
          </label>

          <input
            type="text"
            placeholder="e.g. Project Team Lead"
            value={
              activityTitle
            }
            className={
              errors.activity
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              setActivityTitle(
                e.target.value
              );

              if (
                e.target.value.trim()
              ) {
                updateError(
                  "activity",
                  ""
                );
              }
            }}
          />

          {errors.activity && (
            <p className="form-error">
              {errors.activity}
            </p>
          )}

          <label>
            Organization / Team
          </label>

          <input
            type="text"
            placeholder="e.g. College Club or Project Team"
            value={
              activityOrganization
            }
            onChange={(e) =>
              setActivityOrganization(
                e.target.value
              )
            }
          />

          <label>
            Date / Detail
          </label>

          <input
            type="text"
            placeholder="e.g. 2025 – Present"
            value={
              activityDate
            }
            onChange={(e) =>
              setActivityDate(
                e.target.value
              )
            }
          />

          <label>
            Description
          </label>

          <textarea
            placeholder={
              "Coordinated team activities...\nManaged project tasks and integration..."
            }
            value={
              activityDescription
            }
            onChange={(e) =>
              setActivityDescription(
                e.target.value
              )
            }
          />

          <p className="field-help">
            Put each bullet point on a new line.
          </p>

          <button
            className="add-button full-button"
            onClick={
              saveActivity
            }
          >
            {editingItem?.type ===
            "activity"
              ? "✓ Update Activity"
              : "+ Add Activity"}
          </button>

          {editingItem?.type ===
            "activity" && (
            <button
              className="cancel-edit-button"
              onClick={() =>
                cancelEdit(
                  "activity"
                )
              }
            >
              Cancel Edit
            </button>
          )}

        </div>
      </div>

      {/* =====================
          CERTIFICATIONS
      ====================== */}

      <div
        id="form-certification"
        className={`form-card ${
          editingItem?.type ===
          "certification"
            ? "editing-card"
            : ""
        }`}
      >

        <div className="section-number">
          06
        </div>

        <div className="section-content">

          <h3>
            {editingItem?.type ===
            "certification"
              ? "Edit Certification"
              : "Certifications"}
          </h3>

          <label>
            Certification *
          </label>

          <input
            type="text"
            placeholder="e.g. Full-Stack Web Development"
            value={
              certificationTitle
            }
            className={
              errors.certification
                ? "invalid-input"
                : ""
            }
            onChange={(e) => {
              setCertificationTitle(
                e.target.value
              );

              if (
                e.target.value.trim()
              ) {
                updateError(
                  "certification",
                  ""
                );
              }
            }}
          />

          {errors.certification && (
            <p className="form-error">
              {
                errors.certification
              }
            </p>
          )}

          <label>
            Issuing Organization
          </label>

          <input
            type="text"
            placeholder="e.g. Udemy"
            value={
              certificationOrganization
            }
            onChange={(e) =>
              setCertificationOrganization(
                e.target.value
              )
            }
          />

          <label>
            Year
          </label>

          <input
            type="text"
            placeholder="e.g. 2026"
            value={
              certificationYear
            }
            onChange={(e) =>
              setCertificationYear(
                e.target.value
              )
            }
          />

          <button
            className="add-button full-button"
            onClick={
              saveCertification
            }
          >
            {editingItem?.type ===
            "certification"
              ? "✓ Update Certification"
              : "+ Add Certification"}
          </button>

          {editingItem?.type ===
            "certification" && (
            <button
              className="cancel-edit-button"
              onClick={() =>
                cancelEdit(
                  "certification"
                )
              }
            >
              Cancel Edit
            </button>
          )}

        </div>
      </div>

      {/* =====================
          SKILLS
      ====================== */}

      <div className="form-card">

        <div className="section-number">
          07
        </div>

        <div className="section-content">

          <h3>
            Technical Skills
          </h3>

          <label>
            Languages
          </label>

          <input
            type="text"
            placeholder="e.g. Java, JavaScript, SQL"
            value={
              skillCategories.languages
            }
            onChange={(e) =>
              updateSkillCategory(
                "languages",
                e.target.value
              )
            }
          />

          <label>
            Frameworks & Technologies
          </label>

          <input
            type="text"
            placeholder="e.g. React, Node.js, Firebase"
            value={
              skillCategories.frameworks
            }
            onChange={(e) =>
              updateSkillCategory(
                "frameworks",
                e.target.value
              )
            }
          />

          <label>
            Developer Tools
          </label>

          <input
            type="text"
            placeholder="e.g. Git, GitHub, VS Code"
            value={
              skillCategories.tools
            }
            onChange={(e) =>
              updateSkillCategory(
                "tools",
                e.target.value
              )
            }
          />

          <label>
            Databases & Concepts
          </label>

          <input
            type="text"
            placeholder="e.g. PostgreSQL, DBMS, REST APIs"
            value={
              skillCategories.databases
            }
            onChange={(e) =>
              updateSkillCategory(
                "databases",
                e.target.value
              )
            }
          />

          <label>
            Languages Spoken
          </label>

          <input
            type="text"
            placeholder="e.g. English, Hindi"
            value={
              skillCategories.spokenLanguages
            }
            onChange={(e) =>
              updateSkillCategory(
                "spokenLanguages",
                e.target.value
              )
            }
          />

          <label>
            AI Skill Keywords
          </label>

          <div className="inline-form">

            <input
              type="text"
              placeholder="e.g. React"
              value={
                skillInput
              }
              onChange={(e) =>
                setSkillInput(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                handleEnter(
                  e,
                  addSkill
                )
              }
            />

            <button
              className="add-button"
              onClick={
                addSkill
              }
            >
              Add
            </button>

          </div>

          {skills.length > 0 && (
            <div className="form-tags">

              {skills.map(
                (
                  skill,
                  index
                ) => (
                  <span
                    className="skill-tag"
                    key={`${skill}-${index}`}
                  >
                    {skill}

                    <button
                      type="button"
                      className="skill-remove"
                      onClick={() =>
                        removeSkill(
                          index
                        )
                      }
                      title={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                )
              )}

            </div>
          )}

          <p className="field-help skill-help">
            These keywords help the AI generate your professional summary.
          </p>

        </div>
      </div>

    </div>
  );
}

export default ResumeForm;