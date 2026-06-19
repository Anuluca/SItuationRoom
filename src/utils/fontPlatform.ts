import type { Language } from "../types";

export const siteFontFamily = '"cn-custom"';

export const getFontFamily = (language: Language) => {
  void language;
  return siteFontFamily;
};

export const applyFontSettings = (language: Language) => {
  void language;
  if (typeof document === "undefined") return;

  document.documentElement.dataset.fontFamily = "cn-custom";
};
