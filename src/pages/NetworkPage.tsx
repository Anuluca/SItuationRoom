/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AimOutlined,
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import G6 from "@antv/g6";
import { Button, Carousel, Select, Tag } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CharacterAvatar from "../components/CharacterAvatar";
import CharacterDrawer from "../components/CharacterDrawer";
import CharacterProfileSections from "../components/CharacterProfileSections";
import PageHero from "../components/PageHero";
import { localizeProfile } from "../content";
import {
  avatarFor,
  characterById,
  characters,
  displayName,
  factions,
  relationTypes,
  relations,
} from "../data";
import type { Character, Language } from "../types";
import { Link } from "react-router-dom";

const CENTER_CHARACTER_ID = "mikado";
let networkNodeRegistered = false;

interface GraphCanvasProps {
  visibleCharacters: Character[];
  language: Language;
  selectedId: string | null;
  compareIds: [string | null, string | null];
  onSelect: (id: string | null) => void;
}

type EdgeEmphasis = "default" | "dim" | "selected";

function setEdgeLabelEmphasis(edge: any, emphasis: EdgeEmphasis) {
  const children = edge.getContainer().get("children");
  const labelShapes = children.filter(
    (shape: any) =>
      shape.get("type") === "text" || shape.get("name") === "edge-label",
  );

  labelShapes.forEach((shape: any) => {
    if (emphasis === "dim") {
      shape.attr({
        fill: "#77787d",
        stroke: "#303136",
        lineWidth: 3,
        opacity: 0.28,
      });
      return;
    }

    shape.attr({
      fill: "#08090b",
      stroke: "#ffffff",
      lineWidth: 4,
      opacity: 1,
    });
  });
}

function registerNetworkNode() {
  if (networkNodeRegistered) return;
  networkNodeRegistered = true;

  G6.registerNode(
    "joho-character",
    {
      draw(cfg: any, group: any) {
        const size = Number(cfg?.size ?? 42);
        const radius = size / 2;
        const color = cfg?.color ?? "#f4f500";
        const avatarRadius = Math.round(size * 0.25);
        const avatarShape = group.addShape("image", {
          attrs: {
            x: -radius,
            y: -radius,
            width: size,
            height: size,
            img: cfg?.avatar,
          },
          name: "avatar",
        });
        avatarShape.setClip({
          type: "rect",
          attrs: {
            x: -radius,
            y: -radius,
            width: size,
            height: size,
            radius: avatarRadius,
          },
        });

        const keyShape = group.addShape("rect", {
          attrs: {
            x: -radius,
            y: -radius,
            width: size,
            height: size,
            radius: avatarRadius,
            fill: "rgba(0, 0, 0, 0)",
            stroke: color,
            lineWidth: cfg?.id === CENTER_CHARACTER_ID ? 3 : 2,
            shadowColor: color,
            shadowBlur: cfg?.id === CENTER_CHARACTER_ID ? 16 : 7,
          },
          name: "key-shape",
        });

        group.addShape("text", {
          attrs: {
            x: 0,
            y: radius + 15,
            text: cfg?.label ?? "",
            fill: "#ffffff",
            fontSize: 11,
            fontWeight: 600,
            textAlign: "center",
            textBaseline: "middle",
          },
          name: "label",
        });

        const identityColors = cfg?.identityColors ?? [color];
        const markerWidth = 7;
        const gap = 3;
        const start =
          -(
            identityColors.length * markerWidth +
            (identityColors.length - 1) * gap
          ) / 2;
        identityColors.forEach((identityColor: string, index: number) => {
          group.addShape("rect", {
            attrs: {
              x: start + index * (markerWidth + gap),
              y: radius - 2,
              width: markerWidth,
              height: 3,
              fill: identityColor,
              stroke: "#fff",
              lineWidth: 0.8,
            },
            name: `identity-${index}`,
          });
        });

        return keyShape;
      },
      setState(name?: string, value?: string | boolean, item?: any) {
        if (!item) return;
        const children = item.getContainer().get("children");
        const keyShape = children.find(
          (shape: any) => shape.get("name") === "key-shape",
        );
        if (name === "dim") {
          children.forEach((shape: any) => shape.attr("opacity", value ? 0.14 : 1));
        }
        if (name === "selected") {
          keyShape.attr({
            lineWidth: value ? 4 : 2,
            shadowBlur: value ? 20 : 7,
          });
        }
        if (name === "neighbor") {
          keyShape.attr({ opacity: value ? 1 : keyShape.attr("opacity") });
        }
      },
    },
    "single-node",
  );
}

