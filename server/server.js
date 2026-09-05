import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({
  path: "./server/.env",
});

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.GROQ_API_KEY) {
  console.error(
    "ERROR: GROQ_API_KEY is missing from server/.env"
  );

  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message:
      "AI Resume Builder server is running.",
  });
});

// ==============================
// WAIT HELPER
// ==============================

const wait = (milliseconds) => {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
};

// ==============================
// GROQ REQUEST WITH RETRY
// ==============================

async function generateWithRetry(
  options,
  maxRetries = 2
) {
  let lastError;

  for (
    let attempt = 0;
    attempt <= maxRetries;
    attempt++
  ) {
    try {
      return await groq.chat.completions.create(
        options
      );
    } catch (error) {
      lastError = error;

      const status =
        error?.status ||
        error?.response?.status;

      console.error(
        `Groq attempt ${attempt + 1} failed:`,
        {
          status,
          message: error.message,
          error:
            error?.error ||
            error?.response?.data,
        }
      );

      // Retry only temporary errors
      const shouldRetry =
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      if (
        !shouldRetry ||
        attempt === maxRetries
      ) {
        throw error;
      }

      // 1.5 sec -> 3 sec
      const delay =
        1500 * Math.pow(2, attempt);

      console.log(
        `Retrying in ${delay}ms...`
      );

      await wait(delay);
    }
  }

  throw lastError;
}

// ==============================
// AI SUMMARY
// ==============================

app.post(
  "/api/generate-summary",
  async (req, res) => {
    try {
      const {
        name,
        degree,
        college,
        skills = [],
        experiences = [],
        projects = [],
      } = req.body;

      if (
        skills.length === 0 &&
        experiences.length === 0 &&
        projects.length === 0
      ) {
        return res.status(400).json({
          error:
            "Add at least one skill, experience, or project before generating a summary.",
        });
      }

      const skillsText =
        skills.length > 0
          ? skills.join(", ")
          : "Not provided";

      const experienceText =
        experiences.length > 0
          ? experiences
              .map((experience) => {
                const role =
                  experience.role ||
                  "Role not specified";

                const company =
                  experience.company ||
                  "Company not specified";

                const description =
                  experience.description
                    ? ` - ${experience.description}`
                    : "";

                return `${role} at ${company}${description}`;
              })
              .join("\n")
          : "No professional experience provided";

      const projectText =
        projects.length > 0
          ? projects
              .map((project) => {
                const title =
                  project.title ||
                  "Untitled project";

                const tech =
                  project.tech
                    ? ` | Technologies: ${project.tech}`
                    : "";

                let description = "";

                if (
                  project.bullets &&
                  project.bullets.length > 0
                ) {
                  description =
                    project.bullets.join(
                      "; "
                    );
                } else if (
                  project.description
                ) {
                  description =
                    project.description;
                }

                return `${title}${tech}${
                  description
                    ? ` | ${description}`
                    : ""
                }`;
              })
              .join("\n")
          : "No projects provided";

      const prompt = `
Create a concise ATS-friendly professional resume summary using ONLY the candidate information below.

Name:
${name || "Not provided"}

Degree:
${degree || "Not provided"}

College:
${college || "Not provided"}

Skills:
${skillsText}

Experience:
${experienceText}

Projects:
${projectText}

Rules:
- Return only the professional summary.
- Write 2 to 4 sentences.
- Keep it concise.
- Use professional resume language.
- Naturally mention relevant skills.
- If the candidate is a student or fresher, describe them appropriately.
- Do not invent work experience.
- Do not invent achievements.
- Do not invent technologies.
- Do not invent qualifications.
- Do not invent numbers.
- Do not use bullet points.
- Do not add a title.
- Do not use "I", "me", or "my".
`;

      const completion =
  await generateWithRetry({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content:
          "You are a professional resume writer. Return only the final professional resume summary. Use only information supplied by the candidate. Never fabricate experience, technologies, achievements, qualifications, or metrics.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    reasoning_effort: "low",
    include_reasoning: false,

    temperature: 0.3,
    max_completion_tokens: 300,
  });

      const message =
  completion.choices?.[0]?.message;

console.log("Groq response:", {
  content: message?.content,
  finishReason:
    completion.choices?.[0]?.finish_reason,
});

const summary =
  message?.content?.trim();

if (!summary) {
  console.error(
    "Full Groq completion:",
    JSON.stringify(
      completion,
      null,
      2
    )
  );

  return res.status(502).json({
    error:
      "AI returned no summary text. Please generate again.",
  });
}

      res.json({
        summary,
      });
    } catch (error) {
      console.error(
        "\n========== GROQ ERROR =========="
      );

      console.error(error);

      console.error(
        "================================\n"
      );

      const status =
        error?.status ||
        error?.response?.status ||
        500;

      // RATE LIMIT
      if (status === 429) {
        return res.status(429).json({
          error:
            "AI rate limit reached. Wait a few seconds and try again.",
        });
      }

      // BAD API KEY
      if (status === 401) {
        return res.status(401).json({
          error:
            "Groq API authentication failed. Check your API key.",
        });
      }

      // MODEL PERMISSION
      if (status === 403) {
        return res.status(403).json({
          error:
            "This Groq model is not available for your account.",
        });
      }

      // INVALID REQUEST
      if (status === 400) {
        return res.status(400).json({
          error:
            error.message ||
            "Groq rejected the AI request.",
        });
      }

      // TEMPORARY GROQ FAILURE
      if (
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
      ) {
        return res.status(503).json({
          error:
            "The AI service is temporarily unavailable. Try again in a few seconds.",
        });
      }

      return res.status(500).json({
        error:
          error.message ||
          "Unable to generate the summary.",
      });
    }
  }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});