import type { Partners } from 'Partners/Partners';
import type { Pair } from 'Partners/pairs/Pair';

/**
 * Returns an array of all the pairs in the structure.
 */
export function pairsInPartners(partners: Partners): Pair[] {
  let pairs: Pair[] = [];
  partners.forEach((q, i) => {
    let p = i + 1;
    if (typeof q == 'number' && p < q) {
      pairs.push([p, q]);
    }
  });
  return pairs;
}
