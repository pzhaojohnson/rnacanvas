import type { Base } from 'Draw/bases/Base';
import * as SVG from '@svgdotjs/svg.js';
import { findTextByUniqueId, findLineByUniqueId } from 'Draw/saved/svg';
import { BaseNumbering } from './BaseNumbering';
import { values } from './values';

export type SavableState = {
  className: 'BaseNumbering';
  textId: string;
  lineId: string;
}

export function savableState(bn: BaseNumbering): SavableState {
  return {
    className: 'BaseNumbering',
    textId: String(bn.text.id()),
    lineId: String(bn.line.id()),
  };
}

export type SavedState = { [key: string]: unknown }

export function addSavedNumbering(b: Base, saved: SavedState): void | never {
  if (saved.className != 'BaseNumbering') {
    throw new Error('Saved state is not for a base numbering.');
  }
  let svg = b.text.root();
  if (!(svg instanceof SVG.Svg)) {
    throw new Error('Unable to retrieve root SVG element of base.');
  } else {
    let text = findTextByUniqueId(svg, saved.textId);
    let line = findLineByUniqueId(svg, saved.lineId);
    let bn = new BaseNumbering(
      text,
      line,
      { x: b.xCenter, y: b.yCenter },
    );
    if (b.numbering) {
      throw new Error('Base already has numbering.');
    }
    b.numbering = bn;
    BaseNumbering.recommendedDefaults = values(bn);
  }
}
