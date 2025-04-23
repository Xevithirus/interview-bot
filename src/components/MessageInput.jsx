import { useState } from "react";

export default function MessageInput({ onSend, disabled = false }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={submit} className="input-row">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your answer…"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
