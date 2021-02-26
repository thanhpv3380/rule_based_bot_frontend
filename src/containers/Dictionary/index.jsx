import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TableContainer,
  TableCell,
  Button,
} from '@material-ui/core';
import {
  List as ListIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import DictionaryAction from './DictionaryAction';
import useStyles from './index.style';
import apis from '../../apis';

const Dictionary = () => {
  const classes = useStyles();
  let searchId = null;
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [dictionary, setDictionary] = useState({
    id: null,
    acronym: null,
    original: null,
  });

  const [dictionaries, setDictionaries] = useState([
    {
      id: '123',
      acronym: 'test',
      original: 'demo',
    },
  ]);

  const fetchDictionaries = async (search) => {
    const data = await apis.dictionary.getDictionaries(search);
    if (data && data.status) {
      setDictionaries(data.results.dictionaries);
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
  };

  const handleChangeSearch = (e) => {
    const key = e.target.value;
    setQuery(e.target.value);
    clearTimeout(searchId);
    searchId = setTimeout(
      () => fetchDictionaries(`key=${key}&searchFields=acronym,original`),
      1000,
    );
  };

  useEffect(() => {
    fetchDictionaries();
  }, []);

  const handleChange = (e) => {
    setDictionary({
      ...dictionary,
      [e.target.name]: e.target.value,
    });
  };

  const handleAction = async () => {
    const data = dictionary.id
      ? await apis.dictionary.updateDictionary(dictionary.id, dictionary)
      : await apis.dictionary.createDictionary(dictionary);

    const title = dictionary.id ? 'Update' : 'Create';
    if (data && data.status) {
      enqueueSnackbar(`${title} successfully`, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(`${title} failed`, {
        variant: 'error',
      });
    }
  };

  const handleDelete = async (id) => {
    const data = await apis.dictionary.deleteDictionary(id);
    if (data && data.status) {
      enqueueSnackbar('Delete successfully', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Delete failed', {
        variant: 'error',
      });
    }
  };

  const handleToggleModal = () => {
    setOpenModal((preOpenModal) => !preOpenModal);
  };

  const handleOpenModal = (row) => {
    if (row) {
      setDictionary(row);
    }
    setOpenModal(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <ListIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Dictionary
          </Typography>
          <Button variant="contained" onClick={() => handleOpenModal()}>
            Create
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={handleChangeSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Paper elevation={3}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Acronym</TableCell>
                <TableCell>Original Word</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {dictionaries.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.acronym}</TableCell>
                  <TableCell>{row.original}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      className={classes.margin}
                      onClick={() => handleOpenModal(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DictionaryAction
        openModal={openModal}
        handleToggleModal={handleToggleModal}
        dictionary={dictionary}
        handleChange={handleChange}
        handleAction={handleAction}
      />
    </div>
  );
};

export default Dictionary;
