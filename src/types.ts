export type ActiveTool = "remove-bg" | "upscale" | "magic-erase" | "generate" | "history";

export type ImageStyle = "realistic" | "anime" | "oil-painting" | "vaporwave" | "3d-render";

export interface HistoryItem {
  id: string;
  action: string;
  imageUrl: string;
  timestamp: string;
  toolUsed: ActiveTool;
  metadata?: string;
}

export interface ApiKeysConfig {
  hasPixelcut: boolean;
  hasFal: boolean;
  hasGemini: boolean;
}
