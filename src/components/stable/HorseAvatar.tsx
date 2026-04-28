import { Horse } from "@stores/stableStore";
import { getBreedBodyType, getColorFill, getManeColor, getTailColor } from "./horse-avatar-utils";

interface HorseAvatarProps {
  horse: Horse;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: { width: 80, height: 60 },
  md: { width: 120, height: 90 },
  lg: { width: 180, height: 135 },
  xl: { width: 240, height: 180 },
};

export function HorseAvatar({ horse, size = "md", className = "", animated = false }: HorseAvatarProps) {
  const { width, height } = sizeMap[size];
  const scale = horse.height / 150; // Base scale on 150cm horse
  const clampedScale = Math.max(0.8, Math.min(1.3, scale));
  
  const bodyType = getBreedBodyType(horse.breed);
  const colorFill = getColorFill(horse.color);
  const maneColor = getManeColor(horse.color);
  const tailColor = getTailColor(horse.color);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        viewBox="0 0 200 150"
        className={`w-full h-full ${animated ? 'animate-pulse-subtle' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for realistic shading */}
          <linearGradient id={`bodyGradient-${horse.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorFill.light} />
            <stop offset="50%" stopColor={colorFill.main} />
            <stop offset="100%" stopColor={colorFill.dark} />
          </linearGradient>
          
          <linearGradient id={`maneGradient-${horse.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={maneColor.light} />
            <stop offset="100%" stopColor={maneColor.dark} />
          </linearGradient>

          {/* Muscle definition gradient */}
          <radialGradient id={`muscle-${horse.id}`} cx="30%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="100" cy="140" rx="70" ry="8" fill="rgba(0,0,0,0.15)" />

        <g transform={`scale(${clampedScale}) translate(${200 * (1-clampedScale) / 2 / clampedScale}, ${150 * (1-clampedScale) / 4 / clampedScale})`}>
          {bodyType === "pony" && (
            <PonyBody 
              horseId={horse.id}
              colorFill={colorFill}
              maneColor={maneColor}
              tailColor={tailColor}
              gender={horse.gender}
            />
          )}
          {bodyType === "warmblood" && (
            <WarmbloodBody 
              horseId={horse.id}
              colorFill={colorFill}
              maneColor={maneColor}
              tailColor={tailColor}
              gender={horse.gender}
            />
          )}
          {bodyType === "thoroughbred" && (
            <ThoroughbredBody 
              horseId={horse.id}
              colorFill={colorFill}
              maneColor={maneColor}
              tailColor={tailColor}
              gender={horse.gender}
            />
          )}
          {bodyType === "draft" && (
            <DraftBody 
              horseId={horse.id}
              colorFill={colorFill}
              maneColor={maneColor}
              tailColor={tailColor}
              gender={horse.gender}
            />
          )}
        </g>

        {/* Height indicator line */}
        <line x1="170" y1="40" x2="185" y2="40" stroke="#94a3b8" strokeWidth="1" />
        <line x1="185" y1="40" x2="185" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
        <text x="188" y="142" fontSize="8" fill="#64748b">{horse.height}cm</text>
      </svg>
    </div>
  );
}

// Pony body shape - compact, shorter legs, round body
function PonyBody({ horseId, colorFill, maneColor, tailColor, gender }: {
  horseId: string;
  colorFill: { main: string; light: string; dark: string };
  maneColor: { main: string; light: string; dark: string };
  tailColor: { main: string; light: string; dark: string };
  gender: string;
}) {
  return (
    <g>
      {/* Tail */}
      <path
        d="M 25 55 Q 15 70, 18 100 Q 20 120, 25 130"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 25 55 Q 12 70, 15 100 Q 18 120, 22 135"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Back leg (far) */}
      <path
        d="M 45 85 L 40 120 L 38 140"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (far) */}
      <path
        d="M 125 85 L 128 120 L 130 140"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body - round and compact */}
      <ellipse cx="85" cy="70" rx="50" ry="35" fill={`url(#bodyGradient-${horseId})`} />
      
      {/* Muscle shading */}
      <ellipse cx="85" cy="70" rx="45" ry="30" fill={`url(#muscle-${horseId})`} />

      {/* Neck - thick and short */}
      <path
        d="M 120 55 Q 135 35, 140 25 Q 145 20, 148 22"
        fill={`url(#bodyGradient-${horseId})`}
        stroke={colorFill.dark}
        strokeWidth="1"
      />
      <path
        d="M 115 60 Q 130 40, 138 28 L 140 25"
        fill={`url(#bodyGradient-${horseId})`}
      />

      {/* Head */}
      <ellipse cx="150" cy="28" rx="22" ry="14" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-15, 150, 28)" />
      
      {/* Snout */}
      <ellipse cx="168" cy="32" rx="10" ry="7" fill={colorFill.light} transform="rotate(-10, 168, 32)" />
      
      {/* Nostrils */}
      <ellipse cx="172" cy="30" rx="2" ry="1.5" fill="#1a1a1a" opacity="0.4" />
      <ellipse cx="174" cy="33" rx="2" ry="1.5" fill="#1a1a1a" opacity="0.4" />

      {/* Eye */}
      <ellipse cx="158" cy="25" rx="3" ry="4" fill="#1a1a1a" />
      <ellipse cx="159" cy="24" rx="1" ry="1.5" fill="white" />

      {/* Ear */}
      <ellipse cx="148" cy="12" rx="4" ry="8" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-10, 148, 12)" />

      {/* Mane */}
      <path
        d="M 142 18 Q 135 25, 132 35 Q 130 45, 128 55"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 140 15 Q 140 25, 138 35 Q 136 45, 135 50"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Back leg (near) */}
      <path
        d="M 50 90 L 48 125 L 46 142"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (near) */}
      <path
        d="M 130 90 L 133 125 L 135 142"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hooves */}
      <ellipse cx="38" cy="142" rx="6" ry="4" fill="#2d2d2d" />
      <ellipse cx="46" cy="144" rx="6" ry="4" fill="#2d2d2d" />
      <ellipse cx="130" cy="142" rx="5" ry="3" fill="#2d2d2d" />
      <ellipse cx="135" cy="144" rx="5" ry="3" fill="#2d2d2d" />
    </g>
  );
}

