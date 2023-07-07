import { NewAppTabOpener } from './NewAppTabOpener';

import { NewAppTabOpenerBuilder } from './NewAppTabOpenerBuilder';

describe('NewAppTabOpenerBuilder class', () => {
  test('build method', () => {
    let builder = new NewAppTabOpenerBuilder();
    let newAppTabOpener = builder.build();
    expect(newAppTabOpener).toBeInstanceOf(NewAppTabOpener);
    expect(newAppTabOpener).toBeTruthy();
  });
});
