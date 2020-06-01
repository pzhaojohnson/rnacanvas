import {
  QuadraticBezierBond,
  TertiaryBond,
} from './QuadraticBezierBond';
import NodeSVG from './NodeSVG';
import Base from './Base';
import distanceBetween from './distanceBetween';
import angleBetween from './angleBetween';
import normalizeAngle from './normalizeAngle';

describe('QuadraticBezierBond class', () => {
  it('_dPath static method', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'Q', 2, 8);
    let b2 = Base.create(svg, 'B', 45, 200);
    let d = QuadraticBezierBond._dPath(b1, b2, 10, 12, 98, 2 * Math.PI / 3);
    let p = svg.path(d);
    let pa = p.array();
    let m = pa[0];
    let q = pa[1];
    expect(distanceBetween(b1.xCenter, b1.yCenter, m[1], m[2])).toBeCloseTo(10);
    expect(distanceBetween(b2.xCenter, b2.yCenter, q[3], q[4])).toBeCloseTo(12);
    let xMiddle = (b1.xCenter + b2.xCenter) / 2;
    let yMiddle = (b1.yCenter + b2.yCenter) / 2;
    expect(distanceBetween(xMiddle, yMiddle, q[1], q[2])).toBeCloseTo(98);
    let ca = angleBetween(xMiddle, yMiddle, q[1], q[2]);
    let a12 = b1.angleBetweenCenters(b2);
    expect(normalizeAngle(ca, a12) - a12).toBeCloseTo(2 * Math.PI / 3);
  });

  describe('constructor', () => {
    it('stores path and bases', () => {
      let svg = NodeSVG();
      let p = svg.path('M 1 2 Q 1 2 3 4');
      let b1 = Base.create(svg, 'h', 1, 4);
      let b2 = Base.create(svg, 'n', 1, 1);
      let qbb = new QuadraticBezierBond(p, b1, b2);
      expect(qbb._path).toBe(p);
      expect(qbb.base1).toBe(b1);
      expect(qbb.base2).toBe(b2);
    });

    it('validates path', () => {
      let svg = NodeSVG();
      let p = svg.path('M 1 2 Q 3 4 5 6');
      let b1 = Base.create(svg, 'b', 1, 4);
      let b2 = Base.create(svg, 'j', 4, 2);
      expect(p.attr('id')).toBe(undefined);
      let qbb = new QuadraticBezierBond(p, b1, b2);
      expect(p.attr('id')).toBeTruthy();
    });

    it('stores paddings and control height and angle', () => {
      let svg = NodeSVG();
      let b1 = Base.create(svg, 'b', 3, 30);
      let b2 = Base.create(svg, 'Q', 40, 5000);
      let d = QuadraticBezierBond._dPath(b1, b2, 12, 16, 76, Math.PI / 3);
      let p = svg.path(d);
      let qbb = new QuadraticBezierBond(p, b1, b2);
      expect(qbb.padding1).toBeCloseTo(12);
      expect(qbb.padding2).toBeCloseTo(16);
      expect(qbb._controlHeight).toBeCloseTo(76);
      expect(
        normalizeAngle(qbb._controlAngle)
      ).toBeCloseTo(Math.PI / 3);
    });
  });

  describe('_validatePath method', () => {
    it('initializes ID and sets fill-opacity to zero', () => {
      let svg = NodeSVG();
      let p = svg.path('M 4 5 Q 10 1 2 3');
      let b1 = Base.create(svg, 'g', 1, 2);
      let b2 = Base.create(svg, 'n', 4, 5);
      expect(p.attr('id')).toBe(undefined);
      expect(p.attr('fill-opacity')).toBeGreaterThan(0);
      let qbb = new QuadraticBezierBond(p, b1, b2);
      expect(p.attr('id')).toBeTruthy();
      expect(p.attr('fill-opacity')).toBe(0);
    });

    it('invalid segments', () => {
      let svg = NodeSVG();
      let b1 = Base.create(svg, 'n', 1, 2);
      let b2 = Base.create(svg, 'j', 1, 5);
      let p1 = svg.path('M 1 2 Q 1 2 3 4 Z'); // wrong number of segments
      expect(
        () => { new QuadraticBezierBond(p1, b1, b2) }
      ).toThrow();
      let p2 = svg.path('L 5 5 Q 4 5 6 2'); // first segment is not M
      expect(
        () => { new QuadraticBezierBond(p2, b1, b2) }
      ).toThrow();
      let p3 = svg.path('M 5 6 L 2 3'); // second segment is not Q
      expect(
        () => { new QuadraticBezierBond(p3, b1, b2) }
      ).toThrow();
    });
  });

  it('id and base getters', () => {
    let svg = NodeSVG();
    let p = svg.path('M 1 2 Q 4 5 6 7');
    let pid = p.id();
    let b1 = Base.create(svg, 'h', 1, 5);
    let b2 = Base.create(svg, 'y', 1, 1);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    expect(qbb.id).toBe(pid);
    expect(qbb.base1).toBe(b1);
    expect(qbb.base2).toBe(b2);
  });

  it('x1, y1, x2, y2, xControl and yControl getters', () => {
    let svg = NodeSVG();
    let p = svg.path('M 1.2 4.3 Q 100 200.3 30 45.5');
    let b1 = Base.create(svg, 'b', 1, 2);
    let b2 = Base.create(svg, 'n', 4, 4);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    expect(qbb.x1).toBeCloseTo(1.2);
    expect(qbb.y1).toBeCloseTo(4.3);
    expect(qbb.x2).toBeCloseTo(30);
    expect(qbb.y2).toBeCloseTo(45.5);
    expect(qbb.xControl).toBeCloseTo(100);
    expect(qbb.yControl).toBeCloseTo(200.3);
  });

  it('_storePaddings and _storeControlHeightAndAngle methods', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'B', 1, 20);
    let b2 = Base.create(svg, 'r', 1000, 250);
    let d = QuadraticBezierBond._dPath(b1, b2, 14, 12, 239, Math.PI / 5);
    let p = svg.path(d);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    expect(qbb.padding1).toBeCloseTo(14);
    expect(qbb.padding2).toBeCloseTo(12);
    expect(qbb._controlHeight).toBeCloseTo(239);
    expect(
      normalizeAngle(qbb._controlAngle)
    ).toBeCloseTo(Math.PI / 5);
  });

  it('padding1 and padding2 getters and setters', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 't', 50, 40);
    let b2 = Base.create(svg, 't', 300, 400);
    let d = QuadraticBezierBond._dPath(b1, b2, 4, 5, 50, Math.PI / 3);
    let p = svg.path(d);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    qbb.padding1 = 12.2;
    expect(qbb.padding1).toBeCloseTo(12.2);
    let pa = p.array();
    expect(
      distanceBetween(b1.xCenter, b1.yCenter, pa[0][1], pa[0][2])
    ).toBeCloseTo(12.2);
    qbb.padding2 = 14.5;
    expect(qbb.padding2).toBeCloseTo(14.5);
    pa = p.array();
    expect(
      distanceBetween(b2.xCenter, b2.yCenter, pa[1][3], pa[1][4])
    ).toBeCloseTo(14.5);
  });

  it('shiftControl method', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'T', 20, 30);
    let b2 = Base.create(svg, 'b', 2000, 300);
    let d = QuadraticBezierBond._dPath(b1, b2, 8, 12, 300, Math.PI / 3);
    let p = svg.path(d);
    let unshifted = p.array();
    let qbb = new QuadraticBezierBond(p, b1, b2);
    qbb.shiftControl(-50, 120);
    let shifted = p.array();
    expect(shifted[1][1]).toBeCloseTo(unshifted[1][1] - 50);
    expect(shifted[1][2]).toBeCloseTo(unshifted[1][2] + 120);
    expect(
      distanceBetween(b1.xCenter, b1.yCenter, shifted[0][1], shifted[0][2])
    ).toBeCloseTo(8);
    expect(
      distanceBetween(b2.xCenter, b2.yCenter, shifted[1][3], shifted[1][4])
    ).toBeCloseTo(12);
  });

  it('reposition method', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'H', 4, 9);
    let b2 = Base.create(svg, 'j', -2000, -500);
    let d = QuadraticBezierBond._dPath(b1, b2, 20, 15, 1000, 2 * Math.PI / 3);
    let p = svg.path(d);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    b1.moveTo(200, 259);
    b2.moveTo(-2500, -800);
    qbb.reposition();
    let pa = p.array();
    expect(
      distanceBetween(b1.xCenter, b1.yCenter, pa[0][1], pa[0][2])
    ).toBeCloseTo(20);
    expect(
      distanceBetween(b2.xCenter, b2.yCenter, pa[1][3], pa[1][4])
    ).toBeCloseTo(15);
    let xMiddle = (b1.xCenter + b2.xCenter) / 2;
    let yMiddle = (b1.yCenter + b2.yCenter) / 2;
    expect(
      distanceBetween(xMiddle, yMiddle, pa[1][1], pa[1][2])
    ).toBeCloseTo(1000);
    let ca = angleBetween(xMiddle, yMiddle, pa[1][1], pa[1][2]);
    let a12 = b1.angleBetweenCenters(b2);
    expect(
      normalizeAngle(ca, a12) - a12
    ).toBeCloseTo(2 * Math.PI / 3);
  });

  it('stroke, strokeWidth and strokeDasharray getters and setters', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'a', 50, 40);
    let b2 = Base.create(svg, 'n', 100, 300);
    let d = QuadraticBezierBond._dPath(b1, b2, 6, 8, 200, Math.PI / 6);
    let p = svg.path(d);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    qbb.stroke = '#132435';
    expect(qbb.stroke).toBe('#132435');
    expect(p.attr('stroke')).toBe('#132435');
    qbb.strokeWidth = 3.44;
    expect(qbb.strokeWidth).toBe(3.44);
    expect(p.attr('stroke-width')).toBe(3.44);
    qbb.strokeDasharray = '3 1 6 7';
    expect(qbb.strokeDasharray).toBe('3 1 6 7');
    expect(p.attr('stroke-dasharray')).toBe('3 1 6 7');
  });

  it('cursor getter and setter', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'q', 1, 3);
    let b2 = Base.create(svg, 't', 5, 1000);
    let d = QuadraticBezierBond._dPath(b1, b2, 10, 30, 35, Math.PI / 3);
    let p = svg.path(d);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    expect(qbb.cursor).not.toBe('pointer');
    qbb.cursor = 'pointer';
    expect(qbb.cursor).toBe('pointer');
    expect(p.css('cursor')).toBe('pointer');
  });

  describe('binding events', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'b', 1, 2);
    let b2 = Base.create(svg, 'r', 5, 9);
    let d = QuadraticBezierBond._dPath(b1, b2, 7, 8, 25, Math.PI / 3);
    let p = svg.path(d);
    let qbb = new QuadraticBezierBond(p, b1, b2);

    it('onMouseover method', () => {
      let over = false;
      qbb.onMouseover(e => over = e);
      p.fire('mouseover');
      expect(over).toBeTruthy();
    });

    it('onMouseout method', () => {
      let out = false;
      qbb.onMouseout(e => out = e);
      p.fire('mouseout');
      expect(out).toBeTruthy();
    });

    it('onMousedown method', () => {
      let down = false;
      qbb.onMousedown(e => down = e);
      p.fire('mousedown');
      expect(down).toBeTruthy();
    });

    it('onDblclick method', () => {
      let dbl = false;
      qbb.onDblclick(e => dbl = e);
      p.fire('dblclick');
      expect(dbl).toBeTruthy();
    });
  });

  it('remove method', () => {
    let svg = NodeSVG();
    let p = svg.path('M 1 2 Q 3 4 5 6');
    let b1 = Base.create(svg, 'v', 1, 2);
    let b2 = Base.create(svg, 'n', 5, 10);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    expect(svg.findOne('#' + p.id())).toBeTruthy();
    qbb.remove();
    expect(svg.findOne('#' + p.id())).toBe(null);
  });

  describe('savableState method', () => {
    it('includes className, path and bases', () => {
      let svg = NodeSVG();
      let p = svg.path('M 1 2 Q 5 5 6 7');
      let b1 = Base.create(svg, 'b', 1, 5);
      let b2 = Base.create(svg, 'N', 5, 3);
      let qbb = new QuadraticBezierBond(p, b1, b2);
      let savableState = qbb.savableState();
      expect(savableState.className).toBe('QuadraticBezierBond');
      expect(savableState.pathId).toBe(p.id());
      expect(savableState.baseId1).toBe(b1.id);
      expect(savableState.baseId2).toBe(b2.id);
    });

    it('can be converted to and from a JSON string', () => {
      let svg = NodeSVG();
      let p = svg.path('M 1 2 Q 5 5 6 7');
      let b1 = Base.create(svg, 'b', 1, 5);
      let b2 = Base.create(svg, 'N', 5, 3);
      let qbb = new QuadraticBezierBond(p, b1, b2);
      let savableState1 = qbb.savableState();
      let json1 = JSON.stringify(savableState1);
      let savableState2 = JSON.parse(json1);
      let json2 = JSON.stringify(savableState2);
      expect(json2).toBe(json1);
    });
  });

  it('refreshIds method', () => {
    let svg = NodeSVG();
    let p = svg.path('M 1 2 Q 5 5 6 7');
    let b1 = Base.create(svg, 'b', 1, 5);
    let b2 = Base.create(svg, 'N', 5, 3);
    let qbb = new QuadraticBezierBond(p, b1, b2);
    let oldPathId = qbb._path.id();
    qbb.refreshIds();
    expect(qbb._path.id()).not.toBe(oldPathId);
  });
});

