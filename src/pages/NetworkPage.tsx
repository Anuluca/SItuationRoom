/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AimOutlined,
  CloseOutlined,
  FilterOutlined,
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Select, Tag, Timeline } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import CharacterAvatar from "../components/CharacterAvatar";
import CharacterDrawer from "../components/CharacterDrawer";
import CharacterProfileSections from "../components/CharacterProfileSections";
import PageHero from "../components/PageHero";
import ShareButton from "../components/ShareButton";
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
import type { Character, Language, LocalizedText } from "../types";

const CENTER_CHARACTER_ID = "mikado";
const MOBILE_HERO_QUERY = "(max-width: 860px)";
const GRAPH_FONT_FAMILY =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
let networkNodeRegistered = false;

interface TimelineEvent {
  index: string;
  episodes: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  characters: string[];
  accent: string;
}

interface HeroUpdate {
  title: string;
  description: string;
  image: string;
  to: string;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);
    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

const timelineSeasonAccent = {
  tv1: "#6bdcff",
  x2Shou: "#7aa7ff",
  x2Ten: "#8ce6ca",
  x2Ketsu: "#b89bff",
} as const;

const timelineEvents: TimelineEvent[] = [
  {
    index: "01",
    episodes: { zh: "TV 第1期 · 01—06", ja: "TV第1期 · 01—06" },
    title: { zh: "池袋与黑色骑手", ja: "池袋と黒いバイク" },
    description: {
      zh: "龙之峰帝人来到池袋，与纪田正臣重逢。塞尔提寻找头颅的都市传说，也在城市暗面逐渐展开。",
      ja: "竜ヶ峰帝人が池袋へ上京し、紀田正臣と再会。セルティの首をめぐる都市伝説も動き始める。",
    },
    characters: ["mikado", "masaomi", "celty"],
    accent: timelineSeasonAccent.tv1,
  },
  {
    index: "02",
    episodes: { zh: "TV 第1期 · 07—11", ja: "TV第1期 · 07—11" },
    title: { zh: "DOLLARS 首次集结", ja: "ダラーズ初集会" },
    description: {
      zh: "矢雾制药事件将诚二、美香与塞尔提的头颅牵到一起。帝人召集 DOLLARS，第一次公开自己的另一重身份。",
      ja: "矢霧製薬の事件が誠二、美香、セルティの首を結ぶ。帝人はダラーズを招集し、もう一つの顔を明かす。",
    },
    characters: ["mikado", "celty", "izaya"],
    accent: timelineSeasonAccent.tv1,
  },
  {
    index: "03",
    episodes: { zh: "TV 第1期 · 12—17", ja: "TV第1期 · 12—17" },
    title: { zh: "罪歌事件", ja: "罪歌事件" },
    description: {
      zh: "连续袭击事件席卷池袋，杏里与罪歌的秘密浮出水面。城市中的“爱”被扭曲成一张新的关系网。",
      ja: "連続通り魔事件が池袋を覆い、杏里と罪歌の秘密が露わになる。歪んだ「愛」が新たな相関を作る。",
    },
    characters: ["anri", "shizuo", "izaya"],
    accent: timelineSeasonAccent.tv1,
  },
  {
    index: "04",
    episodes: { zh: "TV 第1期 · 18—24", ja: "TV第1期 · 18—24" },
    title: { zh: "黄巾贼再起", ja: "黄巾賊、再び" },
    description: {
      zh: "黄巾贼与 DOLLARS 的冲突升级，正臣的过去被迫揭开。三位好友终于直面彼此隐瞒的身份。",
      ja: "黄巾賊とダラーズの対立が激化し、正臣の過去が明らかに。三人は互いに隠していた顔と向き合う。",
    },
    characters: ["masaomi", "mikado", "anri"],
    accent: timelineSeasonAccent.tv1,
  },
  {
    index: "05",
    episodes: { zh: "×2 承 · 01—12", ja: "×2 承 · 01—12" },
    title: { zh: "新势力进入池袋", ja: "新勢力、池袋へ" },
    description: {
      zh: "青叶、茜、瓦罗娜等人先后登场。围绕塞尔提的悬赏令，让黑道、杀手与街头势力同时躁动。",
      ja: "青葉、茜、ヴァローナらが登場。セルティへの懸賞金をきっかけに、裏社会と街の勢力が動き出す。",
    },
    characters: ["aoba", "akane", "vorona"],
    accent: timelineSeasonAccent.x2Shou,
  },
  {
    index: "06",
    episodes: { zh: "×2 转 · 13—24", ja: "×2 転 · 13—24" },
    title: { zh: "各阵营全面碰撞", ja: "交差する各陣営" },
    description: {
      zh: "DOLLARS、粟楠会、俄裔寿司店与外来势力彼此牵制。帝人开始用更激进的方式维护理想。",
      ja: "ダラーズ、粟楠会、露西亜寿司、外来勢力が交錯。帝人は理想を守るため、より過激な道へ進む。",
    },
    characters: ["mikado", "aoba", "kadota"],
    accent: timelineSeasonAccent.x2Ten,
  },
  {
    index: "07",
    episodes: { zh: "×2 结 · 25—30", ja: "×2 結 · 25—30" },
    title: { zh: "DOLLARS 分裂", ja: "分裂するダラーズ" },
    description: {
      zh: "帝人试图“净化”DOLLARS，正臣则为阻止他重返池袋。曾经松散的组织开始走向失控。",
      ja: "帝人はダラーズの「浄化」を進め、正臣は彼を止めるため池袋へ戻る。緩やかな組織は制御を失う。",
    },
    characters: ["mikado", "masaomi", "aoba"],
    accent: timelineSeasonAccent.x2Ketsu,
  },
  {
    index: "08",
    episodes: { zh: "×2 结 · 31—36", ja: "×2 結 · 31—36" },
    title: { zh: "池袋最终夜", ja: "池袋、最後の夜" },
    description: {
      zh: "塞尔提的头颅回归，静雄与临也迎来决战。帝人、正臣与杏里也为各自的选择作出最后回答。",
      ja: "セルティの首が戻り、静雄と臨也は決着へ。帝人、正臣、杏里もそれぞれの選択に答えを出す。",
    },
    characters: ["celty", "shizuo", "izaya"],
    accent: timelineSeasonAccent.x2Ketsu,
  },
];

