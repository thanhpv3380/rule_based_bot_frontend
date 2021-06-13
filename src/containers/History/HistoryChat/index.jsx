import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { Typography, Paper, Box, AppBar, Toolbar } from '@material-ui/core';
import useStyles from './index.style';
import apis from '../../../apis';
import Loading from '../../../components/Loading';
import EmptyListItem from '../../../components/EmptyListItem';

const HistoryChat = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchConversationById = async () => {
    const data = await apis.conversation.getConversationById(conversationId);
    if (data && data.status) {
      setConversation(data.result.conversation);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
      setConversation();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (conversationId) {
      setIsLoading(true);
      fetchConversationById();
    }
  }, [conversationId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!conversation) {
    return <EmptyListItem />;
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.appBarTitle} variant="h6" noWrap>
            SessionId: {conversation && conversation.sessionId}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.listMessage}>
        {Array.isArray(conversation.messages) &&
        conversation.messages.length <= 0 ? (
          <EmptyListItem />
        ) : (
          conversation.messages.map((el) => {
            if (el.from === 'BOT') {
              return (
                <Box
                  className={clsx(classes.messageBox, classes.messageBoxRight)}
                >
                  <Typography
                    className={clsx(classes.message, classes.messageRight)}
                  >
                    {!el.message.attachment ? el.message.text : '[MEDIA]'}
                  </Typography>
                </Box>
              );
            }
            return (
              <Box className={clsx(classes.messageBox, classes.messageBoxLeft)}>
                <Typography
                  className={clsx(classes.message, classes.messageLeft)}
                >
                  {!el.message.attachment ? el.message.text : '[MEDIA]'}
                </Typography>
              </Box>
            );
          })
        )}
      </Paper>
    </>
  );
};

export default HistoryChat;
