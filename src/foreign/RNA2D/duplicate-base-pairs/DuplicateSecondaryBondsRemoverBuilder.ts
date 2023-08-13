import { DuplicateSecondaryBondsRemover } from './DuplicateSecondaryBondsRemover';

import { DuplicateSecondaryBondFinder } from './helpers/DuplicateSecondaryBondFinder';

import { AllSecondaryBondsProvider } from './helpers/AllSecondaryBondsProvider';

import { AreDuplicatesChecker } from './helpers/AreDuplicatesChecker';

import { SecondaryBondRemover } from './helpers/SecondaryBondRemover';

import { removeSecondaryBonds as removeSecondaryBondsFn } from 'Draw/strict/removeSecondaryBonds';

import type { App } from 'App';

import type { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

export type Drawing = InstanceType<typeof App>['drawing'];

export class DuplicateSecondaryBondsRemoverBuilder {
  /**
   * Builds a duplicate secondary bonds remover for the drawing.
   */
  buildFor(drawing: Drawing): DuplicateSecondaryBondsRemover<SecondaryBond> {
    let allSecondaryBondsProvider = new AllSecondaryBondsProvider({
      drawing,
    });

    let areDuplicatesChecker = new AreDuplicatesChecker();

    let duplicateSecondaryBondFinder = new DuplicateSecondaryBondFinder<SecondaryBond>({
      allSecondaryBondsProvider,
      areDuplicatesChecker,
    });

    let secondaryBondRemover = new SecondaryBondRemover({
      drawing,
      removeSecondaryBondsFn,
    });

    return new DuplicateSecondaryBondsRemover({
      duplicateSecondaryBondFinder,
      secondaryBondRemover,
    });
  }
}
