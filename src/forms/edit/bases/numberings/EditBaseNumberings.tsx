import type { App } from 'App';
import type { BaseNumbering } from 'Draw/bases/number/BaseNumbering';

import * as React from 'react';
import { PartialWidthContainer } from 'Forms/containers/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import colorFieldStyles from 'Forms/inputs/color/ColorField.css';
import { FontFamilyField } from './FontFamilyField';
import { FontSizeField } from './FontSizeField';
import { BoldField } from './BoldField';
import { ColorPicker } from './ColorPicker';
import { OpacityInput } from './OpacityInput';
import { LineWidthField } from './LineWidthField';
import { LineLengthField } from './LineLengthField';
import { BasePaddingField } from './BasePaddingField';

export interface Props {
  unmount: () => void;
  history: FormHistoryInterface;

  // a reference to the whole app
  app: App;

  // the base numberings to edit
  baseNumberings: BaseNumbering[];
}

export function EditBaseNumberings(props: Props) {
  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Numberings'
      style={{ width: '324px' }}
    >
      {props.baseNumberings.length == 0 ? null : (
        <div style={{ marginBottom: '16px' }} >
          <FontFamilyField app={props.app} baseNumberings={props.baseNumberings} />
          <div style={{ marginTop: '8px' }} >
            <FontSizeField app={props.app} baseNumberings={props.baseNumberings} />
          </div>
          <div style={{ marginTop: '8px' }} >
            <BoldField app={props.app} baseNumberings={props.baseNumberings} />
          </div>
          <div style={{ marginTop: '16px' }} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
              <ColorPicker app={props.app} baseNumberings={props.baseNumberings} />
              <div style={{ marginLeft: '10px' }} >
                <OpacityInput app={props.app} baseNumberings={props.baseNumberings} />
              </div>
              <div style={{ marginLeft: '8px' }} >
                <p className={`${colorFieldStyles.label} unselectable`} >
                  Color
                </p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px' }} >
            <LineWidthField app={props.app} baseNumberings={props.baseNumberings} />
          </div>
          <div style={{ marginTop: '8px' }} >
            <LineLengthField app={props.app} baseNumberings={props.baseNumberings} />
          </div>
          <div style={{ marginTop: '8px' }} >
            <BasePaddingField app={props.app} baseNumberings={props.baseNumberings} />
          </div>
        </div>
      )}
    </PartialWidthContainer>
  );
}