interface GraphCanvasProps {
  visibleCharacters: Character[];
  language: Language;
  selectedId: string | null;
  compareIds: [string | null, string | null];
  onSelect: (id: string | null) => void;
  onOpenFilters: () => void;
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

const imageCache = new Map<string, HTMLImageElement>();

function getCorsImage(url?: string) {
  if (!url) return "";

  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  const image = new Image();

  // 必须在 src 前面设置
  image.crossOrigin = "anonymous";

  // 如果你刚改完 R2 CORS，建议临时加版本号破缓存
  image.src = `${url}${url.includes("?") ? "&" : "?"}v=1`;

  imageCache.set(url, image);

  return image;
}

function registerNetworkNode(G6: any) {
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
            img: getCorsImage(cfg?.avatar),
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
            fontFamily: GRAPH_FONT_FAMILY,
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
  onOpenFilters,
}: GraphCanvasProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const onSelectRef = useRef(onSelect);
  const translateRef = useRef(t);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [graphReady, setGraphReady] = useState(0);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    translateRef.current = t;
  }, [t]);

  const visibleIds = useMemo(
    () => new Set(visibleCharacters.map(({ id }) => id)),
    [visibleCharacters],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setLoading(true);
    let disposed = false;
    let graph: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let readyTimer = 0;
    let resizeFrame = 0;
    let handlePointerDown: ((event: PointerEvent) => void) | null = null;
    let handlePointerUp: ((event: PointerEvent) => void) | null = null;

    void import("@antv/g6").then(({ default: G6 }) => {
      if (disposed) return;
      registerNetworkNode(G6);

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
            ? translateRef.current(`relationTypes.${relation.type}`).split(" / ")[0]
            : relation.label,
        style: {
          stroke: relationTypes[relation.type].color,
          lineDash: relationTypes[relation.type].dash ?? undefined,
          opacity: 0.55,
          lineWidth: relation.type === "intimate" ? 2.2 : 1.4,
        },
      }));

      graph = new G6.Graph({
        container,
        width: container.clientWidth,
        height: container.clientHeight,
        renderer: "canvas",
        fitView: false,
        animate: true,
        modes: {
          default:
            window.matchMedia("(pointer: coarse)").matches ||
            window.innerWidth <= 860
              ? ["drag-canvas", "zoom-canvas"]
              : ["drag-canvas", "zoom-canvas", "drag-node"],
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
              fontFamily: GRAPH_FONT_FAMILY,
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
      setGraphReady((current) => current + 1);

      graph.on("node:click", (event: any) => {
        onSelectRef.current(event.item.getModel().id);
      });
      graph.on("canvas:click", () => onSelectRef.current(null));

      handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType !== "touch") return;
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
      };

      handlePointerUp = (event: PointerEvent) => {
        const start = pointerStartRef.current;
        pointerStartRef.current = null;
        if (event.pointerType !== "touch" || !start) return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) {
          return;
        }

        const point = graph.getPointByClient(event.clientX, event.clientY);
        const matchedNode = graph.getNodes().find((node: any) => {
          if (typeof node.isVisible === "function" && !node.isVisible()) {
            return false;
          }
          const model = node.getModel();
          const radius = Number(model.size ?? 48) / 2 + 12;
          return Math.hypot(point.x - model.x, point.y - model.y) <= radius;
        });

        event.preventDefault();
        event.stopPropagation();
        onSelectRef.current(matchedNode ? matchedNode.getModel().id : null);
      };

      container.addEventListener("pointerdown", handlePointerDown, true);
      container.addEventListener("pointerup", handlePointerUp, true);

      resizeObserver = new ResizeObserver(() => {
        if (graph.get("destroyed")) return;
        if (resizeFrame) return;
        resizeFrame = window.requestAnimationFrame(() => {
          resizeFrame = 0;
          if (graph.get("destroyed")) return;
          graph.changeSize(container.clientWidth, container.clientHeight);
        });
      });
      resizeObserver.observe(container);

      readyTimer = window.setTimeout(() => {
        setLoading(false);
        const center = graph.findById(CENTER_CHARACTER_ID);
        if (center) {
          graph.focusItem(center, false);
          if (
            window.matchMedia("(pointer: coarse)").matches ||
            window.innerWidth <= 860
          ) {
            graph.zoomTo(0.68, { x: centerX, y: centerY });
          }
        }
      }, 700);
    });

    return () => {
      disposed = true;
      window.clearTimeout(readyTimer);
      window.cancelAnimationFrame(resizeFrame);
      resizeObserver?.disconnect();
      if (handlePointerDown) {
        container.removeEventListener("pointerdown", handlePointerDown, true);
      }
      if (handlePointerUp) {
        container.removeEventListener("pointerup", handlePointerUp, true);
      }
      graph?.destroy();
      graphRef.current = null;
    };
  }, [language]);

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
  }, [graphReady, visibleIds]);

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
  }, [compareIds, graphReady, selectedId]);

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
      <Button
        className="filter-open-button"
        icon={<FilterOutlined />}
        onClick={onOpenFilters}
      >
        {t("network.filterConsole")}
      </Button>
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
  expanded: boolean;
  language: Language;
  onClose: () => void;
  onExpand: () => void;
  onSelect: (id: string) => void;
}

