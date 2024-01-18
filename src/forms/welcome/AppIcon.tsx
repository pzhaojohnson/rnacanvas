import * as React from 'react';

import styles from './AppIcon.css';

type LoopProps = {
  cx: string;
  cy: string;
  r: string;
};

function PeripheralLoop(props: LoopProps) {
  return <circle className={styles.peripheralLoop} {...props} />;
}

function CentralLoop(props: LoopProps) {
  return <circle className={styles.centralLoop} {...props} />;
}

type StemProps = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

function Stem(props: StemProps) {
  return <line className={styles.stem} {...props} />;
}

export function AppIcon() {
  let xmlns = 'http://www.w3.org/2000/svg';

  let className = styles.appIcon;

  let viewBox = '0 0 192 192';

  return (
    <svg {...{ xmlns, className, viewBox }} >
      <Stem x1='16' y1='96' x2='96' y2='96' />
      <Stem x1='96' y1='96' x2='176' y2='96' />
      <Stem x1='96' y1='96' x2='96' y2='176' />
      <Stem x1='96' y1='16' x2='96' y2='96' />
      <Stem x1='39.4' y1='39.4' x2='96' y2='96' />
      <Stem x1='152.6' y1='39.4' x2='96' y2='96' />
      <PeripheralLoop cx='16' cy='96' r='16' />
      <PeripheralLoop cx='96' cy='16' r='16' />
      <PeripheralLoop cx='39.4' cy='39.4' r='16' />
      <PeripheralLoop cx='152.6' cy='39.4' r='16' />
      <PeripheralLoop cx='176' cy='96' r='16' />
      <PeripheralLoop cx='96' cy='176' r='16' />
      <CentralLoop cx='96' cy='96' r='16' />
    </svg>
  );
}
