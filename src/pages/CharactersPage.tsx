import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CharacterAvatar from "../components/CharacterAvatar";
import CharacterDrawer from "../components/CharacterDrawer";
import SectionTitle from "../components/SectionTitle";
import { localizeProfile } from "../content";
import {
  characters,
  displayName,
  factions,
} from "../data";
import type { Language } from "../types";

export default function CharactersPage() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const [query, setQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const visibleCharacters = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return characters;
    return characters.filter((character) => {
      const profile = localizeProfile(character.id, language, {
        alias: character.alias,
        role: character.role,
        desc: character.desc,
      });
      return [
        character.name,
        character.jp,
        profile.alias,
        profile.role,
        ...character.factions.map((factionId) => t(`factions.${factionId}`)),
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalized);
    });
  }, [language, query, t]);

  return (
    <section className="archive-panel">
      <div className="archive-toolbar">
        <SectionTitle title={t("nav.characters")} />
        <Input
          allowClear
          prefix={<SearchOutlined />}
          value={query}
          placeholder={t("terms.searchPlaceholder")}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="archive-result-line">
        <span>
          {t("terms.characterCount", { count: visibleCharacters.length })}
        </span>
        <strong>
          {String(visibleCharacters.length).padStart(2, "0")} /{" "}
          {String(characters.length).padStart(2, "0")}
        </strong>
      </div>

      {visibleCharacters.length ? (
        <div className="character-grid">
          {visibleCharacters.map((character) => {
            const profile = localizeProfile(character.id, language, {
              alias: character.alias,
              role: character.role,
              desc: character.desc,
            });
            return (
              <button
                className="character-card"
                type="button"
                key={character.id}
                onClick={() => setSelectedCharacter(character.id)}
              >
                <span className="character-card-avatar">
                  <CharacterAvatar character={character} size="medium" />
                </span>
                <span className="character-card-body">
                  <span className="character-card-name">
                    <strong>{displayName(character, language)}</strong>
                    <span className="character-card-meta">
                      <small>
                        {language === "ja" ? character.name : character.jp}
                      </small>
                      <em>{profile.alias}</em>
                    </span>
                  </span>
                  <span className="character-card-identity">
                    <span className="character-card-role">{profile.role}</span>
                    <span className="character-card-factions">
                      {character.factions.slice(0, 2).map((factionId) => (
                        <small
                          key={factionId}
                          style={
                            {
                              "--faction-color": factions[factionId].color,
                            } as React.CSSProperties
                          }
                        >
                          {t(`factions.${factionId}`)}
                        </small>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">{t("common.noResult")}</div>
      )}

      <CharacterDrawer
        characterId={selectedCharacter}
        open={Boolean(selectedCharacter)}
        onClose={() => setSelectedCharacter(null)}
        onSelectCharacter={setSelectedCharacter}
      />
    </section>
  );
}
