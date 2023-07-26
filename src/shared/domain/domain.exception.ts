class DomainException extends Error {
    constructor(message:string = '⚠️ Exceção de domínio genérica') {
        super(message);
        this.name = 'DomainException';
        this.message = message;
        Error.captureStackTrace(this, this.constructor)
    }
}

class IDEntityUUIDInvalid extends DomainException {
    public constructor(message:string = '⚠️ O ID da entidade é um UUID inválido.') {
        super(message);
        this.name = 'IDEntityUUIDInvalid'
        this.message = message;
    }
}

export { 
    DomainException,
    IDEntityUUIDInvalid
}