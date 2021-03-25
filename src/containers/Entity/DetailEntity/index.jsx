/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import useStyles from './index.style';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';
import { generateTitleItem } from '../../../utils/generateTitle';

const CreateAction = ({ groupItems, groupId, handleCreate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState('female');
  const [entity, setEntity] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = async (name, groupEntity) => {
    const data = await apis.entity.createEntity({
      name,
      entity,
      groupEntity,
    });
    if (data.status) {
      handleCreate(data.result.entity);
      enqueueSnackbar(textDefault.CREATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.CREATE_FAILED, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <ItemInfoHeader
        name={generateTitleItem('Entity')}
        groupItems={groupItems}
        handleSave={handleSave}
        groupId={groupId}
      />
      <div className={classes.content}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="(Disabled option)"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default CreateAction;
