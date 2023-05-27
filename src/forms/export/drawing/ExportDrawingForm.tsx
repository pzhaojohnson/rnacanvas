import type { App } from 'App';

import { isBlank } from 'Parse/isBlank';

import { pointsToPixels } from 'Export/units';

import * as React from 'react';
import { useState, useEffect } from 'react';

import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { TextInputField } from 'Forms/inputs/text/TextInputField';
import { FieldDescription } from 'Forms/inputs/labels/FieldDescription';

import { SubmitButton } from 'Forms/buttons/SubmitButton';
import { ErrorMessage } from 'Forms/ErrorMessage';

import { DottedNote } from 'Forms/notes/DottedNote';

// the underlying exportDrawing function
import { exportDrawing as _exportDrawing } from 'Export/export';

/**
 * Exports the drawing of the app in SVG or PPTX format.
 */
export function exportDrawing(
  args: {
    app: App, // a reference to the whole app
    format: 'svg' | 'pptx', // the format to export in
    scalingFactor: string,
  },
): void | never {
  let scalingFactor = Number.parseFloat(args.scalingFactor);

  if (isBlank(args.scalingFactor)) {
    scalingFactor = 1;
  } else if (!Number.isFinite(scalingFactor)) {
    throw new Error('Scaling factor must be a number.');
  } else if (scalingFactor <= 0) {
    throw new Error('Scaling factor must be positive.');
  }

  if (args.format == 'pptx') {
    scalingFactor *= pointsToPixels(1);
  }

  try {
    _exportDrawing(args.app.strictDrawing.drawing, {
      name: document.title ? document.title : 'Drawing',
      format: args.format,
      scale: scalingFactor,
    });
  } catch {
    throw new Error('Unexpected error exporting the drawing.');
  }
}

function ScalingFactorField(
  props: {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  },
) {
  return (
    <TextInputField
      label='Scaling Factor'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      input={{ spellCheck: false, style: { minWidth: '62px' } }}
      style={{ marginRight: '8px', alignSelf: 'flex-start' }}
    />
  );
}

function ExportButton(
  props: {
    onClick: () => void,
  },
) {
  return (
    <SubmitButton
      onClick={props.onClick}
      style={{ marginTop: '35px' }}
    >
      Export
    </SubmitButton>
  );
}

function PptxNotes() {
  return (
    <div style={{ marginTop: '24px' }} >
      <DottedNote>
        Exported PPTX files require PowerPoint 2016 or later to open.
      </DottedNote>
      <DottedNote style={{ marginTop: '12px' }} >
        Large structures may take a while to export.
      </DottedNote>
    </div>
  );
}

export type Props = {
  app: App;

  // the format to export the drawing in
  format: 'svg' | 'pptx';

  unmount: () => void;
  history: FormHistoryInterface;
}

let prevInputs = {
  scalingFactor: '1',
};

export function ExportDrawingForm(props: Props) {
  let [scalingFactor, setScalingFactor] = useState(prevInputs.scalingFactor);

  let processScalingFactor = () => {
    setScalingFactor(scalingFactor.trim());
  };

  let [errorMessage, setErrorMessage] = useState('');

  // should be incremented every time the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  // remember inputs
  useEffect(() => {
    return () => {
      prevInputs = { scalingFactor };
    };
  });

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title={`Export ${props.format.toUpperCase()}`}
      style={{ width: '370px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <ScalingFactorField
          value={scalingFactor}
          onChange={event => setScalingFactor(event.target.value)}
          onBlur={() => processScalingFactor()}
          onKeyUp={event => {
            if (event.key.toLowerCase() == 'enter') {
              processScalingFactor();
            }
          }}
        />
        <FieldDescription style={{ margin: '7px 0 0 16px' }} >
          ...scales the exported drawing
        </FieldDescription>
      </div>
      <ExportButton
        onClick={() => {
          try {
            exportDrawing({
              app: props.app,
              format: props.format,
              scalingFactor,
            });
            setErrorMessage('');
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
      {props.format == 'pptx' ? <PptxNotes /> : null}
    </PartialWidthContainer>
  );
}