// Warmblood body shape - athletic, balanced proportions
function WarmbloodBody({ horseId, colorFill, maneColor, tailColor, gender }: {
  horseId: string;
  colorFill: { main: string; light: string; dark: string };
  maneColor: { main: string; light: string; dark: string };
  tailColor: { main: string; light: string; dark: string };
  gender: string;
}) {
  return (
    <g>
      {/* Tail */}
      <path
        d="M 20 50 Q 8 70, 12 100 Q 15 120, 20 132"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 20 50 Q 5 70, 8 100 Q 12 120, 18 135"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Back leg (far) */}
      <path
        d="M 40 80 L 38 115 L 36 138"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (far) */}
      <path
        d="M 130 80 L 132 115 L 134 138"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body - athletic and slightly elongated */}
      <ellipse cx="85" cy="65" rx="55" ry="30" fill={`url(#bodyGradient-${horseId})`} />
      
      {/* Muscle definition */}
      <ellipse cx="70" cy="65" rx="30" ry="20" fill={`url(#muscle-${horseId})`} opacity="0.5" />
      <ellipse cx="100" cy="60" rx="20" ry="15" fill={`url(#muscle-${horseId})`} opacity="0.3" />

      {/* Neck - elegant arc */}
      <path
        d="M 125 50 Q 140 25, 155 18 Q 162 15, 168 18"
        fill={`url(#bodyGradient-${horseId})`}
      />
      <path
        d="M 130 52 Q 145 28, 158 22"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="1"
      />

      {/* Head - refined */}
      <ellipse cx="172" cy="22" rx="20" ry="12" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-12, 172, 22)" />
      
      {/* Snout */}
      <ellipse cx="188" cy="26" rx="9" ry="6" fill={colorFill.light} transform="rotate(-8, 188, 26)" />
      
      {/* Nostrils */}
      <ellipse cx="192" cy="24" rx="2" ry="1.5" fill="#1a1a1a" opacity="0.4" />
      <ellipse cx="193" cy="27" rx="2" ry="1.5" fill="#1a1a1a" opacity="0.4" />

      {/* Eye */}
      <ellipse cx="178" cy="18" rx="3.5" ry="4.5" fill="#1a1a1a" />
      <ellipse cx="179" cy="17" rx="1.2" ry="1.8" fill="white" />

      {/* Ears */}
      <ellipse cx="160" cy="8" rx="3.5" ry="9" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-8, 160, 8)" />
      <ellipse cx="168" cy="6" rx="3" ry="8" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-5, 168, 6)" />

      {/* Mane - flowing */}
      <path
        d="M 162 10 Q 150 15, 145 25 Q 140 35, 138 45 Q 136 55, 135 60"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M 165 8 Q 155 14, 150 22 Q 146 30, 144 40"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Back leg (near) */}
      <path
        d="M 45 85 L 43 120 L 41 140"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (near) */}
      <path
        d="M 135 85 L 137 120 L 139 140"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hooves */}
      <ellipse cx="36" cy="140" rx="5" ry="3" fill="#2d2d2d" />
      <ellipse cx="41" cy="142" rx="5" ry="3" fill="#2d2d2d" />
      <ellipse cx="134" cy="140" rx="4" ry="3" fill="#2d2d2d" />
      <ellipse cx="139" cy="142" rx="4" ry="3" fill="#2d2d2d" />
    </g>
  );
}

