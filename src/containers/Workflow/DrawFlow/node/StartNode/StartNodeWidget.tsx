import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import { makeStyles } from '@material-ui/styles';
import { StartNodeModel } from '.';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

const useStyle = makeStyles({
  root: {
    width: 66,
    height: 66,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '2px solid',
    display: 'flex',
    flexDirection: 'column',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
  },
  port: {
    position: 'relative',
    top: 10,
  },
});

export interface StartNodeWidgetProps {
  node: StartNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface StartNodeWidgetState {}

const StartNodeWidget = (props: StartNodeWidgetProps) => {
  const { node, engine } = props;
  const classes = useStyle();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Start</Typography>
      <PortWidget engine={engine} port={node.getPort('out-bottom')}>
        <div className={`circle-port ${classes.port}`} />
      </PortWidget>
    </Paper>
  );
};

export default StartNodeWidget;
