import type { App } from 'App';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import type { Drawing } from 'Draw/Drawing';

import { Base } from 'Draw/bases/Base';
import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';
import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';
import { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';
import { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import { isBond } from 'Draw/bonds/Bond';
import { isStraightBond } from 'Draw/bonds/straight/StraightBond';

import { basePaddingsOverlap } from 'Draw/bonds/straight/basePaddingsOverlap';

import { handleDragOnBonds } from 'Draw/interact/handleDragOnBonds';

import { Side } from './Side';
import { sidesAreEqual } from './Side';
import { sidesOverlap } from './Side';
import { SideSpecification } from './Side';
import { specifySide } from './Side';
import { specifiedSide } from './Side';

import { sidesAreComplementary } from './sidesAreComplementary';
import { Options as ComplementsOptions } from './sidesAreComplementary';

import { spannedBases } from 'Draw/strict/spannedBases';

import { compareNumbers } from 'Array/sort';

import { bondBindsSide } from './bondBindsSide';
import { secondaryBondsBindingSide } from './bondsBindingSide';
import { tertiaryBondsBindingSide } from './bondsBindingSide';

import { canBind } from './bind';
import { canBindWithSecondaryBonds } from './bind';
import { bindWithSecondaryBonds } from './bind';
import { bindWithTertiaryBonds } from './bind';

import { stackedSecondaryBonds } from './stackedBonds';
import { stackedTertiaryBonds } from './stackedBonds';

import { removeSecondaryBonds } from 'Draw/strict/removeSecondaryBonds';
import { removeTertiaryBonds } from 'Draw/strict/removeTertiaryBonds';

import type { DrawingOverlay } from 'Draw/interact/DrawingOverlay';

import { SideHighlighting } from './SideHighlighting';
import { SideHighlightingType } from './SideHighlighting';
import { mean } from '@rnacanvas/math';

import { SecondaryBondShroud } from './SecondaryBondShroud';
import { TertiaryBondShroud } from './TertiaryBondShroud';

import type { OverlaidMessageContainer } from 'Draw/interact/OverlaidMessageContainer';
import styles from './BindingTool.css';
import { detectMacOS } from 'Utilities/detectMacOS';

import { isNullish } from 'Values/isNullish';

export type Options = {

  // a reference to the whole app
  readonly app: App;

  // the strict drawing to edit
  readonly strictDrawing: StrictDrawing;

  // the drawing overlay and underlay to draw highlightings on
  readonly drawingOverlay: DrawingOverlay;
  readonly drawingUnderlay: DrawingOverlay;

  // for showing overlaid messages in
  readonly overlaidMessageContainer: OverlaidMessageContainer;
};

type DrawingElement = (
  Base
  | BaseNumbering
  | PrimaryBond
  | SecondaryBond
  | TertiaryBond
);

type Bond = (
  PrimaryBond
  | SecondaryBond
  | TertiaryBond
);

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

// returns all base numberings in the drawing
function baseNumberings(drawing: Drawing): BaseNumbering[] {
  let bns: BaseNumbering[] = [];
  drawing.bases().forEach(b => {
    if (b.numbering) {
      bns.push(b.numbering);
    }
  });
  return bns;
}

// can be used to prevent unnecessary recomputation
// (such as when refreshing the tool)
type PreretrievedState = {
  selectedSide?: Side;
  hoveredSide?: Side;
  complementarySides?: Side[];
};

export class BindingTool {
  readonly options: Options;

  // store element objects to forget after undo and redo
  _hoveredElement?: DrawingElement;
  _activatedElement?: DrawingElement;

  // store specification to remember after undo and redo
  _selectedSide?: SideSpecification;

  /**
   * The most recently handled mouse down event.
   */
  _lastMousedown?: MouseEvent;

  // used to indicate if the activated element has been dragged at all
  // since becoming activated
  _activatedElementWasDragged?: boolean;

  // whether to highlight complements to the selected side
  showComplements?: boolean;

  // options to control what motifs and sides are considered complementary
  complementsOptions: ComplementsOptions;

  constructor(options: Options) {
    this.options = options;

    this.showComplements = true;

    this.complementsOptions = {
      allowedGUT: 1,
      IUPAC: false,
      allowedMismatch: 0,
    };
  }

  // the elements that this tool responds to interaction with
  watchedElements(): DrawingElement[] {
    return [
      ...this.options.strictDrawing.drawing.bases(),
      ...baseNumberings(this.options.strictDrawing.drawing),
      ...this.options.strictDrawing.drawing.primaryBonds,
      ...this.options.strictDrawing.drawing.secondaryBonds,
      ...this.options.strictDrawing.drawing.tertiaryBonds,
    ];
  }

  get hoveredElement(): DrawingElement | undefined {
    if (this._hoveredElement == undefined) {
      return undefined;
    }
    let hoveredElement = this.watchedElements().find(ele => ele == this._hoveredElement);
    if (!hoveredElement) {
      // the previously hovered element is no longer present
      this._hoveredElement = undefined;
    }
    return hoveredElement;
  }

  // the element currently being clicked on
  // (similar to the CSS active pseudo-class)
  get activatedElement(): DrawingElement | undefined {
    if (this._activatedElement == undefined) {
      return undefined;
    }
    let activatedElement = this.watchedElements().find(ele => ele == this._activatedElement);
    if (!activatedElement) {
      // the previously activated element is no longer present
      this._activatedElement = undefined;
    }
    return activatedElement;
  }

  get activated(): DrawingElement | undefined {
    return this.activatedElement;
  }

  specifiedSide(spec: SideSpecification): Side | undefined {
    let sequence = this.options.strictDrawing.layoutSequence();
    return specifiedSide(sequence, spec);
  }

  selectedSide(): Side | undefined {
    if (this._selectedSide == undefined) {
      return undefined;
    }
    return this.specifiedSide(this._selectedSide);
  }

  isSelectedSide(side: Side): boolean {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return false;
    }
    return sidesAreEqual(selectedSide, side);
  }

  select(side: Side) {
    if (this.isSelectedSide(side)) {
      return;
    } else if (side.length == 0) {
      return;
    }

    this._selectedSide = specifySide(side);
    this.options.app.refresh();
  }

  deselect() {
    this._selectedSide = undefined;
    this.options.app.refresh();
  }

  bindsSelectedSide(bond: Bond): boolean {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return false;
    }
    return bondBindsSide(bond, selectedSide);
  }

  // returns true if the element is a base in the side
  // or if the element is a primary bond for which both bases
  // are in the side
  sideSpansElement(side: Side, ele: DrawingElement): boolean {
    if (ele instanceof Base) {
      return side.includes(ele);
    } else if (ele instanceof PrimaryBond) {
      return side.includes(ele.base1) && side.includes(ele.base2);
    } else {
      return false;
    }
  }

  // returns the side spanned by two bases
  spannedSide(base1: Base, base2: Base): Side {
    return spannedBases(this.options.strictDrawing, base1, base2);
  }

  // returns all sides that can be bound to the selected side
  bindableSides(): Side[] {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return [];
    }

    let bindableSides: Side[] = [];

    // first push all sides that are the same length as the selected side
    let sequence = this.options.strictDrawing.layoutSequence();
    for (let p1 = 1; p1 + selectedSide.length - 1 <= sequence.length; p1++) {
      bindableSides.push(sequence.bases.slice(p1 - 1, p1 + selectedSide.length - 1));
    }

    bindableSides = bindableSides.filter(
      side => selectedSide && !sidesOverlap(selectedSide, side)
    );

    return bindableSides;
  }

  // returns all sides that are complementary to the selected side
  complementarySides(): Side[] {
    let selectedSide = this.selectedSide();
    return this.bindableSides().filter(side => (
      selectedSide
      && sidesAreComplementary(selectedSide, side, this.complementsOptions)
    ));
  }

  hoveredSide(): Side | undefined {
    let hoveredElement = this.hoveredElement;
    if (hoveredElement == undefined) {
      return undefined;
    }

    let selectedSide = this.selectedSide();
    if (selectedSide && this.sideSpansElement(selectedSide, hoveredElement)) {
      return selectedSide;
    }

    let bindableSides = this.bindableSides().filter(
      side => hoveredElement && this.sideSpansElement(side, hoveredElement)
    );

    if (this.showComplements) {
      let complementarySide = bindableSides.find(side => (
        selectedSide
        && sidesAreComplementary(selectedSide, side, this.complementsOptions)
      ));
      if (complementarySide) {
        return complementarySide;
      }
    }

    let hoveredBase: Base;
    if (!(hoveredElement instanceof Base)) {
      return undefined;
    } else {
      hoveredBase = hoveredElement;
    }

    if (!selectedSide) {
      return [hoveredBase];
    }

    bindableSides = bindableSides.filter(side => side.includes(hoveredBase));

    // sort by how centered the sides are over the hovered base
    bindableSides.sort((a, b) => compareNumbers(
      Math.abs(Math.ceil(a.length / 2) - (a.indexOf(hoveredBase) + 1)),
      Math.abs(Math.ceil(b.length / 2) - (b.indexOf(hoveredBase) + 1)),
    ));

    if (bindableSides.length == 0) {
      return [hoveredBase];
    } else {
      return bindableSides[0];
    }
  }

  // returns true if the side can be bound to the selected side
  canBind(side: Side): boolean {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return false;
    }
    return canBind(selectedSide, side);
  }

  // returns true if the side can be bound to the selected side
  // with secondary bonds
  canBindWithSecondaryBonds(side: Side): boolean {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return false;
    }
    return canBindWithSecondaryBonds(this.options.strictDrawing, selectedSide, side);
  }

  // binds the side to the selected side with tertiary bonds
  bindWithTertiaryBonds(side: Side) {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return;
    }

    // prevents updates to the layout from registering as dragging
    this._activatedElement = undefined;

    this.options.app.pushUndo();
    bindWithTertiaryBonds(this.options.strictDrawing, selectedSide, side);
    this.deselect();
  }

  // binds the side to the selected side (with secondary bonds
  // if possible)
  bind(side: Side) {
    if (!this.canBindWithSecondaryBonds(side)) {
      this.bindWithTertiaryBonds(side);
      return;
    }

    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return;
    }

    // prevents updates to the layout from registering as dragging
    this._activatedElement = undefined;

    this.options.app.pushUndo();
    bindWithSecondaryBonds(this.options.strictDrawing, selectedSide, side);
    this.deselect();
  }

  bondBindsSelectedSide(bond: Bond): boolean {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return false;
    }
    return bondBindsSide(bond, selectedSide);
  }

  secondaryBondsBindingSelectedSide(): SecondaryBond[] {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return [];
    }
    return secondaryBondsBindingSide(this.options.strictDrawing, selectedSide);
  }

  tertiaryBondsBindingSelectedSide(): TertiaryBond[] {
    let selectedSide = this.selectedSide();
    if (!selectedSide) {
      return [];
    }
    return tertiaryBondsBindingSide(this.options.strictDrawing, selectedSide);
  }

  // returns all secondary bonds that are stacked with the given secondary bond
  stackedSecondaryBonds(secondaryBond: SecondaryBond): Set<SecondaryBond> {
    return stackedSecondaryBonds(this.options.strictDrawing, secondaryBond);
  }

  // returns all tertiary bonds that are stacked with the given tertiary bond
  stackedTertiaryBonds(tertiaryBond: TertiaryBond): Set<TertiaryBond> {
    return stackedTertiaryBonds(this.options.strictDrawing, tertiaryBond);
  }

  // returns the secondary bonds to be removed at any given moment
  // should an action be performed to remove secondary bonds
  secondaryBondsToRemove(): SecondaryBond[] {
    let binding = this.secondaryBondsBindingSelectedSide();

    let hoveredSide = this.hoveredSide();
    if (hoveredSide && this.isSelectedSide(hoveredSide)) {
      return binding;
    }

    let hoveredElement = this.hoveredElement;
    if (hoveredElement instanceof SecondaryBond && binding.includes(hoveredElement)) {
      let toRemove: SecondaryBond[] = [hoveredElement];
      let stacked = this.stackedSecondaryBonds(hoveredElement);
      toRemove.push(...binding.filter(secondaryBond => stacked.has(secondaryBond)));
      return toRemove;
    }

    return [];
  }

  // returns the tertiary bonds to be removed at any given moment
  // should an action be performed to remove tertiary bonds
  tertiaryBondsToRemove(): TertiaryBond[] {
    let binding = this.tertiaryBondsBindingSelectedSide();

    let hoveredSide = this.hoveredSide();
    if (hoveredSide && this.isSelectedSide(hoveredSide)) {
      return binding;
    }

    let hoveredElement = this.hoveredElement;
    if (hoveredElement instanceof TertiaryBond && binding.includes(hoveredElement)) {
      let toRemove: TertiaryBond[] = [hoveredElement];
      let stacked = this.stackedTertiaryBonds(hoveredElement);
      toRemove.push(...binding.filter(tertiaryBond => stacked.has(tertiaryBond)));
      return toRemove;
    }

    return [];
  }

  // returns true if the selected side is bound by secondary or tertiary bonds
  // that can be removed
  canUnbind(): boolean {
    return [
      ...this.secondaryBondsBindingSelectedSide(),
      ...this.tertiaryBondsBindingSelectedSide(),
    ].length > 0;
  }

  // removes secondary and tertiary bonds binding the selected side
  unbind() {
    let secondaryBonds = this.secondaryBondsBindingSelectedSide();
    let tertiaryBonds = this.tertiaryBondsBindingSelectedSide();
    if (secondaryBonds.length == 0 && tertiaryBonds.length == 0) {
      return;
    }

    // prevents updates to the layout from registering as dragging
    this._activatedElement = undefined;

    this.options.app.pushUndo();
    removeSecondaryBonds(this.options.strictDrawing, secondaryBonds);
    removeTertiaryBonds(this.options.strictDrawing, tertiaryBonds);
    this.deselect();
  }

  reset() {
    this._hoveredElement = undefined;
    this._activatedElement = undefined;
    this._activatedElementWasDragged = false;
    this._selectedSide = undefined;
    this.options.app.refresh();
  }

  handleMouseover(event: MouseEvent) {
    let hoveredElement = this.watchedElements().find(ele => (
      event.target instanceof Node
      && elementContainsNode(ele, event.target)
    ));

    if (!hoveredElement) {
      return;
    }

    if (isStraightBond(hoveredElement)) {
      let line = hoveredElement.line;
      if (event.target == line.node && basePaddingsOverlap(hoveredElement)) {
        return; // line element should not be interacted with
      }
    }

    this._hoveredElement = hoveredElement;

    let activatedElement = this.activatedElement;
    if (activatedElement instanceof Base && hoveredElement instanceof Base) {
      let spannedSide = this.spannedSide(hoveredElement, activatedElement);
      this._selectedSide = specifySide(spannedSide);
    }

    this.refresh();
  }

  handleMouseout(event: MouseEvent) {
    this._hoveredElement = undefined;
    this.refresh();
  }

  handleMousedown(event: MouseEvent) {
    this._lastMousedown = event;

    let drawing = this.options.strictDrawing.drawing;
    if (!(event.target instanceof Node) || !drawing.svg.node.contains(event.target)) {
      return; // ignore clicks outside of the drawing
    }

    let hoveredElement = this.hoveredElement;
    let hoveredSide = this.hoveredSide();

    this._activatedElement = hoveredElement;
    this._activatedElementWasDragged = false;

    if (!hoveredElement) {
      this.deselect();
    } else if (hoveredElement instanceof SecondaryBond) {
      this._handleMousedownOnSecondaryBond(event, hoveredElement);
    } else if (hoveredElement instanceof TertiaryBond) {
      this._handleMousedownOnTertiaryBond(event, hoveredElement);
    } else if (hoveredSide) {
      this._handleMousedownOnSide(event, hoveredSide);
    }
  }

  _handleMousedownOnSecondaryBond(event: MouseEvent, secondaryBond: SecondaryBond) {
    if (!this.bondBindsSelectedSide(secondaryBond)) {
      return;
    }

    this.options.app.pushUndo();
    removeSecondaryBonds(this.options.strictDrawing, this.secondaryBondsToRemove());
    this.options.app.refresh();
  }

  _handleMousedownOnTertiaryBond(event: MouseEvent, tertiaryBond: TertiaryBond) {
    if (!this.bondBindsSelectedSide(tertiaryBond)) {
      return;
    }

    this.options.app.pushUndo();
    removeTertiaryBonds(this.options.strictDrawing, this.tertiaryBondsToRemove());
    this.options.app.refresh();
  }

  _handleMousedownOnSide(event: MouseEvent, side: Side) {
    if (this.isSelectedSide(side) && this.canUnbind()) {
      this.unbind();
    } else if (this.canBind(side) && event.shiftKey) {
      this.bindWithTertiaryBonds(side);
    } else if (this.canBind(side)) {
      this.bind(side);
    } else {
      this.select(side);
    }
  }

  handleMousemove(event: MouseEvent) {
    let activatedElement = this.activatedElement;

    if (!isBond(activatedElement)) {
      return; // cannot drag elements that are not bonds
    }

    if (isStraightBond(activatedElement)) {
      if (activatedElement.line.node == this._lastMousedown?.target) {
        return; // cannot drag straight bond line elements
      }
    }

    if (!this._activatedElementWasDragged) {
      this.options.app.pushUndo();
      this._activatedElementWasDragged = true;
    }
    handleDragOnBonds({
      mouseMove: event,
      activeEventTarget: this._lastMousedown?.target,
      bonds: [activatedElement],
      drawing: this.options.app.drawing,
    });
  }

  handleMouseup(event: MouseEvent) {
    if (!isNullish(this._activatedElement)) {
      this._activatedElement = undefined;
      this.options.app.refresh();
    }
  }

  handleDblclick(event: MouseEvent) {
    let hoveredElement = this.hoveredElement;
    if (!hoveredElement) {
      return;
    } else if (hoveredElement instanceof Base) {
      return;
    } else if (hoveredElement instanceof SecondaryBond && this.secondaryBondsToRemove().includes(hoveredElement)) {
      return;
    } else if (hoveredElement instanceof TertiaryBond && this.tertiaryBondsToRemove().includes(hoveredElement)) {
      return;
    }

    this.reset();
    let strictDrawingInteraction = this.options.app.strictDrawingInteraction;
    strictDrawingInteraction.currentTool = strictDrawingInteraction.editingTool;
    strictDrawingInteraction.editingTool.editingType = hoveredElement.constructor;
    strictDrawingInteraction.editingTool.select(hoveredElement);
  }

  handleKeyup(event: KeyboardEvent) {
    // nothing to do
  }

  refresh() {
    let preretrievedState = {
      selectedSide: this.selectedSide(),
      hoveredSide: this.hoveredSide(),
      complementarySides: this.showComplements ? this.complementarySides() : undefined,
    };

    this.updateDrawingUnderlay(preretrievedState);
    this.updateDrawingOverlay();
    this.options.overlaidMessageContainer.placeOver(this.options.strictDrawing.drawing);
    this.updateOverlaidMessage(preretrievedState);
    this.updateCursor();
  }

  updateDrawingUnderlay(preretrievedState?: PreretrievedState) {
    this.options.drawingUnderlay.clear();
    this.options.drawingUnderlay.fitTo(this.options.strictDrawing.drawing);

    let baseWidth = this.options.strictDrawing.baseWidth;
    let baseHeight = this.options.strictDrawing.baseHeight;
    let width = 1.48 * mean([baseWidth, baseHeight]); // for side highlightings

    let selectedSide = preretrievedState?.selectedSide ?? this.selectedSide();
    let hoveredSide = preretrievedState?.hoveredSide ?? this.hoveredSide();

    if (this.showComplements && !(this._activatedElement instanceof Base)) {
      let complementarySides = preretrievedState?.complementarySides ?? this.complementarySides();
      complementarySides.forEach(side => {
        if (!hoveredSide || !sidesAreEqual(hoveredSide, side)) {
          let highlighting = new SideHighlighting({ side, type: 'complementary', width });
          highlighting.appendTo(this.options.drawingUnderlay.svg);
        }
      });
    }

    if (selectedSide && (!hoveredSide || !sidesAreEqual(hoveredSide, selectedSide))) {
      let highlighting = new SideHighlighting({ side: selectedSide, type: 'selected', width });
      highlighting.appendTo(this.options.drawingUnderlay.svg);
    }

    if (hoveredSide) {
      let type: SideHighlightingType | undefined = undefined;
      if (this.isSelectedSide(hoveredSide) && this.canUnbind() && !this._activatedElement) {
        type = 'unbindable';
      } else if (this.isSelectedSide(hoveredSide)) {
        type = 'selected';
      } else if (this.canBind(hoveredSide) && !this._activatedElement) {
        type = 'bindable';
      } else if (!this._activatedElement) {
        type = 'selected';
      }
      if (type != undefined) {
        let highlighting = new SideHighlighting({ side: hoveredSide, type, width });
        highlighting.appendTo(this.options.drawingUnderlay.svg);
      }
    }
  }

  updateDrawingOverlay() {
    this.options.drawingOverlay.clear();
    this.options.drawingOverlay.fitTo(this.options.strictDrawing.drawing);

    if (!this._activatedElement) {
      this.secondaryBondsToRemove().forEach(secondaryBond => {
        let shroud = new SecondaryBondShroud(secondaryBond);
        shroud.appendTo(this.options.drawingOverlay.svg);
      });
      this.tertiaryBondsToRemove().forEach(tertiaryBond => {
        let shroud = new TertiaryBondShroud(tertiaryBond);
        shroud.appendTo(this.options.drawingOverlay.svg);
      });
    }
  }

  updateOverlaidMessage(preretrievedState?: PreretrievedState) {
    this.options.overlaidMessageContainer.clear();
    let p = document.createElement('p');
    p.className = styles.overlaidMessageActions;
    p.textContent = this.messageToOverlay(preretrievedState);
    this.options.overlaidMessageContainer.append(p);
  }

  messageToOverlay(preretrievedState?: PreretrievedState): string {
    let hoveredElement = this.hoveredElement;
    let activatedElement = this.activatedElement;
    let hoveredSide = preretrievedState?.hoveredSide ?? this.hoveredSide();
    let selectedSide = preretrievedState?.selectedSide ?? this.selectedSide();

    if (activatedElement instanceof TertiaryBond) {
      return 'Drag to move. Double-click to edit.';
    } else if (activatedElement instanceof Base) {
      return 'Drag to select.';
    } else if (activatedElement) {
      return '';
    }

    if (hoveredElement instanceof TertiaryBond) {
      let toRemove = this.tertiaryBondsToRemove();
      if (toRemove.includes(hoveredElement)) {
        let tertiaryBonds = toRemove.length > 1 ? 'tertiary bonds' : 'tertiary bond';
        return `Click to remove ${tertiaryBonds}.`;
      } else {
        return 'Drag to move. Double-click to edit.';
      }
    }

    if (hoveredElement instanceof SecondaryBond) {
      let toRemove = this.secondaryBondsToRemove();
      if (toRemove.includes(hoveredElement)) {
        let secondaryBonds = toRemove.length > 1 ? 'secondary bonds' : 'secondary bond';
        return `Click to remove ${secondaryBonds}.`;
      } else {
        return 'Double-click to edit.';
      }
    }

    if (hoveredElement instanceof PrimaryBond && !hoveredSide) {
      return 'Double-click to edit.';
    }

    if (hoveredElement instanceof BaseNumbering) {
      return 'Double-click to edit.';
    }

    if (hoveredSide && this.isSelectedSide(hoveredSide) && this.canUnbind()) {
      return 'Click to unbind.';
    }

    if (hoveredSide && !this.isSelectedSide(hoveredSide)) {
      if (this.canBindWithSecondaryBonds(hoveredSide)) {
        let shiftClick = detectMacOS() ? '⇧ Click' : 'Shift+Click';
        return `Click to add secondary bonds. ${shiftClick} to add tertiary bonds.`;
      } else if (this.canBind(hoveredSide)) {
        return 'Click to add tertiary bonds.';
      } else {
        return 'Click to select.';
      }
    }

    if (selectedSide) {
      let characters = '';
      selectedSide.forEach(base => characters += base.text.text());
      if (characters.length > 24) {
        characters = characters.substring(0, 24) + '...';
      }
      let period = characters.length <= 24 ? '.' : '';
      let message = `Selected "${characters}"${period}`;
      if (this.showComplements) {
        let complementarySides = preretrievedState?.complementarySides ?? this.complementarySides();
        let s = complementarySides.length == 1 ? '' : 's';
        message += ` (${complementarySides.length} Complement${s}.)`;
      }
      return message;
    }

    return '';
  }

  updateCursor() {
    let cursor = 'auto';
    if (this._hoveredElement) {
      cursor = 'pointer';
    } else if (this._activatedElement) {
      cursor = 'pointer';
    }
    this.options.strictDrawing.drawing.svg.css('cursor', cursor);
  }
}
