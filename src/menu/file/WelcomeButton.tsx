import * as React from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { WelcomePage } from 'Forms/welcome/WelcomePage';

import { NewAppTabOpenerBuilder } from 'Utilities/URLs/NewAppTabOpenerBuilder';

let newAppTabOpenerBuilder = new NewAppTabOpenerBuilder();
let newAppTabOpener = newAppTabOpenerBuilder.build();

export type Props = {
  app: App;
}

export function WelcomeButton(props: Props) {
  return (
    <DroppedButton
      text='Welcome'
      onClick={() => {
        if (props.app.strictDrawing.isEmpty()) {
          props.app.formContainer.renderForm(() => (
            <WelcomePage app={props.app} />
          ));
        } else {
          newAppTabOpener.openANewTabOfTheApp();
        }
      }}
    />
  );
}
