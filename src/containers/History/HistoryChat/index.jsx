import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ChatController, MuiChat } from 'chat-ui-react';
import { Box, Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './index.style';

const HistoryChat = () => {
  const [chatCtl] = useState(new ChatController());
  const { sessionId } = useParams();
  const classes = useStyles();
  useMemo(async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    await Promise.all(
      arr.map(async () => {
        const data = await chatCtl.addMessage({
          type: 'text',
          content: `Hello, What's your name.`,
          self: true,
        });
        return data;
      }),
    );

    await chatCtl.addMessage({
      type: 'text',
      content: `Hello, I am ttt`,
      self: false,
    });
  }, [chatCtl]);

  return (
    <>
      <Typography
        variant="h5"
        style={{
          margin: '20px 0',
        }}
      >
        SessionId: {sessionId}
      </Typography>

      <MuiChat chatController={chatCtl} />
    </>
  );
};

export default HistoryChat;
