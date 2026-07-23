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

const initialShape: Shape = {
  height: 52,
  shoulders: 48,
  bust: 50,
  waist: 44,
  hips: 52,
  legs: 50,
};

const controls: Array<{ key: keyof Shape; label: string; min: number; max: number }> = [
  { key: "height", label: "Height", min: 0, max: 100 },
  { key: "shoulders", label: "Shoulders", min: 0, max: 100 },
  { key: "bust", label: "Bust", min: 0, max: 100 },
  { key: "waist", label: "Waist", min: 0, max: 100 },
  { key: "hips", label: "Hips", min: 0, max: 100 },
  { key: "legs", label: "Leg length", min: 0, max: 100 },
];

function BodyFigure({ shape }: { shape: Shape }) {
  const figure = useMemo(() => {
    const height = 0.88 + shape.height / 100 * 0.16;
    const shoulder = 48 + shape.shoulders * 0.14;
    const bust = 34 + shape.bust * 0.13;
    const waist = 27 + shape.waist * 0.11;
    const hip = 36 + shape.hips * 0.15;
    const legRatio = 0.42 + shape.legs / 100 * 0.12;
    const top = 28 + (1 - height) * 10;
    const hipY = 142 - legRatio * 9;
    const kneeY = hipY + (230 - hipY) * 0.55;
    const ankleY = 230 + (1 - legRatio) * 12;

    return { shoulder, bust, waist, hip, top, hipY, kneeY, ankleY };
  }, [shape]);

  const center = 150;
  const headY = figure.top + 22;
  const neckY = figure.top + 41;
  const shoulderY = figure.top + 50;
  const bustY = figure.top + 74;

  return (
    <svg className="filters-figure" viewBox="0 0 300 270" role="img" aria-label="An abstract line rendering of a human woman">
      <defs>
        <linearGradient id="figure-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3b6a5" />
          <stop offset="1" stopColor="#d87d77" />
        </linearGradient>
        <filter id="figure-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#7e4350" floodOpacity="0.18" />
        </filter>
      </defs>
      <ellipse cx="150" cy="248" rx="74" ry="8" fill="#7e4350" opacity="0.12" />
      <g filter="url(#figure-shadow)" fill="url(#figure-fill)" stroke="#8d4f5a" strokeWidth="2.2" strokeLinejoin="round">
        <ellipse cx={center} cy={headY} rx="19" ry="22" />
        <path d={`M ${center - 19} ${headY - 7} Q ${center - 18} ${headY - 31} ${center} ${headY - 33} Q ${center + 22} ${headY - 29} ${center + 20} ${headY + 5} Q ${center + 9} ${headY - 8} ${center - 19} ${headY - 7}Z`} fill="#3d2639" stroke="#3d2639" />
        <path d={`M ${center - 9} ${neckY - 2} L ${center - 10} ${shoulderY - 4} Q ${center - figure.shoulder} ${shoulderY - 2} ${center - figure.bust} ${bustY} Q ${center - figure.waist} ${figure.hipY - 26} ${center - figure.hip} ${figure.hipY} Q ${center - 17} ${figure.hipY + 8} ${center - 15} ${figure.hipY + 16} L ${center - 10} ${figure.ankleY} L ${center - 2} ${figure.ankleY} L ${center} ${figure.hipY + 20} L ${center + 2} ${figure.ankleY} L ${center + 10} ${figure.ankleY} L ${center + 15} ${figure.hipY + 16} Q ${center + 17} ${figure.hipY + 8} ${center + figure.hip} ${figure.hipY} Q ${center + figure.waist} ${figure.hipY - 26} ${center + figure.bust} ${bustY} Q ${center + figure.shoulder} ${shoulderY - 2} ${center + 10} ${shoulderY - 4} L ${center + 9} ${neckY - 2}Z`} />
        <path d={`M ${center - figure.shoulder + 2} ${shoulderY} Q ${center - figure.shoulder - 8} ${shoulderY + 25} ${center - figure.shoulder - 4} ${shoulderY + 58} L ${center - figure.shoulder + 3} ${shoulderY + 58} Q ${center - figure.shoulder + 7} ${shoulderY + 27} ${center - figure.shoulder + 11} ${shoulderY + 6}Z`} />
        <path d={`M ${center + figure.shoulder - 2} ${shoulderY} Q ${center + figure.shoulder + 8} ${shoulderY + 25} ${center + figure.shoulder + 4} ${shoulderY + 58} L ${center + figure.shoulder - 3} ${shoulderY + 58} Q ${center + figure.shoulder - 7} ${shoulderY + 27} ${center + figure.shoulder - 11} ${shoulderY + 6}Z`} />
      </g>
      <g fill="none" stroke="#8d4f5a" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <path d={`M ${center - 5} ${headY + 4} Q ${center} ${headY + 8} ${center + 5} ${headY + 4}`} />
        <path d={`M ${center - 7} ${headY - 4} L ${center - 3} ${headY - 4} M ${center + 3} ${headY - 4} L ${center + 7} ${headY - 4}`} />
        <path d={`M ${center - figure.bust + 6} ${bustY + 3} Q ${center} ${bustY + 12} ${center + figure.bust - 6} ${bustY + 3}`} />
        <path d={`M ${center - figure.waist} ${figure.hipY - 26} Q ${center} ${figure.hipY - 18} ${center + figure.waist} ${figure.hipY - 26}`} />
        <path d={`M ${center - 13} ${figure.kneeY} Q ${center - 9} ${figure.kneeY + 3} ${center - 4} ${figure.kneeY}`} />
        <path d={`M ${center + 4} ${figure.kneeY} Q ${center + 9} ${figure.kneeY + 3} ${center + 13} ${figure.kneeY}`} />
      </g>
    </svg>
  );
}

