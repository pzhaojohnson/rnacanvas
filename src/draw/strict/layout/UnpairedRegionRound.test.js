import {
  baseCoordinatesRound,
  _coordinatesBounding5,
  _coordinatesBounding3,
  _polarLengthToFit,
  _center,
  _radius,
  _angleBounding5,
  _angleBounding3,
  _angleSpanBetweenBounds,
  _polarLengthBetweenBounds,
  _startingAngle,
  _angleIncrement,
} from './UnpairedRegionRound';
import GeneralStrictLayoutProps from './GeneralStrictLayoutProps';
import PerBaseStrictLayoutProps from './PerBaseStrictLayoutProps';
import Stem from './Stem';
import parseDotBracket from 'Parse/parseDotBracket';
import { RoundLoop } from './StemLayout';
import { normalizeAngle } from 'Math/angles/normalizeAngle';

function defaultPerBaseProps(length) {
  let pbps = [];
  for (let i = 0; i < length; i++) {
    pbps.push(new PerBaseStrictLayoutProps());
  }
  return pbps;
}

it('_coordinatesBounding5 - boundingStem5 is the outermost stem', () => {
  let partners = parseDotBracket('..(((....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.rotation = Math.PI / 3;
  gps.basePairBondLength = 1.2;
  gps.terminiGap = 1.5;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  expect(cb5.x).toBeCloseTo(-0.0006412282186380958, 3);
  expect(cb5.y).toBeCloseTo(-1.433619000151573, 3);
});

it('_coordinatesBounding5 - boundingStem5 is not the outermost stem', () => {
  let partners = parseDotBracket('(((...((((....))))..(((...))).)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  let ur = stit.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  expect(cb5.x).toBeCloseTo(2.5488715261690347, 3);
  expect(cb5.y).toBeCloseTo(-1.1000000000000008, 3);
});

it('_coordinatesBounding3 - boundingStem3 is the outermost stem', () => {
  let partners = parseDotBracket('.(((.....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.2;
  gps.terminiGap = 15;
  gps.rotation = Math.PI / 6;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(cb3.x).toBeCloseTo(0.4186567146356723, 3);
  expect(cb3.y).toBeCloseTo(3.3545540909828073, 3);
});

it('_coordinatesBounding3 - boundingStem3 is not the outermost stem', () => {
  let partners = parseDotBracket('(((...((((.....)))).......)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  stit.next();
  stit.next();
  let ur = stit.next().value;
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(cb3.x).toBeCloseTo(2.5488715261690356, 3);
  expect(cb3.y).toBeCloseTo(1.0999999999999994, 3);
});

it('_polarLengthToFit - both bounding stems are the outermost stem', () => {
  let partners = parseDotBracket('....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  expect(_polarLengthToFit(ur)).toBe(4);
});

it('_polarLengthToFit - only boundingStem5 is the outermost stem', () => {
  let partners = parseDotBracket('..(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  expect(_polarLengthToFit(ur)).toBe(2.5);
});

it('_polarLengthToFit - only boundingStem3 is the outermost stem', () => {
  let partners = parseDotBracket('..(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  expect(_polarLengthToFit(ur)).toBe(1.5);
});

it('_polarLengthToFit - neither bounding stem is the outermost stem', () => {
  let partners = parseDotBracket('..(((.....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  let ur = stit.next().value;
  expect(_polarLengthToFit(ur)).toBe(6);
});

it('_center - both bounding stems are the outermost stem and the termini gap is very small', () => {
  let partners = parseDotBracket('......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.rotation = Math.PI / 3;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  let center = _center(ur, gps, cb5, cb3);
  expect(center.x).toBeCloseTo(0, 3);
  expect(center.y).toBeCloseTo(0, 3);
});

it('_center - else case', () => {
  let partners = parseDotBracket('..(((....))).....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1.5;
  gps.rotation = -2 * Math.PI / 3;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  let center = _center(ur, gps, cb5, cb3);
  expect(center.x).toBeCloseTo(0, 3);
  expect(center.y).toBeCloseTo(0, 3);
});

it('_radius', () => {
  let partners = parseDotBracket('..(((....)))..').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 2;
  gps.basePairBondLength = (2 * (7 / Math.PI)) - 1;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(_radius(ur, gps, cb5, cb3)).toBeCloseTo(7 / Math.PI, 2);
});

it('_angleBounding5', () => {
  let partners = parseDotBracket('..((((.....))))....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    normalizeAngle(_angleBounding5(ur, gps, cb5, cb3))
  ).toBeCloseTo(0.12259607673582126, 3);
});

it('_angleBounding3', () => {
  let partners = parseDotBracket('..((((.....))))....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    normalizeAngle(_angleBounding3(ur, gps, cb5, cb3))
  ).toBeCloseTo(2.839692995904396, 3);
});

it('_angleSpanBetweenBounds - both stems are outermost and very small termini gap', () => {
  let partners = parseDotBracket('...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    _angleSpanBetweenBounds(ur, gps, cb5, cb3)
  ).toBeCloseTo(2 * Math.PI, 3);
});

it('_angleSpanBetweenBounds - else case', () => {
  let partners = parseDotBracket('(((....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.basePairBondLength = 1.5;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  let ur = stit.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    _angleSpanBetweenBounds(ur, gps, cb5, cb3)
  ).toBeCloseTo(3.7909885340679628, 3);
});

it('_polarLengthBetweenBounds', () => {
  let partners = parseDotBracket('..(((....))).....(((....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 3;
  gps.basePairBondLength = 2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    _polarLengthBetweenBounds(ur, gps, cb5, cb3)
  ).toBeCloseTo(6, 3);
});

it('_startingAngle - unpaired region of size zero', () => {
  let partners = [];
  let gps = new GeneralStrictLayoutProps();
  let pbps = [];
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(_startingAngle(ur, gps, cb5, cb3)).toBe(0);
});

it('_startingAngle - boundingStem5 is the outermost stem', () => {
  let partners = parseDotBracket('.....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.rotation = Math.PI / 3;
  gps.terminiGap = 0;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    normalizeAngle(_startingAngle(ur, gps, cb5, cb3))
  ).toBeCloseTo(4.817108735504348, 3);
});

it('_startingAngle - boundingStem5 is not outermost and boundingStem3 is outermost', () => {
  let partners = parseDotBracket('...(((....)))....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.rotation = Math.PI / 6;
  gps.basePairBondLength = 0.9;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    normalizeAngle(_startingAngle(ur, gps, cb5, cb3))
  ).toBeCloseTo(1.4737184696867538, 3);
});

it('_startingAngle - neither boundingStem5 or boundingStem3 are outermost', () => {
  let partners = parseDotBracket('(((...))).....(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 3;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    normalizeAngle(_startingAngle(ur, gps, cb5, cb3))
  ).toBeCloseTo(5.394776913533493, 3);
});

it('_angleIncrement - unpaired region of size zero', () => {
  let partners = [];
  let gps = new GeneralStrictLayoutProps();
  let pbps = [];
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(_angleIncrement(ur, gps, cb5, cb3)).toBe(0);
});

it('_angleIncrement - boundingStem5 is the outermost stem', () => {
  let partners = parseDotBracket('...(((....))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 2;
  pbps[1].stretch3 = 2;
  pbps[2].stretch3 = 2;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    _angleIncrement(ur, gps, cb5, cb3)
  ).toBeCloseTo(0.3207913849843259, 3);
});

it('_angleIncrement - boundingStem5 is not outermost and boundingStem3 is outermost', () => {
  let partners = parseDotBracket('...(((....)))....').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.rotation = Math.PI / 6;
  gps.basePairBondLength = 0.9;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    normalizeAngle(_angleIncrement(ur, gps, cb5, cb3))
  ).toBeCloseTo(0.626135131286097, 3);
});

it('_angleIncrement - neither boundingStem5 or boundingStem3 are outermost', () => {
  let partners = parseDotBracket('(((...)))...(((...)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[9].stretch3 = -0.25;
  pbps[10].stretch3 = -0.25;
  pbps[11].stretch3 = -0.25;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  let cb5 = _coordinatesBounding5(ur, gps);
  let cb3 = _coordinatesBounding3(ur, gps);
  expect(
    _angleIncrement(ur, gps, cb5, cb3)
  ).toBeCloseTo(0.7461625835116426, 3);
});

function checkCoords(coords, expectedCoords) {
  expect(coords.length).toBe(expectedCoords.length);
  for (let i = 0; i < expectedCoords.length; i++) {
    expect(coords[i].xCenter).toBeCloseTo(expectedCoords[i][0]);
    expect(coords[i].yCenter).toBeCloseTo(expectedCoords[i][1]);
  }
}

it('baseCoordinatesRound - unpaired region of size zero', () => {
  let partners = [];
  let gps = new GeneralStrictLayoutProps();
  let pbps = [];
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(baseCoordinatesRound(ur, gps), []);
});

it('baseCoordinatesRound - a hairpin loop with inner bounding stems', () => {
  let partners = parseDotBracket('(((.....)))').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 3;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let omit = omst.loopIterator();
  omit.next();
  let st = omit.next().value;
  let stit = st.loopIterator();
  let ur = stit.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [166.23066262917771, -1.6846340230388313],
      [166.9037339206309, -0.9590793224318457],
      [167.14790894030966, -4.04121180963557e-14],
      [166.9037339206309, 0.959079322431765],
      [166.23066262917771, 1.6846340230387506],
    ],
  );
});

it('baseCoordinatesRound - inner bounding stems and zero stretch', () => {
  let partners = parseDotBracket('.(((...)))......(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [1.9471805025012876, -2.210533610497833],
      [2.572125437156198, -1.436015838351301],
      [2.903508612830576, -0.4976027408288817],
      [2.9035086128305765, 0.49760274082888006],
      [2.5721254371561986, 1.4360158383512995],
      [1.947180502501289, 2.210533610497832],
    ],
  );
});

it('baseCoordinatesRound - inner bounding stems and some positive stretch', () => {
  let partners = parseDotBracket('.(((...)))......(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[10].stretch3 = 0.5;
  pbps[11].stretch3 = 0.5;
  pbps[12].stretch3 = 0.5;
  pbps[13].stretch3 = 0.5;
  pbps[14].stretch3 = 0.5;
  pbps[15].stretch3 = 0.5;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [0.7202642865479394, -2.4628893954652034],
      [0.9571313339759069, -1.491961124732778],
      [1.076417593442466, -0.4997018373652182],
      [1.076417593442466, 0.4997018373652188],
      [0.9571313339759069, 1.4919611247327786],
      [0.7202642865479394, 2.4628893954652042],
    ],
  );
});

it('baseCoordinatesRound - inner bounding stems and excessive positive stretch', () => {
  let partners = parseDotBracket('.(((...)))......(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[10].stretch3 = 1;
  pbps[11].stretch3 = 1;
  pbps[12].stretch3 = 1;
  pbps[13].stretch3 = 1;
  pbps[14].stretch3 = 1;
  pbps[15].stretch3 = 1;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-0.3758357120963183, -2.767194161612222],
      [-0.37026976986459204, -1.660323494060175],
      [-0.3674867899525225, -0.5534423308710776],
      [-0.3674867899525225, 0.5534423308710755],
      [-0.37026976986459204, 1.6603234940601732],
      [-0.3758357120963183, 2.7671941616122204],
    ],
  );
});

it('baseCoordinatesRound - inner bounding stems and some negative stretch', () => {
  let partners = parseDotBracket('.(((...)))......(((...))).').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  gps.basePairBondLength = 1.2;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[10].stretch3 = -0.5;
  pbps[11].stretch3 = -0.5;
  pbps[12].stretch3 = -0.5;
  pbps[13].stretch3 = -0.5;
  pbps[14].stretch3 = -0.5;
  pbps[15].stretch3 = -0.5;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [2.699320377385912, -1.8206389900170503],
      [3.565264212752332, -1.3446185943409912],
      [4.068290695318737, -0.49407847127473126],
      [4.068290695318737, 0.4940784712747293],
      [3.565264212752332, 1.3446185943409894],
      [2.6993203773859125, 1.820638990017049],
    ],
  );
});

it("baseCoordinatesRound - 5' bounding stem is outermost and zero stretch", () => {
  let partners = parseDotBracket('......(((...)))...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-1.8617037397127891, -0.49440400136399765],
      [-1.3711161260622107, -1.3529289337867938],
      [-0.5192182921150033, -1.854936251238434],
      [0.46950155999698734, -1.868139292500886],
      [1.3345005187085714, -1.3890588528179322],
      [1.8478380336988793, -0.5439400079431338],
    ],
  );
});

it("baseCoordinatesRound - 5' bounding stem is outermost and some positive stretch", () => {
  let partners = parseDotBracket('......(((...)))...(((...)))...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 0.25;
  pbps[1].stretch3 = 0.25;
  pbps[2].stretch3 = 0.25;
  pbps[3].stretch3 = 0.25;
  pbps[4].stretch3 = 0.25;
  pbps[5].stretch3 = 0.25;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-2.8189792004809333, -0.4026525128459699],
      [-2.1054755582367304, -1.1005096654708937],
      [-1.2586021527000808, -1.6286171241952219],
      [-0.31798019900071406, -1.9622672301210202],
      [0.6723830350222624, -2.0858500673641474],
      [1.666153121465857, -1.9935837774452385],
    ],
  );
});

