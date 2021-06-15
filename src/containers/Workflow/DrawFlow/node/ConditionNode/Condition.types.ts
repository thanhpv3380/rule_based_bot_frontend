export interface Condition {
    conditions: Conditions[],
    operator: String,
    createBy: {
        id: string,
        name: string,
    },
    bot: {
        id: string
    },
}

export interface Conditions {
    id: String,
    intentId: String,
    parameter: {
        intentId: string,
        name: string,
        id: string,
    },
    operator: string,
    value: string,
    openMenuConnectCondition?: any,
    openMenuOperator?: any,
}

export interface Parameter {
    id: string,
    parameterName: string,
    required: boolean,
    response: {},
    entity: {},
}

export interface IntentResponse {
    id: string,
    name: string,
    parameters: Parameter[],

}

export interface DataIntentResponse {
    status: number,
    result?: IntentResponse,
    message: string,
}

