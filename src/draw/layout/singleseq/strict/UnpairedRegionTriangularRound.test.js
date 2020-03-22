import baseCoordinatesTriangularRound from './UnpairedRegionTriangularRound';
import StrictLayoutGeneralProps from './StrictLayoutGeneralProps';
import StrictLayoutBaseProps from './StrictLayoutBaseProps';
import Stem from './Stem';

function zeroStretch3(length) {
  let bps = [];
  for (let i = 0; i < length; i++) {
    bps.push(new StrictLayoutBaseProps());
    bps[i].stretch3 = 0;
  }
  return bps;
}

function checkCoords(coords, expectedCoords) {
  expect(coords.length).toBe(expectedCoords.length);

  for (let i = 0; i < expectedCoords.length; i++) {
    expect(coords[i].xCenter).toBeCloseTo(expectedCoords[i][0]);
    expect(coords[i].yCenter).toBeCloseTo(expectedCoords[i][1]);
  }
}

it('length zero', () => {
  let partners = [3, null, 1, 6, null, 4];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 0;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = 0;
  bs3.angle = Math.PI / 6;
  bs3.xBottomCenter = -0.5;
  bs3.yBottomCenter = 0.5;

  let coords = baseCoordinatesTriangularRound(ur, gps);
  expect(coords.length).toBe(0);
});

it('length one - positive total stretch', () => {
  let partners = [3, null, 1, null, 7, null, 5];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI / 6;
  bs5.xBottomCenter = -2.303847577293368;
  bs5.yBottomCenter = -6.800000000000001;
  bs3.angle = bs5.angle + (Math.PI / 3);
  bs3.xBottomCenter = -7.5;
  bs3.yBottomCenter = -3.8000000000000007;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-4.389662067667558, -4.412736672491484],
    ],
  );
});

it('length one - stems are very far apart', () => {
  let partners = [3, null, 1, null, 7, null, 5];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI - (Math.PI / 16);
  bs5.xBottomCenter = -40;
  bs5.yBottomCenter = 400;
  bs3.angle = Math.PI + (Math.PI / 16);
  bs3.xBottomCenter = -40;
  bs3.yBottomCenter = -400;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-41.252042379259365, 3.1804836542193016e-11],
    ],
  );
});

it('length one - polar length from stems is close to 2', () => {
  let partners = [3, null, 1, null, 7, null, 5];
  let gps = new StrictLayoutGeneralProps();
  gps.basePairBondLength = 0;
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 0;
  bs5.xBottomCenter = 6;
  bs5.yBottomCenter = 2;
  bs3.angle = 0.55;
  bs3.xBottomCenter = 5.262622610297528;
  bs3.yBottomCenter = 4.613436144653296;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [6.2516348495846294, 3.481741501501645],
    ],
  );
});

it('length one - polar length from stems is less than 2', () => {
  let partners = [3, null, 1, null, 7, null, 5];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = -Math.PI / 8;
  bs5.xBottomCenter = 4.195518130045147;
  bs5.yBottomCenter = -1.3307337294603592;
  bs3.angle = Math.PI / 8;
  bs3.xBottomCenter = 4.195518130045147;
  bs3.yBottomCenter = 1.730733729460359;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [5.198232897818633, -0.07469370367214268],
    ],
  );
});

it('length one - stems are completely overlapping', () => {
  let partners = [3, null, 1, null, 7, null, 5];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI;
  bs5.xBottomCenter = 1;
  bs5.yBottomCenter = 1;
  bs3.angle = Math.PI;
  bs3.xBottomCenter = 1;
  bs3.yBottomCenter = 1;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [0.5004545454232812, 0.8999998622588915],
    ],
  );
});

it('length one - angle span is greater than Math.PI', () => {
  let partners = [3, null, 1, null, 7, null, 5];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 4 * Math.PI / 5;
  bs5.xBottomCenter = -2.6541019662496836;
  bs5.yBottomCenter = 1.326711513754839;
  bs3.angle = bs5.angle - (Math.PI / 5);
  bs3.xBottomCenter = 0.34589803375031614;
  bs3.yBottomCenter = 3.5063390977709217;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-1.2056761059313246, 2.487511019184538],
    ],
  );
});

