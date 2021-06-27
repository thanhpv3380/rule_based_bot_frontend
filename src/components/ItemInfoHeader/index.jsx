import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles from './index.style';

const ItemInfoHeader = ({
  name,
  groupId,
  groupItems,
  handleSave,
  handleChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [groupsData, setGroupData] = useState();

  useEffect(() => {
    const groupSystem = groupItems.find((el) => el.groupType === 1);
    const groups = groupItems.filter((el) => el.groupType !== 1);
    if (groupSystem && groupSystem.id === groupId) {
      setGroupData([groupSystem]);
    } else {
      setGroupData(groups);
    }
  }, [groupItems, groupId]);
  return (
    <AppBar position="static">
      <Toolbar>
        <TextField
          variant="outlined"
          color="secondary"
          placeholder={t('type_name')}
          size="small"
          classes={{
            root: classes.textField,
          }}
          name="name"
          value={name}
          onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
            name="groupId"
            value={`${groupId}`}
            onChange={handleChange}
          >
            {groupsData &&
              groupsData.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button size="large" variant="contained" onClick={handleSave}>
          {t('save')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ItemInfoHeader;
