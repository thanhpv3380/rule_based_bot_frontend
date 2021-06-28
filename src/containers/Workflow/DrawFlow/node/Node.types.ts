import { ActionsResponse } from '../node/ActionNode/ActionNodeWidget.type';
import { IntentsResponse } from '../node/IntentNode/intentNodeWidget.type';

export interface NodeConnect {
  node: string,
  type: 'START' | 'INTENT' | 'CONDITION' | 'ACTION' | 'ACTION_ASK_AGAIN';
}

export interface actionState {
  actions: ActionsResponse[],
  isFetching: Boolean
}

export interface intentState {
  intents: IntentsResponse[],
  isFetching: Boolean
}

export interface NodeState {
  action: actionState,
  intent: intentState
}