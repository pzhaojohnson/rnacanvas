type CircleAttributes = {
  cx: string;
  cy: string;
};

const circleAttributeNames = ['cx', 'cy'] as const;

function createPeripheralCircle(attrs: CircleAttributes) {
  let circle = (
    document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  );

  circle.setAttribute('r', '15');
  circle.setAttribute('fill', 'rgb(12, 7, 45)');
  circle.setAttribute('stroke-width', '0');

  circleAttributeNames.forEach(name => {
    let value = attrs[name];
    circle.setAttribute(name, value);
  });

  return circle;
}

function createCentralCircle(attrs: CircleAttributes) {
  let circle = (
    document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  );

  circle.setAttribute('r', '12');
  circle.setAttribute('fill', 'rgb(119, 110, 187)');
  circle.setAttribute('stroke-width', '0');

  circleAttributeNames.forEach(name => {
    let value = attrs[name];
    circle.setAttribute(name, value);
  });

  return circle;
}

type LineAttributes = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

const lineAttributeNames = ['x1', 'y1', 'x2', 'y2'] as const;

function createLine(attrs: LineAttributes) {
  let line = (
    document.createElementNS('http://www.w3.org/2000/svg', 'line')
  );

  line.setAttribute('stroke', 'rgb(119, 110, 187)');
  line.setAttribute('stroke-width', '9');

  lineAttributeNames.forEach(name => {
    let value = attrs[name];
    line.setAttribute(name, value);
  });

  return line;
}

export function createAppLogo() {
  let appLogo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  appLogo.setAttribute('version', '1.1');

  appLogo.setAttribute('width', '104px');
  appLogo.setAttribute('height', '104px');

  appLogo.setAttribute('viewBox', '0 0 192 192');

  let children = [
    createLine({ x1: '16', y1: '96', x2: '96', y2: '96'}),
    createLine({ x1: '96', y1: '96', x2: '176', y2: '96'}),
    createLine({ x1: '96', y1: '96', x2: '96', y2: '176'}),
    createLine({ x1: '96', y1: '16', x2: '96', y2: '96'}),
    createLine({ x1: '39.4', y1: '39.4', x2: '96', y2: '96'}),
    createLine({ x1: '152.6', y1: '39.4', x2: '96', y2: '96'}),
    createCentralCircle({ cx: '96', cy: '96' }),
    createPeripheralCircle({ cx: '16', cy: '96' }),
    createPeripheralCircle({ cx: '96', cy: '16' }),
    createPeripheralCircle({ cx: '39.4', cy: '39.4' }),
    createPeripheralCircle({ cx: '152.6', cy: '39.4' }),
    createPeripheralCircle({ cx: '176', cy: '96' }),
    createPeripheralCircle({ cx: '96', cy: '176' }),
  ];

  children.forEach(child => {
    appLogo.appendChild(child);
  });

  return appLogo;
}