it('length four - positive total stretch', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI / 6;
  bs5.xBottomCenter = 6.260254037844387;
  bs5.yBottomCenter = 8.5;
  bs3.angle = bs5.angle + (2 * Math.PI / 3);
  bs3.xBottomCenter = -11.060254037844386;
  bs3.yBottomCenter = 8.500000000000004;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [2.7261520426284083, 9.753857645774303],
      [-0.6912506521201671, 9.77947321614738],
      [-4.10874934788003, 9.77947321614738],
      [-7.526152042628606, 9.753857645774303],
    ],
  );
});

it('length four - stems are very far apart', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI / 6;
  bs5.xBottomCenter = 863.6254037844387;
  bs5.yBottomCenter = 503.49999999999994;
  bs3.angle = bs5.angle + (2 * Math.PI / 3);
  bs3.xBottomCenter = -868.4254037844385;
  bs3.yBottomCenter = 503.50000000000034;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [517.1452418920186, 505.21838692208985],
      [170.78177929739417, 505.4762664824957],
      [-175.58177929733657, 505.4762664824957],
      [-521.9452418919609, 505.21838692208985],
    ],
  );
});

it('length four - negative total stretch', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = -Math.PI / 8;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = -3;
  bs3.angle = Math.PI / 8;
  bs3.xBottomCenter = 0;
  bs3.yBottomCenter = 3;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [1.1825392675060398, -1.222375791587458],
      [1.8302480570910384, -0.4891640988607182],
      [1.8302480570910384, 0.489164098860719],
      [1.1825392675060398, 1.222375791587459],
    ],
  );
});

it('length four - polar length from stems is close to 3', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  gps.basePairBondLength = 0;
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 0;
  bs5.xBottomCenter = 6;
  bs5.yBottomCenter = 2;
  bs3.angle = 0.7;
  bs3.xBottomCenter = 4.824210936422443;
  bs3.yBottomCenter = 5.221088436188455;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [6.379531993355736, 3.490258533656494],
      [7.226341256094986, 3.793951409749537],
      [6.9178636932969795, 4.639029443839204],
      [6.074543922303505, 4.32577706267959],
    ],
  );
});

it('length four - polar length from stems is less than 3', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = -Math.PI / 3;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = -1;
  bs3.angle = Math.PI / 3;
  bs3.xBottomCenter = 0;
  bs3.yBottomCenter = 1;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [1.7101862715174772, -0.06768876660019263],
      [2.473528095413631, -0.42045692897577214],
      [2.4735280954136307, 0.4204569289757723],
      [1.7101862715174772, 0.06768876660019257],
    ],
  );
});

it('length four - stems are completely overlapping', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI / 3;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = 2;
  bs3.angle = Math.PI / 3;
  bs3.xBottomCenter = 0;
  bs3.yBottomCenter = 2;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-1.568880501372064, 3.4826189851380605],
      [-1.5209372377986763, 2.524738738898863],
      [-0.6903501911906629, 2.045199083954341],
      [0.16317006762244546, 2.4826191228791004],
    ],
  );
});

it('length four - angle span is greater than Math.PI', () => {
  let partners = [3, null, 1, null, null, null, null, 10, null, 8];
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 4 * Math.PI / 5;
  bs5.xBottomCenter = -2.6541019662496836;
  bs5.yBottomCenter = 1.326711513754839;
  bs3.angle = bs5.angle - (Math.PI / 5);
  bs3.xBottomCenter = 0.34589803375031614;
  bs3.yBottomCenter = 3.5063390977709217;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-2.6987784069805016, 1.4240096177862824],
      [-1.701151860859376, 2.129893642385028],
      [-0.712451340812251, 2.8482266176602877],
      [0.26716781732204, 3.578895685519001],
    ],
  );
});

