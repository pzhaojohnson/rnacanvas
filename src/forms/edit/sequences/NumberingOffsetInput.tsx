import type { App } from 'App';

import type { Sequence } from 'Draw/sequences/Sequence';

import { numberingOffset as deriveNumberingOffset } from 'Draw/sequences/numberingOffset';

import { updateBaseNumberings } from 'Draw/sequences/updateBaseNumberings';
import { orientBaseNumberings } from 'Draw/bases/numberings/orient';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

import { isBlank } from 'Parse/isBlank';

class SequenceWrapper {
  /**
   * The wrapped sequence.
   */
  readonly sequence: Sequence;

  constructor(sequence: Sequence) {
    this.sequence = sequence;
  }

  get numberingOffset(): number | undefined {
    return deriveNumberingOffset(this.sequence);
  }

  set numberingOffset(numberingOffset: number | undefined) {
    if (numberingOffset == undefined) {
      return; // ignore undefined values
    }

    // if there are no base numberings present
    if (this.sequence.bases.every(b => !b.numbering)) {
      let offset = 0;
      let increment = 20; // default value

      // ensure at least one base gets numbered
      let anchor = Math.min(increment, this.sequence.length);

      // add some base numberings
      updateBaseNumberings(this.sequence, { offset, increment, anchor });
    }

    // only edit preexisting base numberings
    this.sequence.bases.forEach((b, i) => {
      let p = i + 1; // the position of the base in the sequence
      if (b.numbering) {
        b.numbering.text.text(`${p + numberingOffset}`);
      }
    });
  }
}

// keep stable to help with refocusing the input element on app refresh
const id = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The sequence to edit.
   */
  sequence: Sequence;
}

type State = {
  value: string;
}

export class NumberingOffsetInput extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  get initialValue(): string {
    let sequence = new SequenceWrapper(this.props.sequence);
    return sequence.numberingOffset?.toString() ?? '';
  }

  render() {
    return (
      <TextInput
        id={id}
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
        spellCheck={false}
        style={{ minWidth: '61px' }}
      />
    );
  }

  submit() {
    try {
      let sequence = new SequenceWrapper(this.props.sequence);

      if (isBlank(this.state.value)) {
        throw new Error();
      }

      let numberingOffset = Number.parseFloat(this.state.value);

      if (!Number.isFinite(numberingOffset)) {
        throw new Error();
      }

      numberingOffset = Math.floor(numberingOffset); // make an integer

      if (numberingOffset == sequence.numberingOffset) {
        throw new Error();
      }

      // update the numbering offset
      this.props.app.pushUndo();
      sequence.numberingOffset = numberingOffset;
      orientBaseNumberings(this.props.app.strictDrawing.drawing);
      this.props.app.refresh();
    } catch {
      this.setState({ value: this.initialValue });
    }
  }
}
