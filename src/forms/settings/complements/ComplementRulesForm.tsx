import type { App } from 'App';

import * as React from 'react';

import { PartialWidthContainer } from 'Forms/containers/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { AllowedMismatchField } from './AllowedMismatchField';
import { AllowedGUTField } from './AllowedGUTField';
import { IUPACField } from './IUPACField';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  unmount: () => void;
  history: FormHistoryInterface;
}

export function ComplementRulesForm(props: Props) {
  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Complement Rules'
      style={{ width: '324px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <AllowedMismatchField app={props.app} />
        <div style={{ height: '14px' }} />
        <AllowedGUTField app={props.app} />
        <div style={{ height: '14px' }} />
        <IUPACField app={props.app} />
      </div>
    </PartialWidthContainer>
  );
}