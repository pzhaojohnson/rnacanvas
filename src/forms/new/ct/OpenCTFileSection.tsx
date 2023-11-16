import type { App } from 'App';

import * as View from 'Draw/view';

import { openCTFile } from './openCTFile';

import * as React from 'react';
import { useState } from 'react';

import styles from './OpenCTFileSection.css';

import { CTFileInput } from './CTFileInput';

// the underlying error message component
import { ErrorMessage as _ErrorMessage } from 'Forms/ErrorMessage';

import { createWaitOverlay } from 'Utilities/createWaitOverlay';

function ErrorMessage(
  props: {
    children?: React.ReactNode,
  },
) {
  return (
    <_ErrorMessage
      style={{
        marginTop: '14px', height: '55px',
        fontSize: '16px', color: 'rgb(199, 16, 16)',
      }}
    >
      {props.children}
    </_ErrorMessage>
  );
}

function PredictionProgramLink(
  props: {
    href: string,
    title?: string,
    children: string,
  },
) {
  return (
    <a
      className={styles.predictionProgramLink}
      href={props.href}
      target='_blank'
      rel='noopener noreferrer'
      title={props.title}
    >
      {props.children}
    </a>
  );
}

function MfoldLink() {
  return (
    <PredictionProgramLink
      href='http://www.unafold.org/mfold/applications/rna-folding-form.php'
      title='Go to Mfold web server.'
    >
      Mfold
    </PredictionProgramLink>
  );
}

function RNAfoldLink() {
  return (
    <PredictionProgramLink
      href='http://rna.tbi.univie.ac.at/cgi-bin/RNAWebSuite/RNAfold.cgi'
      title='Go to RNAfold web server.'
    >
      RNAfold
    </PredictionProgramLink>
  );
}

function Details() {
  let CT = <span style={{ fontWeight: 700 }} >CT</span>;

  let Mfold = <MfoldLink />;
  let RNAfold = <RNAfoldLink />;

  return (
    <div className={styles.details} >
      <p className={styles.detailsText} >
        {CT} "Connectivity Table" files
        are produced by RNA structure prediction programs
        such as {Mfold} and {RNAfold}.
      </p>
      <p className={styles.detailsText} style={{ marginTop: '26px' }} >
        If a {CT} file contains multiple structures,
        only the first structure in the {CT} file will be drawn.
      </p>
    </div>
  );
}

/**
 * Creates an error message string from an unknown error value that was
 * thrown.
 */
function createErrorMessageString(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * A callback to close this form section.
   *
   * Is called after successfully opening a CT file in the app.
   */
  close: () => void;
};

export function OpenCTFileSection(props: Props) {
  let app = props.app;

  let [errorMessageString, setErrorMessageString] = useState('');
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  let waitOverlay = createWaitOverlay();

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

  let ctFileInput = (
    <CTFileInput
      onChange={event => {
        if (event.target.file) {
          let ctFile = event.target.file;
          document.body.appendChild(waitOverlay);
          openCTFile({ ctFile, app })
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

  return (
    <div className={styles.openCTFileSection} >
      {ctFileInput}
      {errorMessage ? errorMessage : <div style={{ height: '69px' }} />}
      <Details />
    </div>
  );
}