// Thoroughbred body shape - slender, long legs, refined
function ThoroughbredBody({ horseId, colorFill, maneColor, tailColor, gender }: {
  horseId: string;
  colorFill: { main: string; light: string; dark: string };
  maneColor: { main: string; light: string; dark: string };
  tailColor: { main: string; light: string; dark: string };
  gender: string;
}) {
  return (
    <g>
      {/* Tail */}
      <path
        d="M 18 48 Q 5 65, 8 95 Q 10 115, 15 128"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M 18 48 Q 2 65, 5 95 Q 8 115, 12 132"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Back leg (far) - long and slender */}
      <path
        d="M 38 75 L 36 110 L 34 135"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (far) - long and slender */}
      <path
        d="M 132 75 L 134 110 L 136 135"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body - lean and elongated */}
      <ellipse cx="85" cy="60" rx="58" ry="26" fill={`url(#bodyGradient-${horseId})`} />
      
      {/* Subtle muscle shading */}
      <ellipse cx="75" cy="58" rx="25" ry="18" fill={`url(#muscle-${horseId})`} opacity="0.4" />

      {/* Neck - long and arched */}
      <path
        d="M 128 45 Q 145 20, 160 12 Q 170 8, 178 12"
        fill={`url(#bodyGradient-${horseId})`}
      />
      <path
        d="M 132 48 Q 148 25, 162 18"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="1"
      />

      {/* Head - refined with dished face */}
      <ellipse cx="182" cy="15" rx="18" ry="10" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-15, 182, 15)" />
      
      {/* Dished face profile */}
      <path
        d="M 195 12 Q 192 18, 196 22"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="1"
      />
      
      {/* Snout */}
      <ellipse cx="198" cy="20" rx="8" ry="5" fill={colorFill.light} transform="rotate(-5, 198, 20)" />
      
      {/* Nostrils */}
      <ellipse cx="201" cy="18" rx="1.8" ry="1.3" fill="#1a1a1a" opacity="0.4" />
      <ellipse cx="202" cy="21" rx="1.8" ry="1.3" fill="#1a1a1a" opacity="0.4" />

      {/* Eye - large and alert */}
      <ellipse cx="188" cy="12" rx="4" ry="5" fill="#1a1a1a" />
      <ellipse cx="189" cy="11" rx="1.5" ry="2" fill="white" />

      {/* Ears - alert */}
      <ellipse cx="170" cy="3" rx="3" ry="8" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-12, 170, 3)" />
      <ellipse cx="178" cy="2" rx="2.5" ry="7" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-8, 178, 2)" />

      {/* Mane - short and tidy */}
      <path
        d="M 172 5 Q 160 10, 155 18 Q 150 28, 148 38 Q 146 48, 145 55"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Back leg (near) */}
      <path
        d="M 42 80 L 40 115 L 38 138"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (near) */}
      <path
        d="M 137 80 L 139 115 L 141 138"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hooves */}
      <ellipse cx="34" cy="138" rx="4" ry="2.5" fill="#2d2d2d" />
      <ellipse cx="38" cy="140" rx="4" ry="2.5" fill="#2d2d2d" />
      <ellipse cx="136" cy="138" rx="3.5" ry="2.5" fill="#2d2d2d" />
      <ellipse cx="141" cy="140" rx="3.5" ry="2.5" fill="#2d2d2d" />
    </g>
  );
}

