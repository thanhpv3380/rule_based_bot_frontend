/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import { DeleteOutline as DeleteOutlineIcon } from '@material-ui/icons';
import 'date-fns';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './index.style';
import apis from '../../../apis';
import roleAccount from '../../../constants/role';

const GeneralSetting = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [permissions, setPermissions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountSelect, setAccountSelect] = useState();
  const fetchPermissions = async () => {
    const data = await apis.permission.getPermissionsByBot();
    if (data && data.status) {
      setPermissions(data.result.permissions);
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
    console.log(value);
    await fetchAccount(value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = await apis.permission.createPermission({
      userId: accountSelect.id,
    });
    if (data && data.status) {
      const newPermission = {
        ...data.result.permission,
        user: { ...accountSelect },
      };
      setPermissions([...permissions, newPermission]);
      setAccountSelect(null);
    }
  };
  const handleDelete = (id) => async () => {
    const data = await apis.permission.deletePermission(id);
    if (data && data.status) {
      const index = permissions.findIndex((el) => el.id === id);
      const newPermissions = [...permissions];
      newPermissions.splice(index, 1);
      setPermissions([...newPermissions]);
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
                {el.role === roleAccount.ROLE_EDITOR && (
                  <TableCell style={{ borderBottom: 'none' }} align="left">
                    <DeleteOutlineIcon onClick={handleDelete(el.id)} />
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

export default GeneralSetting;
