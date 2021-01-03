import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledApp from './index.style';

function App() {
  const { t } = useTranslation();
  return <StyledApp>home</StyledApp>;
}

export default App;
