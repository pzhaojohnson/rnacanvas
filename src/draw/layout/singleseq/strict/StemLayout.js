import NormalizedBaseCoordinates from '../../NormalizedBaseCoordinates';
import { circleCenter } from './circleCenter';
import { circleCircumference } from './circleCircumference';
import Stem from './Stem';

class RoundLoop {

  /**
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static circumference(st, generalProps) {
    let straightLength = Stem.width(generalProps) - 1;
    let numStraights = st.numBranches;
    if (!st.isOutermostStem()) {
      numStraights += 1;
    }
    let remainingPolarLength = st.loopLength - (st.numBranches * straightLength);
    if (st.isOutermostStem()) {
      remainingPolarLength += generalProps.terminiGap;
    } else {
      remainingPolarLength += 1;
    }
    return circleCircumference(straightLength, numStraights, remainingPolarLength);
  }

  /**
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static radius(st, generalProps) {
    return RoundLoop.circumference(st, generalProps) / (2 * Math.PI);
  }

  /**
   * @typedef {Object} RoundLoop~Center 
   * @property {number} x 
   * @property {number} y 
   */
  
  /**
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {RoundLoop~Center} 
   */
  static center(st, generalProps) {
    if (st.isOutermostStem()) {
      return { x: 0, y: 0 };
    } else if (st.numBranches === 0) {
      let bct5 = st.baseCoordinatesTop5();
      let bct3 = st.baseCoordinatesTop3();
      return circleCenter(
        bct5.xCenter,
        bct5.yCenter,
        bct3.xCenter,
        bct3.yCenter,
        st.loopLength + 1,
      );
    } else {
      let radius = RoundLoop.radius(st, generalProps);
      let bct5 = st.baseCoordinatesTop5();
      let bct3 = st.baseCoordinatesTop3();
      let opp = bct5.distanceBetweenCenters(bct3) / 2;
      opp = Math.min(opp, 0.9999 * radius);
      let asin = Math.asin(opp / radius);
      let angle = bct5.angleBetweenCenters(bct3) - (Math.PI / 2) + asin;
      return {
        x: bct5.xCenter + (radius * Math.cos(angle)),
        y: bct5.yCenter + (radius * Math.sin(angle)),
      };
    }
  }

  /**
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static originAngle(st, generalProps) {
    if (st.isOutermostStem()) {
      return generalProps.rotation + Math.PI;
    } else {
      return st.reverseAngle;
    }
  }

  /**
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static polarLengthPerStem(st, generalProps) {
    let numStems = st.numBranches;
    if (!st.isOutermostStem()) {
      numStems++;
    }
    if (numStems === 0) {
      return 0;
    } else {
      let radius = RoundLoop.radius(st, generalProps);
      let basePairWidth = Stem.width(generalProps) - 1;
      let halfBasePairWidth = basePairWidth / 2;
      halfBasePairWidth = Math.min(halfBasePairWidth, 0.9999 * radius);
      let basePairAngleSpan = 2 * Math.asin(halfBasePairWidth / radius);
      return (basePairAngleSpan * radius) + 1;
    }
  }

  /**
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static angleSpanPerStem(st, generalProps) {
    let polarLength = RoundLoop.polarLengthPerStem(st, generalProps);
    let circumference = RoundLoop.circumference(st, generalProps);
    return (2 * Math.PI) * (polarLength / circumference);
  }

  /**
   * @param {Stem} outermostStem 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static polarLengthBetweenTermini(outermostStem, generalProps) {
    if (outermostStem.numBranches === 0) {
      return outermostStem.loopLength;
    } else {
      let stemWidth = Stem.width(generalProps);
      let stemPolarWidth = RoundLoop.polarLengthPerStem(outermostStem, generalProps);
      return outermostStem.loopLength
        - (outermostStem.numBranches * stemWidth)
        + (outermostStem.numBranches * stemPolarWidth);
    }
  }

  /**
   * @param {Stem} outermostStem 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static terminusAngle5(outermostStem, generalProps) {
    let circumference = RoundLoop.circumference(outermostStem, generalProps);
    let polarLength = RoundLoop.polarLengthBetweenTermini(outermostStem, generalProps);
    return RoundLoop.originAngle(outermostStem, generalProps)
      + Math.PI
      - ((2 * Math.PI) * ((polarLength / 2) / circumference));
  }

  /**
   * @param {Stem} outermostStem 
   * @param {GeneralStrictLayoutProps} generalProps 
   * 
   * @returns {number} 
   */
  static terminusAngle3(outermostStem, generalProps) {
    let circumference = RoundLoop.circumference(outermostStem, generalProps);
    let polarLength = RoundLoop.polarLengthBetweenTermini(outermostStem, generalProps);
    return RoundLoop.originAngle(outermostStem, generalProps)
      + Math.PI
      + ((2 * Math.PI) * ((polarLength / 2) / circumference));
  }

