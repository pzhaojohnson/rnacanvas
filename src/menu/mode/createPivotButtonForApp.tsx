import * as React from 'react';
const uuidv1 = require('uuid/v1');
import DroppedButton from '../DroppedButton';
import App from '../../App';

function alreadyPivoting(app: App): boolean {
  let interaction = app.strictDrawingInteraction;
  let pivotingMode = interaction.pivotingMode;
  return interaction.pivoting() && pivotingMode.addingAndRemovingStretch();
}

function createPivotButtonForApp(app: App): React.ReactElement {
  return (
    <DroppedButton
      key={uuidv1()}
      text={'Pivot'}
      onClick={() => {
        if (!alreadyPivoting(app)) {
          let interaction = app.strictDrawingInteraction;
          let pivotingMode = interaction.pivotingMode;
          interaction.startPivoting();
          pivotingMode.addAndRemoveStretch();
        }
      }}
      disabled={alreadyPivoting(app)}
      checked={alreadyPivoting(app)}
    />
  );
}

export default createPivotButtonForApp;
