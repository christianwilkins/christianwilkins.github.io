export const STORAGE_KEYS = {
  preset: "style.preset",
  palette: "style.palette",
  font: "style.font",
  typography: "style.typography",
  motion: "style.motion",
  section: "style.section",
  link: "style.link",
  blur: "style.blur",
  radius: "style.radius",
  shadow: "style.shadow",
  density: "style.density",
  ambient: "style.ambient",
  layout: "style.layout",
  align: "style.align",
  nav: "style.nav",
  case: "style.case",
  terminal: "style.terminal",
} as const;

export const palettes = [
  {
    id: "signal",
    name: "Signal",
    description: "Terminal-aligned graphite and soft glow",
  },
  {
    id: "chimero",
    name: "Chimero",
    description: "Noir canvas with soft ash text",
  },
  {
    id: "amodei",
    name: "Amodei",
    description: "Parchment warmth with deep ink",
  },
  {
    id: "studio",
    name: "Studio",
    description: "Warm off white and graphite",
  },
  {
    id: "legacy",
    name: "Legacy",
    description: "Original contrast set",
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Cool off white and soft slate",
  },
  {
    id: "cinder",
    name: "Cinder",
    description: "Smoky stone and deep ink",
  },
] as const;

export const fontSets = [
  {
    id: "studio",
    name: "Manrope and Newsreader",
    description: "Clean and editorial",
  },
  {
    id: "chimero",
    name: "IBM Plex Sans and Newsreader",
    description: "Plex body with classic serif",
  },
  {
    id: "amodei",
    name: "Charter ITC TT",
    description: "Charter body and headings",
  },
  {
    id: "legacy",
    name: "Geist and Times New Roman Condensed",
    description: "Original pairing",
  },
  {
    id: "metro",
    name: "Plus Jakarta and Instrument Serif",
    description: "Modern and refined",
  },
] as const;

export const typographySets = [
  {
    id: "balanced",
    name: "Balanced",
    description: "Default scale with relaxed leading",
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Larger scale with airy rhythm",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Smaller scale with generous leading",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Tighter scale and spacing",
  },
] as const;

export const caseSets = [
  { id: "title", name: "Standard", description: "Labels keep their current case" },
  { id: "lower", name: "Lowercase", description: "Labels set to lowercase" },
] as const;

export const motionSets = [
  { id: "calm", name: "Calm", description: "Longer motion and soft easing" },
  { id: "crisp", name: "Crisp", description: "Tighter motion and shorter timing" },
  { id: "still", name: "Still", description: "Minimal movement" },
] as const;

export const blurSets = [
  { id: "soft", name: "Soft", description: "Subtle panel blur" },
  { id: "glass", name: "Glass", description: "Stronger blur and depth" },
  { id: "off", name: "Off", description: "No blur" },
] as const;

export const radiusSets = [
  { id: "sharp", name: "Sharp", description: "Tighter corners" },
  { id: "soft", name: "Soft", description: "Balanced curves" },
  { id: "round", name: "Round", description: "More rounded surfaces" },
] as const;

export const shadowSets = [
  { id: "none", name: "None", description: "Flat surfaces" },
  { id: "low", name: "Low", description: "Subtle depth" },
  { id: "soft", name: "Medium", description: "Balanced depth" },
  { id: "deep", name: "High", description: "More contrast" },
] as const;

export const densitySets = [
  { id: "compact", name: "Compact", description: "Tighter spacing" },
  { id: "standard", name: "Standard", description: "Balanced spacing" },
  { id: "roomy", name: "Roomy", description: "More breathing room" },
] as const;

export const ambientSets = [
  { id: "off", name: "Off", description: "Clean flat background" },
  { id: "on", name: "On", description: "Soft ambient glow" },
] as const;

export const layoutSets = [
  { id: "classic", name: "Classic", description: "Clean layout and quiet surfaces" },
  { id: "atelier", name: "Atelier", description: "Editorial card layout with ornaments" },
] as const;

export const sectionSets = [
  { id: "stacked", name: "Stacked", description: "Standard stacked sections" },
  { id: "chimero", name: "Split", description: "Split columns with section rails" },
] as const;

export const linkSets = [
  { id: "clean", name: "Clean", description: "Minimal links with hover underline" },
  { id: "underline", name: "Underline", description: "Always underlined links" },
] as const;

export const alignSets = [
  { id: "center", name: "Center", description: "Balanced alignment" },
  { id: "left", name: "Left", description: "Left aligned content rail" },
  { id: "wide", name: "Wide", description: "Wider reading measure" },
] as const;

export const navSets = [
  { id: "sidebar", name: "Sidebar", description: "Left vertical navigation" },
  { id: "top", name: "Navbar", description: "Top horizontal navigation" },
] as const;

export const terminalSets = [
  { id: "iterm", name: "iTerm Classic", description: "Deep terminal with neon accents" },
  { id: "noir", name: "Noir", description: "Neutral black and soft glow" },
  { id: "dawn", name: "Dawn", description: "Solarized light/dark, chic and balanced" },
  { id: "paper", name: "Paper", description: "Warm light with soft ink contrast" },
] as const;

