import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { appearanceJa, localizeProfile } from "../content";
import {
  characterById,
  characters,
  displayName,
  factions,
  relationTypes,
  relations,
} from "../data";
import type { Language } from "../types";
import CharacterAvatar from "./CharacterAvatar";

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
  const connections = relations.filter(
    ({ source, target }) => source === character.id || target === character.id,
  );
  const index = characters.findIndex(({ id }) => id === character.id) + 1;

  return (
    <Drawer
      className="character-drawer"
      open={open}
      width="min(92vw, 520px)"
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
          <Button
            className="file-close"
            type="text"
            icon={<CloseOutlined />}
            aria-label={t("common.close")}
            onClick={onClose}
          />
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
            <div className="file-tags">
              {character.factions.map((factionId) => (
                <Tag key={factionId} color={factions[factionId].color}>
                  {t(`factions.${factionId}`)}
                </Tag>
              ))}
              <Tag>{profile.role}</Tag>
            </div>
          </div>
        </header>

        <section className="file-section">
          <h3>{t("network.profile")} / Profile</h3>
          <p>{profile.desc}</p>
        </section>

        <section className="file-section">
          <h3>{t("network.appearances")} / Appearances</h3>
          <div className="appearance-list">
            {Object.entries(character.appearances).map(([kind, items]) => (
              <div className="appearance-row" key={kind}>
                <strong>{t(`profile.${kind}`)}</strong>
                <div>
                  {items?.map((item: string) => (
                    <span key={item}>
                      {language === "ja" ? appearanceJa[item] ?? item : item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <small className="file-note">{t("network.appearanceNote")}</small>
        </section>

        <section className="file-section">
          <h3>{t("network.connections")} / Connections</h3>
          <div className="connection-list">
            {connections.map((relation, relationIndex) => {
              const otherId =
                relation.source === character.id
                  ? relation.target
                  : relation.source;
              const other = characterById.get(otherId);
              if (!other) return null;
              return (
                <button
                  key={`${relation.source}-${relation.target}-${relationIndex}`}
                  type="button"
                  style={
                    {
                      "--relation-color": relationTypes[relation.type].color,
                    } as React.CSSProperties
                  }
                  onClick={() => onSelectCharacter?.(otherId)}
                >
                  <CharacterAvatar character={other} size="small" />
                  <span>
                    <strong>{displayName(other, language)}</strong>
                    <small>
                      {language === "ja"
                        ? t(`relationTypes.${relation.type}`)
                        : relation.label}
                    </small>
                  </span>
                  <ArrowRightOutlined />
                </button>
              );
            })}
          </div>
        </section>
      </article>
    </Drawer>
  );
}