  /**
   * Sets the coordinates and angles for all stems in the layout.
   * 
   * @param {Stem} outermostStem 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   */
  static setCoordinatesAndAngles(outermostStem, generalProps, perBaseProps) {
    RoundLoop.setInnerCoordinatesAndAngles(outermostStem, generalProps, perBaseProps);
  }

  /**
   * Recursively sets the coordinates and angles of stems inner to the given stem.
   * 
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   */
  static setInnerCoordinatesAndAngles(st, generalProps, perBaseProps) {
    if (st.numBranches === 0) {
      return;
    } else {
      let center = RoundLoop.center(st, generalProps);
      let radius = RoundLoop.radius(st, generalProps);
      let circumference = RoundLoop.circumference(st, generalProps);
      let stemAngleSpan = RoundLoop.angleSpanPerStem(st, generalProps);
      let stemPolarWidth = RoundLoop.polarLengthPerStem(st, generalProps);
      let basePairAngleSpan = (2 * Math.PI) * ((stemPolarWidth - 1) / circumference);
      let bottomCenterRadius = (radius * Math.cos(basePairAngleSpan / 2)) - 0.5;
      let angle;
      if (st.isOutermostStem()) {
        angle = RoundLoop.terminusAngle5(st, generalProps);
        angle += stemAngleSpan / 2;
      } else {
        angle = st.reverseAngle;
        angle += stemAngleSpan;
      }
      let it = st.loopIterator();
      let iur = it.next().value;
      let next = it.next();
      while (!next.done) {
        angle += (2 * Math.PI) * (iur.length / circumference);
        let ist = next.value;
        ist.xBottomCenter = center.x + (bottomCenterRadius * Math.cos(angle));
        ist.yBottomCenter = center.y + (bottomCenterRadius * Math.sin(angle));
        ist.angle = angle;
        StemLayout.setInnerCoordinatesAndAngles(ist, generalProps, perBaseProps);
        angle += stemAngleSpan;
        iur = it.next().value;
        next = it.next();
      }
    }
  }
}

class TriangleLoop {

  /**
   * @param {Stem} st 
   * 
   * @returns {number} 
   */
  static platformLength(st) {
    let length = 0;
    let it = st.loopIterator();
    it.next();
    let next = it.next();
    while (!next.done) {
      let ist = next.value;
      length += ist.width;
      let ur = it.next().value;
      if (ur.boundingPosition3 < st.positionTop3) {
        length += ur.length;
      }
      next = it.next();
    }
    return length;
  }

  /**
   * Recursively sets the coordinates and angles of stems inner to the given stem.
   * 
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   */
  static setInnerCoordinatesAndAngles(st, generalProps, perBaseProps) {
    if (st.hasHairpinLoop()) {
      return;
    } else {
      let x = st.xTopCenter;
      let y = st.yTopCenter;
      let h = st.triangleLoopHeight - 1;
      x += h * Math.cos(st.angle);
      y += h * Math.sin(st.angle);
      let pl = TriangleLoop.platformLength(st);
      x += (pl / 2) * Math.cos(st.angle - (Math.PI / 2));
      y += (pl / 2) * Math.sin(st.angle - (Math.PI / 2));
      let it = st.loopIterator();
      it.next();
      let next = it.next();
      while (!next.done) {
        let ist = next.value;
        x += (ist.width / 2) * Math.cos(st.angle + (Math.PI / 2));
        y += (ist.width / 2) * Math.sin(st.angle + (Math.PI / 2));
        ist.xBottomCenter = x;
        ist.yBottomCenter = y;
        ist.angle = st.angle;
        StemLayout.setInnerCoordinatesAndAngles(ist, generalProps, perBaseProps);
        let ur = it.next().value;
        x += ((ist.width / 2) + ur.length) * Math.cos(st.angle + (Math.PI / 2));
        y += ((ist.width / 2) + ur.length) * Math.sin(st.angle + (Math.PI / 2));
        next = it.next();
      }
    }
  }
}

class FlatOutermostLoop {

  /**
   * Traverses the unpaired region 5' to 3', starting with the coordinates and angle
   * of its 5' bounding stem.
   * 
   * @param {UnpairedRegion} ur 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps} perBaseProps 
   * 
   * @returns {Array<NormalizedBaseCoordinates>} The base coordinates for the unpaired region.
   */
  static traverseUnpairedRegion53(ur, generalProps, perBaseProps) {
    let coordinates = [];
    let x;
    let y;
    let angle;
    if (ur.boundingStem5.isOutermostStem()) {
      x = 0;
      y = 0;
      angle = generalProps.rotation;
    } else {
      x = ur.baseCoordinatesBounding5().xLeft;
      y = ur.baseCoordinatesBounding5().yTop;
      angle = ur.boundingStem5.angle + (Math.PI / 2);
    }
    for (let p = ur.boundingPosition5 + 1; p < ur.boundingPosition3; p++) {
      let d = 1;
      if (p > 1) {
        d += Math.max(0, perBaseProps[p - 2].stretch3);
        angle += perBaseProps[p - 2].flatLoopAngle3;
      }
      x += d * Math.cos(angle);
      y += d * Math.sin(angle);
      coordinates.push(new NormalizedBaseCoordinates(x, y));
    }
    return coordinates;
  }

