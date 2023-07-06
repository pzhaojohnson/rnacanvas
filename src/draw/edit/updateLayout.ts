import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import { StrictLayout } from 'Draw/strict/layout/StrictLayout';
import layoutPartnersOfStrictDrawing from './layoutPartnersOfStrictDrawing';
import type { Drawing } from 'Draw/Drawing';
import { resize } from 'Draw/dimensions';
import type { Base } from 'Draw/bases/Base';
import { Point2D as Point } from 'Math/points/Point';
import { orientBaseNumberings } from 'Draw/bases/numberings/orient';

import { DrawingOriginChecker } from 'Draw/origin/DrawingOriginChecker';

let drawingOriginChecker = new DrawingOriginChecker();

export interface Options {

  // When specified, only bases at the given overall positions
  // in the drawing are moved. Otherwise, all bases are moved.
  onlyMove?: Set<number>;

  // Specifies whether to update the padding between the bases
  // and the edges of the drawing. When the padding is not
  // updated, often times fewer bases have to be moved, which
  // improves performance.
  updatePadding?: boolean;
}

export const defaultOptions: Options = {
  updatePadding: true,
}

function createLayout(strictDrawing: StrictDrawing): StrictLayout | undefined {
  try {
    return new StrictLayout(
      layoutPartnersOfStrictDrawing(strictDrawing),
      strictDrawing.generalLayoutProps,
      strictDrawing.perBaseLayoutProps(),
    );
  } catch (err) {
    console.error('Unable to create layout for drawing.');
    return undefined;
  }
}

function updateDimensions(strictDrawing: StrictDrawing, layout: StrictLayout) {
  let prevWidth = strictDrawing.drawing.width;
  let prevHeight = strictDrawing.drawing.height;
  let width = Math.max(
    (2 * window.screen.width) + (strictDrawing.baseWidth * layout.width),
    prevWidth,
  );
  let height = Math.max(
    (2 * window.screen.height) + (strictDrawing.baseHeight * layout.height),
    prevHeight,
  );
  resize(strictDrawing.drawing, { width, height });
}

type BaseCoordinates = {
  center: Point;
};

// returns updated coordinates for each base based on the given strict layout
// and options
export function updatedBaseCoordinates(strictDrawing: StrictDrawing, layout: StrictLayout, options?: Options): BaseCoordinates[] {
  let layoutMins = {
    x: layout.xMin,
    y: layout.yMin,
  }; // cache to improve performance

  let xOffset = 0;
  let yOffset = 0;
  if (options?.updatePadding) {
    xOffset = (strictDrawing.drawing.width - (strictDrawing.baseWidth * layout.width)) / 2;
    yOffset = (strictDrawing.drawing.height - (strictDrawing.baseHeight * layout.height)) / 2;
  } else {
    let b1 = strictDrawing.drawing.getBaseAtOverallPosition(1);
    let bcs1 = layout.baseCoordinatesAtPosition(1);
    if (b1 && bcs1) {
      xOffset = b1.xCenter - (strictDrawing.baseWidth * (bcs1.xCenter - layoutMins.x));
      yOffset = b1.yCenter - (strictDrawing.baseHeight * (bcs1.yCenter - layoutMins.y));
    }
  }

  let baseCoordinates: BaseCoordinates[] = [];

  // first add the current coordinates for every base
  strictDrawing.drawing.forEachBase(b => {
    baseCoordinates.push({ center: { x: b.xCenter, y: b.yCenter } });
  });

  // then update coordinates for bases that should be moved
  strictDrawing.drawing.forEachBase((b, p) => {
    let shouldBeMoved = !options || !options.onlyMove || options.onlyMove.has(p);
    if (shouldBeMoved) {
      let bcs = layout.baseCoordinatesAtPosition(p);
      if (bcs) {
        baseCoordinates[p - 1] = {
          center: {
            x: xOffset + (strictDrawing.baseWidth * (bcs.xCenter - layoutMins.x)),
            y: yOffset + (strictDrawing.baseHeight * (bcs.yCenter - layoutMins.y)),
          },
        };
      }
    }
  });

  return baseCoordinates;
}

function moveBases(strictDrawing: StrictDrawing, layout: StrictLayout, options?: Options) {
  let baseCoordinates = updatedBaseCoordinates(strictDrawing, layout, options);
  strictDrawing.drawing.forEachBase((b, p) => {
    let shouldBeMoved = !options || !options.onlyMove || options.onlyMove.has(p);
    if (shouldBeMoved) {
      let bcs: BaseCoordinates | undefined = baseCoordinates[p - 1];
      if (bcs) {
        b.recenter(bcs.center);
      }
    }
  });
}

function repositionBonds(drawing: Drawing, options?: Options) {
  let basePositions = new Map<Base, number>();
  drawing.bases().forEach((b, i) => basePositions.set(b, i + 1));
  [
    ...drawing.primaryBonds,
    ...drawing.secondaryBonds,
    ...drawing.tertiaryBonds,
  ].forEach(bond => {
    if (!options?.onlyMove) {
      // reposition all bonds by default if all bases may have been moved
      bond.reposition();
    } else {
      let p1 = basePositions.get(bond.base1) ?? 0;
      let p2 = basePositions.get(bond.base2) ?? 0;
      if (options.onlyMove.has(p1) || options.onlyMove.has(p2)) {
        bond.reposition();
      }
    }
  });
}

export function updateLayout(strictDrawing: StrictDrawing, options=defaultOptions) {
  if (drawingOriginChecker.originIsAnRNA2DSchema(strictDrawing)) {
    console.log('Forgoing layout update.');
    console.log('(Drawing originates from an RNA 2D schema.)');
    return;
  }

  let layoutSeq = strictDrawing.layoutSequence();
  let layout = createLayout(strictDrawing);
  if (layout) {
    if (options.updatePadding) {
      updateDimensions(strictDrawing, layout);
    }
    moveBases(strictDrawing, layout, options);
    repositionBonds(strictDrawing.drawing, options);
    if (!options.onlyMove || options.onlyMove.size == layoutSeq.length) {
      orientBaseNumberings(strictDrawing.drawing);
    }
  }
}
