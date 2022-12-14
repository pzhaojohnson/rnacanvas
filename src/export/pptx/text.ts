import * as SVG from '@svgdotjs/svg.js';
import { pixelsToInches, pixelsToPoints } from 'Export/units';
import { interpretColor } from 'Draw/svg/interpretColor';
import { toPptxHex } from 'Export/pptx/color';
import { interpretNumber } from 'Draw/svg/interpretNumber';
import { round } from 'Math/round';
import PptxGenJS from 'pptxgenjs';

function isBlankString(v: unknown): boolean {
  return typeof v == 'string' && v.trim().length == 0;
}

function coordinatesAndDimensions(text: SVG.Text) {
  let bbox = text.bbox();

  // multiply by two for some extra space around the text content
  let w = 2 * pixelsToInches(bbox.width);
  let h = 2 * pixelsToInches(bbox.height);

  let x = pixelsToInches(bbox.cx) - (w / 2);
  let y = pixelsToInches(bbox.cy) - (h / 2);

  return {
    x: round(x, 4),
    y: round(y, 4),
    w: round(w, 4),
    h: round(h, 4),
  };
}

function fontFace(text: SVG.Text): string | undefined {
  let ff = text.attr('font-family');
  if (typeof ff == 'string') {
    return ff;
  } else {
    console.error(`Font face of text is not a string: ${ff}.`);
  }
}

function fontSize(text: SVG.Text): number {
  let fs = text.attr('font-size');
  let n = interpretNumber(fs);
  if (n) {
    let pxs = n.convert('px').valueOf();
    let pts = pixelsToPoints(pxs);
    return round(pts, 2);
  } else {
    console.error(`Unable to parse text font size: ${fs}. Defaulting to 9pt.`);
    return 9;
  }
}

function isBold(text: SVG.Text): boolean {
  let fw = text.attr('font-weight');
  if (fw == undefined || isBlankString(fw)) {
    return false;
  } else if (fw == 'bold') {
    return true;
  } else {
    let n = interpretNumber(fw);
    if (n) {
      return n.valueOf() > 550;
    } else {
      console.error(`Unable to parse text font weight: ${fw}.`);
      return false;
    }
  }
}

// converts values less than 0 to 0 and greater than 1 to 1
function clampOpacity(o: number): number {
  if (o < 0) {
    return 0;
  } else if (o > 1) {
    return 1;
  } else {
    return o;
  }
}

// converts an opacity value to its numeric value between 0 and 1
function interpretOpacity(o: unknown): number {
  if (o == undefined || isBlankString(o)) {
    return 1;
  } else {
    let n = interpretNumber(o);
    if (n) {
      let v = n.valueOf();
      return clampOpacity(v);
    } else {
      console.error(`Unable to parse opacity: ${o}. Defaulting to 1.`);
      return 1;
    }
  }
}

function transparency(text: SVG.Text): number {
  let fo = interpretOpacity(text.attr('fill-opacity'));
  let o = interpretOpacity(text.attr('opacity'));
  return round(
    100 * (1 - (fo * o)),
    0,
  );
}

function color(text: SVG.Text) {
  let f = text.attr('fill');
  let pptxHex: string;
  if (f == undefined || isBlankString(f)) {
    pptxHex = '000000';
  } else {
    let c = interpretColor(f);
    if (c) {
      pptxHex = toPptxHex(c);
    } else {
      console.error(`Unable to parse text fill: ${f}. Defaulting to black.`);
      pptxHex = '000000';
    }
  }
  return {
    color: pptxHex,
    transparency: transparency(text),
  };
}

export type TextOptions = {
  x: number;
  y: number;
  w: number;
  h: number;
  align: 'center';
  valign: 'middle';
  margin: number;
  fontFace?: string;
  fontSize?: number;
  bold?: boolean;
  color?: any; // type definition seems to be missing in PptxGenJS library
}

export function textOptions(text: SVG.Text): TextOptions {
  return {
    ...coordinatesAndDimensions(text),
    align: 'center',
    valign: 'middle',
    margin: 0,
    fontFace: fontFace(text),
    fontSize: fontSize(text),
    bold: isBold(text),
    color: color(text),
  };
}

export function addText(slide: PptxGenJS.Slide, text: SVG.Text) {
  slide.addText(
    text.text(),
    textOptions(text),
  );
}