  /**
   * @param {UnpairedRegion} ur 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   * 
   * @returns {number} The angle leading to the next base after traversing the unpaired region
   *  5' to 3' starting with the coordinates and angle of its 5' bounding stem.
   */
  static unpairedRegionAngle53(ur, generalProps, perBaseProps) {
    let coordinates = FlatOutermostLoop.traverseUnpairedRegion53(ur, generalProps, perBaseProps);
    let angle;
    if (ur.boundingStem5.isOutermostStem() && coordinates.length < 2) {
      angle = generalProps.rotation;
    } else if (coordinates.length === 0) {
      angle = ur.boundingStem5.angle + (Math.PI / 2);
    } else if (coordinates.length === 1) {
      angle = ur.baseCoordinatesBounding5().angleBetweenCenters(coordinates[0]);
    } else {
      angle = coordinates[ur.size - 2].angleBetweenCenters(coordinates[ur.size - 1]);
    }
    if (ur.boundingPosition3 > 1) {
      angle += perBaseProps[ur.boundingPosition3 - 2].flatLoopAngle3;
    }
    return angle;
  }

  /**
   * Sets the coordinates and angle of the 3' bounding stem of the given unpaired region
   * based on the coordinates and angle of the 5' bounding stem of the unpaired region.
   * 
   * @param {UnpairedRegion} ur 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps} perBaseProps 
   */
  static setNextCoordinatesAndAngle53(ur, generalProps, perBaseProps) {
    let x;
    let y;
    let angle = FlatOutermostLoop.unpairedRegionAngle53(ur, generalProps, perBaseProps);
    let coordinates = FlatOutermostLoop.traverseUnpairedRegion53(ur, generalProps, perBaseProps);
    if (coordinates.length === 0) {
      x = ur.baseCoordinatesBounding5().xCenter;
      y = ur.baseCoordinatesBounding5().yCenter;
    } else {
      x = coordinates[ur.size - 1].xCenter;
      y = coordinates[ur.size - 1].yCenter;
    }
    let d = 0.5 + (ur.boundingStem3.width / 2);
    if (ur.boundingPosition3 > 1) {
      d += Math.max(0, perBaseProps[ur.boundingPosition3 - 2].stretch3);
    }
    x += d * Math.cos(angle);
    y += d * Math.sin(angle);
    x += 0.5 * Math.cos(angle + (Math.PI / 2));
    y += 0.5 * Math.sin(angle + (Math.PI / 2));
    ur.boundingStem3.xBottomCenter = x;
    ur.boundingStem3.yBottomCenter = y;
    ur.boundingStem3.angle = angle - (Math.PI / 2);
  }

  /**
   * Sets the coordinates and angles for all stems in the layout.
   * 
   * @param {Stem} outermostStem 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   */
  static setCoordinatesAndAngles(outermostStem, generalProps, perBaseProps) {
    let it = outermostStem.loopIterator();
    let ur = it.next().value;
    let next = it.next();
    while (!next.done) {
      let st = next.value;
      FlatOutermostLoop.setNextCoordinatesAndAngle53(ur, generalProps, perBaseProps);
      StemLayout.setInnerCoordinatesAndAngles(st, generalProps, perBaseProps);
      ur = it.next().value;
      next = it.next();
    }
  }
}

class StemLayout {

  /**
   * Sets the coordinates and angles for all stems in the layout.
   * 
   * @param {Stem} outermostStem 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   */
  static setCoordinatesAndAngles(outermostStem, generalProps, perBaseProps) {
    if (generalProps.outermostLoopShape === 'flat') {
      FlatOutermostLoop.setCoordinatesAndAngles(outermostStem, generalProps, perBaseProps);
    } else if (outermostStem.hasRoundLoop()) {
      RoundLoop.setCoordinatesAndAngles(outermostStem, generalProps, perBaseProps);
    }
  }

  /**
   * Recursively sets the coordinates and angles of stems inner to the given stem.
   * 
   * @param {Stem} st 
   * @param {GeneralStrictLayoutProps} generalProps 
   * @param {Array<PerBaseStrictLayoutProps>} perBaseProps 
   */
  static setInnerCoordinatesAndAngles(st, generalProps, perBaseProps) {
    if (st.hasRoundLoop()) {
      RoundLoop.setInnerCoordinatesAndAngles(st, generalProps, perBaseProps);
    } else if (st.hasTriangleLoop()) {
      TriangleLoop.setInnerCoordinatesAndAngles(st, generalProps, perBaseProps);
    }
  }
}

export {
  RoundLoop,
  TriangleLoop,
  FlatOutermostLoop,
  StemLayout,
};
