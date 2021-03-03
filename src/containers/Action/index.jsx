import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import routes from '../../constants/route';
import LayoutListGroup from '../../components/LayoutListGroup';
import ActionDetail from './DetailAction';
import CreateAction from './CreateAction';
import EmptyPage from '../../components/EmptyPage';

function Action() {
  const { t } = useTranslation();
  const match = useRouteMatch();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState();
  const [groupAndItems, setGroupAndItems] = useState([
    {
      id: '1',
      children: [
        {
          id: '1',
          created_by: '5fc85259ae3528a707c1934a',
          group_id: '1',
          name: 'item_1_group_1',
        },
        {
          id: '2',
          created_by: '5fc85259ae3528a707c1934a',
          group_id: '1',
          name: 'item_2_group_1',
        },
      ],
      name: 'group 1',
    },
    {
      id: '2',
      children: [],
      name: 'group 2',
    },
  ]);

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchKey(e.target.value);
  };

  const handleCreateItem = () => {
    console.log(match);
    history.push(`${match.url}/create`);
  };

  const handleCreateGroup = (value) => {
    console.log(value);
  };

  const handleChangeNameGroup = (groupId, value) => {
    console.log(groupId, value);
  };

  return (
    <LayoutListGroup
      handleSearch={handleSearch}
      handleCreateItem={handleCreateItem}
      // handleDeleteItem={handleDeleteItem}
      handleCreateGroup={handleCreateGroup}
      handleChangeNameGroup={handleChangeNameGroup}
      // handleDeleteGroup={handleDeleteGroup}
      groupItems={groupAndItems}
      title="action"
    >
      <Route
        exact
        path={routes.ACTION_BOT.DETAIL_ACTION}
        component={ActionDetail}
      />
      <Route exact path={routes.ACTION_BOT.ACTION} component={EmptyPage} />
      <Route exact path={routes.ACTION_BOT.CREATE_ACTION}>
        <CreateAction />
      </Route>
    </LayoutListGroup>
  );
}

export default Action;
