export interface PerBaseStrictLayoutPropsSavableState {
  className: string;
  stretch3: number;
  flatLoopAngle3: number;
  flipStem: boolean;
  loopShape: string;
  triangleLoopHeight: number;
}

export class PerBaseStrictLayoutProps {
  stretch3: number;
  flatLoopAngle3: number;
  flipStem: boolean;
  loopShape: string;
  triangleLoopHeight: number;

  static deepCopyArray(arr: PerBaseStrictLayoutPropsArray): PerBaseStrictLayoutProps[] {
    let copyArr: PerBaseStrictLayoutProps[] = [];
    arr.forEach((props, i) => {
      if (props) {
        copyArr[i] = props.deepCopy();
      }
    });
    copyArr.length = arr.length;
    return copyArr;
  }

  static getOrCreatePropsAtPosition(arr: PerBaseStrictLayoutPropsArray, p: number): PerBaseStrictLayoutProps {
    let props = arr[p - 1];
    if (!props) {
      props = new PerBaseStrictLayoutProps();
      arr[p - 1] = props;
    }
    return props;
  }

  static fromSavedState(savedState: { [key: string]: unknown }): PerBaseStrictLayoutProps {
    let pbps = new PerBaseStrictLayoutProps();
    if (typeof savedState.stretch3 == 'number') {
      pbps.stretch3 = savedState.stretch3;
    }
    if (typeof savedState.flatLoopAngle3 == 'number') {
      pbps.flatLoopAngle3 = savedState.flatLoopAngle3;
    }
    if (typeof savedState.flipStem == 'boolean') {
      pbps.flipStem = savedState.flipStem;
    }
    if (typeof savedState.loopShape == 'string') {
      pbps.loopShape = savedState.loopShape;
    }
    if (typeof savedState.triangleLoopHeight == 'number') {
      pbps.triangleLoopHeight = savedState.triangleLoopHeight;
    }
    return pbps;
  }

  constructor() {
    this.stretch3 = 0;
    this.flatLoopAngle3 = 0;
    this.flipStem = false;
    this.loopShape = 'round';
    this.triangleLoopHeight = 4;
  }

  deepCopy(): PerBaseStrictLayoutProps {
    let savableState = this.savableState();
    return PerBaseStrictLayoutProps.fromSavedState({ ...savableState });
  }

  savableState(): PerBaseStrictLayoutPropsSavableState {
    return {
      className: 'PerBaseStrictLayoutProps',
      stretch3: this.stretch3,
      flatLoopAngle3: this.flatLoopAngle3,
      flipStem: this.flipStem,
      loopShape: this.loopShape,
      triangleLoopHeight: this.triangleLoopHeight,
    };
  }
}

export type PerBaseStrictLayoutPropsArray = (PerBaseStrictLayoutProps | undefined)[];

// If the position is uninitialized, assigns a new per base props object
// to the given position and returns the new per base props object.
//
// Behavior is not firmly defined if the position is already initialized.
// Currently, if the position is already initialized, returns the already
// present per base props object without modifying it. Recommended to avoid
// using on positions that are already initialized.
export function initializeAtPosition(arr: PerBaseStrictLayoutPropsArray, p: number): PerBaseStrictLayoutProps {
  let props = arr[p - 1];
  if (props) {
    return props;
  } else {
    let props = new PerBaseStrictLayoutProps();
    arr[p - 1] = props;
    return props;
  }
}

export default PerBaseStrictLayoutProps;
