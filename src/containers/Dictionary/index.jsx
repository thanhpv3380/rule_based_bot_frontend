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
  Dialog,
  DialogActions,
  DialogTitle,
  TablePagination,
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

const dictionaryDefault = {
  id: null,
  acronym: '',
  original: '',
};

let dictionariesDefault = [];
const Dictionary = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState();
  const [dictionaryDelete, setDictionaryDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dictionary, setDictionary] = useState({ ...dictionaryDefault });

  const [dictionaries, setDictionaries] = useState([]);
  const [pagination, setPagination] = useState({
    itemsLength: 100,
    itemsPerPage: 10,
    page: 1,
  });

  const handleChangePage = (event, newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      itemsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const fetchDictionaries = async (search) => {
    const data = await apis.dictionary.getDictionaries(search);
    if (data && data.status) {
      setPagination({
        itemsLength: data.results.metadata.count,
      });
      setDictionaries(data.results.dictionaries);
      dictionariesDefault = [...data.results.dictionaries];
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchDictionaries({});
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);
    const reg = new RegExp(value.toLowerCase());
    const newDictionaries = dictionariesDefault.filter((el) => {
      return (
        reg.test(el.acronym.toLowerCase()) ||
        reg.test(el.original.toLowerCase())
      );
    });
    setDictionaries([...newDictionaries]);
  };

  const handleToggleModal = (row) => {
    if (row) {
      setDictionary(row);
    }
    setOpenModal((preOpenModal) => !preOpenModal);
  };

  const handleAction = async (value) => {
    const data = value.id
      ? await apis.dictionary.updateDictionary(value.id, {
          acronym: value.acronym,
          original: value.original,
        })
      : await apis.dictionary.createDictionary(value);

    const title = value.id ? 'Update' : 'Create';
    if (data && data.status) {
      handleToggleModal();
      fetchDictionaries();
      enqueueSnackbar(`${title} successfully`, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(`${title} failed`, {
        variant: 'error',
      });
    }
  };

  const handleToggleConfirmDelete = (id) => {
    setDictionaryDelete(id);
  };

  const handleDelete = async () => {
    const data = await apis.dictionary.deleteDictionary(dictionaryDelete);
    if (data && data.status) {
      fetchDictionaries();
      enqueueSnackbar('Delete successfully', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Delete failed', {
        variant: 'error',
      });
    }
    setDictionaryDelete(null);
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
          <Button variant="contained" onClick={() => handleToggleModal()}>
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
              onChange={handleSearch}
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
                      onClick={() => handleToggleModal(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => handleToggleConfirmDelete(row.id)}
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
      {/* <TablePagination
        component="div"
        count={pagination.itemsLength}
        page={pagination.page}
        onChangePage={handleChangePage}
        rowsPerPage={pagination.itemsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
      <Dialog
        open={dictionaryDelete}
        onClose={() => handleToggleConfirmDelete()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you agree delete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleToggleConfirmDelete()} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <DictionaryAction
        openModal={openModal}
        handleToggleModal={handleToggleModal}
        dictionaryUpdate={dictionary}
        handleAction={handleAction}
      />
    </div>
  );
};

export default Dictionary;
