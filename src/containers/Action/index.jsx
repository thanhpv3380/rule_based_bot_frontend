import React, { useState } from 'react';
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
  const handleOpenCreate = () => {
    console.log(match);
    history.push(`${match.url}/create`);
  };

  return (
    <LayoutListGroup
      groupItems={groupAndItems}
      handleOpenCreate={handleOpenCreate}
      title="action"
    >
      <Route
        exact
        path={routes.ACTION_BOT.DETAIL_ACTION}
        component={ActionDetail}
      />
      <Route exact path={routes.ACTION_BOT.ACTION} component={EmptyPage} />
      <Route
        exact
        path={routes.ACTION_BOT.CREATE_ACTION}
        component={CreateAction}
      />
    </LayoutListGroup>
  );
}

export default Action;
