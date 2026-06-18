import * as SVG from '@svgdotjs/svg.js';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';
import type { CSSProperties } from 'Forms/inputs/text/TextInput';
import { App } from 'App';
import { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';
import { Base } from 'Draw/bases/Base';
import { addCircleOutline, removeCircleOutline } from 'Draw/bases/outlines/circle/add';
import { setValues as setValuesOutline, values } from 'Draw/bases/outlines/circle/values';
import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';
import { addStrungElementToBond, removeStrungElementFromBond } from 'Draw/bonds/strung/addToBond';
import { curveOfBond } from 'Draw/bonds/strung/curveOfBond';
import { curveLengthOfBond } from 'Draw/bonds/strung/curveLengthOfBond';
import { createStrungFromStrung } from 'Draw/bonds/strung/create';
import { StrungElement } from 'Draw/bonds/strung/StrungElement';
import { svgElementOfStrungElement } from '../bonds/strung/svgElementOfStrungElement';
import { setValues as setValuesBase } from 'Draw/bases/values';

let NonCopyableBaseAttributes = [
  "id", "x", "y"
];
let NonCopyableBondAttributes = [
  "id", "x1", "x2", "y1", "y2"
];
let NonCopyableStrungAttributes = [
  "id", "cx", "cy", "d", "x", "y"
];

class BaseWrapper {
  readonly base: Base;

  constructor(base: Base | undefined) {
    if (typeof base == 'undefined') {
      throw new Error();
    }
    this.base = base;
  }

  get text(): SVG.Text {
    return this.base.text;
  }

  get outline(): CircleBaseOutline | undefined {
    return this.base.outline;
  }

  get circle(): SVG.Circle | undefined {
    return this.outline?.circle;
  }
}

class StrungWrapper {
  readonly strung: StrungElement;

  constructor(strung: StrungElement | undefined) {
    if (typeof strung == 'undefined') {
      throw new Error();
    }
    this.strung = strung;
  }

  get element(): SVG.Element {
    if (this.strung.type == 'StrungText') {
      return this.strung.text;
    } else if (this.strung.type == 'StrungCircle') {
      return this.strung.circle;
    } else {
      return this.strung.path;
    }
  }
}

export type Props = {
  app: App;
  id?: string;

  /**
   * The elements to edit.
   */
  bases?: Base[];
  bonds?: PrimaryBond[];

  /**
   * Called immediately after editing the elements.
   */
  onEdit?: () => void;

  /**
   * Called immediately before editing the elements.
   */
  onBeforeEdit?: () => void;

  style?: CSSProperties;
};

export class CopyStyleInput extends React.Component<Props> {
  state: {
    value: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <TextInput
        id={this.props.id}
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.submit()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        spellCheck={false}
        style={{
          minWidth: '49px',
          ...this.props.style,
        }}
      />
    );
  }

  copyBaseStyle(idx_copy: number) {
    if (idx_copy < 1 || idx_copy > this.props.app.strictDrawing.drawing.numBases) {  // idx_copy goes from 1 to numBases to make it easier for the user.
      return; // don't edit the SVG elements
    }
    let copyBase = this.props.app.strictDrawing.drawing.getBaseAtOverallPosition(idx_copy);
    let copyBaseWrapped = new BaseWrapper(copyBase);

    this.props.bases?.forEach(base => {
      // Reset the base to the default values. This is necessary because in saved files, fill is not an attribute of the base by default.
      setValuesBase(base, Base.recommendedDefaults);

      // Change the text attributes
      Object.keys(copyBaseWrapped.text.attr()).forEach(function (attributeName) {
        var attributeValue = copyBaseWrapped.text.attr(attributeName);

        // We don't want to copy the id attribute, or the center of the box:
        // Copying the ID means linking the style of both. I don't know if that's useful in any way. TODO: Button to link styles?
        if (NonCopyableBaseAttributes.includes(attributeName)) {
          return;
        }
        base.text.attr(attributeName, attributeValue);
      });

      // Change the outline attributes
      if (base.outline) {
        // Remove whatever this base has
        removeCircleOutline(base);
      }

      if (copyBaseWrapped.outline) {
        if (!base.outline) {
          addCircleOutline(base);
        }
        if (base.outline) {
          setValuesOutline(base.outline, values(copyBaseWrapped.outline));
          base.outline.sendToBack();
        }
      }
    });
  }

  copyBondStyle(idx_copy: number) {
    if (idx_copy < 1 || idx_copy > this.props.app.strictDrawing.drawing.primaryBonds.length) {
      return; // don't edit the SVG elements
    }
    // They have line: SVG.Line, strungElements: StrungElement[] and basePadding: number
    let copyBond = this.props.app.strictDrawing.drawing.primaryBonds[idx_copy - 1];

    this.props.bonds?.forEach(bond => {
      // Change the line attributes
      Object.keys(copyBond.line.attr()).forEach(function (attributeName) {
        var attributeValue = copyBond.line.attr(attributeName);

        // We don't want to copy the id attribute, or the coordinates of the line:
        // Copying the ID means linking the style of both. I don't know if that's useful in any way.
        if (NonCopyableBondAttributes.includes(attributeName)) {
          return;
        }
        bond.line.attr(attributeName, attributeValue);
      });

      // Change the base padding:
      bond.basePadding1 = copyBond.basePadding1;
      bond.basePadding2 = copyBond.basePadding2;

      // Change the strungElements attributes
      // Remove whatever this bond has
      bond.strungElements.forEach(function (strungElement) {
        removeStrungElementFromBond({ bond, strungElement });
      });

      // Add whatever the copy has      
      copyBond.strungElements.forEach(function (strungElement) {
        let curve = curveOfBond(bond);
        let curveLength = curveLengthOfBond(bond);
        let newStrung: StrungElement | undefined;

        if (curve) {
          newStrung = createStrungFromStrung(strungElement, { curve, curveLength });
        }

        let strungElementWrapped = new StrungWrapper(newStrung);

        // Edit the attributes of the strung element
        let svgCopyElements = svgElementOfStrungElement(strungElement);
        Object.keys(svgCopyElements.attr()).forEach(function (attributeName) {
          var attributeValue = svgCopyElements.attr(attributeName);

          // Copying the ID means linking the style of both. I don't know if that's useful in any way.
          if (NonCopyableStrungAttributes.includes(attributeName)) {
            return;
          }
          strungElementWrapped.element.attr(attributeName, attributeValue);
        });
        
        addStrungElementToBond({ bond, strungElement: strungElementWrapped.strung });
        
      });
      console.log(bond.strungElements);
    });
  }

  submit() {
    let newValue = Number.parseFloat(this.state.value);
    if (Number.isNaN(newValue)) {
      return; // don't edit the SVG elements
    }

    if (this.props.onBeforeEdit) {
      this.props.onBeforeEdit();
    }

    if (this.props.bases) {
      this.copyBaseStyle(newValue);
    } else if (this.props.bonds) {
      this.copyBondStyle(newValue);
    }

    // Now we should recenter the text element in case it was resized:
    if (this.props.onEdit) {
      this.props.onEdit();
    }
  }
}
