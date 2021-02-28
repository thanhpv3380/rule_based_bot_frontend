import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box } from '@material-ui/core';
import { setCookie } from '../../utils/cookie';

import ListBot from './ListBot';
import CreateBotModal from './CreateBot';
import SearchBox from './SearchBox';

import apis from '../../apis';
import useStyles from './index.styles';
import actions from '../../redux/actions';

let searchId = null;

const Bot = () => {
  const classes = useStyles();
  // const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const [keySearch, setKeySearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 6,
    count: 100,
  });
  const [openModal, setOpenModal] = useState(false);
  const [bots, setBots] = useState([]);

  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const fetchBots = async (query) => {
    const data = await apis.bot.getBots(query);
    if (data.status) {
      setBots(data.results.bots);
      setPagination({
        ...pagination,
        count: data.results.metadata.count,
        page: query.offset
          ? Math.floor(data.results.metadata.count / query.offset)
          : 0,
      });
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchBots({
      limit: pagination.rowsPerPage,
      offset: 0,
    });
  }, []);

  const handleChangePage = async (event, newPage) => {
    fetchBots({
      key: keySearch,
      searchFields: 'name',
      limit: pagination.rowsPerPage,
      offset: newPage * pagination.rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    setKeySearch(value);
    clearTimeout(searchId);
    searchId = setTimeout(
      () =>
        fetchBots({
          key: value,
          searchFields: 'name',
          limit: pagination.rowsPerPage,
          offset: 0,
        }),
      1000,
    );
  };

  const handleCreate = async (value) => {
    const data = await apis.bot.createBot(value);
    if (data && data.status) {
      const { id } = data.results;
      setCookie('bot-id', id);
      dispatch(actions.bot.changeBot(id));
      history.push(`/bot/${id}/dashboard`);
    } else {
      enqueueSnackbar('Create failed', {
        variant: 'error',
      });
    }
  };

  const handleView = (id) => {
    setCookie('bot-id', id);
    dispatch(actions.bot.changeBot(id));
    history.push(`/bot/${id}/dashboard`);
  };

  return (
    <Box className={classes.root}>
      <SearchBox
        keySearch={keySearch}
        handleSearch={handleSearch}
        handleToggleModal={handleToggleModal}
      />
      <CreateBotModal
        openModal={openModal}
        handleToggleModal={handleToggleModal}
        handleCreate={handleCreate}
      />
      <ListBot
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleView={handleView}
        items={bots}
        pagination={pagination}
      />
    </Box>
  );
};

export default Bot;
