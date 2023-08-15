// deno-lint-ignore-file no-explicit-any
import paints from "../data/paints.json" assert { type: "json" };
import { delta, hex2rgb, hsl2rgb, Paint } from "../paint.ts";

interface SimilarColour {
  maxDistance: number;
  target: Colour;
}

type Colour = { hex: string } | { rgb: number[] } | { hsl: number[] };

type SortOrder = "asc" | "desc";

interface PaintsArgs {
  name?: string;
  range?: string;
  type?: string;
  metallic?: boolean;
  similarTo?: SimilarColour;
  page: number;
  size: number;
  orderBy?: {
    range?: SortOrder;
    type?: SortOrder;
    name?: SortOrder;
    metallic?: SortOrder;
    distance?: SortOrder;
  };
}

interface PaintArgs {
  name: string;
}

function eq(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLocaleLowerCase();
}

function includes(a: string, b: string): boolean {
  return a.toLowerCase().includes(b.toLowerCase());
}

function isSimilar(paint: Paint, query: SimilarColour): boolean {
  const { target, maxDistance } = query;

  let targetRGB!: [number, number, number];
  if ("rgb" in target) {
    if (target.rgb.length !== 3) {
      throw Error("RGB array should have exactly three values.");
    }
    targetRGB = target.rgb as [number, number, number];
  } else if ("hsl" in target) {
    if (target.hsl.length !== 3) {
      throw Error("HSL array should have exactly three values.");
    }
    targetRGB = hsl2rgb(target.hsl as [number, number, number]);
  } else if ("hex" in target) {
    if (!/^#[a-fA-F0-9]{6}$/.test(target.hex)) {
      throw Error("Hex value is malformed.");
    }
    targetRGB = hex2rgb(target.hex);
  } else {
    throw Error(
      "You must specify one of 'hex', 'rgb' or 'hsl' in the `similarTo.target` object.",
    );
  }

  const distance = delta(paint.rgb, targetRGB);
  paint.distance = distance;

  return distance < maxDistance;
}

export const resolvers = {
  Query: {
    paints: (_: any, args: PaintsArgs) => {
      const orderBy: PaintsArgs["orderBy"] = Object.assign(
        {},
        args.similarTo !== undefined
          ? {
            distance: "asc",
          }
          : {
            name: "asc",
          },
        args.orderBy,
      );

      return paints
        .map((p) => p as Paint)
        .filter(
          (paint) =>
            (args.name === undefined || includes(paint.name, args.name)) &&
            (args.range === undefined || eq(paint.range, args.range)) &&
            (args.type === undefined || eq(paint.type, args.type)) &&
            (args.metallic === undefined || paint.metallic === args.metallic) &&
            (args.similarTo === undefined ||
              isSimilar(paint as Paint, args.similarTo!)),
        )
        .slice(args.page * args.size, (args.page + 1) * args.size)
        .toSorted((a, b): number => {
          for (
            const [key, order] of Object.entries(orderBy) as [
              keyof Paint,
              SortOrder,
            ][]
          ) {
            const d = order === "asc" ? 1 : -1;
            if (a[key]! > b[key]!) return d;
            else if (a[key]! < b[key]!) return -d;
          }

          return 0;
        });
    },
    paint: (_: any, { name }: PaintArgs) => {
      return paints.find((paint) => paint.name === name);
    },
  },
};
