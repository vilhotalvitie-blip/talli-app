import { cn } from "@lib/utils";
import {
  getBreedProportions,
  getHorseColor,
  calculateScale,
  calculateWeightFactor,
  type HorseColorScheme,
  type BreedProportions,
} from "./horse-avatar-utils";

interface HorseAvatarProps {
  breed: string;
  color: string;
  height: number; // in cm (säkäkorkeus)
  weight: number; // in kg
  gender?: "tamma" | "ruuna" | "ori" | string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showSizeIndicator?: boolean;
}

export function HorseAvatar({
  breed,
  color,
  height,
  weight,
  gender,
  size = "md",
  className,
  showSizeIndicator = false,
}: HorseAvatarProps) {
  // Get color scheme and breed proportions
  const colorScheme = getHorseColor(color);
  const proportions = getBreedProportions(breed);

  // Calculate scaling
  const heightScale = calculateScale(height);
  const weightFactor = calculateWeightFactor(weight);
  const overallScale = heightScale * weightFactor;

  // Size classes
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40",
  };


  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: `scale(${overallScale})` }}
      >
        <defs>
          {/* Gradient for body depth */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorScheme.body} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colorScheme.body} stopOpacity="1" />
          </linearGradient>
          {/* Gradient for mane/tail */}
          <linearGradient id="maneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorScheme.mane} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colorScheme.mane} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Render the horse based on breed proportions */}
        <g transform={`translate(${50 - 50 * overallScale}, ${50 - 50 * overallScale})`}>
          <HorseSVG
            colorScheme={colorScheme}
            proportions={proportions}
            gender={gender}
          />
        </g>
      </svg>

      {/* Size indicator (optional) */}
      {showSizeIndicator && (
        <div className="absolute -bottom-1 -right-1 bg-background border rounded-full px-1.5 py-0.5 text-[10px] font-medium shadow-sm">
          {height}cm
        </div>
      )}
    </div>
  );
}

// SVG horse component with breed-specific rendering
interface HorseSVGProps {
  colorScheme: HorseColorScheme;
  proportions: BreedProportions;
  gender?: string;
}

