/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Paper,
} from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import { EntityDefineSynonyms, EntityComplex, EntityRegex } from '../Entities';
import useStyles from './index.style';
import apis from '../../../apis';
import { generateTitleItem } from '../../../utils/generateTitle';
import groupConstant from '../../../constants/group';
import menus from '../../../data/EntityType.json';

const CreateAction = ({ groupItems, groupId, handleCreate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [entityData, setEntityData] = useState({
    entityType: 1,
    name: '',
    groupEntity: '',
    pattern: '',
    synonyms: [],
    patterns: [],
  });

  useEffect(() => {
    setEntityData({
      ...entityData,
      name: generateTitleItem('Entity'),
      groupEntity: groupId,
    });
  }, []);

  useEffect(() => {
    const temp = groupItems.find(
      (el) => el.groupType === groupConstant.GROUP_SINGLE,
    );

    setEntityData({
      ...entityData,
      name: generateTitleItem('Entity'),
      groupEntity: groupId || (temp && temp.id),
    });
  }, [groupItems]);

  useEffect(() => {
    setEntityData({
      ...entityData,
      name: generateTitleItem('Entity'),
      groupEntity: groupId,
    });
  }, [groupId]);

  const handleChangeInfoHeader = (e) => {
    const { name, value } = e.target;
    if (name === 'groupId') {
      setEntityData({
        ...entityData,
        groupEntity: value,
      });
    }
    if (name === 'name') {
      setEntityData({
        ...entityData,
        name: value,
      });
    }
  };

  const handleChangeEntityType = (e) => {
    const { value } = e.target;
    setEntityData({
      ...entityData,
      entityType: parseInt(value),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await apis.entity.createEntity({
      name: entityData.name,
      type: entityData.entityType,
      pattern: entityData.pattern,
      synonyms: [...entityData.synonyms],
      patterns: [...entityData.patterns],
      groupEntity: entityData.groupEntity,
    });
    if (data && data.status) {
      handleCreate(data.result.entity);
      enqueueSnackbar(t('create_entity_success'), {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(t('create_entity_failed'), {
        variant: 'error',
      });
    }
  };

  const handleAddRowSynonymsEntity = (data) => {
    setEntityData({
      ...entityData,
      synonyms: [{ ...data }, ...entityData.synonyms],
    });
  };

  const handleDeleteRowSynonymsEntity = (pos) => {
    setEntityData({
      ...entityData,
      synonyms: [...entityData.synonyms.filter((el, index) => index !== pos)],
    });
  };

  const handleChangeRowSynonymsEntity = (pos, data) => {
    setEntityData({
      ...entityData,
      synonyms: [
        ...entityData.synonyms.map((el, index) => {
          if (index === pos) return { ...data };
          return el;
        }),
      ],
    });
  };

  const handleAddRowComplexEntity = (data) => {
    setEntityData({
      ...entityData,
      patterns: [{ ...data }, ...entityData.patterns],
    });
  };

  const handleDeleteRowComplexEntity = (pos) => {
    setEntityData({
      ...entityData,
      patterns: [...entityData.patterns.filter((el, index) => index !== pos)],
    });
  };

  const handleChangeRowComplexEntity = (pos, data) => {
    setEntityData({
      ...entityData,
      patterns: [
        ...entityData.patterns.map((el, index) => {
          if (index === pos) return { ...data };
          return el;
        }),
      ],
    });
  };

  const handleChangeRowRegexEntity = (data) => {
    setEntityData({
      ...entityData,
      pattern: data,
    });
  };

  return (
    <Paper>
      <ItemInfoHeader
        name={entityData.name}
        groupId={entityData.groupEntity}
        groupItems={groupItems}
        handleSave={handleSave}
        handleChange={handleChangeInfoHeader}
      />
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{t('entity_type')}</FormLabel>
              <RadioGroup
                aria-label={t('entity')}
                name="entity1"
                value={entityData.entityType}
                onChange={handleChangeEntityType}
              >
                {menus.map((el) => (
                  <FormControlLabel
                    key={el.value}
                    value={el.value}
                    control={<Radio />}
                    label={el.heading}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <div className={classes.contentDetail}>
          {entityData.entityType === 1 && (
            <EntityDefineSynonyms
              items={entityData.synonyms}
              handleAdd={handleAddRowSynonymsEntity}
              handleDelete={handleDeleteRowSynonymsEntity}
              handleChange={handleChangeRowSynonymsEntity}
            />
          )}
          {entityData.entityType === 2 && (
            <EntityRegex
              item={entityData.pattern}
              handleChange={handleChangeRowRegexEntity}
            />
          )}
          {entityData.entityType === 3 && (
            <EntityComplex
              items={entityData.patterns}
              handleAdd={handleAddRowComplexEntity}
              handleDelete={handleDeleteRowComplexEntity}
              handleChange={handleChangeRowComplexEntity}
            />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default CreateAction;