it('length 50 - positive total stretch', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = -Math.PI / 3;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = 0;
  bs3.angle = Math.PI / 3;
  bs3.xBottomCenter = 0;
  bs3.yBottomCenter = 50;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [1.568816906480798, 1.047517739645233],
      [1.9210104641015917, 1.9834349137166143],
      [2.2591294113515374, 2.924528339611168],
      [2.583097707830568, 3.870586372518151],
      [2.8928424955132215, 4.821396251124167],
      [3.188294115133843, 5.776744145461571],
      [3.469386121852402, 6.736415204997229],
      [3.7360553001975134, 7.700193606950762],
      [3.9882416782830106, 8.66786260483148],
      [4.225888541295269, 9.639204577183026],
      [4.448942444247912, 10.614001076524787],
      [4.65735322400112, 11.592032878479106],
      [4.851074010543066, 12.573080031073177],
      [5.0300612375304965, 13.556921904204579],
      [5.1942746520865555, 14.54333723925934],
      [5.343677323853349, 15.53210419887131],
      [5.478235653297254, 16.523000416811726],
      [5.597919379265271, 17.515803047997693],
      [5.702701585790443, 18.510288818608352],
      [5.792558708145144, 19.506234076297496],
      [5.8674705381405445, 20.503414840491278],
      [5.927420228671288, 21.501606852759775],
      [5.972394297504316, 22.500585627250985],
      [6.002382630310898, 23.500126501176027],
      [6.017378482941247, 24.500004685334105],
      [6.017378482941247, 25.499995314665878],
      [6.002382630310898, 26.499873498823952],
      [5.97239429750433, 27.499414372748998],
      [5.927420228671288, 28.498393147240208],
      [5.8674705381405445, 29.4965851595087],
      [5.792558708145144, 30.493765923702487],
      [5.702701585790443, 31.48971118139163],
      [5.597919379265271, 32.48419695200229],
      [5.4782356532972685, 33.47699958318825],
      [5.343677323853363, 34.46789580112867],
      [5.19427465208657, 35.45666276074064],
      [5.0300612375304965, 36.4430780957954],
      [4.85107401054308, 37.4269199689268],
      [4.657353224001135, 38.407967121520876],
      [4.448942444247912, 39.38599892347519],
      [4.225888541295284, 40.360795422816956],
      [3.9882416782830106, 41.3321373951685],
      [3.7360553001975134, 42.299806393049224],
      [3.4693861218524162, 43.26358479500276],
      [3.18829411513385, 44.22325585453841],
      [2.892842495513243, 45.178603748875815],
      [2.5830977078305892, 46.12941362748183],
      [2.2591294113515517, 47.075471660388814],
      [1.921010464101613, 48.016565086283364],
      [1.5688169064808193, 48.952482260354756],
    ],
  );
});

it('length 50 - stems are very far apart', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = -Math.PI / 3;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = 0;
  bs3.angle = Math.PI / 3;
  bs3.xBottomCenter = 0;
  bs3.yBottomCenter = 5000;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [1.3081524702720344, 98.15157814222448],
      [1.4094560164958239, 196.18617343893902],
      [1.5065385829657316, 294.2207730065111],
      [1.5994001696817577, 392.25537666320315],
      [1.688040776643902, 490.28998422727636],
      [1.7724604029208422, 588.3245955169916],
      [1.8526590489782393, 686.3592103506112],
      [1.9286367148160934, 784.3938285463962],
      [2.0003933999687433, 882.4284499226073],
      [2.0679291039705276, 980.4630742975069],
      [2.1312438272871077, 1078.4977014893557],
      [2.190337569452822, 1176.5323313164151],
      [2.245210330467671, 1274.5669635969468],
      [2.295862110797316, 1372.6015981492117],
      [2.3422929090447724, 1470.6362347914715],
      [2.3845027261413634, 1568.6708733419875],
      [2.422491562087089, 1666.705513619021],
      [2.456259415950626, 1764.740155440833],
      [2.4858062881976366, 1862.7747986256852],
      [2.5111321792937815, 1960.8094429918388],
      [2.5322370883077383, 2058.8440883575554],
      [2.5491210157051682, 2156.8787345410956],
      [2.56178396102041, 2254.9133813607214],
      [2.5702259251847863, 2352.9480286346943],
      [2.574446906801313, 2450.9826761812747],
      [2.574446906801313, 2549.017323818725],
      [2.5702259251847863, 2647.0519713653052],
      [2.56178396102041, 2745.0866186392777],
      [2.5491210157051682, 2843.1212654589035],
      [2.5322370883077383, 2941.155911642444],
      [2.5111321792937815, 3039.190557008161],
      [2.4858062881976366, 3137.2252013743146],
      [2.456259415950626, 3235.2598445591666],
      [2.422491562087089, 3333.2944863809785],
      [2.3845027261413634, 3431.329126658012],
      [2.3422929090447724, 3529.363765208528],
      [2.295862110797316, 3627.398401850788],
      [2.245210330467671, 3725.433036403053],
      [2.190337569452822, 3823.4676686835846],
      [2.1312438272871077, 3921.5022985106443],
      [2.0679291039705276, 4019.5369257024927],
      [2.0003933999687433, 4117.571550077392],
      [1.9286367148160934, 4215.606171453604],
      [1.8526590489782393, 4313.640789649388],
      [1.7724604029208422, 4411.675404483008],
      [1.688040776643902, 4509.710015772724],
      [1.5994001696817577, 4607.744623336796],
      [1.5065385829657316, 4705.779226993489],
      [1.4094560164958239, 4803.8138265610605],
      [1.3081524702720344, 4901.848421857775],
    ],
  );
});

