import { SVG } from '@svgdotjs/svg.js';
import Sequence from './Sequence';
import StraightBond from './StraightBond';

class Drawing {

  /**
   * @param {Element} container The DOM element to place the SVG document of the drawing in.
   */
  constructor(container) {
    this._container = container;

    this._initializeSVG();

    this._sequences = [];
      
    this._bonds = {
      strand: [],
      watsonCrick: [],
      tertiary: []
    };

    this._initializeDefaults();
  }

  /**
   * Creates the SVG document for this drawing and adds it to
   * the given container element.
   * 
   * Also initializes the Z separators for this drawing, which separate
   * different kinds of elements along the Z axis.
   * 
   * @param {Element} container The DOM element to place the SVG document of this drawing in.
   */
  _initializeSVG() {
    this._svg = SVG().addTo(this._container);

    this._svg.attr({
      'position': 'absolute',
      'width': 2 * window.screen.width,
      'height': 2 * window.screen.height,
      'overflow': 'scroll'
    });

    this._zSeparators = {
      bondsAndBaseOutlines: null,
      baseOutlinesAndBaseHighlighting: null,
      baseHighlightingAndBaseNumbering: null,
      baseNumberingAndBaseLetters: null
    };
  }

  /**
   * @returns {SVG.Doc} The SVG document of this drawing.
   */
  get svg() {
    return this._svg;
  }

  _initializeDefaults() {
    this.defaults = {
      baseWidth: 12,
      baseHeight: 12,

      baseLetterFontFamily: 'Arial',
      baseLetterFontSize: 9,
      baseLetterFontWieght: 'bold',
      baseLetterFontStyle: 'normal',
      baseLetterFill: '#000000',

      strandBondPadding: 6,
      strandBondStroke: '#808080',
      strandBondStrokeWidth: 1,
      strandBondDistanceThreshold: 6,

      watsonCrickBondPadding: 6,
      watsonCrickAUTBondStroke: '#000000',
      watsonCrickGCBondStroke: '#000000',
      watsonCrickGUTBondStroke: '#808080',
      watsonCrickOtherBondStroke: '#808080',
      watsonCrickBondStrokeWidth: 2,
      
      tertiaryBondPadding: 6,
      tertiaryBondStroke: '#0000FF',
      tertiaryBondStrokeWidth: 1
    };
  }

  /**
   * @returns {boolean} True if this drawing is empty.
   */
  isEmpty() {
    return this._sequences.length === 0;
  }

  centerView() {
    
    console.log(this._container.scrollHeight);
    console.log(this._container.offsetWidth);
    /* Using window.innerWidth is not totally precise, but container.innerWidth
    always seems to return 0. */
    this._container.scrollLeft = (this._container.scrollWidth - this._container.clientWidth) / 2;
    
    this._container.scrollTop = (this._container.scrollHeight - this._container.clientHeight) / 2;
  }

  /**
   * Adds the given structure to this drawing.
   * 
   * @param {string} id The sequence ID.
   * @param {string} sequence The sequence.
   * @param {Array<number|null>} partners The partners notation of the secondary structure.
   */
  addStructure(id, sequence, partners) {
    let seq = Sequence.createHorizontalLine(
      this._svg,
      id,
      sequence,
      window.screen.width,
      window.screen.height,
      this.defaults.baseWidth
    );

    this._sequences.push(seq);

    for (let p = 1; p <= sequence.length; p++) {
      let q = partners[p - 1];

      if (q !== null && p < q) {
        this._bonds.watsonCrick.push(StraightBond.createWatsonCrick(
          this._svg,
          seq.getBase(p),
          seq.getBase(q),
          this.defaults
        ));
      }
    }

    this.centerView();
  }
}

export default Drawing;
