import {
  ArrowRightOutlined,
  CustomerServiceOutlined,
  PictureOutlined,
  ReadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { resourceImages, resourceLinks } from "../data";
import type { Language, ResourceImageKind } from "../types";

const imageKinds: ResourceImageKind[] = [
  "avatars",
  "avatars2",
  "dvd",
  "music",
  "mangaCovers",
  "novelCovers",
];
const linkSections = [
  ["video", VideoCameraOutlined],
  ["audio", CustomerServiceOutlined],
  ["text", ReadOutlined],
] as const;

export default function ResourcesPage() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;

  return (
    <div className="page resources-page">
      <PageHero
        title={t("resources.title")}
        lead={t("resources.lead")}
        index="04"
      />
      <section className="resources-panel">
        <header className="resource-section-title">
          <PictureOutlined />
          <div>
            <span>01 / IMAGE</span>
            <h2>{t("resources.image")}</h2>
          </div>
        </header>
        <div className="resource-image-links">
          {imageKinds.map((kind) => {
            const preview = resourceImages[kind][0];
            return (
              <Link className="resource-image-card" to={`/resources/images/${kind}`} key={kind}>
                {preview ? (
                  <img src={preview.src} alt="" loading="lazy" />
                ) : (
                  <span className="resource-image-placeholder" aria-hidden="true">
                    <img src="/brand-helmet-watermark.svg" alt="" />
                  </span>
                )}
                <span className="resource-image-copy">
                  <small>{String(resourceImages[kind].length).padStart(2, "0")} FILES</small>
                  <strong>{t(`resources.${kind}`)}</strong>
                </span>
              </Link>
            );
          })}
        </div>

        {linkSections.map(([section, Icon], index) => (
          <section className="resource-link-section" key={section}>
            <header className="resource-section-title">
              <Icon />
              <div>
                <span>0{index + 2} / {section.toUpperCase()}</span>
                <h2>{t(`resources.${section}`)}</h2>
              </div>
            </header>
            <div className="resource-link-grid">
              {resourceLinks[section].map((item) => (
                <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                  <span>
                    <strong>{item.title[language]}</strong>
                    <p>{item.description[language]}</p>
                  </span>
                  <ArrowRightOutlined />
                </a>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}
