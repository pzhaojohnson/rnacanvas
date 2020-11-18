import * as React from 'react';
import { NonnegativeNumberField } from '../../fields/text/NonnegativeNumberField';
import { FieldProps } from './FieldProps';
import { getAtIndex } from '../../../array/getAtIndex';

export function LineWidthField(props: FieldProps): React.ReactElement | null {
  let bns = props.getBaseNumberings();
  if (bns.length == 0) {
    return null;
  } else {
    let first = getAtIndex(bns, 0);
    return (
      <NonnegativeNumberField
        name='Line Width'
        initialValue={first?.lineStrokeWidth}
        set={lw => {
          let bns = props.getBaseNumberings();
          if (bns.length > 0) {
            let first = getAtIndex(bns, 0);
            if (lw != first?.lineStrokeWidth) {
              props.pushUndo();
              bns.forEach(bn => bn.lineStrokeWidth = lw);
              props.changed();
            }
          }
        }}
      />
    );
  }
}
