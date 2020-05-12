import Drawing from './Drawing';
import StrictLayout from './layout/singleseq/strict/StrictLayout';
import GeneralStrictLayoutProps from './layout/singleseq/strict/GeneralStrictLayoutProps';
import PerBaseStrictLayoutProps from './layout/singleseq/strict/PerBaseStrictLayoutProps';
import { radiateStems } from './layout/singleseq/strict/radiateStems';
import FiniteStack from './FiniteStack';

class StrictDrawing {
  constructor() {
    this._drawing = new Drawing();

    this._generalLayoutProps = new GeneralStrictLayoutProps();
    this._perBaseLayoutProps = [];
    this._baseWidth = 13.5;
    this._baseHeight = 13.5;

    this._undoStack = new FiniteStack();
    this._redoStack = new FiniteStack();

    this._interactionState = {};
  }

  /**
   * @callback StrictDrawing~SVG 
   * 
   * @returns {SVG.Svg} 
   */

  /**
   * @param {Node} container 
   * @param {StrictDrawing~SVG} SVG 
   */
  addTo(container, SVG) {
    this._drawing.addTo(container, SVG);
  }

  /**
   * @returns {string} 
   */
  get svgString() {
    return this._drawing.svgString;
  }

  /**
   * @returns {number} 
   */
  get zoom() {
    return this._drawing.zoom;
  }

  /**
   * @param {number} z 
   */
  set zoom(z) {
    this._drawing.zoom = z;
  }

  /**
   * @returns {boolean} 
   */
  isEmpty() {
    return this._drawing.isEmpty();
  }

  /**
   * @param {StrictDrawing~SavableState} savedState 
   */
  _pushUndo(savedState) {
    this._undoStack.push(savedState);
    this._redoStack.clear();
  }

  undo() {
    if (!this._undoStack.isEmpty()) {
      this._redoStack.push(this.savableState());
      let state = this._undoStack.pop();
      this._applySavedState(state);
    }
  }

  redo() {
    if (!this._redoStack.isEmpty()) {
      this._undoStack.push(this.savableState());
      let state = this._redoStack.pop();
      this._applySavedState(state);
    }
  }

  /**
   * @typedef {Object} StrictDrawing~SavableState 
   * @property {Drawing~SavableState} drawing 
   * @property {GeneralStrictLayoutProps~SavableState} generalLayoutProps 
   * @property {Array<PerBaseStrictLayoutProps~SavableState>} perBaseLayoutProps 
   * @property {number} baseWidth 
   * @property {number} baseHeight 
   */

  /**
   * @returns {StrictDrawing~SavableState} 
   */
  savableState() {
    let state = {
      className: 'StrictDrawing',
      drawing: this._drawing.savableState(),
      generalLayoutProps: this._generalLayoutProps.savableState(),
      perBaseLayoutProps: [],
      baseWidth: this._baseWidth,
      baseHeight: this._baseHeight,
    };
    this._perBaseLayoutProps.forEach(pbps => {
      state.perBaseLayoutProps.push(pbps.savableState());
    });
    return state;
  }

  /**
   * @returns {string} 
   */
  get savableString() {
    let savableState = this.savableState();
    return JSON.stringify(savableState);
  }

  /**
   * If the saved state cannot be successfully applied, the state of
   * this drawing will not be affected.
   * 
   * @param {StrictDrawing~SavableState} savedState 
   * 
   * @returns {boolean} True if the saved state was successfully applied.
   */
  _applySavedState(savedState) {
    let prevState = this.savableState();
    try {
      this._drawing.applySavedState(savedState.drawing);
      this._applySavedGeneralLayoutProps(savedState);
      this._applySavedPerBaseLayoutProps(savedState);
      this._applySavedBaseWidthAndHeight(savedState);
    } catch (err) {
      this._applySavedState(prevState);
      return false;
    }
    return true;
  }

  _applySavedGeneralLayoutProps(savedState) {
    if (!savedState.generalLayoutProps) {
      throw new Error();
    }
    this._generalLayoutProps = GeneralStrictLayoutProps.fromSavedState(
      savedState.generalLayoutProps
    );
  }

