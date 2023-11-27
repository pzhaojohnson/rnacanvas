import { ValueHolder } from './ValueHolder';

test('ValueHolder class', () => {
  let valueHolder = new ValueHolder('idjfowiejf');
  expect(valueHolder.get()).toBe('idjfowiejf');

  valueHolder.set(28);
  expect(valueHolder.get()).toBe(28);

  valueHolder.set(null);
  expect(valueHolder.get()).toBe(null);

  let anObject = { asdf: 1234 };
  valueHolder.set(anObject);
  expect(valueHolder.get()).toBe(anObject);
});
