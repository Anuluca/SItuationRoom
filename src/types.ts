export type Language = "zh" | "ja";
export type LocalizedText = Record<Language, string>;

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
  cv?: string;
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

export type WorkCategory =
  | "tv"
  | "ova"
  | "music"
  | "novels"
  | "manga"
  | "games";

export interface WorkEntry {
  id: string;
  series?: string;
  volume?: number;
  category: WorkCategory;
  year: string;
  title: LocalizedText;
  meta: LocalizedText;
  description: LocalizedText;
  details?: Record<Language, string[]>;
  image?: string;
  links?: WorkLink[];
  accent: string;
}

export interface WorkLink {
  title: LocalizedText;
  href: string;
}

export type ResourceImageKind =
  | "avatars"
  | "avatars2"
  | "avatarsTv1"
  | "conceptTv1"
  | "dvd"
  | "music"
  | "mangaCovers"
  | "novelCovers";

export interface ResourceImage {
  src: string;
  title: LocalizedText;
  source: string;
}

export interface ResourceLink {
  title: LocalizedText;
  description: LocalizedText;
  href: string;
}

export interface ResourceLinks {
  video: ResourceLink[];
  audio: ResourceLink[];
  text: ResourceLink[];
}

export interface EncyclopediaData {
  factions: Record<string, Faction>;
  relationTypes: Record<string, RelationType>;
  characters: Character[];
  relations: Relation[];
  works: WorkEntry[];
  factionBackgrounds: Record<string, string>;
  resourceImages: Record<ResourceImageKind, ResourceImage[]>;
  resourceLinks: ResourceLinks;
}
