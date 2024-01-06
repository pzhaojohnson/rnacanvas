import * as React from 'react';

import { useState } from 'react';

import styles from './OpenAnRNA2DSchemaForm.css';

import type { App } from 'App';

import { OpenAnRNA2DSchemaFile } from './helpers/OpenAnRNA2DSchemaFile';

import { CenterTheViewOfTheDrawing } from './helpers/CenterTheViewOfTheDrawing';

import { GoBackButton } from './helpers/GoBackButton';

import { RNA2DSchemaFileInput } from './helpers/RNA2DSchemaFileInput';

import { ErrorMessage } from './helpers/ErrorMessage';

import { WhatAreRNA2DSchemas } from './helpers/WhatAreRNA2DSchemas';

function Header() {
  let title = (
    <p className={styles.headerTitle} >
      Open an RNA 2D JSON Schema
    </p>
  );

  let underline = <div className={styles.headerUnderline} />;

  return (
    <div className={styles.header} >
      {title}
      {underline}
    </div>
  );
}

/**
 * Helps to position things vertically within the form.
 */
function BottomSpacer() {
  return <div style={{ height: '232px' }} />;
}

export type Props = {
  /**
   * The app instance that the form is for.
   */
  targetApp: App;

  /**
   * A callback to go back to the previous form.
   *
   * Will be bound to the go back button.
   */
  goBack: () => void;

  /**
   * A callback to close this form.
   *
   * Will be called after successfully opening an RNA 2D schema.
   */
  close: () => void;
};

export function OpenAnRNA2DSchemaForm(props: Props) {
  let { targetApp, goBack } = props;

  let [errorMessageTextContent, setErrorMessageTextContent] = useState('');

  // increment to trigger error message animations
  let [errorMessageKey, setErrorMessageKey] = useState(0);

  let errorMessage = errorMessageTextContent ? (
    <ErrorMessage key={errorMessageKey} >
      {errorMessageTextContent}
    </ErrorMessage>
  ) : null;

  let errorMessageContainer = (
    <div className={styles.errorMessageContainer} >
      {errorMessage}
    </div>
  );

  let handleSuccess = () => {
    // be careful not to call the global close method by mistake
    props.close();

    // must center the user's view of the drawing after closing the form
    // (since while the form is open the user's view of the drawing might have zero area)
    (new CenterTheViewOfTheDrawing({ targetApp })).do();
  };

  let handleFailure = (error: unknown) => {
    setErrorMessageTextContent(error instanceof Error ? error.message : String(error));
    setErrorMessageKey(errorMessageKey + 1);
  };

  let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    (new OpenAnRNA2DSchemaFile({ targetApp, listOfFiles: event.target.files })).do()
      .then(handleSuccess)
      .catch(handleFailure);
  };

  let goBackButtonContainer = (
    <div className={styles.goBackButtonContainer} >
      <GoBackButton onClick={goBack} />
    </div>
  );

  return (
    <div className={styles.openAnRNA2DSchemaForm} >
      <div className={styles.leftSpacer} />
      <div className={styles.contentBox} >
        {goBackButtonContainer}
        <Header />
        <RNA2DSchemaFileInput onChange={handleChange} />
        {errorMessageContainer}
        <WhatAreRNA2DSchemas />
        <BottomSpacer />
      </div>
      <div className={styles.rightSpacer} />
    </div>
  );
}
