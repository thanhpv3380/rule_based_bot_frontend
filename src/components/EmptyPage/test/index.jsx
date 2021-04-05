import { Divider, makeStyles, Paper } from '@material-ui/core';
import {
  // ActionRequest,
  // AudioActionResponse,
  ChatController,
  // FileActionResponse,
  MuiChat,
} from 'chat-ui-react';
import React from 'react';
import apis from '../../../apis';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 470,
    width: 390,
    backgroundColor: 'gray',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 454,
    width: 376,
    backgroundColor: theme.palette.background.default,
  },
  header: {
    padding: theme.spacing(1),
  },
  chat: {
    flex: '1 1 0%',
    minHeight: 0,
  },
}));

// function GoodInput({ chatController, actionRequest }) {
//   const chatCtl = chatController;

//   const setResponse = React.useCallback(() => {
//     const res = { type: 'custom', value: 'Good!' };
//     chatCtl.setActionResponse(actionRequest, res);
//   }, [actionRequest, chatCtl]);

//   return (
//     <div>
//       <Button
//         type="button"
//         onClick={setResponse}
//         variant="contained"
//         color="primary"
//       >
//         Good!
//       </Button>
//     </div>
//   );
// }

async function echo(chatCtl) {
  const text = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: 'Please enter something',
    response: {
      type: 'text',
    },
  });

  const data = await apis.chatbot.sendMessage(text.value);
  const { result } = data;
  if (result) {
    result.map(async (el) => {
      if (el.message.attachment) {
        switch (el.message.attachment.type) {
          // case "IMAGE":
          case 'OPTION':
            // eslint-disable-next-line no-case-declarations
            const sel = await chatCtl.setActionRequest({
              type: 'select',
              options: el.attachment.payload.elements.map((item) => {
                return { value: item.value, text: item.name };
              }),
            });
            break;
          default:
            break;
        }
      } else {
        chatCtl.addMessage({
          type: 'text',
          content: el.message.text,
          self: false,
        });
      }
    });
  }
  echo(chatCtl);
}

export function App() {
  const classes = useStyles();
  const [chatCtl] = React.useState(new ChatController());

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);

  return (
    <Paper elevation={5} className={classes.root}>
      <div className={classes.container}>
        <Divider />
        <div className={classes.chat}>
          <MuiChat chatController={chatCtl} />
        </div>
      </div>
    </Paper>
  );
}
