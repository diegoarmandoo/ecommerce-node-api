import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProdutoApplicationExceptions } from "../../exceptions/produto.application.exception";
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";

class RecuperarProdutoPorIdUseCase implements IUseCase<string, IProduto> {
    private _produtoRepositorio: IProdutoRepository<Produto>;

    constructor(repositorioProduto: IProdutoRepository<Produto>){
        this._produtoRepositorio = repositorioProduto;
    }

    async execute(uuid: string): Promise<IProduto> {
        
        const existeProduto: boolean = await this._produtoRepositorio.existe(uuid);

        if (!existeProduto){
            throw new ProdutoApplicationExceptions.ProdutoNaoEncontrado();
        }

        const produto = await this._produtoRepositorio.recuperarPorUuid(uuid);

        return ProdutoMap.toDTO(produto as Produto);

    }


}

export { RecuperarProdutoPorIdUseCase }