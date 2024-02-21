import { RoundLoop, TriangleLoop, FlatOutermostLoop, StemLayout } from './StemLayout';
import GeneralStrictLayoutProps from './GeneralStrictLayoutProps';
import PerBaseStrictLayoutProps from './PerBaseStrictLayoutProps';
import Stem from './Stem';
import { normalizeAngle } from 'Math/angles/normalizeAngle';
import parseDotBracket from 'Parse/parseDotBracket';
import { circleCircumference } from './circleCircumference';
import { circleCenter } from './circleCenter';
import { distance2D as distance } from 'Math/distance';
import { displacement2D as displacement } from 'Math/points/displacement';
import { direction } from '@rnacanvas/vectors';

function defaultPerBaseProps(length) {
  let pbps = [];
  for (let i = 0; i < length; i++) {
    pbps.push(new PerBaseStrictLayoutProps());
  }
  return pbps;
}

function checkCoords(coords, expectedCoords) {
  expect(coords.length).toBe(expectedCoords.length);
  for (let i = 0; i < expectedCoords.length; i++) {
    expect(coords[i].xLeft).toBeCloseTo(expectedCoords[i][0]);
    expect(coords[i].yTop).toBeCloseTo(expectedCoords[i][1]);
  }
}

it('RoundLoop circumference - an inner stem', () => {
  let partners = parseDotBracket('(((..(((....)))...(((....))))))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.5;
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  expect(
    RoundLoop.circumference(st, gps)
  ).toBeCloseTo(circleCircumference(2.5, 3, 8), 3);
});

it('RoundLoop circumference - the outermost stem', () => {
  let partners = parseDotBracket('..(((.....)))....(((...)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 5.6;
  gps.basePairBondLength = 0.8;
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(0, partners, gps, pbps);
  expect(
    RoundLoop.circumference(st, gps)
  ).toBeCloseTo(circleCircumference(1.8, 2, 15.6), 3);
});

it('RoundLoop radius', () => {
  let partners = parseDotBracket('(((..((((.....))))...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  expect(
    RoundLoop.radius(st, gps)
  ).toBeCloseTo(RoundLoop.circumference(st, gps) / (2 * Math.PI), 3);
});

it('RoundLoop center - the outermost stem', () => {
  let partners = parseDotBracket('..((((.....)))).....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(0, partners, gps, pbps);
  let center = RoundLoop.center(st, gps);
  expect(center.x).toBe(0);
  expect(center.y).toBe(0);
});

it('RoundLoop center - an inner stem with zero branches', () => {
  let partners = parseDotBracket('(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.5;
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  st.angle = 2 * Math.PI / 3;
  let center = RoundLoop.center(st, gps);
  let bct5 = st.baseCoordinatesTop5();
  let bct3 = st.baseCoordinatesTop3();
  let expectedCenter = circleCenter(bct5.xCenter, bct5.yCenter, bct3.xCenter, bct3.yCenter, 5);
  expect(center.x).toBeCloseTo(expectedCenter.x, 3);
  expect(center.y).toBeCloseTo(expectedCenter.y, 3);
});

it('RoundLoop center - an inner stem with multiple branches', () => {
  let partners = parseDotBracket('((...(((...))).....(((..))).))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  st.angle = 5 * Math.PI / 3;
  let center = RoundLoop.center(st, gps);
  let expectedRadius = RoundLoop.radius(st, gps);
  let bct5 = st.baseCoordinatesTop5();
  let bct3 = st.baseCoordinatesTop3();
  expect(
    distance(center.x, center.y, bct5.xCenter, bct5.yCenter)
  ).toBeCloseTo(expectedRadius, 3);
  expect(
    distance(center.x, center.y, bct3.xCenter, bct3.yCenter)
  ).toBeCloseTo(expectedRadius, 3);
  let xMiddle = (bct5.xCenter + bct3.xCenter) / 2;
  let yMiddle = (bct5.yCenter + bct3.yCenter) / 2;
  let middle = { x: xMiddle, y: yMiddle };
  expect(
    normalizeAngle(direction(displacement(middle, center)))
  ).toBeCloseTo(normalizeAngle(st.angle), 3);
});

it('RoundLoop originAngle - an inner stem', () => {
  let partners = parseDotBracket('(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  st.angle = Math.PI / 3;
  expect(
    normalizeAngle(RoundLoop.originAngle(st, gps))
  ).toBeCloseTo(4 * Math.PI / 3, 3);
});

it('RoundLoop originAngle - the outermost stem', () => {
  let partners = parseDotBracket('..(((....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.rotation = -Math.PI / 6;
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(0, partners, gps, pbps);
  expect(
    normalizeAngle(RoundLoop.originAngle(st, gps))
  ).toBeCloseTo(5 * Math.PI / 6, 3);
});

it('RoundLoop polarLengthPerStem - an inner stem', () => {
  let partners = parseDotBracket('(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  expect(RoundLoop.polarLengthPerStem(st, gps)).toBeCloseTo(3.3907821334634507, 3);
});

it('RoundLoop polarLengthPerStem - the outermost stem with one inner stem', () => {
  let partners = parseDotBracket('.(((....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.5;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(RoundLoop.polarLengthPerStem(omst, gps)).toBeCloseTo(3.7992885681490196, 3);
});

it('RoundLoop polarLengthPerStem - zero stems', () => {
  let partners = parseDotBracket('....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(RoundLoop.polarLengthPerStem(omst, gps)).toBe(0);
});

it('RoundLoop angleSpanPerStem', () => {
  let partners = parseDotBracket('.(((....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.5;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(RoundLoop.angleSpanPerStem(omst, gps)).toBeCloseTo(2.2104821033799684, 3);
});

it('RoundLoop polarLengthBetweenTermini - no inner stems (and includes stretch)', () => {
  let partners = parseDotBracket('...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 6;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 3;
  let omst = new Stem(0, partners, gps, pbps);
  expect(RoundLoop.polarLengthBetweenTermini(omst, gps)).toBeCloseTo(6, 3);
});

it('RoundLoop polarLengthBetweenTermini - one inner stem (and includes stretch)', () => {
  let partners = parseDotBracket('..(((....))).....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1.2;
  gps.basePairBondLength = 0.8;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[14].stretch3 = 2;
  let omst = new Stem(0, partners, gps, pbps);
  expect(RoundLoop.polarLengthBetweenTermini(omst, gps)).toBeCloseTo(11.86158125878354, 3);
});

it('RoundLoop polarLengthBetweenTermini - does not use the termini gap', () => {
  // cannot be calculated by subtracting the termini gap from the circumference
  let partners = parseDotBracket('.(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0.5;
  gps.basePairBondLength = 10;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(RoundLoop.polarLengthBetweenTermini(omst, gps)).toBeCloseTo(13.000099999999998, 3);
});

it('RoundLoop terminusAngle5', () => {
  let partners = parseDotBracket('.(((....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 10;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    normalizeAngle(RoundLoop.terminusAngle5(omst, gps))
  ).toBeCloseTo(5.098370175499026, 3);
});

it('RoundLoop terminusAngle5 - does not use termini gap', () => {
  let partners = parseDotBracket('.(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0.5;
  gps.basePairBondLength = 10;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    normalizeAngle(RoundLoop.terminusAngle5(omst, gps))
  ).toBeCloseTo(6.274457041434643, 3);
});

it('RoundLoop terminusAngle3', () => {
  let partners = parseDotBracket('.(((....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 10;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    normalizeAngle(RoundLoop.terminusAngle3(omst, gps))
  ).toBeCloseTo(1.1848151316805602, 3);
});

it('RoundLoop terminusAngle3 - does not use termini gap', () => {
  let partners = parseDotBracket('.(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0.5;
  gps.basePairBondLength = 10;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    normalizeAngle(RoundLoop.terminusAngle3(omst, gps))
  ).toBeCloseTo(0.008728265744943009, 3);
});

it('RoundLoop setCoordinatesAndAngles - sets inner coordinates and angles', () => {
  let partners = parseDotBracket('..(((....)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 5;
  gps.basePairBondLength = 3;
  let pbps = defaultPerBaseProps(partners.length);
  let omst1 = new Stem(0, partners, gps, pbps);
  let omst2 = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst1, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(omst2, gps, pbps);
  let it1 = omst1.loopIterator();
  let it2 = omst2.loopIterator();
  it1.next();
  let st1 = it1.next().value;
  it2.next();
  let st2 = it2.next().value;
  expect(st1.xBottomCenter).toBeCloseTo(st2.xBottomCenter, 3);
  expect(st1.yBottomCenter).toBeCloseTo(st2.yBottomCenter, 3);
  expect(normalizeAngle(st1.angle)).toBeCloseTo(normalizeAngle(st2.angle), 3);
});

it('RoundLoop setInnerCoordinatesAndAngles - zero inner stems', () => {
  let partners = [];
  let gps = new GeneralStrictLayoutProps();
  let pbps = [];
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    () => RoundLoop.setInnerCoordinatesAndAngles(omst, gps, pbps)
  ).not.toThrow();
});

it('RoundLoop setInnerCoordinatesAndAngles - an inner stem', () => {
  let partners = parseDotBracket('(((..(((.....)))..((...))....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.25;
  let pbps = defaultPerBaseProps(partners.length);
  let st = new Stem(1, partners, gps, pbps);
  st.xBottomCenter = 1;
  st.yBottomCenter = 1.5;
  st.angle = Math.PI / 6;
  RoundLoop.setInnerCoordinatesAndAngles(st, gps, pbps);
  let it = st.loopIterator();
  it.next();
  let ist1 = it.next().value;
  it.next();
  let ist2 = it.next().value;
  expect(ist1.xBottomCenter).toBeCloseTo(6.981200118279215, 3);
  expect(ist1.yBottomCenter).toBeCloseTo(2.6031937793379676, 3);
  expect(normalizeAngle(ist1.angle)).toBeCloseTo(5.526073663189364, 3);
  expect(ist2.xBottomCenter).toBeCloseTo(6.393737195539805, 3);
  expect(ist2.yBottomCenter).toBeCloseTo(5.958468710066612, 3);
  expect(normalizeAngle(ist2.angle)).toBeCloseTo(1.1037705, 3);
});

it('RoundLoop setInnerCoordinatesAndAngles - the outermost stem (includes rotation)', () => {
  let partners = parseDotBracket('.(((.....))).....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  gps.rotation = Math.PI / 5;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st = it.next().value;
  expect(st.xBottomCenter).toBeCloseTo(0.42185708156725427, 3);
  expect(st.yBottomCenter).toBeCloseTo(-0.38316014514653274, 3);
  expect(normalizeAngle(st.angle)).toBeCloseTo(5.545819870006258, 3);
});

it('RoundLoop setInnerCoordinatesAndAngles - the outermost stem (does not use termini gap)', () => {
  let partners = parseDotBracket('.(((....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0.8;
  gps.basePairBondLength = 8;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st = it.next().value;
  expect(st.xBottomCenter).toBeCloseTo(550.6250879673996, 3);
  expect(st.yBottomCenter).toBeCloseTo(-1.3486425030190116e-13, 3);
  expect(normalizeAngle(st.angle)).toBeCloseTo(0, 3);
});

it('RoundLoop setInnerCoordinatesAndAngles - includes stretch', () => {
  let partners = parseDotBracket('...(((....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0.9;
  gps.basePairBondLength = 10;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 1;
  pbps[1].stretch3 = 1;
  pbps[2].stretch3 = 1;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st = it.next().value;
  expect(st.xBottomCenter).toBeCloseTo(744.1881565508345, 3);
  expect(st.yBottomCenter).toBeCloseTo(2.4982486268746724, 3);
  expect(normalizeAngle(st.angle)).toBeCloseTo(0.0033569994634436995, 3);
});

it('RoundLoop setInnerCoordinatesAndAngles - inner stems have inner stems (round loop)', () => {
  let partners = parseDotBracket('.(((..(((....))).....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 0.9;
  gps.terminiGap = 4;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(omst, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  stit.next();
  let ist = stit.next().value;
  expect(ist.xBottomCenter).toBeCloseTo(5.908798960029682, 3);
  expect(ist.yBottomCenter).toBeCloseTo(-0.8840679532813751, 3);
  expect(normalizeAngle(ist.angle)).toBeCloseTo(5.555366285, 3);
});

it('RoundLoop setInnerCoordinatesAngles - inner stems have inner stems (triangle loop)', () => {
  let partners = parseDotBracket('(((....(((....))).....(((....)))...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'triangle';
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(omst, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  stit.next();
  let ist1 = stit.next().value;
  stit.next();
  let ist2 = stit.next().value;
  expect(ist1.xBottomCenter).toBeCloseTo(6.048871526169038, 3);
  expect(ist1.yBottomCenter).toBeCloseTo(-4.1, 3);
  expect(normalizeAngle(ist1.angle)).toBeCloseTo(normalizeAngle(st.angle), 3);
  expect(ist2.xBottomCenter).toBeCloseTo(6.048871526169038, 3);
  expect(ist2.yBottomCenter).toBeCloseTo(4.1, 3);
  expect(normalizeAngle(ist2.angle)).toBeCloseTo(normalizeAngle(st.angle), 3);
});

it('TriangleLoop platformLength - a hairpin', () => {
  let partners = [6, 5, null, null, 2, 1];
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'triangle';
  let st = new Stem(1, partners, gps, pbps);
  expect(TriangleLoop.platformLength(st)).toBe(0);
});

it('TriangleLoop platformLength - multiple branches (and includes stretch)', () => {
  let partners = parseDotBracket('((.(.)(.).))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 0.9;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'triangle';
  pbps[5].stretch3 = 5.5;
  let st = new Stem(1, partners, gps, pbps);
  expect(TriangleLoop.platformLength(st)).toBeCloseTo(11.3, 3);
});

it('TriangleLoop setInnerCoordinatesAndAngles - a hairpin', () => {
  let partners = parseDotBracket('((..))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'triangle';
  let st = new Stem(1, partners, gps, pbps);
  expect(
    () => TriangleLoop.setInnerCoordinatesAndAngles(st, gps, pbps)
  ).not.toThrow();
});

it('TriangleLoop setInnerCoordinatesAndAngles - one branch', () => {
  let partners = parseDotBracket('(.(..).)').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.29;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'triangle';
  pbps[0].triangleLoopHeight = 6.8;
  let ost = new Stem(1, partners, gps, pbps);
  ost.xBottomCenter = 1.2;
  ost.yBottomCenter = 3.4;
  ost.angle = Math.PI / 6;
  TriangleLoop.setInnerCoordinatesAndAngles(ost, gps, pbps);
  let it = ost.loopIterator();
  it.next();
  let ist = it.next().value;
  expect(ist.xBottomCenter).toBeCloseTo(7.088972745734183, 3);
  expect(ist.yBottomCenter).toBeCloseTo(6.799999999999999, 3);
  expect(ist.angle).toBeCloseTo(Math.PI / 6 , 3);
});

it('TriangleLoop setInnerCoordinatesAndAngles - multiple branches', () => {
  let partners = parseDotBracket('(.((...))..(((...))).)').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'triangle';
  pbps[0].triangleLoopHeight = 15;
  let ost = new Stem(1, partners, gps, pbps);
  ost.xBottomCenter = 5.6;
  ost.yBottomCenter = 7.8;
  ost.angle = -Math.PI / 3;
  TriangleLoop.setInnerCoordinatesAndAngles(ost, gps, pbps);
  let it = ost.loopIterator();
  it.next();
  let ist1 = it.next().value;
  it.next();
  let ist2 = it.next().value;
  expect(ist1.xBottomCenter).toBeCloseTo(10.934936490538906, 3);
  expect(ist1.yBottomCenter).toBeCloseTo(-6.440381056766581, 3);
  expect(ist1.angle).toBeCloseTo(-Math.PI / 3, 3);
  expect(ist2.xBottomCenter).toBeCloseTo(15.265063509461099, 3);
  expect(ist2.yBottomCenter).toBeCloseTo(-3.940381056766581, 3);
  expect(ist2.angle).toBeCloseTo(-Math.PI / 3, 3);
});

it('TriangleLoop setInnerCoordinatesAndAngles - inner stems have inner stems (round loop)', () => {
  let partners = parseDotBracket('(.(((.).(.).)).)').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.6;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[2].loopShape = 'round';
  let ost = new Stem(1, partners, gps, pbps);
  ost.xBottomCenter = -1.2;
  ost.yBottomCenter = 3.5;
  ost.angle = Math.PI / 5;
  TriangleLoop.setInnerCoordinatesAndAngles(ost, gps, pbps);

  let oit = ost.loopIterator();
  oit.next();
  let ist1 = oit.next().value;
  expect(ist1.hasRoundLoop()).toBeTruthy();

  let ist2 = new Stem(3, partners, gps, pbps);
  ist2.xBottomCenter = ist1.xBottomCenter;
  ist2.yBottomCenter = ist1.yBottomCenter;
  ist2.angle = ist1.angle;
  RoundLoop.setInnerCoordinatesAndAngles(ist2, gps, pbps);

  let it1 = ist1.loopIterator();
  let it2 = ist2.loopIterator();
  for (let i = 0; i < 2; i++) {
    it1.next();
    let st1 = it1.next().value;
    it2.next();
    let st2 = it2.next().value;
    expect(st1.xBottomCenter).toBeCloseTo(st2.xBottomCenter, 3);
    expect(st1.yBottomCenter).toBeCloseTo(st2.yBottomCenter, 3);
    expect(st1.angle).toBeCloseTo(st2.angle, 3);
  }
});

it('TriangleLoop setInnerCoordinatesAndAngles - inner stems have inner stems (triangle loop)', () => {
  let partners = parseDotBracket('(.(((.).(.).)).)').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 0.6;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[2].loopShape = 'triangle';
  let ost = new Stem(1, partners, gps, pbps);
  ost.xBottomCenter = -10;
  ost.yBottomCenter = -3;
  ost.angle = -Math.PI / 5;
  TriangleLoop.setInnerCoordinatesAndAngles(ost, gps, pbps);

  let oit = ost.loopIterator();
  oit.next();
  let ist1 = oit.next().value;
  expect(ist1.hasTriangleLoop()).toBeTruthy();

  let ist2 = new Stem(3, partners, gps, pbps);
  ist2.xBottomCenter = ist1.xBottomCenter;
  ist2.yBottomCenter = ist1.yBottomCenter;
  ist2.angle = ist1.angle;
  TriangleLoop.setInnerCoordinatesAndAngles(ist2, gps, pbps);

  let it1 = ist1.loopIterator();
  let it2 = ist2.loopIterator();
  for (let i = 0; i < 2; i++) {
    it1.next();
    let st1 = it1.next().value;
    it2.next();
    let st2 = it2.next().value;
    expect(st1.xBottomCenter).toBeCloseTo(st2.xBottomCenter, 3);
    expect(st1.yBottomCenter).toBeCloseTo(st2.yBottomCenter, 3);
    expect(st1.angle).toBeCloseTo(st2.angle, 3);
  }
});

it('FlatOutermostLoop traverseUnpairedRegion53 - size of zero', () => {
  let partners = parseDotBracket('((..)).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  expect(
    FlatOutermostLoop.traverseUnpairedRegion53(ur, gps, pbps).length
  ).toBe(0);
});

it("FlatOutermostLoop traverseUnpairedRegion53 - uses stretch and 3' angles of bases", () => {
  let partners = parseDotBracket('...(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 1;
  pbps[0].flatLoopAngle3 = Math.PI / 6;
  pbps[1].stretch3 = 2;
  pbps[1].flatLoopAngle3 = Math.PI / 3;
  pbps[2].stretch3 = 0.5;
  pbps[2].flatLoopAngle3 = -Math.PI / 6;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    FlatOutermostLoop.traverseUnpairedRegion53(ur, gps, pbps),
    [
      [1, 0],
      [2.7320508075688776, 0.9999999999999999],
      [2.7320508075688776, 4],
    ],
  );
});

it('FlatOutermostLoop traverseUnpairedRegion53 - ignores negative stretch', () => {
  let partners = parseDotBracket('..(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = -10;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    FlatOutermostLoop.traverseUnpairedRegion53(ur, gps, pbps),
    [
      [1, 0],
      [2, 0],
    ],
  );
});

it("FlatOutermostLoop traverseUnpairedRegion53 - 5' bounding stem is an inner stem", () => {
  // should use the coordinates and angle of the 5' bounding stem
  // and the 3' stretch and angle of the 5' bounding position
  let partners = parseDotBracket('(((...)))...(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[8].stretch3 = 5;
  pbps[8].flatLoopAngle3 = Math.PI / 3;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  st5.xBottomCenter = 2.5;
  st5.yBottomCenter = -7;
  st5.angle = Math.PI / 6;
  checkCoords(
    FlatOutermostLoop.traverseUnpairedRegion53(ur, gps, pbps),
    [
      [-4.11698729810778, -6.2973720558371165],
      [-5.11698729810778, -6.2973720558371165],
      [-6.11698729810778, -6.2973720558371165],
    ],
  );
});

it("FlatOutermostLoop traverseUnpairedRegion53 - 5' dangling and uses rotation of layout", () => {
  let partners = parseDotBracket('..(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = Math.PI / 3;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    FlatOutermostLoop.traverseUnpairedRegion53(ur, gps, pbps),
    [
      [0.5000000000000001, 0.8660254037844386],
      [1.0000000000000002, 1.7320508075688772],
    ],
  );
});

it("FlatOutermostLoop unpairedRegionAngle3 - 5' dangling and size less than 2", () => {
  // should use rotation of layout
  let partners = parseDotBracket('.(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = Math.PI / 3;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  expect(
    FlatOutermostLoop.unpairedRegionAngle53(ur, gps, pbps)
  ).toBeCloseTo(1.0471975511965976, 3);
});

it("FlatOutermostLoop unpairedRegionAngle53 - 5' inner stem and size of zero", () => {
  let partners = parseDotBracket('(((...)))(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  st5.angle = Math.PI / 5;
  expect(
    FlatOutermostLoop.unpairedRegionAngle53(ur, gps, pbps)
  ).toBeCloseTo((Math.PI / 5) + (Math.PI / 2), 3);
});

it("FlatOutermostLoop unpairedRegionAngle53 - 5' inner stem and size of one", () => {
  let partners = parseDotBracket('(((...))).(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  pbps[8].flatLoopAngle3 = Math.PI / 6;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  st5.angle = (Math.PI / 6) - (Math.PI / 2);
  expect(
    FlatOutermostLoop.unpairedRegionAngle53(ur, gps, pbps)
  ).toBeCloseTo(Math.PI / 3, 3);
});

it("FlatOutermostLoop unpairedRegionAngle53 - 5' inner stem and size of at least 2", () => {
  let partners = parseDotBracket('(((...)))..(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  pbps[9].flatLoopAngle3 = Math.PI / 10;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  st5.angle = (Math.PI / 5) - (Math.PI / 2);
  expect(
    FlatOutermostLoop.unpairedRegionAngle53(ur, gps, pbps)
  ).toBeCloseTo(3 * Math.PI / 10, 6);
});

it("FlatOutermostLoop unpairedRegionAngle53 - includes 3' angle of last position", () => {
  let partners = parseDotBracket('.(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = Math.PI / 5;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].flatLoopAngle3 = 2 * Math.PI / 5;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  expect(
    FlatOutermostLoop.unpairedRegionAngle53(ur, gps, pbps)
  ).toBeCloseTo(3 * Math.PI / 5, 3);
});

it("FlatOutermostLoop unpairedRegionAngle53 - 3' bounding position is less than 2", () => {
  let partners = parseDotBracket('(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = -Math.PI / 5;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  expect(
    FlatOutermostLoop.unpairedRegionAngle53(ur, gps, pbps)
  ).toBeCloseTo(-Math.PI / 5, 3);
});

it('FlatOutermostLoop setNextCoordinatesAndAngle53 - size of zero', () => {
  let partners = parseDotBracket('(.)(.)').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.basePairBondLength = 2.3;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[2].stretch3 = 2.6;
  pbps[2].flatLoopAngle3 = Math.PI / 7;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  let st3 = it.next().value;
  st5.xBottomCenter = 2.2;
  st5.yBottomCenter = 3.2;
  st5.angle = Math.PI / 3;
  FlatOutermostLoop.setNextCoordinatesAndAngle53(ur, gps, pbps);
  expect(st3.xBottomCenter).toBeCloseTo(-4.251626898238731, 3);
  expect(st3.yBottomCenter).toBeCloseTo(4.3517437946303605, 3);
  expect(st3.angle).toBeCloseTo((Math.PI / 3) + (Math.PI / 7), 3);
});

it('FlatOutermostLoop setNextCoordinatesAndAngle53 - size greater than zero', () => {
  let partners = parseDotBracket('....(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = -Math.PI / 3;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[1].flatLoopAngle3 = 2;
  pbps[1].stretch3 = 1;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let st3 = it.next().value;
  FlatOutermostLoop.setNextCoordinatesAndAngle53(ur, gps, pbps);
  expect(st3.xBottomCenter).toBeCloseTo(4.0474251672781865, 3);
  expect(st3.yBottomCenter).toBeCloseTo(3.2143662913004714, 3);
  expect(normalizeAngle(st3.angle)).toBeCloseTo(5.665191429, 3);
});

it("FlatOutermostLoop setNextCoordinatesAndAngle53 - includes 3' stretch of last position", () => {
  let partners = parseDotBracket('(((...)))..(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[10].stretch3 = 5;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  let st3 = it.next().value;
  st5.xBottomCenter = 2.6;
  st5.yBottomCenter = -0.6000000000000001;
  st5.angle = -1.5707963267948966;
  FlatOutermostLoop.setNextCoordinatesAndAngle53(ur, gps, pbps);
  expect(st3.xBottomCenter).toBeCloseTo(12.8, 3);
  expect(st3.yBottomCenter).toBeCloseTo(-0.6000000000000003, 3);
  expect(normalizeAngle(st3.angle)).toBeCloseTo(normalizeAngle(st5.angle), 3);
});

it('FlatOutermostLoop setNextCoordinatesAndAngle53 - ignores negative stretch', () => {
  let partners = parseDotBracket('(((...)))..(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[10].stretch3 = -10;
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  let st5 = it.next().value;
  let ur = it.next().value;
  let st3 = it.next().value;
  st5.xBottomCenter = 2.6;
  st5.yBottomCenter = -0.6000000000000001;
  st5.angle = -1.5707963267948966;
  FlatOutermostLoop.setNextCoordinatesAndAngle53(ur, gps, pbps);
  expect(st3.xBottomCenter).toBeCloseTo(7.800000000000001, 3);
  expect(st3.yBottomCenter).toBeCloseTo(-0.6000000000000003, 3);
  expect(normalizeAngle(st3.angle)).toBeCloseTo(normalizeAngle(st5.angle), 3);
});

it("FlatOutermostLoop setNextCoordinatesAndAngle53 - 3' bounding position is less than 2", () => {
  let partners = parseDotBracket('(((...)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = Math.PI / 3;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let st3 = it.next().value;
  FlatOutermostLoop.setNextCoordinatesAndAngle53(ur, gps, pbps);
  expect(st3.xBottomCenter).toBeCloseTo(1.116987298107781, 3);
  expect(st3.yBottomCenter).toBeCloseTo(0.9686533479473212, 3);
  expect(
    normalizeAngle(st3.angle)
  ).toBeCloseTo(normalizeAngle((Math.PI / 3) - (Math.PI / 2)), 3);
});

it('FlatOutermostLoop setCoordinatesAndAngles - sequence of length zero', () => {
  let partners = [];
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = [];
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    () => FlatOutermostLoop.setCoordinatesAndAngles(omst, gps, pbps)
  ).not.toThrow();
});

it('FlatOutermostLoop setCoordinatesAndAngles - zero stems', () => {
  let partners = [null, null, null];
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  expect(
    () => FlatOutermostLoop.setCoordinatesAndAngles(omst, gps, pbps)
  ).not.toThrow();
});

it('FlatOutermostLoop setCoordinatesAndAngles - multiple stems', () => {
  let partners = parseDotBracket('..(((...)))...(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.rotation = Math.PI / 5;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 2.5;
  pbps[1].flatLoopAngle3 = -Math.PI / 3;
  pbps[11].stretch3 = -5;
  pbps[12].stretch3 = 10;
  pbps[12].flatLoopAngle3 = Math.PI / 6;
  let omst = new Stem(0, partners, gps, pbps);
  FlatOutermostLoop.setCoordinatesAndAngles(omst, gps, pbps);
  checkCoords(
    omst.baseCoordinates(),
    [
      [0.8090169943749475, 0.5877852522924731],
      [3.6405764746872635, 2.6450336353161292],
      [4.554121932329864, 2.2382969922403286],
      [4.147385289254064, 1.3247515345977277],
      [3.740648646178264, 0.4112060769551267],
      [3.5652866041572926, -0.5401260582883962],
      [4.193774897349709, -1.275508368824113],
      [5.160811208885221, -1.2504993804288334],
      [5.750448652991986, -0.48361453781163366],
      [6.157185296067786, 0.4299309198309672],
      [6.563921939143587, 1.343476377473568],
      [7.477467396786188, 0.9367397343977681],
      [8.391012854428789, 0.530003091321968],
      [19.330753703479793, 1.6798161872661566],
      [20.32527559884807, 1.7843446505338099],
      [20.42980406211572, 0.7898227551655366],
      [20.534332525383373, -0.20469914020273672],
      [20.858130609755463, -1.1162579577706078],
      [21.77010859290908, -1.438873573592028],
      [22.595082110883197, -0.9336969985510075],
      [22.72228069519358, 0.025263478986101262],
      [22.617752231925927, 1.0197853743543746],
      [22.513223768658275, 2.014307269722648],
      [23.507745664026544, 2.1188357329903016],
    ],
  );
});

it('FlatOutermostLoop setCoordinatesAndAngles - inner stems have inner stems (round loop)', () => {
  let partners = parseDotBracket('((..(((....)))......(((....))).....)).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].loopShape = 'round';
  pbps[15].stretch3 = 3;
  let omst = new Stem(0, partners, gps, pbps);
  FlatOutermostLoop.setCoordinatesAndAngles(omst, gps, pbps);
  checkCoords(
    omst.baseCoordinates(),
    [
      [1, -1.6000000000000003],
      [1, -2.6000000000000005],
      [0.07922622568568682, -2.983663666631836],
      [-0.7211993259645095, -3.5789292282292515],
      [-1.3536068990677315, -4.35034533775776],
      [-2.311305708676911, -4.062572875431775],
      [-3.2690045182860903, -3.7748004131057904],
      [-4.183355863788471, -3.44310482512663],
      [-5.052541988144789, -3.8796547390348763],
      [-5.332445696678201, -4.811166553268113],
      [-4.8478451164214755, -5.6545067122322745],
      [-3.902103935403258, -5.881737794245986],
      [-2.9444051257940784, -6.169510256571971],
      [-1.986706316184899, -6.457282718897956],
      [-0.9647901369916099, -6.859002184274459],
      [0.0581368674170335, -7.258140693831024],
      [1.0820681785800161, -7.654695704112726],
      [2.1069972716366294, -8.048664688127587],
      [3.1329176153678304, -8.440045135362595],
      [4.159822672238107, -8.828834551800014],
      [5.187705898436875, -9.21503045993305],
      [6.091582958046115, -9.642822770654217],
      [6.995460017655355, -10.070615081375383],
      [7.849907070662095, -10.535352189550478],
      [8.774615266952786, -10.233731404756604],
      [9.190710168060077, -9.354569656624118],
      [8.837713167658423, -8.448228956989436],
      [7.936603101241921, -8.082085550235055],
      [7.032726041632682, -7.65429323951389],
      [6.128848982023442, -7.226500928792724],
      [6.175964114958727, -6.230106269497309],
      [5.98033311174323, -5.251969948014035],
      [5.553606876887965, -4.35034537353185],
      [4.921199309687653, -3.5789292589920296],
      [4.1207737664426105, -2.9836636858695695],
      [3.2, -2.6000000000000005],
      [3.2, -1.6000000000000005],
      [4.2, -1.6000000000000003],
    ],
  );
});

it('FlatOutermostLoop setCoordinatesAndAngles - inner stems have inner stems (triangle loop)', () => {
  let partners = parseDotBracket('.((....(((...))).....(((....)))..)).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[1].loopShape = 'triangle';
  pbps[18].stretch3 = 3;
  let omst = new Stem(0, partners, gps, pbps);
  FlatOutermostLoop.setCoordinatesAndAngles(omst, gps, pbps);
  checkCoords(
    omst.baseCoordinates(),
    [
      [1, 0],
      [2, -1.1102230246251565e-16],
      [2, -1],
      [0.874039735147818, -1.7916225963297734],
      [-0.24895604176595043, -2.587445025066131],
      [-1.3689716654458834, -3.3874561848375606],
      [-2.4859915121685674, -4.1916449158414935],
      [-3.599999999999999, -5.000000000000001],
      [-3.599999999999999, -6.000000000000001],
      [-3.599999999999999, -7.000000000000001],
      [-3.373259557792105, -7.940411319155685],
      [-2.499999999999999, -8.356587269990788],
      [-1.6267404422078933, -7.940411319155685],
      [-1.3999999999999988, -7.000000000000001],
      [-1.3999999999999988, -6.000000000000001],
      [-1.3999999999999988, -5.000000000000001],
      [0.0999814815089084, -5.010206199071604],
      [1.599985185190711, -5.016329948755015],
      [3.1000000000000862, -5.018371203689526],
      [4.600014814809461, -5.016329948755015],
      [6.1000185184912645, -5.010206199071604],
      [7.600000000000001, -5.000000000000001],
      [7.600000000000001, -6.000000000000001],
      [7.600000000000001, -7.000000000000001],
      [7.54546066836604, -7.9711260512476105],
      [8.213671832476555, -8.6779175242189],
      [9.186328167523447, -8.6779175242189],
      [9.854539331633962, -7.9711260512476105],
      [9.8, -7.000000000000001],
      [9.8, -6.000000000000001],
      [9.8, -5.000000000000001],
      [7.941645248799944, -3.655055473372329],
      [6.074954471523569, -2.3217049181749303],
      [4.2, -1],
      [4.2, 0],
      [5.2, -1.1102230246251565e-16],
    ],
  );
});

it('StemLayout setCoordinatesAndAngles - flat outermost loop', () => {
  let partners = parseDotBracket('.(((...)))...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'flat';
  let pbps = defaultPerBaseProps(partners.length);
  let omst1 = new Stem(0, partners, gps, pbps);
  let omst2 = new Stem(0, partners, gps, pbps);
  StemLayout.setCoordinatesAndAngles(omst1, gps, pbps);
  FlatOutermostLoop.setCoordinatesAndAngles(omst2, gps, pbps);
  let expectedCoords = [];
  omst2.baseCoordinates().forEach(c => expectedCoords.push([c.xLeft, c.yTop]));
  checkCoords(
    omst1.baseCoordinates(),
    expectedCoords,
  );
});

it('StemLayout setCoordinatesAndAngles - round outermost loop', () => {
  let partners = parseDotBracket('.(((...)))...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.outermostLoopShape = 'round';
  let pbps = defaultPerBaseProps(partners.length);
  let omst1 = new Stem(0, partners, gps, pbps);
  let omst2 = new Stem(0, partners, gps, pbps);
  StemLayout.setCoordinatesAndAngles(omst1, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst2, gps, pbps);
  let expectedCoords = [];
  omst2.baseCoordinates().forEach(c => expectedCoords.push([c.xLeft, c.yTop]));
  checkCoords(
    omst1.baseCoordinates(),
    expectedCoords,
  );
});

it('StemLayout setInnerCoordinatesAndAngles - round loop', () => {
  let partners = parseDotBracket('..(((...(((...)))..(((...)))..))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  pbps[2].loopShape = 'round';
  let st1 = new Stem(3, partners, gps, pbps);
  let st2 = new Stem(3, partners, gps, pbps);
  st1.xBottomCenter = 2;
  st2.xBottomCenter = 2;
  st1.yBottomCenter = 2.5;
  st2.yBottomCenter = 2.5;
  st1.angle = Math.PI / 3;
  st2.angle = Math.PI / 3;
  StemLayout.setInnerCoordinatesAndAngles(st1, gps, pbps);
  RoundLoop.setInnerCoordinatesAndAngles(st2, gps, pbps);
  let expectedCoords = [];
  st2.baseCoordinates().forEach(c => expectedCoords.push([c.xLeft, c.yTop]));
  checkCoords(
    st1.baseCoordinates(),
    expectedCoords,
  );
});

it('StemLayout setInnerCoordinatesAndAngles - triangle loop', () => {
  let partners = parseDotBracket('..(((...(((...)))..(((...)))..))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  pbps[2].loopShape = 'triangle';
  let st1 = new Stem(3, partners, gps, pbps);
  let st2 = new Stem(3, partners, gps, pbps);
  st1.xBottomCenter = 2;
  st2.xBottomCenter = 2;
  st1.yBottomCenter = 2.5;
  st2.yBottomCenter = 2.5;
  st1.angle = Math.PI / 3;
  st2.angle = Math.PI / 3;
  StemLayout.setInnerCoordinatesAndAngles(st1, gps, pbps);
  TriangleLoop.setInnerCoordinatesAndAngles(st2, gps, pbps);
  let expectedCoords = [];
  st2.baseCoordinates().forEach(c => expectedCoords.push([c.xLeft, c.yTop]));
  checkCoords(
    st1.baseCoordinates(),
    expectedCoords,
  );
});
