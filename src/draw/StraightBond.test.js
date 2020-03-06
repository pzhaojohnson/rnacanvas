import { StraightBond, StrandBond, WatsonCrickBond } from './StraightBond';
import createNodeSVG from './createNodeSVG';
import createUUIDforSVG from './createUUIDforSVG';
import Base from './Base';

it('fromSavedState static method valid saved state', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1.1, 1.2);
    let b2 = Base.create(svg, 'U', 2.1, 2.2);
    let sb1 = StraightBondClass.create(svg, b1, b2);

    let savableState = sb1.savableState();

    let getBaseById = (id) => {
      let dict = {};
      dict[b1.id] = b1;
      dict[b2.id] = b2;
      return dict[id];
    };

    let sb2 = StraightBondClass.fromSavedState(savableState, svg, getBaseById);

    expect(sb2._line.id()).toBe(sb1._line.id());
    expect(sb2.base1).toBe(sb1.base1);
    expect(sb2.base2).toBe(sb1.base2);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('fromSavedState static method invalid saved state', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1.1, 1.2);
    let b2 = Base.create(svg, 'U', 2.1, 2.2);
    let sb1 = StraightBondClass.create(svg, b1, b2);

    let getBaseById = (id) => {
      let dict = {};
      dict[b1.id] = b1;
      dict[b2.id] = b2;
      return dict[id];
    };

    let savableState = sb1.savableState();
    expect(() => StraightBondClass.fromSavedState(savableState, svg, getBaseById)).not.toThrow();

    // no class name defined
    delete savableState.className;
    expect(() => StraightBondClass.fromSavedState(savableState, svg, getBaseById)).toThrow();

    // class name is not a string
    savableState.className = 2;
    expect(() => StraightBondClass.fromSavedState(savableState, svg, getBaseById)).toThrow();

    // class name is an empty string
    savableState.className = '';
    expect(() => StraightBondClass.fromSavedState(savableState, svg, getBaseById)).toThrow();

    // class name is nonempty and incorrect
    savableState.className = 'StraightBnd';
    expect(() => StraightBondClass.fromSavedState(savableState, svg, getBaseById)).toThrow();
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('fromSavedState updates most recent padding1, padding2, and strokeWidth properties', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', 5, 6);
    let b2 = Base.create(svg, 'e', 0, 0);
    let sb1 = StraightBondClass.create(svg, b1, b2);
    sb1.padding1 = 5;
    sb1.padding2 = 0.5;
    sb1.strokeWidth = 1.65;
    let savableState = sb1.savableState();

    function getBaseById(id) {
      let dict = {};
      dict[b1.id] = b1;
      dict[b2.id] = b2;
      return dict[id];
    }

    let sb2 = StraightBondClass.fromSavedState(savableState, svg, getBaseById);
    let mrps = StraightBondClass.mostRecentProps();
    expect(mrps.padding1).toBeCloseTo(5, 6);
    expect(mrps.padding2).toBeCloseTo(0.5, 6);
    expect(mrps.strokeWidth).toBeCloseTo(1.65, 6);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('StrandBond fromSavedState updates most recent stroke property', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'a', 5, 6);
  let b2 = Base.create(svg, 'e', 0, 0);
  let sb1 = StrandBond.create(svg, b1, b2);
  sb1.stroke = '#433221';
  let savableState = sb1.savableState();

  function getBaseById(id) {
    let dict = {};
    dict[b1.id] = b1;
    dict[b2.id] = b2;
    return dict[id];
  }

  let sb2 = StrandBond.fromSavedState(savableState, svg, getBaseById);
  let mrps = StrandBond.mostRecentProps();
  expect(mrps.stroke).toBe('#433221');
});

