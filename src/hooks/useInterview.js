// houses all interview state and logic
import { useState } from "react";
import { chatWithGemini } from "../api/gemini";

const MAX_QS = 6;

export default function useInterview() {
  const [job, setJob] = useState("");
  const [messages, setMsgs] = useState([]); // {author,text}
  const [_qCount, setQCount] = useState(0); // internal counter
  const [done, setDone] = useState(false);

  const isReady = job.trim() !== "";

  /* ---------- start interview ---------- */
  const start = () => {
    if (!isReady) return;
    setMsgs([{ author: "ai", text: "Interviewer: Tell me about yourself." }]);
    setQCount(1);
    setDone(false);
  };

  /* ---------- handle answer submit ---------- */
  const sendAnswer = async (answer) => {
    if (!answer.trim() || done) return;

    // show the user's answer immediately
    setMsgs((m) => [...m, { author: "user", text: answer }]);

    /* --- prompt with one‑question‑at‑a‑time rules --- */
    const systemPrompt = `
    You are a senior recruiter running a six‑question mock interview for the role
    “${job}”.
    • Ask ONE question at a time. Each question < 300 characters.
    • After the candidate answers, give a very brief acknowledgement
      (≤ 120 characters) before asking the next question.
    • Stop after question ${MAX_QS}. Instead of another question, provide 
      a final review ≤ 1000 characters that includes:
      - 2-3 strengths
      - 2-3 areas for improvement
      - a clear hire/no-hire verdict with rationale.
    `.trim();

    // Build the payload in Gemini‑compatible format
    const conversation = toGeminiParts([
      { author: "user", text: systemPrompt }, // instruction message
      ...messages,
      { author: "user", text: answer }, // latest candidate reply
    ]);

    try {
      const aiReply = await chatWithGemini(conversation);

      setMsgs((m) => [...m, { author: "ai", text: `Interviewer: ${aiReply}` }]);

      // advance counter & lock input after final review
      setQCount((n) => {
        const next = n + 1;
        if (next > MAX_QS) setDone(true);
        return next;
      });
    } catch (err) {
      console.error("Gemini error", err);
      setMsgs((m) => [
        ...m,
        { author: "ai", text: "(Oops — API error, please try again.)" },
      ]);
    }
  };

  return { job, setJob, messages, start, sendAnswer, done };
}

/* ---------- helpers ---------- */
function toGeminiParts(arr) {
  return arr.map((m) => ({
    role: m.author === "ai" ? "assistant" : "user",
    parts: [{ text: m.text.replace(/^Interviewer:\s?/, "") }],
  }));
}
