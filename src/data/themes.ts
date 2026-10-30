export interface Theme {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export const themesData: Theme[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Deep black with neon red-orange accents.",
    isDefault: true,
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Calm indigo tones with icy blue highlights.",
    isDefault: false,
  },
  {
    id: "dracula",
    name: "Dracula",
    description: "Purple dark theme with vivid pink accents.",
    isDefault: false,
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "Pure black canvas with glowing green terminal text.",
    isDefault: false,
  },
  {
    id: "synthwave",
    name: "Synthwave",
    description: "Retro violet palette with neon magenta glow.",
    isDefault: false,
  },
];
