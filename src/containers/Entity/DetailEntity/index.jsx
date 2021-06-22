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
import menus from '../../../data/EntityType.json';
import Loading from '../../../components/Loading';

const DetailEntity = ({ groupItems, handleUpdate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [entityId, setEntityId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [oldGroupId, setOldGroupId] = useState();
  const [entityData, setEntityData] = useState({
    type: 1,
    name: '',
    groupEntity: '',
    pattern: '',
    synonyms: [],
    patterns: [],
  });

  const fetchEntity = async (id) => {
    const data = await apis.entity.getEntity(id);
    if (data && data.status) {
      const { entity } = data.result;
      setEntityData(entity);
      setOldGroupId(
        typeof entity.groupEntity === 'object'
          ? entity.groupEntity.id
          : entity.groupEntity,
      );
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const listUrl = window.location.href.split('/');
    const itemId = listUrl[listUrl.length - 1];
    setEntityId(itemId);
    fetchEntity(itemId);
  }, [window.location.href]);

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
      type: parseInt(value),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await apis.entity.updateEntity(entityId, {
      name: entityData.name,
      type: entityData.type,
      pattern: entityData.pattern,
      synonyms: [...entityData.synonyms],
      patterns: [...entityData.patterns],
      groupEntity: entityData.groupEntity,
    });
    if (data && data.status) {
      handleUpdate(data.result.entity, oldGroupId);
      setOldGroupId(data.result.entity.groupEntity);
      enqueueSnackbar(textDefault.UPDATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.UPDATE_FAILED, {
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

  const handleChangeRowRegexEntity = (data) => {
    setEntityData({
      ...entityData,
      pattern: data,
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

  if (isLoading) {
    return <Loading />;
  }

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
                value={entityData.type}
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
          {entityData.type === 1 && (
            <EntityDefineSynonyms
              items={entityData.synonyms}
              handleAdd={handleAddRowSynonymsEntity}
              handleDelete={handleDeleteRowSynonymsEntity}
              handleChange={handleChangeRowSynonymsEntity}
            />
          )}
          {entityData.type === 2 && (
            <EntityRegex
              item={entityData.pattern}
              handleChange={handleChangeRowRegexEntity}
            />
          )}
          {entityData.type === 3 && (
            <EntityComplex
              items={entityData.patterns}
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

export default DetailEntity;
