import React, { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("claude-opus-5.5");
  const [streaming, setStreaming] = useState(true);

  async function sendNonStreaming() {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.content },
    ]);
  }

  async function sendStreaming() {
    const res = await fetch("/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    const reader = res.body!.getReader();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = new TextDecoder().decode(value);
      fullText += chunk;

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant") {
          return [
            ...prev.slice(0, -1),
            { role: "assistant", content: fullText },
          ];
        }
        return [...prev, { role: "assistant", content: chunk }];
      });
    }
  }

  async function sendMessage() {
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (streaming) {
      await sendStreaming();
    } else {
      await sendNonStreaming();
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>AI Workspace</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={streaming}
            onChange={(e) => setStreaming(e.target.checked)}
          />{" "}
          Streaming mode
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Model:</strong> {model}
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          minHeight: "200px",
          marginBottom: "1rem",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}