  _applySavedPerBaseLayoutProps(savedState) {
    if (savedState.perBaseLayoutProps.length != this._drawing.numBases) {
      throw new Error();
    }
    this._perBaseLayoutProps = [];
    savedState.perBaseLayoutProps.forEach(sps => {
      let ps = PerBaseStrictLayoutProps.fromSavedState(sps);
      this._perBaseLayoutProps.push(ps);
    });
  }

  _applySavedBaseWidthAndHeight(savedState) {
    let bw = savedState.baseWidth;
    let bh = savedState.baseHeight;
    if (typeof bw !== 'number' || typeof bh !== 'number') {
      throw new Error();
    }
    this._baseWidth = bw;
    this._baseHeight = bh;
  }

  /**
   * @param {string} id 
   * @param {string} characters 
   * 
   * @returns {boolean} True if the sequence was successfully appended.
   */
  _appendSequenceOutOfView(id, characters) {
    let seq = this._drawing.appendSequenceOutOfView(id, characters);
    if (!seq) {
      return false;
    }
    seq.forEachBase(() => {
      this._perBaseLayoutProps.push(new PerBaseStrictLayoutProps());
    });
    return true;
  }

  /**
   * @typedef {Object} StrictDrawing~Structure 
   * @property {string} id 
   * @property {string} characters 
   * @property {Array<number|null>} secondaryPartners 
   * @property {Array<number|null>} tertiaryPartners 
   */

   /**
    * @param {StrictDrawing~Structure} structure 
    * 
    * @returns {boolean} True if the structure was successfully appended.
    */
  _appendStructure(structure) {
    let appended = this._appendSequenceOfStructure(structure);
    if (!appended) {
      return false;
    }
    this._addPrimaryBondsOfStructure(structure);
    this._addSecondaryBondsOfStructure(structure);
    this._addTertiaryBondsOfStructure(structure);
    this._radiateStemsOfStructure(structure);
    this._updateLayout();
    return true;
  }

  /**
   * @param {StrictDrawing~Structure} structure 
   * 
   * @returns {boolean} True if the sequence was successfully appended.
   */
  _appendSequenceOfStructure(structure) {
    return this._appendSequenceOutOfView(
      structure.id,
      structure.characters,
    );
  }

  /**
   * @param {StrictDrawing~Structure} structure 
   */
  _addPrimaryBondsOfStructure(structure) {
    let seq = this._drawing.getSequenceById(structure.id);
    seq.forEachBase((b, p) => {
      if (p < seq.length) {
        this._drawing.addPrimaryBond(
          seq.getBaseAtPosition(p),
          seq.getBaseAtPosition(p + 1),
        );
      }
    });
  }

  /**
   * @param {StrictDrawing~Structure} structure 
   */
  _addSecondaryBondsOfStructure(structure) {
    let seq = this._drawing.getSequenceById(structure.id);
    seq.forEachBase((b, p) => {
      let q = structure.secondaryPartners[p - 1];
      if (typeof q == 'number' && p < q) {
        this._drawing.addSecondaryBond(
          seq.getBaseAtPosition(p),
          seq.getBaseAtPosition(q),
        );
      }
    });
  }

  /**
   * @param {StrictDrawing~Structure} structure 
   */
  _addTertiaryBondsOfStructure(structure) {
    let seq = this._drawing.getSequenceById(structure.id);
    seq.forEachBase((b, p) => {
      let q = structure.tertiaryPartners[p - 1];
      if (typeof q == 'number' && p < q) {
        let tb = this._drawing.addTertiaryBond(
          seq.getBaseAtPosition(p),
          seq.getBaseAtPosition(q),
        );
        tb.cursor = 'pointer';
      }
    });
  }

