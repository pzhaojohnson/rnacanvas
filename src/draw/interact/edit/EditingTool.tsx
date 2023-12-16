import type { App } from 'App';
import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import { DrawingElementInterface as DrawingElement } from './DrawingElementInterface';

import { Base } from 'Draw/bases/Base';
import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';
import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';
import { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';
import { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import { isBond } from 'Draw/bonds/Bond';
import { isStraightBond } from 'Draw/bonds/straight/StraightBond';

import { basePaddingsOverlap } from 'Draw/bonds/straight/basePaddingsOverlap';

import { handleDragOnBonds } from 'Draw/interact/handleDragOnBonds';

import { zoom } from 'Draw/zoom';

import { DrawingOverlay } from 'Draw/interact/DrawingOverlay';
import { SelectingRect } from './SelectingRect';
import { ElementHighlighting } from './ElementHighlighting';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './EditingTool.css';

import { OverlaidMessageContainer } from 'Draw/interact/OverlaidMessageContainer';
import { BasePositionDescription } from './BasePositionDescription';
import { SelectedElementsDescription } from './SelectedElementsDescription';
import { detectMacOS } from 'Utilities/detectMacOS';

import { removeElements } from './removeElements';
import { userIsTyping } from 'Utilities/userIsTyping';

import { EditingForm } from './EditingForm';
import { v4 as uuidv4 } from 'uuid';

import * as SVG from '@svgdotjs/svg.js';

export type Options = {

  // a reference to the whole app
  readonly app: App;

  // the drawing to edit
  readonly strictDrawing: StrictDrawing;

  // for drawing element highlightings and the selecting rect on
  readonly drawingOverlay: DrawingOverlay;

  // for showing overlaid messages in
  readonly overlaidMessageContainer: OverlaidMessageContainer;

  // for specifying alternatives to components of the SVG.js library
  // (useful for meeting the compatibility requirements of Node.js)
  SVG?: {
    SVG?: () => SVG.Svg;
  }
}

type ElementId = string;

let formKeys = new Map<Function, string>();
formKeys.set(Base, uuidv4());
formKeys.set(BaseNumbering, uuidv4());
formKeys.set(PrimaryBond, uuidv4());
formKeys.set(SecondaryBond, uuidv4());
formKeys.set(TertiaryBond, uuidv4());

export class EditingTool {
  readonly options: Options;

  _editingType: Function;

  // track by element ID so that these are maintained on undo and redo
  _hovered?: ElementId;
  _activated?: ElementId;
  _selected: Set<ElementId>;

  /**
   * The most recently handled mouse down event.
   */
  _lastMousedown?: MouseEvent;

  // used to indicate if the selected elements have been dragged at all
  // since an element was activated
  _dragged?: boolean;

  selectingRect?: SelectingRect;

  // track by element object so that these are refreshed on undo and redo
  _elementHighlightings: Map<DrawingElement, ElementHighlighting>;

  constructor(options: Options) {
    this.options = options;

    this._editingType = Base; // edit bases by default

    this._selected = new Set<ElementId>();

    this._elementHighlightings = new Map<DrawingElement, ElementHighlighting>();
  }

  // constructor function for the type of element currently being edited
  get editingType(): Function {
    return this._editingType;
  }

  set editingType(t: Function) {
    if (t != this._editingType) {
      this._selected.clear();
      this._editingType = t;
      this.refresh();
      this.options.app.refresh();
    }
  }

  get drawing() {
    return this.options.strictDrawing.drawing;
  }

  // returns all drawing elements that may be edited with this tool
  drawingElements(): DrawingElement[] {
    let bases = this.drawing.bases();

    let baseNumberings: BaseNumbering[] = [];
    bases.forEach(b => {
      if (b.numbering) {
        baseNumberings.push(b.numbering);
      }
    });

    return [
      ...bases,
      ...baseNumberings,
      ...this.drawing.primaryBonds,
      ...this.drawing.secondaryBonds,
      ...this.drawing.tertiaryBonds,
    ];
  }

  // returns the drawing element containing the given node
  // and undefined if no such drawing element can be found
  containingDrawingElement(node: Node): DrawingElement | undefined {
    return this.drawingElements().find(ele => {
      if (ele instanceof Base) {
        return ele.text.node.contains(node) || ele.outline?.contains(node);
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
    });
  }

  // the currently hovered element
  get hovered(): DrawingElement | undefined {
    if (this._hovered == undefined) {
      return undefined;
    } else {
      return this.drawingElements().find(ele => ele.id == this._hovered);
    }
  }

  // the element that is being clicked on
  // (similar to the CSS active pseudo-class)
  get activated(): DrawingElement | undefined {
    if (this._activated == undefined) {
      return undefined;
    } else {
      return this.drawingElements().find(ele => ele.id == this._activated);
    }
  }

  // the currently selected elements
  selected(): DrawingElement[] {
    return this.drawingElements().filter(ele => this._selected.has(ele.id));
  }

  isSelected(ele: DrawingElement): boolean {
    return this._selected.has(ele.id);
  }

  select(eles: DrawingElement[] | DrawingElement) {
    if (Array.isArray(eles) && eles.length == 0) {
      return; // nothing to do
    }

    this._selected.clear();
    if (Array.isArray(eles)) {
      eles.forEach(ele => this._selected.add(ele.id));
    } else {
      this._selected.add(eles.id);
    }
    this.refresh();
    this.options.app.refresh();
  }

  addToSelected(eles: DrawingElement[] | DrawingElement) {
    if (Array.isArray(eles) && eles.length == 0) {
      return; // nothing to do
    }

    if (Array.isArray(eles)) {
      eles.forEach(ele => this._selected.add(ele.id));
    } else {
      this._selected.add(eles.id);
    }
    this.refresh();
    this.options.app.refresh();
  }

  deselect(ele?: DrawingElement) {
    if (ele) {
      this._selected.delete(ele.id);
      if (ele.id == this._hovered) {
        this._hovered = undefined;
      }
    } else {
      this._selected.clear();
    }
    this.refresh();
    this.options.app.refresh();
  }

  /**
   * Primary bonds cannot be removed using the editing tool,
   * since there should always be exactly one primary bond
   * between two consecutive bases in a sequence.
   */
  canRemoveSelected(): boolean {
    return (
      this._selected.size > 0
      && (
        this.editingType == Base
        || this.editingType == BaseNumbering
        || this.editingType == SecondaryBond
        || this.editingType == TertiaryBond
      )
    );
  }

  removeSelected() {
    if (this._selected.size == 0) {
      return;
    }

    this.options.app.pushUndo();
    removeElements(this.options.strictDrawing, this.selected());

    // update state of interaction
    if (this._hovered != undefined && this._selected.has(this._hovered)) {
      this._hovered = undefined;
    }
    if (this._activated != undefined && this._selected.has(this._activated)) {
      this._activated = undefined;
    }
    this._selected.clear();

    this.refresh();
    this.options.app.refresh();
  }

  handleMouseover(event: MouseEvent) {
    if (!(event.target instanceof Node)) {
      return;
    }

    let hovered = this.containingDrawingElement(event.target);

    if (isStraightBond(hovered) && event.target == hovered.line.node) {
      if (basePaddingsOverlap(hovered)) {
        return; // line element should not be interacted with
      }
    }

    if (hovered) {
      this._hovered = hovered.id;
    }

    if (hovered) {
      this.refresh();
    }
  }

  handleMouseout(event: MouseEvent) {
    if (!(event.target instanceof Node)) {
      return;
    }

    let dehovered = this.containingDrawingElement(event.target);
    if (dehovered && dehovered.id == this._hovered) {
      this._hovered = undefined;
      this.refresh();
    }
  }

  handleMousedown(event: MouseEvent) {
    this._lastMousedown = event;

    if (!(event.target instanceof Node)) {
      return;
    } else if (!this.drawing.svg.node.contains(event.target)) {
      return; // ignore clicks outside of the drawing
    }

    let hovered = this.hovered;
    if (hovered) {
      this._handleMousedownWhenHovering(event);
    } else {
      this._handleMousedownWhenNotHovering(event);
    }
  }

  _handleMousedownWhenHovering(event: MouseEvent) {
    let hovered = this.hovered;
    if (!hovered) {
      console.error('No element is hovered.');
      return;
    }

    this._activated = hovered.id;
    this._dragged = false;

    if (!(hovered instanceof this.editingType)) {
      this.editingType = hovered.constructor;
      this.select(hovered);
    } else {
      if (event.shiftKey && this.isSelected(hovered)) {
        this.deselect(hovered);
      } else if (event.shiftKey && !this.isSelected(hovered)) {
        this.addToSelected(hovered);
      } else if (!event.shiftKey && !this.isSelected(hovered)) {
        this.select(hovered);
      } else {
        // nothing to do
      }
    }
  }

  _handleMousedownWhenNotHovering(event: MouseEvent) {
    if (this._hovered != undefined) {
      console.error('An element is hovered.');
      return;
    }

    if (!event.shiftKey) {
      this.deselect();
    }

    // in case there is a leftover selecting rect somehow
    if (this.selectingRect) {
      this.selectingRect.remove();
      this.selectingRect = undefined;
    }

    // create a new selecting rect
    let start = this.drawing.svg.point(event.pageX, event.pageY);
    this.selectingRect = new SelectingRect(start);
    this.selectingRect.appendTo(this.options.drawingOverlay.svg);
  }

  handleMousemove(event: MouseEvent) {
    if (this.selectingRect) {
      this._handleMousemoveWhenDraggingSelectingRect(event);
    }

    let activated = this.activated;
    if (activated) {
      if (isBond(activated)) {
        this._handleMousemoveWhenDraggingBonds(event);
      } else {
        this._dragged = true;
      }
    }
  }

  _handleMousemoveWhenDraggingSelectingRect(event: MouseEvent) {
    if (!this.selectingRect) {
      console.error('No selecting rect is present.');
      return;
    }

    let end = this.drawing.svg.point(event.pageX, event.pageY);
    this.selectingRect.dragTo({ x: end.x, y: end.y });
    this.refresh();
  }

  _handleMousemoveWhenDraggingBonds(event: MouseEvent) {
    let activated = this.activated;
    if (!isBond(activated)) {
      console.error('No bonds are currently being dragged.');
      return;
    }

    let straightBond = isStraightBond(activated) ? activated : undefined;
    if (straightBond?.line.node == this._lastMousedown?.target) {
      return; // straight bond lines cannot be dragged with this tool
    }

    if (!this._dragged) {
      this.options.app.pushUndo();
      this._dragged = true;
    }

    // the bonds being dragged
    let bonds = new Set(this.selected().filter(isBond));
    bonds.add(activated); // ensure is included

    handleDragOnBonds({
      mouseMove: event,
      activeEventTarget: this._lastMousedown?.target,
      bonds: Array.from(bonds),
      drawing: this.options.app.drawing,
    });

    this.refresh();
  }

  handleMouseup(event: MouseEvent) {
    if (this.selectingRect) {
      let encompassed = this.drawingElements().filter(ele => (
        ele instanceof this.editingType
        && this.selectingRect?.encompasses(ele)
      ));
      this.selectingRect.remove();
      this.selectingRect = undefined;
      if (encompassed.length > 0) {
        this.addToSelected(encompassed);
      }
    }

    if (this._activated != undefined) {
      this._activated = undefined;
      this.options.app.refresh();
    }
  }

  handleDblclick(event: MouseEvent) {
    // nothing to do
  }

  handleKeyup(event: KeyboardEvent) {
    if (userIsTyping()) {
      return;
    }

    let key = event.key.toLowerCase();
    if (key == 'delete' || key == 'backspace') {
      if (this._selected.size > 0 && this.canRemoveSelected()) {
        this.removeSelected();
      }
    }
  }

  refresh() {
    this.options.drawingOverlay.fitTo(this.drawing);
    this.updateSelectingRectStrokeWidth();
    this.updateElementHighlightings();
    this.updateCursor();
    this.options.overlaidMessageContainer.placeOver(this.drawing);
    this.updateOverlaidMessage();
  }

  updateSelectingRectStrokeWidth() {
    if (this.selectingRect) {
      let z = zoom(this.drawing) ?? 1;
      this.selectingRect.rect.attr('stroke-width', 0.5 / z);
    }
  }

  shouldBeHighlighted(ele: DrawingElement): boolean {
    if (this.isSelected(ele)) {
      return true;
    }

    if (this.selectingRect) {
      if (ele instanceof this.editingType && this.selectingRect.encompasses(ele)) {
        return true;
      }
    }

    if (ele.id == this._hovered) {
      return (
        ele instanceof this.editingType
        && !this.selectingRect
        && !this._activated
      );
    }

    return false;
  }

  updateElementHighlightings() {

    // the elements to highlight
    let eles = new Set<DrawingElement>(
      this.drawingElements().filter(ele => this.shouldBeHighlighted(ele))
    );

    let elementHighlightings = new Map<DrawingElement, ElementHighlighting>();

    this._elementHighlightings.forEach(h => {
      if (eles.has(h.element)) {
        elementHighlightings.set(h.element, h);
        h.refit();
      } else {
        h.remove();
      }
    });

    eles.forEach(ele => {
      if (!elementHighlightings.has(ele)) {
        let h = new ElementHighlighting(ele);
        h.appendTo(this.options.drawingOverlay.svg);
        elementHighlightings.set(ele, h);
      }
    });

    this._elementHighlightings = elementHighlightings;
  }

  updateCursor() {
    let notDragging = !this.selectingRect && this._activated == undefined;
    let shouldBePointer = this._hovered != undefined && notDragging;
    this.drawing.svg.css({
      'cursor': shouldBePointer ? 'pointer' : 'auto',
    });
  }

  updateOverlaidMessage() {
    if (this._hovered == undefined) {
      this._updateOverlaidMessageWithSelected();
    } else if (this.selectingRect) {
      this._updateOverlaidMessageWithSelected();
    } else if (this._activated != undefined && this._dragged) {
      this._updateOverlaidMessageWithSelected();
    } else {
      this._updateOverlaidMessageWithHovered();
    }
  }

  // describe the hovered element and actions regarding it
  _updateOverlaidMessageWithHovered() {
    this.options.overlaidMessageContainer.clear();
    this.options.overlaidMessageContainer.style.display = 'flex';
    this.options.overlaidMessageContainer.style.flexDirection = 'row';

    let hovered = this.hovered;
    if (!hovered) {
      console.error(`No element is hovered.`);
      return;
    }

    if (hovered instanceof Base) {
      let div = document.createElement('div');
      ReactDOM.render(
        <BasePositionDescription
          drawing={this.drawing}
          base={hovered}
          style={{ margin: '0px 4px 0px 0px' }}
        />,
        div,
      );
      this.options.overlaidMessageContainer.append(div);
    }

    if (this._activated == undefined) {
      let p = document.createElement('p');
      if (this.isSelected(hovered)) {
        p.textContent += `${detectMacOS() ? '⇧ ' : 'Shift+'}Click to remove from selected.`;
      } else {
        p.textContent = 'Click to select. ';
        p.textContent += `${detectMacOS() ? '⇧ ' : 'Shift+'}Click to add to selected.`;
      }
      p.className = styles.overlaidMessageActions;
      this.options.overlaidMessageContainer.append(p);
    }
  }

  // describe the selected elements and actions regarding them
  _updateOverlaidMessageWithSelected() {
    this.options.overlaidMessageContainer.clear();
    this.options.overlaidMessageContainer.style.display = 'flex';
    this.options.overlaidMessageContainer.style.flexDirection = 'row';

    if (this._selected.size == 0) {
      return;
    }

    let div = document.createElement('div');
    ReactDOM.render(
      <SelectedElementsDescription
        editingType={this.editingType}
        selectedElements={this.selected()}
      />,
      div,
    );
    this.options.overlaidMessageContainer.append(div);

    let actions = document.createElement('p');
    actions.className = styles.overlaidMessageActions;
    actions.style.marginLeft = '4px';
    if (this.editingType == TertiaryBond) {
      actions.textContent += 'Drag to move. ';
    }
    if (this.canRemoveSelected()) {
      actions.textContent += 'Press Delete to remove.';
    }
    this.options.overlaidMessageContainer.append(actions);
  }

  reset() {
    this._hovered = undefined;
    this._activated = undefined;
    this._selected.clear();

    if (this.selectingRect) {
      this.selectingRect.remove();
      this.selectingRect = undefined;
    }

    this._dragged = false;

    this.refresh();
    this.options.app.refresh();
  }

  renderForm() {
    let editingType = this.editingType; // cache
    let key = formKeys.get(editingType);
    this.options.app.formContainer.renderForm(props => (
      <EditingForm
        {...props}
        app={this.options.app}
        editingType={editingType} // the cached editing type
        elements={this.selected()} // retrieves the currently selected elements
      />
    ), { key });
  }
}
