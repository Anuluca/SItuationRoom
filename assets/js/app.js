const { factions, relationTypes, characters, relations } = window.IKEBUKURO_DATA;

const characterById = new Map(characters.map((character) => [character.id, character]));
const activeFactions = new Set(Object.keys(factions));
const activeRelations = new Set(Object.keys(relationTypes));
const CENTER_CHARACTER_ID = "mikado";
const AVATAR_PLACEHOLDER = "./assets/images/avatar-placeholder.svg";
let graph = null;
let selectedId = null;
let touchStart = null;
let lastTouchSelectionAt = 0;

function avatarFor(character) {
  return character.avatar || AVATAR_PLACEHOLDER;
}

function factionIdsFor(character) {
  return character.factions || [character.faction];
}

function factionNamesFor(character) {
  return factionIdsFor(character).map((id) => factions[id].name);
}

function avatarBorderColor(character) {
  return character.id === CENTER_CHARACTER_ID ? "#ffffff" : factions[character.faction].color;
}

function loadG6() {
  const sources = [
    "https://cdn.jsdelivr.net/npm/@antv/g6@4.8.24/dist/g6.min.js",
    "https://unpkg.com/@antv/g6@4.8.24/dist/g6.min.js"
  ];
  return new Promise((resolve, reject) => {
    const trySource = (index) => {
      if (index >= sources.length) {
        reject(new Error("G6 加载失败"));
        return;
      }
      const script = document.createElement("script");
      script.src = sources[index];
      script.onload = () => resolve(window.G6);
      script.onerror = () => {
        script.remove();
        trySource(index + 1);
      };
      document.head.appendChild(script);
    };
    trySource(0);
  });
}

function graphData() {
  const container = document.getElementById("graph");
  const centerX = Math.max(container.clientWidth / 2, 1);
  const centerY = Math.max(container.clientHeight / 2, 1);
  const visibleIds = new Set(
    characters
      .filter((character) =>
        character.id === CENTER_CHARACTER_ID ||
        factionIdsFor(character).some((id) => activeFactions.has(id))
      )
      .map((character) => character.id)
  );

  const nodes = characters
    .filter((character) => visibleIds.has(character.id))
    .map((character) => {
      const factionColor = factions[character.faction].color;
      const borderColor = avatarBorderColor(character);
      const identityColors = factionIdsFor(character).map((id) => factions[id].color);
      const node = {
        ...character,
        size: character.id === CENTER_CHARACTER_ID ? 64 : 44,
        avatar: avatarFor(character),
        identityColors,
        style: {
          fill: factionColor,
          stroke: borderColor,
          shadowColor: borderColor
        }
      };

      if (character.id === CENTER_CHARACTER_ID) {
        node.x = centerX;
        node.y = centerY;
        node.fx = centerX;
        node.fy = centerY;
      }

      return node;
    });

  const edges = relations
    .map((relation, index) => ({ ...relation, id: `edge-${index}` }))
    .filter(({ source, target, type }) =>
      visibleIds.has(source) && visibleIds.has(target) && activeRelations.has(type)
    )
    .map((relation) => ({
      ...relation,
      style: {
        stroke: relationTypes[relation.type].color,
        lineDash: relationTypes[relation.type].dash,
        opacity: 0.34,
        lineWidth: relation.type === "intimate" ? 1.7 : 1
      },
      labelCfg: {
        autoRotate: true,
        refY: -4,
        style: {
          fill: "#09090a",
          stroke: "#ffffff",
          lineWidth: 2.2,
          fontSize: 7,
          fontWeight: 400,
          opacity: 0.95
        }
      }
    }));

  return { nodes, edges };
}

