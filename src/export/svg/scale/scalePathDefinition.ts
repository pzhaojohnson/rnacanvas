import * as SVG from '@svgdotjs/svg.js';

function assertIsNumber(v: unknown): asserts v is number {
  if (typeof v != 'number') {
    throw new Error(`Unexpected non-numeric value: ${v}.`);
  }
}

function scaleEllipticalArcCurve(c: SVG.PathCommand, factor: number): string | never {
  let scaled = '';
  let t = c[0];
  scaled += t + ' ';
  c.slice(1).forEach((v: unknown, i: number) => {
    assertIsNumber(v);
    if ([2, 3, 4].includes(i)) {
      scaled += v + ' ';
    } else {
      scaled += (factor * v) + ' ';
    }
  });
  return scaled;
}

function scaleNonEllipticalArcCurve(c: SVG.PathCommand, factor: number): string | never {
  let scaled = '';
  let t = c[0];
  scaled += t + ' ';
  c.slice(1).forEach((v: unknown) => {
    assertIsNumber(v);
    scaled += (factor * v) + ' ';
  });
  return scaled;
}

function scalePathCommand(c: SVG.PathCommand, factor: number): string | never {
  let t = c[0];
  if (['A', 'a'].includes(t)) {
    return scaleEllipticalArcCurve(c, factor);
  } else {
    return scaleNonEllipticalArcCurve(c, factor);
  }
}

export function scalePathDefinition(path: SVG.Path, factor: number) {
  try {
    let d = path.attr('d');
    if (d && d != 'none') {
      let scaled = '';
      (new SVG.PathArray(d)).forEach(c => {
        scaled += scalePathCommand(c, factor);
      });
      path.plot(scaled.trim());
    }
  } catch (error) {
    console.error(error);
    console.error(`Unable to scale definition of path ${path}.`);
  }
}
