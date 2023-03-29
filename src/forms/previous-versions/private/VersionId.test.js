import { VersionId } from './VersionId';

describe('VersionId class', () => {
  describe('constructor', () => {
    test('a valid version ID', () => {
      expect(() => new VersionId('20220118t100358')).not.toThrow();
    });

    test('invalid version IDs', () => {
      // extra leading and trailing numbers
      expect(() => new VersionId('12320210409t112135')).toThrow();
      expect(() => new VersionId('20210409t1121351')).toThrow();

      // missing some leading and trailing numbers
      expect(() => new VersionId('21009t112135')).toThrow();
      expect(() => new VersionId('20210409t11213')).toThrow();

      // missing the t
      expect(() => new VersionId('20210409112135')).toThrow();

      // not a t
      expect(() => new VersionId('20210409u112135')).toThrow();

      // an empty version ID
      expect(() => new VersionId('')).toThrow();
    });
  });

  test('toDate method', () => {
    let vi = new VersionId('20210409t112135');
    let d = vi.toDate();
    expect(d.getFullYear()).toBe(2021);
    expect(d.getMonth()).toBe(3);
    expect(d.getDate()).toBe(9);
    expect(d.getHours()).toBe(11);
    expect(d.getMinutes()).toBe(21);
    expect(d.getSeconds()).toBe(35);
  });

  test('toURLString method', () => {
    let vi = new VersionId('20220706t092524');

    expect(vi.toURLString()).toBe(
      'https://20220706t092524-dot-rna2drawer2.uk.r.appspot.com'
    );
  });
});
