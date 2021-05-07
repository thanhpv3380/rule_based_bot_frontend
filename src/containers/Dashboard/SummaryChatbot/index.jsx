import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
  Tooltip,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Info as InfoIcon } from '@material-ui/icons';
import Highcharts from 'highcharts';

import useStyles from './index.style';

const analysts = [
  {
    heading: 'Total request',
    description: 'Total request',
    color: '#4991e2',
    key: '',
  },
  {
    heading: 'Answered',
    description: 'Bot answer action',
    color: '#48bb78',
    key: '',
  },
  {
    heading: 'Not understand',
    description: 'Bot predict default intent',
    color: '#f16a73',
    key: '',
  },
  {
    heading: 'Need confirm',
    description: 'Bot confirm action',
    color: '#f6a61f',
    key: '',
  },
];

const btnList = [
  {
    heading: 'TODAY',
    value: 'TODAY',
  },
  {
    heading: 'WEEK',
    value: 'WEEK',
  },
  {
    heading: 'MONTH',
    value: 'MONTH',
  },
];
const SummaryChatbot = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [dateSelected, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [series, setSeries] = useState([
    {
      name: 'Gases',
      data: [
        {
          name: 'Argon',
          y: 0.9,
          color: '#3498db',
        },
        {
          name: 'Nitrogen',
          y: 78.1,
          color: '#9b59b6',
        },
        {
          name: 'Oxygen',
          y: 20.9,
          color: '#2ecc71',
        },
        {
          name: 'Trace Gases',
          y: 0.1,
          color: '#f1c40f',
        },
      ],
    },
  ]);
  const [typeDateSelected, setTypeDateSelected] = useState('TODAY');

  const highChartsRender = () => {
    Highcharts.chart({
      chart: {
        type: 'line',
        renderTo: 'graph-summary-chatbot',
      },
      title: {
        text: 'Effective',
      },
      xAxis: {
        title: {
          text: 'Day',
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yAxis: {
        title: {
          text: 'Total request',
        },
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        borderWidth: 0,
        itemDistance: 30,
        margin: 5,
      },
      series: [
        {
          name: 'Total request',
          data: [900, 850, 990, 1200, 780, 930, 1700],
          color: '#4991e2',
        },
        {
          name: 'Answered',
          data: [300, 400, 200, 250, 540, 120, 800],
          color: '#48bb78',
        },
        {
          name: 'Not understand',
          data: [200, 100, 300, 450, 140, 200, 520],
          color: '#f16a73',
        },
        {
          name: 'Need confirm',
          data: [100, 100, 100, 150, 140, 20, 500],
          color: '#f6a61f',
        },
      ],
    });
  };

  useEffect(() => {
    highChartsRender();
  }, []);
  return (
    <>
      <Box className={classes.heading} mt={2} mb={2}>
        <Typography variant="h6" gutterBottom>
          SUMMARY OF CHATBOT EFFICIENCY
        </Typography>
        <Box>
          {btnList.map((el) => (
            <Button
              variant={typeDateSelected === el.value ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => {
                setTypeDateSelected(el.value);
              }}
              className={classes.btn}
            >
              {el.heading}
            </Button>
          ))}

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={dateSelected.startDate}
            onChange={(date) => {
              setDateSelected({
                ...dateSelected,
                startDate: date,
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={dateSelected.endDate}
            onChange={(date) => {
              setDateSelected({
                ...dateSelected,
                endDate: date,
              });
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          </MuiPickersUtilsProvider> */}
        </Box>
      </Box>
      <Divider />
      <Box mt={2}>
        <Grid container spacing={3}>
          {analysts.map((el) => (
            <Grid item xs={3}>
              <Paper
                className={classes.paper}
                elevation={2}
                style={{ borderColor: el.color }}
              >
                <Box className={classes.headingPaper}>
                  <Box mr={0.5}>
                    <Typography variant="h5" gutterBottom>
                      {el.heading}
                    </Typography>
                  </Box>
                  <Tooltip title={el.description}>
                    <InfoIcon />
                  </Tooltip>
                </Box>
                <Box mb={1}>
                  <Typography variant="h3" className={classes.fontBold}>
                    0
                  </Typography>
                </Box>
                <Divider />
                <Box mt={1}>
                  <Typography variant="h5">100%</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={2}>
        <div id="graph-summary-chatbot" />
      </Box>
    </>
  );
};

export default SummaryChatbot;
