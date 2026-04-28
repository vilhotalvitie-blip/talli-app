// Finnish horse colors mapped to realistic colors
export interface ColorScheme {
  main: string;
  light: string;
  dark: string;
}

// Finnish horse color mapping
export function getColorFill(colorName: string): ColorScheme {
  const lowerColor = colorName.toLowerCase();
  
  // Chestnut/Bay variations
  if (lowerColor.includes("rautias") || lowerColor.includes("ruunikko")) {
    return {
      main: "#8B4513",      // Saddle brown
      light: "#CD853F",     // Peru
      dark: "#5D3A1A",      // Dark brown
    };
  }
  
  // Black
  if (lowerColor.includes("musta")) {
    return {
      main: "#2C2C2C",      // Near black
      light: "#4A4A4A",     // Dark gray
      dark: "#1A1A1A",      // Almost black
    };
  }
  
  // Gray/Dapple
  if (lowerColor.includes("hallakko") || lowerColor.includes("harmaa")) {
    return {
      main: "#A9A9A9",      // Dark gray
      light: "#D3D3D3",     // Light gray
      dark: "#696969",      // Dim gray
    };
  }
  
  // Brown
  if (lowerColor.includes("ruskea") || lowerColor.includes("pähkinä")) {
    return {
      main: "#654321",      // Dark brown
      light: "#8B7355",     // Light brown
      dark: "#4A3728",      // Very dark brown
    };
  }
  
  // White/Gray (kimo)
  if (lowerColor.includes("kimo") || lowerColor.includes("valkoinen")) {
    return {
      main: "#E8E8E8",      // Light gray
      light: "#F5F5F5",     // Near white
      dark: "#C0C0C0",      // Silver
    };
  }
  
  // Buckskin/Dun
  if (lowerColor.includes("ruunivoikko") || lowerColor.includes("voikko")) {
    return {
      main: "#C4A35A",      // Buckskin gold
      light: "#D4B86A",     // Light gold
      dark: "#8B7355",      // Dark tan
    };
  }
  
  // Palomino
  if (lowerColor.includes("palomino")) {
    return {
      main: "#E6C885",      // Golden
      light: "#F0D99A",     // Light golden
      dark: "#C4A35A",      // Darker gold
    };
  }
  
  // Roan
  if (lowerColor.includes("moukaroinen") || lowerColor.includes("roan")) {
    return {
      main: "#9B7653",      // Roan brown
      light: "#B8956A",     // Lighter roan
      dark: "#7A5A3A",      // Dark roan
    };
  }
  
  // Default fallback
  return {
    main: "#8B7355",      // Default brown
    light: "#A0856C",     // Light brown
    dark: "#6B5344",      // Dark brown
  };
}

// Mane/tail colors - often same as body or darker
export function getManeColor(colorName: string): ColorScheme {
  const lowerColor = colorName.toLowerCase();
  
  // Black mane (for chestnut, bay)
  if (lowerColor.includes("rautias") || lowerColor.includes("ruunikko")) {
    return {
      main: "#1A1A1A",
      light: "#2C2C2C",
      dark: "#0D0D0D",
    };
  }
  
  // Same as body (for black, gray)
  if (lowerColor.includes("musta") || lowerColor.includes("hallakko") || lowerColor.includes("harmaa")) {
    return getColorFill(colorName);
  }
  
  // Darker than body
  if (lowerColor.includes("ruskea") || lowerColor.includes("pähkinä")) {
    return {
      main: "#4A3728",
      light: "#654321",
      dark: "#2D2218",
    };
  }
  
  // White/gray mane
  if (lowerColor.includes("kimo") || lowerColor.includes("valkoinen")) {
    return {
      main: "#F0F0F0",
      light: "#FFFFFF",
      dark: "#D0D0D0",
    };
  }
  
  // White/cream mane (palomino)
  if (lowerColor.includes("palomino")) {
    return {
      main: "#FFF8DC",
      light: "#FFFFFF",
      dark: "#EEE8CD",
    };
  }
  
  // Black mane default
  return {
    main: "#1A1A1A",
    light: "#2C2C2C",
    dark: "#0D0D0D",
  };
}

// Tail colors - often same as mane
export function getTailColor(colorName: string): ColorScheme {
  return getManeColor(colorName);
}

// Map breed to body type
export type BodyType = "pony" | "warmblood" | "thoroughbred" | "draft" | "arabian";

export function getBreedBodyType(breed: string): BodyType {
  const lowerBreed = breed.toLowerCase();
  
  // Pony breeds - compact, shorter legs
  const ponyBreeds = [
    "suomenpienhevonen",
    "shetland",
    "pony",
    "welsh",
    "shetlannin",
    "icelandic",
    "islannin",
  ];
  
  // Draft breeds - massive, muscular
  const draftBreeds = [
    "suomenhevonen",
    "hevonen", // generic finnhorse
    "belgian",
    "shire",
    "clydesdale",
    "percheron",
    "coldblood",
  ];
  
  // Thoroughbred - slender, long legs
  const thoroughbredBreeds = [
    "täysiverinen",
    "thoroughbred",
    "englannintäysiverinen",
    "englantilainen täysiverinen",
    "arabi",
    "arabian",
  ];
  
  // Warmblood - athletic, balanced
  const warmbloodBreeds = [
    "lämminverinen",
    "warmblood",
    "hanoverian",
    "holstein",
    "dutch",
    "swedish",
    "trakehner",
    "oldenburg",
  ];
  
  if (ponyBreeds.some(b => lowerBreed.includes(b))) return "pony";
  if (draftBreeds.some(b => lowerBreed.includes(b))) return "draft";
  if (thoroughbredBreeds.some(b => lowerBreed.includes(b))) return "thoroughbred";
  if (warmbloodBreeds.some(b => lowerBreed.includes(b))) return "warmblood";
  
  // Default to warmblood for unknown breeds
  return "warmblood";
}

// Get breed label in Finnish
export function getBreedLabel(breed: string): string {
  const lowerBreed = breed.toLowerCase();
  
  const labels: Record<string, string> = {
    "suomenpienhevonen": "Pienhevonen",
    "suomenhevonen": "Suomenhevonen",
    "englannintäysiverinen": "Täysiverinen",
    "lämminverinen": "Lämminverinen",
    "shetlanninpony": "Shetlanninpony",
    "welsh": "Welsh",
  };
  
  for (const [key, value] of Object.entries(labels)) {
    if (lowerBreed.includes(key)) return value;
  }
  
  return breed;
}

// Get height category for display
export function getHeightCategory(heightCm: number): string {
  if (heightCm < 140) return "Pienhevonen";
  if (heightCm < 150) return "Pony-raja";
  if (heightCm < 160) return "Keskikokoinen";
  if (heightCm < 170) return "Iso";
  return "Hyvin iso";
}

// Scale factor based on height (for avatar sizing)
export function getHeightScale(heightCm: number): number {
  // Base 150cm = scale 1.0
  const baseHeight = 150;
  const scale = heightCm / baseHeight;
  
  // Clamp between 0.85 and 1.15 for visual consistency
  return Math.max(0.85, Math.min(1.15, scale));
}
