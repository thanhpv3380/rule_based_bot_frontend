export interface Action {

}

export interface ActionAskAgainResponse {
    numberOfLoop: number,
    actionFail: string
    actionAskAgain: string
}

export interface ActionsResponse {
    id: string;
    name: string;
    actionAskAgain: any;
}

export interface DataResponse {
    result?: { actions: ActionsResponse[] },
    status: number
}