it('WatsonCrickBond fromSavedState updates most recent stroke properties', () => {
  let svg = createNodeSVG();
  let ba = Base.create(svg, 'a', 4, 1);
  let bu = Base.create(svg, 'U', 7, 100);
  let bg = Base.create(svg, 'G', -10, 5);
  let bc = Base.create(svg, 'c', 11, 33);
  let bt = Base.create(svg, 't', 4, 99);

  let wcbau = WatsonCrickBond.create(svg, ba, bu);
  let wcbgc = WatsonCrickBond.create(svg, bc, bg);
  let wcbgu = WatsonCrickBond.create(svg, bu, bg);
  let wcbat = WatsonCrickBond.create(svg, bt, ba);
  let wcbgt = WatsonCrickBond.create(svg, bg, bt);
  let wcbOther = WatsonCrickBond.create(svg, bg, ba);

  function getBaseById(id) {
    let dict = {};
    dict[ba.id] = ba;
    dict[bu.id] = bu;
    dict[bg.id] = bg;
    dict[bc.id] = bc;
    dict[bt.id] = bt;
    return dict[id];
  }

  wcbau.stroke = '#445522';
  let auSavableState = wcbau.savableState();
  WatsonCrickBond.fromSavedState(auSavableState, svg, getBaseById);
  expect(WatsonCrickBond.mostRecentProps().autStroke).toBe('#445522');
  
  wcbgc.stroke = '#aabcde';
  let gcSavableState = wcbgc.savableState();
  WatsonCrickBond.fromSavedState(gcSavableState, svg, getBaseById);
  expect(WatsonCrickBond.mostRecentProps().gcStroke).toBe('#aabcde');

  wcbgu.stroke = '#aaabbb';
  let guSavablestate = wcbgu.savableState();
  WatsonCrickBond.fromSavedState(guSavablestate, svg, getBaseById);
  expect(WatsonCrickBond.mostRecentProps().gutStroke).toBe('#aaabbb');

  wcbat.stroke = '#654321';
  let atSavableState = wcbat.savableState();
  WatsonCrickBond.fromSavedState(atSavableState, svg, getBaseById);
  expect(WatsonCrickBond.mostRecentProps().autStroke).toBe('#654321');

  wcbgt.stroke = '#987654';
  let gtSavableState = wcbgt.savableState();
  WatsonCrickBond.fromSavedState(gtSavableState, svg, getBaseById);
  expect(WatsonCrickBond.mostRecentProps().gutStroke).toBe('#987654');

  wcbOther.stroke = '#a1b2c3';
  let otherSavableState = wcbOther.savableState();
  WatsonCrickBond.fromSavedState(otherSavableState, svg, getBaseById);
  expect(WatsonCrickBond.mostRecentProps().otherStroke).toBe('#a1b2c3');
});

it('StrandBond _applyMostRecentProps static method', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'A', 5, 6);
  let b2 = Base.create(svg, 'g', 1, 3);
  let sb = StrandBond.create(svg, b1, b2);
  
  StrandBond._mostRecentProps.padding1 = 5.111;
  StrandBond._mostRecentProps.padding2 = 1.222;
  StrandBond._mostRecentProps.stroke = '#453423';
  StrandBond._mostRecentProps.strokeWidth = 5.432;
  StrandBond._applyMostRecentProps(sb);
  expect(sb.padding1).toBeCloseTo(5.111, 6);
  expect(sb.padding2).toBeCloseTo(1.222, 6);
  expect(sb.stroke).toBe('#453423');
  expect(sb.strokeWidth).toBeCloseTo(5.432, 6);
});

it('WatsonCrickBond _applyMostRecentProps padding1, padding2, and strokeWidth', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'g', 1, 3);
  let b2 = Base.create(svg, 't', 6, 6);
  let wcb = new WatsonCrickBond(svg, b1, b2);

  WatsonCrickBond._mostRecentProps.padding1 = 66.5;
  WatsonCrickBond._mostRecentProps.padding2 = 12.33;
  WatsonCrickBond._mostRecentProps.strokeWidth = 1.222;
  WatsonCrickBond._applyMostRecentProps(wcb);
  expect(wcb.padding1).toBeCloseTo(66.5, 6);
  expect(wcb.padding2).toBeCloseTo(12.33, 6);
  expect(wcb.strokeWidth).toBeCloseTo(1.222, 6);
});

