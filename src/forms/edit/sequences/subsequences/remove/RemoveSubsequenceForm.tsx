import type { App } from 'App';

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { StartPositionField } from './StartPositionField';
import { EndPositionField } from './EndPositionField';
import { SequenceRange } from './SequenceRange';

import { RemoveButton } from './RemoveButton';
import { ErrorMessage } from './ErrorMessage';

import { TrailingNotes } from './TrailingNotes';

import { removeSubsequence } from './removeSubsequence';

export type Props = {
  unmount: () => void;
  history: FormHistoryInterface;

  /**
   * A reference to the whole app.
   */
  app: App;
}

function constrainPosition(value: string): string {
  let n = Number.parseFloat(value);

  if (!Number.isFinite(n)) {
    return value.trim(); // just trim whitespace
  }

  n = Math.floor(n); // make an integer
  return n.toString();
}

let prevInputs = {
  startPosition: '1',
  endPosition: '1',
};

export function RemoveSubsequenceForm(props: Props) {
  let drawing = props.app.drawing;

  if (drawing.sequences.length == 0) {
    console.error('Drawing has no sequences.');
  } else if (drawing.sequences.length > 1) {
    console.error('Drawing has multiple sequences.');
  }

  let [startPosition, setStartPosition] = useState(prevInputs.startPosition);
  let [endPosition, setEndPosition] = useState(prevInputs.endPosition);

  let [errorMessage, setErrorMessage] = useState('');

  // should be incremented every time the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  let processStartPosition = () => {
    let value = constrainPosition(startPosition);
    setStartPosition(value);

    // keep start position less than or equal to end position
    if (Number.parseFloat(value) > Number.parseFloat(endPosition)) {
      setEndPosition(value);
    }
  };

  let processEndPosition = () => {
    let value = constrainPosition(endPosition);
    setEndPosition(value);

    // keep end position greater than or equal to start position
    if (Number.parseFloat(value) < Number.parseFloat(startPosition)) {
      setStartPosition(value);
    }
  };

  // remember inputs
  useEffect(() => {
    return () => {
      prevInputs = { startPosition, endPosition };
    };
  });

  return (
    <PartialWidthContainer
      {...props}
      title='Remove Subsequence'
      style={{ width: '365px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <StartPositionField
          value={startPosition}
          onChange={event => setStartPosition(event.target.value)}
          onBlur={() => processStartPosition()}
          onEnterKeyUp={() => processStartPosition()}
        />
        <EndPositionField
          value={endPosition}
          onChange={event => setEndPosition(event.target.value)}
          onBlur={() => processEndPosition()}
          onEnterKeyUp={() => processEndPosition()}
        />
      </div>
      <SequenceRange sequence={drawing.sequences[0]} />
      <RemoveButton
        onClick={() => {
          let app = props.app;
          try {
            removeSubsequence({ app, startPosition, endPosition });
            setErrorMessage('');
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : String(error));
            setErrorMessageKey(errorMessageKey + 1);
          }
        }}
      />
      {errorMessage ? <ErrorMessage key={errorMessageKey} >{errorMessage}</ErrorMessage> : null}
      <TrailingNotes />
    </PartialWidthContainer>
  );
}