function GraphCanvas({
  visibleCharacters,
  language,
  selectedId,
  compareIds,
  onSelect,
}: GraphCanvasProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  const visibleIds = useMemo(
    () => new Set(visibleCharacters.map(({ id }) => id)),
    [visibleCharacters],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    registerNetworkNode();
    setLoading(true);

    const centerX = Math.max(container.clientWidth / 2, 1);
    const centerY = Math.max(container.clientHeight / 2, 1);
    const nodes = characters.map((character) => ({
      id: character.id,
      label: displayName(character, language),
      avatar: avatarFor(character),
      size: character.id === CENTER_CHARACTER_ID ? 66 : 48,
      color:
        character.id === CENTER_CHARACTER_ID
          ? "#ffffff"
          : factions[character.faction].color,
      identityColors: character.factions.map(
        (factionId) => factions[factionId].color,
      ),
      ...(character.id === CENTER_CHARACTER_ID
        ? { x: centerX, y: centerY, fx: centerX, fy: centerY }
        : {}),
    }));
    const edges = relations.map((relation, index) => ({
        ...relation,
        id: `edge-${index}`,
        label:
          language === "ja"
            ? t(`relationTypes.${relation.type}`).split(" / ")[0]
            : relation.label,
        style: {
          stroke: relationTypes[relation.type].color,
          lineDash: relationTypes[relation.type].dash ?? undefined,
          opacity: 0.55,
          lineWidth: relation.type === "intimate" ? 2.2 : 1.4,
        },
    }));

    const graph = new G6.Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight,
      renderer: "canvas",
      fitView: false,
      animate: true,
      modes: {
        default: ["drag-canvas", "zoom-canvas", "drag-node"],
      },
      layout: {
        type: "force",
        center: [centerX, centerY],
        preventOverlap: true,
        nodeSpacing: 58,
        linkDistance: 170,
        nodeStrength: -220,
        edgeStrength: 0.1,
        collideStrength: 1,
        alphaDecay: 0.03,
      },
      defaultNode: {
        type: "joho-character",
      },
      defaultEdge: {
        type: "line",
        labelCfg: {
          autoRotate: true,
          style: {
            fill: "#08090b",
            stroke: "#ffffff",
            lineWidth: 4,
            fontSize: 10,
            fontWeight: 700,
          },
        },
      },
      edgeStateStyles: {
        dim: { opacity: 0.04 },
        selected: { opacity: 0.96, lineWidth: 2.6, shadowBlur: 8 },
      },
    });

    graph.data({ nodes, edges });
    graph.render();
    graphRef.current = graph;

    graph.on("node:click", (event: any) => {
      onSelect(event.item.getModel().id);
    });
    graph.on("canvas:click", () => onSelect(null));

    const resizeObserver = new ResizeObserver(() => {
      if (graph.get("destroyed")) return;
      graph.changeSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    const readyTimer = window.setTimeout(() => {
      setLoading(false);
      const center = graph.findById(CENTER_CHARACTER_ID);
      if (center) graph.focusItem(center, true);
    }, 700);

    return () => {
      window.clearTimeout(readyTimer);
      resizeObserver.disconnect();
      graph.destroy();
      graphRef.current = null;
    };
  }, [language, onSelect, t]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph || graph.get("destroyed")) return;

    graph.getNodes().forEach((node: any) => {
      const shouldShow = visibleIds.has(node.getModel().id);
      if (shouldShow) {
        graph.showItem(node, false);
      } else {
        graph.hideItem(node, false);
      }
    });

    graph.getEdges().forEach((edge: any) => {
      const sourceId = edge.getSource().getModel().id;
      const targetId = edge.getTarget().getModel().id;
      if (visibleIds.has(sourceId) && visibleIds.has(targetId)) {
        graph.showItem(edge, false);
      } else {
        graph.hideItem(edge, false);
      }
    });
  }, [visibleIds]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph || graph.get("destroyed")) return;
    graph.getNodes().forEach((node: any) => graph.clearItemStates(node));
    graph.getEdges().forEach((edge: any) => {
      graph.clearItemStates(edge);
      setEdgeLabelEmphasis(edge, "default");
    });

    const [firstId, secondId] = compareIds;
    if (firstId && secondId && firstId !== secondId) {
      const first = graph.findById(firstId);
      const second = graph.findById(secondId);
      if (first && second) {
        graph
          .getNodes()
          .forEach((node: any) => graph.setItemState(node, "dim", true));
        graph
          .getEdges()
          .forEach((edge: any) => {
            graph.setItemState(edge, "dim", true);
            setEdgeLabelEmphasis(edge, "dim");
          });
        [first, second].forEach((node) => {
          graph.setItemState(node, "dim", false);
          graph.setItemState(node, "selected", true);
        });
        graph.getEdges().forEach((edge: any) => {
          const sourceId = edge.getSource().getModel().id;
          const targetId = edge.getTarget().getModel().id;
          if (
            (sourceId === firstId && targetId === secondId) ||
            (sourceId === secondId && targetId === firstId)
          ) {
            graph.setItemState(edge, "dim", false);
            graph.setItemState(edge, "selected", true);
            setEdgeLabelEmphasis(edge, "selected");
          }
        });
        graph.focusItem(first, true);
        return;
      }
    }

    if (!selectedId) return;

    const selected = graph.findById(selectedId);
    if (!selected) return;
    graph.getNodes().forEach((node: any) => graph.setItemState(node, "dim", true));
    graph.getEdges().forEach((edge: any) => {
      graph.setItemState(edge, "dim", true);
      setEdgeLabelEmphasis(edge, "dim");
    });
    graph.setItemState(selected, "dim", false);
    graph.setItemState(selected, "selected", true);

    selected.getEdges().forEach((edge: any) => {
      graph.setItemState(edge, "dim", false);
      graph.setItemState(edge, "selected", true);
      setEdgeLabelEmphasis(edge, "selected");
      [edge.getSource(), edge.getTarget()].forEach((node: any) => {
        graph.setItemState(node, "dim", false);
        if (node.getModel().id !== selectedId) {
          graph.setItemState(node, "neighbor", true);
        }
      });
    });
    graph.focusItem(selected, true);
  }, [compareIds, selectedId]);

  const zoom = (factor: number) => {
    const graph = graphRef.current;
    if (!graph) return;
    graph.zoomTo(Math.min(2.4, Math.max(0.25, graph.getZoom() * factor)));
  };

  const center = () => {
    const graph = graphRef.current;
    const item = graph?.findById(CENTER_CHARACTER_ID);
    if (item) graph.focusItem(item, true);
  };

  return (
    <div className="network-canvas-shell">
      <div className="canvas-label">{t("network.graphTitle")}</div>
      <div className="network-canvas" ref={containerRef} />
      <span className="canvas-hint">{t("network.graphHint")}</span>
      <div className="canvas-controls">
        <Button
          icon={<MinusOutlined />}
          aria-label="zoom out"
          onClick={() => zoom(0.84)}
        />
        <Button
          icon={<AimOutlined />}
          aria-label={t("network.center")}
          onClick={center}
        />
        <Button
          icon={<PlusOutlined />}
          aria-label="zoom in"
          onClick={() => zoom(1.18)}
        />
      </div>
      {loading && (
        <div className="graph-loading">
          <div className="graph-loading-mark">
            <span aria-hidden="true" />
            <strong>{t("network.loading")}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

interface NetworkDetailProps {
  characterId: string | null;
  language: Language;
  onClose: () => void;
  onSelect: (id: string) => void;
}

function NetworkDetail({
  characterId,
  language,
  onClose,
  onSelect,
}: NetworkDetailProps) {
  const { t } = useTranslation();
  const character = characterId ? characterById.get(characterId) : undefined;

  if (!character) {
    return (
      <aside className="network-detail empty">
        <div className="empty-symbol" aria-hidden="true">
          <span />
        </div>
        <h2>{t("network.selectTitle")}</h2>
        <p>{t("network.selectDesc")}</p>
      </aside>
    );
  }

  const profile = localizeProfile(character.id, language, {
    alias: character.alias,
    role: character.role,
    desc: character.desc,
  });
  return (
    <aside
      className="network-detail selected"
      style={
        {
          "--hero-color": factions[character.faction].color,
        } as React.CSSProperties
      }
    >
      <Button
        className="network-detail-close"
        type="text"
        icon={<CloseOutlined />}
        onClick={onClose}
      />
      <header>
        <CharacterAvatar character={character} size="large" />
        <h2>{displayName(character, language)}</h2>
        <p>
          {language === "ja" ? character.name : character.jp} · {profile.alias}
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
            <Tag key={factionId} color={factions[factionId].color}>
              {t(`factions.${factionId}`)}
            </Tag>
          ))}
        </div>
      </header>
      <CharacterProfileSections
        character={character}
        language={language}
        onSelectCharacter={onSelect}
      />
    </aside>
  );
}

