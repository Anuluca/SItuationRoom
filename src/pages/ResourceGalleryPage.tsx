import { ArrowLeftOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { resourceImages } from "../data";
import type { Language, ResourceImageKind } from "../types";

const isImageKind = (value?: string): value is ResourceImageKind =>
  value === "avatars" ||
  value === "avatars2" ||
  value === "dvd" ||
  value === "music" ||
  value === "mangaCovers" ||
  value === "novelCovers";

export default function ResourceGalleryPage() {
  const { kind } = useParams();
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage === "ja" ? "ja" : "zh") as Language;

  if (!isImageKind(kind)) return <Navigate replace to="/resources" />;

  const images = resourceImages[kind];
  return (
    <div className="page resource-gallery-page">
      <PageHero
        title={t(`resources.${kind}`)}
        lead={t("resources.galleryLead")}
        index="04"
      />
      <section className="resources-panel">
        <Link className="resource-back" to="/resources">
          <ArrowLeftOutlined /> {t("resources.back")}
        </Link>
        {images.length ? (
          <Image.PreviewGroup>
            <div className={`resource-gallery resource-gallery-${kind}`}>
              {images.map((image) => (
                <figure key={image.src}>
                  <Image src={image.src} alt={image.title[language]} />
                  <figcaption>
                    <strong>{image.title[language]}</strong>
                    <a href={image.src} target="_blank" rel="noreferrer">
                      {image.source} <ArrowUpOutlined />
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Image.PreviewGroup>
        ) : (
          <div className="resource-gallery-empty">
            <img src="/brand-helmet-watermark.svg" alt="" />
            <strong>{t(`resources.${kind}`)}</strong>
            <p>{t("resources.emptyGallery")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