function HorseSVG({ colorScheme, proportions, gender }: HorseSVGProps) {
  const { legLength, neckLength, bodyWidth, headSize } = proportions;

  // Base coordinates (generic warmblood proportions)
  // Head
  const headY = 20 * headSize;
  const headX = 75;
  
  // Neck
  const neckBaseX = 65;
  const neckBaseY = 35;
  const neckTopX = 75;
  const neckTopY = headY + 10;
  
  // Body
  const shoulderX = 55;
  const shoulderY = 40;
  const hipX = 20;
  const hipY = 40;
  const bellyY = 55;
  
  // Legs
  const frontLegX = 55;
  const backLegX = 25;
  const groundY = 85;
  const kneeY = groundY - 25 * legLength;
  const hockY = groundY - 15 * legLength;

  // Apply breed proportions
  const adjustedNeckTopY = neckTopY + (1 - neckLength) * 10;
  const adjustedHipY = hipY + (1 - bodyWidth) * 5;
  const adjustedBellyY = bellyY + (bodyWidth - 1) * 5;
  const adjustedGroundY = groundY + (1 - legLength) * 10;

  // Spotted pattern (for pinto/piebald)
  const hasPattern = colorScheme.pattern === "spotted";

  return (
    <g>
      {/* Tail */}
      <path
        d={`M ${hipX - 5} ${adjustedHipY - 5} 
            Q ${hipX - 15} ${adjustedHipY + 10} ${hipX - 10} ${adjustedGroundY - 10}
            Q ${hipX - 5} ${adjustedHipY + 15} ${hipX} ${adjustedHipY}`}
        fill={colorScheme.tail}
        stroke={colorScheme.tail}
        strokeWidth="3"
      />

      {/* Back legs */}
      {/* Back left leg (far side - darker) */}
      <path
        d={`M ${backLegX - 2} ${adjustedBellyY} 
            L ${backLegX - 3} ${hockY + 5} 
            L ${backLegX - 3} ${adjustedGroundY - 3}
            L ${backLegX + 1} ${adjustedGroundY - 3}
            L ${backLegX + 1} ${hockY + 5}
            L ${backLegX + 2} ${adjustedBellyY}`}
        fill={colorScheme.body}
        opacity="0.7"
      />
      {/* Back right leg (near side) */}
      <path
        d={`M ${backLegX + 2} ${adjustedBellyY} 
            L ${backLegX + 1} ${hockY} 
            L ${backLegX + 1} ${adjustedGroundY}
            L ${backLegX + 5} ${adjustedGroundY}
            L ${backLegX + 5} ${hockY}
            L ${backLegX + 6} ${adjustedBellyY}`}
        fill={colorScheme.body}
      />
      {/* Hoof - back */}
      <rect x={backLegX + 1} y={adjustedGroundY - 2} width="4" height="3" fill={colorScheme.hoof} rx="1" />

      {/* Front legs */}
      {/* Front left leg (far side - darker) */}
      <path
        d={`M ${frontLegX - 2} ${adjustedBellyY} 
            L ${frontLegX - 3} ${kneeY + 5} 
            L ${frontLegX - 3} ${adjustedGroundY - 3}
            L ${frontLegX + 1} ${adjustedGroundY - 3}
            L ${frontLegX + 1} ${kneeY + 5}
            L ${frontLegX + 2} ${adjustedBellyY}`}
        fill={colorScheme.body}
        opacity="0.7"
      />
      {/* Front right leg (near side) */}
      <path
        d={`M ${frontLegX + 2} ${adjustedBellyY} 
            L ${frontLegX + 1} ${kneeY} 
            L ${frontLegX + 1} ${adjustedGroundY}
            L ${frontLegX + 5} ${adjustedGroundY}
            L ${frontLegX + 5} ${kneeY}
            L ${frontLegX + 6} ${adjustedBellyY}`}
        fill={colorScheme.body}
      />
      {/* Hoof - front */}
      <rect x={frontLegX + 1} y={adjustedGroundY - 2} width="4" height="3" fill={colorScheme.hoof} rx="1" />

      {/* Body */}
      <path
        d={`M ${shoulderX} ${shoulderY}
            C ${shoulderX - 10} ${shoulderY - 10}, ${neckBaseX - 5} ${adjustedNeckTopY + 10}, ${neckBaseX} ${adjustedNeckTopY}
            L ${neckTopX} ${adjustedNeckTopY}
            L ${headX} ${headY}
            L ${headX + 8} ${headY + 8}
            L ${headX + 5} ${headY + 12}
            L ${neckTopX - 2} ${adjustedNeckTopY + 15}
            L ${neckBaseX - 3} ${neckBaseY}
            C ${neckBaseX - 5} ${shoulderY + 5}, ${shoulderX + 5} ${shoulderY + 10}, ${shoulderX} ${shoulderY + 20}
            L ${shoulderX - 10} ${adjustedBellyY - 5}
            L ${hipX + 10} ${adjustedBellyY - 5}
            L ${hipX} ${adjustedHipY}
            C ${hipX - 5} ${hipY - 5}, ${hipX + 5} ${hipY - 10}, ${hipX + 10} ${hipY}
            Z`}
        fill="url(#bodyGradient)"
      />

      {/* Spotted pattern overlay (for pinto) */}
      {hasPattern && (
        <>
          <ellipse cx="45" cy="45" rx="12" ry="8" fill={colorScheme.baseBody} opacity="0.9" />
          <ellipse cx="30" cy="50" rx="8" ry="6" fill={colorScheme.baseBody} opacity="0.9" />
          <ellipse cx="60" cy="35" rx="6" ry="4" fill={colorScheme.baseBody} opacity="0.9" />
        </>
      )}

      {/* Mane */}
      <path
        d={`M ${neckTopX - 3} ${adjustedNeckTopY + 5}
            Q ${neckBaseX} ${neckBaseY - 5} ${neckBaseX - 2} ${neckBaseY + 5}
            L ${neckBaseX - 5} ${neckBaseY + 3}
            Q ${neckTopX - 6} ${adjustedNeckTopY + 8} ${neckTopX - 5} ${adjustedNeckTopY + 2}`}
        fill={colorScheme.mane}
        stroke={colorScheme.mane}
        strokeWidth="2"
      />

      {/* Eye */}
      <circle cx={headX + 3} cy={headY + 4} r="1.5" fill="#1a1a1a" />
      <circle cx={headX + 3.3} cy={headY + 3.8} r="0.5" fill="#fff" />

      {/* Ear */}
      <ellipse cx={headX + 2} cy={headY - 2} rx="1.5" ry="3" fill={colorScheme.body} />
      <ellipse cx={headX + 5} cy={headY - 1} rx="1.5" ry="2.5" fill={colorScheme.body} />

      {/* Gender indicator - subtle styling */}
      {gender === "tamma" && (
        <circle cx={hipX - 8} cy={adjustedBellyY - 8} r="3" fill="#ec4899" opacity="0.6" />
      )}
      {gender === "ruuna" && (
        <circle cx={hipX - 8} cy={adjustedBellyY - 8} r="3" fill="#3b82f6" opacity="0.6" />
      )}
      {gender === "ori" && (
        <circle cx={hipX - 8} cy={adjustedBellyY - 8} r="3" fill="#f59e0b" opacity="0.6" />
      )}
    </g>
  );
}
