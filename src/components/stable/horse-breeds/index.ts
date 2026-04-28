export { getBreedSpriteId, breedKeywords } from "./types";
export type { HorseSprite } from "./types";

import { warmbloodSprite } from "./warmblood";
import { ponySprite } from "./pony";
import { draughtSprite } from "./draught";
import { arabianSprite } from "./arabian";

export const breedSprites = {
  warmblood: warmbloodSprite,
  pony: ponySprite,
  draught: draughtSprite,
  arabian: arabianSprite,
};

export type BreedId = keyof typeof breedSprites;

export function getBreedSprite(breedId: BreedId) {
  return breedSprites[breedId] || warmbloodSprite;
}
