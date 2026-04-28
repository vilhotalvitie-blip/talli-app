// Finnish horse color system with predefined colors

export interface HorseColor {
  id: string;
  name: string;        // Finnish name
  nameEn?: string;     // English name (optional)
  baseColor: string;   // Main body color (hex)
  maneColor: string;   // Mane/tail color (hex)
  maneVariation?: boolean; // Whether mane can vary (e.g., flaxen)
  markings?: string[]; // Common marking colors
}

// Finnish horse colors with accurate representations
export const horseColors: HorseColor[] = [
  {
    id: "musta",
    name: "Musta",
    nameEn: "Black",
    baseColor: "#1a1a1a",
    maneColor: "#1a1a1a",
  },
  {
    id: "rautias",
    name: "Rautias",
    nameEn: "Bay/Chestnut",
    baseColor: "#8B4513",
    maneColor: "#2d1810",
    maneVariation: true, // Can have flaxen mane
  },
  {
    id: "ruunikko",
    name: "Ruunikko",
    nameEn: "Brown",
    baseColor: "#4a3728",
    maneColor: "#1a1a1a",
  },
  {
    id: "kimo",
    name: "Kimo",
    nameEn: "Grey/Dapple",
    baseColor: "#a0a0a0",
    maneColor: "#f5f5f5",
    maneVariation: true,
  },
  {
    id: "liinaharja",
    name: "Liinaharja",
    nameEn: "Palomino/Flaxen",
    baseColor: "#d4a574",
    maneColor: "#f5f5dc",
  },
  {
    id: "hopeanruunikko",
    name: "Hopeanruunikko",
    nameEn: "Silver Dapple",
    baseColor: "#6b4a3a",
    maneColor: "#c0c0c0",
  },
  {
    id: "voikko",
    name: "Voikko",
    nameEn: "Buckskin/Dun",
    baseColor: "#c4a35a",
    maneColor: "#1a1a1a",
  },
  {
    id: "rautiassuomu",
    name: "Rautiassuomu",
    nameEn: "Chestnut Roan",
    baseColor: "#cd853f",
    maneColor: "#f5f5dc",
  },
  {
    id: "mustasuomu",
    name: "Mustasuomu",
    nameEn: "Blue Roan",
    baseColor: "#4a5568",
    maneColor: "#1a1a1a",
  },
  {
    id: "valkoinen",
    name: "Valkoinen",
    nameEn: "White",
    baseColor: "#f8f8f8",
    maneColor: "#f8f8f8",
  },
];

// Helper to get color by ID
export function getHorseColor(colorId: string): HorseColor {
  return horseColors.find(c => c.id === colorId) || horseColors[1]; // Default to rautias
}

// Helper to get color by Finnish name (case insensitive)
export function getHorseColorByName(name: string): HorseColor {
  const normalized = name.toLowerCase().trim();
  return horseColors.find(c => 
    c.name.toLowerCase() === normalized || 
    c.nameEn?.toLowerCase() === normalized
  ) || horseColors[1]; // Default to rautias
}

// CSS variables for dynamic color application
export function getHorseColorStyles(colorId: string): Record<string, string> {
  const color = getHorseColor(colorId);
  return {
    '--horse-base': color.baseColor,
    '--horse-mane': color.maneColor,
    '--horse-dark': adjustBrightness(color.baseColor, -20),
    '--horse-light': adjustBrightness(color.baseColor, 20),
  };
}

// Utility to adjust hex color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