it("baseCoordinatesRound - 5' bounding stem is outermost and excessive positive stretch", () => {
  let partners = parseDotBracket('......(((...)))...(((...)))...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 2;
  pbps[1].stretch3 = 2;
  pbps[2].stretch3 = 2;
  pbps[3].stretch3 = 2;
  pbps[4].stretch3 = 2;
  pbps[5].stretch3 = 2;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-4.310888166059215, 0.17466710422047527],
      [-2.9951806908322283, 0.6678147998584336],
      [-1.680749542637102, 1.1643543921727542],
      [-0.36760346577412406, 1.6642825779159125],
      [0.9442488040054968, 2.1675960312979328],
      [2.254798539557555, 2.6742914040078745],
    ],
  );
});

it("baseCoordinatesRound - 5' bounding stem is outermost and some negative stretch", () => {
  let partners = parseDotBracket('......(((...)))...').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = -0.5;
  pbps[1].stretch3 = -0.5;
  pbps[2].stretch3 = -0.5;
  pbps[3].stretch3 = -0.5;
  pbps[4].stretch3 = -0.5;
  pbps[5].stretch3 = -0.5;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-1.7951188217860583, -0.3722107560305913],
      [-2.0345141262634807, -1.3256119391011272],
      [-1.6567685299075552, -2.233131741705919],
      [-0.8115942121180499, -2.735092198550061],
      [0.1660402919066658, -2.632550966713872],
      [0.8886684076627236, -1.9661482851428982],
    ],
  );
});

