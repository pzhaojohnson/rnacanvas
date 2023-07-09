import type { App } from 'App';
import { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

import * as React from 'react';
import styles from './EditSecondaryBondsForm.css';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { StrokeField } from './StrokeField';
import { BaseSpacingField } from './BaseSpacingField';
import { BasePaddingField } from './BasePaddingField';
import { StrokeWidthField } from './StrokeWidthField';
import { StrokeDasharrayField } from './StrokeDasharrayField';
import { StrokeLinecapField } from './StrokeLinecapField';
import { ForwardBackwardButtons } from './ForwardBackwardButtons';

import { StrungElementsSection } from 'Forms/edit/bonds/strung/StrungElementsSection';

function DrawingHasNoSecondaryBondsNotes() {
  return (
    <div>
      <p className={styles.notesText} >
        Drawing has no secondary bonds...
      </p>
      <p className={styles.notesText} style={{ marginTop: '26px' }} >
        Add secondary bonds using the pairing tool...
      </p>
    </div>
  );
}

function NoSecondaryBondsAreSelectedNotes() {
  return (
    <div>
      <p className={styles.notesText} >
        No secondary bonds are selected...
      </p>
      <p className={styles.notesText} style={{ marginTop: '26px' }} >
        Select secondary bonds using the editing tool...
      </p>
    </div>
  );
}

function SelectSecondaryBondsButton(
  props: {
    app: App,
    type: 'all' | 'AUT' | 'GC' | 'GUT' | 'other',
    children?: React.ReactNode,
    style?: React.CSSProperties,
  },
) {
  return (
    <button
      className={styles.selectSecondaryBondsButton}
      onClick={() => {
        let drawing = props.app.drawing;
        let drawingInteraction = props.app.drawingInteraction;
        let editingTool = drawingInteraction.editingTool;

        drawingInteraction.currentTool = editingTool; // switch to editing tool
        editingTool.editingType = SecondaryBond; // set to edit secondary bonds

        if (props.type == 'all') {
          editingTool.select([...drawing.secondaryBonds]);
        } else {
          editingTool.select(drawing.secondaryBonds.filter(sb => sb.type == props.type));
        }
      }}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

function SelectAllSecondaryBondsButton(props: { app: App }) {
  return (
    <SelectSecondaryBondsButton {...props} type='all' >
      All Secondary Bonds
    </SelectSecondaryBondsButton>
  );
}

function SelectAUTSecondaryBondsButton(props: { app: App }) {
  return (
    props.app.drawing.secondaryBonds.some(sb => sb.type == 'AUT') ? (
      <SelectSecondaryBondsButton {...props} type='AUT' >
        AU and AT Bonds
      </SelectSecondaryBondsButton>
    ) : (
      null
    )
  );
}

function SelectGCSecondaryBondsButton(props: { app: App }) {
  return (
    props.app.drawing.secondaryBonds.some(sb => sb.type == 'GC') ? (
      <SelectSecondaryBondsButton {...props} type='GC' >
        GC Bonds
      </SelectSecondaryBondsButton>
    ) : (
      null
    )
  );
}

function SelectGUTSecondaryBondsButton(props: { app: App }) {
  return (
    props.app.drawing.secondaryBonds.some(sb => sb.type == 'GUT') ? (
      <SelectSecondaryBondsButton {...props} type='GUT' >
        GU and GT Bonds
      </SelectSecondaryBondsButton>
    ) : (
      null
    )
  );
}

function SelectOtherSecondaryBondsButton(props: { app: App }) {
  return (
    props.app.drawing.secondaryBonds.every(sb => sb.type == 'other') ? (
      null // there is already the button to select all secondary bonds
    ) : props.app.drawing.secondaryBonds.some(sb => sb.type == 'other') ? (
      <SelectSecondaryBondsButton {...props} type='other' >
        Other Secondary Bonds
      </SelectSecondaryBondsButton>
    ) : (
      null
    )
  );
}

function SelectSecondaryBondsButtons(props: { app: App }) {
  return (
    <div style={{ marginTop: '26px' }} >
      <p className={styles.notesText} >
        Or select...
      </p>
      <div style={{ marginTop: '17px', display: 'flex', flexDirection: 'column' }} >
        <SelectAllSecondaryBondsButton {...props} />
        <SelectAUTSecondaryBondsButton {...props} />
        <SelectGCSecondaryBondsButton {...props} />
        <SelectGUTSecondaryBondsButton {...props} />
        <SelectOtherSecondaryBondsButton {...props} />
      </div>
    </div>
  );
}

function BaseSpacingFieldSpacer(
  props?: {
    noSecondaryBondsAreSelected?: boolean,
  },
) {
  return (
    <div
      style={{
        height: props?.noSecondaryBondsAreSelected ? '47px' : '44px',
      }}
    />
  );
}

export type Props = {
  app: App;

  // the secondary bonds to edit
  secondaryBonds: SecondaryBond[];

  unmount: () => void;
  history: FormHistoryInterface;
}

export function EditSecondaryBondsForm(props: Props) {
  let noSecondaryBondsAreSelected = props.secondaryBonds.length == 0;

  let baseSpacingFieldSpacer = (
    <BaseSpacingFieldSpacer {...{ noSecondaryBondsAreSelected }} />
  );

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Secondary Bonds'
      style={{ width: '335px' }}
    >
      {props.app.drawing.secondaryBonds.length == 0 ? (
        <DrawingHasNoSecondaryBondsNotes />
      ) : noSecondaryBondsAreSelected ? (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <BaseSpacingField {...props} />
          {baseSpacingFieldSpacer}
          <NoSecondaryBondsAreSelectedNotes />
          <SelectSecondaryBondsButtons {...props} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <BaseSpacingField {...props} />
          {baseSpacingFieldSpacer}
          <StrokeField {...props} />
          <StrokeWidthField {...props} />
          <StrokeDasharrayField {...props} />
          <BasePaddingField {...props} />
          <StrokeLinecapField {...props} />
          <ForwardBackwardButtons {...props} />
          <div style={{ height: '45px' }} />
          <StrungElementsSection {...props} bonds={props.secondaryBonds} />
        </div>
      )}
    </PartialWidthContainer>
  );
}
