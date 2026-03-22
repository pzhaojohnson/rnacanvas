import * as React from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { OpenDrawingForm } from 'Forms/open/saved/OpenDrawingForm';

export type Props = {
  app: App;
}

export function OpenButton(props: Props) {
  return (
    <DroppedButton
      text='Open'
      onClick={() => {
        if (props.app.strictDrawing.isEmpty()) {
          props.app.formContainer.renderForm(formProps => (
            <OpenDrawingForm
              app={props.app}
              close={formProps.unmount}
            />
          ));
        } else {
          props.app.newTab();
        }
      }}
    />
  );
}
