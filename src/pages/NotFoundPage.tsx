import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="page not-found-page">
      <section className="not-found-panel">
        <span className="not-found-code">404</span>
        <div className="not-found-copy">
          <small>UNKNOWN FILE / IKEBUKURO ARCHIVE</small>
          <h1>{t("notFound.title")}</h1>
          <p>{t("notFound.lead")}</p>
          <code>{location.pathname}</code>
          <div>
            <Button type="primary" icon={<HomeOutlined />}>
              <Link to="/">{t("notFound.home")}</Link>
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => history.back()}>
              {t("notFound.back")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