function registerCharacterNode(G6) {
  G6.registerNode("character-node", {
    draw(cfg, group) {
      const size = Array.isArray(cfg.size) ? cfg.size[0] : cfg.size;
      const radius = size / 2;
      const color = cfg.style.stroke;
      const cornerRadius = Math.round(size * 0.25);
      const graphBackground = "#303136";

      const keyShape = group.addShape("rect", {
        attrs: {
          x: -radius,
          y: -radius,
          width: size,
          height: size,
          radius: cornerRadius,
          fill: "#24252a",
          fillOpacity: 1,
          stroke: "transparent",
          lineWidth: 0
        },
        name: "key-shape"
      });

      group.addShape("image", {
        attrs: {
          x: -radius,
          y: -radius,
          width: size,
          height: size,
          img: cfg.avatar
        },
        clip: {
          type: "rect",
          attrs: {
            x: -radius,
            y: -radius,
            width: size,
            height: size,
            radius: cornerRadius
          }
        },
        name: "avatar"
      });

      const cornerMaskPaths = [
        [
          ["M", -radius, -radius],
          ["L", -radius + cornerRadius, -radius],
          ["L", -radius + cornerRadius * 0.62, -radius + cornerRadius * 0.08],
          ["L", -radius + cornerRadius * 0.3, -radius + cornerRadius * 0.3],
          ["L", -radius + cornerRadius * 0.08, -radius + cornerRadius * 0.62],
          ["L", -radius, -radius + cornerRadius],
          ["Z"]
        ],
        [
          ["M", radius, -radius],
          ["L", radius - cornerRadius, -radius],
          ["L", radius - cornerRadius * 0.62, -radius + cornerRadius * 0.08],
          ["L", radius - cornerRadius * 0.3, -radius + cornerRadius * 0.3],
          ["L", radius - cornerRadius * 0.08, -radius + cornerRadius * 0.62],
          ["L", radius, -radius + cornerRadius],
          ["Z"]
        ],
        [
          ["M", radius, radius],
          ["L", radius - cornerRadius, radius],
          ["L", radius - cornerRadius * 0.62, radius - cornerRadius * 0.08],
          ["L", radius - cornerRadius * 0.3, radius - cornerRadius * 0.3],
          ["L", radius - cornerRadius * 0.08, radius - cornerRadius * 0.62],
          ["L", radius, radius - cornerRadius],
          ["Z"]
        ],
        [
          ["M", -radius, radius],
          ["L", -radius + cornerRadius, radius],
          ["L", -radius + cornerRadius * 0.62, radius - cornerRadius * 0.08],
          ["L", -radius + cornerRadius * 0.3, radius - cornerRadius * 0.3],
          ["L", -radius + cornerRadius * 0.08, radius - cornerRadius * 0.62],
          ["L", -radius, radius - cornerRadius],
          ["Z"]
        ]
      ];

      cornerMaskPaths.forEach((path, index) => {
        group.addShape("path", {
          attrs: {
            path,
            fill: graphBackground,
            stroke: graphBackground,
            lineWidth: 1
          },
          name: `corner-mask-${index}`
        });
      });

      group.addShape("rect", {
        attrs: {
          x: -radius,
          y: -radius,
          width: size,
          height: size,
          radius: cornerRadius,
          fill: "transparent",
          stroke: color,
          lineWidth: cfg.id === CENTER_CHARACTER_ID ? 3.5 : 2.5,
          shadowColor: color,
          shadowBlur: cfg.id === CENTER_CHARACTER_ID ? 12 : 4
        },
        name: "main-circle"
      });

      const identityColors = cfg.identityColors || [color];
      const markerWidth = 6;
      const markerGap = 3;
      const markerStart = -((identityColors.length * markerWidth) + ((identityColors.length - 1) * markerGap)) / 2;
      identityColors.forEach((identityColor, index) => {
        group.addShape("rect", {
          attrs: {
            x: markerStart + index * (markerWidth + markerGap),
            y: radius - 2,
            width: markerWidth,
            height: 3,
            radius: 1.5,
            fill: identityColor,
            stroke: "#ffffff",
            lineWidth: 1
          },
          name: `identity-marker-${index}`
        });
      });

      group.addShape("text", {
        attrs: {
          x: 0,
          y: radius + 12,
          text: cfg.name,
          fill: "#f1f0ea",
          fontSize: 8,
          fontWeight: 550,
          textAlign: "center",
          textBaseline: "middle"
        },
        name: "node-label"
      });

      return keyShape;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      const children = group.get("children");
      const circle = children.find((shape) => shape.get("name") === "main-circle");
      const label = children.find((shape) => shape.get("name") === "node-label");

      if (name === "dim") {
        children.forEach((shape) => {
          const shapeName = shape.get("name") || "";
          shape.attr("opacity", shapeName.startsWith("corner-mask-") ? 1 : (value ? 0.13 : 1));
        });
        if (!value) {
          circle.attr("fillOpacity", 1);
        }
      }

      if (name === "selected") {
        const isCenter = item.getModel().id === CENTER_CHARACTER_ID;
        circle.attr({
          fillOpacity: 1,
          lineWidth: value ? (isCenter ? 4.5 : 4) : (isCenter ? 3.5 : 2.5),
          shadowBlur: value ? 14 : (isCenter ? 12 : 4)
        });
        label.attr({
          fill: value ? "#ffffff" : "#b9b6be",
          fontWeight: value ? 800 : 550
        });
      }

      if (name === "neighbor") {
        circle.attr({ fillOpacity: 1 });
        label.attr({ fill: value ? "#ece9e2" : "#b9b6be" });
      }
    }
  }, "single-node");
}

