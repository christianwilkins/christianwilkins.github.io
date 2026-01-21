"use client";

import * as React from "react";
import {
  ChevronRight,
  CornerUpRight,
  Droplet,
  Gauge,
  LayoutGrid,
  Layers,
  Palette,
  SlidersHorizontal,
  Sparkles,
  SunDim,
  Type,
  Wind,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEYS = {
  preset: "style.preset",
  palette: "style.palette",
  font: "style.font",
  motion: "style.motion",
  blur: "style.blur",
  radius: "style.radius",
  shadow: "style.shadow",
  density: "style.density",
  ambient: "style.ambient",
  layout: "style.layout",
} as const;

const palettes = [
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

const fontSets = [
  {
    id: "studio",
    name: "Manrope and Newsreader",
    description: "Clean and editorial",
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

const motionSets = [
  { id: "calm", name: "Calm", description: "Longer motion and soft easing" },
  { id: "crisp", name: "Crisp", description: "Tighter motion and shorter timing" },
  { id: "still", name: "Still", description: "Minimal movement" },
] as const;

const blurSets = [
  { id: "soft", name: "Soft", description: "Subtle panel blur" },
  { id: "glass", name: "Glass", description: "Stronger blur and depth" },
  { id: "off", name: "Off", description: "No blur" },
] as const;

const radiusSets = [
  { id: "sharp", name: "Sharp", description: "Tighter corners" },
  { id: "soft", name: "Soft", description: "Balanced curves" },
  { id: "round", name: "Round", description: "More rounded surfaces" },
] as const;

const shadowSets = [
  { id: "none", name: "None", description: "Flat surfaces" },
  { id: "soft", name: "Soft", description: "Gentle depth" },
  { id: "deep", name: "Deep", description: "More contrast" },
] as const;

const densitySets = [
  { id: "compact", name: "Compact", description: "Tighter spacing" },
  { id: "standard", name: "Standard", description: "Balanced spacing" },
  { id: "roomy", name: "Roomy", description: "More breathing room" },
] as const;

const ambientSets = [
  { id: "off", name: "Off", description: "Clean flat background" },
  { id: "on", name: "On", description: "Soft ambient glow" },
] as const;

const layoutSets = [
  { id: "classic", name: "Classic", description: "Clean layout and quiet surfaces" },
  { id: "atelier", name: "Atelier", description: "Editorial card layout with ornaments" },
] as const;

const presets = [
  {
    id: "studio",
    name: "Studio calm",
    description: "Studio palette with calm motion",
    values: {
      palette: "studio",
      font: "studio",
      motion: "calm",
      blur: "soft",
      radius: "soft",
      shadow: "soft",
      density: "standard",
      ambient: "off",
      layout: "classic",
    },
  },
  {
    id: "gallery",
    name: "Gallery crisp",
    description: "Cool palette with crisp motion",
    values: {
      palette: "gallery",
      font: "metro",
      motion: "crisp",
      blur: "soft",
      radius: "soft",
      shadow: "soft",
      density: "standard",
      ambient: "on",
      layout: "classic",
    },
  },
  {
    id: "atelier",
    name: "Atelier editorial",
    description: "Atelier layout and layered depth",
    values: {
      palette: "cinder",
      font: "metro",
      motion: "calm",
      blur: "glass",
      radius: "round",
      shadow: "deep",
      density: "roomy",
      ambient: "on",
      layout: "atelier",
    },
  },
  {
    id: "legacy",
    name: "Legacy original",
    description: "Original pairing and contrast",
    values: {
      palette: "legacy",
      font: "legacy",
      motion: "crisp",
      blur: "off",
      radius: "sharp",
      shadow: "none",
      density: "compact",
      ambient: "off",
      layout: "classic",
    },
  },
] as const;

type PresetId = (typeof presets)[number]["id"] | "custom";

type SectionKey =
  | "presets"
  | "colorway"
  | "font"
  | "layout"
  | "motion"
  | "shadow"
  | "blur"
  | "radius"
  | "density"
  | "ambient";

function setRootData(
  key: "palette" | "font" | "motion" | "blur" | "radius" | "shadow" | "density" | "ambient" | "layout",
  value: string
) {
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
  if (key === "motion") {
    root.dataset.motion = value;
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
  }
}

export function StyleSettingsDrawer() {
  const [open, setOpen] = React.useState(false);
  const [preset, setPreset] = React.useState<PresetId>("studio");
  const [palette, setPalette] = React.useState<(typeof palettes)[number]["id"]>("studio");
  const [font, setFont] = React.useState<(typeof fontSets)[number]["id"]>("studio");
  const [motion, setMotion] = React.useState<(typeof motionSets)[number]["id"]>("calm");
  const [blur, setBlur] = React.useState<(typeof blurSets)[number]["id"]>("soft");
  const [radius, setRadius] = React.useState<(typeof radiusSets)[number]["id"]>("soft");
  const [shadow, setShadow] = React.useState<(typeof shadowSets)[number]["id"]>("soft");
  const [density, setDensity] = React.useState<(typeof densitySets)[number]["id"]>("standard");
  const [ambient, setAmbient] = React.useState<(typeof ambientSets)[number]["id"]>("off");
  const [layout, setLayout] = React.useState<(typeof layoutSets)[number]["id"]>("classic");
  const [openSections, setOpenSections] = React.useState<Record<SectionKey, boolean>>({
    presets: false,
    colorway: false,
    font: false,
    layout: false,
    motion: false,
    shadow: false,
    blur: false,
    radius: false,
    density: false,
    ambient: false,
  });

  React.useEffect(() => {
    const savedPalette = localStorage.getItem(STORAGE_KEYS.palette) ?? "studio";
    const savedFont = localStorage.getItem(STORAGE_KEYS.font) ?? "studio";
    const savedMotion = localStorage.getItem(STORAGE_KEYS.motion) ?? "calm";
    const savedBlur = localStorage.getItem(STORAGE_KEYS.blur) ?? "soft";
    const savedRadius = localStorage.getItem(STORAGE_KEYS.radius) ?? "soft";
    const savedShadow = localStorage.getItem(STORAGE_KEYS.shadow) ?? "soft";
    const savedDensity = localStorage.getItem(STORAGE_KEYS.density) ?? "standard";
    const savedAmbient = localStorage.getItem(STORAGE_KEYS.ambient) ?? "off";
    const savedLayout = localStorage.getItem(STORAGE_KEYS.layout) ?? "classic";
    const savedPreset = (localStorage.getItem(STORAGE_KEYS.preset) ?? "custom") as PresetId;

    setPalette(savedPalette as (typeof palettes)[number]["id"]);
    setFont(savedFont as (typeof fontSets)[number]["id"]);
    setMotion(savedMotion as (typeof motionSets)[number]["id"]);
    setBlur(savedBlur as (typeof blurSets)[number]["id"]);
    setRadius(savedRadius as (typeof radiusSets)[number]["id"]);
    setShadow(savedShadow as (typeof shadowSets)[number]["id"]);
    setDensity(savedDensity as (typeof densitySets)[number]["id"]);
    setAmbient(savedAmbient as (typeof ambientSets)[number]["id"]);
    setLayout(savedLayout as (typeof layoutSets)[number]["id"]);

    const matchedPreset = presets.find((item) =>
      Object.entries(item.values).every(([key, value]) => {
        if (key === "palette") return value === savedPalette;
        if (key === "font") return value === savedFont;
        if (key === "motion") return value === savedMotion;
        if (key === "blur") return value === savedBlur;
        if (key === "radius") return value === savedRadius;
        if (key === "shadow") return value === savedShadow;
        if (key === "density") return value === savedDensity;
        if (key === "ambient") return value === savedAmbient;
        if (key === "layout") return value === savedLayout;
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
    setRootData("motion", savedMotion);
    setRootData("blur", savedBlur);
    setRootData("radius", savedRadius);
    setRootData("shadow", savedShadow);
    setRootData("density", savedDensity);
    setRootData("ambient", savedAmbient);
    setRootData("layout", savedLayout);
  }, []);

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

  const handleMotionChange = (value: (typeof motionSets)[number]["id"]) => {
    setMotion(value);
    localStorage.setItem(STORAGE_KEYS.motion, value);
    localStorage.setItem(STORAGE_KEYS.preset, "custom");
    setPreset("custom");
    setRootData("motion", value);
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

  const applyPreset = (id: (typeof presets)[number]["id"]) => {
    const selectedPreset = presets.find((item) => item.id === id);
    if (!selectedPreset) return;
    const { values } = selectedPreset;
    setPalette(values.palette);
    setFont(values.font);
    setMotion(values.motion);
    setBlur(values.blur);
    setRadius(values.radius);
    setShadow(values.shadow);
    setDensity(values.density);
    setAmbient(values.ambient);
    setLayout(values.layout);

    localStorage.setItem(STORAGE_KEYS.palette, values.palette);
    localStorage.setItem(STORAGE_KEYS.font, values.font);
    localStorage.setItem(STORAGE_KEYS.motion, values.motion);
    localStorage.setItem(STORAGE_KEYS.blur, values.blur);
    localStorage.setItem(STORAGE_KEYS.radius, values.radius);
    localStorage.setItem(STORAGE_KEYS.shadow, values.shadow);
    localStorage.setItem(STORAGE_KEYS.density, values.density);
    localStorage.setItem(STORAGE_KEYS.ambient, values.ambient);
    localStorage.setItem(STORAGE_KEYS.layout, values.layout);
    localStorage.setItem(STORAGE_KEYS.preset, id);

    setRootData("palette", values.palette);
    setRootData("font", values.font);
    setRootData("motion", values.motion);
    setRootData("blur", values.blur);
    setRootData("radius", values.radius);
    setRootData("shadow", values.shadow);
    setRootData("density", values.density);
    setRootData("ambient", values.ambient);
    setRootData("layout", values.layout);
    setPreset(id);
  };

  const selectedPalette = palettes.find((item) => item.id === palette)?.name ?? "";
  const selectedFont = fontSets.find((item) => item.id === font)?.name ?? "";
  const selectedMotion = motionSets.find((item) => item.id === motion)?.name ?? "";
  const selectedBlur = blurSets.find((item) => item.id === blur)?.name ?? "";
  const selectedRadius = radiusSets.find((item) => item.id === radius)?.name ?? "";
  const selectedShadow = shadowSets.find((item) => item.id === shadow)?.name ?? "";
  const selectedDensity = densitySets.find((item) => item.id === density)?.name ?? "";
  const selectedAmbient = ambientSets.find((item) => item.id === ambient)?.name ?? "";
  const selectedLayout = layoutSets.find((item) => item.id === layout)?.name ?? "";
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
          "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-soft",
          "surface-panel hover:bg-muted transition-colors",
          open && "opacity-0 pointer-events-none"
        )}
        aria-label="Open style settings"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Style
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
          "fixed right-6 bottom-6 w-[420px] max-w-[92vw] rounded-2xl border text-card-foreground shadow-deep max-h-[80vh] flex flex-col",
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

          <div className="grid gap-3 sm:grid-cols-2 items-start">
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
