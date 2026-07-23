"use client";

import { useMemo, useState } from "react";

type Shape = {
  height: number;
  shoulders: number;
  bust: number;
  waist: number;
  hips: number;
  legs: number;
};

type Appearance = {
  skin: string;
  hairStyle: "bob" | "long" | "curly" | "updo";
  hairColor: string;
};

const initialShape: Shape = {
  height: 50,
  shoulders: 48,
  bust: 50,
  waist: 46,
  hips: 54,
  legs: 50,
};

const initialAppearance: Appearance = {
  skin: "#a96f52",
  hairStyle: "long",
  hairColor: "#2a1b18",
};

const shapeControls: Array<{ key: keyof Shape; label: string; hint: string }> = [
  { key: "height", label: "Height", hint: "shorter to taller" },
  { key: "shoulders", label: "Shoulders", hint: "narrower to broader" },
  { key: "bust", label: "Bust", hint: "subtle to fuller" },
  { key: "waist", label: "Waist", hint: "defined to relaxed" },
  { key: "hips", label: "Hips", hint: "straight to rounded" },
  { key: "legs", label: "Leg length", hint: "shorter to longer" },
];

const skinTones = [
  { label: "Deep umber", value: "#6f4435" },
  { label: "Warm brown", value: "#986047" },
  { label: "Golden tan", value: "#c18762" },
  { label: "Warm beige", value: "#d9a17e" },
  { label: "Light peach", value: "#e7b79e" },
];

const hairColors = [
  { label: "Espresso", value: "#2a1b18" },
  { label: "Chestnut", value: "#633b2b" },
  { label: "Copper", value: "#a85432" },
  { label: "Honey", value: "#c18a42" },
  { label: "Silver", value: "#9a9694" },
];

function Hair({ style, color }: { style: Appearance["hairStyle"]; color: string }) {
  const common = { fill: color, stroke: color, strokeWidth: 2, strokeLinejoin: "round" as const };
  if (style === "bob") {
    return <path {...common} d="M131 55 Q128 23 150 20 Q174 23 169 57 Q164 45 159 39 Q148 48 131 55Z" />;
  }
  if (style === "curly") {
    return <path {...common} d="M129 57 Q120 40 130 27 Q130 13 143 18 Q153 8 162 19 Q177 17 174 32 Q181 45 169 59 Q166 42 157 37 Q144 47 129 57Z" />;
  }
  if (style === "updo") {
    return <path {...common} d="M132 53 Q124 30 139 25 Q132 12 149 14 Q162 4 169 19 Q180 27 168 54 Q160 39 156 35 Q144 47 132 53Z" />;
  }
  return <path {...common} d="M130 57 Q124 21 150 19 Q177 22 170 59 Q165 43 157 36 Q146 48 130 57Z" />;
}