function initGraph(G6) {
  registerCharacterNode(G6);
  const container = document.getElementById("graph");
  const isMobile = window.matchMedia("(max-width: 820px)").matches;

  graph = new G6.Graph({
    container,
    width: container.clientWidth,
    height: container.clientHeight,
    renderer: "canvas",
    fitView: false,
    animate: true,
    modes: {
      default: isMobile
        ? ["drag-canvas", "zoom-canvas"]
        : ["drag-canvas", "zoom-canvas", "drag-node"]
    },
    layout: {
      type: "force",
      center: [container.clientWidth / 2, container.clientHeight / 2],
      preventOverlap: true,
      nodeSpacing: 52,
      linkDistance: (edge) => edge.type === "intimate" || edge.type === "family" ? 150 : 215,
      nodeStrength: -185,
      edgeStrength: 0.08,
      collideStrength: 1,
      alphaDecay: 0.025
    },
    defaultNode: {
      type: "character-node"
    },
    defaultEdge: {
      type: "line",
      style: {
        stroke: "#777771",
        lineWidth: 1,
        opacity: 0.34
      },
      labelCfg: {
        autoRotate: true,
        style: {
          fill: "#09090a",
          stroke: "#ffffff",
          lineWidth: 2.2,
          fontSize: 7,
          fontWeight: 400
        }
      }
    },
    edgeStateStyles: {
      dim: { opacity: 0.045 },
      selected: { opacity: 0.92, lineWidth: 2.6, shadowBlur: 8 }
    }
  });

  graph.data(graphData());
  graph.render();

  graph.on("node:click", (event) => {
    if (Date.now() - lastTouchSelectionAt < 500) return;
    const id = event.item.getModel().id;
    selectCharacter(id, true);
  });

  graph.on("node:touchstart", (event) => {
    touchStart = {
      id: event.item.getModel().id,
      x: event.canvasX,
      y: event.canvasY
    };
  });

  graph.on("node:touchend", (event) => {
    if (!touchStart || touchStart.id !== event.item.getModel().id) return;
    const distance = Math.hypot(
      event.canvasX - touchStart.x,
      event.canvasY - touchStart.y
    );
    const id = touchStart.id;
    touchStart = null;
    if (distance > 10) return;
    lastTouchSelectionAt = Date.now();
    selectCharacter(id, true);
  });

  graph.on("canvas:click", () => {
    if (Date.now() - lastTouchSelectionAt < 500) return;
    clearFocus();
  });

  graph.on("node:mouseenter", (event) => {
    const model = event.item.getModel();
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = `<strong>${model.name}</strong><span>${model.alias} · ${factionNamesFor(model).join(" / ")}</span>`;
    tooltip.classList.add("visible");
    const bounds = container.getBoundingClientRect();
    tooltip.style.left = `${bounds.left + event.canvasX + 14}px`;
    tooltip.style.top = `${bounds.top + event.canvasY + 12}px`;
    container.style.cursor = "pointer";
  });

  graph.on("node:mouseleave", () => {
    document.getElementById("tooltip").classList.remove("visible");
    container.style.cursor = "default";
  });

  const resizeObserver = new ResizeObserver(() => {
    if (!graph || graph.get("destroyed")) return;
    graph.changeSize(container.clientWidth, container.clientHeight);
    const centerItem = graph.findById(CENTER_CHARACTER_ID);
    if (centerItem) {
      graph.updateItem(centerItem, {
        fx: container.clientWidth / 2,
        fy: container.clientHeight / 2
      });
    }
  });
  resizeObserver.observe(container);

  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    if (isMobile) {
      graph.zoomTo(0.52);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => centerOnMikado(false));
      });
    } else {
      centerOnMikado(false);
    }
  }, 900);
}

