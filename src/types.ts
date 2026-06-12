export type Language = "zh" | "ja";

export interface Faction {
  name: string;
  color: string;
}

export interface RelationType {
  name: string;
  color: string;
  dash: number[] | null;
}

export interface CharacterAppearances {
  animation?: string[];
  ova?: string[];
  novel?: string[];
  extra?: string[];
}

export interface Character {
  id: string;
  name: string;
  jp: string;
  alias: string;
  faction: string;
  factions: string[];
  avatar?: string;
  role: string;
  desc: string;
  appearances: CharacterAppearances;
}

export interface Relation {
  source: string;
  target: string;
  type: string;
  label: string;
  note: string;
}

export interface EncyclopediaData {
  factions: Record<string, Faction>;
  relationTypes: Record<string, RelationType>;
  characters: Character[];
  relations: Relation[];
}
