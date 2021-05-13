export interface Action {

}

export interface ActionsResponse {
    id: string;
    name: string;
}

export interface DataResponse {
    result?: { actions: ActionsResponse[] },
    status: number
}