  /**
   * @param {StrictDrawing~Structure} structure 
   */
  _radiateStemsOfStructure(structure) {
    let stretches3 = radiateStems(structure.secondaryPartners);
    let seq = this._drawing.getSequenceById(structure.id);
    if (seq.length == 0) {
      return;
    }
    let b1 = seq.getBaseAtPosition(1);
    let op1 = this._drawing.overallPositionOfBase(b1);
    seq.forEachBase((b, p) => {
      let op = op1 + p - 1;
      this._perBaseLayoutProps[op - 1].stretch3 = stretches3[p - 1];
    });
  }

  /**
   * @returns {Array<number|null>} 
   */
  overallSecondaryPartners() {
    let idsToPositions = {};
    this._drawing.forEachBase((b, p) => {
      idsToPositions[b.id] = p;
    });
    let partners = [];
    this._drawing.forEachBase(b => {
      partners.push(null);
    });
    this._drawing.forEachSecondaryBond(sb => {
      let p = idsToPositions[sb.base1.id];
      let q = idsToPositions[sb.base2.id];
      partners[p - 1] = q;
      partners[q - 1] = p;
    });
    return partners;
  }

  /**
   * @returns {GeneralStrictLayoutProps} 
   */
  generalLayoutProps() {
    return this._generalLayoutProps.deepCopy();
  }

  /**
   * @returns {Array<PerBaseStrictLayoutProps>} 
   */
  perBaseLayoutProps() {
    let props = [];
    this._perBaseLayoutProps.forEach(ps => {
      props.push(ps.deepCopy());
    });
    return props;
  }

  get baseWidth() {
    return this._baseWidth;
  }

  get baseHeight() {
    return this._baseHeight;
  }

  /**
   * @returns {StrictLayout} 
   */
  layout() {
    return new StrictLayout(
      this.overallSecondaryPartners(),
      this.generalLayoutProps(),
      this.perBaseLayoutProps(),
    );
  }

  _updateLayout() {
    let l = this.layout();
    let bw = this.baseWidth;
    let bh = this.baseHeight;
    let xMin = l.xMin;
    let yMin = l.yMin;
    this._drawing.forEachBase((b, p) => {
      let bcs = l.baseCoordinatesAtPosition(p);
      b.moveTo(
        window.screen.width + (bw * (bcs.xCenter - xMin)),
        window.screen.height + (bh * (bcs.yCenter - yMin)),
      );
    });
    this._drawing.repositionBonds();
    this._drawing.adjustNumberingLineAngles();
    this._drawing.setWidthAndHeight(
      (2 * window.screen.width) + (bw * (l.xMax - xMin)),
      (2 * window.screen.height) + (bh * (l.yMax - yMin)),
    );
  }

  /**
   * @param {StrictDrawing~Structure} structure 
   * 
   * @returns {boolean} True if the structure was successfully drawn.
   */
  createNewDrawing(structure) {
    let appended = this._appendStructure(structure);
    if (!appended) {
      return false;
    }
    this._drawing.centerView();
    return true;
  }
  
  /**
   * @typedef {Object} StrictDrawing~Ct 
   * @property {string} id 
   * @property {string} characters 
   * @property {Array<number|null>} secondaryPartners 
   * @property {Array<number|null>} tertiaryPartners 
   * @property {number} numberingOffset 
   */

  /**
   * @param {StrictDrawing~Ct} ct 
   * 
   * @returns {boolean} True if the structure was successfully drawn.
   */
  openCt(ct) {
    let appended = this._appendStructure({
      id: ct.id,
      characters: ct.characters,
      secondaryPartners: ct.secondaryPartners,
      tertiaryPartners: ct.tertiaryPartners,
    });
    if (!appended) {
      return false;
    }
    let seq = this._drawing.getSequenceById(ct.id);
    seq.numberingOffset = ct.numberingOffset;
    return true;
  }

  /**
   * @param {string} fileContents 
   * 
   * @returns {boolean} True if the saved state was successfully applied.
   */
  openRna2drawer2(fileContents) {
    let savedState = null;
    try {
      savedState = JSON.parse(fileContents);
    } catch (err) {
      return false;
    }
    this._applySavedState(savedState);
    return true;
  }
}

export default StrictDrawing;
