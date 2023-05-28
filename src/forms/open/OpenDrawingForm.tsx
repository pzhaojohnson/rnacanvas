import type { App } from 'App';

import { AppWrapper } from './openDrawing';

import * as View from 'Draw/view';

import * as React from 'react';

import { useState } from 'react';

import styles from './OpenDrawingForm.css';

import { FloatingDrawingsContainer } from 'Forms/containers/floating-drawings/FloatingDrawingsContainer';

import { DrawingFileInput } from './DrawingFileInput';

import { ErrorMessage as _ErrorMessage } from 'Forms/ErrorMessage';

import { DetailsToggle as _DetailsToggle } from 'Forms/buttons/DetailsToggle';

import { LegacyDrawingNotes } from './LegacyDrawingNotes';

import { createWaitOverlay } from 'Utilities/createWaitOverlay';

function Header() {
  let title = (
    <p className={styles.title} >
      Open a Saved Drawing
    </p>
  );

  let titleUnderline = <div className={styles.titleUnderline} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} >
      {title}
      {titleUnderline}
    </div>
  );
}

/**
 * Creates an error message string from a thrown value.
 */
function createErrorMessageString(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}

function ErrorMessage(
  props: {
    children?: React.ReactNode,
  },
) {
  return (
    <_ErrorMessage
      style={{
        marginTop: '13px',
        fontSize: '16px', color: '#d71111',
      }}
    >
      {props.children}
    </_ErrorMessage>
  );
}

function FileExtensionsNote(
  props: {
    style?: React.CSSProperties,
  },
) {
  let dotRNAcanvas = (
    <span className={styles.dotRNAcanvas} >
      .rnacanvas
    </span>
  );

  let dotRNA2Drawer = (
    <span className={styles.dotRNA2Drawer} >
      .rna2drawer
    </span>
  );

  return (
    <p className={styles.fileExtensionsNote} style={props.style} >
      (Drawing files can have {dotRNAcanvas} or {dotRNA2Drawer} extension.)
    </p>
  );
}

function DetailsToggle(
  props: {
    onClick: () => void,
  },
) {
  return (
    <_DetailsToggle
      onClick={props.onClick}
      style={{
        marginRight: '468px', padding: '1px 14px',
        fontSize: '12px', fontWeight: 500,
      }}
    >
      Details
    </_DetailsToggle>
  );
}

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * A callback to close the form.
   */
  close: () => void;
}

export function OpenDrawingForm(props: Props) {
  let app = props.app;
  let appWrapper = new AppWrapper(app);

  let [errorMessageString, setErrorMessageString] = useState('');

  // to be incremented whenever the error message is set
  // (to trigger error message animations)
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  let [showDetails, setShowDetails] = useState(false);

  // to be called when a saved drawing is successfully opened
  let handleSuccess = () => {
    props.close();

    // prevent coming back to this form and preceding forms
    app.formContainer.clearHistory();

    app.refresh();

    (new View.DrawingWrapper(app.drawing)).centerView();
  };

  let handleFailure = (error: unknown) => {
    setErrorMessageString(createErrorMessageString(error));
    setErrorMessageKey(errorMessageKey + 1);
  };

  let waitOverlay = createWaitOverlay();

  let drawingFileInput = (
    <DrawingFileInput
      onChange={event => {
        let file = event.target.file;

        if (file) {
          document.body.appendChild(waitOverlay);

          appWrapper.openDrawing({ file })
            .then(handleSuccess)
            .catch(handleFailure)
            .finally(() => waitOverlay.remove());
        }
      }}
    />
  );

  let errorMessage = errorMessageString ? (
    <ErrorMessage key={errorMessageKey} >
      {errorMessageString}
    </ErrorMessage>
  ) : null;

  let fileExtensionsNote = (
    <FileExtensionsNote
      style={{ marginTop: errorMessageString ? '26px' : '39px' }}
    />
  );

  let detailsToggleSpacer = (
    <div style={{ height: '45px' }} />
  );

  let detailsToggle = (
    <DetailsToggle
      onClick={() => setShowDetails(!showDetails)}
    />
  );

  let legacyDrawingNotes = showDetails ? <LegacyDrawingNotes /> : null;

  return (
    <FloatingDrawingsContainer
      contained={
        <div className={styles.content} >
          <Header />
          <div className={styles.body} >
            {drawingFileInput}
            {errorMessage}
            {fileExtensionsNote}
            {detailsToggleSpacer}
            {detailsToggle}
            {legacyDrawingNotes}
          </div>
        </div>
      }
    />
  );
}
