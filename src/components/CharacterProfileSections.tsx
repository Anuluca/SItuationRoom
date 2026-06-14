import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { appearanceJa, localizeProfile } from "../content";
import {
  characterById,
  displayName,
  relationTypes,
  relations,
} from "../data";
import type { Character, Language } from "../types";
import CharacterAvatar from "./CharacterAvatar";

interface CharacterProfileSectionsProps {
  character: Character;
  language: Language;
  onSelectCharacter?: (id: string) => void;
}

export default function CharacterProfileSections({
  character,
  language,
  onSelectCharacter,
}: CharacterProfileSectionsProps) {
  const { t } = useTranslation();
  const profile = localizeProfile(character.id, language, {
    alias: character.alias,
    role: character.role,
    desc: character.desc,
  });
  const connections = relations.filter(
    ({ source, target }) => source === character.id || target === character.id,
  );

  return (
    <>
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
    </>
  );
}
