import {
  CloseOutlined,
  GlobalOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import type { Language } from "../types";

const navItems = [
  { to: "/", key: "home", end: true, en: "Home" },
  { to: "/terms/characters", key: "terms", en: "Terms" },
  { to: "/works", key: "works", en: "Works" },
  { to: "/about", key: "about", en: "About" },
];

export default function AppShell() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;

  const titleKey = useMemo(() => {
    if (location.pathname.startsWith("/terms")) return "terms";
    if (location.pathname.startsWith("/works")) return "works";
    if (location.pathname.startsWith("/about")) return "about";
    return "home";
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = language === "ja" ? "ja" : "zh-CN";
    document.title = `${t(`nav.${titleKey}`)} | ${t("site.name")}`;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [language, location.pathname, t, titleKey]);

  const changeLanguage = (next: Language) => {
    localStorage.setItem("joho-ya-language", next);
    void i18n.changeLanguage(next);
  };

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
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
          onClick={() => setMenuOpen(false)}
        >
          <span className="nav-index">0{index + 1}</span>
          <span>
            <strong>{item.en}</strong>
            <small>{t(`nav.${item.key}`)}</small>
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
            //
          </span>
          <span className="brand-copy">
            <small>{t("site.subtitle")}</small>
            <strong>{t("site.name")}</strong>
          </span>
        </Link>

        {navigation()}

        <div className="header-actions">
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
          />
        </div>
      </header>

      <main className="site-main" key={location.pathname}>
        <Outlet />
      </main>

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
            <span>{t("nav.menu")}</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
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
    </div>
  );
}
