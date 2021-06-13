import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import useStyles from './index.style';
import { App } from './test';

const EmptyPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const classes = useStyles();
  const match = useRouteMatch();
  const title = match.path.split('/').pop();
  const [openChat, setOpenChat] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenChat(true);
  };
  const handleClose = () => {
    setOpenChat(false);
    setAnchorEl(null);
  };
  return (
    <div className={classes.root} style={{ position: 'static' }}>
      You have not choose any {title}
      {/* <Fab
        color="primary"
        style={{
          borderRadius: '50%',
          position: 'fixed',
          top: '85%',
          left: '94%',
          width: 56,
          height: 56,
        }}
      >
        {openChat ? (
          <CloseIcon onClick={handleClose} />
        ) : (
          <ChatIcon onClick={handleOpen} />
        )}
      </Fab>
      <Popover
        elevation={10}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{
          top: '39%',
          left: '72.5%',
          height: '100%',
          position: 'fixed',
          borderRadius: 20,
        }}
      >
        {' '}
        <App />{' '}
      </Popover> */}
    </div>
  );
};

export default EmptyPage;
