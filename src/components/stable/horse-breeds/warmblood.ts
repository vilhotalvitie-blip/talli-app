// Warmblood sprite set - athletic, refined build
// Used for: Suomenhevonen, Englantilainen täysiverinen, Lämminveriset

import { HorseSprite } from "./types";

export const warmbloodSprite: HorseSprite = {
  id: "warmblood",
  name: "Warmblood",
  nameFi: "Lämminsverinen",
  
  sprites: {
    // Side view facing right - full profile
    0: `
      <!-- Body -->
      <ellipse cx="100" cy="110" rx="55" ry="28" fill="currentColor" />
      <!-- Chest/shoulder -->
      <path d="M 65 85 Q 55 100 60 115 L 75 110 Z" fill="currentColor" />
      <!-- Neck -->
      <path d="M 60 90 Q 55 60 75 45 Q 85 40 95 48" 
            stroke="currentColor" stroke-width="18" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="85" cy="38" rx="20" ry="12" fill="currentColor" transform="rotate(-15, 85, 38)" />
      <!-- Ears -->
      <path d="M 75 30 L 78 20 L 82 28" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <path d="M 82 28 L 88 18 L 92 28" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="78" cy="38" r="2" fill="#1a1a1a" />
      <!-- Nose/muzzle -->
      <ellipse cx="100" cy="42" rx="8" ry="5" fill="currentColor" />
      <!-- Front leg (near) -->
      <path d="M 70 125 L 72 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="72" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 75 125 L 78 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="78" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 130 125 L 128 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="128" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 135 125 L 135 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="135" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Tail -->
      <path d="M 150 95 Q 165 100 162 130 Q 160 145 165 155" 
            stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 75 50 Q 70 65 72 85" stroke="currentColor" stroke-width="6" fill="none" opacity="0.9" />
    `,
    
    // Front-right quarter view (45°)
    45: `
      <!-- Body (foreshortened) -->
      <ellipse cx="105" cy="115" rx="45" ry="32" fill="currentColor" />
      <!-- Chest -->
      <ellipse cx="80" cy="100" rx="25" ry="22" fill="currentColor" />
      <!-- Neck -->
      <path d="M 75 85 Q 70 65 80 50" 
            stroke="currentColor" stroke-width="16" fill="none" stroke-linecap="round" />
      <!-- Head - angled -->
      <ellipse cx="85" cy="42" rx="18" ry="14" fill="currentColor" />
      <!-- Ears -->
      <path d="M 78 35 L 80 25 L 84 32" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <path d="M 85 32 L 90 22 L 92 32" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="82" cy="42" r="2.5" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="95" cy="48" rx="3" ry="4" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="100" cy="46" rx="3" ry="3.5" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs (both visible, near more prominent) -->
      <path d="M 75 125 L 76 165" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <ellipse cx="76" cy="168" rx="5" ry="3" fill="currentColor" />
      <path d="M 85 125 L 88 162" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="88" cy="165" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 135 125 L 133 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="133" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <path d="M 142 125 L 142 158" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 145 100 Q 158 105 155 135" 
            stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 78 50 Q 74 65 76 80" stroke="currentColor" stroke-width="6" fill="none" opacity="0.9" />
    `,
    
    // Front view (90°)
    90: `
      <!-- Chest -->
      <ellipse cx="100" cy="95" rx="35" ry="30" fill="currentColor" />
      <!-- Neck -->
      <path d="M 90 75 Q 85 55 95 40" 
            stroke="currentColor" stroke-width="20" fill="none" stroke-linecap="round" />
      <!-- Head - facing forward -->
      <ellipse cx="100" cy="32" rx="16" ry="18" fill="currentColor" />
      <!-- Ears -->
      <path d="M 90 18 L 88 8 L 96 16" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <path d="M 104 16 L 112 8 L 110 18" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <!-- Eyes -->
      <ellipse cx="90" cy="30" rx="3" ry="2.5" fill="#1a1a1a" />
      <ellipse cx="110" cy="30" rx="3" ry="2.5" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="94" cy="38" rx="4" ry="5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="106" cy="38" rx="4" ry="5" fill="rgba(0,0,0,0.3)" />
      <!-- Body (behind chest) -->
      <ellipse cx="100" cy="115" rx="30" ry="35" fill="currentColor" />
      <!-- Front legs -->
      <path d="M 85 125 L 85 170" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="85" cy="173" rx="6" ry="3" fill="currentColor" />
      <path d="M 115 125 L 115 170" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="115" cy="173" rx="6" ry="3" fill="currentColor" />
      <!-- Back legs (behind body) -->
      <path d="M 75 120 L 73 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <path d="M 125 120 L 127 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <!-- Tail (center back) -->
      <path d="M 100 100 Q 100 110 100 140" 
            stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" />
    `,
    
    // Front-left quarter (135°) - mirror of 45°
    135: `
      <!-- Body (foreshortened) -->
      <ellipse cx="95" cy="115" rx="45" ry="32" fill="currentColor" />
      <!-- Chest -->
      <ellipse cx="120" cy="100" rx="25" ry="22" fill="currentColor" />
      <!-- Neck -->
      <path d="M 125 85 Q 130 65 120 50" 
            stroke="currentColor" stroke-width="16" fill="none" stroke-linecap="round" />
      <!-- Head - angled -->
      <ellipse cx="115" cy="42" rx="18" ry="14" fill="currentColor" />
      <!-- Ears -->
      <path d="M 108 35 L 110 25 L 114 32" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <path d="M 115 32 L 120 22 L 122 32" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="118" cy="42" r="2.5" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="105" cy="48" rx="3" ry="4" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="100" cy="46" rx="3" ry="3.5" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs -->
      <path d="M 125 125 L 124 165" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <ellipse cx="124" cy="168" rx="5" ry="3" fill="currentColor" />
      <path d="M 115 125 L 112 162" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="112" cy="165" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 65 125 L 67 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="67" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <path d="M 58 125 L 58 158" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 55 100 Q 42 105 45 135" 
            stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 122 50 Q 126 65 124 80" stroke="currentColor" stroke-width="6" fill="none" opacity="0.9" />
    `,
    
    // Side left (180°) - mirrored from 0°
    180: `
      <!-- Body -->
      <ellipse cx="100" cy="110" rx="55" ry="28" fill="currentColor" />
      <!-- Chest/shoulder -->
      <path d="M 135 85 Q 145 100 140 115 L 125 110 Z" fill="currentColor" />
      <!-- Neck -->
      <path d="M 140 90 Q 145 60 125 45 Q 115 40 105 48" 
            stroke="currentColor" stroke-width="18" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="115" cy="38" rx="20" ry="12" fill="currentColor" transform="rotate(15, 115, 38)" />
      <!-- Ears -->
      <path d="M 125 30 L 122 20 L 118 28" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <path d="M 118 28 L 112 18 L 108 28" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="122" cy="38" r="2" fill="#1a1a1a" />
      <!-- Nose/muzzle -->
      <ellipse cx="100" cy="42" rx="8" ry="5" fill="currentColor" />
      <!-- Front leg (near) -->
      <path d="M 130 125 L 128 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="128" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 125 125 L 122 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="122" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 70 125 L 72 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="72" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 65 125 L 65 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="65" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Tail -->
      <path d="M 50 95 Q 35 100 38 130 Q 40 145 35 155" 
            stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 125 50 Q 130 65 128 85" stroke="currentColor" stroke-width="6" fill="none" opacity="0.9" />
    `,
    
    // Back-left quarter (225°)
    225: `
      <!-- Rump/body -->
      <ellipse cx="90" cy="110" rx="48" ry="35" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="75" cy="95" rx="22" ry="18" fill="currentColor" />
      <!-- Tail (prominent) -->
      <path d="M 60 85 Q 50 80 45 110 Q 42 125 38 135" 
            stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 70 125 L 68 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="68" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Near back leg -->
      <path d="M 85 125 L 85 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="85" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Body continues forward -->
      <ellipse cx="115" cy="115" rx="35" ry="28" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 135 125 L 133 158" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 125 125 L 123 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="123" cy="163" rx="4" ry="2.5" fill="currentColor" />
    `,
    
    // Back view (270°)
    270: `
      <!-- Rump/rear -->
      <ellipse cx="100" cy="100" rx="38" ry="32" fill="currentColor" />
      <!-- Tail base -->
      <ellipse cx="100" cy="85" rx="15" ry="10" fill="currentColor" />
      <!-- Tail -->
      <path d="M 100 78 Q 95 70 100 60 Q 105 70 100 78" stroke="currentColor" stroke-width="12" fill="none" />
      <path d="M 100 60 Q 98 90 95 130" 
            stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" />
      <!-- Body -->
      <ellipse cx="100" cy="115" rx="28" ry="32" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 85 125 L 85 168" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <ellipse cx="85" cy="171" rx="5.5" ry="3" fill="currentColor" />
      <path d="M 115 125 L 115 168" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <ellipse cx="115" cy="171" rx="5.5" ry="3" fill="currentColor" />
      <!-- Front legs (further away, smaller) -->
      <path d="M 90 120 L 90 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <path d="M 110 120 L 110 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
    `,
    
    // Back-right quarter (315°)
    315: `
      <!-- Rump/body -->
      <ellipse cx="110" cy="110" rx="48" ry="35" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="125" cy="95" rx="22" ry="18" fill="currentColor" />
      <!-- Tail (prominent) -->
      <path d="M 140 85 Q 150 80 155 110 Q 158 125 162 135" 
            stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 130 125 L 132 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="132" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Near back leg -->
      <path d="M 115 125 L 115 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="115" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Body continues forward -->
      <ellipse cx="85" cy="115" rx="35" ry="28" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 65 125 L 67 158" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 75 125 L 77 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="77" cy="163" rx="4" ry="2.5" fill="currentColor" />
    `,
  },
  
  proportions: {
    neckLength: 1.0,
    bodyLength: 1.0,
    legLength: 1.0,
    headSize: 1.0,
  },
};
