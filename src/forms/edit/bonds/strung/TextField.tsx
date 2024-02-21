import type { App } from 'App';

import type { Bond } from 'Forms/edit/bonds/strung/Bond';
import type { StrungText } from 'Draw/bonds/strung/StrungElement';

import { repositionStrungElementAtIndex } from 'Forms/edit/bonds/strung/repositionStrungElementAtIndex';

import { ValuesWrapper } from 'Values/ValuesWrapper';
import { isNullish } from '@rnacanvas/value-check';

import * as React from 'react';

import { TextInputField } from 'Forms/inputs/text/TextInputField';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

import { isBlank } from 'Parse/isBlank';

export type Nullish = null | undefined;

const baseInputId = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The strung elements to edit.
   */
  strungElements: StrungText[];

  /**
   * The bonds possessing the strung elements.
   */
  bonds: Bond[];

  /**
   * The index that the strung elements are at in the strung elements
   * arrays of the bonds possessing the strung elements.
   */
  strungElementsIndex: number;

  style?: React.CSSProperties;
};

/**
 * Allows editing of the text of strung text elements.
 */
export class TextField extends React.Component<Props> {
  state: {
    value: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  get inputId(): string {
    // make different for each strung elements index
    return baseInputId + this.props.strungElementsIndex;
  }

  get oldValue(): string | Nullish {
    let texts = new ValuesWrapper(
      this.props.strungElements.map(ele => ele.text.text())
    );

    return texts.commonValue;
  }

  get initialValue(): string {
    let oldValue = this.oldValue;
    return !isNullish(oldValue) ? oldValue : '';
  }

  render() {
    return (
      <TextInputField
        label='Text'
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.processValue()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.processValue();
          }
        }}
        input={{
          id: this.inputId,
          spellCheck: false,
          style: { minWidth: '49px', maxWidth: '28ch' },
        }}
        style={{
          marginTop: '8px', alignSelf: 'start', cursor: 'text',
          ...this.props.style,
        }}
      />
    );
  }

  processValue() {
    let newValue = this.state.value;
    // trim leading and trailing whitespace
    newValue = newValue.trim();

    if (isBlank(newValue)) {
      return;
    } else if (newValue == this.oldValue) {
      return;
    }

    this.props.app.pushUndo();
    this.props.strungElements.forEach(ele => {
      ele.text.text(newValue);
    });
    this.props.bonds.forEach(bond => {
      repositionStrungElementAtIndex({
        bond,
        index: this.props.strungElementsIndex,
      });
    });
    this.props.app.refresh();
  }
}
