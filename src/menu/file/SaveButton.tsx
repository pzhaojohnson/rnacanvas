import * as React from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { offerFileForDownload } from 'Utilities/offerFileForDownload';

export type Props = {
  app: App;
}

export function SaveButton(props: Props) {
  return (
    <DroppedButton
      text='Save'
      onClick={() => {
        let name = document.title ? document.title : 'Drawing';
        offerFileForDownload({
          name: name + '.rnacanvas',
          type: 'text/plain',
          contents: props.app.strictDrawing.savableString,
        });
      }}
      disabled={props.app.strictDrawing.isEmpty()}
      style={{ borderRadius: '0px 0px 4px 4px' }}
    />
  );
}
