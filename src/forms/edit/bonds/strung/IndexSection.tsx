import type { App } from 'App';

import type { Bond } from 'Forms/edit/bonds/strung/Bond';

import { strungElementsAtIndex } from 'Forms/edit/bonds/strung/strungElementsAtIndex';

import * as React from 'react';

import { IndexHeader } from 'Forms/edit/bonds/strung/IndexHeader';
import { RemoveButton } from 'Forms/edit/bonds/strung/RemoveButton';

import { IndexFields } from 'Forms/edit/bonds/strung/IndexFields';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The bonds containing the strung elements to edit.
   */
  bonds: Bond[];

  /**
   * Strung elements at this index in the strung elements arrays of the
   * bonds are to be edited.
   */
  strungElementsIndex: number;

  isCollapsed?: boolean;
  onHeaderClick?: () => void;

  onRemoveButtonClick?: () => void;
};

/**
 * Section for editing the strung elements at a specified index in the
 * strung elements arrays of bonds.
 */
export function IndexSection(props: Props) {
  let strungElements = strungElementsAtIndex({
    bonds: props.bonds,
    index: props.strungElementsIndex,
  });

  let header = (
    <IndexHeader
      {...props}
      strungElements={strungElements}
      bracketDirection={props.isCollapsed ? 'right' : 'down'}
      onClick={props.onHeaderClick}
    />
  );

  let removeButton = (
    <RemoveButton
      onClick={props.onRemoveButtonClick}
      style={{ marginLeft: '11px' }}
    />
  );

  let fields = (
    <IndexFields
      {...props} style={{ margin: '7px 0 0 4px', width: '233px' }}
    />
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }} >
        {header}
        {removeButton}
      </div>
      {props.isCollapsed ? null : fields}
    </div>
  );
}
