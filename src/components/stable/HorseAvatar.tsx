import { useState, useRef, useCallback, useEffect } from "react";
import { Horse } from "@stores/stableStore";
import { getBreedSpriteId, getBreedSprite, BreedId } from "./horse-breeds";
import { getHorseColor, getHorseColorByName, HorseColor } from "./horse-colors";
import { cn } from "@lib/utils";

interface HorseAvatarProps {
  horse: Horse;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  autoRotate?: boolean;
  className?: string;
  onColorChange?: (colorId: string) => void;
}

// Size configurations
const sizeConfig = {
  sm: { width: 60, height: 60, scale: 0.6, viewBox: "0 0 200 200" },
  md: { width: 120, height: 120, scale: 1.0, viewBox: "0 0 200 200" },
  lg: { width: 200, height: 200, scale: 1.5, viewBox: "0 0 200 200" },
};

// Calculate rotation from height (50-200cm) → scale (0.6-1.4x)
function calculateSizeScale(height: number): number {
  const minHeight = 80;  // Small pony
  const maxHeight = 180; // Large warmblood
  const minScale = 0.75;
  const maxScale = 1.25;
  
  const clampedHeight = Math.max(minHeight, Math.min(maxHeight, height));
  const normalized = (clampedHeight - minHeight) / (maxHeight - minHeight);
  return minScale + normalized * (maxScale - minScale);
}

export function HorseAvatar({
  horse,
  size = "md",
  interactive = false,
  autoRotate = false,
  className,
}: HorseAvatarProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotating, setAutoRotating] = useState(autoRotate);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get breed sprite
  const breedId = getBreedSpriteId(horse.breed) as BreedId;
  const breedSprite = getBreedSprite(breedId);

  // Get color - try to find by stored color ID or name
  const horseColor: HorseColor = horse.color.startsWith("#") 
    ? { id: "custom", name: "Custom", baseColor: horse.color, maneColor: horse.color }
    : getHorseColorByName(horse.color) || getHorseColor(horse.color);

  // Calculate size scale based on horse height
  const sizeScale = calculateSizeScale(horse.height);
  const config = sizeConfig[size];

  // Determine which sprite to show based on rotation (8 angles)
  const getSpriteAngle = useCallback(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const angleIndex = Math.round(normalizedRotation / 45) % 8;
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    return angles[angleIndex] as 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
  }, [rotation]);

  const currentAngle = getSpriteAngle();
  const spriteSvg = breedSprite.sprites[currentAngle];

  // Auto-rotate animation
  useEffect(() => {
    if (!autoRotating || isDragging) return;
    
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      setRotation(prev => (prev + delta * 0.05) % 360);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [autoRotating, isDragging]);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!interactive) return;
    e.preventDefault();
    setIsDragging(true);
    setAutoRotating(false);
    dragStartX.current = e.clientX;
  }, [interactive]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    const touch = e.touches[0];
    if (!touch) return;
    setIsDragging(true);
    setAutoRotating(false);
    dragStartX.current = touch.clientX;
  }, [interactive]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartX.current;
      dragStartX.current = e.clientX;
      setRotation(prev => prev + deltaX * 0.5);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - dragStartX.current;
      dragStartX.current = touch.clientX;
      setRotation(prev => prev + deltaX * 0.5);
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (autoRotate) {
        setTimeout(() => setAutoRotating(true), 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, autoRotate]);

  // Apply color to SVG via CSS custom properties
  const colorStyles: React.CSSProperties = {
    color: horseColor.baseColor,
    "--horse-base": horseColor.baseColor,
    "--horse-mane": horseColor.maneColor,
    "--horse-dark": adjustColor(horseColor.baseColor, -30),
    "--horse-light": adjustColor(horseColor.baseColor, 30),
    width: config.width,
    height: config.height,
    transform: `scale(${config.scale * sizeScale})`,
    cursor: interactive ? (isDragging ? "grabbing" : "grab") : "default",
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center",
        interactive && "select-none touch-none",
        className
      )}
      style={{
        width: config.width * config.scale * sizeScale,
        height: config.height * config.scale * sizeScale,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Shadow/ground indicator */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/10 dark:bg-white/5"
        style={{
          width: config.width * config.scale * sizeScale * 0.8,
          height: config.width * config.scale * sizeScale * 0.15,
        }}
      />
      
      {/* SVG Avatar */}
      <svg
        viewBox="0 0 200 200"
        className={cn(
          "absolute transition-opacity duration-100",
          isDragging && "opacity-90"
        )}
        style={colorStyles}
        dangerouslySetInnerHTML={{ __html: spriteSvg }}
      />

      {/* Interactive hint */}
      {interactive && !autoRotating && !isDragging && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          Vedä pyörittääksesi
        </div>
      )}

      {/* Drag overlay for better interaction */}
      {interactive && (
        <div className="absolute inset-0 z-10" />
      )}
    </div>
  );
}

// Color adjustment utility
function adjustColor(hex: string, percent: number): string {
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

// Re-export from horse-colors for convenience
export { horseColors, getHorseColor, getHorseColorByName } from "./horse-colors";
