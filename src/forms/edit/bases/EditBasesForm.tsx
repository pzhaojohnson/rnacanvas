import type { App } from 'App';
import { Base } from 'Draw/bases/Base';
import { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as React from 'react';
import styles from './EditBasesForm.css';
import { PartialWidthContainer } from 'Forms/containers/partial-width/PartialWidthContainer';
import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { WidthAndHeightFields } from './WidthAndHeightFields';

import { TextContentFieldBuilder } from './text-contents/TextContentFieldBuilder';
import { FillField } from './FillField';
import { FontFamilyField } from './FontFamilyField';
import { FontSizeField } from './FontSizeField';
import { BoldField } from './BoldField';
import { ForwardBackwardButtons } from './ForwardBackwardButtons';
import { OutlineField } from './OutlineField';
import { CopyStyleField } from './CopyStyleField';
import { RadiusField as OutlineRadiusField } from './outlines/RadiusField';
import { StrokeField as OutlineStrokeField } from './outlines/StrokeField';
import { StrokeWidthField as OutlineStrokeWidthField } from './outlines/StrokeWidthField';
import { FillField as OutlineFillField } from './outlines/FillField';
import { StrokeDasharrayField as OutlineStrokeDasharrayField } from './outlines/StrokeDasharrayField';
import { ForwardBackwardButtons as OutlineForwardBackwardButtons } from './outlines/ForwardBackwardButtons';
import { NumberingField } from './NumberingField';

import { DrawingOriginChecker } from 'Draw/origin/DrawingOriginChecker';

let drawingOriginChecker = new DrawingOriginChecker();

function DrawingHasNoBasesNotes() {
  return (
    <p className={styles.notesText} >
      Drawing has no bases...
    </p>
  );
}

function NoBasesAreSelectedNotes() {
  return (
    <div>
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

function WidthAndHeightFieldsSpacer(
  props?: {
    noBasesAreSelected?: boolean,
  },
) {
  return (
    <div
      style={{
        height: props?.noBasesAreSelected ? '52px' : '31px',
      }}
    />
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
  let noBasesAreSelected = props.bases.length == 0;

  let drawingOriginIsAnRNA2DSchema = (
    drawingOriginChecker.originIsAnRNA2DSchema(props.app.drawing)
  );

  // not usable if drawing layout is controlled by an RNA 2D schema
  let widthAndHeightFields = drawingOriginIsAnRNA2DSchema ? null : (
    <WidthAndHeightFields {...props} />
  );

  // only render if showing the width and height fields
  let widthAndHeightFieldsSpacer = !widthAndHeightFields ? null : (
    <WidthAndHeightFieldsSpacer {...{ noBasesAreSelected }} />
  );

  let textContentFieldBuilder = new TextContentFieldBuilder({
    app: props.app,
    bases: props.bases,
  });

  let textContentField = textContentFieldBuilder.build();

  let outlines = props.bases.map(b => b.outline).filter(
    (o): o is CircleBaseOutline => o instanceof CircleBaseOutline
  );

  return (
    <PartialWidthContainer
      unmount={props.unmount}
      history={props.history}
      title='Bases'
      style={{ width: '334px' }}
    >
      {props.app.drawing.bases().length == 0 ? (
        <DrawingHasNoBasesNotes />
      ) : noBasesAreSelected ? (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          {widthAndHeightFields}
          {widthAndHeightFieldsSpacer}
          <NoBasesAreSelectedNotes />
          <SelectAllBasesButton {...props} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          {widthAndHeightFields}
          {widthAndHeightFieldsSpacer}
          {textContentField}
          <FillField {...props} />
          <FontFamilyField {...props} />
          <FontSizeField {...props} />
          <BoldField {...props} />
          <ForwardBackwardButtons {...props} />
          <CopyStyleField {...props} />
          <OutlineField {...props} />
          {!props.bases.every(b => b.outline) ? null : (
            <div style={{ margin: '9px 0 0 11px', display: 'flex', flexDirection: 'column' }} >
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