it('length 50 - negative total stretch (first pair is a circle pair)', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = Math.PI / 3;
  bs5.xBottomCenter = 6;
  bs5.yBottomCenter = 0;
  bs3.angle = 2 * Math.PI / 3;
  bs3.xBottomCenter = -6;
  bs3.yBottomCenter = 0;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [4.409052860606921, 1.4414304459589147],
      [4.329019539828665, 2.4382226347150286],
      [4.248986219050409, 3.435014823471143],
      [4.1689528982721535, 4.4318070122272575],
      [4.088919577493898, 5.4285992009833715],
      [4.008886256715642, 6.425391389739485],
      [3.9288529359373863, 7.422183578495599],
      [3.8488196151591305, 8.418975767251712],
      [3.7687862943808748, 9.415767956007828],
      [3.688752973602619, 10.412560144763942],
      [3.6087196528243632, 11.409352333520056],
      [3.5286863320461075, 12.40614452227617],
      [3.4486530112678517, 13.402936711032284],
      [3.368619690489596, 14.399728899788398],
      [3.28858636971134, 15.396521088544512],
      [3.2085530489330845, 16.393313277300628],
      [3.1285197281548287, 17.390105466056742],
      [3.048486407376573, 18.386897654812856],
      [2.968453086598317, 19.38368984356897],
      [2.8884197658200614, 20.380482032325084],
      [2.8083864450418057, 21.377274221081198],
      [2.72835312426355, 22.37406640983731],
      [2.2088088930072685, 23.222858980274598],
      [1.4356254107747222, 23.8494069342765],
      [0.4975879409363788, 24.181763280748925],
      [-0.4975879409363775, 24.181763280748925],
      [-1.4356254107747206, 23.8494069342765],
      [-2.2088088930072667, 23.222858980274598],
      [-2.7283531242635464, 22.37406640983731],
      [-2.8083864450418026, 21.377274221081198],
      [-2.8884197658200588, 20.380482032325084],
      [-2.968453086598315, 19.38368984356897],
      [-3.048486407376571, 18.386897654812856],
      [-3.1285197281548274, 17.390105466056742],
      [-3.2085530489330836, 16.393313277300628],
      [-3.2885863697113398, 15.396521088544512],
      [-3.368619690489596, 14.399728899788398],
      [-3.448653011267852, 13.402936711032284],
      [-3.5286863320461084, 12.40614452227617],
      [-3.608719652824364, 11.409352333520056],
      [-3.68875297360262, 10.412560144763942],
      [-3.7687862943808756, 9.415767956007828],
      [-3.8488196151591314, 8.418975767251712],
      [-3.928852935937387, 7.422183578495599],
      [-4.008886256715643, 6.425391389739485],
      [-4.088919577493899, 5.4285992009833715],
      [-4.168952898272154, 4.4318070122272575],
      [-4.24898621905041, 3.435014823471143],
      [-4.329019539828666, 2.4382226347150286],
      [-4.409052860606922, 1.4414304459589147],
    ],
  );
});

