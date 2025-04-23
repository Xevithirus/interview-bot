export default function MessageList({ messages }) {
  return messages.map((m, i) => (
    <p key={i} className={m.author}>
      {m.text}
    </p>
  ));
}
