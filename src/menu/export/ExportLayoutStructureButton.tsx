import * as React from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { offerFileForDownload } from 'Utilities/offerFileForDownload';

function getLayoutDotBracket(app: App): string {
  let partners = app.strictDrawing.layoutPartners();
  let dtbr = '';
  partners.forEach((q, i) => {
    let p = i + 1;
    if (typeof q == 'number') {
      dtbr += p < q ? '(' : ')';
    } else {
      dtbr += '.';
    }
  });
  return dtbr;
}

export type Props = {
  app: App;
}

export function ExportLayoutStructureButton(props: Props) {
  return (
    <DroppedButton
      text='Layout Structure'
      onClick={() => {
        let name = document.title ? document.title : 'Drawing';
        let ids = props.app.strictDrawing.drawing.sequenceIds().join(', ');
        let seq = props.app.strictDrawing.drawing.overallCharacters;
        let dtbr = getLayoutDotBracket(props.app);
        offerFileForDownload({
          name: name + '.txt',
          type: 'text/plain',
          contents: '>' + ids + '\n' + seq + '\n' + dtbr,
        });
      }}
      style={{ borderRadius: '0px 0px 4px 4px' }}
    />
  );
}