it('length 50 - polar length from stems is close to 3', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  gps.basePairBondLength = 0;
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 0;
  bs5.xBottomCenter = 6;
  bs5.yBottomCenter = 2;
  bs3.angle = 0.7;
  bs3.xBottomCenter = 4.824210936422443;
  bs3.yBottomCenter = 5.221088436188455;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [6.379531993355736, 3.490258533656494],
      [7.318904706203115, 3.8331563411119456],
      [8.258277419050494, 4.176054148567397],
      [9.197650131897873, 4.518951956022849],
      [10.137022844745252, 4.8618497634783004],
      [11.07639555759263, 5.204747570933752],
      [12.015768270440008, 5.547645378389204],
      [12.955140983287386, 5.890543185844655],
      [13.894513696134764, 6.233440993300107],
      [14.833886408982142, 6.5763388007555585],
      [15.77325912182952, 6.91923660821101],
      [16.7126318346769, 7.262134415666462],
      [17.652004547524278, 7.605032223121913],
      [18.591377260371658, 7.947930030577365],
      [19.530749973219038, 8.290827838032817],
      [20.470122686066418, 8.63372564548827],
      [21.409495398913798, 8.976623452943722],
      [22.348868111761178, 9.319521260399174],
      [23.288240824608557, 9.662419067854627],
      [24.227613537455937, 10.00531687531008],
      [25.166986250303317, 10.348214682765532],
      [26.106358963150697, 10.691112490220984],
      [27.045731675998077, 11.034010297676437],
      [27.985104388845457, 11.37690810513189],
      [28.831913651584706, 11.680600981224934],
      [28.5234360887867, 12.525679015314603],
      [27.680116317793225, 12.212426634154987],
      [26.740743604945845, 11.869528826699534],
      [25.801370892098465, 11.526631019244082],
      [24.861998179251085, 11.18373321178863],
      [23.922625466403705, 10.840835404333177],
      [22.983252753556325, 10.497937596877724],
      [22.043880040708945, 10.155039789422272],
      [21.104507327861565, 9.81214198196682],
      [20.165134615014185, 9.469244174511367],
      [19.225761902166806, 9.126346367055914],
      [18.286389189319426, 8.783448559600462],
      [17.347016476472046, 8.44055075214501],
      [16.407643763624666, 8.097652944689557],
      [15.468271050777288, 7.754755137234106],
      [14.52889833792991, 7.4118573297786545],
      [13.589525625082532, 7.068959522323203],
      [12.650152912235153, 6.726061714867751],
      [11.710780199387775, 6.3831639074123],
      [10.771407486540397, 6.040266099956848],
      [9.83203477369302, 5.697368292501396],
      [8.892662060845641, 5.354470485045945],
      [7.953289347998263, 5.011572677590493],
      [7.013916635150884, 4.668674870135042],
      [6.074543922303505, 4.32577706267959],
    ],
  );
});

