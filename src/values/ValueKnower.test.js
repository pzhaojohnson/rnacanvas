import { ValueKnower } from './ValueKnower';

describe('ValueKnower class', () => {
  describe('say method', () => {
    it('returns the value-to-know', () => {
      let valueKnower = new ValueKnower('asij28u9qiwfasj09ir2wiu');
      expect(valueKnower.say()).toBe('asij28u9qiwfasj09ir2wiu');
    });
  });
});