export const presets = [
  {
    id: "signal",
    name: "Signal focus",
    description: "Terminal-aligned palette with calm motion",
    values: {
      palette: "signal",
      font: "studio",
      typography: "balanced",
      motion: "calm",
      section: "stacked",
      link: "clean",
      blur: "soft",
      radius: "soft",
      shadow: "low",
      density: "standard",
      ambient: "off",
      layout: "classic",
      align: "center",
      nav: "sidebar",
      case: "title",
      terminal: "iterm",
    },
  },
  {
    id: "amodei",
    name: "Amodei minimal",
    description: "Parchment palette with serif type",
    values: {
      palette: "amodei",
      font: "amodei",
      typography: "classic",
      motion: "still",
      section: "stacked",
      link: "underline",
      blur: "off",
      radius: "sharp",
      shadow: "none",
      density: "roomy",
      ambient: "off",
      layout: "classic",
      align: "left",
      nav: "top",
      case: "title",
      terminal: "paper",
    },
  },
  {
    id: "chimero",
    name: "Chimero noir",
    description: "Noir palette with split sections",
    values: {
      palette: "chimero",
      font: "chimero",
      typography: "editorial",
      motion: "still",
      section: "chimero",
      link: "underline",
      blur: "off",
      radius: "sharp",
      shadow: "none",
      density: "roomy",
      ambient: "off",
      layout: "classic",
      align: "wide",
      nav: "top",
      case: "title",
      terminal: "noir",
    },
  },
  {
    id: "studio",
    name: "Studio calm",
    description: "Studio palette with calm motion",
    values: {
      palette: "studio",
      font: "studio",
      typography: "balanced",
      motion: "calm",
      section: "stacked",
      link: "clean",
      blur: "soft",
      radius: "soft",
      shadow: "low",
      density: "standard",
      ambient: "off",
      layout: "classic",
      align: "center",
      nav: "sidebar",
      case: "title",
      terminal: "iterm",
    },
  },
  {
    id: "gallery",
    name: "Gallery crisp",
    description: "Cool palette with crisp motion",
    values: {
      palette: "gallery",
      font: "metro",
      typography: "balanced",
      motion: "crisp",
      section: "stacked",
      link: "clean",
      blur: "soft",
      radius: "soft",
      shadow: "soft",
      density: "standard",
      ambient: "on",
      layout: "classic",
      align: "center",
      nav: "sidebar",
      case: "title",
      terminal: "iterm",
    },
  },
  {
    id: "atelier",
    name: "Atelier editorial",
    description: "Atelier layout and layered depth",
    values: {
      palette: "cinder",
      font: "metro",
      typography: "editorial",
      motion: "calm",
      section: "stacked",
      link: "clean",
      blur: "glass",
      radius: "round",
      shadow: "deep",
      density: "roomy",
      ambient: "on",
      layout: "atelier",
      align: "center",
      nav: "sidebar",
      case: "title",
      terminal: "iterm",
    },
  },
  {
    id: "legacy",
    name: "Legacy original",
    description: "Original pairing and contrast",
    values: {
      palette: "legacy",
      font: "legacy",
      typography: "compact",
      motion: "crisp",
      section: "stacked",
      link: "clean",
      blur: "off",
      radius: "sharp",
      shadow: "none",
      density: "compact",
      ambient: "off",
      layout: "classic",
      align: "center",
      nav: "sidebar",
      case: "title",
      terminal: "iterm",
    },
  },
] as const;

export type PresetId = (typeof presets)[number]["id"] | "custom";
export type StyleSettingKey = Exclude<keyof typeof STORAGE_KEYS, "preset">;

export function setRootData(key: StyleSettingKey, value: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (key === "palette") {
    root.dataset.palette = value;
    return;
  }
  if (key === "font") {
    root.dataset.font = value;
    return;
  }
  if (key === "typography") {
    root.dataset.typography = value;
    return;
  }
  if (key === "motion") {
    root.dataset.motion = value;
    return;
  }
  if (key === "section") {
    root.dataset.section = value;
    return;
  }
  if (key === "link") {
    root.dataset.link = value;
    return;
  }
  if (key === "blur") {
    root.dataset.blur = value;
    return;
  }
  if (key === "radius") {
    root.dataset.radius = value;
    return;
  }
  if (key === "shadow") {
    root.dataset.shadow = value;
    return;
  }
  if (key === "density") {
    root.dataset.density = value;
    return;
  }
  if (key === "ambient") {
    root.dataset.ambient = value;
    return;
  }
  if (key === "layout") {
    root.dataset.layout = value;
    return;
  }
  if (key === "align") {
    root.dataset.align = value;
    return;
  }
  if (key === "nav") {
    root.dataset.nav = value;
    return;
  }
  if (key === "case") {
    root.dataset.case = value;
    return;
  }
  if (key === "terminal") {
    root.dataset.terminal = value;
  }
}
