import beautify from "npm:json-beautify";
import paints from "../data/paints.json" assert { type: "json" };
import { createPaint } from "../paint.ts";

const newPaints = paints.map((paint) => {
  return createPaint(
    paint.name,
    paint.range,
    paint.type,
    paint.hex,
    paint.metallic,
  );
});

console.log(beautify(newPaints, null!, 2, 100));
