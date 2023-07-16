import type { App } from 'App';

import * as React from 'react';

import { DroppedButton } from 'Menu/DroppedButton';

import { SelectBasesByTextContentFormBuilder } from 'Forms/edit/bases/by/text-content/SelectBasesByTextContentFormBuilder';

import { v4 as uuidv4 } from 'uuid';

export type Props = {
  /**
   * The relevant app instance.
   */
  app: App;
}

let formBuilder = new SelectBasesByTextContentFormBuilder();

const formKey = uuidv4();

export function ByTextButton(props: Props) {
  return (
    <DroppedButton
      text='By Text'
      onClick={() => {
        props.app.formContainer.renderForm(formProps => (
          formBuilder.buildFor({
            app: props.app,
            close: formProps.unmount,
            history: formProps.history,
          })
        ), { key: formKey });
      }}
    />
  );
}
