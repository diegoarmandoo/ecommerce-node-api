import { ApplicationException } from "@shared/application/application.exception";

class CategoriaApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Categoria') {
        super(message);
        this.name = 'CategoriaApplicationException'
        this.message = message;
    }
}

class CategoriaNaoEncontrada extends CategoriaApplicationException {
    public constructor(message:string = '⚠️ A categoria não foi encontrada na base de dados.') {
        super(message);
        this.name = 'CategoriaNaoEncontrada'
        this.message = message;
    }
}

const CategoriaApplicationExceptions = {
    CategoriaNaoEncontrada: CategoriaNaoEncontrada
}

export { CategoriaApplicationExceptions }