function centerOnMikado(animate = true) {
  if (!graph) return;
  const item = graph.findById(CENTER_CHARACTER_ID);
  if (!item) return;
  graph.focusItem(item, animate, { easing: "easeCubic", duration: 500 });
}

function clearGraphStates() {
  if (!graph) return;
  graph.getNodes().forEach((node) => graph.clearItemStates(node));
  graph.getEdges().forEach((edge) => {
    graph.clearItemStates(edge);
    setEdgeLabelVisual(edge, "default");
  });
}

function getEdgeLabelShape(edge) {
  const storedLabel = edge.get("labelShape");
  if (storedLabel && !storedLabel.get("destroyed")) return storedLabel;

  const children = edge.getContainer().get("children") || [];
  return children.find((shape) => {
    const name = shape.get("name") || shape.get("className") || "";
    const type = shape.get("type") || shape.get("shapeType") || "";
    const attrs = shape.attr() || {};
    return name.includes("label") || type === "text" || typeof attrs.text === "string";
  });
}

function setEdgeLabelVisual(edge, state) {
  const label = getEdgeLabelShape(edge);
  if (!label) return;

  if (state === "dim") {
    label.attr({
      fill: "#8b8b90",
      stroke: "#303136",
      lineWidth: 1.5,
      opacity: 0.38
    });
    return;
  }

  label.attr({
    fill: "#09090a",
    stroke: "#ffffff",
    lineWidth: 2.2,
    opacity: state === "selected" ? 1 : 0.95
  });
}

function setEdgeVisualState(edge, state, value) {
  graph.setItemState(edge, state, value);
  if (state === "dim") setEdgeLabelVisual(edge, value ? "dim" : "default");
  if (state === "selected" && value) setEdgeLabelVisual(edge, "selected");
}

function clearFocus() {
  selectedId = null;
  clearGraphStates();
  document.getElementById("detail-empty").style.display = "";
  document.getElementById("detail-content").classList.remove("visible");
  document.getElementById("detail-panel").classList.remove("open");
}

function selectCharacter(id, focus = true) {
  if (!graph || !characterById.has(id)) return;
  const item = graph.findById(id);
  if (!item) {
    const character = characterById.get(id);
    factionIdsFor(character).forEach((factionId) => activeFactions.add(factionId));
    renderFactionFilters();
    applyFilters(() => selectCharacter(id, focus));
    return;
  }

  selectedId = id;
  clearGraphStates();
  const connectedEdges = item.getEdges();
  const relatedIds = new Set([id]);

  graph.getNodes().forEach((node) => graph.setItemState(node, "dim", true));
  graph.getEdges().forEach((edge) => setEdgeVisualState(edge, "dim", true));

  graph.setItemState(item, "dim", false);
  graph.setItemState(item, "selected", true);

  connectedEdges.forEach((edge) => {
    setEdgeVisualState(edge, "dim", false);
    setEdgeVisualState(edge, "selected", true);
    const source = edge.getSource();
    const target = edge.getTarget();
    [source, target].forEach((node) => {
      relatedIds.add(node.getModel().id);
      graph.setItemState(node, "dim", false);
      if (node.getModel().id !== id) graph.setItemState(node, "neighbor", true);
    });
  });

  renderDetail(id);
  if (focus) {
    graph.focusItem(item, true, { easing: "easeCubic", duration: 500 });
  }
}