it('length 50 - polar length from stems is less than 3', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = -Math.PI / 3;
  bs5.xBottomCenter = 0;
  bs5.yBottomCenter = -1;
  bs3.angle = Math.PI / 3;
  bs3.xBottomCenter = 0;
  bs3.yBottomCenter = 1;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [1.7101862715174772, -0.06768876660019263],
      [2.710186271517477, -0.06768876660019263],
      [3.710186271517477, -0.06768876660019263],
      [4.710186271517477, -0.06768876660019263],
      [5.710186271517477, -0.06768876660019263],
      [6.710186271517477, -0.06768876660019263],
      [7.710186271517477, -0.06768876660019263],
      [8.710186271517477, -0.06768876660019263],
      [9.710186271517477, -0.06768876660019263],
      [10.710186271517477, -0.06768876660019263],
      [11.710186271517477, -0.06768876660019263],
      [12.710186271517477, -0.06768876660019263],
      [13.710186271517477, -0.06768876660019263],
      [14.710186271517477, -0.06768876660019263],
      [15.710186271517477, -0.06768876660019263],
      [16.71018627151748, -0.06768876660019263],
      [17.71018627151748, -0.06768876660019263],
      [18.71018627151748, -0.06768876660019263],
      [19.71018627151748, -0.06768876660019263],
      [20.71018627151748, -0.06768876660019263],
      [21.71018627151748, -0.06768876660019263],
      [22.71018627151748, -0.06768876660019263],
      [23.71018627151748, -0.06768876660019263],
      [24.71018627151748, -0.06768876660019263],
      [25.473528095413634, -0.4204569289757736],
      [25.473528095413634, 0.42045692897577347],
      [24.71018627151748, 0.06768876660019257],
      [23.71018627151748, 0.06768876660019257],
      [22.71018627151748, 0.06768876660019257],
      [21.71018627151748, 0.06768876660019257],
      [20.71018627151748, 0.06768876660019257],
      [19.71018627151748, 0.06768876660019257],
      [18.71018627151748, 0.06768876660019257],
      [17.71018627151748, 0.06768876660019257],
      [16.71018627151748, 0.06768876660019257],
      [15.710186271517477, 0.06768876660019257],
      [14.710186271517477, 0.06768876660019257],
      [13.710186271517477, 0.06768876660019257],
      [12.710186271517477, 0.06768876660019257],
      [11.710186271517477, 0.06768876660019257],
      [10.710186271517477, 0.06768876660019257],
      [9.710186271517477, 0.06768876660019257],
      [8.710186271517477, 0.06768876660019257],
      [7.710186271517477, 0.06768876660019257],
      [6.710186271517477, 0.06768876660019257],
      [5.710186271517477, 0.06768876660019257],
      [4.710186271517477, 0.06768876660019257],
      [3.710186271517477, 0.06768876660019257],
      [2.710186271517477, 0.06768876660019257],
      [1.7101862715174772, 0.06768876660019257],
    ],
  );
});

it('length 50 - stems are completely overlapping', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 2 * Math.PI / 3;
  bs5.xBottomCenter = -6;
  bs5.yBottomCenter = 0;
  bs3.angle = 2 * Math.PI / 3;
  bs3.xBottomCenter = -6;
  bs3.yBottomCenter = 0;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-8.068425955948896, -0.6173808771212634],
      [-7.559614538510189, -1.478258883277777],
      [-7.050803121071483, -2.3391368894342905],
      [-6.541991703632776, -3.200014895590804],
      [-6.03318028619407, -4.060892901747318],
      [-5.524368868755364, -4.921770907903831],
      [-5.015557451316657, -5.782648914060344],
      [-4.506746033877951, -6.643526920216857],
      [-3.9979346164392444, -7.50440492637337],
      [-3.489123199000538, -8.365282932529883],
      [-2.9803117815618316, -9.226160938686396],
      [-2.4715003641231252, -10.08703894484291],
      [-1.9626889466844188, -10.947916950999423],
      [-1.4538775292457122, -11.808794957155936],
      [-0.9450661118070056, -12.669672963312449],
      [-0.436254694368299, -13.530550969468962],
      [0.07255672307040761, -14.391428975625475],
      [0.5813681405091142, -15.252306981781988],
      [1.0901795579478208, -16.113184987938503],
      [1.5989909753865275, -16.974062994095018],
      [2.107802392825234, -17.834941000251533],
      [2.6166138102639405, -18.695819006408048],
      [3.125425227702647, -19.556697012564562],
      [3.6342366451413533, -20.417575018721077],
      [4.335531348575319, -21.038030025674445],
      [5.146446885199529, -20.56984772231441],
      [4.9597644389896525, -19.652281190124437],
      [4.468627924818168, -18.78119857380869],
      [3.977491410646683, -17.910115957492945],
      [3.486354896475198, -17.0390333411772],
      [2.995218382303713, -16.167950724861452],
      [2.504081868132228, -15.296868108545707],
      [2.012945353960743, -14.425785492229963],
      [1.5218088397892582, -13.554702875914218],
      [1.0306723256177732, -12.683620259598474],
      [0.5395358114462884, -11.81253764328273],
      [0.04839929727480352, -10.941455026966985],
      [-0.44273721689668133, -10.07037241065124],
      [-0.9338737310681662, -9.199289794335495],
      [-1.4250102452396511, -8.32820717801975],
      [-1.916146759411136, -7.457124561704005],
      [-2.407283273582621, -6.586041945388261],
      [-2.898419787754106, -5.714959329072516],
      [-3.389556301925591, -4.843876712756772],
      [-3.880692816097076, -3.972794096441027],
      [-4.371829330268561, -3.101711480125282],
      [-4.862965844440046, -2.2306288638095375],
      [-5.354102358611531, -1.3595462474937927],
      [-5.845238872783016, -0.48846363117804803],
      [-6.336375386954501, 0.38261898513769665],
    ],
  );
});

