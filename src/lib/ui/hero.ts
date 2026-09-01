export type HeroVerticalPosition = "upper" | "upper-middle" | "lower";
export type HeroOverlayDirection = "left" | "bottom" | "bottom-left";

export function cinematicContentPosition(
  position: HeroVerticalPosition = "upper-middle",
): string {
  switch (position) {
    case "upper":
      return "justify-start pt-[18vh] sm:pt-[20vh] lg:pt-[18vh] pb-16 sm:pb-20";
    case "upper-middle":
      return "justify-start pt-[16vh] sm:pt-[18vh] lg:pt-[20vh] pb-16 sm:pb-24";
    case "lower":
      return "justify-end pt-32 pb-14 sm:pb-20 lg:pb-24";
  }
}

export function cinematicOverlayClass(
  direction: HeroOverlayDirection = "bottom-left",
): string {
  switch (direction) {
    case "left":
      return "bg-gradient-to-r from-navy-950/78 via-navy-950/28 to-transparent";
    case "bottom":
      return "bg-gradient-to-t from-navy-950/88 via-navy-950/35 to-navy-950/5";
    case "bottom-left":
      return "bg-gradient-to-t from-navy-950/82 via-navy-950/28 to-transparent";
  }
}

export function cinematicSideWash(
  direction: HeroOverlayDirection = "bottom-left",
): string | null {
  if (direction === "left" || direction === "bottom-left") {
    return "bg-gradient-to-r from-navy-950/32 via-transparent to-transparent";
  }
  return null;
}
