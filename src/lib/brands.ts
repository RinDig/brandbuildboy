export interface BrandTheme {
  key: string;
  name: string;
  logoText: string;
  logoSrc?: string;
  logoAlt?: string;
  logoHeightPx?: number;
  tagline: string;
  fonts: {
    body: string;
    mono: string;
  };
  colors: {
    shell: string;
    topNavText: string;
    topNavChipBg: string;
    topNavChipText: string;
    topNavPrimaryBg: string;
    topNavPrimaryText: string;
    surface: string;
    surfaceText: string;
    surfaceMuted: string;
    line: string;
    card: string;
    actionBg: string;
    actionText: string;
    ctaBandStart: string;
    ctaBandEnd: string;
    ctaBandText: string;
    ctaButtonBg: string;
    ctaButtonText: string;
    successDot: string;
    danger: string;
  };
  copy: {
    readingsLabel: string;
    chaptersLabel: string;
    primaryCtaLabel: string;
    bookCallLabel: string;
    bookCallSubLabel: string;
    footerCtaLabel: string;
  };
}

const BRAND_THEMES: Record<string, BrandTheme> = {
  eduba: {
    key: "eduba",
    name: "Eduba",
    logoText: "The Faces of Interface",
    tagline: "The Faces of Interface",
    fonts: {
      body: "Diatype, sans-serif",
      mono: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
    },
    colors: {
      shell: "#5d3136",
      topNavText: "#ead5d6",
      topNavChipBg: "#d8bfc0",
      topNavChipText: "#421d24",
      topNavPrimaryBg: "#000000",
      topNavPrimaryText: "#fefbf6",
      surface: "#fefbf6",
      surfaceText: "#5d3136",
      surfaceMuted: "#7d5658",
      line: "#a2777a",
      card: "#ebdfd2",
      actionBg: "#5d3136",
      actionText: "#fefbf6",
      ctaBandStart: "#492526",
      ctaBandEnd: "#5d4143",
      ctaBandText: "#fefbf6",
      ctaButtonBg: "#fefbf6",
      ctaButtonText: "#421d24",
      successDot: "#25ca58",
      danger: "#9b2f33",
    },
    copy: {
      readingsLabel: "Readings",
      chaptersLabel: "Chapters",
      primaryCtaLabel: "Grab a Seat",
      bookCallLabel: "Book a Call",
      bookCallSubLabel: "Get Started Today",
      footerCtaLabel: "Call to Action",
    },
  },
  pilot: {
    key: "pilot",
    name: "Pilot Company",
    logoText: "Pilot Intelligence Studio",
    tagline: "Pilot Intelligence Studio",
    fonts: {
      body: "'Segoe UI', Arial, sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace",
    },
    colors: {
      shell: "#0f2747",
      topNavText: "#d9e7ff",
      topNavChipBg: "#9bc8ff",
      topNavChipText: "#0f2747",
      topNavPrimaryBg: "#1a4b7d",
      topNavPrimaryText: "#f4f9ff",
      surface: "#f4f9ff",
      surfaceText: "#123055",
      surfaceMuted: "#32567f",
      line: "#739bc9",
      card: "#dbe9f8",
      actionBg: "#1a4b7d",
      actionText: "#f4f9ff",
      ctaBandStart: "#123055",
      ctaBandEnd: "#1f4f82",
      ctaBandText: "#f4f9ff",
      ctaButtonBg: "#f4f9ff",
      ctaButtonText: "#123055",
      successDot: "#3fd08b",
      danger: "#a1263e",
    },
    copy: {
      readingsLabel: "Insights",
      chaptersLabel: "Modules",
      primaryCtaLabel: "Start Brief",
      bookCallLabel: "Book Strategy Call",
      bookCallSubLabel: "Pilot Build",
      footerCtaLabel: "Start Build",
    },
  },
  vigilore: {
    key: "vigilore",
    name: "VigilOre",
    logoText: "Intelligent Insight To Prevent Loss",
    logoSrc: "/brands/vigilore-logo.png",
    logoAlt: "VigilOre logo",
    logoHeightPx: 18,
    tagline: "Intelligent Insight To Prevent Loss",
    fonts: {
      body: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace",
    },
    colors: {
      shell: "#2c2c2e",
      topNavText: "#efe8dc",
      topNavChipBg: "#efe8dc",
      topNavChipText: "#2c2c2e",
      topNavPrimaryBg: "#c65e28",
      topNavPrimaryText: "#ffffff",
      surface: "#f5f0e6",
      surfaceText: "#2c2c2e",
      surfaceMuted: "#5d5750",
      line: "#8a7f71",
      card: "#e8ddca",
      actionBg: "#c65e28",
      actionText: "#ffffff",
      ctaBandStart: "#2c2c2e",
      ctaBandEnd: "#3a8c94",
      ctaBandText: "#efe8dc",
      ctaButtonBg: "#3a8c94",
      ctaButtonText: "#ffffff",
      successDot: "#3a8c94",
      danger: "#b13e21",
    },
    copy: {
      readingsLabel: "Platform",
      chaptersLabel: "Use Cases",
      primaryCtaLabel: "Generate Brief",
      bookCallLabel: "Request Pilot",
      bookCallSubLabel: "Mining Compliance",
      footerCtaLabel: "Generate Site",
    },
  },
  armetor: {
    key: "armetor",
    name: "Armetor",
    logoText: "Armetor | VigilOre",
    logoSrc: "/brands/armetor-logo.jpg",
    logoAlt: "Armetor logo",
    logoHeightPx: 16,
    tagline: "Armetor Security Intelligence",
    fonts: {
      body: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      mono: "'IBM Plex Mono', Consolas, monospace",
    },
    colors: {
      shell: "#7f8288",
      topNavText: "#f1f1f2",
      topNavChipBg: "#e2e3e6",
      topNavChipText: "#4a4d53",
      topNavPrimaryBg: "#b8922f",
      topNavPrimaryText: "#ffffff",
      surface: "#f5f5f2",
      surfaceText: "#30333a",
      surfaceMuted: "#5c6069",
      line: "#9b9ea7",
      card: "#e8e5dc",
      actionBg: "#b8922f",
      actionText: "#ffffff",
      ctaBandStart: "#4c4f56",
      ctaBandEnd: "#7f8288",
      ctaBandText: "#ffffff",
      ctaButtonBg: "#b8922f",
      ctaButtonText: "#ffffff",
      successDot: "#2b9a8f",
      danger: "#9b2f33",
    },
    copy: {
      readingsLabel: "Capabilities",
      chaptersLabel: "Programs",
      primaryCtaLabel: "Generate Brief",
      bookCallLabel: "Request Briefing",
      bookCallSubLabel: "Armetor Team",
      footerCtaLabel: "Generate Site",
    },
  },
};

const BRAND_ALIASES: Record<string, string> = {
  "vigil-ore": "vigilore",
};

function normalizeBrandKey(value: string | null | undefined): string {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveBrandKey(value: string | null | undefined): string {
  const normalized = normalizeBrandKey(value);
  if (BRAND_THEMES[normalized]) return normalized;
  return BRAND_ALIASES[normalized] || normalized;
}

export function getBrandTheme(brandKey?: string | null): BrandTheme {
  const key = resolveBrandKey(brandKey);
  return BRAND_THEMES[key] || BRAND_THEMES.eduba;
}

export function hasBrandTheme(brandKey?: string | null): boolean {
  const key = resolveBrandKey(brandKey);
  return Boolean(BRAND_THEMES[key]);
}

export function getBrandThemes(): BrandTheme[] {
  return Object.values(BRAND_THEMES);
}

export function getSanitizedBrandKey(brandKey?: string | null): string {
  const theme = getBrandTheme(brandKey);
  return theme.key;
}