function getBasebyId(id, bases) {
  let i = null;
  bases.forEach((b, j) => {
    if (b.id === id) {
      i = j;
    }
  });
  return bases[i];
}

describe('TeritaryBond class', () => {
  describe('mostRecentProps static method', () => {
    it('returns a new object', () => {
      expect(TertiaryBond.mostRecentProps()).not.toBe(TertiaryBond._mostRecentProps);
    });

    it('returns correct values', () => {
      TertiaryBond._mostRecentProps.padding1 = 2.45;
      TertiaryBond._mostRecentProps.padding2 = 5.68;
      TertiaryBond._mostRecentProps.stroke = '#45abc3';
      TertiaryBond._mostRecentProps.strokeWidth = 3.47;
      TertiaryBond._mostRecentProps.strokeDasharray = '3 3 1 5 6 9';
      let mrps = TertiaryBond.mostRecentProps();
      expect(mrps.padding1).toBe(2.45);
      expect(mrps.padding2).toBe(5.68);
      expect(mrps.stroke).toBe('#45abc3');
      expect(mrps.strokeWidth).toBe(3.47);
      expect(mrps.strokeDasharray).toBe('3 3 1 5 6 9');
    });
  });

  it('_applyMostRecentProps static method', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 't', 300, 400);
    let b2 = Base.create(svg, 'a', 0, 0);
    let tb = TertiaryBond.create(svg, b1, b2);
    TertiaryBond._mostRecentProps.padding1 = 16.4;
    TertiaryBond._mostRecentProps.padding2 = 17.3;
    TertiaryBond._mostRecentProps.stroke = '#243511';
    TertiaryBond._mostRecentProps.strokeWidth = 3.22;
    TertiaryBond._mostRecentProps.strokeDasharray = '3 1 9';
    TertiaryBond._applyMostRecentProps(tb);
    expect(tb.padding1).toBeCloseTo(16.4);
    expect(tb.padding2).toBeCloseTo(17.3);
    expect(tb.stroke).toBe('#243511');
    expect(tb.strokeWidth).toBe(3.22);
    expect(tb.strokeDasharray).toBe('3 1 9');
  });

  it('_copyPropsToMostRecent static method', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'q', 40, 30);
    let b2 = Base.create(svg, 'Q', 500, 400);
    let tb = TertiaryBond.create(svg, b1, b2);
    tb.padding1 = 14.7;
    tb.padding2 = 15.33;
    tb.stroke = '#4455aa';
    tb.strokeWidth = 5.42;
    tb.strokeDasharray = '3 3 1 4';
    TertiaryBond._copyPropsToMostRecent(tb);
    let mrps = TertiaryBond.mostRecentProps();
    expect(mrps.padding1).toBeCloseTo(14.7);
    expect(mrps.padding2).toBeCloseTo(15.33);
    expect(mrps.stroke).toBe('#4455aa');
    expect(mrps.strokeWidth).toBe(5.42);
    expect(mrps.strokeDasharray).toBe('3 3 1 4');
  });

  describe('fromSavedState static method', () => {
    describe('invalid saved state', () => {
      it('constructor throws', () => {
        let svg = NodeSVG();
        let b1 = Base.create(svg, 'Y', 1, 5);
        let b2 = Base.create(svg, 'y', 50, 40);
        let tb = TertiaryBond.create(svg, b1, b2);
        let savableState = tb.savableState();
        tb._path.remove();
        expect(
          TertiaryBond.fromSavedState(
            savableState,
            svg,
            id => getBasebyId(id, [b1, b2])
          )
        ).toBe(null);
      });
    });

    it('creates with path and bases', () => {
      let svg = NodeSVG();
      let b1 = Base.create(svg, 'r', 1, 5);
      let b2 = Base.create(svg, 'E', 200, 300);
      let tb1 = TertiaryBond.create(svg, b1, b2);
      let savableState1 = tb1.savableState();
      let tb2 = TertiaryBond.fromSavedState(
        savableState1,
        svg,
        id => getBasebyId(id, [b1, b2])
      );
      expect(tb2._path.id()).toBe(tb1._path.id());
      expect(tb2.base1).toBe(b1);
      expect(tb2.base2).toBe(b2);
    });

    it('copies properties to most recent', () => {
      let svg = NodeSVG();
      let b1 = Base.create(svg, 'e', 1, 5);
      let b2 = Base.create(svg, 't', 11, 55);
      let tb1 = TertiaryBond.create(svg, b1, b2);
      tb1.stroke = '#12bbc5';
      let savableState1 = tb1.savableState();
      let tb2 = TertiaryBond.fromSavedState(
        savableState1,
        svg,
        id => getBasebyId(id, [b1, b2]),
      );
      let mrps = TertiaryBond.mostRecentProps();
      expect(mrps.stroke).toBe('#12bbc5');
    });
  });

  describe('create static method', () => {
    it('creates with bases', () => {
      let svg = NodeSVG();
      let b1 = Base.create(svg, 'a', 1, 5);
      let b2 = Base.create(svg, 'r', 200, 300);
      let tb = TertiaryBond.create(svg, b1, b2);
      expect(tb.base1).toBe(b1);
      expect(tb.base2).toBe(b2);
    });

    it('applies most recent properties', () => {
      let svg = NodeSVG();
      let b1 = Base.create(svg, 't', 50, 40);
      let b2 = Base.create(svg, 'b', 300, 5000);
      TertiaryBond._mostRecentProps.stroke = '#44bbca';
      let tb = TertiaryBond.create(svg, b1, b2);
      expect(tb.stroke).toBe('#44bbca');
    });
  });

  it('padding1 and padding2 getters and setters', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 'q', 1, 4);
    let b2 = Base.create(svg, 't', 400, 3000);
    let tb = TertiaryBond.create(svg, b1, b2);
    tb.padding1 = 6.6;
    expect(tb.padding1).toBeCloseTo(6.6);
    tb.padding2 = 12.8;
    expect(tb.padding2).toBeCloseTo(12.8);
    let mrps = TertiaryBond.mostRecentProps();  // update most recent properties
    expect(mrps.padding1).toBeCloseTo(6.6);
    expect(mrps.padding2).toBeCloseTo(12.8);
  });

  it('stroke, strokeWidth and strokeDasharray getters and setters', () => {
    let svg = NodeSVG();
    let b1 = Base.create(svg, 't', 50, 40);
    let b2 = Base.create(svg, 'q', -1000, -300);
    let tb = TertiaryBond.create(svg, b1, b2);
    tb.stroke = '#44bbcc';
    expect(tb.stroke).toBe('#44bbcc');
    tb.strokeWidth = 3.96;
    expect(tb.strokeWidth).toBe(3.96);
    tb.strokeDasharray = '3 2 8 7';
    expect(tb.strokeDasharray).toBe('3 2 8 7');
    let mrps = TertiaryBond.mostRecentProps();  // update most recent properties
    expect(mrps.stroke).toBe('#44bbcc');
    expect(mrps.strokeWidth).toBe(3.96);
    expect(mrps.strokeDasharray).toBe('3 2 8 7');
  });
});
