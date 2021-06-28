import React from 'react';
import { Box } from '@material-ui/core';

import 'date-fns';
import useStyles from './index.style';
import SummaryWorkingData from './SummaryWorkingData';
import SummaryChatbot from './SummaryChatbot';

const Dashboard = () => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <SummaryChatbot />
      </Box>
      <Box mt={5}>
        <SummaryWorkingData />
      </Box>
    </>
  );
};

export default Dashboard;