// Draft body shape - massive, muscular, heavy bones
function DraftBody({ horseId, colorFill, maneColor, tailColor, gender }: {
  horseId: string;
  colorFill: { main: string; light: string; dark: string };
  maneColor: { main: string; light: string; dark: string };
  tailColor: { main: string; light: string; dark: string };
  gender: string;
}) {
  return (
    <g>
      {/* Tail - thick */}
      <path
        d="M 22 55 Q 10 75, 15 105 Q 18 125, 25 135"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M 22 55 Q 6 75, 10 105 Q 14 125, 22 138"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Back leg (far) - thick and muscular */}
      <path
        d="M 42 88 L 40 118 L 38 138"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (far) - thick */}
      <path
        d="M 128 88 L 131 118 L 133 138"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body - massive and deep */}
      <ellipse cx="85" cy="72" rx="52" ry="40" fill={`url(#bodyGradient-${horseId})`} />
      
      {/* Heavy muscle definition */}
      <ellipse cx="75" cy="70" rx="35" ry="28" fill={`url(#muscle-${horseId})`} opacity="0.6" />
      <ellipse cx="95" cy="68" rx="25" ry="20" fill={`url(#muscle-${horseId})`} opacity="0.4" />

      {/* Neck - thick and powerful */}
      <path
        d="M 120 60 Q 135 40, 145 32 Q 152 28, 160 32"
        fill={`url(#bodyGradient-${horseId})`}
      />
      <path
        d="M 115 65 Q 130 45, 140 38"
        fill="none"
        stroke={colorFill.dark}
        strokeWidth="1"
      />

      {/* Head - substantial */}
      <ellipse cx="165" cy="32" rx="24" ry="16" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-10, 165, 32)" />
      
      {/* Snout */}
      <ellipse cx="185" cy="38" rx="11" ry="8" fill={colorFill.light} transform="rotate(-5, 185, 38)" />
      
      {/* Nostrils - large */}
      <ellipse cx="190" cy="35" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.4" />
      <ellipse cx="192" cy="39" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.4" />

      {/* Eye */}
      <ellipse cx="175" cy="28" rx="4" ry="5" fill="#1a1a1a" />
      <ellipse cx="176" cy="27" rx="1.5" ry="2" fill="white" />

      {/* Ears */}
      <ellipse cx="152" cy="18" rx="4.5" ry="10" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-8, 152, 18)" />
      <ellipse cx="160" cy="16" rx="4" ry="9" fill={`url(#bodyGradient-${horseId})`} transform="rotate(-3, 160, 16)" />

      {/* Mane - thick and abundant */}
      <path
        d="M 158 20 Q 145 28, 140 40 Q 135 55, 132 70"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 162 18 Q 152 26, 148 36 Q 144 46, 140 60"
        fill="none"
        stroke={`url(#maneGradient-${horseId})`}
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Back leg (near) */}
      <path
        d="M 48 93 L 46 123 L 44 142"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front leg (near) */}
      <path
        d="M 133 93 L 136 123 L 138 142"
        fill="none"
        stroke={`url(#bodyGradient-${horseId})`}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Large hooves */}
      <ellipse cx="38" cy="140" rx="7" ry="5" fill="#2d2d2d" />
      <ellipse cx="44" cy="144" rx="7" ry="5" fill="#2d2d2d" />
      <ellipse cx="133" cy="140" rx="6" ry="4" fill="#2d2d2d" />
      <ellipse cx="138" cy="144" rx="6" ry="4" fill="#2d2d2d" />
    </g>
  );
}
