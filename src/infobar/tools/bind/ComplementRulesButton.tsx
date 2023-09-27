import type { App } from 'App';

import * as React from 'react';
import { OptionsToggle } from 'Forms/buttons/OptionsToggle';

import { ComplementRulesForm } from 'Forms/settings/complements/ComplementRulesForm';
import { v4 as uuidv4 } from 'uuid';

export type Props = {

  // a reference to the whole app
  app: App;
};

const complementRulesFormKey = uuidv4();

export function ComplementRulesButton(props: Props) {
  return (
    <OptionsToggle
      onClick={() => {
        props.app.formContainer.renderForm(formProps => (
          <ComplementRulesForm {...formProps} app={props.app} />
        ), { key: complementRulesFormKey });
      }}
      style={{
        padding: '0px 16px',
        minHeight: '21px',
      }}
    >
      Options
    </OptionsToggle>
  );
}