function NetworkDetail({
  characterId,
  expanded,
  language,
  onClose,
  onExpand,
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
      className={`network-detail selected ${
        expanded ? "is-expanded" : "is-peek"
      }`}
      style={
        {
          "--hero-color": factions[character.faction].color,
        } as React.CSSProperties
      }
    >
      <div className="network-detail-actions">
        <ShareButton
          compact
          className="drawer-action-button"
          title={displayName(character, language)}
          text={`${profile.alias} · ${profile.role}`}
        />
        <Button
          className="network-detail-close drawer-action-button"
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </div>
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
      </header>
      <Button
        block
        className="network-detail-expand"
        onClick={onExpand}
        type="primary"
      >
        {t("network.expandDetail")}
      </Button>
      <CharacterProfileSections
        character={character}
        language={language}
        onSelectCharacter={onSelect}
      />
    </aside>
  );
}

function NetworkHeroAside({ language }: { language: Language }) {
  const { t } = useTranslation();
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const heroUpdates = t("network.latest.items", {
    returnObjects: true,
  }) as HeroUpdate[];

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
                key={update.to}
                to={update.to}
              >
                <span className="hero-update-image">
                  <img src={update.image} alt="" />
                  <small>0{index + 1}</small>
                </span>
                <div>
                  <strong>{update.title}</strong>
                  <p>{update.description}</p>
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
                  {displayName(quiz.relatedCharacter, language)}·
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

function StoryTimeline({ language }: { language: Language }) {
  const { t } = useTranslation();

  return (
    <section className="story-timeline">
      <header className="timeline-intro">
        <span className="timeline-kicker">TV STORY ROUTE / 01—36</span>
        <h2>{t("network.timelineHeading")}</h2>
        <p>{t("network.timelineSummary")}</p>
        <div className="timeline-stats">
          <span>
            <strong>02</strong>
            {t("network.timelineSeasons")}
          </span>
          <span>
            <strong>08</strong>
            {t("network.timelineStages")}
          </span>
        </div>
        <small>{t("network.timelineSpoiler")}</small>
      </header>

      <div className="timeline-list">
        <Timeline
          className="story-timeline-track"
          items={timelineEvents.map((event) => {
            const eventCharacters = event.characters
              .map((id) => characterById.get(id))
              .filter((character): character is Character =>
                Boolean(character),
              );

            return {
              color: event.accent,
              dot: (
                <span
                  className="timeline-event-dot"
                  style={
                    {
                      "--timeline-accent": event.accent,
                    } as React.CSSProperties
                  }
                >
                  {event.index}
                </span>
              ),
              children: (
                <article
                  className="timeline-card"
                  style={
                    {
                      "--timeline-accent": event.accent,
                    } as React.CSSProperties
                  }
                >
                  <div className="timeline-card-copy">
                    <small>{event.episodes[language]}</small>
                    <h3>{event.title[language]}</h3>
                    <p>{event.description[language]}</p>
                    <div className="timeline-characters">
                      {eventCharacters.map((character) => (
                        <Link
                          key={character.id}
                          to={`/?character=${character.id}`}
                          title={displayName(character, language)}
                        >
                          <img
                            src={avatarFor(character)}
                            alt={displayName(character, language)}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ),
            };
          })}
        />
      </div>
    </section>
  );
}

export default function NetworkPage() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailExpanded, setDetailExpanded] = useState(false);
  const [hiddenDetailId, setHiddenDetailId] = useState<string | null>(null);
  const isMobileHero = useMediaQuery(MOBILE_HERO_QUERY);
  const groupsParam = searchParams.get("groups");
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const activeView =
    searchParams.get("view") === "timeline" ? "timeline" : "network";
  const factionIds = useMemo(() => Object.keys(factions), []);
  const factionMemberCounts = useMemo(
    () =>
      Object.fromEntries(
        factionIds.map((factionId) => [
          factionId,
          characters.filter((character) =>
            character.factions.includes(factionId),
          ).length,
        ]),
      ),
    [factionIds],
  );
  const activeFactions = useMemo(() => {
    const requested = groupsParam?.split(",").filter((id) => id in factions);
    return new Set(requested?.length ? requested : factionIds);
  }, [factionIds, groupsParam]);
  const compareIds = useMemo<[string | null, string | null]>(
    () => [
      characterById.has(fromParam ?? "") ? fromParam : null,
      characterById.has(toParam ?? "") ? toParam : null,
    ],
    [fromParam, toParam],
  );

  const updateParams = useCallback(
    (update: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(searchParams);
      update(next);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (!searchParams.has("character")) return;
    const next = new URLSearchParams(searchParams);
    next.delete("character");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const writeFactions = (next: Set<string>, params: URLSearchParams) => {
    if (next.size === factionIds.length) params.delete("groups");
    else params.set("groups", [...next].sort().join(","));
  };

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

  const selectCharacter = useCallback(
    (id: string | null) => {
      setHiddenDetailId(null);
      setDetailExpanded(false);
      setSelectedId(id);
    },
    [],
  );

  const toggleFaction = (value: string) => {
    setSelectedId(null);
    setHiddenDetailId(null);
    setDetailExpanded(false);
    updateParams((params) => {
      const next = new Set(activeFactions);
      if (next.has(value)) {
        if (next.size > 1) next.delete(value);
      } else {
        next.add(value);
      }
      writeFactions(next, params);
    });
  };

  const resetFilters = () => {
    setSelectedId(null);
    setHiddenDetailId(null);
    setDetailExpanded(false);
    updateParams((next) => {
      next.delete("groups");
      next.delete("from");
      next.delete("to");
    });
  };

  const setActiveView = (view: "network" | "timeline") => {
    updateParams((next) => {
      if (view === "timeline") next.set("view", "timeline");
      else next.delete("view");
    });
  };

  const searchOptions = useMemo(
    () =>
      characters.map((character) => ({
        value: character.id,
        label: `${displayName(character, language)} · ${
          language === "ja" ? character.name : character.jp
        }`,
      })),
    [language],
  );

  const revealComparedCharacter = (id: string | null, index: 0 | 1) => {
    updateParams((params) => {
      const key = index === 0 ? "from" : "to";
      if (id) params.set(key, id);
      else params.delete(key);

      const character = id ? characterById.get(id) : undefined;
      if (character) {
        const next = new Set(activeFactions);
        character.factions.forEach((factionId) => next.add(factionId));
        writeFactions(next, params);
      }
    });
  };

  return (
    <div className="page network-page">
      <PageHero
        title={
          activeView === "timeline"
            ? t("network.timelineTitle")
            : t("network.title")
        }
        lead={
          activeView === "timeline"
            ? t("network.timelineLead")
            : t("network.lead")
        }
        index="01"
        aside={!isMobileHero && <NetworkHeroAside language={language} />}
      />
      {isMobileHero && (
        <div className="network-hero-mobile-strip">
          <NetworkHeroAside language={language} />
        </div>
      )}

      <nav className="home-view-tabs" aria-label={t("network.viewLabel")}>
        <button
          className={activeView === "network" ? "is-active" : ""}
          onClick={() => setActiveView("network")}
          type="button"
        >
          <small>01</small>
          <span>{t("network.viewNetwork")}</span>
        </button>
        <button
          className={activeView === "timeline" ? "is-active" : ""}
          onClick={() => setActiveView("timeline")}
          type="button"
        >
          <small>02</small>
          <span>{t("network.viewTimeline")}</span>
        </button>
      </nav>

      {activeView === "network" ? (
        <section className="network-workspace">
          <button
            aria-label={t("common.close")}
            className={`filter-panel-backdrop${filtersOpen ? " is-open" : ""}`}
            onClick={() => setFiltersOpen(false)}
            type="button"
          />
          <aside
            className={`network-filters${filtersOpen ? " is-open" : ""}`}
          >
            <div className="network-filter-content">
              <div className="filter-header">
                <span>{t("network.filterConsole")}</span>
                <div>
                  <ShareButton
                    compact
                    className="filter-action-button"
                    title={t("network.graphTitle")}
                    text={t("network.lead")}
                  />
                  <Button
                    className="filter-action-button"
                    size="small"
                    icon={<ReloadOutlined />}
                    onClick={resetFilters}
                  >
                    {t("common.reset")}
                  </Button>
                  <Button
                    aria-label={t("common.close")}
                    className="filter-panel-close"
                    icon={<CloseOutlined />}
                    onClick={() => setFiltersOpen(false)}
                    size="small"
                    type="text"
                  />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-title">
                  <h2>{t("common.search")}</h2>
                  <Button
                    type="text"
                    size="small"
                    icon={<ReloadOutlined />}
                    onClick={() => selectCharacter(null)}
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
                    setHiddenDetailId(null);
                    setDetailExpanded(false);
                    setSelectedId(id ?? null);
                    updateParams((params) => {
                      const character = id ? characterById.get(id) : undefined;
                      if (character) {
                        const next = new Set(activeFactions);
                        character.factions.forEach((factionId) =>
                          next.add(factionId),
                        );
                        writeFactions(next, params);
                      }
                    });
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
                    onClick={() =>
                      updateParams((next) => {
                        next.delete("from");
                        next.delete("to");
                      })
                    }
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
                            "--relation-color":
                              relationTypes[relation.type].color,
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
                      updateParams((next) => next.delete("groups"))
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
                      className={
                        activeFactions.has(factionId) ? "active" : ""
                      }
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
                        {factionMemberCounts[factionId]}
                      </small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button
              block
              className="mobile-filter-close-button"
              icon={<CloseOutlined />}
              onClick={() => setFiltersOpen(false)}
            >
              {t("network.closeFilter")}
            </Button>
          </aside>

          <GraphCanvas
            visibleCharacters={visibleCharacters}
            language={language}
            selectedId={selectedId}
            compareIds={compareIds}
            onSelect={selectCharacter}
            onOpenFilters={() => setFiltersOpen(true)}
          />

          <NetworkDetail
            characterId={
              selectedId && hiddenDetailId !== selectedId ? selectedId : null
            }
            expanded={detailExpanded}
            language={language}
            onClose={() => {
              if (selectedId) setHiddenDetailId(selectedId);
              setDetailExpanded(false);
            }}
            onExpand={() => setDetailExpanded(true)}
            onSelect={selectCharacter}
          />
        </section>
      ) : (
        <StoryTimeline language={language} />
      )}
    </div>
  );
}
