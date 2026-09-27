// Latest Claude models (based on Anthropic migration guides)
export const LATEST_OPUS = "claude-opus-5-5";
export const LATEST_SONNET = "claude-sonnet-5";

// Model list used by the UI
export const MODELS = [
  { id: LATEST_OPUS, name: "Claude Opus 5.5" },
  { id: LATEST_SONNET, name: "Claude Sonnet 5" },

  // Optional: keep older models if you want them visible
  { id: "gpt-4", name: "GPT‑4" },
  { id: "gpt-3.5-turbo", name: "GPT‑3.5 Turbo" }
];

// Simple helper: detect Claude models
export function isClaudeModel(modelId: string): boolean {
  return modelId.startsWith("claude-opus") || modelId.startsWith("claude-sonnet");
}

// Helper: detect if user is NOT using the latest Claude versions
export function needsUpgrade(modelId: string): boolean {
  if (!isClaudeModel(modelId)) return false;

  return modelId !== LATEST_OPUS && modelId !== LATEST_SONNET;
}
