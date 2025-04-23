import Layout from "./components/Layout.jsx";
import JobTitleInput from "./components/JobTitleInput.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import MessageList from "./components/MessageList.jsx";
import MessageInput from "./components/MessageInput.jsx";
import useInterview from "./hooks/useInterview.js";
import "./styles.css";

export default function App() {
  const { job, setJob, messages, start, sendAnswer, done } = useInterview();
  const started = messages.length > 0;
  const inputDisabled = !started || done;

  return (
    <Layout>
      <h1>Interview Bot</h1>

      <JobTitleInput value={job} onChange={setJob} onStart={start} />
      <ChatWindow>
        <MessageList messages={messages} />
      </ChatWindow>
      <MessageInput onSend={sendAnswer} disabled={inputDisabled} />
    </Layout>
  );
}
