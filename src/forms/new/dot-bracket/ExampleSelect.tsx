import * as React from 'react';
import styles from './ExampleSelect.css';

function LabelSpacer() {
  return <div style={{ flexGrow: 2 }} />;
}

function ExamplesSpacer() {
  return <div style={{ flexGrow: 2 }} />;
}

function EndSpacer() {
  return <div style={{ flexGrow: 2 }} />
}

export type Props = {
  examples: string[];
  select: (example: string) => void;
}

export function ExampleSelect(props: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
      <p
        className='unselectable'
        style={{ fontSize: '14px', fontWeight: 600, fontStyle: 'italic', color: 'rgb(32, 32, 36)' }}
      >
        Examples...
      </p>
      <LabelSpacer />
      {props.examples.map((e, i) => [
        <button
          key={2 * i}
          className={`${styles.option}`}
          onClick={() => props.select(e)}
        >
          {e}
        </button>,
        i == props.examples.length - 1 ? null : <ExamplesSpacer key={(2 * i) + 1} />,
      ])}
      <EndSpacer />
    </div>
  );
}
