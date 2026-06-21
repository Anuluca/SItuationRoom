import type { Language } from "../types";

export const siteFontFamily = '"cn-custom"';
export const siteFontUrl =
  "https://assets.anuluca.com/fonts/TangXianBinSong-2.otf";

export const getFontFamily = (language: Language) => {
  void language;
  return siteFontFamily;
};

export const applyFontSettings = (language: Language) => {
  void language;
  if (typeof document === "undefined") return;

  document.documentElement.dataset.fontFamily = "cn-custom";
};

export const waitForSiteFont = async () => {
  if (typeof document === "undefined" || !("fonts" in document)) return;

  const fontSet = document.fonts;
  if (typeof FontFace !== "undefined") {
    const siteFont = new FontFace("cn-custom", `url(${siteFontUrl})`, {
      style: "normal",
      weight: "400 900",
    });
    const loadedFont = await siteFont.load();
    fontSet.add(loadedFont);
    return;
  }

  const fontLoads = ["400 1em cn-custom", "900 1em cn-custom"].map(
    (font) => fontSet.load(font, "DRRR情报屋池袋"),
  );

  await Promise.all(fontLoads);
};