const heroUpdates = [
  {
    key: "characters",
    image: avatarFor(characterById.get("manami") ?? characters[0]),
    to: "/terms/characters",
  },
  {
    key: "resources",
    image: "https://www.durarara.com/img/music/ost/jk.jpg",
    to: "/resources",
  },
  {
    key: "network",
    image: "https://www.durarara.com/img/top/KV.jpg",
    to: "/",
  },
] as const;

function NetworkHeroAside({ language }: { language: Language }) {
  const { t } = useTranslation();
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  const quizCandidates = useMemo(
    () =>
      characters.flatMap((character) => {
        const relation = relations.find(
          (item) => item.source === character.id || item.target === character.id,
        );
        if (!relation) return [];

        const relatedId =
          relation.source === character.id ? relation.target : relation.source;
        const relatedCharacter = characterById.get(relatedId);
        if (!relatedCharacter) return [];

        return [{ character, relation, relatedCharacter }];
      }),
    [],
  );
  const [quizRound, setQuizRound] = useState(() =>
    quizCandidates.length
      ? Math.floor(Math.random() * quizCandidates.length)
      : 0,
  );

  const quiz = quizCandidates[quizRound % quizCandidates.length];
  if (!quiz) return null;

  const relationLabel =
    language === "ja"
      ? t(`relationTypes.${quiz.relation.type}`)
      : quiz.relation.label;

  const nextQuiz = () => {
    setQuizRevealed(false);
    setDetailId(null);
    setQuizRound((current) => {
      if (quizCandidates.length <= 1) return 0;
      const offset =
        1 + Math.floor(Math.random() * (quizCandidates.length - 1));
      return (current + offset) % quizCandidates.length;
    });
  };

  const revealOrOpenProfile = () => {
    if (!quizRevealed) {
      setQuizRevealed(true);
      return;
    }
    setDetailId(quiz.character.id);
  };

  return (
    <>
      <div className="network-hero-console">
        <section className="network-hero-panel hero-updates">
          <div className="hero-panel-heading">
            <span>UPDATE</span>
            <strong>{t("network.latestTitle")}</strong>
          </div>
          <Carousel arrows autoplay autoplaySpeed={4800} dots>
            {heroUpdates.map((update, index) => (
              <Link
                className="hero-update-item"
                key={update.key}
                to={update.to}
              >
                <span className="hero-update-image">
                  <img src={update.image} alt="" />
                  <small>0{index + 1}</small>
                </span>
                <div>
                  <strong>{t(`network.latest.${update.key}.title`)}</strong>
                  <p>{t(`network.latest.${update.key}.description`)}</p>
                  <em>{t("network.latestOpen")}</em>
                </div>
              </Link>
            ))}
          </Carousel>
        </section>

        <section className="network-hero-panel hero-who">
          <div className="hero-panel-heading">
            <span>WHO</span>
            <strong>{t("network.quizTitle")}</strong>
            <Button
              aria-label={t("network.quizNext")}
              className="hero-quiz-reset"
              icon={<ReloadOutlined />}
              onClick={nextQuiz}
              size="small"
              title={t("network.quizNext")}
              type="text"
            >
              {t("network.quizNext")}
            </Button>
          </div>
          <button
            aria-label={
              quizRevealed
                ? t("network.quizOpenProfile")
                : t("network.quizReveal")
            }
            className={`hero-who-card ${quizRevealed ? "is-revealed" : ""}`}
            onClick={revealOrOpenProfile}
            style={
              {
                "--quiz-color":
                  factions[quiz.character.faction]?.color ?? "#f4f500",
              } as React.CSSProperties
            }
            type="button"
          >
            <span className="hero-who-avatar">
              {quizRevealed ? (
                <img
                  src={avatarFor(quiz.character)}
                  alt={displayName(quiz.character, language)}
                />
              ) : (
                <b aria-hidden="true">?</b>
              )}
            </span>
            <span className="hero-who-copy">
              <small className="hero-who-prompt">
                {t("network.quizPrompt")}
              </small>
              <strong className="hero-who-clues">
                <span>
                  <i
                    style={{
                      backgroundColor: "var(--quiz-color)",
                    }}
                  />
                  {t(`factions.${quiz.character.faction}`)}
                </span>
                <span>
                  {displayName(quiz.relatedCharacter, language)} ·{" "}
                  {relationLabel}
                </span>
              </strong>
              {quizRevealed ? (
                <span className="hero-who-name">
                  {displayName(quiz.character, language)}
                </span>
              ) : (
                <small className="hero-who-action">
                  {t("network.quizReveal")}
                </small>
              )}
            </span>
          </button>
        </section>
      </div>
      <CharacterDrawer
        characterId={detailId}
        open={Boolean(detailId)}
        onClose={() => setDetailId(null)}
        onSelectCharacter={setDetailId}
      />
    </>
  );
}

