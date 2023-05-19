export type NonNullObject = { [key: string]: unknown };

export function isNonNullObject(value: unknown): value is NonNullObject {
  return typeof value === 'object' && value !== null;
}
