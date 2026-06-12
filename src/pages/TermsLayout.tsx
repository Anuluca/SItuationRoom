import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";
import { characters, factions } from "../data";

export default function TermsLayout() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <PageHero
        title={t("terms.title")}
        lead={t("terms.lead")}
        index="02"
        aside={
          <div className="page-hero-stats">
            <div>
              <strong>{characters.length}</strong>
              <span>{t("common.characters")}</span>
            </div>
            <div>
              <strong>{Object.keys(factions).length}</strong>
              <span>{t("common.factions")}</span>
            </div>
          </div>
        }
      />
      <nav className="sub-nav">
        <NavLink to="characters">
          <span>01</span>
          {t("nav.characters")}
          <small>{characters.length}</small>
        </NavLink>
        <NavLink to="factions">
          <span>02</span>
          {t("nav.factions")}
          <small>{Object.keys(factions).length}</small>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
