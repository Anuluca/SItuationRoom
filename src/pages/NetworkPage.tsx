/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AimOutlined,
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import G6 from "@antv/g6";
import { Button, Select, Tag } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CharacterAvatar from "../components/CharacterAvatar";
import PageHero from "../components/PageHero";
import { localizeProfile } from "../content";
import {
  characterById,
  characters,
  displayName,
  factions,
  relationTypes,
  relations,
} from "../data";
import type { Character, Language } from "../types";

const CENTER_CHARACTER_ID = "mikado";
let networkNodeRegistered = false;

interface GraphCanvasProps {
  visibleCharacters: Character[];
  language: Language;
  selectedId: string | null;
  compareIds: [string | null, string | null];
  onSelect: (id: string | null) => void;
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
        const keyShape = group.addShape("rect", {
          attrs: {
            x: -radius,
            y: -radius,
            width: size,
            height: size,
            radius: Math.round(size * 0.25),
            fill: "#24252a",
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
            y: 1,
            text: cfg?.initial ?? "I",
            fill: color,
            fontFamily: "Georgia, serif",
            fontSize: cfg?.id === CENTER_CHARACTER_ID ? 18 : 14,
            fontWeight: 800,
            textAlign: "center",
            textBaseline: "middle",
          },
          name: "initial",
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
      initial: displayName(character, language).slice(0, 1),
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
    graph.getEdges().forEach((edge: any) => graph.clearItemStates(edge));

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
          .forEach((edge: any) => graph.setItemState(edge, "dim", true));
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
    graph.getEdges().forEach((edge: any) => graph.setItemState(edge, "dim", true));
    graph.setItemState(selected, "dim", false);
    graph.setItemState(selected, "selected", true);

    selected.getEdges().forEach((edge: any) => {
      graph.setItemState(edge, "dim", false);
      graph.setItemState(edge, "selected", true);
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
      <div className="canvas-label">Ikebukuro · Tokyo · Network 01</div>
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
          <span />
          {t("network.loading")}
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
  const connected = relations.filter(
    ({ source, target }) => source === character.id || target === character.id,
  );

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
        <span className="file-index">
          FILE {String(characters.indexOf(character) + 1).padStart(2, "0")}
        </span>
        <h2>{displayName(character, language)}</h2>
        <p>
          {language === "ja" ? character.name : character.jp} · {profile.alias}
        </p>
        <div className="file-tags">
          {character.factions.map((factionId) => (
            <Tag key={factionId} color={factions[factionId].color}>
              {t(`factions.${factionId}`)}
            </Tag>
          ))}
        </div>
      </header>
      <section>
        <h3>{t("network.profile")} / Profile</h3>
        <p>{profile.desc}</p>
      </section>
      <section>
        <h3>{t("network.connections")} / Connections</h3>
        <div className="network-connection-list">
          {connected.map((relation, index) => {
            const otherId =
              relation.source === character.id
                ? relation.target
                : relation.source;
            const other = characterById.get(otherId);
            if (!other) return null;
            return (
              <button
                type="button"
                key={`${relation.source}-${relation.target}-${index}`}
                style={
                  {
                    "--relation-color": relationTypes[relation.type].color,
                  } as React.CSSProperties
                }
                onClick={() => onSelect(otherId)}
              >
                <span>{displayName(other, language)}</span>
                <small>
                  {language === "ja"
                    ? t(`relationTypes.${relation.type}`)
                    : relation.label}
                </small>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
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

  const visibleRelations = useMemo(() => {
    const visibleIds = new Set(visibleCharacters.map(({ id }) => id));
    return relations.filter(
      ({ source, target }) =>
        visibleIds.has(source) && visibleIds.has(target),
    ).length;
  }, [visibleCharacters]);

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
        aside={
          <div className="page-hero-stats">
            <div>
              <strong>{visibleCharacters.length}</strong>
              <span>{t("common.characters")}</span>
            </div>
            <div>
              <strong>{visibleRelations}</strong>
              <span>{t("common.relations")}</span>
            </div>
          </div>
        }
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