it('WatsonCrickBond _applyMostRecentProps stroke', () => {
  let svg = createNodeSVG();
  let ba = Base.create(svg, 'A', 3, 5);
  let bu = Base.create(svg, 'U', 4, 3);
  let bg = Base.create(svg, 'g', 3, 2);
  let bc = Base.create(svg, 'c', 2, 2);
  let bt = Base.create(svg, 't', 5.5, -5.5);

  let wcbau = WatsonCrickBond.create(svg, bu, ba);
  let wcbgc = WatsonCrickBond.create(svg, bc, bg);
  let wcbgu = WatsonCrickBond.create(svg, bg, bu);
  let wcbat = WatsonCrickBond.create(svg, bt, ba);
  let wcbgt = WatsonCrickBond.create(svg, bt, bg);
  let wcbOther = WatsonCrickBond.create(svg, ba, bc);
  
  WatsonCrickBond._mostRecentProps.autStroke = '#aabbcc';
  WatsonCrickBond._mostRecentProps.gcStroke = '#ccbbaa';
  WatsonCrickBond._mostRecentProps.gutStroke = '#112233';
  WatsonCrickBond._mostRecentProps.otherStroke = '#998877';

  WatsonCrickBond._applyMostRecentProps(wcbau);
  expect(wcbau.stroke).toBe('#aabbcc');
  WatsonCrickBond._applyMostRecentProps(wcbgc);
  expect(wcbgc.stroke).toBe('#ccbbaa');
  WatsonCrickBond._applyMostRecentProps(wcbgu);
  expect(wcbgu.stroke).toBe('#112233');
  WatsonCrickBond._applyMostRecentProps(wcbat);
  expect(wcbat.stroke).toBe('#aabbcc');
  WatsonCrickBond._applyMostRecentProps(wcbgt);
  expect(wcbgt.stroke).toBe('#112233');
  WatsonCrickBond._applyMostRecentProps(wcbOther);
  expect(wcbOther.stroke).toBe('#998877');
});

it('StrandBond _copyPropsToMostRecent', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'b', 1, 3);
  let b2 = Base.create(svg, 'n', 5, 7);
  let sb = StrandBond.create(svg, b1, b2);
  
  sb.padding1 = 5.6789;
  sb.padding2 = 4.365;
  sb.stroke = '#9a8c7b';
  sb.strokeWidth = 3.222;
  StrandBond._copyPropsToMostRecent(sb);

  let mrps = StrandBond.mostRecentProps();
  expect(mrps.padding1).toBeCloseTo(5.6789, 6);
  expect(mrps.padding2).toBeCloseTo(4.365, 6);
  expect(mrps.stroke).toBe('#9a8c7b');
  expect(mrps.strokeWidth).toBeCloseTo(3.222, 6);
});

it('WatsonCrickBond _copyPropsToMostRecent padding1, padding2, and strokeWidth', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'e', 5.5, 4);
  let b2 = Base.create(svg, 'w', 4, 3);
  let wcb = WatsonCrickBond.create(svg, b1, b2);

  wcb.padding1 = 8.777;
  wcb.padding2 = 6.578;
  wcb.strokeWidth = 35;
  WatsonCrickBond._copyPropsToMostRecent(wcb);

  let mrps = WatsonCrickBond.mostRecentProps();
  expect(mrps.padding1).toBeCloseTo(8.777, 6);
  expect(mrps.padding2).toBeCloseTo(6.578, 6);
  expect(mrps.strokeWidth).toBeCloseTo(35, 6);
});

it('WatsonCrickBond _copyPropsToMostRecent stroke', () => {
  let svg = createNodeSVG();
  let ba = Base.create(svg, 'A', 3, 5);
  let bu = Base.create(svg, 'U', 4, 3);
  let bg = Base.create(svg, 'g', 3, 2);
  let bc = Base.create(svg, 'c', 2, 2);
  let bt = Base.create(svg, 't', 5.5, -5.5);

  let wcbau = WatsonCrickBond.create(svg, bu, ba);
  let wcbgc = WatsonCrickBond.create(svg, bc, bg);
  let wcbgu = WatsonCrickBond.create(svg, bg, bu);
  let wcbat = WatsonCrickBond.create(svg, bt, ba);
  let wcbgt = WatsonCrickBond.create(svg, bt, bg);
  let wcbOther = WatsonCrickBond.create(svg, ba, bc);
  
  wcbau.stroke = '#123456';
  wcbgc.stroke = '#234567';
  wcbgu.stroke = '#345678';
  wcbat.stroke = '#456789';
  wcbgt.stroke = '#567890';
  wcbOther.stroke = '#678900';

  WatsonCrickBond._copyPropsToMostRecent(wcbau);
  expect(WatsonCrickBond.mostRecentProps().autStroke).toBe('#123456');
  WatsonCrickBond._copyPropsToMostRecent(wcbgc);
  expect(WatsonCrickBond.mostRecentProps().gcStroke).toBe('#234567');
  WatsonCrickBond._copyPropsToMostRecent(wcbgu);
  expect(WatsonCrickBond.mostRecentProps().gutStroke).toBe('#345678');
  WatsonCrickBond._copyPropsToMostRecent(wcbat);
  expect(WatsonCrickBond.mostRecentProps().autStroke).toBe('#456789');
  WatsonCrickBond._copyPropsToMostRecent(wcbgt);
  expect(WatsonCrickBond.mostRecentProps().gutStroke).toBe('#567890');
  WatsonCrickBond._copyPropsToMostRecent(wcbOther);
  expect(WatsonCrickBond.mostRecentProps().otherStroke).toBe('#678900');
});

