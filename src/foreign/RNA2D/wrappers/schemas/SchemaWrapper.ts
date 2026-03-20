import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { SchemaClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { RNAComplexWrapper } from 'Foreign/RNA2D/wrappers/rna-complexes/RNAComplexWrapper';

export class SchemaWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get classes() {
    let classes = (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes')
      .map(c => new SchemaClassWrapper(c));

    // include hard-coded classes first (so they can be possibly overruled)
    return [
      ...hardCodedClasses,
      ...classes,
    ];
  }

  get rnaComplexes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('rnaComplexes')
      .map(rc => new RNAComplexWrapper(rc));
  }
}

const hardCodedClasses = [
  {
    name: 'text-black',
    fill: '#000000',
  },
  {
    name: 'text-green',
    fill: '#00ff00',
  },
  {
    name: 'text-red',
    fill: '#ff00ff',
  },
  {
    name: 'text-blue',
    fill: '#0000ff',
  },
].map(c => new SchemaClassWrapper(c));
