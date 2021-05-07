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
import Highcharts from 'highcharts';
import useStyles from './index.style';

const analysts = [
  {
    heading: 'Intent',
    description: 'Intent',
    color: '#f6a61f',
    key: '',
  },
  {
    heading: 'Action',
    description: 'Action',
    color: '#f16a73',
    key: '',
  },
  {
    heading: 'Workflow',
    description: 'Workflow',
    color: '#4991e2',
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
const SummaryWorkingData = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [dateSelected, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [typeDateSelected, setTypeDateSelected] = useState('TODAY');

  const highChartsRender = () => {
    Highcharts.chart({
      chart: {
        type: 'column',
        renderTo: 'graph-summary-working-data',
      },
      title: {
        text: 'Statistic Data',
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
          text: 'Total data',
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
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Intent',
          data: [900, 850, 990, 1200, 780, 930, 1700],
          color: '#f6a61f',
        },
        {
          name: 'Action',
          data: [300, 400, 200, 250, 540, 120, 800],
          color: '#f16a73',
        },
        {
          name: 'Workflow',
          data: [200, 100, 300, 450, 140, 200, 520],
          color: '#4991e2',
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
          STATISTIC WORKING DATA
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
            <Grid item xs={4}>
              <Paper
                className={classes.paper}
                elevation={2}
                style={{ borderColor: el.color }}
              >
                <Box mr={0.5}>
                  <Typography variant="h5" gutterBottom>
                    {el.heading}
                  </Typography>
                </Box>
                <Box mb={1} className={classes.totalBox}>
                  {/* <Box mr={1.5}>
                    <Typography variant="subtitle1">Total</Typography>
                  </Box> */}

                  <Typography variant="h3" className={classes.fontBold}>
                    0
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={2} className={classes.graph}>
        <div id="graph-summary-working-data" />
      </Box>
    </>
  );
};

export default SummaryWorkingData;