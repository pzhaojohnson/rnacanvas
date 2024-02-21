import type { App } from 'App';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import { StrictLayoutSpecification } from './StrictLayoutSpecification';
import { layoutSpecification } from './StrictLayoutSpecification';
import { createStrictLayout } from './createStrictLayout';
import { updateLayout } from './updateLayout';

import { Base } from 'Draw/bases/Base';
import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';
import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';
import { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';
import { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import { isStraightBond } from 'Draw/bonds/straight/StraightBond';
import { basePaddingsOverlap } from 'Draw/bonds/straight/basePaddingsOverlap';

import { handleDragOnBonds } from 'Draw/interact/handleDragOnBonds';

import { Stem } from 'Partners/stems/Stem';
import { pairsInStem } from 'Partners/stems/Stem';
import { bottomPair } from 'Partners/stems/Stem';
import { topPair } from 'Partners/stems/Stem';
import { downstreamPartner, upstreamPartner } from 'Partners/pairs/Pair';
import { stemsInPartners } from 'Partners/stems/stemsInPartners';

import { stemEnclosesPosition } from 'Partners/stems/stemEnclosesPosition';
import { nearestStemEnclosingPosition } from './nearestStemEnclosingPosition';
import { stemOfBase } from 'Draw/strict/stemOfBase';
import { stemOfStraightBond } from 'Draw/strict/stemOfStraightBond';

import { traverseLoopDownstream } from 'Partners/traverseLoopDownstream';
import { sortNumbers } from '@rnacanvas/math';
import { compareNumbers } from 'Array/sort';

import { DrawingOverlay } from 'Draw/interact/DrawingOverlay';
import { LayoutTrace } from './LayoutTrace';
import { DraggedHighlighting } from './DraggedHighlighting';
import { updatedBaseCoordinates } from './updatedBaseCoordinates';

import { normalizedMagnitudeOfMousemove } from './normalizedMagnitudeOfMousemove';
import { directionOfMousemove } from './directionOfMousemove';

import { mousemoveIsClockwiseToOutermostLoop } from './mousemoveIsClockwiseToOutermostLoop';
import { rotateClockwise } from './rotate';
import { rotateCounterClockwise } from './rotate';

import { upstreamAngleOfStem } from './stemAngles';
import { upwardAngleOfEnclosingStem } from './stemAngles';
import { anglesAreWithin } from './anglesAreWithin';

import { dragStemUpstream } from './dragStemUpstream';
import { dragStemDownstream } from './dragStemDownstream';

import { hasTriangleLoop } from './triangleLoops';
import { dragStemUpward } from './dragStemUpward';
import { dragStemDownward } from './dragStemDownward';

import { OverlaidMessageContainer } from 'Draw/interact/OverlaidMessageContainer';
import styles from './DraggingTool.css';

type DrawingElement = (
  Base
  | BaseNumbering
  | PrimaryBond
  | SecondaryBond
  | TertiaryBond
);

type ElementId = string;

function elementContainsNode(ele: DrawingElement, node: Node): boolean {
  if (ele instanceof Base) {
    return (
      ele.text.node.contains(node)
      || (ele.outline?.contains(node) ?? false)
    );
  } else if (ele instanceof BaseNumbering) {
    return ele.text.node.contains(node) || ele.line.node.contains(node);
  } else if (ele instanceof PrimaryBond) {
    return ele.contains(node);
  } else if (ele instanceof SecondaryBond) {
    return ele.contains(node);
  } else if (ele instanceof TertiaryBond) {
    return ele.contains(node);
  } else {
    return false;
  }
}

// dragging these elements drags the layout along with them
type DraggedWithLayout = (
  Base
  | PrimaryBond
  | SecondaryBond
);

function isDraggedWithLayout(ele: unknown): ele is DraggedWithLayout {
  return (
    ele instanceof Base
    || ele instanceof PrimaryBond
    || ele instanceof SecondaryBond
  );
}

export type Options = {

  // a reference to the whole app
  readonly app: App;

  // the drawing to edit
  readonly strictDrawing: StrictDrawing;

  // for highlighting aspects of the drawing
  readonly drawingUnderlay: DrawingOverlay;

  // for showing overlaid messages in
  readonly overlaidMessageContainer: OverlaidMessageContainer;
}

export class DraggingTool {
  readonly options: Options;

  // controls whether linkers are condensed when dragging
  condenseLinkers: boolean;

  _hovered?: ElementId;
  _activated?: ElementId;

  /**
   * The most recently handled mouse down event.
   */
  _lastMousedown?: MouseEvent;

  // used to indicate if the activated element has been dragged
  // since being activated
  _activatedWasDragged?: boolean;

  // updated during dragging and used to update the layout of the strict drawing
  // when dragging stops
  _draggedStrictLayoutSpecification?: StrictLayoutSpecification;

  layoutTrace?: LayoutTrace;
  draggedHighlighting?: DraggedHighlighting;

  constructor(options: Options) {
    this.options = options;

    this.condenseLinkers = true;
  }

  // the elements that this tool responds to interaction with
  watchedElements(): DrawingElement[] {
    let bases = this.options.strictDrawing.drawing.bases();

    let baseNumberings: BaseNumbering[] = [];
    bases.forEach(b => {
      if (b.numbering) {
        baseNumberings.push(b.numbering);
      }
    });

    return [
      ...bases,
      ...baseNumberings,
      ...this.options.strictDrawing.drawing.primaryBonds,
      ...this.options.strictDrawing.drawing.secondaryBonds,
      ...this.options.strictDrawing.drawing.tertiaryBonds,
    ];
  }

  get hovered(): DrawingElement | undefined {
    if (this._hovered == undefined) {
      return undefined;
    } else {
      return this.watchedElements().find(ele => ele.id == this._hovered);
    }
  }

  // the element currently being clicked on
  // (similar to the CSS active pseudo-class)
  get activated(): DrawingElement | undefined {
    if (this._activated == undefined) {
      return undefined;
    } else {
      return this.watchedElements().find(ele => ele.id == this._activated);
    }
  }

  stemContainingElement(ele: DrawingElement): Stem | undefined {
    if (ele instanceof Base) {
      return stemOfBase(this.options.strictDrawing, ele);
    } else if (ele instanceof PrimaryBond) {
      return stemOfStraightBond(this.options.strictDrawing, ele);
    } else if (ele instanceof SecondaryBond) {
      return stemOfStraightBond(this.options.strictDrawing, ele);
    } else {
      return undefined;
    }
  }

  // returns the stem containing the hovered element
  // or undefined if no stem contains the hovered element
  // or if no element is hovered
  stemContainingHovered(): Stem | undefined {
    let hovered = this.hovered;
    if (!hovered) {
      return undefined;
    } else {
      return this.stemContainingElement(hovered);
    }
  }

  nearestStemEnclosingBase(base: Base): Stem | undefined {
    let seq = this.options.strictDrawing.layoutSequence();
    let p = seq.positionOf(base);

    let partners = this.options.strictDrawing.layoutPartners();
    return nearestStemEnclosingPosition(partners, p);
  }

  nearestStemEnclosingStraightBond(straightBond: PrimaryBond | SecondaryBond): Stem | undefined {
    let seq = this.options.strictDrawing.layoutSequence();
    let p1 = seq.positionOf(straightBond.base1);
    let p2 = seq.positionOf(straightBond.base2);

    let partners = this.options.strictDrawing.layoutPartners();
    let stems = stemsInPartners(partners);
    let enclosing = stems.filter(stem => (
      stemEnclosesPosition(stem, p1) || stemEnclosesPosition(stem, p2)
    ));

    enclosing.sort((a, b) => compareNumbers(
      Math.abs(upstreamPartner(topPair(a)) - p1),
      Math.abs(upstreamPartner(topPair(b)) - p1),
    ));

    return enclosing[0];
  }

  nearestStemEnclosingElement(ele: DrawingElement): Stem | undefined {
    if (ele instanceof Base) {
      return this.nearestStemEnclosingBase(ele);
    } else if (ele instanceof PrimaryBond) {
      return this.nearestStemEnclosingStraightBond(ele);
    } else if (ele instanceof SecondaryBond) {
      return this.nearestStemEnclosingStraightBond(ele);
    } else {
      return undefined;
    }
  }

  // returns the nearest stem enclosing the hovered element
  // or undefined if no stem encloses the hovered element
  // or if no element is hovered
  nearestStemEnclosingHovered(): Stem | undefined {
    let hovered = this.hovered;
    if (!hovered) {
      return undefined;
    } else {
      return this.nearestStemEnclosingElement(hovered);
    }
  }

  draggedStem(): Stem | undefined {
    let activated = this.activated;
    if (!activated) {
      return undefined;
    } else {
      return (
        this.stemContainingElement(activated)
        || this.nearestStemEnclosingElement(activated)
      );
    }
  }

  handleMouseover(event: MouseEvent) {
    let hovered = this.watchedElements().find(ele => (
      event.target instanceof Node
      && elementContainsNode(ele, event.target)
    ));

    if (!hovered) {
      return;
    }

    if (isStraightBond(hovered) && event.target == hovered.line.node) {
      if (basePaddingsOverlap(hovered)) {
        return; // line element should not be interacted with
      }
    }

    this._hovered = hovered.id;
    this.refresh();
  }

  handleMouseout(event: MouseEvent) {
    let dehovered = this.watchedElements().find(ele => (
      event.target instanceof Node
      && elementContainsNode(ele, event.target)
    ));

    if (dehovered && dehovered.id == this._hovered) {
      this._hovered = undefined;
      this.refresh();
    }
  }

  handleMousedown(event: MouseEvent) {
    this._lastMousedown = event;

    let hovered = this.hovered;
    if (!hovered) {
      return;
    }

    this._activated = hovered.id;
    this._activatedWasDragged = false;

    if (isDraggedWithLayout(hovered)) {
      this._draggedStrictLayoutSpecification = layoutSpecification(this.options.strictDrawing);
    }

    this.refresh();
  }

  handleMousemove(event: MouseEvent) {
    let activated = this.activated;

    if (isDraggedWithLayout(activated)) {
      this._handleMousemoveWhenDraggingLayout(event);
    } else if (activated instanceof TertiaryBond) {
      this._handleMousemoveWhenActivatedIsTertiaryBond(event, activated);
    } else if (activated instanceof BaseNumbering) {
      // nothing to do
    }
  }

  _handleMousemoveWhenDraggingLayout(event: MouseEvent) {
    let draggedStem = this.draggedStem();
    let seq = this.options.strictDrawing.layoutSequence();
    if (!draggedStem) {
      this._handleMousemoveWhenRotatingLayout(event);
    } else if (upstreamPartner(bottomPair(draggedStem)) == 1 && downstreamPartner(bottomPair(draggedStem)) == seq.length) {
      // nothing else in the outermost loop but the dragged stem
      this._handleMousemoveWhenRotatingLayout(event);
    } else {
      this._handleMousemoveWhenDraggingStem(event, draggedStem);
    }
  }

  _handleMousemoveWhenRotatingLayout(event: MouseEvent) {
    let spec = this._draggedStrictLayoutSpecification;
    if (!spec) {
      console.error('The dragged strict layout specification is not initialized.');
      return;
    }

    let amount = normalizedMagnitudeOfMousemove(this.options.strictDrawing, event) / 2;
    if (mousemoveIsClockwiseToOutermostLoop(this.options.strictDrawing, event)) {
      rotateClockwise(spec, amount);
    } else {
      rotateCounterClockwise(spec, amount);
    }
    this._activatedWasDragged = true;
    this.refresh();
  }

  _handleMousemoveWhenDraggingStem(event: MouseEvent, draggedStem: Stem) {
    let spec = this._draggedStrictLayoutSpecification;
    if (!spec) {
      console.error('The dragged strict layout specification is not initialized.');
      return;
    }

    let partners = this.options.strictDrawing.layoutPartners();
    let p = upstreamPartner(bottomPair(draggedStem));
    let enclosingStem = nearestStemEnclosingPosition(partners, p);

    if (enclosingStem && hasTriangleLoop(spec, enclosingStem)) {
      this._handleMousemoveWhenDraggingStemInTriangleLoop(event, draggedStem, enclosingStem);
    } else {
      this._handleMousemoveWhenDraggingStemNotInTriangleLoop(event, draggedStem);
    }
    this.refresh();
  }

  _handleMousemoveWhenDraggingStemInTriangleLoop(event: MouseEvent, draggedStem: Stem, enclosingStem: Stem) {
    let spec = this._draggedStrictLayoutSpecification;
    if (!spec) {
      console.error('The dragged strict layout specification is not initialized.');
      return;
    }

    let strictLayout = createStrictLayout(spec);
    if (!strictLayout) {
      console.error('Unable to create the dragged strict layout from specification.');
      return;
    }

    let upwardAngle = upwardAngleOfEnclosingStem(strictLayout, enclosingStem, draggedStem);
    let downwardAngle = upwardAngle + Math.PI;
    let upstreamAngle = upstreamAngleOfStem(strictLayout, draggedStem);
    let downstreamAngle = upstreamAngle + Math.PI;
    let a = directionOfMousemove(event);

    let options = {
      strictLayoutSpecification: spec,
      stem: draggedStem,
      amount: normalizedMagnitudeOfMousemove(this.options.strictDrawing, event) / 2,
      condenseLeadingLinker: this.condenseLinkers,
      condenseTrailingLinker: this.condenseLinkers,
    };

    if (anglesAreWithin(upwardAngle, a, Math.PI / 4)) {
      dragStemUpward(options);
    } else if (anglesAreWithin(downwardAngle, a, Math.PI / 4)) {
      dragStemDownward(options);
    } else if (anglesAreWithin(upstreamAngle, a, Math.PI / 2)) {
      dragStemUpstream(options);
    } else if (anglesAreWithin(downstreamAngle, a, Math.PI / 2)) {
      dragStemDownstream(options);
    }
    this._activatedWasDragged = true;
    this.refresh();
  }

  _handleMousemoveWhenDraggingStemNotInTriangleLoop(event: MouseEvent, draggedStem: Stem) {
    let spec = this._draggedStrictLayoutSpecification;
    if (!spec) {
      console.error('The dragged strict layout specification is not initialized.');
      return;
    }

    let strictLayout = createStrictLayout(spec);
    if (!strictLayout) {
      console.error('Unable to create the dragged strict layout from specification.');
      return;
    }

    let upstreamAngle = upstreamAngleOfStem(strictLayout, draggedStem);
    let downstreamAngle = upstreamAngle + Math.PI;
    let a = directionOfMousemove(event);

    let options = {
      strictLayoutSpecification: spec,
      stem: draggedStem,
      amount: normalizedMagnitudeOfMousemove(this.options.strictDrawing, event) / 2,
      condenseLeadingLinker: this.condenseLinkers,
      condenseTrailingLinker: this.condenseLinkers,
    };

    if (anglesAreWithin(upstreamAngle, a, Math.PI / 2)) {
      dragStemUpstream(options);
    } else if (anglesAreWithin(downstreamAngle, a, Math.PI / 2)) {
      dragStemDownstream(options);
    }
    this._activatedWasDragged = true;
    this.refresh();
  }

  _handleMousemoveWhenActivatedIsTertiaryBond(event: MouseEvent, activated: TertiaryBond) {
    if (!this._activatedWasDragged) {
      this.options.app.pushUndo();
      this._activatedWasDragged = true;
    }
    handleDragOnBonds({
      mouseMove: event,
      activeEventTarget: this._lastMousedown?.target,
      bonds: [activated],
      drawing: this.options.app.drawing,
    });
  }

  handleMouseup(event: MouseEvent) {
    let activated = this.activated;
    this._activated = undefined;

    let layoutWasDragged = this._activatedWasDragged && isDraggedWithLayout(activated);

    let spec = this._draggedStrictLayoutSpecification;
    this._draggedStrictLayoutSpecification = undefined;

    if (layoutWasDragged && spec) {
      this.options.app.pushUndo();
      updateLayout(this.options.strictDrawing, spec);
      this.options.app.refresh();
    }

    if (activated instanceof TertiaryBond && this._activatedWasDragged) {
      this.options.app.refresh();
    }
  }

  handleDblclick(event: MouseEvent) {
    let hovered = this.hovered;
    if (!hovered) {
      return;
    }

    this.reset();
    let strictDrawingInteraction = this.options.app.strictDrawingInteraction;
    strictDrawingInteraction.currentTool = strictDrawingInteraction.editingTool;
    strictDrawingInteraction.editingTool.editingType = hovered.constructor;
    strictDrawingInteraction.editingTool.select(hovered);
  }

  handleKeyup(event: KeyboardEvent) {
    // nothing to do
  }

  reset() {
    this._hovered = undefined;
    this._activated = undefined;
    this._activatedWasDragged = false;
    this._draggedStrictLayoutSpecification = undefined;
    this.refresh();
    this.options.app.refresh();
  }

  refresh() {
    this.options.drawingUnderlay.fitTo(this.options.strictDrawing.drawing);
    this.updateHighlightings();
    this.updateCursor();
    this.options.overlaidMessageContainer.placeOver(this.options.strictDrawing.drawing);
    this.updateOverlaidMessage();
  }

  updateHighlightings() {
    let ele = this.activated ?? this.hovered;

    if (!ele || !isDraggedWithLayout(ele)) {
      this.draggedHighlighting?.remove();
      this.draggedHighlighting = undefined;
      this.layoutTrace?.remove();
      this.layoutTrace = undefined;
      return;
    }

    let stem = this.stemContainingElement(ele) ?? (
      this.nearestStemEnclosingElement(ele)
    );

    let spec = this._draggedStrictLayoutSpecification ?? (
      layoutSpecification(this.options.strictDrawing)
    );
    let baseCoordinates = updatedBaseCoordinates({
      strictDrawing: this.options.strictDrawing,
      strictLayoutSpecification: spec,
      updatePadding: false,
    });
    if (!baseCoordinates) {
      console.error('Unable to obtain updated base coordinates.');
      return;
    }
    let baseWidth = this.options.strictDrawing.baseWidth;
    let baseHeight = this.options.strictDrawing.baseHeight;
    let layout = { baseCoordinates, baseWidth, baseHeight };

    if (!this.layoutTrace) {
      this.layoutTrace = new LayoutTrace(layout);
      this.layoutTrace.appendTo(this.options.drawingUnderlay.svg);
    } else {
      this.layoutTrace.retrace(layout);
    }

    if (!this.draggedHighlighting) {
      let partners = this.options.strictDrawing.layoutPartners();
      let traversed = traverseLoopDownstream(partners, stem);
      let ps = traversed.positions;
      if (stem) {
        ps.push(...pairsInStem(stem).flat());
      }
      ps = Array.from(new Set(ps));
      sortNumbers(ps);
      this.draggedHighlighting = new DraggedHighlighting(ps, layout);
      this.draggedHighlighting.appendTo(this.options.drawingUnderlay.svg);
    } else {
      this.draggedHighlighting.refit(layout);
    }
  }

  updateCursor() {
    let cursor = 'auto';
    if (this._hovered != undefined) {
      cursor = 'pointer';
    } else if (this._activated != undefined) {
      cursor = 'pointer';
    }
    this.options.strictDrawing.drawing.svg.css('cursor', cursor);
  }

  updateOverlaidMessage() {
    let ele = this.activated ?? this.hovered;

    this.options.overlaidMessageContainer.clear();
    let p = document.createElement('p');
    if (ele instanceof TertiaryBond) {
      p.textContent = 'Drag to move. Double-click to edit.';
    } else if (ele instanceof BaseNumbering) {
      p.textContent = 'Double-click to edit.';
    } else if (isDraggedWithLayout(ele)) {
      p.textContent = 'Drag to move.';
    } else {
      // no text content
    }
    p.className = styles.overlaidMessageActions;
    this.options.overlaidMessageContainer.append(p);
  }
}
