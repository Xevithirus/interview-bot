### 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰-𝐁𝐨𝐭  (vite + react + gemini API)

A single-page mock–interview app:

* ⌨️ User types a **job title** → bot starts with “Tell me about yourself”.
* 🤖 Bot asks 6 behaviour-based questions, acknowledging each answer.
* 📝 Auto-scrolling chat window records the dialogue.
* 🏁 After the 6th reply the bot outputs a strengths / weaknesses summary and a hire / no-hire verdict.

The UI and codebase are intentionally minimal (no TypeScript or CSS frameworks) so you can extend them however you like.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Demo gif](#demo-gif)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
  - [Restricting the key (optional)](#restricting-the-key-optional)
- [Available npm scripts](#available-npm-scripts)
- [Project structure](#project-structure)
- [Common issues](#common-issues)
- [License](#license)

---

## Demo gif
*(add a short screen-capture here if you like)*

---

## Features

| Category             | Details                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| **AI**               | Google Gemini 1.5-pro (free tier)<br>One-question-at-a-time flow, dynamic follow-ups, final review |
| **UX**               | Auto-scrolling chat, inputs stay disabled until interview starts and after final review            |
| **Clean code**       | React 18 function components, custom hook for business logic, SDK wrapper for API calls            |
| **Rate-limit aware** | Retries 429 responses using Google-recommended `retryDelay`                                        |

---

## Tech stack

* **React 18** (Vite + ESBuild)
* **@google/generative-ai** SDK
* **Node 20 LTS** + **NPM 10**
* ESLint (flat config) – optional

---

## Prerequisites

| Tool                      | Version      | Purpose                       |
| ------------------------- | ------------ | ----------------------------- |
| **Node.js**               | ≥ 20 LTS     | native fetch, top-level await |
| **Git**                   | any          | clone / commits               |
| **Google Gemini API key** | free or paid | authenticate requests         |

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/<you>/interview-bot.git
cd interview-bot

# 2. Install dependencies
npm install

# 3. Add your Gemini key (see next section)
echo "VITE_GEMINI_API_KEY=YOUR_KEY_HERE" > .env.local

# 4. Run the dev server
npm run dev
# open http://localhost:5173
```

> **Tip:** `.env.local` is already git-ignored; every collaborator adds their own.

---

## Environment variables

| Name                  | Required | Example   | Description                                                          |
| --------------------- | -------- | --------- | -------------------------------------------------------------------- |
| `VITE_GEMINI_API_KEY` | **Yes**  | `AIza...` | Your Gemini Developer-API key. Generate in **AI Studio → API Keys**. |

### Restricting the key (optional)

Google lets you lock the key by:

* **Daily quota** (default 60 req / day)  
* **HTTP referrers** (for deployed sites)  
* **IP address** (for backends)

See the [Gemini API console](https://ai.google.dev) → *API keys*.

---

## Available npm scripts

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Vite dev server with hot-reload                      |
| `npm run build`   | Production build in `dist/`                          |
| `npm run preview` | Serves the `dist/` build locally                     |
| `npm run lint`    | ESLint check (optional config in `eslint.config.js`) |

---

## Project structure

```
interview-bot/
├─ src/
│  ├─ api/
│  │  └─ gemini.js           # SDK wrapper + retry logic
│  ├─ hooks/
│  │  └─ useInterview.js     # all business rules & state
│  ├─ components/            # dumb UI pieces
│  │  ├─ ChatWindow.jsx
│  │  ├─ JobTitleInput.jsx
│  │  ├─ Layout.jsx
│  │  ├─ MessageInput.jsx
│  │  └─ MessageList.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ .env.local                # (ignored) put your key here
├─ .gitignore
├─ vite.config.js
└─ package.json
```

---

## Common issues

| Symptom                                  | Fix                                                                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`An API key must be set`** in console  | `.env.local` missing or wrong var name. File must be in project **root**, not `src/`. Restart `npm run dev` after edits.                                            |
| **HTTP 429 rate-limit** during interview | Free tier = 2 requests/min. The SDK wrapper auto-retries, but you can:<br>1) wait ~30 s between answers,<br>2) upgrade to Pay-as-you-go,<br>3) switch to Vertex AI. |
| **`import.meta` undefined** in Node test | `import.meta.env` only exists inside Vite builds (browser). Mock it or move server calls to a backend.                                                              |

---

## License

MIT – do whatever you want, just keep the copyright notice.

Happy interviewing 🚀
