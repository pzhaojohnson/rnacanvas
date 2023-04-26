import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { TextArea } from 'Forms/inputs/text/TextArea';

export type Props = {
  label?: string;

  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;

  textArea?: {
    rows?: number;
    placeholder?: string;
    spellCheck?: boolean | 'true' | 'false';
    style?: React.CSSProperties;
  };

  style?: React.CSSProperties;
};

/**
 * A labeled textarea element.
 */
export function TextAreaField(props: Props) {
  return (
    <FieldLabel
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'text',
        ...props.style,
      }}
    >
      {props.label}
      <TextArea
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        rows={props.textArea?.rows ?? 10}
        placeholder={props.textArea?.placeholder}
        spellCheck={props.textArea?.spellCheck}
        style={{ marginTop: '4px', ...props.textArea?.style }}
      />
    </FieldLabel>
  );
}
