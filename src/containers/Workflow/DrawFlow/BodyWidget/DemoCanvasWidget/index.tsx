import * as React from 'react';
import { Global } from '@emotion/react';
import { Expand, Container } from './index.style';

export interface DemoCanvasWidgetProps {
  children?: any;
  color?: string;
  background?: string;
}

const DemoCanvasWidget = (props: DemoCanvasWidgetProps) => {
  const { background, color, children } = props;
  return (
    <>
      <Global styles={Expand} />
      <Container
        background={background || 'rgb(60, 60, 60)'}
        color={color || 'rgba(255,255,255, 0.05)'}
      >
        {children}
      </Container>
    </>
  );
};

export default DemoCanvasWidget;
