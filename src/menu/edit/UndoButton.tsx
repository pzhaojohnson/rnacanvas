import * as React from 'react';
import { useEffect } from 'react';
import { DroppedButton } from 'Menu/DroppedButton';
import type { App } from 'App';
import { detectMac as detectMacOS } from '@rnacanvas/utilities';

export type Props = {
  app: App;
}

function undoIfCan(app: App) {
  if (app.canUndo()) {
    app.undo();
  }
}

function isCtrlZ(event: KeyboardEvent): boolean {
  return (
    event.ctrlKey
    && event.key.toLowerCase() == 'z'
  );
}

function isMetaZ(event: KeyboardEvent): boolean {
  return (
    event.metaKey
    && event.key.toLowerCase() == 'z'
  );
}

export function UndoButton(props: Props) {
  useEffect(() => {
    let listener = (event: KeyboardEvent) => {
      let shouldUndoIfCan = (
        (isCtrlZ(event) || (detectMacOS() && isMetaZ(event)))
        && !event.shiftKey // with shift key is for redo
        && !event.repeat
      );
      if (shouldUndoIfCan) {
        undoIfCan(props.app);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  });

  return (
    <DroppedButton
      text='Undo'
      onClick={() => undoIfCan(props.app)}
      disabled={!props.app.canUndo()}
      keyBinding={detectMacOS() ? '⌘ Z' : 'Ctrl+Z'}
    />
  );
}
