import { TextCenterPointDeriver } from './TextCenterPointDeriver';

describe('TextCenterPointDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the correct X and Y coordinates', () => {
      let textCenterPointDeriver = new TextCenterPointDeriver();

      let text = {
        bbox: () => ({ cx: 32.218746, cy: 6892.18412 }),
      };

      expect(textCenterPointDeriver.deriveFrom(text)).toStrictEqual({
        x: 32.218746,
        y: 6892.18412,
      });
    });
  });
});
