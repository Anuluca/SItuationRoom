import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { characters, factions } from "../data";
import CharactersPage from "./CharactersPage";
import FactionsPage from "./FactionsPage";

export default function TermsLayout() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeView =
    searchParams.get("view") === "factions" ? "factions" : "characters";

  const setActiveView = (view: "characters" | "factions") => {
    const next = new URLSearchParams(searchParams);
    next.set("view", view);
    next.delete("character");
    next.delete("faction");
    setSearchParams(next, { replace: true });
  };

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
      <nav className="home-view-tabs terms-view-tabs">
        <button
          className={activeView === "characters" ? "is-active" : ""}
          onClick={() => setActiveView("characters")}
          type="button"
        >
          <small>01</small>
          <span>{t("nav.characters")}</span>
          <em>{characters.length}</em>
        </button>
        <button
          className={activeView === "factions" ? "is-active" : ""}
          onClick={() => setActiveView("factions")}
          type="button"
        >
          <small>02</small>
          <span>{t("nav.factions")}</span>
          <em>{Object.keys(factions).length}</em>
        </button>
      </nav>
      {activeView === "characters" ? <CharactersPage /> : <FactionsPage />}
    </div>
  );
}
