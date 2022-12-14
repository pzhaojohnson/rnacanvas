import type { Partners } from 'Partners/Partners';

export function areUnstructured(partners: Partners): boolean {
  return partners.every(q => q == undefined);
}