it('angle span is greater than Math.PI and first pairs are circle pairs', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 2 * Math.PI / 3;
  bs5.xBottomCenter = 1.0622998405985764;
  bs5.yBottomCenter = 3.3179618662659234;
  bs3.angle = Math.PI / 3;
  bs3.xBottomCenter = 2.937700159401424;
  bs3.yBottomCenter = 3.3179618662659234;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-0.9403608685703395, 2.6048134537661856],
      [-1.5806572063180786, 1.8396460869351845],
      [-2.0264327301454506, 0.9470405291703408],
      [-2.2534704841350655, -0.024512020957343283],
      [-2.1658434020628334, -1.020665369838682],
      [-2.0782163199906014, -2.016818718720021],
      [-1.9905892379183694, -3.0129720676013596],
      [-1.9029621558461374, -4.009125416482698],
      [-1.8153350737739053, -5.005278765364037],
      [-1.7277079917016733, -6.001432114245375],
      [-1.6400809096294413, -6.997585463126714],
      [-1.5524538275572093, -7.993738812008052],
      [-1.4648267454849773, -8.989892160889392],
      [-1.3771996634127452, -9.986045509770731],
      [-1.2895725813405132, -10.98219885865207],
      [-1.2019454992682812, -11.97835220753341],
      [-1.1143184171960492, -12.97450555641475],
      [-1.0266913351238172, -13.970658905296089],
      [-0.9390642530515851, -14.966812254177428],
      [-0.8514371709793531, -15.962965603058766],
      [-0.7638100889071211, -16.959118951940106],
      [-0.6761830068348891, -17.955272300821445],
      [-0.1883253979344217, -18.82226044878478],
      [0.5690202657899615, -19.46731939253244],
      [1.5025883256117014, -19.811011366473707],
      [2.4974116743882435, -19.81101136647371],
      [3.430979734209985, -19.467319392532445],
      [4.188325397934371, -18.82226044878479],
      [4.676183006834839, -17.955272300821456],
      [4.763810088907074, -16.959118951940116],
      [4.851437170979309, -15.962965603058777],
      [4.939064253051543, -14.966812254177437],
      [5.026691335123778, -13.970658905296098],
      [5.114318417196013, -12.974505556414758],
      [5.2019454992682475, -11.978352207533419],
      [5.289572581340482, -10.98219885865208],
      [5.377199663412717, -9.98604550977074],
      [5.4648267454849515, -8.9898921608894],
      [5.552453827557186, -7.993738812008063],
      [5.640080909629421, -6.9975854631267245],
      [5.727707991701656, -6.001432114245386],
      [5.81533507377389, -5.005278765364047],
      [5.902962155846125, -4.009125416482709],
      [5.99058923791836, -3.0129720676013703],
      [6.078216319990594, -2.0168187187200317],
      [6.165843402062829, -1.020665369838693],
      [6.253470484135064, -0.024512020957354386],
      [6.02643273014545, 0.9470405291703321],
      [5.58065720631808, 1.8396460869351783],
      [4.94036086857034, 2.604813453766182],
    ],
  );
});

