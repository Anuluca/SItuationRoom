import {
  ArrowRightOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CharacterAvatar from "../components/CharacterAvatar";
import CharacterDrawer from "../components/CharacterDrawer";
import SectionTitle from "../components/SectionTitle";
import {
  displayName,
  factionBackgrounds,
  factions,
  membersOf,
} from "../data";
import type { Language } from "../types";

export default function FactionsPage() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const [query, setQuery] = useState("");
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const visibleFactions = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return Object.entries(factions).filter(([factionId]) => {
      const members = membersOf(factionId);
      return [
        t(`factions.${factionId}`),
        ...members.flatMap((character) => [character.name, character.jp]),
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalized);
    });
  }, [query, t]);

  const factionMembers = selectedFaction ? membersOf(selectedFaction) : [];

  return (
    <section className="archive-panel">
      <div className="archive-toolbar">
        <SectionTitle title={t("nav.factions")} />
        <Input
          allowClear
          prefix={<SearchOutlined />}
          value={query}
          placeholder={t("terms.searchPlaceholder")}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="archive-result-line">
        <span>{t("terms.factionCount", { count: visibleFactions.length })}</span>
        <strong>
          {String(visibleFactions.length).padStart(2, "0")} /{" "}
          {String(Object.keys(factions).length).padStart(2, "0")}
        </strong>
      </div>

      <div className="faction-grid">
        {visibleFactions.map(([factionId, faction]) => {
          const members = membersOf(factionId);
          return (
            <button
              className="faction-card"
              type="button"
              key={factionId}
              style={
                {
                  "--faction-color": faction.color,
                  "--faction-image": `url("${factionBackgrounds[factionId]}")`,
                } as React.CSSProperties
              }
              onClick={() => setSelectedFaction(factionId)}
            >
              <strong>{t(`factions.${factionId}`)}</strong>
              <p>
                {members
                  .slice(0, 5)
                  .map((character) => displayName(character, language))
                  .join(" · ")}
              </p>
              <span>
                {t("terms.factionMembers", { count: members.length })}{" "}
                <ArrowRightOutlined />
              </span>
              <i aria-hidden="true">{String(members.length).padStart(2, "0")}</i>
            </button>
          );
        })}
      </div>

      <Drawer
        className="faction-drawer"
        open={Boolean(selectedFaction)}
        width="min(92vw, 600px)"
        closeIcon={false}
        onClose={() => setSelectedFaction(null)}
        title={null}
      >
        {selectedFaction && (
          <article
            className="faction-file"
            style={
              {
                "--faction-color": factions[selectedFaction].color,
                "--faction-image": `url("${factionBackgrounds[selectedFaction]}")`,
              } as React.CSSProperties
            }
          >
            <Button
              className="file-close"
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setSelectedFaction(null)}
            />
            <header>
              <div>
                <h2>{t(`factions.${selectedFaction}`)}</h2>
                <p>
                  {t("terms.factionMembers", {
                    count: factionMembers.length,
                  })}
                </p>
              </div>
            </header>
            <section className="file-section">
              <h3>{t("common.members")} / Members</h3>
              <div className="faction-member-list">
                {factionMembers.map((character) => (
                  <button
                    key={character.id}
                    type="button"
                    onClick={() => setSelectedCharacter(character.id)}
                  >
                    <CharacterAvatar character={character} size="small" />
                    <span>
                      <strong>{displayName(character, language)}</strong>
                      <small>
                        {language === "ja" ? character.name : character.jp}
                      </small>
                    </span>
                    <ArrowRightOutlined />
                  </button>
                ))}
              </div>
            </section>
          </article>
        )}
      </Drawer>

      <CharacterDrawer
        characterId={selectedCharacter}
        open={Boolean(selectedCharacter)}
        onClose={() => setSelectedCharacter(null)}
        onSelectCharacter={setSelectedCharacter}
      />
    </section>
  );
}
