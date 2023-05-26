import type { App } from 'App';

import { Tool } from 'Draw/interact/StrictDrawingInteraction';
import { DraggingTool } from 'Draw/interact/drag/DraggingTool';
import { BindingTool } from 'Draw/interact/bind/BindingTool';
import { FlatteningTool } from 'Draw/interact/flatten/FlatteningTool';
import { FlippingTool } from 'Draw/interact/flip/FlippingTool';
import { EditingTool } from 'Draw/interact/edit/EditingTool';

import * as React from 'react';
import styles from './ToolSelect.css';

export type ToolSelectProps = {

  // a reference to the whole app
  app: App;

  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

let switchToolMessage = document.createElement('p');
switchToolMessage.className = styles.overlaidMessage;
switchToolMessage.textContent = 'Click to switch to another tool.';

function nameOfTool(tool: Tool): string {
  if (tool instanceof DraggingTool) {
    return 'Drag';
  } else if (tool instanceof BindingTool) {
    return 'Pair';
  } else if (tool instanceof FlatteningTool) {
    return 'Flatten';
  } else if (tool instanceof FlippingTool) {
    return 'Flip';
  } else if (tool instanceof EditingTool) {
    return 'Edit';
  } else {
    return 'Unknown';
  }
}

function descriptionOfTool(tool: Tool) {
  let p = document.createElement('p');
  p.className = styles.overlaidMessage;
  if (tool instanceof DraggingTool) {
    p.textContent = 'Drag stems and loops.';
  } else if (tool instanceof BindingTool) {
    p.textContent = 'Pair and unpair bases with secondary and tertiary bonds.';
  } else if (tool instanceof FlatteningTool) {
    p.textContent = 'Flatten and unflatten loops and straighten and bend stacked stems.';
  } else if (tool instanceof FlippingTool) {
    p.textContent = 'Flip hairpins, substructures and the entire structure.';
  } else if (tool instanceof EditingTool) {
    p.textContent = 'Edit object colors, sizes, fonts and other attributes.';
  } else {
    p.textContent = '';
  }
  return p;
}

type ToolLabelProps = {
  onClick?: () => void;
}

function ToolLabel(props: ToolLabelProps) {
  return (
    <p className={styles.toolLabel} onClick={props.onClick} >
      Tool
    </p>
  );
}

type CurrentToolViewProps = {
  currentTool: Tool;
};

function CurrentToolView(props: CurrentToolViewProps) {
  return (
    <p className={styles.currentToolView} >
      {nameOfTool(props.currentTool)}
    </p>
  );
}

type ToolButtonProps = {
  toolName: string;
  isToggled: boolean;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
};

function ToolButton(props: ToolButtonProps) {
  return (
    <p
      className={`
        ${styles.toolButton}
        ${props.isToggled ? styles.toggledToolButton : styles.untoggledToolButton}
      `}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      {props.toolName}
    </p>
  );
}

export class ToolSelect extends React.Component<ToolSelectProps> {
  state: {
    isOpen: boolean;
  };

  constructor(props: ToolSelectProps) {
    super(props);

    this.state = {
      isOpen: props.isOpen ?? false,
    };
  }

  render() {
    let strictDrawingInteraction = this.props.app.strictDrawingInteraction;

    let tools = [
      strictDrawingInteraction.draggingTool,
      strictDrawingInteraction.bindingTool,
      strictDrawingInteraction.flatteningTool,
      strictDrawingInteraction.flippingTool,
      strictDrawingInteraction.editingTool,
    ];
    let currentTool = strictDrawingInteraction.currentTool;

    return (
      <div
        className={`
          ${styles.toolSelect}
          ${this.state.isOpen ? styles.openToolSelect : styles.closedToolSelect}
        `}
        onClick={() => {
          if (!this.state.isOpen) {
            this.open();
          }
        }}
        onMouseOver={() => {
          if (!this.state.isOpen) {
            this.showOverlaidMessage(switchToolMessage);
          }
        }}
        onMouseOut={() => this.hideOverlaidMessage()}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <ToolLabel
          onClick={!this.state.isOpen ? undefined : () => this.close()}
        />
        {!this.state.isOpen ? (
          <CurrentToolView currentTool={currentTool} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
            <ToolButton
              toolName={nameOfTool(currentTool)}
              isToggled={true}
              onClick={() => this.close()}
              onMouseOver={() => this.showToolDescription(currentTool)}
              onMouseOut={() => this.hideOverlaidMessage()}
            />
            {tools.filter(tool => tool != currentTool).map((tool, i) => (
              <ToolButton
                key={i}
                toolName={nameOfTool(tool)}
                isToggled={false}
                onClick={() => this.select(tool)}
                onMouseOver={() => this.showToolDescription(tool)}
                onMouseOut={() => this.hideOverlaidMessage()}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  open() {
    this.setState({ isOpen: true });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  close() {
    this.setState({ isOpen: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  select(tool: Tool) {
    this.props.app.strictDrawingInteraction.currentTool = tool;

    // open the editing tool form when switching to the editing tool
    if (tool == this.props.app.strictDrawingInteraction.editingTool) {
      this.props.app.strictDrawingInteraction.editingTool.renderForm();
    }

    this.close();
  }

  showToolDescription(tool: Tool) {
    this.showOverlaidMessage(descriptionOfTool(tool));
  }

  showOverlaidMessage(message: HTMLParagraphElement) {
    let strictDrawingInteraction = this.props.app.strictDrawingInteraction;
    let overlaidMessageContainer = strictDrawingInteraction.overlaidMessageContainer;
    overlaidMessageContainer.clear();
    overlaidMessageContainer.placeOver(this.props.app.strictDrawing.drawing);
    overlaidMessageContainer.append(message);
  }

  hideOverlaidMessage() {
    let strictDrawingInteraction = this.props.app.strictDrawingInteraction;
    let overlaidMessageContainer = strictDrawingInteraction.overlaidMessageContainer;
    overlaidMessageContainer.clear();
    this.props.app.refresh(); // restores the previous overlaid message
  }
}
