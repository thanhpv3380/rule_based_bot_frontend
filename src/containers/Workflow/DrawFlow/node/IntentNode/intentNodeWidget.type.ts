export interface Intent {
    id: string;
}

export interface IntentsResponse {
    id: string;
    name: string;
}

export interface DataResponse {
    result?: IntentsResponse[],
    status: number
}

