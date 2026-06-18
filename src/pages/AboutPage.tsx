import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";

const sections = ["mission", "scope", "policy", "copyright"] as const;

export default function AboutPage() {
  const { t } = useTranslation();
  const signatureLogoRef = useRef<HTMLDivElement>(null);

  const tiltLogo = (event: MouseEvent<HTMLElement>) => {
    const logo = signatureLogoRef.current;
    if (!logo) return;
    const rowBounds = event.currentTarget.getBoundingClientRect();
    const logoBounds = logo.getBoundingClientRect();
    const centerX = logoBounds.left + logoBounds.width / 2;
    const centerY = logoBounds.top + logoBounds.height / 2;
    const x = Math.max(
      -1,
      Math.min(1, (event.clientX - centerX) / (rowBounds.width / 2)),
    );
    const y = Math.max(
      -1,
      Math.min(1, (event.clientY - centerY) / (rowBounds.height / 2)),
    );
    logo.style.setProperty("--logo-rx", `${-y * 18}deg`);
    logo.style.setProperty("--logo-ry", `${x * 18}deg`);
  };

  const resetLogoTilt = () => {
    const logo = signatureLogoRef.current;
    if (!logo) return;
    logo.style.setProperty("--logo-rx", "0deg");
    logo.style.setProperty("--logo-ry", "0deg");
  };

  return (
    <div className="page">
      <PageHero
        title={t("about.title")}
        lead={t("about.lead")}
        index="05"
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
            href="https://www.durarara.com/1st/"
            target="_blank"
            rel="noreferrer"
          >
            TV Anime 1st official ↗
          </a>
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
        <section
          className="about-signature"
          onMouseMove={tiltLogo}
          onMouseLeave={resetLogoTilt}
        >
          <div
            ref={signatureLogoRef}
            className="about-signature-logo"
            aria-hidden="true"
          >
            <img
              className="about-signature-logo-base"
              src="/brand-helmet.svg"
              alt=""
            />
            <img
              className="about-signature-logo-hover"
              src="/brand-helmet.svg"
              alt=""
            />
          </div>
          <div className="about-signature-copy">
            <p>{t("about.signatureCopyright")}</p>
            <strong>{t("about.signatureCredit")}</strong>
          </div>
        </section>
      </section>
    </div>
  );
}
