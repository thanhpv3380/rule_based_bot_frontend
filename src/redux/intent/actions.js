export const actionTypes = {
  GET_INTENTS: 'GET_INTENTS',
  GET_INTENTS_SUCCESS: 'GET_INTENTS_SUCCESS',
  GET_INTENTS_FAILURE: 'GET_INTENTS_FAILURE',
  ADD_INTENT: 'ADD_INTENT',
  UPDATE_INTENT: 'UPDATE_INTENT',
  DELETE_INTENT: 'DELETE_INTENT',
};

export function getIntents() {
  return {
    type: actionTypes.GET_INTENTS,
  };
}

export function getIntentsSuccess(intents) {
  return {
    type: actionTypes.GET_INTENTS_SUCCESS,
    intents,
  };
}

export function getIntentsFailure() {
  return {
    type: actionTypes.GET_INTENTS_FAILURE,
  };
}

export function addIntent(data) {
  return {
    type: actionTypes.ADD_INTENT,
    data,
  };
}

export function deleteIntent(id) {
  return {
    type: actionTypes.DELETE_INTENT,
    id,
  };
}