export function FiltersStudio() {
  const [shape, setShape] = useState(initialShape);
  const changed = JSON.stringify(shape) !== JSON.stringify(initialShape);

  function updateShape(key: keyof Shape, value: number) {
    setShape((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="filters-page">
      <section className="filters-hero">
        <div>
          <p className="filters-kicker">filters / body study 01</p>
          <h1 className="filters-title">Shape is a moving target.</h1>
          <p className="filters-intro">A small interactive study in proportion. Move a slider and watch the figure respond in real time.</p>
        </div>
        <div className="filters-status"><span /> live rendering</div>
      </section>

      <section className="filters-workspace">
        <div className="filters-stage">
          <div className="filters-stage-grid" />
          <div className="filters-stage-caption"><span>FIG. 01</span><span>FRONT VIEW</span></div>
          <BodyFigure shape={shape} />
          <div className="filters-axis" aria-hidden="true" />
        </div>

        <aside className="filters-controls" aria-label="Figure controls">
          <div className="filters-controls-heading">
            <div><p className="filters-kicker">parameters</p><h2>Adjust the form</h2></div>
            <span className="filters-count">{Object.values(shape).filter((value, index) => value !== Object.values(initialShape)[index]).length}/6</span>
          </div>
          <div className="filters-slider-list">
            {controls.map((control) => (
              <label className="filters-slider-row" key={control.key}>
                <span className="filters-slider-label"><span>{control.label}</span><output>{shape[control.key]}</output></span>
                <input type="range" min={control.min} max={control.max} value={shape[control.key]} onChange={(event) => updateShape(control.key, Number(event.target.value))} aria-label={control.label} />
                <span className="filters-slider-scale"><span>subtle</span><span>emphasized</span></span>
              </label>
            ))}
          </div>
          <button type="button" className="filters-reset" onClick={() => setShape(initialShape)} disabled={!changed}>Reset to starting point <span>↺</span></button>
        </aside>
      </section>

      <footer className="filters-footer"><span>filters.chriswiki.com</span><span>built as a visual instrument — no measurements implied</span></footer>
    </main>
  );
}
