export interface ActionAskAgain {

}
export interface ActionAskAgainResponse {
    numberOfLoop: Number,
    actionFail: string,
    actionAskAgain: string
}
export interface ActionResponse {
    id: string;
    name: string;
}

export interface DataResponse {
    result?: { actions: ActionResponse[] },
    status: number
}