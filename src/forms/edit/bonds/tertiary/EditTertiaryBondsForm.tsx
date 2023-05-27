import type { App } from 'App';
import { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import * as React from 'react';
import styles from './EditTertiaryBondsForm.css';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { StrokeField } from './StrokeField';
import { StrokeWidthField } from './StrokeWidthField';
import { StrokeDasharrayField } from './StrokeDasharrayField';
import { BasePadding1Field } from './BasePadding1Field';
import { BasePadding2Field } from './BasePadding2Field';
import { ForwardBackwardButtons } from './ForwardBackwardButtons';

import { StrungElementsSection } from 'Forms/edit/bonds/strung/StrungElementsSection';

function DrawingHasNoTertiaryBondsNotes() {
  return (
    <div>
      <p className={styles.notesText} >
        Drawing has no tertiary bonds...
      </p>
      <div style={{ height: '26px' }} />
      <p className={styles.notesText} >
        Add tertiary bonds using the pairing tool...
      </p>
    </div>
  );
}

function NoTertiaryBondsAreSelectedNotes() {
  return (
    <div>
      <p className={styles.notesText} >
        No tertiary bonds are selected...
      </p>
      <div style={{ height: '26px' }} />
      <p className={styles.notesText} >
        Select tertiary bonds using the editing tool...
      </p>
      <div style={{ height: '26px' }} />
      <p className={styles.notesText} >
        Or...
      </p>
    </div>
  );
}

function SelectAllTertiaryBondsButton(
  props: {
    app: App,
  },
) {
  return (
    <p
      className={styles.selectAllTertiaryBondsButton}
      onClick={() => {
        let drawing = props.app.drawing;
        let drawingInteraction = props.app.drawingInteraction;
        let editingTool = drawingInteraction.editingTool;

        drawingInteraction.currentTool = editingTool; // switch to editing tool
        editingTool.editingType = TertiaryBond; // set to edit tertiary bonds
        editingTool.select([...drawing.tertiaryBonds]); // select all tertiary bonds
      }}
    >
      Select All Tertiary Bonds
    </p>
  );
}

export type Props = {
  app: App; // a reference to the whole app

  // the tertiary bonds to edit
  tertiaryBonds: TertiaryBond[];

  unmount: () => void;
  history: FormHistoryInterface;
}

export function EditTertiaryBondsForm(props: Props) {
  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Tertiary Bonds'
      style={{ width: '335px' }}
    >
      {props.app.drawing.tertiaryBonds.length == 0 ? (
        <DrawingHasNoTertiaryBondsNotes />
      ) : props.tertiaryBonds.length == 0 ? (
        <div>
          <NoTertiaryBondsAreSelectedNotes />
          <SelectAllTertiaryBondsButton {...props} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <StrokeField {...props} />
          <StrokeWidthField {...props} />
          <StrokeDasharrayField {...props} />
          <BasePadding1Field {...props} />
          <BasePadding2Field {...props} />
          <ForwardBackwardButtons {...props} />
          <div style={{ height: '45px' }} />
          <StrungElementsSection {...props} bonds={props.tertiaryBonds} />
        </div>
      )}
    </PartialWidthContainer>
  );
}
