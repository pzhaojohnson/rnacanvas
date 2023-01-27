import type { App } from 'App';
import { Base } from 'Draw/bases/Base';

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { TextInputField } from 'Forms/inputs/text/TextInputField';

import { SubmitButton as _SubmitButton } from 'Forms/buttons/SubmitButton';
import { ErrorMessage } from 'Forms/ErrorMessage';

import { DottedNote } from 'Forms/notes/DottedNote';

function CharacterField(
  props: {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  },
) {
  return (
    <TextInputField
      label='Character'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      input={{
        spellCheck: false,
        style: { minWidth: '2ch', textAlign: 'center' },
      }}
      style={{ alignSelf: 'flex-start' }}
    />
  );
}

function SubmitButton(
  props: {
    onClick: () => void,
  },
) {
  return (
    <_SubmitButton
      onClick={props.onClick}
      style={{ marginTop: '38px', alignSelf: 'flex-start' }}
    >
      Select
    </_SubmitButton>
  );
}

export type Props = {
  app: App;

  unmount: () => void;
  history: FormHistoryInterface;
}

let prevCharacter = 'A';

function constrainCharacter(c: string): string {

  // no extra whitespace
  c = c.trim();

  // limit to one character
  if (c.length > 1) {
    return c.charAt(0);
  } else {
    return c;
  }
}

export function EditBasesByCharacterForm(props: Props) {
  let [character, setCharacter] = useState(prevCharacter);

  let [errorMessage, setErrorMessage] = useState('');

  // should be incremented every time the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  useEffect(() => {
    return () => { prevCharacter = character; }
  });

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Bases by Character'
      style={{ width: '360px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <CharacterField
          value={character}
          onChange={event => setCharacter(event.target.value)}
          onBlur={() => setCharacter(constrainCharacter(character))}
          onKeyUp={event => {
            if (event.key.toLowerCase() == 'enter') {
              setCharacter(constrainCharacter(character));
            }
          }}
        />
        <SubmitButton
          onClick={() => {
            try {
              if (character.length == 0) {
                throw new Error('Specify a character.');
              }

              let drawing = props.app.strictDrawing.drawing;
              let bases = drawing.bases().filter(b => b.text.text() == character);

              if (bases.length == 0) {
                throw new Error('No bases have the entered character.');
              }

              props.unmount();
              let drawingInteraction = props.app.strictDrawingInteraction;
              drawingInteraction.currentTool = drawingInteraction.editingTool;
              drawingInteraction.editingTool.editingType = Base;
              drawingInteraction.editingTool.select(bases);
              drawingInteraction.editingTool.renderForm();

            } catch (error) {
              setErrorMessage(error instanceof Error ? error.message : String(error));
              setErrorMessageKey(errorMessageKey + 1);
            }
          }}
        />
        {!errorMessage ? null : (
          <ErrorMessage key={errorMessageKey} style={{ marginTop: '6px' }} >
            {errorMessage}
          </ErrorMessage>
        )}
        <DottedNote style={{ marginTop: '18px' }} >
          Bases with the specified character will be selected and may then be edited.
        </DottedNote>
        <DottedNote style={{ marginTop: '10px' }} >
          Is case-sensitive.
        </DottedNote>
      </div>
    </PartialWidthContainer>
  );
}
