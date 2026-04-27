// Horse color mappings (Finnish terminology)
export interface HorseColorScheme {
  body: string;
  mane: string;
  tail: string;
  hoof: string;
  pattern?: string;
  baseBody?: string;
}

export const horseColors: Record<string, HorseColorScheme> = {
  // Chestnut - reddish brown body, matching mane/tail
  rautias: {
    body: '#A0522D',
    mane: '#8B4513',
    tail: '#8B4513',
    hoof: '#3d2817',
  },
  // Bay - brown body, black mane/tail/legs
  ruunikko: {
    body: '#8B6914',
    mane: '#1a1a1a',
    tail: '#1a1a1a',
    hoof: '#1a1a1a',
  },
  // Black - solid black
  musta: {
    body: '#1a1a1a',
    mane: '#0d0d0d',
    tail: '#0d0d0d',
    hoof: '#0d0d0d',
  },
  // Gray/Dapple - gray body with lighter mane/tail
  hallakko: {
    body: '#a0a0a0',
    mane: '#d0d0d0',
    tail: '#d0d0d0',
    hoof: '#404040',
  },
  // Buckskin/Palomino - golden body, cream/white mane/tail
  kimppu: {
    body: '#d4a574',
    mane: '#f5f5dc',
    tail: '#f5f5dc',
    hoof: '#3d2817',
  },
  // White - white/light gray
  valkea: {
    body: '#f5f5f5',
    mane: '#e0e0e0',
    tail: '#e0e0e0',
    hoof: '#808080',
  },
  // Pinto/Piebald - spotted pattern (simplified as chestnut with white patches)
  kirjava: {
    body: '#fff',
    baseBody: '#A0522D',
    mane: '#1a1a1a',
    tail: '#1a1a1a',
    hoof: '#3d2817',
    pattern: 'spotted',
  },
};

// Default color (chestnut)
export const defaultColor: HorseColorScheme = horseColors["rautias"]!;

// Breed proportions for SVG path modifications
export interface BreedProportions {
  legLength: number;    // Multiplier for leg height
  neckLength: number;   // Multiplier for neck length
  bodyWidth: number;    // Multiplier for body thickness
  headSize: number;     // Multiplier for head size
  bodyLength: number;   // Multiplier for body length
}

export const breedProportions: Record<string, BreedProportions> = {
  // Finnish horse - stocky, shorter neck, muscular
  suomenpienhevonen: {
    legLength: 0.9,
    neckLength: 0.85,
    bodyWidth: 1.15,
    headSize: 1.05,
    bodyLength: 0.95,
  },
  // Thoroughbred - slender, long legs, refined head
  englantilainen: {
    legLength: 1.15,
    neckLength: 1.1,
    bodyWidth: 0.85,
    headSize: 0.9,
    bodyLength: 1.05,
  },
  // Shetland pony - compact, short legs, round body
  shetlanninponi: {
    legLength: 0.65,
    neckLength: 0.75,
    bodyWidth: 1.25,
    headSize: 1.1,
    bodyLength: 0.85,
  },
  // Generic/Warmblood - balanced proportions
  generic: {
    legLength: 1,
    neckLength: 1,
    bodyWidth: 1,
    headSize: 1,
    bodyLength: 1,
  },
};

// Size scaling based on height (säkäkorkeus in cm)
// Range: 80cm (mini) to 180cm (large warmblood)
export function calculateScale(heightCm: number): number {
  const minHeight = 80;
  const maxHeight = 180;
  const minScale = 0.6;
  const maxScale = 1.3;
  
  const clampedHeight = Math.max(minHeight, Math.min(maxHeight, heightCm));
  const normalized = (clampedHeight - minHeight) / (maxHeight - minHeight);
  return minScale + (normalized * (maxScale - minScale));
}

// Weight influence on body width (subtle)
// Range: 200kg (small pony) to 700kg (large horse)
export function calculateWeightFactor(weightKg: number): number {
  const minWeight = 200;
  const maxWeight = 700;
  const minFactor = 0.95;
  const maxFactor = 1.1;
  
  const clampedWeight = Math.max(minWeight, Math.min(maxWeight, weightKg));
  const normalized = (clampedWeight - minWeight) / (maxWeight - minWeight);
  return minFactor + (normalized * (maxFactor - minFactor));
}

// Match breed name to proportions
export function getBreedProportions(breedName: string): BreedProportions {
  const normalizedBreed = breedName.toLowerCase().trim();
  
  // Check for Finnish breed
  if (normalizedBreed.includes('suomen') || normalizedBreed.includes('finn')) {
    return breedProportions["suomenpienhevonen"]!;
  }
  
  // Check for Thoroughbred/English fullblood
  if (normalizedBreed.includes('englantilainen') || normalizedBreed.includes('thoroughbred')) {
    return breedProportions["englantilainen"]!;
  }
  
  // Check for Shetland
  if (normalizedBreed.includes('shetland') || normalizedBreed.includes('shettis')) {
    return breedProportions["shetlanninponi"]!;
  }
  
  // Check for other common breeds that map to similar proportions
  if (normalizedBreed.includes('poni') || normalizedBreed.includes('pony')) {
    return breedProportions["shetlanninponi"]!;
  }
  
  if (normalizedBreed.includes('arabian') || normalizedBreed.includes('trakehner')) {
    return breedProportions["englantilainen"]!;
  }
  
  // Default
  return breedProportions["generic"]!;
}

// Match color name to color scheme
export function getHorseColor(colorName: string): HorseColorScheme {
  const normalizedColor = colorName.toLowerCase().trim();
  
  // Direct matches
  const directMatch = horseColors[normalizedColor];
  if (directMatch) {
    return directMatch;
  }
  
  // Partial matches for Finnish colors
  if (normalizedColor.includes('rautias') || normalizedColor.includes('chestnut')) {
    return horseColors["rautias"]!;
  }
  if (normalizedColor.includes('ruunikko') || normalizedColor.includes('bay')) {
    return horseColors["ruunikko"]!;
  }
  if (normalizedColor.includes('musta') || normalizedColor.includes('black')) {
    return horseColors["musta"]!;
  }
  if (normalizedColor.includes('hallakko') || normalizedColor.includes('gray') || normalizedColor.includes('grey')) {
    return horseColors["hallakko"]!;
  }
  if (normalizedColor.includes('kimppu') || normalizedColor.includes('buckskin') || normalizedColor.includes('palomino')) {
    return horseColors["kimppu"]!;
  }
  if (normalizedColor.includes('valkea') || normalizedColor.includes('white')) {
    return horseColors["valkea"]!;
  }
  if (normalizedColor.includes('kirjava') || normalizedColor.includes('pinto') || normalizedColor.includes('piebald')) {
    return horseColors["kirjava"]!;
  }
  
  // Default to chestnut
  return defaultColor;
}
