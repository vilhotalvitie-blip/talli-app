// Types for horse breed sprites
// Each breed has 8 angles: 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°
// 0° = side view facing right (full profile)
// 90° = front view facing camera
// 180° = side view facing left (full profile)
// 270° = back view

export interface HorseSprite {
  id: string;
  name: string;
  nameFi: string;
  // SVG path data for each angle
  // Using viewBox 200x200, centered at 100,100
  sprites: {
    0: string;   // Side right
    45: string;  // Front-right quarter
    90: string;  // Front
    135: string; // Front-left quarter
    180: string; // Side left (mirrored from 0)
    225: string; // Back-left quarter
    270: string; // Back
    315: string; // Back-right quarter
  };
  // Default proportions for this breed type
  proportions: {
    neckLength: number;  // 0.8-1.2 relative
    bodyLength: number;  // 0.9-1.3 relative
    legLength: number;   // 0.8-1.1 relative
    headSize: number;     // 0.8-1.2 relative
  };
}

// Map of breed keywords to sprite IDs
export const breedKeywords: Record<string, string> = {
  // Ponies
  suomenpienhevonen: "pony",
  shetland: "pony",
  welsh: "pony",
  shettis: "pony",
  pony: "pony",
  
  // Draught/coldblood
  jyrkkä: "draught",
  raskas: "draught",
  clydesdale: "draught",
  shire: "draught",
  percheron: "draught",
  
  // Arabian/light
  arabian: "arabian",
  arabi: "arabian",
  paso: "arabian",
  fino: "arabian",
  akhalteke: "arabian",
  
  // Warmblood (default)
  suomenhevonen: "warmblood",
  lämminverinen: "warmblood",
  kwpn: "warmblood",
  holstein: "warmblood",
  oldenburg: "warmblood",
  hanoverian: "warmblood",
  englantilainen: "warmblood",
  thoroughbred: "warmblood",
  puoliverinen: "warmblood",
  connemara: "warmblood",
  newforest: "warmblood",
  
  // Default fallback
  default: "warmblood",
};

export function getBreedSpriteId(breedName: string): string {
  const normalized = breedName.toLowerCase().trim();
  
  // Direct keyword match
  for (const [keyword, spriteId] of Object.entries(breedKeywords)) {
    if (normalized.includes(keyword)) {
      return spriteId;
    }
  }
  
  return "warmblood"; // Default
}
