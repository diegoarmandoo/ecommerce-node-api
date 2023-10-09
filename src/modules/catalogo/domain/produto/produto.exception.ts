import { DomainException } from "@shared/domain/domain.exception";

class ProdutoException extends DomainException {
    constructor(message:string = '⚠️ Exceção de Domínio Genérica da Entidade Produto') {
        super(message);
        this.name = 'ProdutoException'
        this.message = message;
    }
}

class NomeProdutoTamanhoMinimoInvalido extends ProdutoException {
    public constructor(message:string = '⚠️ O nome do produto não possui um tamanho mínimo válido.') {
        super(message);
        this.name = 'NomeProdutoTamanhoMinimoInvalido'
        this.message = message;
    }
}

class NomeProdutoTamanhoMaximoInvalido extends ProdutoException {
    public constructor(message:string = '⚠️ O nome do produto não possui um tamanho máximo válido.') {
        super(message);
        this.name = 'NomeProdutoTamanhoMaximoInvalido'
        this.message = message;
    }
}

class DescricaoProdutoTamanhoMinimoInvalido extends ProdutoException {
    public constructor(message:string = '⚠️ A descrição do produto não possui um tamanho mínimo válido.') {
        super(message);
        this.name = 'DescricaoProdutoTamanhoMinimoInvalido'
        this.message = message;
    }
}

class DescricaoProdutoTamanhoMaximoInvalido extends ProdutoException {
    public constructor(message:string = '⚠️ A descrição do produto não possui um tamanho máximo válido.') {
        super(message);
        this.name = 'DescricaoProdutoTamanhoMaximoInvalido'
        this.message = message;
    }
}

class ValorMinimoProdutoInvalido extends ProdutoException {
    public constructor(message:string = '⚠️ O valor mínimo do produto é inválido.') {
        super(message);
        this.name = 'ValorMinimoProdutoInvalido'
        this.message = message;
    }
}

class QtdMinimaCategoriasProdutoInvalida extends ProdutoException {
    public constructor(message:string = '⚠️ A quantidade mínima de categorias produto é inválida.') {
        super(message);
        this.name = 'QtdMinimaCategoriasProdutoInvalida'
        this.message = message;
    }
}

class QtdMaximaCategoriasProdutoInvalida extends ProdutoException {
    public constructor(message:string = '⚠️ A quantidade máxima de categorias do produto é inválida.') {
        super(message);
        this.name = 'QtdMaximaCategoriasProdutoInvalida'
        this.message = message;
    }
}

class ProdutoJaPossuiQtdMaximaCategorias extends ProdutoException {
    public constructor(message:string = '⚠️ O produto já possui a quantidade máxima de categorias.') {
        super(message);
        this.name = 'ProdutoJaPossuiQtdMaximaCategorias'
        this.message = message;
    }
}

class ProdutoJaPossuiCategoriaInformada extends ProdutoException {
    public constructor(message:string = '⚠️ O produto já possui a categoria informada.') {
        super(message);
        this.name = 'ProdutoJaPossuiCategoriaInformada'
        this.message = message;
    }
}

class ProdutoJaPossuiQtdMinimaCategorias extends ProdutoException {
    public constructor(message:string = '⚠️ O produto já possui a quantidade mínima de categorias.') {
        super(message);
        this.name = 'ProdutoJaPossuiQtdMinimaCategorias'
        this.message = message;
    }
}

class ProdutoNaoPossuiCategoriaInformada extends ProdutoException {
    public constructor(message:string = '⚠️ O produto não possui a categoria informada.') {
        super(message);
        this.name = 'ProdutoNaoPossuiCategoriaInformada'
        this.message = message;
    }
}

const ProdutoExceptions = {
    ProdutoException: ProdutoException,
    NomeProdutoTamanhoMinimoInvalido: NomeProdutoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido: NomeProdutoTamanhoMaximoInvalido,
    DescricaoProdutoTamanhoMinimoInvalido: DescricaoProdutoTamanhoMinimoInvalido,
    DescricaoProdutoTamanhoMaximoInvalido: DescricaoProdutoTamanhoMaximoInvalido,
    ValorMinimoProdutoInvalido: ValorMinimoProdutoInvalido,
    QtdMinimaCategoriasProdutoInvalida:QtdMinimaCategoriasProdutoInvalida,
    QtdMaximaCategoriasProdutoInvalida: QtdMaximaCategoriasProdutoInvalida,
    ProdutoJaPossuiQtdMaximaCategorias: ProdutoJaPossuiQtdMaximaCategorias,
    ProdutoJaPossuiCategoriaInformada: ProdutoJaPossuiCategoriaInformada,
    ProdutoJaPossuiQtdMinimaCategorias:ProdutoJaPossuiQtdMinimaCategorias,
    ProdutoNaoPossuiCategoriaInformada:ProdutoNaoPossuiCategoriaInformada
}


export {
    ProdutoExceptions
}



