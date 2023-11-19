import { ApplicationException } from "@shared/application/application.exception";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

class ProdutoApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Produto') {
        super(message);
        this.name = 'ProdutoApplicationException'
        this.message = message;
    }
}

class ProdutoNaoEncontrado extends ProdutoApplicationException {
    public constructor(message:string = '⚠️ o produto não foi encontrado na base de dados.') {
        super(message);
        this.name = 'ProdutoNaoEncontrado'
        this.message = message;
    }
}

const ProdutoApplicationExceptions = {
    ProdutoNaoEncontrado: ProdutoNaoEncontrado
}

export { ProdutoApplicationExceptions }