function checkCoordinates(cs, ecs) {
  expect(cs.x1).toBeCloseTo(ecs.x1, 6);
  expect(cs.y1).toBeCloseTo(ecs.y1, 6);
  expect(cs.x2).toBeCloseTo(ecs.x2, 6);
  expect(cs.y2).toBeCloseTo(ecs.y2, 6);
}

it('StraightBond _lineCoordinates static method', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'A', 1, 2);
  let b2 = Base.create(svg, 'U', 5, 6);
  
  // basic test
  checkCoordinates(
    StraightBond._lineCoordinates(b1, b2, 1, 2),
    {
      x1: 1 + (2 ** -0.5),
      y1: 2 + (2 ** -0.5),
      x2: 5 - (2 ** 0.5),
      y2: 6 - (2 ** 0.5),
    },
  );

  // paddings of zero
  checkCoordinates(
    StraightBond._lineCoordinates(b1, b2, 0, 0),
    {
      x1: 1,
      y1: 2,
      x2: 5,
      y2: 6,
    },
  );

  // negative base coordinates
  b1.move(-2, -1);
  b2.move(-10.5, -100);
  
  checkCoordinates(
    StraightBond._lineCoordinates(b1, b2, 2.5, 1.111),
    {
      x1: -2.2138596577358562,
      y1: -3.49083601362938,
      x2: -10.404960768102185,
      y2: -98.89307247554311,
    },
  );

  // paddings greater than distance between bases
  checkCoordinates(
    StraightBond._lineCoordinates(b1, b2, 60, 60),
    {
      x1: -7.132631785660548,
      y1: -60.78006432710513,
      x2: -5.367368214339452,
      y2: -40.21993567289487,
    },
  );
});

it('_opacity static method', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'q', 0, 0);
  let b2 = Base.create(svg, 'w', 10, 10);

  // paddings are greater than distance between bases
  expect(StraightBond._opacity(b1, b2, 20, 20)).toBe(0);

  // paddings are less than distance between bases
  expect(StraightBond._opacity(b1, b2, 1, 1)).toBe(1);
});

