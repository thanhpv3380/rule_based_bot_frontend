import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import {
  Action,
  DragCanvasState,
  InputType,
  StateMachine,
} from '@projectstorm/react-canvas-core';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
  InputBase,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import { IntentIcon } from '../../icon';
import useStyle from './intentNodeWidget.style';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IntentNodeModel } from './';
import * as _ from 'lodash';
import IntentNodeDetail from './NodeDetail';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import apis from '../../../../../apis';
import { Intent, IntentsResponse, DataResponse } from './intentNodeWidget.type';
import { BaseNodeModel } from '../BaseNodeModel';
import { useConfirm } from 'material-ui-confirm';
import { ConditionNodeModel } from '../ConditionNode';

export interface IntentNodeWidgetProps {
  node: IntentNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface IntentNodeWidgetState {
  isHover: boolean;
}

const IntentNodeWidget = (props: IntentNodeWidgetProps) => {
  const { node, engine } = props;
  const { workflowId } = useParams();
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel] = useState<Action>(
    engine.getActionEventBus().getActionsForType(InputType.MOUSE_WHEEL)[0],
  );
  const [intent, setIntent] = useState<IntentsResponse>();
  const [intentEditId, setIntentEditId] = useState<any>();
  const [intents, setIntents] = useState<IntentsResponse[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [openAutocomplete, setOpenAutocomplete] = useState<boolean>(false);

  const fetchIntents = async () => {
    const data: DataResponse = await apis.intent.getIntents();
    if (data && data.status) {
      setIntents(data.result);
      if (node.itemId) {
        setIntent(data.result.find((el) => el.id === node.itemId));
      }
    }
  };

  useEffect(() => {
    fetchIntents();
  }, []);

  const handleOpenEdit = () => {
    setIntentEditId(intent?.id);
    setOpenEdit(true);

    // engine.getActionEventBus().deregisterAction(actionMove);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleOpenAdd = () => {
    setIntentEditId(null);
    setOpenEdit(true);

    // engine.getActionEventBus().deregisterAction(actionMove);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setIsHover(false);
    // engine.getActionEventBus().registerAction(actionMove);
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleDeleteNode = async () => {
    confirm({
      description: `Are you sure you want to delete ${node.id}?`,
    }).then(async () => {
      const status = await node.delete(engine, workflowId);
      if (status) {
        enqueueSnackbar('Delete node success', { variant: 'success' });
      } else {
        enqueueSnackbar('Delete node failed', { variant: 'error' });
      }
    });
  };

  const handleDuplicateNode = () => {
    const selectedEntities = engine
      .getModel()
      .getSelectedEntities()[0] as IntentNodeModel;

    let newNode = new IntentNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    engine.getModel().addNode(newNode);
    engine.repaintCanvas();
  };
  let listNode = [];
  let check = false;
  const handleOpenAutocomplete = () => {
    // =================== T E S T ===============================
    const getConditionParent = (tempNode) => {
      const links = tempNode.getArrayLinkByPortType('out');
      Object.keys(links).forEach((el: string) => {
        if (check) {
          return;
        }
        const nodeEle: any = links[el].getTargetPort().getParent();

        if (listNode.indexOf(nodeEle.id) <= 0) {
          listNode.push(nodeEle.id);
          if (nodeEle instanceof ConditionNodeModel) {
            if (nodeEle.itemId) {
              console.log(nodeEle.nodeInfo);

              nodeEle.nodeInfo.conditions.forEach((el) => {
                if (el.intent === node.itemId) {
                  check = true;
                  enqueueSnackbar(
                    'Không thể thay đổi intent khi các tham số đang được dùng ở các điều kiện bên dưới',
                    { variant: 'error' },
                  );
                  return;
                }
              });
            }
          }
          getConditionParent(nodeEle);
        }
      });
    };
    getConditionParent(node);
    if (check) {
      return;
    }
    setOpenAutocomplete(true);
    //==========================================
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseAutocomplete = () => {
    setOpenAutocomplete(false);
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleMouseEnterItem = (e: any) => {
    // e.target.style.border = '2px solid #88beee';
  };
  const handleMouseLeaveItem = (e: any) => {
    // e.target.style.border = '2px solid rgb(224 224 224)';
  };

  const handleCreateItem = (data) => {
    setIntentEditId(data.id);
    setIntent(data);
    node.itemId = (data && data.id) || null;
    node.nodeInfo = data;
    setIntents([{ ...data }, ...intents]);
  };
  return (
    <Box onMouseLeave={() => setIsHover(false)} className={classes.container}>
      {isHover ? (
        <Box className={classes.iconMenu}>
          <AddIcon
            fontSize="small"
            className={classes.iconMenuItem}
            onClick={handleOpenAdd}
          />
          <EditIcon
            fontSize="small"
            className={classes.iconMenuItem}
            onClick={handleOpenEdit}
          />
          <DeleteOutlineIcon
            fontSize="small"
            onClick={() => handleDeleteNode()}
            className={classes.iconMenuItem}
          />
          <FileCopyIcon
            onClick={() => handleDuplicateNode()}
            className={classes.fileCopyIcon}
          />
          {/* <MoreVertIcon fontSize="small" className={classes.iconMenuItem} /> */}
        </Box>
      ) : (
        <Box className={classes.noneIconMenu} />
      )}

      <Paper
        elevation={2}
        onMouseOver={() => setIsHover(true)}
        className={classes.root}
      >
        <PortWidget
          engine={props.engine}
          port={props.node.getPort('in')}
        ></PortWidget>
        <Box className={classes.grid}>
          <IntentIcon
            backgroundColor="#e8f8ff"
            className={classes.iconHeader}
          />
          <Typography variant="h6">Intent</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-left')}
          >
            <div className="circle-port" />
          </PortWidget>
          {!isFocus ? (
            <Box
              m={2}
              onMouseLeave={() => setIsFocus(false)}
              onMouseDown={() => setIsFocus(true)}
              className={classes.unfocusBody}
            >
              {intent ? (
                <Typography>{intent.name}</Typography>
              ) : (
                <Typography style={{ color: 'rgba(138, 138, 138, 0.87)' }}>
                  Select intent
                </Typography>
              )}
            </Box>
          ) : (
            <Box
              m={2}
              onBlur={() => setIsFocus(false)}
              onMouseDown={() => setIsFocus(true)}
              className={classes.focusBody}
            >
              <Autocomplete
                className={classes.autoComplete}
                size="small"
                value={intent || null}
                options={intents}
                onChange={(
                  e: React.ChangeEvent<{}>,
                  value: any,
                  reason: string,
                ) => {
                  node.itemId = (value && value.id) || null;
                  node.nodeInfo = value;
                  setIntent(value);
                }}
                open={openAutocomplete}
                onOpen={handleOpenAutocomplete}
                onClose={handleCloseAutocomplete}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.textField}
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    placeholder="Select intent"
                  />
                )}
              />
            </Box>
          )}
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-right')}
          >
            <div className="circle-port" />
          </PortWidget>
        </Box>
        <Grid container alignItems="center" justify="center">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-bottom')}
          >
            <div className="circle-port" />
          </PortWidget>
        </Grid>
      </Paper>

      <IntentNodeDetail
        open={openEdit}
        handleCloseEdit={handleCloseEdit}
        intentId={intentEditId}
        handleCreateItem={handleCreateItem}
      />
    </Box>
  );
};

export default IntentNodeWidget;
