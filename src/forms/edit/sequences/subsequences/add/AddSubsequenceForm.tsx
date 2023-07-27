import type { App } from 'App';
import type { Sequence } from 'Draw/sequences/Sequence';

import { insertSubsequence } from './insertSubsequence';

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import styles from './AddSubsequenceForm.css';

import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { SubsequenceField } from './SubsequenceField';

import { OptionsToggle } from './OptionsToggle';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';

import { AppendSubsequenceField } from './AppendSubsequenceField';
import { PositionToInsertAtField } from './PositionToInsertAtField';
import { DisplayableSequenceRange } from 'Forms/edit/sequences/DisplayableSequenceRange';

import { IncludeSubstructureField } from './IncludeSubstructureField';
import { SubstructureTextArea } from './SubstructureTextArea';

import { AddButton } from './AddButton';
import { ErrorMessage } from './ErrorMessage';

import { InsertSubsequenceNote } from './TrailingNotes';
import { BaseNumberingNote } from './TrailingNotes';

import { DrawingOriginChecker } from 'Draw/origin/DrawingOriginChecker';

import { RNA2DSchemaOriginMessage } from './subcomponents/RNA2DSchemaOriginMessage';

let drawingOriginChecker = new DrawingOriginChecker();

function constrainPositionToInsertAt(positionToInsertAt: string): string {
  let n = Number.parseFloat(positionToInsertAt);

  if (!Number.isFinite(n)) {
    return positionToInsertAt.trim(); // just trim whitespace
  }

  n = Math.floor(n); // make an integer
  return n.toString();
}

let prevState = {
  subsequence: '',

  showSequenceParsingOptions: false,
  ignoreNumbers: true,
  ignoreNonAUGCTLetters: false,
  ignoreNonAlphanumerics: true,

  appendSubsequence: false,
  positionToInsertAt: '1',

  includeSubstructure: false,
  substructure: '',
};

export type Props = {
  unmount: () => void;
  history: FormHistoryInterface;

  // a reference to the whole app
  app: App;
}

export function AddSubsequenceForm(props: Props) {
  let drawing = props.app.drawing;

  if (drawing.sequences.length == 0) {
    console.error('Drawing has no sequences.');
  } else if (drawing.sequences.length > 1) {
    console.error('Drawing has multiple sequences.');
    console.error('This form can only add subsequences to the first sequence of the drawing.');
  }

  let sequence: Sequence | undefined = drawing.sequences[0];

  let [subsequence, setSubsequence] = useState(prevState.subsequence);

  let [showSequenceParsingOptions, setShowSequenceParsingOptions] = useState(prevState.showSequenceParsingOptions);
  let [ignoreNumbers, setIgnoreNumbers] = useState(prevState.ignoreNumbers);
  let [ignoreNonAUGCTLetters, setIgnoreNonAUGCTLetters] = useState(prevState.ignoreNonAUGCTLetters);
  let [ignoreNonAlphanumerics, setIgnoreNonAlphanumerics] = useState(prevState.ignoreNonAlphanumerics);

  let [appendSubsequence, setAppendSubsequence] = useState(prevState.appendSubsequence);
  let [positionToInsertAt, setPositionToInsertAt] = useState(prevState.positionToInsertAt);

  let [includeSubstructure, setIncludeSubstructure] = useState(prevState.includeSubstructure);
  let [substructure, setSubstructure] = useState(prevState.substructure);

  let processPositionToInsertAt = () => {
    setPositionToInsertAt(constrainPositionToInsertAt(positionToInsertAt));
  };

  let [errorMessage, setErrorMessage] = useState('');

  // to be incremented every time the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  // remember certain aspects of state between renderings (such as inputs)
  useEffect(() => {
    return () => {
      prevState = {
        subsequence,
        showSequenceParsingOptions,
        ignoreNumbers, ignoreNonAUGCTLetters, ignoreNonAlphanumerics,
        appendSubsequence, positionToInsertAt,
        includeSubstructure, substructure,
      };
    };
  });

  if (drawingOriginChecker.originIsAnRNA2DSchema(drawing)) {
    return (
      <PartialWidthContainer
        unmount={props.unmount}
        history={props.history}
        title='Add Subsequence'
        style={{ width: '413px' }}
      >
        <RNA2DSchemaOriginMessage />
      </PartialWidthContainer>
    );
  }

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Add Subsequence'
      style={{ width: '408px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <SubsequenceField
          value={subsequence}
          onChange={event => setSubsequence(event.target.value)}
        />
        <OptionsToggle
          onClick={() => setShowSequenceParsingOptions(!showSequenceParsingOptions)}
        />
        {!showSequenceParsingOptions ? null : (
          <div style={{ margin: '9px 0px 0px 18px', display: 'flex', flexDirection: 'column' }} >
            <CheckboxField
              label='Ignore Numbers'
              checked={ignoreNumbers}
              onChange={event => setIgnoreNumbers(event.target.checked)}
              style={{ alignSelf: 'start' }}
            />
            <CheckboxField
              label='Ignore Non-AUGCT Letters'
              checked={ignoreNonAUGCTLetters}
              onChange={event => setIgnoreNonAUGCTLetters(event.target.checked)}
              style={{ margin: '6px 0 0 0', alignSelf: 'start' }}
            />
            <CheckboxField
              label='Ignore Non-Alphanumerics'
              checked={ignoreNonAlphanumerics}
              onChange={event => setIgnoreNonAlphanumerics(event.target.checked)}
              style={{ margin: '6px 0 0 0', alignSelf: 'start' }}
            />
          </div>
        )}
        <IncludeSubstructureField
          checked={includeSubstructure}
          onChange={event => setIncludeSubstructure(event.target.checked)}
        />
        {!includeSubstructure ? null : (
          <SubstructureTextArea
            value={substructure}
            onChange={event => setSubstructure(event.target.value)}
          />
        )}
        <AppendSubsequenceField
          checked={appendSubsequence}
          onChange={event => setAppendSubsequence(event.target.checked)}
        />
        {appendSubsequence ? null : (
          <div style={{ margin: '10px 0 0 0', display: 'flex', flexDirection: 'column' }} >
            <PositionToInsertAtField
              value={positionToInsertAt}
              onChange={event => setPositionToInsertAt(event.target.value)}
              onBlur={() => processPositionToInsertAt()}
              onKeyUp={event => {
                if (event.key.toLowerCase() == 'enter') {
                  processPositionToInsertAt();
                }
              }}
            />
          </div>
        )}
        <div style={{ height: '10px' }} />
        {!sequence ? null : <DisplayableSequenceRange sequence={sequence} style={{ marginLeft: '1px' }} />}
        <AddButton
          onClick={() => {
            try {
              let app = props.app;
              insertSubsequence({
                app,
                subsequence,
                ignoreNumbers, ignoreNonAUGCTLetters, ignoreNonAlphanumerics,
                positionToInsertAt: appendSubsequence ? 'append' : positionToInsertAt,
                includeSubstructure, substructure,
              });
              setErrorMessage('');
            } catch (error) {
              setErrorMessage(error instanceof Error ? error.message : String(error));
              setErrorMessageKey(errorMessageKey + 1);
            }
          }}
        />
        {!errorMessage ? null : (
          <ErrorMessage key={errorMessageKey} >{errorMessage}</ErrorMessage>
        )}
        {!appendSubsequence ? <InsertSubsequenceNote /> : <div style={{ height: '12px' }} />}
        <BaseNumberingNote />
      </div>
    </PartialWidthContainer>
  );
}
