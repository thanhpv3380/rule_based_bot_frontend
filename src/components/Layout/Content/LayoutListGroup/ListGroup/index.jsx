import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
} from '@material-ui/icons';
import useStyles from './index.style';

const ListGroup = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <Link to="/bot/123/actions/123">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ListGroup;
