# ResumeForge — AI Resume Builder

ResumeForge is a full-stack AI-powered resume builder that helps users create clean, professional, and ATS-friendly resumes through an interactive form and live resume preview.

The application includes AI-generated professional summaries, dynamic resume sections, automatic local saving, editing and validation, and print-ready PDF export.

🌐 **Live Demo:** https://resume-forge-topaz-delta.vercel.app/
---

## Features

### Resume Builder
- Live resume preview while entering information
- Personal information section
- Education details
- Projects
- Work experience
- Leadership & activities
- Certifications
- Technical skills
- Dynamic add, edit, update, and delete functionality

### AI-Powered Professional Summary
ResumeForge integrates the Groq API to generate professional resume summaries based on the user's:

- Education
- Skills
- Experience
- Projects

The API key is handled securely by the backend and is never exposed to the frontend.

### ATS-Friendly Resume
The generated resume uses a clean, minimal structure designed to remain readable by Applicant Tracking Systems (ATS).

### PDF Export
Users can export their completed resume as an A4 PDF using the browser's print functionality.

### Automatic Saving
Resume information is automatically stored using browser `localStorage`, allowing users to refresh or reopen the application without losing their work.

### Form Validation
The application validates important fields including:

- Email addresses
- LinkedIn URLs
- GitHub URLs
- Project URLs
- Required project fields
- Required experience fields
- Required certification and activity fields

### Responsive Interface
The application adapts to desktop, tablet, and mobile screen sizes.

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### AI
- Groq API
- OpenAI GPT-OSS model through Groq

### Development Tools
- Git
- GitHub
- VS Code
- npm

---

## Project Architecture

```text
ResumeForge/
│
├── public/
│
├── server/
│   ├── server.js
│   └── .env
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── ResumeForm.jsx
│   ├── ResumePreview.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

> `server/.env` is excluded from Git and should never be committed.

---

## How It Works

ResumeForge follows a simple data flow:

```text
User Input
    ↓
ResumeForm
    ↓
Shared React State
    ↓
ResumePreview
    ↓
ATS-Friendly Resume
    ↓
PDF Export
```

For AI summary generation:

```text
Resume Data
    ↓
React Frontend
    ↓
Express Backend
    ↓
Groq API
    ↓
AI-Generated Summary
    ↓
Resume Preview
```

The Groq API key remains on the backend and is not sent to the browser.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/007kimetsuu/ResumeForge.git
```

Move into the project:

```bash
cd ResumeForge
```

### 2. Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` directory:

```text
server/.env
```

Add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Do not commit this file to GitHub.

---

## Running the Application

ResumeForge requires both the backend and frontend to run.

### Start the backend

Open a terminal and run:

```bash
node server/server.js
```

The backend should start on:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal and run:

```bash
npm run dev
```

Vite will display the local frontend address in the terminal.

---

## Main Components

### `App.jsx`

Maintains the central resume state and handles:

- Shared resume data
- localStorage persistence
- Resume clearing
- Edit state
- PDF printing

### `ResumeForm.jsx`

Handles:

- User input
- Form validation
- Adding and updating resume sections
- Skill management
- AI summary requests

### `ResumePreview.jsx`

Handles:

- Live resume rendering
- Resume section formatting
- Editing existing entries
- Deleting entries
- Clickable links
- ATS-friendly presentation

### `server/server.js`

Acts as the backend layer between the React application and the Groq API.

This prevents the Groq API key from being exposed directly in frontend code.

---

## Security

Sensitive environment variables are excluded using `.gitignore`.

```gitignore
node_modules
dist
.env
.env.*
server/.env
```

API keys should never be placed directly inside React components or committed to a public GitHub repository.

---

## Screenshots

### Resume Builder

Add a screenshot of the ResumeForge builder here.

```text
docs/resumeforge-builder.png
```

### Resume Preview

Add a screenshot of the generated resume here.

```text
docs/resumeforge-preview.png
```

---

## Future Improvements

Possible future additions include:

- Multiple resume templates
- Drag-and-drop section ordering
- AI-assisted project descriptions
- AI-assisted experience bullet points
- Cloud resume storage
- User authentication
- Additional export formats

---

## What I Learned

Building ResumeForge provided practical experience with:

- React state management
- Controlled form inputs
- Component communication using props
- Dynamic rendering with arrays
- `map()` and `filter()`
- CRUD-style UI operations
- Browser localStorage
- Form validation
- REST API communication
- Node.js and Express
- Environment variable management
- AI API integration
- Responsive CSS
- Git and GitHub workflow

---

## Author

**Austin Varghese Alappat**

GitHub: [007kimetsuu](https://github.com/007kimetsuu)

---

## Repository

[ResumeForge on GitHub](https://github.com/007kimetsuu/ResumeForge)

---

## License

This project was created for educational and portfolio purposes.