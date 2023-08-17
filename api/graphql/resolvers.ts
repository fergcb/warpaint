// deno-lint-ignore-file no-explicit-any
import paints from "../data/paints.json" assert { type: "json" };
import { delta, hex2rgb, hsl2rgb, Paint } from "../paint.ts";

interface PaintArgs {
  id: string;
}

interface PaintsBaseArgs {
  name?: string;
  range?: string;
  type?: string;
  types?: string[];
  metallic?: boolean;
  similarTo?: SimilarColour;
  sortBy?: Array<{ field: SortField; order: SortOrder }>;
}

type PaintsArgs = PaintsBaseArgs & {
  limit: number;
  offset: number;
};

type PaintsPageArgs = PaintsBaseArgs & {
  page: number;
  size: number;
};

interface SimilarColour {
  maxDistance: number;
  target: Colour;
}

type Colour = { hex: string } | { rgb: number[] } | { hsl: number[] };

type SortOrder = "asc" | "desc";
type SortField = "range" | "type" | "name" | "metallic" | "distance" | "colour";

interface PaintsPage {
  items: Paint[];
  page: number;
  size: number;
  first: number;
  last: number;
  itemCount: number;
  totalCount: number;
  pageCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

function eq(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function includes(a: string, b: string): boolean {
  return a.toLowerCase().includes(b.toLowerCase());
}

function contains(a: string[], b: string): boolean {
  return a.some((x) => x.toLowerCase() === b.toLowerCase());
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
    throw Error("You must specify one of 'hex', 'rgb' or 'hsl' in the `similarTo.target` object.");
  }

  const distance = delta(paint.rgb, targetRGB);
  paint.distance = distance;

  return distance < maxDistance;
}

function resolvePaints(args: PaintsBaseArgs): Paint[] {
  const sortBy: PaintsBaseArgs["sortBy"] =
    args.sortBy ??
    (args.similarTo !== undefined
      ? [{ field: "distance", order: "asc" }]
      : [{ field: "name", order: "asc" }]);

  return paints
    .map((p) => p as Paint)
    .filter(
      (paint) =>
        (args.name === undefined || includes(paint.name, args.name)) &&
        (args.range === undefined || eq(paint.range, args.range)) &&
        (args.type === undefined || eq(paint.type, args.type)) &&
        (args.types === undefined || contains(args.types, paint.type)) &&
        (args.metallic === undefined || paint.metallic === args.metallic) &&
        (args.similarTo === undefined || isSimilar(paint as Paint, args.similarTo!))
    )
    .toSorted((a, b): number => {
      for (const { field, order } of sortBy) {
        const d = order === "asc" ? 1 : -1;
        if (field === "colour") {
          for (let i = 0; i < 3; i++) {
            if (a.hsl[i] > b.hsl[i]) return d;
            if (a.hsl[i] < b.hsl[i]) return -d;
          }
        } else {
          const ak = a[field as keyof Paint];
          const bk = b[field as keyof Paint];
          if (ak! > bk!) return d;
          if (ak! < bk!) return -d;
        }
      }

      return 0;
    });
}

export const resolvers = {
  Query: {
    paint: (_: any, { id }: PaintArgs) => {
      return paints.find((paint) => paint.id === id);
    },
    paints: (_: any, args: PaintsArgs): Paint[] => {
      const items = resolvePaints(args);
      return items.slice(args.offset, args.offset + args.limit);
    },
    paintsPage: (_: any, args: PaintsPageArgs): PaintsPage => {
      const items = resolvePaints(args);

      const { page, size } = args;
      const totalCount = items.length;
      const pageCount = Math.ceil(totalCount / size);
      const first = page * size;
      const last = Math.min((page + 1) * size, totalCount);
      const hasNext = page < pageCount - 1;
      const hasPrev = page > 0;

      const pageItems = items.slice(first, last);

      const itemCount = pageItems.length;

      return {
        items: pageItems,
        page: page,
        size,
        first,
        last,
        itemCount,
        totalCount,
        pageCount,
        hasNext,
        hasPrev,
      };
    },
  },
};
