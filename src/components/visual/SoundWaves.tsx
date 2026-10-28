import styles from "./SoundWaves.module.css";

const WAVES = [
  { c: "#ff4d9d", a: 26, f: 2, d: 0 },
  { c: "#ffb547", a: 20, f: 3, d: -2 },
  { c: "#2ee6ff", a: 30, f: 1.5, d: -4 },
  { c: "#a3e635", a: 16, f: 2.5, d: -6 },
];

function wavePath(amp: number, freq: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= 1200; x += 20) {
    const y = 100 + amp * Math.sin((x / 1200) * Math.PI * 2 * freq);
    pts.push(`${x === 0 ? "M" : "L"}${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

/** Quatro ondas nas cores das vozes, em movimento contínuo (decorativo). */
export function SoundWaves() {
  return (
    <svg className={styles.waves} viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
      {WAVES.map((w) => (
        <path key={w.c} d={wavePath(w.a, w.f)} stroke={w.c} className={styles.wave} style={{ animationDelay: `${w.d}s` }} />
      ))}
    </svg>
  );
}
