/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { useTranslation } from 'react-i18next';
import {
  Typography,
  TextField,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import {
  //   PhotoCamera as PhotoCameraIcon,
  //   Visibility as VisibilityIcon,
  //   VisibilityOff as VisibilityOffIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@material-ui/icons';
import 'date-fns';
import { Autocomplete } from '@material-ui/lab';
// import useStyles from './index.style';

const GeneralSetting = ({ bot }) => {
  //   const { t } = useTranslation();
  //   const classes = useStyles();
  return (
    <>
      <Typography variant="body1">
        After you grant or revoke access to your bot, it may take some time for
        the change to be affected.
      </Typography>
      <Grid container xs={12} style={{ display: 'flex' }}>
        <Grid item xs={6}>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                placeholder="Enter Email"
                // style={{ width: '50%' }}
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px 0px',
          }}
        >
          <Button>add</Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: 'none' }} align="left">
                Who has access
              </TableCell>
              <TableCell style={{ borderBottom: 'none' }} align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {bot &&
              bot.users &&
              bot.users.map((el) => (
                <TableRow key="name">
                  <TableCell style={{ borderBottom: 'none' }} align="left">
                    <Typography style={{ color: '#058833' }}>
                      {el.email}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ borderBottom: 'none' }} align="left">
                    <DeleteOutlineIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GeneralSetting;
