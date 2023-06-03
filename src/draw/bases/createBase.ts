import * as FromString from './private/fromString';

export function createBase(s: string) {
  return FromString.BaseDecorator.fromString(s);
}
