import type { HeroTheme } from "@/lib/media/assets";

export type ExperienceGoal = {
  id: string;
  title: string;
  /** One line — minimal copy for selection cards. */
  hint?: string;
  href: string;
  icon: string;
  /** What we'd discuss when this goal is selected. */
  discuss?: string[];
  /** Initial strategy framing — educational only. */
  strategyPreview?: string;
};

export type ExperienceConfig = {
  theme: HeroTheme;
  path: string;
  title: string;
  /** Single supporting line under the hero question. */
  intro: string;
  question: string;
  goals: ExperienceGoal[];
  funnelHref: string;
  funnelType?: string;
  /** SEO landing routes preserved for crawlers — not shown in main UI. */
  seoRoutes?: { label: string; href: string }[];
};

export type PlatformGoal = {
  id: string;
  title: string;
  hint?: string;
  href: string;
  icon: string;
  theme?: HeroTheme;
};