function BodyFigure({ shape, appearance }: { shape: Shape; appearance: Appearance }) {
  const figure = useMemo(() => {
    const torsoScale = 0.95 + shape.height / 100 * 0.1;
    const shoulder = 30 + shape.shoulders * 0.12;
    const bust = 25 + shape.bust * 0.12;
    const waist = 21 + shape.waist * 0.095;
    const hip = 29 + shape.hips * 0.14;
    const top = 21 + (1 - torsoScale) * 9;
    const hipY = 128 - shape.legs * 0.08;
    const kneeY = hipY + 48;
    const ankleY = 232 - shape.legs * 0.035;
    return { shoulder, bust, waist, hip, top, hipY, kneeY, ankleY };
  }, [shape]);

  const center = 150;
  const headY = figure.top + 21;
  const neckY = figure.top + 40;
  const shoulderY = figure.top + 48;
  const bustY = figure.top + 72;
  const skinShadow = appearance.skin;

  return (
    <svg className="filters-figure" viewBox="0 0 300 270" role="img" aria-label="A stylized adult woman figure with adjustable proportions, skin tone, and hair">
      <defs>
        <linearGradient id="figure-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={appearance.skin} />
          <stop offset="1" stopColor={skinShadow} stopOpacity="0.82" />
        </linearGradient>
        <filter id="figure-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="var(--filters-ink)" floodOpacity="0.16" />
        </filter>
      </defs>
      <ellipse cx="150" cy="248" rx="74" ry="8" fill="var(--filters-ink)" opacity="0.12" />
      <g filter="url(#figure-shadow)" fill="url(#figure-fill)" stroke={skinShadow} strokeWidth="1.8" strokeLinejoin="round">
        <ellipse cx={center} cy={headY} rx="18" ry="21" />
        <Hair style={appearance.hairStyle} color={appearance.hairColor} />
        <path d={`M ${center - 8} ${neckY - 2} L ${center - 9} ${shoulderY - 3} Q ${center - figure.shoulder} ${shoulderY} ${center - figure.bust} ${bustY} Q ${center - figure.waist} ${figure.hipY - 25} ${center - figure.hip} ${figure.hipY} Q ${center - 16} ${figure.hipY + 12} ${center - 14} ${figure.hipY + 18} L ${center - 9} ${figure.ankleY} L ${center - 2} ${figure.ankleY} L ${center} ${figure.hipY + 20} L ${center + 2} ${figure.ankleY} L ${center + 9} ${figure.ankleY} L ${center + 14} ${figure.hipY + 18} Q ${center + 16} ${figure.hipY + 12} ${center + figure.hip} ${figure.hipY} Q ${center + figure.waist} ${figure.hipY - 25} ${center + figure.bust} ${bustY} Q ${center + figure.shoulder} ${shoulderY} ${center + 9} ${shoulderY - 3} L ${center + 8} ${neckY - 2}Z`} />
        <path d={`M ${center - figure.shoulder + 2} ${shoulderY} Q ${center - figure.shoulder - 8} ${shoulderY + 25} ${center - figure.shoulder - 4} ${shoulderY + 58} L ${center - figure.shoulder + 3} ${shoulderY + 58} Q ${center - figure.shoulder + 7} ${shoulderY + 27} ${center - figure.shoulder + 11} ${shoulderY + 6}Z`} />
        <path d={`M ${center + figure.shoulder - 2} ${shoulderY} Q ${center + figure.shoulder + 8} ${shoulderY + 25} ${center + figure.shoulder + 4} ${shoulderY + 58} L ${center + figure.shoulder - 3} ${shoulderY + 58} Q ${center + figure.shoulder - 7} ${shoulderY + 27} ${center + figure.shoulder - 11} ${shoulderY + 6}Z`} />
      </g>
      <g fill="none" stroke={skinShadow} strokeWidth="1.8" strokeLinecap="round" opacity="0.72">
        <path d={`M ${center - 5} ${headY + 5} Q ${center} ${headY + 8} ${center + 5} ${headY + 5}`} />
        <path d={`M ${center - 7} ${headY - 4} L ${center - 3} ${headY - 4} M ${center + 3} ${headY - 4} L ${center + 7} ${headY - 4}`} />
        <path d={`M ${center - figure.bust + 6} ${bustY + 4} Q ${center} ${bustY + 11} ${center + figure.bust - 6} ${bustY + 4}`} />
        <path d={`M ${center - figure.waist} ${figure.hipY - 25} Q ${center} ${figure.hipY - 18} ${center + figure.waist} ${figure.hipY - 25}`} />
        <path d={`M ${center - 12} ${figure.kneeY} Q ${center - 8} ${figure.kneeY + 3} ${center - 4} ${figure.kneeY}`} />
        <path d={`M ${center + 4} ${figure.kneeY} Q ${center + 8} ${figure.kneeY + 3} ${center + 12} ${figure.kneeY}`} />
      </g>
    </svg>
  );
}

