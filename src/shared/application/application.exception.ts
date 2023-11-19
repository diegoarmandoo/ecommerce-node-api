class ApplicationException extends Error {
    constructor(message:string = '⚠️ Exceção de aplicação genérica') {
        super(message);
        this.name = 'ApplicationException';
        this.message = message;
        Error.captureStackTrace(this, this.constructor)
    }
}

export {
    ApplicationException
}