it('angle span is greater than Math.PI but first pairs are not circle pairs', () => {
  let partners = [3, null, 1];
  for (let i = 0; i < 50; i++) { partners.push(null) }
  partners = partners.concat([56, null, 54]);
  let gps = new StrictLayoutGeneralProps();
  let bps = zeroStretch3(partners.length);

  let st = new Stem(0, partners, gps, bps);
  let it = st.loopIterator();
  it.next();
  let bs5 = it.next().value;
  let ur = it.next().value;
  let bs3 = it.next().value;

  bs5.angle = 5 * Math.PI / 9;
  bs5.xBottomCenter = 1.0622998405985764;
  bs5.yBottomCenter = 3.3179618662659234;
  bs3.angle = 4 * Math.PI / 9;
  bs3.xBottomCenter = 2.937700159401424;
  bs3.yBottomCenter = 3.3179618662659234;

  checkCoords(
    baseCoordinatesTriangularRound(ur, gps),
    [
      [-1.0629631256732823, 3.325055600457574],
      [-1.9785533307914225, 2.9242843734620987],
      [-2.842757953959296, 2.422215285197332],
      [-3.644415235161797, 1.8253328817117218],
      [-4.373171253640729, 1.1413462841628554],
      [-5.019613655458425, 0.3790896205462557],
      [-5.575393220118668, -0.4515920727646119],
      [-6.033331696133637, -1.3399700060119604],
      [-6.387514512770969, -2.2745702052921595],
      [-6.633367170548943, -3.243321706328028],
      [-6.767714323847289, -4.233712458756771],
      [-6.788820792543583, -5.23295092732917],
      [-6.696413972983506, -6.22813130283631],
      [-6.491687358832839, -7.206400188958192],
      [-6.177285126337108, -8.155122612166076],
      [-5.757267983080204, -9.06204521055364],
      [-5.23706072132727, -9.915454493907914],
      [-4.623382153334273, -10.704328130989168],
      [-3.9241583335548933, -11.418477310046931],
      [-3.148420188535918, -12.04867833389429],
      [-2.3061868766770406, -12.586791749905235],
      [-1.4083363843389844, -13.025867476294263],
      [-0.4664650296346844, -13.36023456690461],
      [0.5072623114973636, -13.58557445513493],
      [1.500269322510712, -13.698976731011903],
      [2.499730677489353, -13.6989767310119],
      [3.492737688502701, -13.585574455134918],
      [4.4664650296347475, -13.360234566904591],
      [5.408336384339044, -13.025867476294236],
      [6.3061868766770965, -12.5867917499052],
      [7.148420188535971, -12.048678333894252],
      [7.924158333554941, -11.418477310046885],
      [8.623382153334315, -10.704328130989119],
      [9.237060721327307, -9.915454493907859],
      [9.757267983080233, -9.062045210553581],
      [10.177285126337132, -8.155122612166014],
      [10.491687358832856, -7.206400188958126],
      [10.696413972983514, -6.228131302836244],
      [10.788820792543582, -5.232950927329103],
      [10.767714323847283, -4.233712458756704],
      [10.63336717054893, -3.243321706327962],
      [10.387514512770945, -2.2745702052920955],
      [10.033331696133608, -1.3399700060118986],
      [9.575393220118633, -0.45159207276455415],
      [9.019613655458382, 0.379089620546309],
      [8.373171253640681, 1.1413462841629034],
      [7.644415235161743, 1.8253328817117653],
      [6.8427579539592385, 2.4222152851973693],
      [5.97855333079136, 2.924284373462129],
      [5.062963125673216, 3.3250556004575973],
    ],
  );
});

/*
let coords = baseCoordinatesTriangularRound(ur, gps);
let xs = '';
let ys = '';
xs += ur.baseCoordinatesBounding5().xCenter + '\n';
ys += ur.baseCoordinatesBounding5().yCenter + '\n';
coords.forEach(vbc => {
  xs += vbc.xCenter + '\n';
  ys += vbc.yCenter + '\n';
});
xs += ur.baseCoordinatesBounding3().xCenter + '\n';
ys += ur.baseCoordinatesBounding3().yCenter + '\n';
console.log(xs);
console.log(ys);
let s = '';
coords.forEach(vbc => {
  s += '[';
  s += vbc.xCenter + ', ';
  s += vbc.yCenter + '],\n';
});
console.log(s);
*/