function renderDetail(id) {
  const character = characterById.get(id);
  const color = factions[character.faction].color;
  const index = characters.findIndex((item) => item.id === id) + 1;
  const connected = relations.filter(({ source, target }) => source === id || target === id);

  document.getElementById("detail-empty").style.display = "none";
  document.getElementById("detail-content").classList.add("visible");
  document.getElementById("detail-panel").classList.add("open");
  document.getElementById("detail-hero").style.setProperty("--hero-color", color);
  document.getElementById("detail-index").textContent = `FILE ${String(index).padStart(2, "0")} / ${String(characters.length).padStart(2, "0")}`;
  document.getElementById("detail-name").textContent = character.name;
  document.getElementById("detail-jp").textContent = `${character.jp} · ${character.alias}`;
  const detailAvatar = document.getElementById("detail-avatar");
  detailAvatar.src = avatarFor(character);
  detailAvatar.alt = `${character.name}头像`;
  detailAvatar.onerror = () => {
    detailAvatar.onerror = null;
    detailAvatar.src = AVATAR_PLACEHOLDER;
  };
  detailAvatar.closest(".detail-avatar-frame")
    .style.setProperty("--avatar-border-color", avatarBorderColor(character));
  document.getElementById("detail-avatar-bars").innerHTML = factionIdsFor(character)
    .map((id) => `<i style="background:${factions[id].color}"></i>`)
    .join("");
  document.getElementById("detail-tags").innerHTML = `
    ${factionIdsFor(character).map((id) =>
      `<span class="detail-tag" style="--tag-color:${factions[id].color}">${factions[id].name}</span>`
    ).join("")}
    <span class="detail-tag">${character.role}</span>
    <span class="detail-tag">${connected.length} 条直接关系</span>
  `;
  document.getElementById("detail-description").textContent = character.desc;
  renderAppearances(character);

  document.getElementById("connections").innerHTML = connected
    .sort((a, b) => a.type.localeCompare(b.type))
    .map((relation) => {
      const otherId = relation.source === id ? relation.target : relation.source;
      const other = characterById.get(otherId);
      return `
        <button class="connection" type="button" data-character="${otherId}" style="--connection-color:${relationTypes[relation.type].color}">
          <span class="connection-dot"></span>
          <span class="connection-name">${other.name}</span>
          <span class="connection-type">${relation.label}</span>
        </button>
      `;
    }).join("");
}

function renderAppearances(character) {
  const labels = {
    animation: "动画",
    ova: "OVA / 特别篇",
    novel: "小说卷 / 篇章",
    extra: "外传"
  };
  const appearances = character.appearances || {};

  document.getElementById("appearances").innerHTML = Object.entries(appearances)
    .filter(([, items]) => items && items.length)
    .map(([kind, items]) => `
      <div class="appearance-row">
        <div class="appearance-kind">${labels[kind] || kind}</div>
        <div class="appearance-items">
          ${items.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </div>
    `).join("");
}

function renderFactionFilters() {
  const container = document.getElementById("faction-filters");
  container.innerHTML = Object.entries(factions).map(([id, faction]) => {
    const count = characters.filter((character) => factionIdsFor(character).includes(id)).length;
    const off = activeFactions.has(id) ? "" : " off";
    return `
      <button class="filter-row${off}" type="button" data-faction="${id}" style="--filter-color:${faction.color}">
        <span class="filter-dot"></span>
        <span>${faction.name}</span>
        <span class="filter-count">${count}</span>
      </button>
    `;
  }).join("");
}

function renderRelationFilters() {
  const container = document.getElementById("relation-filters");
  container.innerHTML = Object.entries(relationTypes).map(([id, relation]) => {
    const off = activeRelations.has(id) ? "" : " off";
    return `
      <button class="relation-chip${off}" type="button" data-relation="${id}" style="--relation-color:${relation.color}">
        <span class="legend-line"></span>
        <span>${relation.name.split(" / ")[0]}</span>
      </button>
    `;
  }).join("");
}

function applyFilters(callback) {
  if (!graph) return;
  clearFocus();
  const data = graphData();
  graph.changeData(data);
  updateStats(data);
  setTimeout(() => {
    centerOnMikado(false);
    if (callback) callback();
  }, 550);
}

function updateStats(data = graphData()) {
  document.getElementById("visible-node-count").textContent = data.nodes.length;
  document.getElementById("visible-edge-count").textContent = data.edges.length;
}

function setupFilters() {
  renderFactionFilters();
  renderRelationFilters();

  document.getElementById("faction-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-faction]");
    if (!button) return;
    const id = button.dataset.faction;
    if (activeFactions.has(id) && activeFactions.size > 1) activeFactions.delete(id);
    else activeFactions.add(id);
    renderFactionFilters();
    applyFilters();
  });

  document.getElementById("relation-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-relation]");
    if (!button) return;
    const id = button.dataset.relation;
    if (activeRelations.has(id)) activeRelations.delete(id);
    else activeRelations.add(id);
    renderRelationFilters();
    applyFilters();
  });

  document.getElementById("reset-factions").addEventListener("click", resetFactions);
  document.getElementById("reset-relations").addEventListener("click", resetRelations);
  document.getElementById("reset-all").addEventListener("click", resetAll);
}

