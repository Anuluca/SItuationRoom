import {
  ArrowUpOutlined,
  CloseOutlined,
  GlobalOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown } from "antd";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import {
  characterById,
  resourceImages,
  relations,
  works,
} from "../data";
import type { Language } from "../types";
import GlobalSearch from "./GlobalSearch";

const navItems = [
  { to: "/", key: "home", end: true, en: "Home" },
  { to: "/terms", key: "terms", en: "Terms" },
  { to: "/works", key: "works", en: "Works" },
  { to: "/resources", key: "resources", en: "Resources" },
  { to: "/about", key: "about", en: "About" },
];

const setMetaContent = (selector: string, content: string) => {
  document.querySelector(selector)?.setAttribute("content", content);
};

interface PageMeta {
  title: string;
  description: string;
  image?: string;
  type: string;
}

export default function AppShell() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mainScroll, setMainScroll] = useState({
    scrollable: false,
    atBottom: true,
    awayFromTop: false,
  });
  const mainRef = useRef<HTMLElement>(null);
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;

  const titleKey = useMemo(() => {
    if (location.pathname.startsWith("/terms")) return "terms";
    if (location.pathname.startsWith("/works")) return "works";
    if (location.pathname.startsWith("/resources")) return "resources";
    if (location.pathname.startsWith("/about")) return "about";
    return "home";
  }, [location.pathname]);

  const pageMeta = useMemo<PageMeta>(() => {
    const params = new URLSearchParams(location.search);
    const workId = location.pathname.startsWith("/works/")
      ? location.pathname.slice("/works/".length)
      : "";
    const work = works.find(({ id }) => id === workId);
    const character = characterById.get(params.get("character") ?? "");
    const relation = relations.find(
      ({ source, target }) =>
        (source === params.get("from") && target === params.get("to")) ||
        (source === params.get("to") && target === params.get("from")),
    );
    const resourceKind = location.pathname.startsWith("/resources/images/")
      ? location.pathname.slice("/resources/images/".length)
      : "";
    const resourceExists =
      resourceKind in resourceImages;
    const knownRoute =
      location.pathname === "/" ||
      location.pathname === "/network" ||
      location.pathname === "/works" ||
      location.pathname === "/resources" ||
      location.pathname === "/about" ||
      location.pathname === "/terms" ||
      Boolean(work) ||
      resourceExists;

    if (!knownRoute) {
      return {
        title: `${t("notFound.title")} | ${t("site.name")}`,
        description: t("notFound.lead"),
        type: "website",
      };
    }

    if (work) {
      return {
        title: `${work.title[language]} | ${t("site.name")}`,
        description: work.description[language],
        image: work.image,
        type: "article",
      };
    }

    if (relation) {
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
      const relationLabel =
        language === "ja"
          ? t(`relationTypes.${relation.type}`)
          : relation.label;
      return {
        title: `${sourceName} × ${targetName} | ${t("site.name")}`,
        description:
          relation.note ||
          `${sourceName} · ${targetName} · ${relationLabel}`,
        image: source?.avatar,
        type: "article",
      };
    }

    if (character) {
      return {
        title: `${
          language === "ja" ? character.jp : character.name
        } | ${t("site.name")}`,
        description: `${character.alias} · ${character.role}。${character.desc}`,
        image: character.avatar,
        type: "profile",
      };
    }

    if (resourceExists) {
      return {
        title: `${t(`resources.${resourceKind}`)} | ${t("site.name")}`,
        description: t("resources.galleryLead"),
        image: resourceImages[
          resourceKind as keyof typeof resourceImages
        ][0]?.src,
        type: "website",
      };
    }

    const descriptionKey =
      titleKey === "home" ? "network.lead" : `${titleKey}.lead`;
    return {
      title:
        titleKey === "home"
          ? `${t("site.name")} | ${t("site.subtitle")}`
          : `${t(`nav.${titleKey}`)} | ${t("site.name")}`,
      description: t(descriptionKey),
      type: "website",
    };
  }, [language, location.pathname, location.search, t, titleKey]);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${location.pathname}${location.search}`;
    const image = pageMeta.image
      ? new URL(pageMeta.image, window.location.origin).toString()
      : `${window.location.origin}/og-image.png`;

    document.documentElement.lang = language === "ja" ? "ja" : "zh-CN";
    document.title = pageMeta.title;
    setMetaContent('meta[name="description"]', pageMeta.description);
    setMetaContent('meta[property="og:title"]', pageMeta.title);
    setMetaContent('meta[property="og:description"]', pageMeta.description);
    setMetaContent('meta[property="og:type"]', pageMeta.type);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[property="og:image"]', image);
    setMetaContent(
      'meta[property="og:locale"]',
      language === "ja" ? "ja_JP" : "zh_CN",
    );
    setMetaContent('meta[name="twitter:title"]', pageMeta.title);
    setMetaContent(
      'meta[name="twitter:description"]',
      pageMeta.description,
    );
    setMetaContent('meta[name="twitter:image"]', image);

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

  }, [language, location.pathname, location.search, pageMeta]);

  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    const isWorksRouteSwap =
      previousPath.startsWith("/works") && location.pathname.startsWith("/works");

    if (!isWorksRouteSwap) {
      mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    previousPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  const changeLanguage = (next: Language) => {
    localStorage.setItem("joho-ya-language", next);
    void i18n.changeLanguage(next);
  };

  const updateMainScroll = useCallback(() => {
    const main = mainRef.current;
    if (!main) return;
    const scrollable = main.scrollHeight > main.clientHeight + 2;
    const atBottom =
      main.scrollTop + main.clientHeight >= main.scrollHeight - 3;
    const awayFromTop = main.scrollTop > 80;
    setMainScroll((current) =>
      current.scrollable === scrollable &&
      current.atBottom === atBottom &&
      current.awayFromTop === awayFromTop
        ? current
        : { scrollable, atBottom, awayFromTop },
    );
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const frame = requestAnimationFrame(updateMainScroll);
    const observer = new ResizeObserver(updateMainScroll);
    observer.observe(main);
    if (main.firstElementChild) observer.observe(main.firstElementChild);
    window.addEventListener("resize", updateMainScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateMainScroll);
    };
  }, [location.pathname, updateMainScroll]);

  const languageMenu = {
    items: [
      { key: "zh", label: "中文" },
      { key: "ja", label: "日本語" },
    ],
    selectedKeys: [language],
    onClick: ({ key }: { key: string }) => changeLanguage(key as Language),
  };

  const navigation = (mobile = false) => (
    <nav className={mobile ? "mobile-nav" : "main-nav"} aria-label={t("nav.menu")}>
      {navItems.map((item, index) => (
        <NavLink
          key={item.key}
          to={item.to}
          end={item.end}
          data-index={`0${index + 1}`}
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
          onClick={() => setMenuOpen(false)}
        >
          <span className="nav-index">0{index + 1}</span>
          <span>
            <strong>{mobile ? t(`nav.${item.key}`) : item.en}</strong>
            <small>{mobile ? item.en : t(`nav.${item.key}`)}</small>
          </span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="site-frame">
      <header className="site-header">
        <Link className="brand" to="/" aria-label={t("site.name")}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/brand-helmet.svg" alt="" />
          </span>
          <span className="brand-copy">
            <small>{t("site.subtitle")}</small>
            <strong>{t("site.name")}</strong>
          </span>
        </Link>

        {navigation()}

        <div className="header-actions">
          <Button
            className="global-search-button"
            icon={<SearchOutlined />}
            aria-label={t("search.open")}
            onClick={() => setSearchOpen(true)}
          >
            <span className="global-search-label">{t("common.search")}</span>
            <kbd>⌘K</kbd>
          </Button>
          <Dropdown menu={languageMenu} placement="bottomRight" trigger={["click"]}>
            <Button
              className="language-button"
              icon={<GlobalOutlined />}
              aria-label={t("common.language")}
            >
              {language === "ja" ? "日本語" : "中文"}
            </Button>
          </Dropdown>
          <Button
            className="mobile-menu-button"
            icon={<MenuOutlined />}
            aria-label={t("nav.menu")}
            onClick={() => setMenuOpen(true)}
          >
            <span>MENU</span>
          </Button>
        </div>
      </header>

      <div
        className={`site-main-wrap${
          mainScroll.scrollable ? " is-scrollable" : ""
        }${mainScroll.atBottom ? " is-at-bottom" : ""}`}
      >
        <main
          className="site-main"
          key={location.pathname}
          ref={mainRef}
          onScroll={updateMainScroll}
        >
          <Outlet />
        </main>
        <Button
          className={`site-back-top${
            mainScroll.scrollable && mainScroll.awayFromTop ? " is-visible" : ""
          }`}
          icon={<ArrowUpOutlined />}
          aria-label={language === "ja" ? "ページ上部へ戻る" : "回到顶部"}
          onClick={() =>
            mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          TOP
        </Button>
      </div>

      <footer className="site-footer">
        <div>
          <strong>{t("site.name")}</strong>
          <span>© 2026 · {t("common.unofficial")}</span>
        </div>
        <p>
          {language === "ja"
            ? "原作の権利は成田良悟・KADOKAWAおよび各権利者に帰属します。"
            : "原作版权归成田良悟、KADOKAWA 及相关权利方所有。"}
        </p>
        <div className="footer-links">
          <a href="mailto:tilucario@outlook.com">Contact ↗</a>
          <a href="https://anuluca.com" target="_blank" rel="noreferrer">
            Anuluca ↗
          </a>
          <a
            href="https://github.com/Anuluca"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </footer>

      <Drawer
        className="mobile-menu-drawer"
        open={menuOpen}
        placement="right"
        width="min(88vw, 360px)"
        closeIcon={false}
        onClose={() => setMenuOpen(false)}
        title={
          <div className="drawer-title">
            <div>
              <span>NAVIGATION</span>
              <small>IKEBUKURO / 01—05</small>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              aria-label={t("common.close")}
              onClick={() => setMenuOpen(false)}
            />
          </div>
        }
      >
        {navigation(true)}
        <div className="mobile-language">
          <span>{t("common.language")}</span>
          <div>
            <Button
              type={language === "zh" ? "primary" : "default"}
              onClick={() => changeLanguage("zh")}
            >
              中文
            </Button>
            <Button
              type={language === "ja" ? "primary" : "default"}
              onClick={() => changeLanguage("ja")}
            >
              日本語
            </Button>
          </div>
        </div>
      </Drawer>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
