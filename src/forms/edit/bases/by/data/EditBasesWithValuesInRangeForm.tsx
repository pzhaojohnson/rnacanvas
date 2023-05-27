import type { App } from 'App';

import { splitDataNonempty } from './splitDataNonempty';
import { selectBasesWithValuesInRange } from './selectBasesWithValuesInRange';

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { FieldDescription } from 'Forms/inputs/labels/FieldDescription';

import { DataField } from './DataField';
import { StartPositionField } from './StartPositionField';
import { MinValueField } from './MinValueField';
import { MaxValueField } from './MaxValueField';

import { DisplayableSequenceRange } from 'Forms/edit/sequences/DisplayableSequenceRange';

import { SelectButton } from './SelectButton';
import { ErrorMessage } from 'Forms/ErrorMessage';

import { DottedNote } from 'Forms/notes/DottedNote';

function DataFieldDescription() {
  return (
    <FieldDescription style={{ margin: '7px 0 0 16px' }} >
      ...a list of numbers (e.g., SHAPE reactivities)
    </FieldDescription>
  );
}

function StartPositionFieldDescription() {
  return (
    <FieldDescription style={{ margin: '6px 0 0 16px' }} >
      ...the sequence position where the data start
    </FieldDescription>
  );
}

function TrailingNotes(
  props: {
    style?: React.CSSProperties,
  },
) {
  return (
    <div style={props.style} >
      <DottedNote>
        Enter data for a consecutive set of bases in the drawing.
        (One value per base.)
      </DottedNote>
      <DottedNote style={{ marginTop: '9px' }} >
        Bases with values in the range of data to select for
        will be selected and may then be edited.
      </DottedNote>
      <DottedNote style={{ marginTop: '9px' }} >
        The range of data to select for is inclusive.
      </DottedNote>
      <DottedNote style={{ marginTop: '9px' }} >
        Come back to this form to select and edit bases
        with values in other ranges of data.
      </DottedNote>
    </div>
  );
}

export type Props = {
  app: App;

  unmount: () => void;
  history: FormHistoryInterface;
}

function formatData(data: string): string {
  let vs = splitDataNonempty(data);

  // one value per line
  let formattedData = vs.join('\n');

  // avoid a blank first line
  if (vs.length > 0) {
    formattedData += '\n'; // add trailing newline
  }

  return formattedData;
}

function constrainStartPosition(startPosition: string): string {
  let n = Number.parseFloat(startPosition);

  if (!Number.isFinite(n)) {
    return startPosition.trim(); // just trim whitespace
  }

  n = Math.floor(n); // make an integer
  return n.toString();
}

let prevInputs = {
  data: [0.5, 1.25, 0.25, -0.25, 0.75, -0.1, 0.9, -0.6, 0.8, 1.75, 0.6].join('\n') + '\n',
  startPosition: '1',
  minValue: '0',
  maxValue: '1',
};

export function EditBasesWithValuesInRangeForm(props: Props) {
  let sequence = props.app.strictDrawing.layoutSequence();

  let [data, setData] = useState(prevInputs.data);
  let [startPosition, setStartPosition] = useState(prevInputs.startPosition);
  let [minValue, setMinValue] = useState(prevInputs.minValue);
  let [maxValue, setMaxValue] = useState(prevInputs.maxValue);

  let processData = () => {
    setData(formatData(data));
  };

  let processStartPosition = () => {
    setStartPosition(constrainStartPosition(startPosition));
  };

  let processMinValue = () => {
    let v = minValue.trim();
    setMinValue(v);

    if (Number.parseFloat(v) > Number.parseFloat(maxValue)) {
      setMaxValue(v);
    }
  };

  let processMaxValue = () => {
    let v = maxValue.trim();
    setMaxValue(v);

    if (Number.parseFloat(v) < Number.parseFloat(minValue)) {
      setMinValue(v);
    }
  };

  let [errorMessage, setErrorMessage] = useState('');

  // to be incremented every time the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  // remember inputs between renderings
  useEffect(() => {
    return () => { prevInputs = { data, startPosition, minValue, maxValue }; }
  });

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Bases by Data'
      style={{ width: '409px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <DataField
          value={data}
          onChange={event => setData(event.target.value)}
          onBlur={() => processData()}
        />
        <DataFieldDescription />
        <StartPositionField
          value={startPosition}
          onChange={event => setStartPosition(event.target.value)}
          onBlur={() => processStartPosition()}
          onEnterKeyUp={() => processStartPosition()}
        />
        <StartPositionFieldDescription />
        <DisplayableSequenceRange sequence={sequence} style={{ margin: '9px 0 39px 4px' }} />
        <FieldLabel>Range of Data to Select For:</FieldLabel>
        <MinValueField
          value={minValue}
          onChange={event => setMinValue(event.target.value)}
          onBlur={() => processMinValue()}
          onEnterKeyUp={() => processMinValue()}
        />
        <MaxValueField
          value={maxValue}
          onChange={event => setMaxValue(event.target.value)}
          onBlur={() => processMaxValue()}
          onEnterKeyUp={() => processMaxValue()}
        />
        <SelectButton
          onClick={() => {
            try {
              let app = props.app;
              selectBasesWithValuesInRange({ app, data, startPosition, minValue, maxValue });
            } catch (error) {
              setErrorMessage(error instanceof Error ? error.message : String(error));
              setErrorMessageKey(errorMessageKey + 1);
            }
          }}
        />
        {!errorMessage ? null : (
          <ErrorMessage key={errorMessageKey} style={{ marginTop: '7px' }} >
            {errorMessage}
          </ErrorMessage>
        )}
        <TrailingNotes style={{ marginTop: errorMessage ? '17px' : '20px' }} />
      </div>
    </PartialWidthContainer>
  );
}
