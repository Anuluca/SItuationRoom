import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { localizeProfile } from "../content";
import {
  characterById,
  characters,
  displayName,
  factions,
} from "../data";
import type { Language } from "../types";
import CharacterAvatar from "./CharacterAvatar";
import CharacterProfileSections from "./CharacterProfileSections";
import ShareButton from "./ShareButton";

interface CharacterDrawerProps {
  characterId: string | null;
  open: boolean;
  onClose: () => void;
  onSelectCharacter?: (id: string) => void;
}

export default function CharacterDrawer({
  characterId,
  open,
  onClose,
  onSelectCharacter,
}: CharacterDrawerProps) {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const character = characterId ? characterById.get(characterId) : undefined;

  if (!character) return null;

  const profile = localizeProfile(character.id, language, {
    alias: character.alias,
    role: character.role,
    desc: character.desc,
  });
  const index = characters.findIndex(({ id }) => id === character.id) + 1;

  return (
    <Drawer
      className="character-drawer"
      open={open}
      size="min(92vw, 520px)"
      closeIcon={false}
      onClose={onClose}
      title={null}
    >
      <article className="character-file">
        <div className="character-file-topbar">
          <span className="file-index">
            FILE {String(index).padStart(2, "0")} /{" "}
            {String(characters.length).padStart(2, "0")}
          </span>
          <div className="file-toolbar-actions">
            <ShareButton
              compact
              className="drawer-action-button character-toolbar-button"
              title={displayName(character, language)}
              text={`${profile.alias} · ${profile.role}`}
              url={`/terms?view=characters&character=${character.id}`}
            />
            <Button
              className="file-close drawer-action-button character-toolbar-button"
              type="text"
              icon={<CloseOutlined />}
              aria-label={t("common.close")}
              onClick={onClose}
            />
          </div>
        </div>
        <header
          className="character-file-hero"
          style={
            {
              "--hero-color": factions[character.faction].color,
            } as React.CSSProperties
          }
        >
          <CharacterAvatar character={character} size="large" />
          <div>
            <h2>{displayName(character, language)}</h2>
            <p>
              {language === "ja" ? character.name : character.jp} ·{" "}
              {profile.alias}
            </p>
            <p className="character-meta-line character-role">
              <strong>{t("terms.identity")}</strong>
              <span>{profile.role}</span>
            </p>
            <p className="character-cv">
              <strong>{t("profile.cv")}</strong>
              <span>{character.cv ?? t("profile.cvUnknown")}</span>
            </p>
            <div className="file-tags">
              {character.factions.map((factionId) => (
                <Tag
                  key={factionId}
                  className="identity-tag"
                  style={
                    {
                      "--identity-color": factions[factionId].color,
                    } as React.CSSProperties
                  }
                >
                  {t(`factions.${factionId}`)}
                </Tag>
              ))}
            </div>
          </div>
        </header>

        <CharacterProfileSections
          character={character}
          language={language}
          onSelectCharacter={onSelectCharacter}
        />
      </article>
    </Drawer>
  );
}
