import {
  ArrowRightOutlined,
  ArrowUpOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Image, Tabs, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";
import { works } from "../data";
import type { Language, WorkCategory, WorkEntry } from "../types";

const categories: WorkCategory[] = [
  "tv",
  "ova",
  "music",
  "novels",
  "manga",
  "games",
];

export default function WorksPage() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;
  const [selectedWork, setSelectedWork] = useState<WorkEntry | null>(null);

  const renderWorks = (category: WorkCategory) => (
    <div className="works-list">
      {works
        .filter((work) => work.category === category)
        .map((work, index) => (
          <button
            type="button"
            className="work-card"
            key={work.id}
            style={
              {
                "--work-color": "#f4f500",
              } as React.CSSProperties
            }
            onClick={() => setSelectedWork(work)}
          >
            <span className="work-image">
              {work.image ? (
                <img src={work.image} alt="" loading="lazy" />
              ) : (
                <i aria-hidden="true">DRRR</i>
              )}
            </span>
            <div className="work-copy">
              <div className="work-meta-line">
                <Tag className="dark-work-tag">
                  {t(`works.${work.category}`)}
                </Tag>
                <time>{work.year}</time>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2>{work.title[language]}</h2>
              <strong>{work.meta[language]}</strong>
              <p>{work.description[language]}</p>
              <span className="work-open">
                {t("common.learnMore")} <ArrowRightOutlined />
              </span>
            </div>
          </button>
        ))}
    </div>
  );

  return (
    <div className="page">
      <PageHero
        title={t("works.title")}
        lead={t("works.lead")}
        index="03"
      />
      <section className="works-panel">
        <Tabs
          defaultActiveKey="tv"
          items={categories.map((category, index) => ({
            key: category,
            label: (
              <span className="work-tab">
                <small>0{index + 1}</small>
                {t(`works.${category}`)}
              </span>
            ),
            children: renderWorks(category),
          }))}
        />
      </section>
      <Drawer
        className="work-drawer"
        open={Boolean(selectedWork)}
        width="min(92vw, 720px)"
        closeIcon={false}
        onClose={() => setSelectedWork(null)}
        title={null}
      >
        {selectedWork && (
          <article
            className="work-file"
            style={{ "--work-color": "#f4f500" } as React.CSSProperties}
          >
            <Button
              className="file-close"
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setSelectedWork(null)}
            />
            <div className="work-file-intro">
              <figure className="work-file-cover">
                {selectedWork.image ? (
                  <Image
                    src={selectedWork.image}
                    alt={selectedWork.title[language]}
                    preview={{ mask: t("common.learnMore") }}
                  />
                ) : (
                  <img src="/brand-helmet-watermark.svg" alt="" />
                )}
              </figure>
              <header>
                <Tag className="dark-work-tag">
                  {t(`works.${selectedWork.category}`)}
                </Tag>
                <time>{selectedWork.year}</time>
                <h2>{selectedWork.title[language]}</h2>
                <strong>{selectedWork.meta[language]}</strong>
                <p>{selectedWork.description[language]}</p>
              </header>
            </div>
            {selectedWork.details && (
              <section>
                <h3>{t("works.staff")} / Details</h3>
                <ul>
                  {selectedWork.details[language].map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </section>
            )}
            {selectedWork.link && (
              <a
                className="work-external-link"
                href={selectedWork.link}
                target="_blank"
                rel="noreferrer"
              >
                {t("works.official")} <ArrowUpOutlined />
              </a>
            )}
          </article>
        )}
      </Drawer>
    </div>
  );
}
