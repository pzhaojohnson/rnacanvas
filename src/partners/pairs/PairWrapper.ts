import type { Pair } from 'Partners/pairs/Pair';
import { deepCopyPair } from 'Partners/pairs/Pair';
import { upstreamPartner } from 'Partners/pairs/Pair';
import { downstreamPartner } from 'Partners/pairs/Pair';
import { pairsAreEqual } from 'Partners/pairs/pairsAreEqual';

export class PairWrapper {
  /**
   * The wrapped pair.
   */
  readonly pair: Pair;

  constructor(pair: Pair | PairWrapper) {
    this.pair = pair instanceof PairWrapper ? pair.pair : pair;
  }

  /**
   * Deep copies the wrapped pair as well as the pair wrapper.
   */
  deepCopy(): PairWrapper {
    return new PairWrapper(deepCopyPair(this.pair));
  }

  get upstreamPartner() {
    return upstreamPartner(this.pair);
  }

  get downstreamPartner() {
    return downstreamPartner(this.pair);
  }

  equals(other: Pair | PairWrapper) {
    let otherPair = other instanceof PairWrapper ? other.pair : other;
    return pairsAreEqual(this.pair, otherPair);
  }
}

export {
  PairWrapper as Pair,
};
