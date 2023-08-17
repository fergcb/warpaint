export type Paint = {
  id: string;
  name: string;
  range: string;
  type: string;
  metallic: boolean;
  distance?: number; // Only present in api output when a distance-based filter is used
} & Colour;

interface Colour {
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
}

function clean(str: string): string {
  return str
    .replace("'", "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();
}

function createId(range: string, type: string, name: string): string {
  return `${clean(range)}_${clean(type)}_${clean(name)}`;
}

export function createPaint(
  name: string,
  range: string,
  type: string,
  hex: string,
  metallic = false
): Paint {
  const colours = expandHexcode(hex);
  return {
    id: createId(range, type, name),
    name,
    range,
    type: type.toLowerCase(),
    metallic,
    ...colours,
  };
}

function expandHexcode(hex: string): Colour {
  return {
    hex,
    rgb: hex2rgb(hex),
    hsl: hex2hsl(hex),
  };
}

export function hex2rgb(hex: string): Colour["rgb"] {
  return [
    parseInt(hex.substring(1, 3), 16),
    parseInt(hex.substring(3, 5), 16),
    parseInt(hex.substring(5, 7), 16),
  ];
}

export function hsl2rgb([h, s, l]: [number, number, number]): Colour["rgb"] {
  let r, g, b;

  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hue2rgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hex2hsl(hex: string): Colour["hsl"] {
  let [r, g, b] = hex2rgb(hex);

  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) {
    h = 0;
  } else if (cmax == r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax == g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.round(+(s * 100));
  l = Math.round(+(l * 100));

  return [h, s, l];
}

export function rgb2lab(rgb: Colour["rgb"]): [number, number, number] {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  let x, y, z;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

export function delta(a: Colour["rgb"], b: Colour["rgb"]): number {
  const labA = rgb2lab(a);
  const labB = rgb2lab(b);

  const deltaL = labA[0] - labB[0];
  const deltaA = labA[1] - labB[1];
  const deltaB = labA[2] - labB[2];

  const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);

  const deltaC = c1 - c2;

  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);

  const sc = 1.0 + 0.045 * c1;
  const sh = 1.0 + 0.015 * c1;
  const deltaLKlsl = deltaL / 1.0;
  const deltaCkcsc = deltaC / sc;
  const deltaHkhsh = deltaH / sh;

  const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;

  return i < 0 ? 0 : Math.sqrt(i);
}
