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
import {
  format,
  // formatDistance,
  // formatRelative,
  subDays,
} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Info as InfoIcon } from '@material-ui/icons';
import Highcharts from 'highcharts';
import apis from '../../../apis';

import useStyles from './index.style';

const dataHightChar = {
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
    categories: [`${format(new Date(), 'đ-mm-yyyy')}`],
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
      data: [0],
      color: '#4991e2',
    },
    {
      name: 'Answered',
      data: [0],
      color: '#48bb78',
    },
    {
      name: 'Not understand',
      data: [0],
      color: '#f16a73',
    },
    {
      name: 'Need confirm',
      data: [0],
      color: '#f6a61f',
    },
  ],
};

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
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
  });
  const [analysts, setAnalysts] = useState();
  // const [series, setSeries] = useState([
  //   {
  //     name: 'Gases',
  //     data: [
  //       {
  //         name: 'Argon',
  //         y: 0.9,
  //         color: '#3498db',
  //       },
  //       {
  //         name: 'Nitrogen',
  //         y: 78.1,
  //         color: '#9b59b6',
  //       },
  //       {
  //         name: 'Oxygen',
  //         y: 20.9,
  //         color: '#2ecc71',
  //       },
  //       {
  //         name: 'Trace Gases',
  //         y: 0.1,
  //         color: '#f1c40f',
  //       },
  //     ],
  //   },
  // ]);
  const [typeDateSelected, setTypeDateSelected] = useState('TODAY');
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const bindDataAnalysts = (statistics) => {
    const {
      totalUsersay,
      defaultUsersay,
      answeredUsersay,
      notUnderstandUsersay,
      needConfirmUsersay,
      percent,
    } = statistics;
    const dataAnalysts = [
      {
        heading: 'Total request',
        description: 'Total request',
        color: '#4991e2',
        key: '',
        numberRequest: totalUsersay,
        percent: Number(100).toFixed(2),
      },
      {
        heading: 'Answered',
        description: 'Bot answer action',
        color: '#48bb78',
        key: '',
        numberRequest: answeredUsersay,
        percent: Number(percent.answeredUsersay * 100).toFixed(2),
      },
      {
        heading: 'Not understand',
        description: 'Bot predict default intent',
        color: '#f16a73',
        key: '',
        numberRequest: notUnderstandUsersay,
        percent: Number(percent.notUnderstandUsersay * 100).toFixed(2),
      },
      {
        heading: 'Need confirm',
        description: 'Bot confirm action',
        color: '#f6a61f',
        key: '',
        numberRequest: needConfirmUsersay,
        percent: Number(percent.needConfirmUsersay * 100).toFixed(2),
      },
      {
        heading: 'Default reply',
        description: 'Default reply',
        color: '#9f7aea',
        key: '',
        numberRequest: defaultUsersay,
        percent: Number(percent.defaultUsersay * 100).toFixed(2),
      },
    ];
    setAnalysts(dataAnalysts);
  };

  const bindDataHightChart = (data) => {
    const hightChart = {
      ...dataHightChar,
      xAxis: {
        ...dataHightChar.xAxis,
        categories: data.map((el) => el.createdAt),
      },
      series: [
        {
          name: 'Total request',
          data: data.map((el) => el.totalUsersay),
          color: '#4991e2',
        },
        {
          name: 'Answered',
          data: data.map((el) => el.answeredUsersay),
          color: '#48bb78',
        },
        {
          name: 'Not understand',
          data: data.map((el) => el.notUnderstandUsersay),
          color: '#f16a73',
        },
        {
          name: 'Need confirm',
          data: data.map((el) => el.needConfirmUsersay),
          color: '#f6a61f',
        },
        {
          name: 'Default reply',
          data: data.map((el) => el.defaultUsersay),
          color: '#9f7aea',
        },
      ],
    };
    Highcharts.chart(hightChart);
  };

  const fetchDashboard = async () => {
    const data = await apis.dashboard.getDashboard(dateSelected);

    if (data.status) {
      bindDataAnalysts(data.result.statistics);
      // setSummary(data.result.statistics);
      bindDataHightChart(data.result.dashboards);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [dateSelected]);

  useEffect(() => {
    bindDataAnalysts({
      totalUsersay: 0,
      defaultUsersay: 0,
      answeredUsersay: 0,
      notUnderstandUsersay: 0,
      needConfirmUsersay: 0,
      percent: {
        defaultUsersay: 0,
        answeredUsersay: 0,
        notUnderstandUsersay: 0,
        needConfirmUsersay: 0,
      },
    });
    Highcharts.chart(dataHightChar);
    fetchDashboard();
  }, []);

  const handleChangeTypeSelect = (value) => {
    if (value === 'TODAY') {
      setDateSelected({
        startDate: subDays(new Date(), 1),
        endDate: new Date(),
      });
    } else if (value === 'WEEK') {
      setDateSelected({
        startDate: subDays(new Date(), 7),
        endDate: new Date(),
      });
    } else {
      setDateSelected({
        startDate: subDays(new Date(), 31),
        endDate: new Date(),
      });
    }
  };
  return (
    <>
      <Box className={classes.heading} mt={2} mb={2}>
        <Typography variant="h6" gutterBottom>
          SUMMARY OF CHATBOT EFFICIENCY
        </Typography>
        <Box className={classes.headerBody}>
          {btnList.map((el) => (
            <Button
              variant={typeDateSelected === el.value ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => {
                setTypeDateSelected(el.value);
                handleChangeTypeSelect(el.value);
              }}
              className={classes.btn}
            >
              {el.heading}
            </Button>
          ))}

          <Grid className={classes.dateRangePicker}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                open={openStartDate}
                onClick={() => setOpenStartDate(true)}
                onClose={() => setOpenStartDate(false)}
                maxDate={new Date()}
                className={classes.dateStart}
                margin="normal"
                // label="Date picker dialog"
                format="MM/dd/yyyy"
                value={dateSelected.startDate}
                onChange={(date) => {
                  setDateSelected({
                    ...dateSelected,
                    startDate: date,
                  });
                }}
                allowKeyboardControl
                KeyboardButtonProps={{
                  disabled: true,
                  style: { display: 'none' },
                }}
              />
              <Box className={classes.dividerDateRange}>-</Box>
              <KeyboardDatePicker
                open={openEndDate}
                onClick={() => setOpenEndDate(true)}
                onClose={() => setOpenEndDate(false)}
                maxDate={new Date()}
                className={classes.dateEnd}
                margin="normal"
                // label="Date picker dialog"
                format="MM/dd/yyyy"
                value={dateSelected.endDate}
                onChange={(date) => {
                  setDateSelected({
                    ...dateSelected,
                    endDate: date,
                  });
                }}
                allowKeyboardControl
                KeyboardButtonProps={{
                  disabled: true,
                  style: { display: 'none' },
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Box>
      </Box>
      <Divider />
      <Box mt={2}>
        <Grid container spacing={3}>
          {analysts &&
            analysts.map((el) => (
              <Grid item xs={3} className={classes.gridItem}>
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
                      {el.numberRequest}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box mt={1}>
                    <Typography variant="h5">{el.percent}%</Typography>
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
