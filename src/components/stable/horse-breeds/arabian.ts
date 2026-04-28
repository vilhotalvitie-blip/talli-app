// Arabian sprite set - refined, dainty, dished face, high tail carriage
// Used for: Arabian, Paso Fino, Akhal-Teke, etc.

import { HorseSprite } from "./types";

export const arabianSprite: HorseSprite = {
  id: "arabian",
  name: "Arabian",
  nameFi: "Arabi",
  
  sprites: {
    // Side view facing right - refined, high neck, dished face
    0: `
      <!-- Body - refined, compact -->
      <ellipse cx="100" cy="108" rx="52" ry="26" fill="currentColor" />
      <!-- Chest/shoulder -->
      <path d="M 62 82 Q 52 95 58 110 L 72 105 Z" fill="currentColor" />
      <!-- Neck - high arched, refined -->
      <path d="M 58 85 Q 52 50 72 38 Q 82 32 95 42" 
            stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round" />
      <!-- Head - refined, dished face, small muzzle -->
      <ellipse cx="90" cy="35" rx="18" ry="11" fill="currentColor" transform="rotate(-20, 90, 35)" />
      <!-- Dish effect on nose -->
      <path d="M 85 30 Q 88 38 95 40" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5" />
      <!-- Ears - long, curved -->
      <path d="M 82 26 L 85 12 L 90 24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <path d="M 90 24 L 96 10 L 100 22" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <!-- Eye - large and expressive -->
      <circle cx="85" cy="32" r="2.5" fill="#1a1a1a" />
      <ellipse cx="85" cy="32" rx="4" ry="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3" />
      <!-- Nose/muzzle - small and refined -->
      <ellipse cx="105" cy="42" rx="6" ry="4" fill="currentColor" />
      <!-- Front leg (near) - refined -->
      <path d="M 68 120 L 70 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="70" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 74 120 L 77 158" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="77" cy="161" rx="3" ry="2" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 128 120 L 126 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="126" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 134 120 L 134 158" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="134" cy="161" rx="3" ry="2" fill="currentColor" />
      <!-- Tail - high carriage, flowing -->
      <path d="M 148 88 Q 165 75 160 110 Q 158 125 165 135" 
            stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" />
      <!-- Mane - flowing, long -->
      <path d="M 72 42 Q 65 55 68 78 Q 70 90 72 100" stroke="currentColor" stroke-width="4" fill="none" opacity="0.9" />
    `,
    
    // Front-right quarter
    45: `
      <!-- Body -->
      <ellipse cx="105" cy="110" rx="44" ry="28" fill="currentColor" />
      <!-- Chest -->
      <ellipse cx="82" cy="95" rx="24" ry="20" fill="currentColor" />
      <!-- Neck - high -->
      <path d="M 78 82 Q 74 60 82 45" 
            stroke="currentColor" stroke-width="13" fill="none" stroke-linecap="round" />
      <!-- Head - refined with dish -->
      <ellipse cx="86" cy="38" rx="15" ry="12" fill="currentColor" />
      <!-- Dished nose -->
      <path d="M 82 34 Q 85 40 92 42" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5" />
      <!-- Ears -->
      <path d="M 80 30 L 82 20 L 86 28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <path d="M 88 28 L 92 18 L 93 30" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="82" cy="36" r="2.5" fill="#1a1a1a" />
      <!-- Nostrils - small -->
      <ellipse cx="96" cy="44" rx="2.5" ry="3.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="100" cy="42" rx="2.5" ry="3" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs -->
      <path d="M 76 118 L 77 158" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="77" cy="161" rx="4" ry="2.5" fill="currentColor" />
      <path d="M 88 118 L 90 156" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="90" cy="159" rx="3" ry="2" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 132 118 L 130 155" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="130" cy="158" rx="3" ry="2" fill="currentColor" />
      <path d="M 140 118 L 140 153" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Tail - high -->
      <path d="M 145 95 Q 158 85 154 115" 
            stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 80 45 Q 76 58 78 75" stroke="currentColor" stroke-width="4" fill="none" opacity="0.9" />
    `,
    
    // Front view
    90: `
      <!-- Chest -->
      <ellipse cx="100" cy="90" rx="30" ry="26" fill="currentColor" />
      <!-- Neck - very high -->
      <path d="M 92 72 Q 88 52 96 35" 
            stroke="currentColor" stroke-width="16" fill="none" stroke-linecap="round" />
      <!-- Head - refined -->
      <ellipse cx="100" cy="28" rx="14" ry="12" fill="currentColor" />
      <!-- Dish profile -->
      <path d="M 95 24 Q 100 30 105 24" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5" />
      <!-- Ears - prominent -->
      <path d="M 90 18 L 88 8 L 94 16" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <path d="M 106 16 L 112 8 L 110 18" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" />
      <!-- Eyes - large -->
      <ellipse cx="92" cy="26" rx="3" ry="2.5" fill="#1a1a1a" />
      <ellipse cx="108" cy="26" rx="3" ry="2.5" fill="#1a1a1a" />
      <!-- Nostrils - small -->
      <ellipse cx="96" cy="34" rx="3" ry="4" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="104" cy="34" rx="3" ry="4" fill="rgba(0,0,0,0.3)" />
      <!-- Body -->
      <ellipse cx="100" cy="110" rx="26" ry="32" fill="currentColor" />
      <!-- Front legs -->
      <path d="M 88 120 L 88 165" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="88" cy="168" rx="4" ry="2.5" fill="currentColor" />
      <path d="M 112 120 L 112 165" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="112" cy="168" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 80 118 L 78 152" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M 120 118 L 122 152" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Tail - high center -->
      <path d="M 100 95 Q 95 88 100 78 Q 105 88 100 95" stroke="currentColor" stroke-width="8" fill="none" />
      <path d="M 100 78 Q 98 105 95 135" 
            stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" />
    `,
    
    // Front-left quarter
    135: `
      <!-- Body -->
      <ellipse cx="95" cy="110" rx="44" ry="28" fill="currentColor" />
      <!-- Chest -->
      <ellipse cx="118" cy="95" rx="24" ry="20" fill="currentColor" />
      <!-- Neck -->
      <path d="M 122 82 Q 126 60 118 45" 
            stroke="currentColor" stroke-width="13" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="114" cy="38" rx="15" ry="12" fill="currentColor" />
      <!-- Dish -->
      <path d="M 110 34 Q 113 40 118 42" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5" />
      <!-- Ears -->
      <path d="M 108 30 L 110 20 L 114 28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <path d="M 116 28 L 120 18 L 121 30" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="118" cy="36" r="2.5" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="104" cy="44" rx="2.5" ry="3.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="100" cy="42" rx="2.5" ry="3" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs -->
      <path d="M 124 118 L 123 158" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="123" cy="161" rx="4" ry="2.5" fill="currentColor" />
      <path d="M 112 118 L 110 156" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="110" cy="159" rx="3" ry="2" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 68 118 L 70 155" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="70" cy="158" rx="3" ry="2" fill="currentColor" />
      <path d="M 60 118 L 60 153" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 55 95 Q 42 85 46 115" 
            stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 120 45 Q 124 58 122 75" stroke="currentColor" stroke-width="4" fill="none" opacity="0.9" />
    `,
    
    // Side left
    180: `
      <!-- Body -->
      <ellipse cx="100" cy="108" rx="52" ry="26" fill="currentColor" />
      <!-- Chest/shoulder -->
      <path d="M 138 82 Q 148 95 142 110 L 128 105 Z" fill="currentColor" />
      <!-- Neck -->
      <path d="M 142 85 Q 148 50 128 38 Q 118 32 105 42" 
            stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="110" cy="35" rx="18" ry="11" fill="currentColor" transform="rotate(20, 110, 35)" />
      <!-- Dish -->
      <path d="M 115 30 Q 112 38 105 40" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5" />
      <!-- Ears -->
      <path d="M 118 26 L 115 12 L 110 24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <path d="M 110 24 L 104 10 L 100 22" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="115" cy="32" r="2.5" fill="#1a1a1a" />
      <ellipse cx="115" cy="32" rx="4" ry="3" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3" />
      <!-- Nose/muzzle -->
      <ellipse cx="95" cy="42" rx="6" ry="4" fill="currentColor" />
      <!-- Front leg (near) -->
      <path d="M 132 120 L 130 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="130" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 126 120 L 123 158" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="123" cy="161" rx="3" ry="2" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 72 120 L 74 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="74" cy="163" rx="4" ry="2.5" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 66 120 L 66 158" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="66" cy="161" rx="3" ry="2" fill="currentColor" />
      <!-- Tail -->
      <path d="M 52 88 Q 35 75 40 110 Q 42 125 35 135" 
            stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 128 42 Q 135 55 132 78 Q 130 90 128 100" stroke="currentColor" stroke-width="4" fill="none" opacity="0.9" />
    `,
    
    // Back-left quarter
    225: `
      <!-- Rump/body -->
      <ellipse cx="88" cy="110" rx="42" ry="32" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="72" cy="95" rx="22" ry="18" fill="currentColor" />
      <!-- Tail - high -->
      <path d="M 58 82 Q 48 72 42 100 Q 38 115 32 125" 
            stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 62 118 L 60 150" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Near back leg -->
      <path d="M 78 118 L 78 155" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="78" cy="158" rx="3.5" ry="2.5" fill="currentColor" />
      <!-- Body -->
      <ellipse cx="118" cy="115" rx="30" ry="26" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 140 115 L 138 148" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 128 115 L 126 150" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="126" cy="153" rx="3" ry="2" fill="currentColor" />
    `,
    
    // Back view
    270: `
      <!-- Rump/rear -->
      <ellipse cx="100" cy="100" rx="35" ry="30" fill="currentColor" />
      <!-- Tail base - high -->
      <ellipse cx="100" cy="82" rx="14" ry="10" fill="currentColor" />
      <!-- Tail - flowing down from high point -->
      <path d="M 100 74 Q 95 66 100 58 Q 105 66 100 74" stroke="currentColor" stroke-width="7" fill="none" />
      <path d="M 100 58 Q 97 85 93 125" 
            stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" />
      <!-- Body -->
      <ellipse cx="100" cy="115" rx="24" ry="28" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 85 120 L 85 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="85" cy="163" rx="3.5" ry="2.5" fill="currentColor" />
      <path d="M 115 120 L 115 160" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="115" cy="163" rx="3.5" ry="2.5" fill="currentColor" />
      <!-- Front legs -->
      <path d="M 90 118 L 90 150" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <path d="M 110 118 L 110 150" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
    `,
    
    // Back-right quarter
    315: `
      <!-- Rump/body -->
      <ellipse cx="112" cy="110" rx="42" ry="32" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="128" cy="95" rx="22" ry="18" fill="currentColor" />
      <!-- Tail - high -->
      <path d="M 142 82 Q 152 72 158 100 Q 162 115 168 125" 
            stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 138 118 L 140 150" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <!-- Near back leg -->
      <path d="M 122 118 L 122 155" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="122" cy="158" rx="3.5" ry="2.5" fill="currentColor" />
      <!-- Body -->
      <ellipse cx="82" cy="115" rx="30" ry="26" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 60 115 L 62 148" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 72 115 L 74 150" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="74" cy="153" rx="3" ry="2" fill="currentColor" />
    `,
  },
  
  proportions: {
    neckLength: 1.25,    // High, arched neck
    bodyLength: 0.85,     // Compact
    legLength: 1.05,      // Slightly longer, refined
    headSize: 0.9,        // Refined, smaller head
  },
};
