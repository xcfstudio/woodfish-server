import ResponseInterface from "@/interfaces/ResponseInterface";

class Success implements ResponseInterface {
    code: number;
    status: string;
    message: string;
    data: object | any[];

    constructor(message: string, data: object | any[]) {
        this.code = 200
        this.status = 'success'
        this.message = message
        this.data = data
    }

}

class Failure implements ResponseInterface {
    code: number;
    status: string;
    message: string;
    data: object | any[];
    error?: any

    constructor(message: string, data: object | any[], error: object | any[] | undefined) {
        this.code = 400
        this.status = 'failure'
        this.message = message
        this.data = data
        this.error = error
    }
    
}

class ServerError implements ResponseInterface {
    code: number;
    status: string;
    message: string;
    data?: object | any[];
    error?: any
    constructor(message: string, data: object | any[], error: object | any[] | undefined) {
        this.code = 500
        this.status = 'error'
        this.message = message
        this.data = data
        this.error = error
    }
    
    
}

export {
    Success, Failure, ServerError
}