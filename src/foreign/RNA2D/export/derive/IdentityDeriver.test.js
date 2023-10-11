import { IdentityDeriver } from './IdentityDeriver';

describe('IdentityDeriver class', () => {
  describe('deriveFrom method', () => {
    it('simply returns the input value', () => {
      let identityDeriver = new IdentityDeriver();

      expect(identityDeriver.deriveFrom('298ruwafisjkdlf')).toBe('298ruwafisjkdlf');
    });
  });
});
