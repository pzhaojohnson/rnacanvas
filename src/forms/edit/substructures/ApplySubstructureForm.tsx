import type { App } from 'App';
import { numberingOffset } from 'Draw/sequences/numberingOffset';

import { isBlank } from 'Parse/isBlank';
import { parseDotBracket } from 'Parse/parseDotBracket';

import { applySecondarySubstructure } from 'Draw/strict/applySecondarySubstructure';
import { applyTertiarySubstructure } from 'Draw/strict/applyTertiarySubstructure';

import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { TextAreaField } from 'Forms/inputs/text/TextAreaField';
import { FieldDescription } from 'Forms/inputs/labels/FieldDescription';
import { TextInputField } from 'Forms/inputs/text/TextInputField';
import { DisplayableSequenceRange } from 'Forms/edit/sequences/DisplayableSequenceRange';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';
import { SubmitButton as _SubmitButton } from 'Forms/buttons/SubmitButton';
import { ErrorMessage } from 'Forms/ErrorMessage';
import { DottedNote } from 'Forms/notes/DottedNote';

function SubstructureField(
  props: {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  },
) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} >
      <TextAreaField
        label='Substructure'
        value={props.value}
        onChange={props.onChange}
        textArea={{
          rows: 11, spellCheck: false,
          style: {
            fontFamily: '"Courier Prime", monospace', fontSize: '15px',
            fontWeight: '400', color: 'hsl(0, 0%, 5%)', padding: '5px 7px',
          },
        }}
      />
      <FieldDescription style={{ margin: '6px 0 0 16px' }} >
        ...in dot-bracket notation "(((....)))"
      </FieldDescription>
    </div>
  );
}

function StartPositionField(
  props: {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  },
) {
  return (
    <TextInputField
      label='Start Position of Substructure'
      value={props.value}
      onChange={props.onChange}
      input={{
        spellCheck: false,
        style: { minWidth: '7ch' },
      }}
      style={{ margin: '38px 8px 0 0', alignSelf: 'flex-start' }}
    />
  );
}

function MaintainTertiaryBondsField(
  props: {
    checked: boolean,
    onChange: (event: { target: { checked: boolean } }) => void,
  },
) {
  return (
    <CheckboxField
      label='Maintain Preexisting Tertiary Bonds'
      checked={props.checked}
      onChange={props.onChange}
      style={{ marginTop: '28px', alignSelf: 'flex-start' }}
    />
  );
}

function SubmitButton(
  props: {
    onClick: () => void;
  }
) {
  return (
    <div style={{ marginTop: '40px' }} >
      <_SubmitButton
        onClick={props.onClick}
      >
        Apply
      </_SubmitButton>
    </div>
  );
}

function ExplanatoryNote() {
  return (
    <div style={{ marginTop: '19px' }} >
      <DottedNote>
        The substructure will be applied beginning at
        the provided start position in the sequence.
      </DottedNote>
    </div>
  );
}

function TertiaryBondsNote() {
  return (
    <div style={{ marginTop: '12px' }} >
      <DottedNote>
        Preexisting tertiary bonds can be maintained
        or removed when applying the substructure.
      </DottedNote>
    </div>
  );
}

export type Props = {
  unmount: () => void;
  history: FormHistoryInterface;

  // a reference to the whole app
  app: App;
};

type Inputs = {

  // dot-bracket notation of the substructure to apply
  substructure: string;

  // the start position of the substructure in the layout sequence
  // of the strict drawing of the app
  startPosition: string;

  // controls whether to remove preexisting tertiary bonds binding
  // bases in the substructure
  removeTertiaryBonds: boolean;
}

interface State extends Inputs {
  errorMessage?: string;

  // to be updated every time the error message is set
  // (allows for error message animations to be played
  // every time the error message is set)
  errorMessageKey: number;
}

function deepCopyInputs(inputs: Inputs | State): Inputs {
  return {
    substructure: inputs.substructure,
    startPosition: inputs.startPosition,
    removeTertiaryBonds: inputs.removeTertiaryBonds,
    // omit any error message
  };
}

let prevInputs: Inputs = {
  substructure: '',
  startPosition: '1',
  removeTertiaryBonds: true,
};

export class ApplySubstructureForm extends React.Component<Props> {
  static key = uuidv4();

  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      ...deepCopyInputs(prevInputs),
      errorMessageKey: 0,
    };
  }

  componentWillUnmount() {
    prevInputs = deepCopyInputs(this.state);
  }

  render() {
    return (
      <PartialWidthContainer
        unmount={this.props.unmount}
        history={this.props.history}
        title='Apply Substructure'
        style={{ width: '390px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <SubstructureField
            value={this.state.substructure}
            onChange={event => this.setState({ substructure: event.target.value })}
          />
          <StartPositionField
            value={this.state.startPosition}
            onChange={event => this.setState({ startPosition: event.target.value })}
          />
          <div style={{ height: '9px' }} />
          <DisplayableSequenceRange
            sequence={this.props.app.strictDrawing.layoutSequence()}
          />
          <MaintainTertiaryBondsField
            checked={!this.state.removeTertiaryBonds}
            onChange={event => this.setState({ removeTertiaryBonds: !event.target.checked })}
          />
          <SubmitButton
            onClick={() => {
              let errorMessage;
              try {
                this.submit(this.state);
                errorMessage = '';
              } catch (error) {
                errorMessage = error instanceof Error ? error.message : String(error);
              }

              this.setState({
                errorMessage,
                errorMessageKey: this.state.errorMessageKey + 1,
              });
            }}
          />
          {!this.state.errorMessage ? null : (
            <ErrorMessage key={this.state.errorMessageKey} style={{ marginTop: '7px' }} >
              {this.state.errorMessage}
            </ErrorMessage>
          )}
          <ExplanatoryNote />
          <TertiaryBondsNote />
        </div>
      </PartialWidthContainer>
    );
  }

  submit(inputs: Inputs): void | never {
    let parsedDotBracket = parseDotBracket(inputs.substructure);
    if (isBlank(inputs.substructure)) {
      throw new Error('Substructure is empty.');
    } else if (parsedDotBracket == null) {
      throw new Error('Dot-bracket notation is invalid.');
    }

    let startPosition = Number.parseFloat(inputs.startPosition);
    if (isBlank(inputs.startPosition)) {
      throw new Error('Specify a start position.');
    } else if (!Number.isFinite(startPosition)) {
      throw new Error('Start position must be a number.');
    }

    let sequence = this.props.app.strictDrawing.layoutSequence();
    let no = numberingOffset(sequence);
    if (no != undefined) {
      startPosition -= no;
    }

    let endPosition = startPosition + parsedDotBracket.secondaryPartners.length - 1;

    if (startPosition < 1 || startPosition > sequence.length) {
      throw new Error('Start position is out of range.');
    } else if (endPosition > sequence.length) {
      throw new Error('Substructure goes out of range.');
    }

    this.props.app.pushUndo();
    let strictDrawing = this.props.app.strictDrawing;
    applySecondarySubstructure(strictDrawing, {
      partners: parsedDotBracket.secondaryPartners,
      startPosition,
    });
    applyTertiarySubstructure(strictDrawing, {
      partners: parsedDotBracket.tertiaryPartners,
      startPosition,
    }, { removeTertiaryBonds: inputs.removeTertiaryBonds });
    this.props.app.refresh();
  }
}
