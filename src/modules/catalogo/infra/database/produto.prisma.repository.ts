import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { Prisma } from "@prisma/client";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto> {
    
    async recuperarPorUuid(uuid: string): Promise<Produto | null> {
        const produtoRecuperado = await this._datasource.produto.findUnique({
            where: {
                id: uuid,
            },
            include: produtoIncludeCategoriaPrisma
        });
        if (produtoRecuperado){
            return ProdutoMap.fromPrismaModelToDomain(produtoRecuperado);
        }
        return null;
    }

    async recuperarTodos(): Promise<Produto[]> {
        const produtosRecuperados = await this._datasource.produto.findMany({
            where: {
                dataExclusao: null
            },
            include: produtoIncludeCategoriaPrisma
        });

        const produtos: Array<Produto> = [];

        if (produtosRecuperados.length > 0) {
            produtosRecuperados.map((produto) => {
                produtos.push(ProdutoMap.fromPrismaModelToDomain(produto));
            });
        }
        return produtos;
    }

    async existe(uuid: string): Promise<boolean> {
        const produto = await this.recuperarPorUuid(uuid);
        if (produto) {return true;}
        return false;
    }

    async inserir(produto: Produto): Promise<Produto> {
        const produtoInserido = await this._datasource.produto.create({
            data: {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categorias: {
                    create: produto.categorias.map((categoria) => { return {categoriaId: categoria.id} })
                }
            }
       });
       return produto;
    }

    async atualizar(uuid: string, produto: Partial<Produto>): Promise<boolean> {
        const produtoAtualizado = await this._datasource.produto.update(
            {
                where: {id : uuid},
                data: {
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor
                }
            }
        );
        if (produtoAtualizado) {return true;}
        return false;
    }

    async deletar(uuid: string): Promise<boolean> {
        const produtoDeletado = await this._datasource.produto.update(
            {
                where: {
                    id: uuid
                },
                data: {
                    dataExclusao: new Date()
                }      
            }
        );
        if (produtoDeletado.id) {return true;}
        return false;
    }

}

export { ProdutoPrismaRepository }