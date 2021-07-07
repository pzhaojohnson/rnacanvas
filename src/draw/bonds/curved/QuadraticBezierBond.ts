import {
  QuadraticBezierBondInterface,
  QuadraticBezierBondSavableState,
} from './QuadraticBezierBondInterface';
import * as Svg from '@svgdotjs/svg.js';
import { BaseInterface as Base } from 'Draw/BaseInterface';
import { distance2D as distance } from 'Math/distance';
import angleBetween from 'Draw/angleBetween';
import normalizeAngle from 'Draw/normalizeAngle';

class QuadraticBezierBond implements QuadraticBezierBondInterface {
  _path: Svg.Path;
  _base1: Base;
  _base2: Base;

  _padding1!: number;
  _padding2!: number;
  _controlHeight!: number;
  _controlAngle!: number;

  static _dPath(
    b1: Base,
    b2: Base,
    padding1: number,
    padding2: number,
    controlHeight: number,
    controlAngle: number,
  ): string {
    let xMiddle = (b1.xCenter + b2.xCenter) / 2;
    let yMiddle = (b1.yCenter + b2.yCenter) / 2;
    let ca = b1.angleBetweenCenters(b2) + controlAngle;
    let xControl = xMiddle + (controlHeight * Math.cos(ca));
    let yControl = yMiddle + (controlHeight * Math.sin(ca));
    let a1 = angleBetween(b1.xCenter, b1.yCenter, xControl, yControl);
    let x1 = b1.xCenter + (padding1 * Math.cos(a1));
    let y1 = b1.yCenter + (padding1 * Math.sin(a1));
    let a2 = angleBetween(b2.xCenter, b2.yCenter, xControl, yControl);
    let x2 = b2.xCenter + (padding2 * Math.cos(a2));
    let y2 = b2.yCenter + (padding2 * Math.sin(a2));
    return ['M', x1, y1, 'Q', xControl, yControl, x2, y2].join(' ');
  }

  /**
   * Throws if the path element is not actually a path element.
   *
   * Initializes the ID of the path if it is not already initialized.
   *
   * Sets fill-opacity to zero.
   *
   * Throws if the path is not composed of an M and Q segment.
   */
  constructor(path: Svg.Path, b1: Base, b2: Base) {
    this._base1 = b1;
    this._base2 = b2;

    this._path = path;
    this._validatePath();

    this._storePaddings();
    this._storeControlHeightAndAngle();
  }

  _validatePath(): (void | never) {
    if (this._path.type !== 'path') {
      throw new Error('The given element is not a path element.');
    }
    this._path.id();
    this._path.attr({ 'fill-opacity': 0 });
    let pa = this._path.array();
    if (pa.length !== 2) {
      throw new Error('Invalid path.');
    }
    let m = pa[0];
    let q = pa[1];
    if (m[0] !== 'M' || q[0] !== 'Q') {
      throw new Error('Invalid path.');
    }
  }

  get id(): string {
    return this._path.id();
  }

  get base1(): Base {
    return this._base1;
  }

  get base2(): Base {
    return this._base2;
  }

  contains(b: Base): boolean {
    return this.base1.id == b.id || this.base2.id == b.id;
  }

  get x1(): number {
    let pa = this._path.array();
    let m = pa[0];
    return m[1] as number;
  }

  get y1(): number {
    let pa = this._path.array();
    let m = pa[0];
    return m[2] as number;
  }

  get x2(): number {
    let pa = this._path.array();
    let q = pa[1];
    return q[3] as number;
  }

  get y2(): number {
    let pa = this._path.array();
    let q = pa[1];
    return q[4] as number;
  }

  get xControl(): number {
    let pa = this._path.array();
    let q = pa[1];
    return q[1] as number;
  }

  get yControl(): number {
    let pa = this._path.array();
    let q = pa[1];
    return q[2] as number;
  }

  /**
   * Sets the _padding1 and _padding2 properties.
   */
  _storePaddings() {
    this._padding1 = distance(
      this.base1.xCenter,
      this.base1.yCenter,
      this.x1,
      this.y1,
    );
    this._padding2 = distance(
      this.base2.xCenter,
      this.base2.yCenter,
      this.x2,
      this.y2,
    );
  }

  getPadding1(): number {
    return this._padding1;
  }

