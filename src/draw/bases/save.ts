import type { Base } from 'Draw/bases/Base';
import type { Point2D as Point } from 'Math/points/Point';
import {
  SavableState as SavableNumberingState,
  savableState as savableNumberingState,
} from 'Draw/bases/numberings/save';

import type { CircleBaseOutline } from 'Draw/bases/annotate/circle/CircleBaseOutline';

type SavedOutline = ReturnType<
  InstanceType<typeof CircleBaseOutline>['toSaved']
>;

type SavedHighlighting = SavedOutline;

export type SavableState = {
  className: 'Base';
  textId: string;
  center?: Point;
  highlighting?: SavedHighlighting;
  outline?: SavedOutline;
  numbering?: SavableNumberingState;
}

export function savableState(b: Base): SavableState {
  let saved: SavableState = {
    className: 'Base',
    textId: String(b.text.id()),
    center: b.center(),
  };
  if (b.highlighting) {
    saved.highlighting = b.highlighting.toSaved();
  }
  if (b.outline) {
    saved.outline = b.outline.toSaved();
  }
  if (b.numbering) {
    saved.numbering = savableNumberingState(b.numbering);
  }
  return saved;
}
