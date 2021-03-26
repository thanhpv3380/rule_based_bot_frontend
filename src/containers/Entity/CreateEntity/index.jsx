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
} from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import { EntityDefineSynonyms, EntityComplex, EntityRegex } from '../Entities';
import useStyles from './index.style';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';
import { generateTitleItem } from '../../../utils/generateTitle';
import groupConstant from '../../../constants/group';

const menus = [
  {
    heading: 'Define synonyms',
    icon: '',
    value: 1,
  },
  {
    heading: 'Regex Entity',
    icon: '',
    value: 2,
  },
  {
    heading: 'Complex entity',
    icon: '',
    value: 3,
  },
];

const CreateAction = ({ groupItems, groupId, handleCreate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [entityData, setEntityData] = useState({
    entityType: 1,
    name: '',
    groupEntity: '',
  });

  useEffect(() => {
    setEntityData({
      name: generateTitleItem('Entity'),
      groupEntity: groupId,
    });
  }, []);

  useEffect(() => {
    const temp = groupItems.find(
      (el) => el.groupType === groupConstant.GROUP_SINGLE,
    );

    setEntityData({
      name: generateTitleItem('Entity'),
      groupEntity: groupId || (temp && temp.id),
    });
  }, [groupItems]);

  useEffect(() => {
    setEntityData({
      name: generateTitleItem('Entity'),
      groupEntity: groupId,
    });
  }, [groupId]);

  const [entity, setEntity] = useState({
    type: '',
    pattern: '',
    synonyms: [],
    patterns: [],
  });

  const handleChangeInfoHeader = (e) => {
    if (e.target.name === 'groupId') {
      setEntityData({
        ...entityData,
        groupEntity: e.target.value,
      });
    }
    if (e.target.name === 'name') {
      setEntityData({
        ...entityData,
        name: e.target.value,
      });
    }
  };

  const handleChangeEntityType = (e) => {
    const value = parseInt(e.target.value);
    setEntityData({
      ...entityData,
      entityType: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await apis.entity.createEntity({
      name: entityData.name,
      type: entityData.entityType,
      pattern: entity.pattern,
      synonyms: [...entity.synonyms],
      patterns: [...entity.patterns],
      groupEntity: entityData.groupEntity,
    });
    if (data && data.status) {
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

  const handleAddRowSynonymsEntity = (data) => {
    setEntity({
      ...entity,
      synonyms: [{ ...data }, ...entity.synonyms],
    });
  };

  const handleDeleteRowSynonymsEntity = (pos) => {
    setEntity({
      ...entity,
      synonyms: [...entity.synonyms.filter((el, index) => index !== pos)],
    });
  };

  const handleChangeRowSynonymsEntity = (pos, data) => {
    setEntity({
      ...entity,
      synonyms: [
        ...entity.synonyms.map((el, index) => {
          if (index === pos) return { ...data };
          return el;
        }),
      ],
    });
  };

  const handleAddRowComplexEntity = (data) => {
    setEntity({
      ...entity,
      patterns: [{ ...data }, ...entity.patterns],
    });
  };

  const handleDeleteRowComplexEntity = (pos) => {
    setEntity({
      ...entity,
      patterns: [...entity.patterns.filter((el, index) => index !== pos)],
    });
  };

  const handleChangeRowComplexEntity = (pos, data) => {
    setEntity({
      ...entity,
      patterns: [
        ...entity.patterns.map((el, index) => {
          if (index === pos) return { ...data };
          return el;
        }),
      ],
    });
  };

  const handleChangeRowRegexEntity = (data) => {
    setEntity({
      ...entity,
      pattern: data,
    });
  };

  return (
    <>
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
              <FormLabel component="legend">Entity Type</FormLabel>
              <RadioGroup
                aria-label="entity"
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
              items={entity.synonyms}
              handleAdd={handleAddRowSynonymsEntity}
              handleDelete={handleDeleteRowSynonymsEntity}
              handleChange={handleChangeRowSynonymsEntity}
            />
          )}
          {entityData.entityType === 2 && (
            <EntityRegex
              item={entity.pattern}
              handleChange={handleChangeRowRegexEntity}
            />
          )}
          {entityData.entityType === 3 && (
            <EntityComplex
              items={entity.patterns}
              handleAdd={handleAddRowComplexEntity}
              handleDelete={handleDeleteRowComplexEntity}
              handleChange={handleChangeRowComplexEntity}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAction;
