import {
  ArrowRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Modal, Tag } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  characters,
  characterById,
  factions,
  membersOf,
  relations,
  resourceImages,
  works,
} from "../data";
import type { Language, ResourceImageKind } from "../types";

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  kind: "character" | "relation" | "faction" | "work" | "resource";
  title: string;
  subtitle: string;
  keywords: string;
  to: string;
}

const resourceKinds: ResourceImageKind[] = [
  "avatars",
  "avatars2",
  "avatarsTv1",
  "conceptTv1",
  "dvd",
  "music",
  "mangaCovers",
  "novelCovers",
];

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;

  const searchItems = useMemo<SearchResult[]>(() => {
    if (!open) return [];

    const characterItems = characters.map((character) => ({
      id: `character-${character.id}`,
      kind: "character" as const,
      title: language === "ja" ? character.jp : character.name,
      subtitle: `${character.alias} · ${character.role}`,
      keywords: [
        character.name,
        character.jp,
        character.alias,
        character.role,
        character.cv,
        ...character.factions.map((id) => t(`factions.${id}`)),
      ]
        .filter(Boolean)
        .join(" "),
      to: `/terms?view=characters&character=${character.id}`,
    }));

    const factionItems = Object.keys(factions).map((factionId) => {
      const members = membersOf(factionId);
      return {
        id: `faction-${factionId}`,
        kind: "faction" as const,
        title: t(`factions.${factionId}`),
        subtitle: t("terms.factionMembers", {
          count: members.length,
        }),
        keywords: [
          factionId,
          t(`factions.${factionId}`),
          ...members.flatMap(({ name, jp }) => [name, jp]),
        ].join(" "),
        to: `/terms?view=factions&faction=${factionId}`,
      };
    });

    const relationItems = relations.map((relation, index) => {
      const source = characterById.get(relation.source);
      const target = characterById.get(relation.target);
      const sourceName = source
        ? language === "ja"
          ? source.jp
          : source.name
        : relation.source;
      const targetName = target
        ? language === "ja"
          ? target.jp
          : target.name
        : relation.target;
      return {
        id: `relation-${relation.source}-${relation.target}-${index}`,
        kind: "relation" as const,
        title: `${sourceName} × ${targetName}`,
        subtitle:
          language === "ja"
            ? t(`relationTypes.${relation.type}`)
            : relation.label,
        keywords: [
          sourceName,
          targetName,
          source?.name,
          source?.jp,
          target?.name,
          target?.jp,
          relation.label,
          relation.note,
          t(`relationTypes.${relation.type}`),
        ]
          .filter(Boolean)
          .join(" "),
        to: `/?from=${relation.source}&to=${relation.target}`,
      };
    });

    const workItems = works.map((work) => ({
      id: `work-${work.id}`,
      kind: "work" as const,
      title: work.title[language],
      subtitle: `${t(`works.${work.category}`)} · ${work.meta[language]}`,
      keywords: [
        work.id,
        work.title.zh,
        work.title.ja,
        work.meta.zh,
        work.meta.ja,
        work.description.zh,
        work.description.ja,
      ].join(" "),
      to: `/works/${work.id}`,
    }));

    const resourceItems = resourceKinds.map((kind) => ({
      id: `resource-${kind}`,
      kind: "resource" as const,
      title: t(`resources.${kind}`),
      subtitle: `${String(resourceImages[kind].length).padStart(2, "0")} FILES`,
      keywords: `${kind} ${t(`resources.${kind}`)} ${t("resources.image")}`,
      to: `/resources/images/${kind}`,
    }));

    return [
      ...characterItems,
      ...relationItems,
      ...factionItems,
      ...workItems,
      ...resourceItems,
    ];
  }, [language, open, t]);

  const results = useMemo(() => {
    if (!open) return [];

    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) {
      const featuredIds = [
        "character-celty",
        "character-mikado",
        "faction-dollars",
        "work-tv-1",
        "work-novels-main-1",
        "resource-avatars",
      ];
      const searchItemById = new Map(
        searchItems.map((item) => [item.id, item]),
      );
      const featured = featuredIds.flatMap((id) => {
        const item = searchItemById.get(id);
        return item ? [item] : [];
      });
      const relation = searchItems.find(({ kind }) => kind === "relation");
      return relation ? [...featured, relation] : featured;
    }
    return searchItems
      .filter((item) =>
        `${item.title} ${item.subtitle} ${item.keywords}`
          .toLocaleLowerCase()
          .includes(normalized),
      )
      .slice(0, 24);
  }, [open, query, searchItems]);

  const openResult = (to: string) => {
    navigate(to);
    onClose();
    setQuery("");
  };

  return (
    <Modal
      className="global-search-modal"
      open={open}
      footer={null}
      width="min(92vw, 840px)"
      onCancel={onClose}
      title={null}
      destroyOnHidden
    >
      <div className="global-search-head">
        <span>SEARCH / IKEBUKURO DATABASE</span>
        <strong>{t("search.title")}</strong>
        <p>{t("search.lead")}</p>
      </div>
      <Input
        autoFocus
        allowClear
        size="large"
        prefix={<SearchOutlined />}
        value={query}
        placeholder={t("search.placeholder")}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="global-search-status">
        <span>{query ? t("search.results") : t("search.recommended")}</span>
        <strong>{String(results.length).padStart(2, "0")}</strong>
      </div>
      <div className="global-search-results">
        {results.length ? (
          results.map((result) => (
            <button
              type="button"
              key={result.id}
              onClick={() => openResult(result.to)}
            >
              <Tag>{t(`search.kinds.${result.kind}`)}</Tag>
              <span>
                <strong>{result.title}</strong>
                <small>{result.subtitle}</small>
              </span>
              <ArrowRightOutlined />
            </button>
          ))
        ) : (
          <div className="global-search-empty">{t("common.noResult")}</div>
        )}
      </div>
    </Modal>
  );
}
