class HttpError extends Error {
    statusCode: number;

    constructor(statusCode:number, message: string = '⚠️ Erro HTTP genérico') {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, HttpError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

}

class NotFoundError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 404, message || '⚠️ Servidor Não Conseguiu Encontrar o Recurso Solicitado.');
        this.name = 'NotFoundError';
    }
}

class UnsupportedMediaTypeError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 415, message || '⚠️ Servidor se Recusou a Aceitar a Requisição Porque o Formato do Payload Não é Um Formato Suportado.');
        this.name = 'UnsupportedMediaTypeError';
    }
}

class BadRequestError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 400, message || '⚠️ Servidor Não Pode ou Não Irá Processar a Requisição Devido a Algum Erro do Cliente (ex.: sintaxe de requisição mal formada, enquadramento de mensagem de requisição inválida ou requisição de roteamento enganosa.');
        this.name = 'BadRequestError';
    }
}

const HttpErrors = {
    NotFoundError: NotFoundError,
    UnsupportedMediaTypeError: UnsupportedMediaTypeError,
    BadRequestError: BadRequestError
}

export { HttpError, HttpErrors }