it("baseCoordinatesRound - 3' bounding stem is outermost and zero stretch", () => {
  let partners = parseDotBracket('...(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [1.8478380336988796, 0.543940007943132],
      [1.3345005187085734, 1.38905885281793],
      [0.4695015599969908, 1.868139292500885],
      [-0.5192182921150001, 1.8549362512384346],
      [-1.371116126062209, 1.352928933786796],
      [-1.8617037397127882, 0.4944040013640007],
    ],
  );
});

it("baseCoordinatesRound - 3' bounding stem is outermost and some positive stretch", () => {
  let partners = parseDotBracket('...(((...)))...(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[23].stretch3 = 0.25;
  pbps[24].stretch3 = 0.25;
  pbps[25].stretch3 = 0.25;
  pbps[26].stretch3 = 0.25;
  pbps[27].stretch3 = 0.25;
  pbps[28].stretch3 = 0.25;
  pbps[29].stretch3 = 0.25;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [1.763044111407586, 1.8424542355856284],
      [0.7670445525730324, 1.9128686952018379],
      [-0.2242468224544032, 1.7932245264434457],
      [-1.1748915586139526, 1.487859330434123],
      [-2.050424811370597, 1.0078438716840532],
      [-2.8191048413618502, 0.3705807166104864],
    ],
  );
});

