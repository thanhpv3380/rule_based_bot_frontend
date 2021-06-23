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
  TextField,
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
    const newImages = [...item.images];
    const pos = newImages.findIndex((el) => el.id === id);
    newImages.splice(pos, 1);
    handleUpdateGallery(actionId, { ...item, images: [...newImages] });
  };

  const handleChangeDescription = (value) => {
    handleUpdateGallery(actionId, {
      ...item,
      description: value,
    });
  };

  const handleUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
      Object.keys(files).filter((key) => key !== 'length' && files[key]);
      const links = await Promise.all(
        Object.entries(files)
          .filter((el) => typeof el !== 'number')
          .map(async (el) => {
            const formData = new FormData();
            formData.append('file', el[1]);
            const data = await apis.upload.uploadFile({ formData });
            if (data && data.status) {
              return { typeMedia: 'IMAGE', url: data.result.link };
            }
            enqueueSnackbar(`Image ${el[1].image} upload failed`, {
              variant: 'error',
            });

            return null;
          })
          .filter((el) => el),
      );

      let newImages = [...item.images];
      newImages = [...newImages, ...links];
      handleUpdateGallery(actionId, { ...item, images: [...newImages] });
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
      <Box mb={1.5} mt={1.5}>
        <TextField
          label={t('enter_description_of_gallery')}
          variant="outlined"
          size="small"
          fullWidth
          name="description"
          value={item && item.description}
          onChange={(e) => {
            handleChangeDescription(e.target.value);
          }}
        />
      </Box>
      <Box
        mb={1.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography gutterBottom>
          {t('total_number_of_images')}:{' '}
          {(item && item.images && item.images.length) || 0}
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
        <GridList
          className={classes.gridList}
          cols={item.images && item.images.length <= 1 ? 1 : 2}
        >
          {item.images &&
            item.images.map((el, key) => (
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
