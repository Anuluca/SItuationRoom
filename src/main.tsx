import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import i18n from "./i18n";
import { applyFontSettings } from "./utils/fontPlatform";
import "./styles.css";
import "./styles/archive.css";
import "./styles/about.css";
import "./styles/cards.css";
import "./styles/network-hero.css";

applyFontSettings(i18n.resolvedLanguage === "ja" ? "ja" : "zh");
i18n.on("languageChanged", (language) => {
  applyFontSettings(language === "ja" ? "ja" : "zh");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
