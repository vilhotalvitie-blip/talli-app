// Pony sprite set - compact, sturdy build with shorter legs
// Used for: Suomenpienhevonen, Shetland, Welsh, etc.

import { HorseSprite } from "./types";

export const ponySprite: HorseSprite = {
  id: "pony",
  name: "Pony",
  nameFi: "Pienhevonen",
  
  sprites: {
    // Side view facing right - sturdy, compact
    0: `
      <!-- Body - rounder and more compact -->
      <ellipse cx="100" cy="115" rx="50" ry="32" fill="currentColor" />
      <!-- Chest/shoulder - thick -->
      <path d="M 65 90 Q 52 105 58 120 L 72 115 Z" fill="currentColor" />
      <!-- Neck - short and thick -->
      <path d="M 58 95 Q 55 70 72 58 Q 80 54 90 60" 
            stroke="currentColor" stroke-width="20" fill="none" stroke-linecap="round" />
      <!-- Head - larger relative to body, dished face -->
      <ellipse cx="85" cy="52" rx="18" ry="14" fill="currentColor" transform="rotate(-10, 85, 52)" />
      <!-- Ears - small and round -->
      <path d="M 76 44 L 79 35 L 83 42" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <path d="M 84 42 L 88 33 L 91 42" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="80" cy="52" r="2.5" fill="#1a1a1a" />
      <!-- Nose/muzzle - fluffy -->
      <ellipse cx="98" cy="56" rx="9" ry="6" fill="currentColor" />
      <!-- Front leg (near) - short and thick -->
      <path d="M 68 135 L 70 168" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="70" cy="171" rx="6" ry="3.5" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 75 135 L 78 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="78" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 128 135 L 126 168" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="126" cy="171" rx="6" ry="3.5" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 133 135 L 133 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="133" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Tail - thick and full -->
      <path d="M 145 100 Q 162 105 158 135 Q 155 148 160 158" 
            stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" />
      <!-- Mane - thick and shaggy -->
      <path d="M 72 62 Q 66 75 68 95" stroke="currentColor" stroke-width="8" fill="none" opacity="0.95" />
    `,
    
    // Front-right quarter
    45: `
      <!-- Body -->
      <ellipse cx="105" cy="118" rx="42" ry="35" fill="currentColor" />
      <!-- Chest - thick -->
      <ellipse cx="82" cy="102" rx="28" ry="25" fill="currentColor" />
      <!-- Neck - short and thick -->
      <path d="M 78 88 Q 74 70 82 58" 
            stroke="currentColor" stroke-width="18" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="86" cy="50" rx="16" ry="15" fill="currentColor" />
      <!-- Ears -->
      <path d="M 80 42 L 82 33 L 86 40" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <path d="M 88 40 L 92 32 L 93 42" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="83" cy="50" r="2.5" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="96" cy="56" rx="3.5" ry="4.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="101" cy="54" rx="3.5" ry="4" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs - thick -->
      <path d="M 75 138 L 76 173" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="76" cy="176" rx="5.5" ry="3.5" fill="currentColor" />
      <path d="M 88 138 L 91 170" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="91" cy="173" rx="4.5" ry="3" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 132 135 L 130 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="130" cy="168" rx="4.5" ry="3" fill="currentColor" />
      <path d="M 140 135 L 140 162" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 142 103 Q 155 108 152 138" 
            stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 80 58 Q 76 72 78 88" stroke="currentColor" stroke-width="7" fill="none" opacity="0.95" />
    `,
    
    // Front view
    90: `
      <!-- Chest - very thick -->
      <ellipse cx="100" cy="98" rx="38" ry="32" fill="currentColor" />
      <!-- Neck -->
      <path d="M 92 78 Q 88 60 96 48" 
            stroke="currentColor" stroke-width="22" fill="none" stroke-linecap="round" />
      <!-- Head - round and cute -->
      <ellipse cx="100" cy="38" rx="18" ry="16" fill="currentColor" />
      <!-- Ears - small -->
      <path d="M 88 26 L 86 16 L 94 24" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <path d="M 106 24 L 114 16 L 112 26" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <!-- Eyes -->
      <ellipse cx="90" cy="36" rx="3" ry="2.5" fill="#1a1a1a" />
      <ellipse cx="110" cy="36" rx="3" ry="2.5" fill="#1a1a1a" />
      <!-- Nostrils - larger for pony -->
      <ellipse cx="94" cy="44" rx="5" ry="6" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="106" cy="44" rx="5" ry="6" fill="rgba(0,0,0,0.3)" />
      <!-- Body -->
      <ellipse cx="100" cy="118" rx="32" ry="38" fill="currentColor" />
      <!-- Front legs - thick -->
      <path d="M 85 130 L 85 175" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
      <ellipse cx="85" cy="178" rx="6.5" ry="3.5" fill="currentColor" />
      <path d="M 115 130 L 115 175" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
      <ellipse cx="115" cy="178" rx="6.5" ry="3.5" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 75 125 L 73 162" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <path d="M 125 125 L 127 162" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 100 105 Q 100 115 100 145" 
            stroke="currentColor" stroke-width="11" fill="none" stroke-linecap="round" />
    `,
    
    // Front-left quarter
    135: `
      <!-- Body -->
      <ellipse cx="95" cy="118" rx="42" ry="35" fill="currentColor" />
      <!-- Chest -->
      <ellipse cx="118" cy="102" rx="28" ry="25" fill="currentColor" />
      <!-- Neck -->
      <path d="M 122 88 Q 126 70 118 58" 
            stroke="currentColor" stroke-width="18" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="114" cy="50" rx="16" ry="15" fill="currentColor" />
      <!-- Ears -->
      <path d="M 108 42 L 110 33 L 114 40" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <path d="M 116 40 L 120 32 L 121 42" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="117" cy="50" r="2.5" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="104" cy="56" rx="3.5" ry="4.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="99" cy="54" rx="3.5" ry="4" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs -->
      <path d="M 125 138 L 124 173" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="124" cy="176" rx="5.5" ry="3.5" fill="currentColor" />
      <path d="M 112 138 L 109 170" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="109" cy="173" rx="4.5" ry="3" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 68 135 L 70 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="70" cy="168" rx="4.5" ry="3" fill="currentColor" />
      <path d="M 60 135 L 60 162" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 58 103 Q 45 108 48 138" 
            stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 120 58 Q 124 72 122 88" stroke="currentColor" stroke-width="7" fill="none" opacity="0.95" />
    `,
    
    // Side left
    180: `
      <!-- Body -->
      <ellipse cx="100" cy="115" rx="50" ry="32" fill="currentColor" />
      <!-- Chest/shoulder -->
      <path d="M 135 90 Q 148 105 142 120 L 128 115 Z" fill="currentColor" />
      <!-- Neck -->
      <path d="M 142 95 Q 145 70 128 58 Q 120 54 110 60" 
            stroke="currentColor" stroke-width="20" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="115" cy="52" rx="18" ry="14" fill="currentColor" transform="rotate(10, 115, 52)" />
      <!-- Ears -->
      <path d="M 124 44 L 121 35 L 117 42" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <path d="M 116 42 L 112 33 L 109 42" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="120" cy="52" r="2.5" fill="#1a1a1a" />
      <!-- Nose/muzzle -->
      <ellipse cx="102" cy="56" rx="9" ry="6" fill="currentColor" />
      <!-- Front leg (near) -->
      <path d="M 132 135 L 130 168" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="130" cy="171" rx="6" ry="3.5" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 125 135 L 122 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="122" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 72 135 L 74 168" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="74" cy="171" rx="6" ry="3.5" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 67 135 L 67 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="67" cy="168" rx="5" ry="3" fill="currentColor" />
      <!-- Tail -->
      <path d="M 55 100 Q 38 105 42 135 Q 45 148 40 158" 
            stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 128 62 Q 134 75 132 95" stroke="currentColor" stroke-width="8" fill="none" opacity="0.95" />
    `,
    
    // Back-left quarter
    225: `
      <!-- Rump/body -->
      <ellipse cx="88" cy="112" rx="45" ry="38" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="72" cy="98" rx="24" ry="20" fill="currentColor" />
      <!-- Tail - very prominent for pony -->
      <path d="M 55 88 Q 44 82 38 112 Q 35 125 30 135" 
            stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 68 135 L 66 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="66" cy="168" rx="4.5" ry="3" fill="currentColor" />
      <!-- Near back leg -->
      <path d="M 85 135 L 85 170" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <ellipse cx="85" cy="173" rx="5.5" ry="3.5" fill="currentColor" />
      <!-- Body -->
      <ellipse cx="118" cy="118" rx="32" ry="30" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 140 130 L 138 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 128 130 L 126 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="126" cy="168" rx="4.5" ry="3" fill="currentColor" />
    `,
    
    // Back view
    270: `
      <!-- Rump/rear -->
      <ellipse cx="100" cy="102" rx="42" ry="35" fill="currentColor" />
      <!-- Tail base -->
      <ellipse cx="100" cy="88" rx="18" ry="12" fill="currentColor" />
      <!-- Tail - thick -->
      <path d="M 100 80 Q 94 72 100 62 Q 106 72 100 80" stroke="currentColor" stroke-width="14" fill="none" />
      <path d="M 100 62 Q 96 95 92 135" 
            stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round" />
      <!-- Body -->
      <ellipse cx="100" cy="118" rx="30" ry="35" fill="currentColor" />
      <!-- Back legs - thick -->
      <path d="M 82 130 L 82 173" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="82" cy="176" rx="6" ry="3.5" fill="currentColor" />
      <path d="M 118 130 L 118 173" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="118" cy="176" rx="6" ry="3.5" fill="currentColor" />
      <!-- Front legs -->
      <path d="M 88 125 L 88 162" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <path d="M 112 125 L 112 162" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
    `,
    
    // Back-right quarter
    315: `
      <!-- Rump/body -->
      <ellipse cx="112" cy="112" rx="45" ry="38" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="128" cy="98" rx="24" ry="20" fill="currentColor" />
      <!-- Tail -->
      <path d="M 145 88 Q 156 82 162 112 Q 165 125 170 135" 
            stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 132 135 L 134 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="134" cy="168" rx="4.5" ry="3" fill="currentColor" />
      <!-- Near back leg -->
      <path d="M 115 135 L 115 170" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <ellipse cx="115" cy="173" rx="5.5" ry="3.5" fill="currentColor" />
      <!-- Body -->
      <ellipse cx="82" cy="118" rx="32" ry="30" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 60 130 L 62 160" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 72 130 L 74 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <ellipse cx="74" cy="168" rx="4.5" ry="3" fill="currentColor" />
    `,
  },
  
  proportions: {
    neckLength: 0.75,    // Shorter neck
    bodyLength: 0.9,     // More compact
    legLength: 0.8,      // Shorter legs
    headSize: 1.15,      // Bigger head relative to body
  },
};
