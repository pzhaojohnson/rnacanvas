import { StrictLayout } from 'Draw/strict/layout/StrictLayout';
import { Stem } from 'Partners/stems/Stem';
import { bottomPair } from 'Partners/stems/Stem';
import { upstreamPartner } from 'Partners/pairs/Pair';
import { downstreamPartner } from 'Partners/pairs/Pair';
import { displacement } from '@rnacanvas/points';
import { direction } from '@rnacanvas/vectors';
import { normalizeAngle } from 'Math/angles/normalizeAngle';

// returns the upstream angle of the stem in the given strict layout
// or NaN if unable to determine the upstream angle of the stem
export function upstreamAngleOfStem(strictLayout: StrictLayout, stem: Stem): number {
  let p1 = upstreamPartner(bottomPair(stem));
  let p2 = downstreamPartner(bottomPair(stem));

  let bcs1 = strictLayout.baseCoordinatesAtPosition(p1);
  let bcs2 = strictLayout.baseCoordinatesAtPosition(p2);

  if (!bcs1 || !bcs2) {
    return NaN;
  }

  return direction(displacement(bcs2.center(), bcs1.center()));
}

// returns the downstream angle of the stem in the given strict layout
// or NaN if unable to determine the downstream angle of the stem
export function downstreamAngleOfStem(strictLayout: StrictLayout, stem: Stem): number {
  return Math.PI + upstreamAngleOfStem(strictLayout, stem);
}

// returns the upward angle of the enclosing stem in the given strict layout
// as determined by its coordinates relative to the enclosed stem
// (returns NaN if unable to determine the upward angle of the enclosing stem)
export function upwardAngleOfEnclosingStem(strictLayout: StrictLayout, enclosingStem: Stem, enclosedStem: Stem): number {
  let p1 = upstreamPartner(bottomPair(enclosingStem));
  let p2 = upstreamPartner(bottomPair(enclosedStem));

  let bcs1 = strictLayout.baseCoordinatesAtPosition(p1);
  let bcs2 = strictLayout.baseCoordinatesAtPosition(p2);

  if (!bcs1 || !bcs2) {
    return NaN;
  }

  let da = downstreamAngleOfStem(strictLayout, enclosingStem);
  if (!Number.isFinite(da)) {
    return NaN;
  }

  let a12 = direction(displacement(bcs1.center(), bcs2.center()));
  a12 = normalizeAngle(a12, da);
  if (a12 - da > Math.PI) {
    return da - (Math.PI / 2);
  } else {
    return da + (Math.PI / 2);
  }
}

// returns the downward angle of the enclosing stem in the given strict layout
// as determined by its coordinates relative to the enclosed stem
// (returns NaN if unable to determine the downward angle of the enclosing stem)
export function downwardAngleOfEnclosingStem(strictLayout: StrictLayout, enclosingStem: Stem, enclosedStem: Stem): number {
  return Math.PI + upwardAngleOfEnclosingStem(strictLayout, enclosingStem, enclosedStem);
}
