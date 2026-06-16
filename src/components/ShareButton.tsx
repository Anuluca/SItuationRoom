import { CheckOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { absoluteUrl, copyText, sharePage } from "../utils/share";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
  compact?: boolean;
}

export default function ShareButton({
  title,
  text,
  url = window.location.href,
  className,
  compact = false,
}: ShareButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const share = async () => {
    try {
      const result = await sharePage(title, text, url);
      if (result === "copied") setCopied(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyText(absoluteUrl(url));
      setCopied(true);
    }
  };

  return (
    <Button
      className={`share-button${className ? ` ${className}` : ""}`}
      icon={copied ? <CheckOutlined /> : <ShareAltOutlined />}
      aria-label={t("common.share")}
      onClick={() => void share()}
    >
      {compact ? null : copied ? t("common.copied") : t("common.share")}
    </Button>
  );
}
