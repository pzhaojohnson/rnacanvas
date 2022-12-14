import { StrictLayoutSpecification } from './StrictLayoutSpecification';

import { Stem } from 'Partners/stems/Stem';
import { bottomPair } from 'Partners/stems/Stem';
import { topPair } from 'Partners/stems/Stem';
import { upstreamPartner } from 'Partners/pairs/Pair';
import { downstreamPartner } from 'Partners/pairs/Pair';
import { containingStem as stemContainingPosition } from 'Partners/stems/containingStem';

import { Linker } from 'Partners/linkers/Linker';
import { upstreamBoundingPosition } from 'Partners/linkers/Linker';
import { downstreamBoundingPosition } from 'Partners/linkers/Linker';

import { atPosition } from 'Array/at';

// returns true if the stem has a triangle loop
export function hasTriangleLoop(spec: StrictLayoutSpecification, stem: Stem): boolean {
  let p = upstreamPartner(bottomPair(stem));
  let props = atPosition(spec.perBasePropsArray, p);
  return props?.loopShape == 'triangle';
}

// returns true if the linker is the first linker in a triangle loop
export function isFirstLinkerInTriangleLoop(spec: StrictLayoutSpecification, linker: Linker): boolean {
  let stem = stemContainingPosition(spec.partners, upstreamBoundingPosition(linker));
  if (stem) {
    return (
      hasTriangleLoop(spec, stem)
      && upstreamBoundingPosition(linker) == upstreamPartner(topPair(stem))
    );
  } else {
    return false;
  }
}

// returns true if the linker is the last linker in a triangle loop
export function isLastLinkerInTriangleLoop(spec: StrictLayoutSpecification, linker: Linker): boolean {
  let stem = stemContainingPosition(spec.partners, downstreamBoundingPosition(linker));
  if (stem) {
    return (
      hasTriangleLoop(spec, stem)
      && downstreamBoundingPosition(linker) == downstreamPartner(topPair(stem))
    );
  } else {
    return false;
  }
}
