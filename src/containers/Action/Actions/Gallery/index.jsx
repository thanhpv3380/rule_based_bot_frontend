/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import apis from '../../../../apis';
import useStyles from './index.style';

const Gallery = ({
  item,
  actionId,
  handleDeleteGallery,
  handleUpdateGallery,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { t } = useTranslation();

  const handleDeleteItem = (id) => async () => {
    const newImages = [...item];
    const pos = newImages.findIndex((el) => el.id === id);
    newImages.splice(pos, 1);
    handleUpdateGallery(actionId, [...newImages]);
  };

  const handleUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('file', file);
      const data = await apis.upload.uploadFile({ formData });
      if (data && data.status) {
        let newImages = [...item];
        newImages = [
          ...newImages,
          {
            typeMedia: 'IMAGE',
            url: data.result.link,
          },
        ];
        handleUpdateGallery(actionId, [...newImages]);
      } else {
        enqueueSnackbar('Upload failed', {
          variant: 'error',
        });
      }
    }
  };
  return (
    <>
      <Box display="flex">
        <Box display="flex" flexGrow={1}>
          <Box display="flex">
            <Box mr={0.5}>
              <PhotoLibraryIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                {t('gallery')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteGallery(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        mt={1.5}
        mb={1.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography gutterBottom>
          {t('total_number_of_images')}: {(item && item.length) || 0}
        </Typography>
        <Box>
          <input
            accept="image/*"
            className={classes.input}
            id={`contained-button-file-${actionId}`}
            multiple
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor={`contained-button-file-${actionId}`}>
            <Button
              variant="contained"
              color="default"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              {t('upload')}
            </Button>
          </label>
        </Box>
      </Box>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={item.length <= 1 ? 1 : 2}>
          {item.map((el, key) => (
            <GridListTile key={key} classes={{ root: classes.row }}>
              <img src={el.url} alt={el.description || `image-${key}`} />
              <GridListTileBar
                title={el.description || ''}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <IconButton>
                    <DeleteIcon
                      className={classes.title}
                      onClick={handleDeleteItem(el.id)}
                    />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </>
  );
};
export default Gallery;
