import PerBaseStrictLayoutProps, { initializeAtPosition } from './PerBaseStrictLayoutProps';

describe('deepCopyArray static method', () => {
  let arr = [
    new PerBaseStrictLayoutProps(),
    new PerBaseStrictLayoutProps(),
    new PerBaseStrictLayoutProps(),
  ];
  let copyArr = PerBaseStrictLayoutProps.deepCopyArray(arr);

  it('returns no shared objects', () => {
    expect(copyArr).not.toBe(arr);
    copyArr.forEach((props, i) => {
      expect(props).not.toBe(arr[i]);
    });
  });

  it('returns correct values', () => {
    expect(
      JSON.stringify(arr)
    ).toBe(JSON.stringify(copyArr));
  });

  it('handles undefined props', () => {
    let arr = [
      new PerBaseStrictLayoutProps(),
      undefined,
      new PerBaseStrictLayoutProps(),
      undefined, // a trailing undefined element
    ];
    let copyArr = PerBaseStrictLayoutProps.deepCopyArray(arr);
    expect(JSON.stringify(copyArr)).toBe(JSON.stringify(arr));
    expect(copyArr.length).toBe(arr.length);
  });
});

describe('getOrCreatePropsAtPosition static method', () => {
  let arr = [
    new PerBaseStrictLayoutProps(),
    undefined,
    undefined,
    new PerBaseStrictLayoutProps(),
    new PerBaseStrictLayoutProps(),
  ];
  arr[3].triangleLoopHeight = 123.123;

  it('can retrieve props', () => {
    let props = PerBaseStrictLayoutProps.getOrCreatePropsAtPosition(arr, 2);
    expect(props).toStrictEqual(new PerBaseStrictLayoutProps()); // returns new props
    expect(props).toBe(arr[1]); // adds props to array
  });

  it('can create props', () => {
    let props = PerBaseStrictLayoutProps.getOrCreatePropsAtPosition(arr, 4);
    expect(props.triangleLoopHeight).toBe(123.123); // returns right props
    expect(props).toBe(arr[3]); // does not modify array
  });
});

it('fromSavedState static method', () => {
  let bps1 = new PerBaseStrictLayoutProps();
  bps1.stretch3 = 0.8;
  bps1.flatLoopAngle3 = Math.PI / 9;
  bps1.flipStem = true;
  bps1.loopShape = 'triangle';
  bps1.triangleLoopHeight = 8.55;
  let savableState1 = bps1.savableState();
  let bps2 = PerBaseStrictLayoutProps.fromSavedState(savableState1);
  let savableState2 = bps2.savableState();
  Object.keys(savableState1).forEach(k => {
    expect(savableState2[k]).toBe(savableState1[k]);
  });
});

it('fromSavedState static method - ignores undefined properties', () => {
  let bps1 = new PerBaseStrictLayoutProps();
  let bps2 = PerBaseStrictLayoutProps.fromSavedState({});
  let savableState1 = bps1.savableState();
  let savableState2 = bps2.savableState();
  Object.keys(savableState1).forEach(k => {
    expect(savableState2[k]).toBe(savableState1[k]);
  });
});

it('basic test of constructor', () => {
  expect(() => { new PerBaseStrictLayoutProps() }).not.toThrow();
});

it('deepCopy', () => {
  let bps1 = new PerBaseStrictLayoutProps();
  bps1.stretch3 = 0.78;
  bps1.flatLoopAngle3 = 4 * Math.PI / 5;
  bps1.flipStem = true;
  bps1.loopShape = 'triangle';
  bps1.triangleLoopHeight = 6.97;
  let bps2 = bps1.deepCopy();
  expect(bps2).not.toBe(bps1);
  let savableState1 = bps1.savableState();
  let savableState2 = bps2.savableState();
  Object.keys(savableState1).forEach(k => {
    expect(savableState2[k]).toBe(savableState1[k]);
  });
});

it('savableState', () => {
  let pbps = new PerBaseStrictLayoutProps();
  pbps.stretch3 = 3.7;
  pbps.flatLoopAngle3 = Math.PI / 5;
  pbps.flipStem = true;
  pbps.loopShape = 'triangle';
  pbps.triangleLoopHeight = 12.88;
  let savableState = pbps.savableState();
  expect(savableState.stretch3).toBe(3.7);
  expect(savableState.flatLoopAngle3).toBe(Math.PI / 5);
  expect(savableState.flipStem).toBe(true);
  expect(savableState.loopShape).toBe('triangle');
  expect(savableState.triangleLoopHeight).toBe(12.88);
});

it('savableState - can be converted to and read from a JSON string', () => {
  let pbps = new PerBaseStrictLayoutProps();
  let savableState1 = pbps.savableState();
  let json = JSON.stringify(savableState1);
  let savableState2 = JSON.parse(json);
  Object.keys(savableState1).forEach(k => {
    expect(savableState2[k]).toBe(savableState1[k]);
  });
});

test('initializeAtPosition function', () => {
  let props = new PerBaseStrictLayoutProps();
  props.stretch3 = (100 * Math.random()) + 12.275; // make different from default value
  expect(props).not.toStrictEqual(new PerBaseStrictLayoutProps());

  let arr = [undefined, null, props];
  let returned = [
    initializeAtPosition(arr, 1),
    initializeAtPosition(arr, 2),
    initializeAtPosition(arr, 3),
  ];
  expect(arr).toStrictEqual([
    new PerBaseStrictLayoutProps(), // initialized
    new PerBaseStrictLayoutProps(), // initialized
    props, // did not modify
  ]);
  expect(returned).toStrictEqual(arr);
});
