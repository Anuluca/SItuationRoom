import { avatarFor, factions } from "../data";
import type { Character } from "../types";

interface CharacterAvatarProps {
  character: Character;
  size?: "small" | "medium" | "large";
}

export default function CharacterAvatar({
  character,
  size = "medium",
}: CharacterAvatarProps) {
  return (
    <span
      className={`character-avatar ${size}`}
      style={
        {
          "--avatar-color": factions[character.faction].color,
        } as React.CSSProperties
      }
    >
      <img
        src={avatarFor(character)}
        alt=""
        loading={size === "small" ? "lazy" : "eager"}
      />
    </span>
  );
}
