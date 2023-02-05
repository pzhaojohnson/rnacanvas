import { uuidRegex } from './uuidRegex';

test('uuidRegex', () => {
  // random strings
  expect('').not.toMatch(uuidRegex);
  expect('A').not.toMatch(uuidRegex);
  expect('asdf').not.toMatch(uuidRegex);

  // a UUID
  expect('98e4ee7e-d333-4ac0-96a3-31d7fdea7fda').toMatch(uuidRegex);

  // a UUID with capital letters
  expect('98E4EE7E-D333-4AC0-96A3-31D7FDEA7FDA').toMatch(uuidRegex);

  // a UUID with prepended characters
  expect('uuid-83b10310-23e0-4b7c-97c6-3fffa8c3502e').toMatch(uuidRegex);

  // a UUID with appended characters
  expect('dcdd1fd5-39c6-4536-aa3d-64db0b623866-qwer').toMatch(uuidRegex);

  // missing some characters
  expect('dcddfd5-39c6-4536-aa3d-64db0b623866').not.toMatch(uuidRegex);
  expect('uuid-dcdd1fd5-39c6-4536-aa3d-64db0623866').not.toMatch(uuidRegex);
  expect('dcdd1fd5-396-4536-aa3d-64db0b623866-qwer').not.toMatch(uuidRegex);
});
