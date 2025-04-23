import { useEffect, useRef } from "react";

export default function ChatWindow({ children }) {
  const boxRef = useRef(null);

  // scroll to the bottom whenever contents change
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div className="chat" ref={boxRef}>
      {children}
    </div>
  );
}
