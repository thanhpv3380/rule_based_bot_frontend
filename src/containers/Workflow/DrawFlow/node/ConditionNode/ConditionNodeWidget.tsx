import * as React from 'react';
import { useState } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import {
  CanvasWidget,
  Action,
  ActionEvent,
  InputType,
} from '@projectstorm/react-canvas-core';
import {
  Button,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MoreVert as MoreVertIcon,
  Edit as Editcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
  Close as CloseIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { ConditionNodeModel } from './ConditionNodeModel';
import * as _ from 'lodash';
import ConditionNodeDetail from './NodeDetail';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

const useStyle = makeStyles({
  table: {
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  paddingMenu: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  portout: {
    position: 'relative',
    left: 135,
  },
});

interface Condition {
  openMenuConnectCondition: any;
  openMenuOperator: any;
}

const rows: Condition[] = [
  {
    openMenuConnectCondition: null,
    openMenuOperator: null,
  },
  {
    openMenuConnectCondition: null,
    openMenuOperator: null,
  },
];

interface CustomDeleteItemsActionOptions {
  keyCodes?: number[];
}
export class CustomDeleteItemsAction extends Action {
  constructor(options: CustomDeleteItemsActionOptions = {}) {
    options = {
      keyCodes: [46, 8],
      ...options,
    };
    super({
      type: InputType.KEY_DOWN,
      fire: (event: ActionEvent<React.KeyboardEvent>) => {
        console.log(event.event.keyCode);

        if (options.keyCodes.indexOf(event.event.keyCode) >= 0) {
          console.log('dosomething');
          // this.engine.repaintCanvas();
        }
      },
    });
  }
}

export interface ConditionNodeWidgetProps {
  node: ConditionNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface ConditionNodeWidgetState {
  isHover: Boolean;
  open: boolean;
}

const ConditionNodeWidget = (props: ConditionNodeWidgetProps) => {
  const classes = useStyle();
  const [conditions, setConditions] = useState<Condition[]>(rows);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenMenuOperator = (e, index) => {
    const newConditions = [...conditions];
    newConditions[index].openMenuOperator = e.currentTarget;
    setConditions(newConditions);
  };

  const handleCloseMenuOperator = (e, index) => {
    const newConditions = [...conditions];
    console.log(newConditions[index]);

    newConditions[index].openMenuOperator = null;
    console.log(newConditions[index]);
    setConditions(newConditions);
    console.log(conditions);
  };

  const handleCloseMenuConnectCondition = (e, index) => {
    console.log('test');

    const newConditions = [...conditions];
    // console.log(newConditions[index]);

    newConditions[index].openMenuConnectCondition = null;
    // console.log(newConditions[index]);
    setConditions(newConditions);
  };

  const handleOpenMenuConnectCondition = (e, index) => {
    const newConditions = [...conditions];
    newConditions[index].openMenuConnectCondition = e.currentTarget;
    setConditions(newConditions);
  };

  const handleDeleteNode = (engine) => {
    const selectedEntities = engine.getModel().getSelectedEntities();
    if (selectedEntities.length > 0) {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        _.forEach(selectedEntities, (model) => {
          // only delete items which are not locked
          if (!model.isLocked()) {
            model.remove();
          }
        });
        engine.repaintCanvas();
      }
    }
  };

  const handleDuplicateNode = (engine) => {
    console.log('duplidacate');

    const selectedEntities = props.engine
      .getModel()
      .getSelectedEntities()[0] as ConditionNodeModel;

    const newNode = new ConditionNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    props.engine.getModel().addNode(newNode);
    // engine.getModel().addNode(newNode);
    props.engine.repaintCanvas();
  };

  return (
    <Box
      style={{ width: 280, borderRadius: 10 }}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover ? (
        <Paper style={{ width: 100, height: 24, marginBottom: 5 }}>
          <Box style={{ marginLeft: 4 }}>
            <Editcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(true);
              }}
            />
            <DeleteOutlineIcon
              onClick={() => handleDeleteNode(props.engine)}
              style={{ cursor: 'pointer' }}
            />
            <FileCopyIcon onClick={() => handleDuplicateNode(props.engine)} />
            <MoreVertIcon style={{ cursor: 'pointer' }} />
          </Box>
        </Paper>
      ) : (
        <div style={{ width: 100, height: 24, marginBottom: 5 }} />
      )}

      <Paper
        elevation={5}
        style={{ borderRadius: 10, backgroundColor: '#ffff' }}
      >
        {/*  */}
        <Box display="flex" alignItems="center" flexDirection="column">
          <PortWidget engine={props.engine} port={props.node.getPort('in')} />
          <Grid container justify="center" style={{ paddingTop: 10 }}>
            <DeviceHubSharpIcon
              style={{ position: 'relative', marginRight: 5, bottom: 4 }}
            />
            <Typography>Condition</Typography>
          </Grid>

          <Box>
            <TableContainer
              component={Paper}
              elevation={0}
              style={{
                width: 280,
                borderLeft: 'none',
                borderRadius: 10,
                paddingBottom: 2,
              }}
            >
              <Table>
                <TableBody>
                  {conditions &&
                    conditions.map((condition, index) => (
                      <TableRow>
                        <TableCell
                          style={{ borderBottom: 'none' }}
                          component="th"
                          scope="row"
                        >
                          {'@number'}
                        </TableCell>
                        <TableCell
                          style={{ borderBottom: 'none' }}
                          align="left"
                        >
                          {'>'}
                        </TableCell>
                        <TableCell
                          style={{ borderBottom: 'none' }}
                          align="left"
                        >
                          {'2'}
                        </TableCell>
                        <TableCell
                          style={{ borderBottom: 'none' }}
                          align="left"
                        >
                          {'and'}
                        </TableCell>
                      </TableRow>
                    ))}
                  {!rows && (
                    <TableRow>
                      <Button fullWidth>Thêm tham số</Button>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container alignItems="center" justify="center">
              <PortWidget
                engine={props.engine}
                port={props.node.getPort('out')}
              >
                <div className="circle-port" />
              </PortWidget>
            </Grid>
          </Box>
        </Box>
      </Paper>

      <ConditionNodeDetail
        open={open}
        conditions={conditions}
        handleOpenMenuOperator={handleOpenMenuOperator}
        handleCloseMenuOperator={handleCloseMenuOperator}
        handleCloseMenuConnectCondition={handleCloseMenuConnectCondition}
        handleOpenMenuConnectCondition={handleOpenMenuConnectCondition}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default ConditionNodeWidget;
