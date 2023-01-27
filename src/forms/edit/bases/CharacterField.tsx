import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

import { ValuesWrapper } from 'Values/ValuesWrapper';

import * as React from 'react';

import { TextInputField } from 'Forms/inputs/text/TextInputField';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

class BaseWrapper {
  /**
   * The wrapped base.
   */
  readonly base: Base;

  constructor(base: Base) {
    this.base = base;
  }

  /**
   * The character of a base is defined as the text content of its text
   * element, which is expected to be a single character.
   */
  get character(): string {
    // might be best to simply return the text content
    // (even if is not actually a single character)
    return this.base.text.text();
  }

  set character(character: string) {
    if (character.length == 0) {
      return; // ignore empty strings
    }

    character = character.charAt(0); // ignore any trailing characters

    // remember center coordinates
    let textBBox = this.base.text.bbox();
    let textCenter = { x: textBBox.cx, y: textBBox.cy };

    this.base.text.text(character);

    // recenter
    this.base.text.center(textCenter.x, textCenter.y);
  }
}

class BasesWrapper {
  /**
   * The wrapped bases.
   */
  readonly bases: BaseWrapper[];

  constructor(bases: Base[]) {
    this.bases = bases.map(b => new BaseWrapper(b));
  }

  get length(): number {
    return this.bases.length;
  }

  /**
   * Returns undefined if the bases do not all have the same character.
   */
  get commonCharacter(): string | undefined {
    let characters = new ValuesWrapper(
      this.bases.map(b => b.character)
    );
    return characters.commonValue;
  }

  set commonCharacter(commonCharacter: string | undefined) {
    if (commonCharacter == undefined) {
      return; // ignore undefined values
    }

    this.bases.forEach(b => {
      b.character = commonCharacter;
    });
  }
}

// keep stable to help with refocusing the input element on app refresh
const inputId = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The bases to edit.
   */
  bases: Base[];
}

type State = {
  value: string;
}

export class CharacterField extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    }
  }

  get initialValue(): string {
    let bases = new BasesWrapper(this.props.bases);
    return bases.commonCharacter ?? '';
  }

  render() {
    return (
      <TextInputField
        label='Character'
        value={this.state.value}
        onChange={event => {
          this.setState({ value: event.target.value });
        }}
        onBlur={() => {
          this.submit();
        }}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        input={{
          id: inputId,
          spellCheck: false,
          style: { minWidth: '2ch', textAlign: 'center' },
        }}
        style={{ marginBottom: '8px', alignSelf: 'start' }}
      />
    );
  }

  submit() {
    try {
      let bases = new BasesWrapper(this.props.bases);

      if (bases.length == 0) {
        throw new Error();
      }

      let value = this.state.value;
      value = value.trim(); // remove leading and trailing whitespace

      if (value.length == 0) {
        throw new Error();
      } else if (value == this.initialValue) {
        throw new Error();
      }

      this.props.app.pushUndo();
      bases.commonCharacter = value;
      this.props.app.refresh();
    } catch {
      this.setState({ value: this.initialValue });
    }
  }
}