it("baseCoordinatesRound - 3' bounding stem is outermost and excessive positive stretch", () => {
  let partners = parseDotBracket('...(((...)))...(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[23].stretch3 = 2;
  pbps[24].stretch3 = 2;
  pbps[25].stretch3 = 2;
  pbps[26].stretch3 = 2;
  pbps[27].stretch3 = 2;
  pbps[28].stretch3 = 2;
  pbps[29].stretch3 = 2;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [1.99399727683425, -3.329098237753442],
      [0.7400493937033161, -2.731752896576154],
      [-0.5153460071271923, -2.137455716868658],
      [-1.7721815160418828, -1.5462102063014527],
      [-3.0304497149255667, -0.9580198545335179],
      [-4.2901431772069145, -0.3728881331917364],
    ],
  );
});

it("baseCoordinatesRound - 3' bounding stem is outermost and some negative stretch", () => {
  let partners = parseDotBracket('...(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  gps.basePairBondLength = 1;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[11].stretch3 = -0.75;
  pbps[12].stretch3 = -0.75;
  pbps[13].stretch3 = -0.75;
  pbps[14].stretch3 = -0.75;
  pbps[15].stretch3 = -0.75;
  pbps[16].stretch3 = -0.75;
  pbps[17].stretch3 = -0.75;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  it.next();
  it.next();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-0.870734982268571, 1.9249644765160794],
      [-1.768095704624689, 2.3004986504777585],
      [-2.6581385126454427, 1.9079353030660247],
      [-2.9859025149307055, 0.9920461500313789],
      [-2.547019785311175, 0.12390783646476489],
      [-1.6151431735766306, -0.15517667106426192],
    ],
  );
});

