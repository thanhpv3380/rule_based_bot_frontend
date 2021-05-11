export interface NodeConnect {
  node: string,
  type: 'START' | 'INTENT' | 'CONDITION' | 'ACTION';
}