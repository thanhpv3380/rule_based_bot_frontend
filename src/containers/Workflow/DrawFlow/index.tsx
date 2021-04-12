import * as React from 'react';

import BodyWidget from './BodyWidget/index';
import { Application } from './Application';

const DrawFlow = () => {
  return <BodyWidget app={new Application()} />;
};

export default DrawFlow;
