export interface NodeConnect {
  node: string,
  type: 'START' | 'INTENT' | 'CONDITION' | 'ACTION' | 'ACTION_ASK_AGAIN';
}