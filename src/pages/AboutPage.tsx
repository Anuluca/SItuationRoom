import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";

const sections = ["mission", "scope", "policy", "copyright"] as const;

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <PageHero
        title={t("about.title")}
        lead={t("about.lead")}
        index="04"
      />
      <section className="about-panel">
        <div className="about-grid">
          {sections.map((section, index) => (
            <article key={section}>
              <span>0{index + 1}</span>
              <h3>{t(`about.${section}Title`)}</h3>
              <p>{t(`about.${section}`)}</p>
              {section === "copyright" && (
                <>
                  <p className="contact-note">{t("about.contact")}</p>
                  <Button icon={<MailOutlined />}>
                    <a href="mailto:tilucario@outlook.com">
                      tilucario@outlook.com
                    </a>
                  </Button>
                </>
              )}
            </article>
          ))}
        </div>
        <div className="source-strip">
          <span>{t("common.source")}</span>
          <a
            href="https://www.durarara.com/"
            target="_blank"
            rel="noreferrer"
          >
            TV Anime official ↗
          </a>
          <a
            href="https://dengekibunko.jp/product/drrr/"
            target="_blank"
            rel="noreferrer"
          >
            Dengeki Bunko ↗
          </a>
        </div>
      </section>
    </div>
  );
}
