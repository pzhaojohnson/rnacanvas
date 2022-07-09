import { Partners } from 'Partners/Partners';

import { Stem } from 'Partners/stems/Stem';
import { bottomPair } from 'Partners/stems/Stem';
import { upstreamPartner } from 'Partners/pairs/Pair';
import { downstreamPartner } from 'Partners/pairs/Pair';

import { Linker } from 'Partners/linkers/Linker';
import { createLinker } from 'Partners/linkers/Linker';
import { containingUnpairedRegion as linkerContainingPosition } from 'Partners/containing';

// returns the linker immediately before the stem
export function leadingLinker(partners: Partners, stem: Stem): Linker {
  let p = upstreamPartner(bottomPair(stem));
  if (p == 1) {
    return createLinker({ upstreamBoundingPosition: 0, downstreamBoundingPosition: 1 });
  } else {
    let linker = linkerContainingPosition(partners, p - 1);
    if (linker) {
      return linker;
    } else {
      return createLinker({ upstreamBoundingPosition: p - 1, downstreamBoundingPosition: p });
    }
  }
}

// returns the linker immediately after the stem
export function trailingLinker(partners: Partners, stem: Stem): Linker {
  let p = downstreamPartner(bottomPair(stem));
  if (p == partners.length) {
    return createLinker({ upstreamBoundingPosition: partners.length, downstreamBoundingPosition: partners.length + 1 });
  } else {
    let linker = linkerContainingPosition(partners, p + 1);
    if (linker) {
      return linker;
    } else {
      return createLinker({ upstreamBoundingPosition: p, downstreamBoundingPosition: p + 1 });
    }
  }
}
