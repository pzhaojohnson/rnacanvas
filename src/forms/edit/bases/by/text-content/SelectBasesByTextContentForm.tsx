import * as React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';

import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';

import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { TextInput as BasicTextInput } from 'Forms/inputs/text/TextInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { SelectButton } from './subcomponents/SelectButton';

import { ErrorMessage } from 'Forms/ErrorMessage';

import { WhatHappensNote } from './subcomponents/WhatHappensNote';

import { CaseSensitivityNote } from './subcomponents/CaseSensitivityNote';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

/**
 * Creates the text content for an error message from a thrown value.
 */
function createErrorMessageTextContent(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}

/**
 * A request to select for editing bases with the specified text
 * content.
 */
export interface SelectRequest {
  /**
   * The specified text content to select bases by.
   */
  textContent: string;
};

export interface SelectRequestHandler {
  /**
   * If nothing is wrong with the request, should select bases with
   * the specified text content for editing within the app.
   *
   * If something is wrong with the request, should throw an error
   * with a helpful message that will be shown to the user.
   */
  handle(request: SelectRequest): void | never;
}

export type Props = {
  /**
   * A callback to close this select-bases-by-text-content form.
   */
  close: () => void;

  /**
   * For going backwards and forwards between forms.
   */
  history: FormHistoryInterface;

  selectRequestHandler: SelectRequestHandler;
};

/**
 * Helps with retrieving the text content input element for testing
 * purposes.
 */
export const textContentInputElementId = generateHTMLCompatibleUUID();

/**
 * State that is remembered between mountings.
 */
let previousState = {
  textContent: 'A',
};

export function SelectBasesByTextContentForm(props: Props) {
  // the input text content to select bases with
  let [textContent, setTextContent] = useState(previousState.textContent);

  let [errorMessageTextContent, setErrorMessageTextContent] = useState('');

  // to be incremented every time the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  useEffect(() => {
    return () => {
      previousState = { textContent };
    }
  });

  let textContentField = (
    <FieldLabel style={{ alignSelf: 'start', cursor: 'text' }}>
      <BasicTextInput
        id={textContentInputElementId}
        value={textContent}
        onChange={event => setTextContent(event.target.value)}
        spellCheck={false}
      />
      <span style={{ paddingLeft: '8px' }} >
        Text
      </span>
    </FieldLabel>
  );

  let selectButton = (
    <SelectButton
      onClick={() => {
        try {
          props.selectRequestHandler.handle({ textContent });
        } catch (error) {
          setErrorMessageTextContent(createErrorMessageTextContent(error));
          setErrorMessageKey(errorMessageKey + 1);
        }
      }}
    />
  );

  // only render if there is an error to show
  let errorMessage = !errorMessageTextContent ? null : (
    <ErrorMessage
      key={errorMessageKey}
      style={{ marginTop: '7px' }}
    >
      {errorMessageTextContent}
    </ErrorMessage>
  );

  let whatHappensNote = <WhatHappensNote />;

  let caseSensitivityNote = <CaseSensitivityNote />;

  return (
    <PartialWidthContainer
      unmount={props.close}
      history={props.history}
      title='Bases By Text'
      style={{ width: '360px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        {textContentField}
        {selectButton}
        {errorMessage}
        {whatHappensNote}
        {caseSensitivityNote}
      </div>
    </PartialWidthContainer>
  );
}
