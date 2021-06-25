export const actionTypes = {
  GET_ACTIONS: 'GET_ACTIONS',
  GET_ACTIONS_SUCCESS: 'GET_ACTIONS_SUCCESS',
  GET_ACTIONS_FAILURE: 'GET_ACTIONS_FAILURE',
  ADD_ACTION: 'ADD_ACTION',
  UPDATE_ACTION: 'UPDATE_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
};

export function getActions() {
  return {
    type: actionTypes.GET_ACTIONS,
  };
}

export function getActionsSuccess(actions) {
  return {
    type: actionTypes.GET_ACTIONS_SUCCESS,
    actions,
  };
}

export function getActionsFailure() {
  return {
    type: actionTypes.GET_ACTIONS_FAILURE,
  };
}

export function addAction(data) {
  return {
    type: actionTypes.ADD_ACTION,
    data,
  };
}

export function deleteAction(id) {
  return {
    type: actionTypes.DELETE_ACTION,
    id,
  };
}
