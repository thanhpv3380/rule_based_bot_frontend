/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './index.style';
import apis from '../../../apis';
import roleConstant from '../../../constants/role';
import actions from '../../../redux/actions';

const ShareBot = ({ role, botId }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountSelect, setAccountSelect] = useState();

  const fetchPermissions = async () => {
    const data = await apis.bot.getBotById(botId);
    if (data && data.status) {
      setPermissions(data.result.bot.permissions);
    }
  };

  const fetchAccount = async (keySearch) => {
    const data = await apis.user.getUsers(keySearch);
    if (data && data.status) {
      setAccounts(data.result.accounts);
    }
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    await fetchAccount(value);
  };

  const validateAddPermission = () => {
    if (!accountSelect) {
      enqueueSnackbar('Nothing is choose', { variant: 'error' });
      return false;
    }
    const userFind = permissions.find(
      (el) => el.user.email === accountSelect.email,
    );

    if (userFind) {
      enqueueSnackbar('Email does exist', { variant: 'error' });
      return false;
    }
    return true;
  };
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validateAddPermission()) {
      setAccountSelect(null);
      return;
    }
    const permissionData = {
      user: accountSelect.id,
      role: roleConstant.ROLE_EDITOR,
    };
    const data = await apis.bot.addPermission(botId, {
      ...permissionData,
    });
    if (data && data.status) {
      setPermissions([
        ...permissions,
        {
          user: { ...accountSelect },
          role: roleConstant.ROLE_EDITOR,
        },
      ]);
      setAccountSelect(null);
      dispatch(actions.bot.updateBot({ ...data.result.bot }));
    }
  };
  const handleDelete = (userId) => async () => {
    const data = await apis.bot.deletePermission(botId, userId);
    if (data && data.status) {
      const index = permissions.findIndex(
        (el) => el.user && el.user.id === userId,
      );
      const newPermissions = [...permissions];
      newPermissions.splice(index, 1);
      setPermissions([...newPermissions]);
      dispatch(actions.bot.updateBot({ ...data.result.bot }));
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <>
      <Typography variant="body1">
        After you grant or revoke access to your bot, it may take some time for
        the change to be affected.
      </Typography>
      <Grid container xs={12} style={{ display: 'flex' }}>
        {role === roleConstant.ROLE_OWNER && (
          <>
            <Grid item xs={6}>
              <Autocomplete
                options={accounts || []}
                value={accountSelect || null}
                onChange={(e, value) => {
                  setAccountSelect(value);
                }}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.email}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    placeholder="Enter Email"
                    onChange={handleChange}
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
              <Button onClick={handleAdd}>add</Button>
            </Grid>
          </>
        )}
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
            {permissions.map((el) => (
              <TableRow key="name">
                <TableCell style={{ borderBottom: 'none' }} align="left">
                  <Typography>{el.user && el.user.email}</Typography>
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: 'none',
                    color: '#ccc',
                  }}
                  align="left"
                >
                  <Typography variant="subtitle2">{el.role}</Typography>
                </TableCell>
                {el.role === roleConstant.ROLE_EDITOR &&
                  role === roleConstant.ROLE_OWNER && (
                    <TableCell style={{ borderBottom: 'none' }} align="left">
                      <IconButton
                        aria-label="delete"
                        onClick={handleDelete(el.user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShareBot;
