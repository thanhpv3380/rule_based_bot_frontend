import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ChatController, MuiChat } from 'chat-ui-react';
import { Typography } from '@material-ui/core';
import useStyles from './index.style';
import apis from '../../../apis';

const HistoryChat = () => {
  const classes = useStyles();
  const { conversationId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [chatCtl] = useState(new ChatController());
  const [conversation, setConversation] = useState();

  const fetchConversationById = async () => {
    const data = await apis.conversation.getConversationById(conversationId);
    if (data && data.status) {
      setConversation(data.result.conversation);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchConversationById();
  }, []);

  useMemo(async () => {
    await Promise.all(
      conversation &&
        Array.isArray(conversation.messages) &&
        conversation.messages.map(async (el) => {
          const data = await chatCtl.addMessage({
            type: 'text',
            content: !el.message.attachment ? el.message.text : '[MEDIA]',
            self: el.from === 'BOT',
          });
          return data;
        }),
    );
  }, [chatCtl]);

  return (
    <>
      <Typography
        variant="h5"
        style={{
          margin: '20px 0',
        }}
      >
        SessionId: {conversation.sessionId}
      </Typography>

      <MuiChat chatController={chatCtl} />
    </>
  );
};

export default HistoryChat;
