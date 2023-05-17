export interface GeneralStrictLayoutPropsSavableState {
  className: string;
  outermostLoopShape: string;
  rotation: number;
  basePairBondLength: number;
  basePairPadding: number;
  terminiGap: number;
}

export class GeneralStrictLayoutProps {
  outermostLoopShape: string;
  rotation: number;
  basePairBondLength: number;
  basePairPadding: number;
  terminiGap: number;

  static fromSavedState(savedState: { [key: string]: unknown }): GeneralStrictLayoutProps {
    let gps = new GeneralStrictLayoutProps();
    if (typeof savedState.outermostLoopShape == 'string') {
      gps.outermostLoopShape = savedState.outermostLoopShape;
    }
    if (typeof savedState.rotation == 'number') {
      gps.rotation = savedState.rotation;
    }
    if (typeof savedState.basePairBondLength == 'number') {
      gps.basePairBondLength = savedState.basePairBondLength;
    }
    if (typeof savedState.basePairPadding == 'number') {
      gps.basePairPadding = savedState.basePairPadding;
    }
    if (typeof savedState.terminiGap == 'number') {
      gps.terminiGap = savedState.terminiGap;
    }
    return gps;
  }

  constructor() {
    this.outermostLoopShape = 'round';
    this.rotation = 0.0;

    this.basePairBondLength = 1.35;
    this.basePairPadding = 0;

    this.terminiGap = 4;
  }

  get stemWidth(): number {
    return 2 + this.basePairBondLength;
  }

  deepCopy(): GeneralStrictLayoutProps {
    let savableState = this.savableState();
    return GeneralStrictLayoutProps.fromSavedState({ ...savableState });
  }

  savableState(): GeneralStrictLayoutPropsSavableState {
    return {
      className: 'GeneralStrictLayoutProps',
      outermostLoopShape: this.outermostLoopShape,
      rotation: this.rotation,
      basePairBondLength: this.basePairBondLength,
      basePairPadding: this.basePairPadding,
      terminiGap: this.terminiGap,
    };
  }
}

export default GeneralStrictLayoutProps;
