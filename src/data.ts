import rawData from "../assets/js/data.js";
import type { Character, EncyclopediaData, Language } from "./types";

export const data = rawData as unknown as EncyclopediaData;
export const {
  factions,
  relationTypes,
  characters,
  relations,
  works,
  factionBackgrounds,
  resourceImages,
  resourceLinks,
} = data;

export const characterById = new Map(
  characters.map((character) => [character.id, character]),
);

export const factionIdsFor = (character: Character) =>
  character.factions ?? [character.faction];

export const membersOf = (factionId: string) =>
  characters.filter((character) => factionIdsFor(character).includes(factionId));

export const avatarFor = (character: Character) =>
  character.avatar ?? "/avatar-placeholder.svg";

export const displayName = (character: Character, language: Language) =>
  language === "ja" ? character.jp : character.name;
