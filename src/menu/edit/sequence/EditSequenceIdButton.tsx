import * as React from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { SequenceIdForm } from 'Forms/edit/sequences/SequenceIdForm';
import { v4 as uuidv4 } from 'uuid';

export type Props = {
  app: App;
}

const formKey = uuidv4();

export function EditSequenceIdButton(props: Props) {
  return (
    <DroppedButton
      text='Sequence ID'
      onClick={() => {
        props.app.formContainer.renderForm(formProps => (
          <SequenceIdForm {...formProps} app={props.app} />
        ), { key: formKey });
      }}
      style={{ borderRadius: '0px 4px 0px 0px' }}
    />
  );
}
