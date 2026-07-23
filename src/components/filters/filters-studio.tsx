"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

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

const skinTextures: Record<string, string> = {
  "#6f4435": "/assets/filters/makehuman/skins/dark.png",
  "#986047": "/assets/filters/makehuman/skins/dark.png",
  "#c18762": "/assets/filters/makehuman/skins/beige.png",
  "#d9a17e": "/assets/filters/makehuman/skins/beige.png",
  "#e7b79e": "/assets/filters/makehuman/skins/light.png",
};

const hairAssets: Record<Appearance["hairStyle"], string> = {
  long: "/assets/filters/makehuman/hair/long01.obj",
  bob: "/assets/filters/makehuman/hair/bob01.obj",
  curly: "/assets/filters/makehuman/hair/afro01.obj",
  updo: "/assets/filters/makehuman/hair/ponytail01.obj",
};

function HumanModel({ shape, appearance }: { shape: Shape; appearance: Appearance }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth || 520;
    const height = mount.clientHeight || 620;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 100);
    camera.position.set(0, 1.65, 7.2);
    camera.lookAt(0, 1.55, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xfff8ed, 0x54463d, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(-3, 5, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc8d7ff, 1.3);
    rim.position.set(4, 3, -3);
    scene.add(rim);
    const root = new THREE.Group();
    scene.add(root);
    let disposed = false;
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    const skinTexture = textureLoader.load(skinTextures[appearance.skin] ?? skinTextures["#c18762"]);
    skinTexture.colorSpace = THREE.SRGBColorSpace;
    loader.load("/assets/filters/makehuman/female1605.obj", (body) => {
      if (disposed) return;
      body.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.material = new THREE.MeshStandardMaterial({ map: skinTexture, roughness: 0.72, metalness: 0 });
        const geometry = child.geometry as THREE.BufferGeometry;
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        if (!box) return;
        const minY = box.min.y;
        const rangeY = Math.max(box.max.y - minY, 0.001);
        const positions = geometry.attributes.position;
        const vector = new THREE.Vector3();
        for (let index = 0; index < positions.count; index += 1) {
          vector.fromBufferAttribute(positions, index);
          const normalizedY = (vector.y - minY) / rangeY;
          let widthFactor = 1;
          if (normalizedY > 0.73) widthFactor = 0.92 + shape.shoulders / 100 * 0.18;
          else if (normalizedY > 0.56) widthFactor = 0.94 + shape.bust / 100 * 0.16;
          else if (normalizedY > 0.38) widthFactor = 1.12 - shape.waist / 100 * 0.22;
          else if (normalizedY > 0.2) widthFactor = 0.94 + shape.hips / 100 * 0.2;
          vector.x *= widthFactor;
          vector.y = minY + (vector.y - minY) * (0.93 + shape.height / 100 * 0.14);
          positions.setXYZ(index, vector.x, vector.y, vector.z);
        }
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
      });
      root.add(body);
    });
    loader.load(hairAssets[appearance.hairStyle], (hair) => {
      if (disposed) return;
      hair.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = new THREE.MeshStandardMaterial({ color: appearance.hairColor, roughness: 0.86 });
      });
      root.add(hair);
    });
    const ground = new THREE.Mesh(new THREE.CircleGeometry(1.5, 64), new THREE.MeshBasicMaterial({ color: 0x231f1c, transparent: true, opacity: 0.1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.03;
    ground.scale.set(1.25, 0.35, 1);
    scene.add(ground);
    let frame = 0;
    const animate = () => { frame = requestAnimationFrame(animate); root.rotation.y = Math.sin(performance.now() / 3200) * 0.045; renderer.render(scene, camera); };
    animate();
    const resize = () => { const nextWidth = mount.clientWidth || width; const nextHeight = mount.clientHeight || height; camera.aspect = nextWidth / nextHeight; camera.updateProjectionMatrix(); renderer.setSize(nextWidth, nextHeight); };
    window.addEventListener("resize", resize);
    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener("resize", resize); renderer.dispose(); skinTexture.dispose(); mount.removeChild(renderer.domElement); };
  }, [appearance.hairColor, appearance.hairStyle, appearance.skin, shape]);

  return <div ref={mountRef} className="filters-human-model" role="img" aria-label="A MakeHuman adult woman model with adjustable proportions, skin tone, and hair" />;
}

export function FiltersStudio({ embedded = false }: { embedded?: boolean }) {
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
    <main className={`filters-page${embedded ? " filters-page-embed" : ""}`}>
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
          <HumanModel shape={shape} appearance={appearance} />
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

      {!embedded && <footer className="filters-footer"><span>filters.chriswiki.com</span><span>an illustrative instrument — no measurements or racial categories implied</span></footer>}
    </main>
  );
}