it('basic test of create static method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1, 1);
    let b2 = Base.create(svg, 'U', 4, 4);
    let sb = StraightBondClass.create(svg, b1, b2);
    expect(typeof(sb) === 'object' && sb !== null).toBeTruthy();
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('basic test of constructor', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let line = svg.line(0, 0.22, 2.45, -1);
    line.id(createUUIDforSVG());
    let b1 = Base.create(svg, 'G', -1, -2);
    let b2 = Base.create(svg, 'C', 10, 0.002);
    expect(() => new StraightBondClass(line, b1, b2)).not.toThrow();
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('_validateLine method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1, 2);
    let b2 = Base.create(svg, 'U', 2, 3);

    let line1 = svg.line(1, 1, 2, 2);
    line1.id(createUUIDforSVG());
    expect(() => new StraightBondClass(line1, b1, b2)).not.toThrow();
    
    // ID is not a string
    let line2 = svg.line(-1, -2, 0, 0);
    line2.id(22);
    expect(() => new StraightBondClass(line2, b0, b1)).toThrow();
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('base1 and base2 getters', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 4.5, 6);
    let b2 = Base.create(svg, 'u', -10, -4);
    let sb = StraightBondClass.create(svg, b1, b2);
    expect(sb.base1).toBe(b1);
    expect(sb.base2).toBe(b2);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('StrandBond id getter', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b0 = Base.create(svg, 'A', 1, 2);
    let b1 = Base.create(svg, 'U', 2, 3);

    let line = svg.line(1, 2, 3, 4);
    let id = createUUIDforSVG();
    line.attr({ 'id': id });
    let sb = new StraightBondClass(line, b0, b1);
    
    // check getter
    expect(sb.id).toBe(id);

    // check actual value
    expect(sb._line.id()).toBe(id);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('padding1 getter and setter', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', 40.3, 4.9);
    let b2 = Base.create(svg, 'T', 1, 4);
    let sb = StraightBondClass.create(svg, b1, b2);
    sb.padding1 = 8;
    sb.padding2 = 8;

    let x2 = sb._line.attr('x2');
    let y2 = sb._line.attr('y2');

    sb.padding1 = 0.25;

    // check getter
    expect(sb.padding1).toBeCloseTo(0.25, 6);

    // check actual line coordinates
    checkCoordinates(
      {
        x1: sb._line.attr('x1'),
        y1: sb._line.attr('y1'),
        x2: sb._line.attr('x2'),
        y2: sb._line.attr('y2'),
      },
      {
        x1: 40.05006552984633,
        y1: 4.89427630984381,
        x2: x2,
        y2: y2,
      },
    );
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('StrandBond padding2 getter and setter', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', 0.2, -3);
    let b2 = Base.create(svg, 'T', 120.5, 8);
    let sb = StraightBondClass.create(svg, b1, b2);
    sb.padding1 = 8;
    sb.padding2 = 8;

    let x1 = sb._line.attr('x1');
    let y1 = sb._line.attr('y1');

    sb.padding2 = 0.5;

    // check getter
    expect(sb.padding2).toBeCloseTo(0.5, 6);

    // check actual line coordinates
    checkCoordinates(
      {
        x1: sb._line.attr('x1'),
        y1: sb._line.attr('y1'),
        x2: sb._line.attr('x2'),
        y2: sb._line.attr('y2'),
      },
      {
        x1: x1,
        y1: y1,
        x2: 120.00207721370248,
        y2: 7.954470900671049,
      },
    );
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('reposition method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', 0.2, -3);
    let b2 = Base.create(svg, 'T', 120.5, 8);
    let sb = StraightBondClass.create(svg, b1, b2);

    sb.padding1 = 5;
    sb.padding2 = 0.99;

    b1.move(-10, 0.5);
    b2.move(1000, 980.2);

    sb.reposition();

    checkCoordinates(
      {
        x1: sb._line.attr('x1'),
        y1: sb._line.attr('y1'),
        x2: sb._line.attr('x2'),
        y2: sb._line.attr('y2'),
      },
      {
        x1: -6.411041600732329,
        y1: 3.981289647289641,
        x2: 999.289386236945,
        y2: 979.5107046498367,
      },
    );
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('_reposition method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', 0.2, -3);
    let b2 = Base.create(svg, 'T', 120.5, 8);
    let sb = StraightBondClass.create(svg, b1, b2);

    b1.move(-10, 0.5);
    b2.move(1000, 980.2);

    sb._reposition(5, 0.99);

    checkCoordinates(
      {
        x1: sb._line.attr('x1'),
        y1: sb._line.attr('y1'),
        x2: sb._line.attr('x2'),
        y2: sb._line.attr('y2'),
      },
      {
        x1: -6.411041600732329,
        y1: 3.981289647289641,
        x2: 999.289386236945,
        y2: 979.5107046498367,
      },
    );
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('_reposition method updates opacity', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'b', 0, 1);
    let b2 = Base.create(svg, 'n', -100.5, -101.6);
    let sb = StraightBondClass.create(svg, b1, b2);

    expect(sb.opacity).toBe(1);
    b1.move(100, 100.5);
    b2.move(200.1, 200.011);
    sb._reposition(1000, 999);
    expect(sb.opacity).toBe(0);

    b1.move(0, 0);
    b2.move(10000, 100009);
    sb._reposition(1000, 999);
    expect(sb.opacity).toBe(1);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('insertBefore method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', -0.445, 0.56);
    let b2 = Base.create(svg, 'T', 1, 2);
    let sb = StraightBondClass.create(svg, b1, b2);

    let circle = svg.circle(100);
    let rect = svg.rect(2);

    expect(sb._line.position()).toBeLessThan(circle.position());
    expect(sb._line.position()).toBeLessThan(rect.position());

    sb.insertBefore(rect);

    expect(sb._line.position()).toBeGreaterThan(circle.position());
    expect(sb._line.position()).toBeLessThan(rect.position());
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('insertAfter method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'a', -0.445, 0.56);
    let b2 = Base.create(svg, 'T', 1, 2);
    let sb = StraightBondClass.create(svg, b1, b2);

    let circle = svg.circle(100);
    let rect = svg.rect(2);

    expect(sb._line.position()).toBeLessThan(circle.position());
    expect(sb._line.position()).toBeLessThan(rect.position());

    sb.insertAfter(circle);

    expect(sb._line.position()).toBeGreaterThan(circle.position());
    expect(sb._line.position()).toBeLessThan(rect.position());
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('stroke getter and setter', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1, 1);
    let b2 = Base.create(svg, 'U', 4, 4);
    let sb = StrandBond.create(svg, b1, b2);

    sb.stroke = '#456abc';
    
    // check getter
    expect(sb.stroke).toBe('#456abc');

    // check actual value
    expect(sb._line.attr('stroke')).toBe('#456abc');
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('strokeWidth getter and setter', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1, 1);
    let b2 = Base.create(svg, 'U', 4, 4);
    let sb = StraightBondClass.create(svg, b1, b2);

    sb.strokeWidth = 2.3;

    // check getter
    expect(sb.strokeWidth).toBeCloseTo(2.3, 6);

    // check actual value
    expect(sb._line.attr('stroke-width')).toBeCloseTo(2.3, 6);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('opacity getter and private setter', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'e', 4, 5);
    let b2 = Base.create(svg, 'r', 1, 4);
    let sb = StraightBondClass.create(svg, b1, b2);

    sb._setOpacity(0.4567);

    // check getter
    expect(sb.opacity).toBeCloseTo(0.4567, 6);

    // check actual value
    expect(sb._line.attr('opacity')).toBeCloseTo(0.4567, 6);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('remove method', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1.1, 1.2);
    let b2 = Base.create(svg, 'U', 2.1, 2.2);
    let sb = StraightBondClass.create(svg, b1, b2);
    let lineId = sb._line.id();
    let baseTextId1 = b1._text.id();
    let baseTextId2 = b2._text.id();

    expect(svg.findOne('#' + lineId)).not.toBe(null);
    expect(svg.findOne('#' + baseTextId1)).not.toBe(null);
    expect(svg.findOne('#' + baseTextId2)).not.toBe(null);

    sb.remove();

    expect(svg.findOne('#' + lineId)).toBe(null);

    // does not remove the bases
    expect(svg.findOne('#' + baseTextId1)).not.toBe(null);
    expect(svg.findOne('#' + baseTextId2)).not.toBe(null);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('savableState method all properties except className', () => {
  function runFor(StraightBondClass) {
    let svg = createNodeSVG();
    let b1 = Base.create(svg, 'A', 1.1, 1.2);
    let b2 = Base.create(svg, 'U', 2.1, 2.2);
    let sb = StraightBondClass.create(svg, b1, b2);

    let savableState = sb.savableState();
    expect(savableState.line).toBe(sb._line.id());
    expect(savableState.base1).toBe(b1.id);
    expect(savableState.base2).toBe(b2.id);
  }

  runFor(StrandBond);
  runFor(WatsonCrickBond);
});

it('StrandBond savableState method className property', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'A', 1.1, 1.2);
  let b2 = Base.create(svg, 'U', 2.1, 2.2);
  let sb = StrandBond.create(svg, b1, b2);
  expect(sb.savableState().className).toBe('StrandBond');
});

it('WatsonCrickBond savableState method className property', () => {
  let svg = createNodeSVG();
  let b1 = Base.create(svg, 'A', 1.1, 1.2);
  let b2 = Base.create(svg, 'U', 2.1, 2.2);
  let wcb = WatsonCrickBond.create(svg, b1, b2);
  expect(wcb.savableState().className).toBe('WatsonCrickBond');
});