function resetFactions() {
  activeFactions.clear();
  Object.keys(factions).forEach((id) => activeFactions.add(id));
  renderFactionFilters();
  applyFilters();
}

function resetRelations() {
  activeRelations.clear();
  Object.keys(relationTypes).forEach((id) => activeRelations.add(id));
  renderRelationFilters();
  applyFilters();
}

function resetSearch() {
  const input = document.getElementById("search");
  input.value = "";
  document.getElementById("search-results").classList.remove("open");
  clearFocus();
}

function resetAll() {
  activeFactions.clear();
  activeRelations.clear();
  Object.keys(factions).forEach((id) => activeFactions.add(id));
  Object.keys(relationTypes).forEach((id) => activeRelations.add(id));
  document.getElementById("search").value = "";
  document.getElementById("search-results").classList.remove("open");
  renderFactionFilters();
  renderRelationFilters();
  applyFilters();
}

function setupSearch() {
  const input = document.getElementById("search");
  const results = document.getElementById("search-results");

  const renderResults = () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.classList.remove("open");
      return;
    }

    const matches = characters.filter((character) =>
          [
            character.name,
            character.jp,
            character.alias,
            character.role,
            ...factionNamesFor(character)
          ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    ).slice(0, 8);

    results.innerHTML = matches.length ? matches.map((character) => `
      <button class="search-result" type="button" role="option" data-character="${character.id}">
        <span class="result-dot" style="color:${factions[character.faction].color};background:currentColor"></span>
        <span class="result-copy">
          <span class="result-name">${character.name}</span>
              <span class="result-sub">${character.alias} · ${factionNamesFor(character).join(" / ")}</span>
        </span>
      </button>
    `).join("") : `
      <div class="search-result">
        <span class="result-sub">没有找到匹配角色</span>
      </div>
    `;
    results.classList.add("open");
  };

  input.addEventListener("input", renderResults);
  input.addEventListener("focus", renderResults);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const first = results.querySelector("[data-character]");
      if (first) first.click();
    }
    if (event.key === "Escape") {
      input.blur();
      results.classList.remove("open");
    }
  });

  results.addEventListener("click", (event) => {
    const button = event.target.closest("[data-character]");
    if (!button) return;
    selectCharacter(button.dataset.character);
    input.value = characterById.get(button.dataset.character).name;
    results.classList.remove("open");
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-wrap")) results.classList.remove("open");
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      input.focus();
    }
  });

  document.getElementById("reset-search").addEventListener("click", resetSearch);
}

function setupControls() {
  document.getElementById("zoom-in").addEventListener("click", () => {
    if (graph) graph.zoomTo(Math.min(2.5, graph.getZoom() * 1.18));
  });
  document.getElementById("zoom-out").addEventListener("click", () => {
    if (graph) graph.zoomTo(Math.max(0.25, graph.getZoom() / 1.18));
  });
  document.getElementById("fit-view").addEventListener("click", () => {
    centerOnMikado();
  });
  document.getElementById("connections").addEventListener("click", (event) => {
    const button = event.target.closest("[data-character]");
    if (button) selectCharacter(button.dataset.character);
  });
  document.getElementById("mobile-detail-close").addEventListener("click", clearFocus);
}

function showLoadError() {
  const loading = document.getElementById("loading");
  loading.innerHTML = `
    <div class="loading-inner">
      <div style="color:#ff6b7c;margin-bottom:9px">G6 资源加载失败</div>
      <div style="max-width:260px;line-height:1.7;letter-spacing:0;text-transform:none">
        请检查网络连接后刷新页面。角色资料与界面已就绪，但关系图需要加载 AntV G6。
      </div>
    </div>
  `;
}

setupFilters();
setupSearch();
setupControls();
updateStats();

loadG6()
  .then(initGraph)
  .catch((error) => {
    console.error(error);
    showLoadError();
  });
