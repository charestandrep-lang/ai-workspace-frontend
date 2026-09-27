import React, { useState } from "react";

interface Props {
  model: string;
}

function ChatUI({ model }: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, `You: ${input}`]);

    // Placeholder model response (backend will replace this later)
    setMessages((prev) => [
      ...prev,
      `${model}: (response will appear here once backend is connected)`
    ]);

    setInput("");
  };

  // Detect Claude models (Opus 5.5, Sonnet 5, future versions)
  const isClaudeModel =
    model.startsWith("claude-opus") || model.startsWith("claude-sonnet");

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Chat</h2>

      {isClaudeModel && (
        <div
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #e0b200",
            background: "#fff8e1",
            fontSize: "14px",
            borderRadius: "4px"
          }}
        >
          <strong>Claude Model Notice:</strong><br />
          You are using <code>{model}</code>.  
          Check Anthropic’s model documentation regularly — newer versions of
          Opus or Sonnet may be available.  
          When they release <strong>Opus 6</strong> or <strong>Sonnet 6</strong>,
          simply update your <code>config.ts</code> model list.
        </div>
      )}

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          background: "#fafafa"
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {msg}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{
          width: "80%",
          padding: "8px",
          marginRight: "10px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatUI;
