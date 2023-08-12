import { SecondaryBondRemover } from './SecondaryBondRemover';

describe('SecondaryBondRemover class', () => {
  describe('remove method', () => {
    it('forwards to the remove-secondary-bonds function', () => {
      let drawing = 'Drawing - 131693893';
      let removeSecondaryBondsFn = jest.fn();

      let remover = new SecondaryBondRemover({
        drawing, removeSecondaryBondsFn,
      });

      let secondaryBond = 'Secondary bond - 81983rehius';
      remover.remove(secondaryBond);

      expect(removeSecondaryBondsFn).toHaveBeenCalledTimes(1);
      let call = removeSecondaryBondsFn.mock.calls[0];

      expect(call[0]).toBe('Drawing - 131693893');

      // wrapped in array
      expect(call[1]).toStrictEqual(['Secondary bond - 81983rehius']);

      expect(call[2]).toStrictEqual({ updateLayout: false });
    });
  });
});
