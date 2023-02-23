import type { App } from 'App';
import { Base } from 'Draw/bases/Base';
import { CircleBaseOutline } from 'Draw/bases/annotate/circle/CircleBaseOutline';

import * as React from 'react';
import styles from './EditBasesForm.css';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { WidthField } from './WidthField';
import { HeightField } from './HeightField';

import { CharacterField } from './CharacterField';
import { FillField } from './FillField';
import { FontFamilyField } from './FontFamilyField';
import { FontSizeField } from './FontSizeField';
import { BoldField } from './BoldField';
import { ForwardBackwardButtons } from './ForwardBackwardButtons';
import { OutlineField } from './OutlineField';
import { RadiusField as OutlineRadiusField } from './outlines/RadiusField';
import { StrokeField as OutlineStrokeField } from './outlines/StrokeField';
import { StrokeWidthField as OutlineStrokeWidthField } from './outlines/StrokeWidthField';
import { FillField as OutlineFillField } from './outlines/FillField';
import { StrokeDasharrayField as OutlineStrokeDasharrayField } from './outlines/StrokeDasharrayField';
import { ForwardBackwardButtons as OutlineForwardBackwardButtons } from './outlines/ForwardBackwardButtons';
import { NumberingField } from './NumberingField';

function DrawingHasNoBasesNotes() {
  return (
    <p className={styles.notesText} >
      Drawing has no bases...
    </p>
  );
}

function ForAllBasesLabel() {
  return (
    <p className={styles.notesText} >
      For all bases...
    </p>
  );
}

function NoBasesAreSelectedNotes() {
  return (
    <div style={{ marginTop: '52px' }} >
      <p className={styles.notesText} >
        No bases are selected...
      </p>
      <p className={styles.notesText} style={{ marginTop: '26px' }} >
        Select bases using the editing tool...
      </p>
      <p className={styles.notesText} style={{ marginTop: '26px' }} >
        Or...
      </p>
    </div>
  );
}

function SelectAllBasesButton(
  props: {
    app: App,
  },
) {
  return (
    <button
      className={styles.selectAllBasesButton}
      onClick={() => {
        let drawing = props.app.drawing;
        let drawingInteraction = props.app.drawingInteraction;
        let editingTool = drawingInteraction.editingTool;

        drawingInteraction.currentTool = editingTool; // switch to editing tool
        editingTool.editingType = Base; // set to edit bases
        editingTool.select(drawing.bases()); // select all bases
      }}
    >
      Select All Bases
    </button>
  );
}

export type Props = {
  app: App;

  // the bases to edit
  bases: Base[];

  unmount: () => void;
  history: FormHistoryInterface;
}

export function EditBasesForm(props: Props) {
  let outlines = props.bases.map(b => b.outline).filter(
    (o): o is CircleBaseOutline => o instanceof CircleBaseOutline
  );

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Bases'
      style={{ width: '327px' }}
    >
      {props.app.drawing.bases().length == 0 ? (
        <DrawingHasNoBasesNotes />
      ) : props.bases.length == 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <ForAllBasesLabel />
          <WidthField {...props} />
          <HeightField {...props} />
          <NoBasesAreSelectedNotes />
          <SelectAllBasesButton {...props} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <CharacterField {...props} />
          <FillField {...props} />
          <FontFamilyField {...props} />
          <FontSizeField {...props} />
          <BoldField {...props} />
          <ForwardBackwardButtons {...props} />
          <OutlineField {...props} />
          {!props.bases.every(b => b.outline) ? null : (
            <div style={{ margin: '8px 0 0 12px', display: 'flex', flexDirection: 'column' }} >
              <OutlineFillField {...props} outlines={outlines} />
              <OutlineRadiusField {...props} outlines={outlines} />
              <OutlineStrokeField {...props} outlines={outlines} />
              <OutlineStrokeWidthField {...props} outlines={outlines} />
              <OutlineStrokeDasharrayField {...props} outlines={outlines} />
              <OutlineForwardBackwardButtons {...{ ...props, outlines }} />
            </div>
          )}
          <NumberingField {...props} />
        </div>
      )}
    </PartialWidthContainer>
  );
}
