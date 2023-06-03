import * as FromNumber from './private/fromNumber';

export function createBaseNumbering(n: number) {
  return FromNumber.BaseNumberingDecorator.fromNumber(n);
}
