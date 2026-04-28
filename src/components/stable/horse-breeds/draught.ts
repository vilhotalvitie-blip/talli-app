// Draught/Coldblood sprite set - heavy, muscular build with thick legs
// Used for: Jyrkät, Clydesdale, Shire, etc.

import { HorseSprite } from "./types";

export const draughtSprite: HorseSprite = {
  id: "draught",
  name: "Draught Horse",
  nameFi: "Raskasrotu",
  
  sprites: {
    // Side view facing right - massive, muscular
    0: `
      <!-- Body - very deep and wide -->
      <ellipse cx="100" cy="112" rx="58" ry="36" fill="currentColor" />
      <!-- Chest/shoulder - massive -->
      <path d="M 62 82 Q 48 98 55 118 L 70 112 Z" fill="currentColor" />
      <!-- Neck - short, thick, muscular -->
      <path d="M 55 92 Q 52 68 68 55 Q 78 50 90 58" 
            stroke="currentColor" stroke-width="24" fill="none" stroke-linecap="round" />
      <!-- Head - large, noble, straight profile -->
      <ellipse cx="88" cy="50" rx="22" ry="15" fill="currentColor" transform="rotate(-8, 88, 50)" />
      <!-- Ears - medium, straight -->
      <path d="M 78 42 L 81 30 L 86 40" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <path d="M 86 40 L 92 28 L 96 40" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="82" cy="50" r="3" fill="#1a1a1a" />
      <!-- Nose/muzzle - large -->
      <ellipse cx="105" cy="55" rx="11" ry="7" fill="currentColor" />
      <!-- Front leg (near) - very thick with feathering implied -->
      <path d="M 65 138 L 67 175" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
      <ellipse cx="67" cy="178" rx="7" ry="4" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 72 138 L 75 172" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="75" cy="175" rx="6" ry="3.5" fill="currentColor" />
      <!-- Back leg (near) - thick -->
      <path d="M 130 138 L 128 175" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
      <ellipse cx="128" cy="178" rx="7" ry="4" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 138 138 L 138 172" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="138" cy="175" rx="6" ry="3.5" fill="currentColor" />
      <!-- Tail - thick, not too long -->
      <path d="M 152 95 Q 170 100 165 130 Q 162 145 168 155" 
            stroke="currentColor" stroke-width="11" fill="none" stroke-linecap="round" />
      <!-- Mane - short/thick -->
      <path d="M 68 58 Q 62 72 64 92" stroke="currentColor" stroke-width="10" fill="none" opacity="0.9" />
    `,
    
    // Front-right quarter
    45: `
      <!-- Body -->
      <ellipse cx="108" cy="115" rx="48" ry="38" fill="currentColor" />
      <!-- Chest - massive -->
      <ellipse cx="82" cy="98" rx="32" ry="28" fill="currentColor" />
      <!-- Neck -->
      <path d="M 76 85 Q 72 68 82 55" 
            stroke="currentColor" stroke-width="22" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="88" cy="48" rx="20" ry="16" fill="currentColor" />
      <!-- Ears -->
      <path d="M 80 38 L 82 28 L 88 36" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <path d="M 90 36 L 96 26 L 98 38" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="84" cy="48" r="3" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="100" cy="55" rx="4.5" ry="5.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="106" cy="53" rx="4.5" ry="5" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs - massive -->
      <path d="M 72 140 L 73 180" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
      <ellipse cx="73" cy="183" rx="6" ry="4" fill="currentColor" />
      <path d="M 88 140 L 91 178" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
      <ellipse cx="91" cy="181" rx="5" ry="3.5" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 138 138 L 136 172" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="136" cy="175" rx="5" ry="3.5" fill="currentColor" />
      <path d="M 148 138 L 148 170" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 150 100 Q 165 105 160 135" 
            stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 80 55 Q 75 70 77 88" stroke="currentColor" stroke-width="9" fill="none" opacity="0.9" />
    `,
    
    // Front view
    90: `
      <!-- Chest - extremely wide -->
      <ellipse cx="100" cy="95" rx="42" ry="35" fill="currentColor" />
      <!-- Neck -->
      <path d="M 90 75 Q 86 58 95 45" 
            stroke="currentColor" stroke-width="26" fill="none" stroke-linecap="round" />
      <!-- Head - large, noble -->
      <ellipse cx="100" cy="38" rx="20" ry="17" fill="currentColor" />
      <!-- Ears -->
      <path d="M 86 25 L 84 15 L 92 23" stroke="currentColor" stroke-width="4.5" fill="none" stroke-linejoin="round" />
      <path d="M 108 23 L 116 15 L 114 25" stroke="currentColor" stroke-width="4.5" fill="none" stroke-linejoin="round" />
      <!-- Eyes -->
      <ellipse cx="88" cy="35" rx="3.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="112" cy="35" rx="3.5" ry="3" fill="#1a1a1a" />
      <!-- Nostrils - large -->
      <ellipse cx="93" cy="44" rx="5.5" ry="6.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="107" cy="44" rx="5.5" ry="6.5" fill="rgba(0,0,0,0.3)" />
      <!-- Body -->
      <ellipse cx="100" cy="118" rx="35" ry="40" fill="currentColor" />
      <!-- Front legs - massive -->
      <path d="M 82 132 L 82 182" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
      <ellipse cx="82" cy="185" rx="7" ry="4" fill="currentColor" />
      <path d="M 118 132 L 118 182" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
      <ellipse cx="118" cy="185" rx="7" ry="4" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 72 128 L 70 165" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <path d="M 128 128 L 130 165" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 100 105 Q 100 115 100 148" 
            stroke="currentColor" stroke-width="13" fill="none" stroke-linecap="round" />
    `,
    
    // Front-left quarter
    135: `
      <!-- Body -->
      <ellipse cx="92" cy="115" rx="48" ry="38" fill="currentColor" />
      <!-- Chest -->
      <ellipse cx="118" cy="98" rx="32" ry="28" fill="currentColor" />
      <!-- Neck -->
      <path d="M 124 85 Q 128 68 118 55" 
            stroke="currentColor" stroke-width="22" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="112" cy="48" rx="20" ry="16" fill="currentColor" />
      <!-- Ears -->
      <path d="M 104 38 L 106 28 L 112 36" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <path d="M 114 36 L 120 26 L 122 38" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="116" cy="48" r="3" fill="#1a1a1a" />
      <!-- Nostrils -->
      <ellipse cx="100" cy="55" rx="4.5" ry="5.5" fill="rgba(0,0,0,0.3)" />
      <ellipse cx="94" cy="53" rx="4.5" ry="5" fill="rgba(0,0,0,0.3)" />
      <!-- Front legs -->
      <path d="M 128 140 L 127 180" stroke="currentColor" stroke-width="13" stroke-linecap="round" />
      <ellipse cx="127" cy="183" rx="6" ry="4" fill="currentColor" />
      <path d="M 112 140 L 109 178" stroke="currentColor" stroke-width="11" stroke-linecap="round" />
      <ellipse cx="109" cy="181" rx="5" ry="3.5" fill="currentColor" />
      <!-- Back legs -->
      <path d="M 62 138 L 64 172" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="64" cy="175" rx="5" ry="3.5" fill="currentColor" />
      <path d="M 52 138 L 52 170" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <!-- Tail -->
      <path d="M 50 100 Q 35 105 40 135" 
            stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 120 55 Q 125 70 123 88" stroke="currentColor" stroke-width="9" fill="none" opacity="0.9" />
    `,
    
    // Side left
    180: `
      <!-- Body -->
      <ellipse cx="100" cy="112" rx="58" ry="36" fill="currentColor" />
      <!-- Chest/shoulder -->
      <path d="M 138 82 Q 152 98 145 118 L 130 112 Z" fill="currentColor" />
      <!-- Neck -->
      <path d="M 145 92 Q 148 68 132 55 Q 122 50 110 58" 
            stroke="currentColor" stroke-width="24" fill="none" stroke-linecap="round" />
      <!-- Head -->
      <ellipse cx="112" cy="50" rx="22" ry="15" fill="currentColor" transform="rotate(8, 112, 50)" />
      <!-- Ears -->
      <path d="M 122 42 L 119 30 L 114 40" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <path d="M 114 40 L 108 28 L 104 40" stroke="currentColor" stroke-width="4" fill="none" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="118" cy="50" r="3" fill="#1a1a1a" />
      <!-- Nose/muzzle -->
      <ellipse cx="95" cy="55" rx="11" ry="7" fill="currentColor" />
      <!-- Front leg (near) -->
      <path d="M 135 138 L 133 175" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
      <ellipse cx="133" cy="178" rx="7" ry="4" fill="currentColor" />
      <!-- Front leg (far) -->
      <path d="M 128 138 L 125 172" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="125" cy="175" rx="6" ry="3.5" fill="currentColor" />
      <!-- Back leg (near) -->
      <path d="M 70 138 L 72 175" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
      <ellipse cx="72" cy="178" rx="7" ry="4" fill="currentColor" />
      <!-- Back leg (far) -->
      <path d="M 62 138 L 62 172" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="62" cy="175" rx="6" ry="3.5" fill="currentColor" />
      <!-- Tail -->
      <path d="M 48 95 Q 30 100 35 130 Q 38 145 32 155" 
            stroke="currentColor" stroke-width="11" fill="none" stroke-linecap="round" />
      <!-- Mane -->
      <path d="M 132 58 Q 138 72 136 92" stroke="currentColor" stroke-width="10" fill="none" opacity="0.9" />
    `,
    
    // Back-left quarter
    225: `
      <!-- Rump/body -->
      <ellipse cx="86" cy="115" rx="50" ry="40" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="68" cy="100" rx="26" ry="22" fill="currentColor" />
      <!-- Tail -->
      <path d="M 52 88 Q 40 82 32 110 Q 28 125 22 135" 
            stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 62 138 L 60 170" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="60" cy="173" rx="5" ry="3.5" fill="currentColor" />
      <!-- Near back leg -->
      <path d="M 82 138 L 82 175" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="82" cy="178" rx="6" ry="4" fill="currentColor" />
      <!-- Body -->
      <ellipse cx="122" cy="120" rx="38" ry="32" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 145 132 L 143 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 132 132 L 130 170" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="130" cy="173" rx="5" ry="3.5" fill="currentColor" />
    `,
    
    // Back view
    270: `
      <!-- Rump/rear -->
      <ellipse cx="100" cy="105" rx="45" ry="38" fill="currentColor" />
      <!-- Tail base -->
      <ellipse cx="100" cy="90" rx="20" ry="14" fill="currentColor" />
      <!-- Tail -->
      <path d="M 100 82 Q 93 74 100 64 Q 107 74 100 82" stroke="currentColor" stroke-width="15" fill="none" />
      <path d="M 100 64 Q 95 98 90 140" 
            stroke="currentColor" stroke-width="13" fill="none" stroke-linecap="round" />
      <!-- Body -->
      <ellipse cx="100" cy="122" rx="32" ry="38" fill="currentColor" />
      <!-- Back legs - thick -->
      <path d="M 78 135 L 78 180" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="78" cy="183" rx="6.5" ry="4" fill="currentColor" />
      <path d="M 122 135 L 122 180" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="122" cy="183" rx="6.5" ry="4" fill="currentColor" />
      <!-- Front legs -->
      <path d="M 85 128 L 85 165" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
      <path d="M 115 128 L 115 165" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
    `,
    
    // Back-right quarter
    315: `
      <!-- Rump/body -->
      <ellipse cx="114" cy="115" rx="50" ry="40" fill="currentColor" />
      <!-- Back -->
      <ellipse cx="132" cy="100" rx="26" ry="22" fill="currentColor" />
      <!-- Tail -->
      <path d="M 148 88 Q 160 82 168 110 Q 172 125 178 135" 
            stroke="currentColor" stroke-width="14" fill="none" stroke-linecap="round" />
      <!-- Far back leg -->
      <path d="M 138 138 L 140 170" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="140" cy="173" rx="5" ry="3.5" fill="currentColor" />
      <!-- Near back leg -->
      <path d="M 118 138 L 118 175" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
      <ellipse cx="118" cy="178" rx="6" ry="4" fill="currentColor" />
      <!-- Body -->
      <ellipse cx="78" cy="120" rx="38" ry="32" fill="currentColor" />
      <!-- Far front leg -->
      <path d="M 55 132 L 57 165" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      <!-- Near front leg -->
      <path d="M 68 132 L 70 170" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
      <ellipse cx="70" cy="173" rx="5" ry="3.5" fill="currentColor" />
    `,
  },
  
  proportions: {
    neckLength: 0.85,    // Short neck
    bodyLength: 1.15,    // Long, deep body
    legLength: 0.9,      // Shorter, thick legs
    headSize: 1.1,       // Larger noble head
  },
};
