import React from "react";
import { MODELS } from "../config";

interface Props {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

function ModelSelector({ selectedModel, onModelChange }: Props) {
  const isClaudeModel =
    selectedModel.startsWith("claude-opus") ||
    selectedModel.startsWith("claude-sonnet");

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Select Model</h2>

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
          You are using <code>{selectedModel}</code>.  
          Anthropic frequently releases new versions of Opus and Sonnet.  
          Check their model documentation regularly — when <strong>Opus 6</strong> or
          <strong>Sonnet 6</strong> becomes available, simply update your
          <code>config.ts</code> model list.
        </div>
      )}

      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        style={{
          padding: "8px",
          fontSize: "16px",
          marginTop: "10px",
          width: "100%",
          maxWidth: "300px"
        }}
      >
        {MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;
