import type { App } from 'App';
import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';
import { numberingIncrement } from 'Draw/sequences/numberingIncrement';

import * as React from 'react';
import styles from './EditBaseNumberings.css';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { DisplayableSequenceRange } from 'Forms/edit/sequences/DisplayableSequenceRange';
import { NumberingOffsetField } from './NumberingOffsetField';
import { NumberingAnchorField } from './NumberingAnchorField';
import { NumberingIncrementField } from './NumberingIncrementField';
import { NumberField } from './NumberField';
import { FontFamilyField } from './FontFamilyField';
import { FontSizeField } from './FontSizeField';
import { BoldField } from './BoldField';
import { ColorField } from './ColorField';
import { LineWidthField } from './LineWidthField';
import { LineLengthField } from './LineLengthField';
import { LineStrokeDasharrayField } from './LineStrokeDasharrayField';
import { BasePaddingField } from './BasePaddingField';
import { ForwardBackwardButtons } from './ForwardBackwardButtons';

function DrawingHasNoBaseNumberingsNotes() {
  return (
    <div style={{ marginTop: '52px' }} >
      <p className={styles.notesText} >
        Drawing has no numberings...
      </p>
    </div>
  );
}

function NoBaseNumberingsAreSelectedNotes() {
  return (
    <div style={{ marginTop: '52px' }} >
      <p className={styles.notesText} >
        No numberings are selected...
      </p>
      <p className={styles.notesText} style={{ marginTop: '26px' }} >
        Select numberings using the editing tool...
      </p>
      <p className={styles.notesText} style={{ marginTop: '26px' }} >
        Or...
      </p>
    </div>
  );
}

function SelectAllBaseNumberingsButton(
  props: {
    app: App,
  },
) {
  return (
    <button
      className={styles.selectAllBaseNumberingsButton}
      onClick={() => {
        let drawing = props.app.drawing;
        let drawingInteraction = props.app.drawingInteraction;
        let editingTool = drawingInteraction.editingTool;

        let allBaseNumberings = drawing.bases().map(b => b.numbering).filter(
          (bn): bn is BaseNumbering => bn instanceof BaseNumbering
        );

        drawingInteraction.currentTool = editingTool; // switch to the editing tool
        editingTool.editingType = BaseNumbering; // set to edit base numberings
        editingTool.select(allBaseNumberings);
      }}
    >
      Select All Numberings
    </button>
  );
}

export interface Props {
  unmount: () => void;
  history: FormHistoryInterface;

  // a reference to the whole app
  app: App;

  // the base numberings to edit
  baseNumberings: BaseNumbering[];
}

export function EditBaseNumberingsForm(props: Props) {
  let sequence = props.app.strictDrawing.layoutSequence();

  let numBaseNumberingsInDrawing = props.app.drawing.bases().filter(b => b.numbering).length;

  let ni = numberingIncrement(sequence);

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Numberings'
      style={{ width: '334px' }}
    >
      {props.baseNumberings.length != 0 ? null : (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <DisplayableSequenceRange sequence={sequence} />
          <NumberingOffsetField {...props} />
          <NumberingIncrementField {...props} />
          {ni != undefined ? <NumberingAnchorField {...props} /> : null}
        </div>
      )}
      {numBaseNumberingsInDrawing == 0 ? (
        <DrawingHasNoBaseNumberingsNotes />
      ) : props.baseNumberings.length == 0 ? (
        <div>
          <NoBaseNumberingsAreSelectedNotes />
          <SelectAllBaseNumberingsButton {...props} />
        </div>
      ) : (
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column' }} >
          <NumberField {...props} />
          <FontFamilyField {...props} />
          <FontSizeField {...props} />
          <BoldField {...props} />
          <ColorField {...props} />
          <LineWidthField {...props} />
          <LineLengthField {...props} />
          <LineStrokeDasharrayField {...props} />
          <BasePaddingField {...props} />
          <ForwardBackwardButtons {...props} />
        </div>
      )}
    </PartialWidthContainer>
  );
}
