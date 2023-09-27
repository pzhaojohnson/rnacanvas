import type { App } from 'App';

import { userIsTyping } from 'Utilities/userIsTyping';

import * as React from 'react';
import { useEffect } from 'react';

import styles from './OnlyExpandToggle.css';

import { ToolOptionToggle } from 'Infobar/tools/ToolOptionToggle';

const toggleMessage = document.createElement('p');
toggleMessage.className = styles.toggleMessage;
toggleMessage.textContent = 'Toggle (E) to disable condensing of linker regions.';

const untoggleMessage = document.createElement('p');
untoggleMessage.className = styles.toggleMessage;
untoggleMessage.textContent = 'Untoggle (E) to enable condensing of linker regions.';

export type Props = {
  app: App; // a reference to the whole app
};

export function OnlyExpandToggle(props: Props) {
  let drawingInteraction = props.app.drawingInteraction;
  let draggingTool = drawingInteraction.draggingTool;

  let toggle = () => {
    draggingTool.condenseLinkers = !draggingTool.condenseLinkers;
    props.app.refresh();
  };

  let handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() == 'e' && !event.repeat && !userIsTyping()) {
      toggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <ToolOptionToggle
      isToggled={!draggingTool.condenseLinkers}
      onClick={toggle}
      onMouseEnter={() => {
        drawingInteraction.overlaidMessageContainer.clear();
        let message = draggingTool.condenseLinkers ? toggleMessage : untoggleMessage;
        drawingInteraction.overlaidMessageContainer.append(message);
        drawingInteraction.overlaidMessageContainer.placeOver(props.app.strictDrawing.drawing);
      }}
      onMouseLeave={() => {
        drawingInteraction.overlaidMessageContainer.clear();
      }}
      style={{ width: '131px' }}
    >
      Only Expand
    </ToolOptionToggle>
  );
}
