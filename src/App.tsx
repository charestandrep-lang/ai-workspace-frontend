import React, { useState } from "react";
import "./App.css";

import ModelSelector from "./components/ModelSelector";
import ChatUI from "./components/ChatUI";

function App() {
  // Default to Opus 5.5
  const [selectedModel, setSelectedModel] = useState("claude-opus-5-5");

  const isClaudeModel =
    selectedModel.startsWith("claude-opus") ||
    selectedModel.startsWith("claude-sonnet");

  return (
    <div className="app-container">
      <h1>AI Workspace</h1>

      {isClaudeModel && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            border: "1px solid #e0b200",
            background: "#fff8e1",
            borderRadius: "4px",
            fontSize: "15px"
          }}
        >
          <strong>Claude Model Notice:</strong><br />
          You are using <code>{selectedModel}</code>.  
          Anthropic frequently releases new versions of Opus and Sonnet.  
          When <strong>Opus 6</strong> or <strong>Sonnet 6</strong> becomes available,
          simply update your <code>config.ts</code> model list to stay current.
        </div>
      )}

      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <ChatUI model={selectedModel} />
    </div>
  );
}

export default App;

