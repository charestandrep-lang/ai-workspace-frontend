import React, { useEffect, useState } from "react";

interface ModelInfo {
  id: string;
  label: string;
  provider: "anthropic" | "openai";
  supportsStreaming: boolean;
  supportsNonStreaming: boolean;
}

export default function ModelSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [newModels, setNewModels] = useState<string[]>([]);

  async function loadModels() {
    const res = await fetch("/models");
    const data = await res.json();
    setModels(data);
  }

  async function checkUpdates() {
    const res = await fetch("/models/check-updates");
    const data = await res.json();
    if (data.updated) {
      setNewModels([
        ...data.newAnthropicModels,
        ...data.newOpenAIModels,
      ]);
    }
  }

  useEffect(() => {
    loadModels();
    checkUpdates();
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      {newModels.length > 0 && (
        <div
          style={{
            background: "#ffe9a8",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          New models available: {newModels.join(", ")}
        </div>
      )}

      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        style={{ padding: "8px", fontSize: "1rem" }}
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label} ({m.provider})
          </option>
        ))}
      </select>
    </div>
  );
}
