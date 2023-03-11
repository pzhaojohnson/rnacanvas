import { SVGTextDefaults } from './SVGTextDefaults';

test('SVGTextDefaults class', () => {
  expect(() => new SVGTextDefaults())
    .not.toThrow();
});
