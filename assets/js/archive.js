const { factions, characters, relations, relationTypes } = window.IKEBUKURO_DATA;

const characterById = new Map(characters.map((character) => [character.id, character]));
const CENTER_CHARACTER_ID = "mikado";
const AVATAR_PLACEHOLDER = "./assets/images/avatar-placeholder.svg";

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

function membersOf(factionId) {
  return characters.filter((character) => factionIdsFor(character).includes(factionId));
}

function appearanceMarkup(character) {
  const labels = {
    animation: "动画",
    ova: "OVA / 特别篇",
    novel: "小说卷 / 篇章",
    extra: "外传"
  };

  return Object.entries(character.appearances || {})
    .filter(([, items]) => items?.length)
    .map(([kind, items]) => `
      <div class="appearance-row">
        <div class="appearance-kind">${labels[kind] || kind}</div>
        <div class="appearance-items">
          ${items.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </div>
    `).join("");
}

function characterCard(character) {
  return `
    <button class="archive-character-card" type="button" data-character="${character.id}">
      <span class="archive-avatar-shell" style="--avatar-border-color:${avatarBorderColor(character)}">
        <img src="${avatarFor(character)}" alt="" onerror="this.src='${AVATAR_PLACEHOLDER}'">
      </span>
      <span class="archive-character-copy">
        <strong>${character.name}</strong>
        <small>${character.jp}</small>
      </span>
    </button>
  `;
}

function factionCard(id, faction) {
  const members = membersOf(id);
  return `
    <button class="archive-faction-card" type="button" data-faction="${id}" style="--faction-color:${faction.color}">
      <span class="archive-faction-index">${String(members.length).padStart(2, "0")}</span>
      <strong>${faction.name}</strong>
      <small>${members.slice(0, 5).map((member) => member.name).join(" · ")}</small>
      <span>查看 ${members.length} 位关联角色 →</span>
    </button>
  `;
}

function renderArchive(query = "") {
  const normalized = query.trim().toLowerCase();
  const visibleCharacters = characters.filter((character) =>
    [
      character.name,
      character.jp,
      character.alias,
      character.role,
      ...factionNamesFor(character)
    ].join(" ").toLowerCase().includes(normalized)
  );

  const visibleFactions = Object.entries(factions).filter(([id, faction]) =>
    faction.name.toLowerCase().includes(normalized) ||
    membersOf(id).some((character) =>
      [character.name, character.alias].join(" ").toLowerCase().includes(normalized)
    )
  );

  document.getElementById("archive-characters").innerHTML =
    visibleCharacters.map(characterCard).join("") ||
    '<p class="archive-empty">没有找到匹配角色。</p>';
  document.getElementById("archive-factions").innerHTML =
    visibleFactions.map(([id, faction]) => factionCard(id, faction)).join("") ||
    '<p class="archive-empty">没有找到匹配阵营。</p>';

  document.getElementById("character-result-count").textContent =
    `${visibleCharacters.length} / ${characters.length}`;
  document.getElementById("faction-result-count").textContent =
    `${visibleFactions.length} / ${Object.keys(factions).length}`;
}

function openCharacterModal(id) {
  const character = characterById.get(id);
  const connected = relations.filter(({ source, target }) => source === id || target === id);

  openModal(`
    <article class="archive-detail">
      <header class="archive-detail-hero" style="--hero-color:${factions[character.faction].color}">
        <span class="archive-avatar-shell archive-avatar-large" style="--avatar-border-color:${avatarBorderColor(character)}">
          <img src="${avatarFor(character)}" alt="${character.name}头像" onerror="this.src='${AVATAR_PLACEHOLDER}'">
          <span class="archive-identity-bars">
            ${factionIdsFor(character).map((factionId) =>
              `<i style="background:${factions[factionId].color}"></i>`
            ).join("")}
          </span>
        </span>
        <div>
          <span class="archive-file-label">Character file</span>
          <h2 id="archive-modal-title">${character.name}</h2>
          <p>${character.jp} · ${character.alias}</p>
          <div class="detail-tags">
            ${factionIdsFor(character).map((factionId) =>
              `<span class="detail-tag" style="--tag-color:${factions[factionId].color}">${factions[factionId].name}</span>`
            ).join("")}
            <span class="detail-tag">${character.role}</span>
          </div>
        </div>
      </header>
      <section class="archive-detail-section">
        <h3>人物档案 / Profile</h3>
        <p>${character.desc}</p>
      </section>
      <section class="archive-detail-section">
        <h3>主要出场 / Appearances</h3>
        <div class="appearances">${appearanceMarkup(character)}</div>
      </section>
      <section class="archive-detail-section">
        <h3>直接关系 / Connections</h3>
        <div class="archive-relation-list">
          ${connected.map((relation) => {
            const otherId = relation.source === id ? relation.target : relation.source;
            const other = characterById.get(otherId);
            return `
              <button type="button" data-character="${otherId}" style="--relation-color:${relationTypes[relation.type].color}">
                <span>${other.name}</span>
                <small>${relation.label}</small>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    </article>
  `);
}

function openFactionModal(id) {
  const faction = factions[id];
  const members = membersOf(id);

  openModal(`
    <article class="archive-detail faction-detail" style="--hero-color:${faction.color}">
      <header class="archive-detail-hero">
        <div class="archive-faction-emblem">${members.length}</div>
        <div>
          <span class="archive-file-label">Faction file</span>
          <h2 id="archive-modal-title">${faction.name}</h2>
          <p>${members.length} 位角色拥有该身份，包含当前、过去或剧情关键归属。</p>
        </div>
      </header>
      <section class="archive-detail-section">
        <h3>关联成员 / Members</h3>
        <div class="archive-modal-character-grid">
          ${members.map(characterCard).join("")}
        </div>
      </section>
    </article>
  `);
}

function openModal(content) {
  const modal = document.getElementById("archive-modal");
  document.getElementById("archive-modal-content").innerHTML = content;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  const modal = document.getElementById("archive-modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.getElementById("archive-character-count").textContent = characters.length;
document.getElementById("archive-faction-count").textContent = Object.keys(factions).length;
document.getElementById("archive-search").addEventListener("input", (event) => {
  renderArchive(event.target.value);
});

document.addEventListener("click", (event) => {
  const character = event.target.closest("[data-character]");
  const faction = event.target.closest("[data-faction]");
  if (character) openCharacterModal(character.dataset.character);
  else if (faction) openFactionModal(faction.dataset.faction);
});

document.getElementById("archive-modal-close").addEventListener("click", closeModal);
document.getElementById("archive-modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

renderArchive();
