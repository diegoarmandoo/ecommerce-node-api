import { Produto } from "../domain/produto/produto.entity";
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";

class ProdutoMap {

    public static toDTO(produto: Produto): IProduto {
        return {
          id: produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          valor: produto.valor,
          categorias: produto.categorias
        }
    }

    public static toDomain(produto: RecuperarProdutoProps): Produto {
        return Produto.recuperar(produto);
    }

}

export { ProdutoMap }