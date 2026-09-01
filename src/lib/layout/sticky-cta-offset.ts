const VAR_NAME = "--broadview-sticky-cta-height";

export function setStickyCtaHeight(height: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(VAR_NAME, `${Math.round(height)}px`);
  document.documentElement.setAttribute("data-sticky-cta", "true");
}

export function clearStickyCtaHeight() {
  if (typeof document === "undefined") return;
  document.documentElement.style.removeProperty(VAR_NAME);
  document.documentElement.removeAttribute("data-sticky-cta");
}
