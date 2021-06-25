import * as Svg from '@svgdotjs/svg.js';

export interface BaseAnnotationInterface {
  readonly id: string;
  xCenter: number;
  yCenter: number;
  displacementLength: number;
  displacementAngle: number;

  shift(xShift: number, yShift: number): void;
  reposition(xBaseCenter: number, yBaseCenter: number): void;
  bringToFront(): void;
  sendToBack(): void;
  remove(): void;
  savableState(): object;
  refreshIds(): void;
}

export interface CircleBaseAnnotationPulsableProps {
  radius?: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

export interface PulseProps {
  duration?: number;
}

export interface CircleBaseAnnotationSavableState {
  className: string;
  circleId: string;
}

export interface CircleBaseAnnotationInterface extends BaseAnnotationInterface {
  readonly circle: Svg.Circle;
  pulsateBetween(pulsedProps: CircleBaseAnnotationPulsableProps, pulseProps?: PulseProps): void;
  savableState(): CircleBaseAnnotationSavableState;
}

export default BaseAnnotationInterface;
