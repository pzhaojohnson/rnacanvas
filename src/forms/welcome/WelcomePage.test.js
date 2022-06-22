import { App } from 'App';
import * as SVG from 'Draw/svg/NodeSVG';

import * as React from 'react';

import { WelcomePage } from './WelcomePage';

it('renders', () => {
  let app = new App({ SVG });
  app.formContainer.renderForm(() => <WelcomePage app={app} />);
});