  setPadding1(p: number) {
    this._reposition(
      p,
      this.getPadding2(),
      this._controlHeight,
      this._controlAngle,
    );
  }

  getPadding2(): number {
    return this._padding2;
  }

  setPadding2(p: number) {
    this._reposition(
      this.getPadding1(),
      p,
      this._controlHeight,
      this._controlAngle,
    );
  }

  /**
   * Sets the _controlHeight and _controlAngle properties.
   */
  _storeControlHeightAndAngle() {
    let xMiddle = (this.base1.xCenter + this.base2.xCenter) / 2;
    let yMiddle = (this.base1.yCenter + this.base2.yCenter) / 2;
    this._controlHeight = distance(
      xMiddle,
      yMiddle,
      this.xControl,
      this.yControl,
    );
    let a12 = this.base1.angleBetweenCenters(this.base2);
    let ca = angleBetween(
      xMiddle,
      yMiddle,
      this.xControl,
      this.yControl,
    );
    this._controlAngle = normalizeAngle(ca, a12) - a12;
  }

  shiftControl(xShift: number, yShift: number) {
    let xMiddle = (this.base1.xCenter + this.base2.xCenter) / 2;
    let yMiddle = (this.base1.yCenter + this.base2.yCenter) / 2;
    let xControl = this.xControl + xShift;
    let yControl = this.yControl + yShift;
    let controlHeight = distance(xMiddle, yMiddle, xControl, yControl);
    let ca = angleBetween(xMiddle, yMiddle, xControl, yControl);
    let a12 = this.base1.angleBetweenCenters(this.base2);
    let controlAngle = normalizeAngle(ca, a12) - a12;
    this._reposition(this.getPadding1(), this.getPadding2(), controlHeight, controlAngle);
  }

  reposition() {
    this._reposition(
      this.getPadding1(),
      this.getPadding2(),
      this._controlHeight,
      this._controlAngle
    );
  }

  _reposition(padding1: number, padding2: number, controlHeight: number, controlAngle: number) {
    this._path.plot(
      QuadraticBezierBond._dPath(
        this.base1,
        this.base2,
        padding1,
        padding2,
        controlHeight,
        controlAngle,
      ),
    );
    this._storePaddings();
    this._storeControlHeightAndAngle();
  }

  getStroke(): string {
    return this._path.attr('stroke');
  }

  setStroke(s: string) {
    this._path.attr({ 'stroke': s });
  }

  getStrokeWidth(): number {
    return this._path.attr('stroke-width');
  }

  setStrokeWidth(sw: number) {
    this._path.attr({ 'stroke-width': sw });
  }

  getStrokeOpacity(): number {
    return this._path.attr('stroke-opacity');
  }

  setStrokeOpacity(so: number) {
    this._path.attr({ 'stroke-opacity': so });
  }

  getStrokeDasharray(): string {
    return this._path.attr('stroke-dasharray');
  }

  setStrokeDasharray(sd: string) {
    this._path.attr({ 'stroke-dasharray': sd });
  }

  get fill(): string {
    return this._path.attr('fill');
  }

  set fill(f: string) {
    this._path.attr({ 'fill': f });
  }

  get fillOpacity(): number {
    return this._path.attr('fill-opacity');
  }

  set fillOpacity(fo: number) {
    this._path.attr({ 'fill-opacity': fo });
  }

  bringToFront() {
    this._path.front();
  }

  sendToBack() {
    this._path.back();
  }

  get cursor(): string {
    return this._path.css('cursor');
  }

  set cursor(c: string) {
    this._path.css('cursor', c);
  }

  onMouseover(f: () => void) {
    this._path.mouseover(f);
  }

  onMouseout(f: () => void) {
    this._path.mouseout(f);
  }

  onMousedown(f: () => void) {
    this._path.mousedown(f);
  }

  onDblclick(f: () => void) {
    this._path.dblclick(f);
  }

  remove() {
    this._path.remove();
  }

  hasBeenRemoved() {
    return !this._path.root();
  }

  savableState(): QuadraticBezierBondSavableState {
    return {
      className: 'QuadraticBezierBond',
      pathId: this._path.id(),
      baseId1: this.base1.id,
      baseId2: this.base2.id,
    };
  }

  refreshIds() {
    this._path.id('');
    this._path.id();
  }
}

export { QuadraticBezierBond };
