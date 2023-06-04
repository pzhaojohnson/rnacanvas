import type { Base } from 'Draw/bases/Base';

export type ConstructorArgs = {
  id: string;

  bases: Base[];
};

/**
 * Contains the data of a sequence.
 */
export class Sequence {
  id: string;

  /**
   * The bases in the sequence.
   */
  bases: Base[];

  constructor(args: ConstructorArgs) {
    let { id, bases } = args;

    this.id = id;

    // make a new array
    this.bases = [...bases];
  }
}
