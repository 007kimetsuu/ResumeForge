function ResumePreview({
  resumeData,
  updateField,
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

    experiences,
    projects,
    activities,
    certifications,
    skillCategories,
  } = resumeData;

  // =========================
  // DELETE CONFIRMATION
  // =========================

  const confirmDelete = (
    label
  ) => {
    return window.confirm(
      `Delete this ${label}? This cannot be undone.`
    );
  };

  // =========================
  // DELETE
  // =========================

  const deleteExperience = (
    id
  ) => {
    if (
      !confirmDelete(
        "experience"
      )
    ) {
      return;
    }

    updateField(
      "experiences",
      experiences.filter(
        (item) =>
          item.id !== id
      )
    );

    setEditingItem(null);
  };

  const deleteProject = (
    id
  ) => {
    if (
      !confirmDelete(
        "project"
      )
    ) {
      return;
    }

    updateField(
      "projects",
      projects.filter(
        (item) =>
          item.id !== id
      )
    );

    setEditingItem(null);
  };

  const deleteActivity = (
    id
  ) => {
    if (
      !confirmDelete(
        "activity"
      )
    ) {
      return;
    }

    updateField(
      "activities",
      activities.filter(
        (item) =>
          item.id !== id
      )
    );

    setEditingItem(null);
  };

  const deleteCertification =
    (id) => {
      if (
        !confirmDelete(
          "certification"
        )
      ) {
        return;
      }

      updateField(
        "certifications",
        certifications.filter(
          (item) =>
            item.id !== id
        )
      );

      setEditingItem(null);
    };

  // =========================
  // EDIT + AUTO SCROLL
  // =========================

  const startEdit = (
    type,
    id
  ) => {
    setEditingItem({
      type,
      id,
    });

    setTimeout(() => {
      const section =
        document.getElementById(
          `form-${type}`
        );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  // =========================
  // URL HELPERS
  // =========================

  const formatUrl = (
    url
  ) => {
    if (!url) {
      return "#";
    }

    if (
      url.startsWith(
        "http://"
      ) ||
      url.startsWith(
        "https://"
      )
    ) {
      return url;
    }

    return `https://${url}`;
  };

  const displayUrl = (
    url
  ) => {
    return url
      .replace(
        "https://",
        ""
      )
      .replace(
        "http://",
        ""
      )
      .replace(
        /\/$/,
        ""
      );
  };

  const hasEducation =
    college ||
    degree ||
    cgpa ||
    graduationYear;

  const hasTechnicalSkills =
    skillCategories.languages ||
    skillCategories.frameworks ||
    skillCategories.tools ||
    skillCategories.databases ||
    skillCategories.spokenLanguages;

  return (
    <article
      className="resume-paper"
      id="resume-preview"
    >

      {/* =====================
          HEADER
      ====================== */}

      <header className="cv-header">

        <h1>
          {name ||
            "Your Name"}
        </h1>

        <div className="cv-contact">

          {location && (
            <span>
              {location}
            </span>
          )}

          {location &&
            phoneNumber && (
              <span>
                |
              </span>
            )}

          {phoneNumber && (
            <span>
              {phoneNumber}
            </span>
          )}

          {(location ||
            phoneNumber) &&
            email && (
              <span>
                |
              </span>
            )}

          {email && (
            <a
              href={`mailto:${email}`}
            >
              {email}
            </a>
          )}

        </div>

        <div className="cv-links">

          {linkedin && (
            <a
              href={
                formatUrl(
                  linkedin
                )
              }
              target="_blank"
              rel="noreferrer"
            >
              {displayUrl(
                linkedin
              )}
            </a>
          )}

          {linkedin &&
            github && (
              <span>
                |
              </span>
            )}

          {github && (
            <a
              href={
                formatUrl(
                  github
                )
              }
              target="_blank"
              rel="noreferrer"
            >
              {displayUrl(
                github
              )}
            </a>
          )}

        </div>

      </header>

      {/* =====================
          SUMMARY
      ====================== */}

      {summary && (
        <section className="cv-section">

          <h2>
            Professional Summary
          </h2>

          <p className="cv-summary">
            {summary}
          </p>

        </section>
      )}

      {/* =====================
          EDUCATION
      ====================== */}

      {hasEducation && (
        <section className="cv-section">

          <h2>
            Education
          </h2>

          <div className="cv-row">

            <strong>
              {college ||
                "College / University"}
            </strong>

            <span>
              {collegeLocation}
            </span>

          </div>

          <div className="cv-row education-row">

            <span>
              {degree ||
                "Degree"}

              {cgpa &&
                ` | CGPA: ${cgpa}`}
            </span>

            <span>
              {educationStartYear &&
              graduationYear
                ? `${educationStartYear} – ${graduationYear}`
                : graduationYear}
            </span>

          </div>

        </section>
      )}

      {/* =====================
          EXPERIENCE
      ====================== */}

      {experiences.length >
        0 && (
        <section className="cv-section">

          <h2>
            Experience
          </h2>

          {experiences.map(
            (experience) => (
              <div
                className="cv-entry"
                key={
                  experience.id
                }
              >

                <div className="cv-row">

                  <div>
                    <strong>
                      {
                        experience.role
                      }
                    </strong>

                    {experience.company && (
                      <>
                        {" | "}

                        <span>
                          {
                            experience.company
                          }
                        </span>
                      </>
                    )}
                  </div>

                  <div className="cv-entry-actions">

                    <span>
                      {
                        experience.date
                      }
                    </span>

                    <button
                      className="cv-edit no-print"
                      onClick={() =>
                        startEdit(
                          "experience",
                          experience.id
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="cv-delete no-print"
                      onClick={() =>
                        deleteExperience(
                          experience.id
                        )
                      }
                      title="Delete"
                    >
                      ×
                    </button>

                  </div>

                </div>

                {experience.description && (
                  <ul>
                    <li>
                      {
                        experience.description
                      }
                    </li>
                  </ul>
                )}

              </div>
            )
          )}

        </section>
      )}

      {/* =====================
          PROJECTS
      ====================== */}

      {projects.length >
        0 && (
        <section className="cv-section">

          <h2>
            Projects
          </h2>

          {projects.map(
            (project) => {
              const bullets =
                project.bullets
                  ?.length
                  ? project.bullets
                  : project.description
                  ? [
                      project.description,
                    ]
                  : [];

              return (
                <div
                  className="cv-entry"
                  key={
                    project.id
                  }
                >

                  <div className="cv-row cv-project-heading">

                    <div>

                      <strong>
                        {
                          project.title
                        }
                      </strong>

                      {project.tech && (
                        <>
                          {" | "}

                          <span>
                            {
                              project.tech
                            }
                          </span>
                        </>
                      )}

                    </div>

                    <div className="cv-entry-actions">

                      <span>
                        {
                          project.date
                        }
                      </span>

                      <button
                        className="cv-edit no-print"
                        onClick={() =>
                          startEdit(
                            "project",
                            project.id
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="cv-delete no-print"
                        onClick={() =>
                          deleteProject(
                            project.id
                          )
                        }
                        title="Delete"
                      >
                        ×
                      </button>

                    </div>

                  </div>

                  {bullets.length >
                    0 && (
                    <ul>
                      {bullets.map(
                        (
                          bullet,
                          index
                        ) => (
                          <li
                            key={
                              index
                            }
                          >
                            {
                              bullet
                            }
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {project.github && (
                    <a
                      className="project-link"
                      href={
                        formatUrl(
                          project.github
                        )
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {displayUrl(
                        project.github
                      )}
                    </a>
                  )}

                </div>
              );
            }
          )}

        </section>
      )}

      {/* =====================
          LEADERSHIP
      ====================== */}

      {activities.length >
        0 && (
        <section className="cv-section">

          <h2>
            Leadership & Activities
          </h2>

          {activities.map(
            (activity) => (
              <div
                className="cv-entry"
                key={
                  activity.id
                }
              >

                <div className="cv-row">

                  <div>

                    <strong>
                      {
                        activity.title
                      }
                    </strong>

                    {activity.organization && (
                      <>
                        {" | "}

                        <span>
                          {
                            activity.organization
                          }
                        </span>
                      </>
                    )}

                  </div>

                  <div className="cv-entry-actions">

                    <span>
                      {
                        activity.date
                      }
                    </span>

                    <button
                      className="cv-edit no-print"
                      onClick={() =>
                        startEdit(
                          "activity",
                          activity.id
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="cv-delete no-print"
                      onClick={() =>
                        deleteActivity(
                          activity.id
                        )
                      }
                      title="Delete"
                    >
                      ×
                    </button>

                  </div>

                </div>

                {activity.bullets
                  ?.length >
                  0 && (
                  <ul>
                    {activity.bullets.map(
                      (
                        bullet,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          {
                            bullet
                          }
                        </li>
                      )
                    )}
                  </ul>
                )}

              </div>
            )
          )}

        </section>
      )}

      {/* =====================
          CERTIFICATIONS
      ====================== */}

      {certifications.length >
        0 && (
        <section className="cv-section">

          <h2>
            Certifications
          </h2>

          {certifications.map(
            (
              certification
            ) => (
              <div
                className="cv-entry compact-entry"
                key={
                  certification.id
                }
              >

                <div className="cv-row">

                  <div>

                    <strong>
                      {
                        certification.title
                      }
                    </strong>

                    {certification.organization && (
                      <>
                        {" | "}

                        <span>
                          {
                            certification.organization
                          }
                        </span>
                      </>
                    )}

                  </div>

                  <div className="cv-entry-actions">

                    <span>
                      {
                        certification.year
                      }
                    </span>

                    <button
                      className="cv-edit no-print"
                      onClick={() =>
                        startEdit(
                          "certification",
                          certification.id
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="cv-delete no-print"
                      onClick={() =>
                        deleteCertification(
                          certification.id
                        )
                      }
                      title="Delete"
                    >
                      ×
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </section>
      )}

      {/* =====================
          TECHNICAL SKILLS
      ====================== */}

      {hasTechnicalSkills && (
        <section className="cv-section">

          <h2>
            Technical Skills
          </h2>

          <div className="technical-skills">

            {skillCategories.languages && (
              <p>
                <strong>
                  Languages:
                </strong>{" "}

                {
                  skillCategories.languages
                }
              </p>
            )}

            {skillCategories.frameworks && (
              <p>
                <strong>
                  Frameworks & Technologies:
                </strong>{" "}

                {
                  skillCategories.frameworks
                }
              </p>
            )}

            {skillCategories.tools && (
              <p>
                <strong>
                  Developer Tools:
                </strong>{" "}

                {
                  skillCategories.tools
                }
              </p>
            )}

            {skillCategories.databases && (
              <p>
                <strong>
                  Databases & Concepts:
                </strong>{" "}

                {
                  skillCategories.databases
                }
              </p>
            )}

            {skillCategories.spokenLanguages && (
              <p>
                <strong>
                  Languages Spoken:
                </strong>{" "}

                {
                  skillCategories.spokenLanguages
                }
              </p>
            )}

          </div>

        </section>
      )}

      {!name &&
        !hasEducation &&
        projects.length === 0 &&
        experiences.length === 0 &&
        activities.length === 0 &&
        certifications.length === 0 &&
        !hasTechnicalSkills && (
          <div className="empty-resume">

            <h3>
              Your resume will appear here
            </h3>

            <p>
              Start entering your information on the left.
            </p>

          </div>
        )}

    </article>
  );
}

export default ResumePreview;