export default function NetworkPage() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const [activeFactions, setActiveFactions] = useState(
    () => new Set(Object.keys(factions)),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const visibleCharacters = useMemo(
    () =>
      characters.filter(
        (character) =>
          character.id === CENTER_CHARACTER_ID ||
          character.factions.some((factionId) =>
            activeFactions.has(factionId),
          ),
      ),
    [activeFactions],
  );

  const comparedRelations = useMemo(() => {
    const [firstId, secondId] = compareIds;
    if (!firstId || !secondId || firstId === secondId) return [];
    return relations.filter(
      ({ source, target }) =>
        (source === firstId && target === secondId) ||
        (source === secondId && target === firstId),
    );
  }, [compareIds]);

  const selectCharacter = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const toggleFaction = (value: string) => {
    setActiveFactions((current) => {
      const next = new Set(current);
      if (next.has(value)) {
        if (next.size > 1) next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
    setSelectedId(null);
  };

  const resetFilters = () => {
    setActiveFactions(new Set(Object.keys(factions)));
    setSelectedId(null);
    setCompareIds([null, null]);
  };

  const searchOptions = characters.map((character) => ({
    value: character.id,
    label: `${displayName(character, language)} · ${
      language === "ja" ? character.name : character.jp
    }`,
  }));

  const revealComparedCharacter = (id: string | null, index: 0 | 1) => {
    if (id) {
      const character = characterById.get(id);
      if (character) {
        setActiveFactions((current) => {
          const next = new Set(current);
          character.factions.forEach((factionId) => next.add(factionId));
          return next;
        });
      }
    }
    setCompareIds((current) =>
      index === 0 ? [id, current[1]] : [current[0], id],
    );
  };

  return (
    <div className="page network-page">
      <PageHero
        title={t("network.title")}
        lead={t("network.lead")}
        index="01"
        aside={<NetworkHeroAside language={language} />}
      />

      <section className="network-workspace">
        <aside className="network-filters">
          <div className="filter-header">
            <span>{t("network.filterConsole")}</span>
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={resetFilters}
            >
              {t("common.reset")}
            </Button>
          </div>
          <div className="filter-block">
            <div className="filter-block-title">
              <h2>{t("common.search")}</h2>
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => setSelectedId(null)}
              >
                {t("common.reset")}
              </Button>
            </div>
            <Select
              showSearch
              allowClear
              value={selectedId ?? undefined}
              placeholder={t("network.searchPlaceholder")}
              optionFilterProp="label"
              options={searchOptions}
              onChange={(id) => {
                if (id) {
                  const character = characterById.get(id);
                  if (character) {
                    setActiveFactions((current) => {
                      const next = new Set(current);
                      character.factions.forEach((factionId) =>
                        next.add(factionId),
                      );
                      return next;
                    });
                  }
                }
                setSelectedId(id ?? null);
              }}
            />
          </div>
          <div className="filter-block compare-block">
            <div className="filter-block-title">
              <h2>{t("network.compareTitle")}</h2>
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => setCompareIds([null, null])}
              >
                {t("common.reset")}
              </Button>
            </div>
            <Select
              showSearch
              allowClear
              value={compareIds[0] ?? undefined}
              placeholder={t("network.compareFirst")}
              optionFilterProp="label"
              options={searchOptions}
              onChange={(id) => revealComparedCharacter(id ?? null, 0)}
            />
            <Select
              showSearch
              allowClear
              value={compareIds[1] ?? undefined}
              placeholder={t("network.compareSecond")}
              optionFilterProp="label"
              options={searchOptions}
              onChange={(id) => revealComparedCharacter(id ?? null, 1)}
            />
            <div className="compare-result">
              {!compareIds[0] ||
              !compareIds[1] ||
              compareIds[0] === compareIds[1] ? (
                <p>{t("network.compareEmpty")}</p>
              ) : comparedRelations.length ? (
                comparedRelations.map((relation, index) => (
                  <article
                    key={`${relation.source}-${relation.target}-${index}`}
                    style={
                      {
                        "--relation-color": relationTypes[relation.type].color,
                      } as React.CSSProperties
                    }
                  >
                    <strong>
                      {language === "ja"
                        ? t(`relationTypes.${relation.type}`)
                        : relation.label}
                    </strong>
                    <span>{relation.note}</span>
                  </article>
                ))
              ) : (
                <p>{t("network.compareNone")}</p>
              )}
            </div>
          </div>
          <div className="filter-block">
            <div className="filter-block-title">
              <h2>{t("network.factionFilter")}</h2>
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() =>
                  setActiveFactions(new Set(Object.keys(factions)))
                }
              >
                {t("common.reset")}
              </Button>
            </div>
            <div className="faction-filter-grid">
              {Object.entries(factions).map(([factionId, faction]) => (
                <button
                  type="button"
                  key={factionId}
                  data-faction={factionId}
                  className={activeFactions.has(factionId) ? "active" : ""}
                  style={
                    {
                      "--filter-color": faction.color,
                    } as React.CSSProperties
                  }
                  onClick={() => toggleFaction(factionId)}
                >
                  <i style={{ background: faction.color }} />
                  <span>{t(`factions.${factionId}`)}</span>
                  <small>
                    {
                      characters.filter((character) =>
                        character.factions.includes(factionId),
                      ).length
                    }
                  </small>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <GraphCanvas
          visibleCharacters={visibleCharacters}
          language={language}
          selectedId={selectedId}
          compareIds={compareIds}
          onSelect={selectCharacter}
        />

        <NetworkDetail
          characterId={selectedId}
          language={language}
          onClose={() => setSelectedId(null)}
          onSelect={setSelectedId}
        />
      </section>
    </div>
  );
}
