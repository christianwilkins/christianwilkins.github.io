"use client";

import * as React from "react";
import {
  AlignLeft,
  CaseSensitive,
  ChevronRight,
  Columns3,
  CornerUpRight,
  Droplet,
  Gauge,
  LayoutGrid,
  Layers,
  Link,
  Palette,
  PanelLeft,
  SlidersHorizontal,
  Sparkles,
  SunDim,
  Terminal,
  Type,
  Wind,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  STORAGE_KEYS,
  palettes,
  fontSets,
  typographySets,
  caseSets,
  motionSets,
  sectionSets,
  linkSets,
  blurSets,
  radiusSets,
  shadowSets,
  densitySets,
  ambientSets,
  layoutSets,
  alignSets,
  navSets,
  terminalSets,
  presets,
  setRootData,
  type PresetId,
} from "@/lib/style-config";
import { useTheme } from "next-themes";

type SectionKey =
  | "presets"
  | "colorway"
  | "font"
  | "typography"
  | "layout"
  | "sections"
  | "links"
  | "terminal"
  | "motion"
  | "shadow"
  | "blur"
  | "radius"
  | "density"
  | "ambient"
  | "alignment"
  | "navigation"
  | "case";

export function StyleSettingsDrawer() {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [preset, setPreset] = React.useState<PresetId>("chimero");
  const [palette, setPalette] = React.useState<(typeof palettes)[number]["id"]>("chimero");
  const [font, setFont] = React.useState<(typeof fontSets)[number]["id"]>("chimero");
  const [typography, setTypography] = React.useState<(typeof typographySets)[number]["id"]>("editorial");
  const [caseStyle, setCaseStyle] = React.useState<(typeof caseSets)[number]["id"]>("title");
  const [motion, setMotion] = React.useState<(typeof motionSets)[number]["id"]>("still");
  const [section, setSection] = React.useState<(typeof sectionSets)[number]["id"]>("chimero");
  const [link, setLink] = React.useState<(typeof linkSets)[number]["id"]>("underline");
  const [blur, setBlur] = React.useState<(typeof blurSets)[number]["id"]>("off");
  const [radius, setRadius] = React.useState<(typeof radiusSets)[number]["id"]>("sharp");
  const [shadow, setShadow] = React.useState<(typeof shadowSets)[number]["id"]>("none");
  const [density, setDensity] = React.useState<(typeof densitySets)[number]["id"]>("roomy");
  const [ambient, setAmbient] = React.useState<(typeof ambientSets)[number]["id"]>("off");
  const [layout, setLayout] = React.useState<(typeof layoutSets)[number]["id"]>("classic");
  const [terminal, setTerminal] = React.useState<(typeof terminalSets)[number]["id"]>("noir");
  const [align, setAlign] = React.useState<(typeof alignSets)[number]["id"]>("wide");
  const [nav, setNav] = React.useState<(typeof navSets)[number]["id"]>("top");
  const [openSections, setOpenSections] = React.useState<Record<SectionKey, boolean>>({
    presets: false,
    colorway: false,
    font: false,
    typography: false,
    case: false,
    layout: false,
    sections: false,
    links: false,
    terminal: false,
    motion: false,
    shadow: false,
    blur: false,
    radius: false,
    density: false,
    ambient: false,
    alignment: false,
    navigation: false,
  });

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  React.useEffect(() => {
    const savedPalette = localStorage.getItem(STORAGE_KEYS.palette) ?? "chimero";
    const savedFont = localStorage.getItem(STORAGE_KEYS.font) ?? "chimero";
    const savedTypography = localStorage.getItem(STORAGE_KEYS.typography) ?? "editorial";
    const savedCase = localStorage.getItem(STORAGE_KEYS.case) ?? "title";
    const savedMotion = localStorage.getItem(STORAGE_KEYS.motion) ?? "still";
    const savedSection = localStorage.getItem(STORAGE_KEYS.section) ?? "chimero";
    const savedLink = localStorage.getItem(STORAGE_KEYS.link) ?? "underline";
    const savedBlur = localStorage.getItem(STORAGE_KEYS.blur) ?? "off";
    const savedRadius = localStorage.getItem(STORAGE_KEYS.radius) ?? "sharp";
    const savedShadow = localStorage.getItem(STORAGE_KEYS.shadow) ?? "none";
    const savedDensity = localStorage.getItem(STORAGE_KEYS.density) ?? "roomy";
    const savedAmbient = localStorage.getItem(STORAGE_KEYS.ambient) ?? "off";
    const savedLayout = localStorage.getItem(STORAGE_KEYS.layout) ?? "classic";
    const storedTerminal = localStorage.getItem(STORAGE_KEYS.terminal);
    const defaultTerminal = "noir";
    const savedTerminal = storedTerminal ?? defaultTerminal;
    const savedAlign = localStorage.getItem(STORAGE_KEYS.align) ?? "wide";
    const savedNav = localStorage.getItem(STORAGE_KEYS.nav) ?? "top";
    const savedPreset = (localStorage.getItem(STORAGE_KEYS.preset) ?? "chimero") as PresetId;

    setPalette(savedPalette as (typeof palettes)[number]["id"]);
    setFont(savedFont as (typeof fontSets)[number]["id"]);
    setTypography(savedTypography as (typeof typographySets)[number]["id"]);
    setCaseStyle(savedCase as (typeof caseSets)[number]["id"]);
    setMotion(savedMotion as (typeof motionSets)[number]["id"]);
    setSection(savedSection as (typeof sectionSets)[number]["id"]);
    setLink(savedLink as (typeof linkSets)[number]["id"]);
    setBlur(savedBlur as (typeof blurSets)[number]["id"]);
    setRadius(savedRadius as (typeof radiusSets)[number]["id"]);
    setShadow(savedShadow as (typeof shadowSets)[number]["id"]);
    setDensity(savedDensity as (typeof densitySets)[number]["id"]);
    setAmbient(savedAmbient as (typeof ambientSets)[number]["id"]);
    setLayout(savedLayout as (typeof layoutSets)[number]["id"]);
    setTerminal(savedTerminal as (typeof terminalSets)[number]["id"]);
    setAlign(savedAlign as (typeof alignSets)[number]["id"]);
    setNav(savedNav as (typeof navSets)[number]["id"]);

    if (!storedTerminal) {
      localStorage.setItem(STORAGE_KEYS.terminal, savedTerminal);
    }

    const matchedPreset = presets.find((item) =>
      Object.entries(item.values).every(([key, value]) => {
        if (key === "palette") return value === savedPalette;
        if (key === "font") return value === savedFont;
        if (key === "typography") return value === savedTypography;
        if (key === "motion") return value === savedMotion;
        if (key === "section") return value === savedSection;
        if (key === "link") return value === savedLink;
        if (key === "case") return value === savedCase;
        if (key === "blur") return value === savedBlur;
        if (key === "radius") return value === savedRadius;
        if (key === "shadow") return value === savedShadow;
        if (key === "density") return value === savedDensity;
        if (key === "ambient") return value === savedAmbient;
        if (key === "layout") return value === savedLayout;
        if (key === "terminal") return value === savedTerminal;
        if (key === "align") return value === savedAlign;
        if (key === "nav") return value === savedNav;
        return false;
      })
    );
    if (matchedPreset) {
      setPreset(matchedPreset.id);
      localStorage.setItem(STORAGE_KEYS.preset, matchedPreset.id);
    } else {
      setPreset(savedPreset);
    }

    setRootData("palette", savedPalette);
    setRootData("font", savedFont);
    setRootData("typography", savedTypography);
    setRootData("case", savedCase);
    setRootData("motion", savedMotion);
    setRootData("section", savedSection);
    setRootData("link", savedLink);
    setRootData("blur", savedBlur);
    setRootData("radius", savedRadius);
    setRootData("shadow", savedShadow);
    setRootData("density", savedDensity);
    setRootData("ambient", savedAmbient);
    setRootData("layout", savedLayout);
    setRootData("terminal", savedTerminal);
    setRootData("align", savedAlign);
    setRootData("nav", savedNav);
  }, [resolvedTheme]);

  React.useEffect(() => {
    if (isMobile) {
      setRootData("nav", "sidebar");
      return;
    }
    setRootData("nav", nav);
  }, [isMobile, nav]);

  const handlePaletteChange = (value: (typeof palettes)[number]["id"]) => {
    setPalette(value);
    localStorage.setItem(STORAGE_KEYS.palette, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("palette", value);
  };

  const handleFontChange = (value: (typeof fontSets)[number]["id"]) => {
    setFont(value);
    localStorage.setItem(STORAGE_KEYS.font, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("font", value);
  };

  const handleTypographyChange = (value: (typeof typographySets)[number]["id"]) => {
    setTypography(value);
    localStorage.setItem(STORAGE_KEYS.typography, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("typography", value);
  };

  const handleCaseChange = (value: (typeof caseSets)[number]["id"]) => {
    setCaseStyle(value);
    localStorage.setItem(STORAGE_KEYS.case, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("case", value);
  };

  const handleMotionChange = (value: (typeof motionSets)[number]["id"]) => {
    setMotion(value);
    localStorage.setItem(STORAGE_KEYS.motion, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("motion", value);
  };

  const handleSectionChange = (value: (typeof sectionSets)[number]["id"]) => {
    setSection(value);
    localStorage.setItem(STORAGE_KEYS.section, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("section", value);
  };

  const handleLinkChange = (value: (typeof linkSets)[number]["id"]) => {
    setLink(value);
    localStorage.setItem(STORAGE_KEYS.link, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("link", value);
  };

  const handleBlurChange = (value: (typeof blurSets)[number]["id"]) => {
    setBlur(value);
    localStorage.setItem(STORAGE_KEYS.blur, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("blur", value);
  };

  const handleRadiusChange = (value: (typeof radiusSets)[number]["id"]) => {
    setRadius(value);
    localStorage.setItem(STORAGE_KEYS.radius, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("radius", value);
  };

  const handleShadowChange = (value: (typeof shadowSets)[number]["id"]) => {
    setShadow(value);
    localStorage.setItem(STORAGE_KEYS.shadow, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("shadow", value);
  };

  const handleDensityChange = (value: (typeof densitySets)[number]["id"]) => {
    setDensity(value);
    localStorage.setItem(STORAGE_KEYS.density, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("density", value);
  };

  const handleAmbientChange = (value: (typeof ambientSets)[number]["id"]) => {
    setAmbient(value);
    localStorage.setItem(STORAGE_KEYS.ambient, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("ambient", value);
  };

  const handleLayoutChange = (value: (typeof layoutSets)[number]["id"]) => {
    setLayout(value);
    localStorage.setItem(STORAGE_KEYS.layout, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("layout", value);
  };

  const handleTerminalChange = (value: (typeof terminalSets)[number]["id"]) => {
    setTerminal(value);
    localStorage.setItem(STORAGE_KEYS.terminal, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("terminal", value);
  };

  const handleAlignChange = (value: (typeof alignSets)[number]["id"]) => {
    setAlign(value);
    localStorage.setItem(STORAGE_KEYS.align, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("align", value);
  };

  const handleNavChange = (value: (typeof navSets)[number]["id"]) => {
    if (isMobile) return;
    setNav(value);
    localStorage.setItem(STORAGE_KEYS.nav, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("nav", value);
  };

  const applyPreset = (id: (typeof presets)[number]["id"]) => {
    const selectedPreset = presets.find((item) => item.id === id);
    if (!selectedPreset) return;
    const { values } = selectedPreset;
    setPalette(values.palette);
    setFont(values.font);
    setTypography(values.typography);
    setCaseStyle(values.case);
    setMotion(values.motion);
    setSection(values.section);
    setLink(values.link);
    setBlur(values.blur);
    setRadius(values.radius);
    setShadow(values.shadow);
    setDensity(values.density);
    setAmbient(values.ambient);
    setLayout(values.layout);
    setTerminal(values.terminal ?? "iterm");
    setAlign(values.align);
    setNav(values.nav);

    localStorage.setItem(STORAGE_KEYS.palette, values.palette);
    localStorage.setItem(STORAGE_KEYS.font, values.font);
    localStorage.setItem(STORAGE_KEYS.typography, values.typography);
    localStorage.setItem(STORAGE_KEYS.case, values.case);
    localStorage.setItem(STORAGE_KEYS.motion, values.motion);
    localStorage.setItem(STORAGE_KEYS.section, values.section);
    localStorage.setItem(STORAGE_KEYS.link, values.link);
    localStorage.setItem(STORAGE_KEYS.blur, values.blur);
    localStorage.setItem(STORAGE_KEYS.radius, values.radius);
    localStorage.setItem(STORAGE_KEYS.shadow, values.shadow);
    localStorage.setItem(STORAGE_KEYS.density, values.density);
    localStorage.setItem(STORAGE_KEYS.ambient, values.ambient);
    localStorage.setItem(STORAGE_KEYS.layout, values.layout);
    localStorage.setItem(STORAGE_KEYS.terminal, values.terminal ?? "iterm");
    localStorage.setItem(STORAGE_KEYS.align, values.align);
    localStorage.setItem(STORAGE_KEYS.nav, values.nav);
    localStorage.setItem(STORAGE_KEYS.preset, id);

    setRootData("palette", values.palette);
    setRootData("font", values.font);
    setRootData("typography", values.typography);
    setRootData("case", values.case);
    setRootData("motion", values.motion);
    setRootData("section", values.section);
    setRootData("link", values.link);
    setRootData("blur", values.blur);
    setRootData("radius", values.radius);
    setRootData("shadow", values.shadow);
    setRootData("density", values.density);
    setRootData("ambient", values.ambient);
    setRootData("layout", values.layout);
    setRootData("terminal", values.terminal ?? "iterm");
    setRootData("align", values.align);
    setRootData("nav", values.nav);
    setPreset(id);
  };

  const selectedPalette = palettes.find((item) => item.id === palette)?.name ?? "";
  const selectedFont = fontSets.find((item) => item.id === font)?.name ?? "";
  const selectedTypography = typographySets.find((item) => item.id === typography)?.name ?? "";
  const selectedCase = caseSets.find((item) => item.id === caseStyle)?.name ?? "";
  const selectedMotion = motionSets.find((item) => item.id === motion)?.name ?? "";
  const selectedSection = sectionSets.find((item) => item.id === section)?.name ?? "";
  const selectedLink = linkSets.find((item) => item.id === link)?.name ?? "";
  const selectedBlur = blurSets.find((item) => item.id === blur)?.name ?? "";
  const selectedRadius = radiusSets.find((item) => item.id === radius)?.name ?? "";
  const selectedShadow = shadowSets.find((item) => item.id === shadow)?.name ?? "";
  const selectedDensity = densitySets.find((item) => item.id === density)?.name ?? "";
  const selectedAmbient = ambientSets.find((item) => item.id === ambient)?.name ?? "";
  const selectedLayout = layoutSets.find((item) => item.id === layout)?.name ?? "";
  const selectedTerminal = terminalSets.find((item) => item.id === terminal)?.name ?? "";
  const selectedAlign = alignSets.find((item) => item.id === align)?.name ?? "";
  const selectedNav = navSets.find((item) => item.id === nav)?.name ?? "";
  const navLabel = isMobile ? "Hamburger" : selectedNav;
  const selectedPreset = presets.find((item) => item.id === preset)?.name ?? "Custom";

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1100]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "style-trigger flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
          open && "opacity-0 pointer-events-none"
        )}
        aria-label="Open style settings"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Style me!
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-background/60 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        role="dialog"
        aria-label="Style settings"
        className={cn(
          "fixed left-4 right-4 bottom-4 w-auto max-w-[92vw] rounded-2xl border text-card-foreground shadow-deep max-h-[80vh] flex flex-col sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px]",
          "surface-panel",
          "transition-all duration-300",
          open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Style settings</p>
            <p className="text-xs text-muted-foreground">Live preview for fonts and palettes</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close style settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-4 overflow-y-auto">
          <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3">
            <button
              type="button"
              onClick={() => toggleSection("presets")}
              aria-expanded={openSections.presets}
              aria-controls="style-presets"
              className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2 text-foreground">
                <Sparkles className="h-4 w-4" />
                Presets
              </span>
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                {selectedPreset}
                <ChevronRight
                  className={cn(
                    "h-3 w-3 text-muted-foreground transition-transform",
                    openSections.presets ? "rotate-90" : ""
                  )}
                />
              </span>
            </button>
            <div
              id="style-presets"
              className={cn("mt-3 grid grid-cols-2 gap-2", openSections.presets ? "grid" : "hidden")}
            >
              {presets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => applyPreset(item.id)}
                  className={cn(
                    "rounded-xl border px-2.5 py-2 text-left transition-colors",
                    preset === item.id
                      ? "border-foreground bg-muted text-foreground"
                      : "border-border bg-background hover:bg-muted"
                  )}
                >
                  <p className="text-xs font-semibold">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3">
            <button
              type="button"
              onClick={() => toggleSection("colorway")}
              aria-expanded={openSections.colorway}
              aria-controls="style-colorway"
              className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2 text-foreground">
                <Palette className="h-4 w-4" />
                Colorway
              </span>
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                {selectedPalette}
                <ChevronRight
                  className={cn(
                    "h-3 w-3 text-muted-foreground transition-transform",
                    openSections.colorway ? "rotate-90" : ""
                  )}
                />
              </span>
            </button>
            <div
              id="style-colorway"
              className={cn("mt-3 space-y-2", openSections.colorway ? "block" : "hidden")}
            >
              {palettes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePaletteChange(item.id)}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2 text-left transition-colors",
                    palette === item.id
                      ? "border-foreground bg-muted text-foreground"
                      : "border-border bg-background hover:bg-muted"
                  )}
                >
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3">
            <button
              type="button"
              onClick={() => toggleSection("font")}
              aria-expanded={openSections.font}
              aria-controls="style-font"
              className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2 text-foreground">
                <Type className="h-4 w-4" />
                Font set
              </span>
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                {selectedFont}
                <ChevronRight
                  className={cn(
                    "h-3 w-3 text-muted-foreground transition-transform",
                    openSections.font ? "rotate-90" : ""
                  )}
                />
              </span>
            </button>
            <div id="style-font" className={cn("mt-3 space-y-2", openSections.font ? "block" : "hidden")}>
              {fontSets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleFontChange(item.id)}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2 text-left transition-colors",
                    font === item.id
                      ? "border-foreground bg-muted text-foreground"
                      : "border-border bg-background hover:bg-muted"
                  )}
                >
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3">
            <button
              type="button"
              onClick={() => toggleSection("typography")}
              aria-expanded={openSections.typography}
              aria-controls="style-typography"
              className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2 text-foreground">
                <Gauge className="h-4 w-4" />
                Typography
              </span>
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                {selectedTypography}
                <ChevronRight
                  className={cn(
                    "h-3 w-3 text-muted-foreground transition-transform",
                    openSections.typography ? "rotate-90" : ""
                  )}
                />
              </span>
            </button>
            <div
              id="style-typography"
              className={cn("mt-3 space-y-2", openSections.typography ? "block" : "hidden")}
            >
              {typographySets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTypographyChange(item.id)}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2 text-left transition-colors",
                    typography === item.id
                      ? "border-foreground bg-muted text-foreground"
                      : "border-border bg-background hover:bg-muted"
                  )}
                >
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 items-start">
            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("case")}
                aria-expanded={openSections.case}
                aria-controls="style-case"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <CaseSensitive className="h-4 w-4" />
                  Case
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedCase}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.case ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-case" className={cn("mt-3 grid gap-2", openSections.case ? "grid" : "hidden")}>
                {caseSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCaseChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      caseStyle === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("layout")}
                aria-expanded={openSections.layout}
                aria-controls="style-layout"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <LayoutGrid className="h-4 w-4" />
                  Layout
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedLayout}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.layout ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-layout" className={cn("mt-3 grid gap-2", openSections.layout ? "grid" : "hidden")}>
                {layoutSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLayoutChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      layout === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("sections")}
                aria-expanded={openSections.sections}
                aria-controls="style-sections"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Columns3 className="h-4 w-4" />
                  Sections
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedSection}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.sections ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-sections" className={cn("mt-3 grid gap-2", openSections.sections ? "grid" : "hidden")}>
                {sectionSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSectionChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      section === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("links")}
                aria-expanded={openSections.links}
                aria-controls="style-links"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Link className="h-4 w-4" />
                  Links
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedLink}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.links ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-links" className={cn("mt-3 grid gap-2", openSections.links ? "grid" : "hidden")}>
                {linkSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLinkChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      link === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("terminal")}
                aria-expanded={openSections.terminal}
                aria-controls="style-terminal"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Terminal className="h-4 w-4" />
                  Terminal
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedTerminal}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.terminal ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-terminal" className={cn("mt-3 grid gap-2", openSections.terminal ? "grid" : "hidden")}>
                {terminalSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTerminalChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      terminal === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("alignment")}
                aria-expanded={openSections.alignment}
                aria-controls="style-alignment"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <AlignLeft className="h-4 w-4" />
                  Alignment
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedAlign}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.alignment ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div
                id="style-alignment"
                className={cn("mt-3 grid gap-2", openSections.alignment ? "grid" : "hidden")}
              >
                {alignSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAlignChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      align === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("navigation")}
                aria-expanded={openSections.navigation}
                aria-controls="style-navigation"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <PanelLeft className="h-4 w-4" />
                  Navigation
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {navLabel}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.navigation ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div
                id="style-navigation"
                className={cn("mt-3 grid gap-2", openSections.navigation ? "grid" : "hidden")}
              >
                {isMobile && (
                  <p className="text-xs text-muted-foreground">
                    Mobile uses hamburger navigation. This setting applies on larger screens.
                  </p>
                )}
                {navSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavChange(item.id)}
                    disabled={isMobile}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      isMobile && "opacity-50 pointer-events-none",
                      nav === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("motion")}
                aria-expanded={openSections.motion}
                aria-controls="style-motion"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Wind className="h-4 w-4" />
                  Motion
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedMotion}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.motion ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-motion" className={cn("mt-3 grid gap-2", openSections.motion ? "grid" : "hidden")}>
                {motionSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMotionChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      motion === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("shadow")}
                aria-expanded={openSections.shadow}
                aria-controls="style-shadow"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Layers className="h-4 w-4" />
                  Shadow
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedShadow}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.shadow ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-shadow" className={cn("mt-3 grid gap-2", openSections.shadow ? "grid" : "hidden")}>
                {shadowSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleShadowChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      shadow === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("blur")}
                aria-expanded={openSections.blur}
                aria-controls="style-blur"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Droplet className="h-4 w-4" />
                  Blur
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedBlur}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.blur ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-blur" className={cn("mt-3 grid gap-2", openSections.blur ? "grid" : "hidden")}>
                {blurSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleBlurChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      blur === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("radius")}
                aria-expanded={openSections.radius}
                aria-controls="style-radius"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <CornerUpRight className="h-4 w-4" />
                  Radius
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedRadius}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.radius ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div id="style-radius" className={cn("mt-3 grid gap-2", openSections.radius ? "grid" : "hidden")}>
                {radiusSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleRadiusChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      radius === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("density")}
                aria-expanded={openSections.density}
                aria-controls="style-density"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <Gauge className="h-4 w-4" />
                  Density
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedDensity}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.density ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div
                id="style-density"
                className={cn("mt-3 grid gap-2", openSections.density ? "grid" : "hidden")}
              >
                {densitySets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleDensityChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      density === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="group rounded-2xl border border-border/60 bg-background/30 px-3 py-3 self-start">
              <button
                type="button"
                onClick={() => toggleSection("ambient")}
                aria-expanded={openSections.ambient}
                aria-controls="style-ambient"
                className="w-full text-left text-xs font-semibold text-muted-foreground flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <SunDim className="h-4 w-4" />
                  Ambient
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {selectedAmbient}
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections.ambient ? "rotate-90" : ""
                    )}
                  />
                </span>
              </button>
              <div
                id="style-ambient"
                className={cn("mt-3 grid gap-2", openSections.ambient ? "grid" : "hidden")}
              >
                {ambientSets.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAmbientChange(item.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      ambient === item.id
                        ? "border-foreground bg-muted text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
