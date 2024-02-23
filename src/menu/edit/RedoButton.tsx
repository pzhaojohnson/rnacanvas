import * as React from 'react';
import { useEffect } from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { detectMac as detectMacOS } from '@rnacanvas/utilities';

export type Props = {
  app: App;
}

function redoIfCan(app: App) {
  if (app.canRedo()) {
    app.redo();
  }
}

function isShiftCtrlZ(event: KeyboardEvent): boolean {
  return (
    event.shiftKey
    && event.ctrlKey
    && event.key.toLowerCase() == 'z'
  );
}

function isShiftMetaZ(event: KeyboardEvent): boolean {
  return (
    event.shiftKey
    && event.metaKey
    && event.key.toLowerCase() == 'z'
  );
}

export function RedoButton(props: Props) {
  useEffect(() => {
    let listener = (event: KeyboardEvent) => {
      let shouldRedoIfCan = (
        (isShiftCtrlZ(event) || (detectMacOS() && isShiftMetaZ(event)))
        && !event.repeat
      );
      if (shouldRedoIfCan) {
        redoIfCan(props.app);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  });

  return (
    <DroppedButton
      text='Redo'
      onClick={() => redoIfCan(props.app)}
      disabled={!props.app.canRedo()}
      keyBinding={detectMacOS() ? '⇧ ⌘ Z' : 'Shift+Ctrl+Z'}
    />
  );
}