it("baseCoordinatesRound - 5' and 3' bounding stems are outermost - some termini gap", () => {
  let partners = parseDotBracket('......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 4;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-4.440892098500626e-16, -1.5915494309189535],
      [0.9354892837886386, -1.28759053700121],
      [1.5136534572813138, -0.4918158215417334],
      [1.513653457281314, 0.49181582154173265],
      [0.9354892837886393, 1.2875905370012095],
      [2.7755575615628914e-16, 1.5915494309189535],
    ],
  );
});

it("baseCoordinatesRound - 5' and 3' bounding stems are outermost - zero termini gap", () => {
  let partners = parseDotBracket('......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 0;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur, gps),
    [
      [-0.8269933431326884, -0.4774648292756858],
      [-2.220446049250313e-16, -0.954929658551372],
      [0.8269933431326882, -0.4774648292756858],
      [0.8269933431326876, 0.4774648292756866],
      [-1.4432899320127035e-15, 0.9549296585513719],
      [-0.8269933431326892, 0.4774648292756842],
    ],
  );
});

it('baseCoordinatesRound - one stem in outermost loop and large base pair bond length', () => {
  // and zero stretch
  let partners = parseDotBracket('......(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1;
  gps.basePairBondLength = 15;
  let pbps = defaultPerBaseProps(partners.length);
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur5 = it.next().value;
  it.next();
  let ur3 = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur5, gps),
    [
      [1306.3338231739756, -13.999828718150969],
      [1306.349085730354, -12.99993001088135],
      [1306.361392322576, -11.999990553606791],
      [1306.3707428430928, -11.000019084917447],
      [1306.377137210189, -10.000024343683226],
      [1306.3805753679837, -9.000015068977417],
    ],
  );
  checkCoords(
    baseCoordinatesRound(ur3, gps),
    [
      [1306.380575370328, 9.00001387288416],
      [1306.3771372219494, 10.000021951521665],
      [1306.370742871341, 11.000015496743256],
      [1306.3613923743833, 11.999985769506996],
      [1306.3490858127911, 12.999924030974338],
      [1306.333823294113, 13.999821542586478],
    ],
  );
});