export function FiltersStudio() {
  const [shape, setShape] = useState(initialShape);
  const [appearance, setAppearance] = useState(initialAppearance);
  const shapeChanged = JSON.stringify(shape) !== JSON.stringify(initialShape);
  const appearanceChanged = JSON.stringify(appearance) !== JSON.stringify(initialAppearance);
  const changedCount = Object.keys(shape).filter((key) => shape[key as keyof Shape] !== initialShape[key as keyof Shape]).length;
  const skinLabel = skinTones.find((tone) => tone.value === appearance.skin)?.label ?? "Custom tone";
  const hairLabel = hairColors.find((tone) => tone.value === appearance.hairColor)?.label ?? "Custom color";

  function updateShape(key: keyof Shape, value: number) {
    setShape((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setShape(initialShape);
    setAppearance(initialAppearance);
  }

  return (
    <main className="filters-page">
      <section className="filters-hero">
        <div>
          <p className="filters-kicker">filters / figure study 01</p>
          <h1 className="filters-title">A body is not a template.</h1>
          <p className="filters-intro">Explore a respectful, stylized study of adult women’s proportions. Adjust the form, skin tone, and hair to see the illustration respond in real time.</p>
        </div>
        <div className="filters-status"><span /> live rendering</div>
      </section>

      <section className="filters-workspace">
        <div className="filters-stage">
          <div className="filters-stage-grid" />
          <div className="filters-stage-caption"><span>FIG. 01</span><span>FRONT VIEW · ADULT</span></div>
          <BodyFigure shape={shape} appearance={appearance} />
          <div className="filters-axis" aria-hidden="true" />
        </div>

        <aside className="filters-controls" aria-label="Figure controls">
          <div className="filters-controls-heading">
            <div><p className="filters-kicker">parameters</p><h2>Adjust the form</h2></div>
            <span className="filters-count">{changedCount}/6</span>
          </div>
          <div className="filters-slider-list">
            {shapeControls.map((control) => (
              <label className="filters-slider-row" key={control.key}>
                <span className="filters-slider-label"><span>{control.label}</span><output>{shape[control.key]}%</output></span>
                <input type="range" min="0" max="100" value={shape[control.key]} onChange={(event) => updateShape(control.key, Number(event.target.value))} aria-label={control.label} />
                <span className="filters-slider-scale"><span>{control.hint}</span><span>range</span></span>
              </label>
            ))}
          </div>
          <div className="filters-appearance">
            <div className="filters-controls-heading"><div><p className="filters-kicker">appearance</p><h2>Make it yours</h2></div></div>
            <label className="filters-select-row">Skin tone <select value={appearance.skin} onChange={(event) => setAppearance((current) => ({ ...current, skin: event.target.value }))}>{skinTones.map((tone) => <option key={tone.value} value={tone.value}>{tone.label}</option>)}</select></label>
            <label className="filters-select-row">Hair style <select value={appearance.hairStyle} onChange={(event) => setAppearance((current) => ({ ...current, hairStyle: event.target.value as Appearance["hairStyle"] }))}><option value="long">Long</option><option value="bob">Bob</option><option value="curly">Curly</option><option value="updo">Updo</option></select></label>
            <label className="filters-select-row">Hair color <select value={appearance.hairColor} onChange={(event) => setAppearance((current) => ({ ...current, hairColor: event.target.value }))}>{hairColors.map((tone) => <option key={tone.value} value={tone.value}>{tone.label}</option>)}</select></label>
            <p className="filters-appearance-note">{skinLabel} skin · {hairLabel} hair</p>
          </div>
          <button type="button" className="filters-reset" onClick={reset} disabled={!shapeChanged && !appearanceChanged}>Reset to starting point <span>↺</span></button>
        </aside>
      </section>

      <footer className="filters-footer"><span>filters.chriswiki.com</span><span>an illustrative instrument — no measurements or racial categories implied</span></footer>
    </main>
  );
}
