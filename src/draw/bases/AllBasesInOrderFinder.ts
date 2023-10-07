export interface Sequence<TBase> {
  /**
   * The bases in the sequence.
   *
   * (Are inherently ordered by being in an array.)
   */
  bases: TBase[];
}

export interface Drawing<TBase> {
  /**
   * The sequences in the drawing.
   *
   * (Are inherently ordered by being in an array.)
   */
  sequences: Sequence<TBase>[];
}

export class AllBasesInOrderFinder<TBase> {
  /**
   * Returns all the bases in the drawing in the order determined by
   * the ordering of sequences in the drawing.
   */
  findIn(drawing: Drawing<TBase>): TBase[] {
    return drawing.sequences.flatMap(seq => [...seq.bases]);
  }
}