it('baseCoordinatesRound - one stem in outermost loop and large base pair bond length', () => {
  // and 5' positive stretch and 3' negative stretch
  let partners = parseDotBracket('......(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1;
  gps.basePairBondLength = 15;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = 0.75;
  pbps[1].stretch3 = 0.75;
  pbps[2].stretch3 = 0.75;
  pbps[3].stretch3 = 0.75;
  pbps[4].stretch3 = 0.75;
  pbps[5].stretch3 = 0.75;
  pbps[14].stretch3 = -0.75;
  pbps[15].stretch3 = -0.75;
  pbps[16].stretch3 = -0.75;
  pbps[17].stretch3 = -0.75;
  pbps[18].stretch3 = -0.75;
  pbps[19].stretch3 = -0.75;
  pbps[20].stretch3 = -0.75;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur5 = it.next().value;
  it.next();
  let ur3 = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur5, gps),
    [
      [1306.3360176231363, -13.624821394817735],
      [1306.3572643928987, -11.874939529156421],
      [1306.3743990163857, -10.125012566773812],
      [1306.387421398977, -8.37505017102146],
      [1306.3963314687612, -6.625062005446589],
      [1306.4011291765357, -4.875057733738723],
    ],
  );
  checkCoords(
    baseCoordinatesRound(ur3, gps),
    [
      [1307.1277584213594, 12.300414811908556],
      [1308.0864443781102, 12.468142676494274],
      [1308.6303965655763, 13.27519126114083],
      [1308.4261180279796, 14.226759272008536],
      [1307.5988518877652, 14.739440589675224],
      [1306.655794817247, 14.498910421142206],
    ],
  );
});

it('baseCoordinatesRound - one stem in outermost loop and large base pair bond length', () => {
  // and 5' negative stretch and 3' positive stretch
  let partners = parseDotBracket('......(((...)))......').secondaryPartners;
  let gps = new GeneralStrictLayoutProps();
  gps.terminiGap = 1;
  gps.basePairBondLength = 15;
  let pbps = defaultPerBaseProps(partners.length);
  pbps[0].stretch3 = -0.75;
  pbps[1].stretch3 = -0.75;
  pbps[2].stretch3 = -0.75;
  pbps[3].stretch3 = -0.75;
  pbps[4].stretch3 = -0.75;
  pbps[5].stretch3 = -0.75;
  pbps[14].stretch3 = 0.75;
  pbps[15].stretch3 = 0.75;
  pbps[16].stretch3 = 0.75;
  pbps[17].stretch3 = 0.75;
  pbps[18].stretch3 = 0.75;
  pbps[19].stretch3 = 0.75;
  pbps[20].stretch3 = 0.75;
  let omst = new Stem(0, partners, gps, pbps);
  RoundLoop.setCoordinatesAndAngles(omst, gps, pbps);
  let it = omst.loopIterator();
  let ur5 = it.next().value;
  it.next();
  let ur3 = it.next().value;
  checkCoords(
    baseCoordinatesRound(ur5, gps),
    [
      [1306.7317591851463, -15.154877285249562],
      [1307.708637470048, -15.212349255890315],
      [1308.4812392957804, -14.611782332228524],
      [1308.6665338107296, -13.650918057915378],
      [1308.1726580222178, -12.806121682187252],
      [1307.244459479868, -12.496215765978036],
    ],
  );
  checkCoords(
    baseCoordinatesRound(ur3, gps),
    [
      [1306.4004012521464, 4.875054746574598],
      [1306.3952630153076, 6.625055500854906],
      [1306.3863998085694, 8.37504135366223],
      [1306.37381167209, 10.12500437620854],
      [1306.3574986629026, 11.874936639809253],
      [1306.337460854918, 13.624830215919133],
    ],
  );
});
