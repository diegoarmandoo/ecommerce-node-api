import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";
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
                dataExclusao: null,
                status: StatusProduto.ATIVO
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

    async adicionarCategoria(produto: Produto, categoria: Categoria): Promise<boolean> {
        const categoriaProdutoAdicionada = await this._datasource.produtosCategorias.create(
            {
                data:{
                    produtoId: produto.id,
                    categoriaId: categoria.id
                }
            }
        );
        if (categoriaProdutoAdicionada) {return true;}
        return false;
    }

    async removerCategoria(produto: Produto, categoria: Categoria): Promise<boolean> {
        const categoriaProdutoRemovida = await this._datasource.produtosCategorias.delete(
            {
               where: {
                   produtoId_categoriaId: {
                        produtoId: produto.id,
                        categoriaId:categoria.id
                   }
               }
                
            }
        );
        if (categoriaProdutoRemovida) {return true;}
        return false;
    }

    async alterarStatus(produto: Produto, status: StatusProduto): Promise<boolean> {
        const produtoStatusAlterado = await this._datasource.produto.update(
            {
                where: {
                    id: produto.id
                },
                data: {
                   status: ProdutoMap.toStatusProdutoPrisma(status)
                }      
            }
        );
        if (produtoStatusAlterado.id) {return true;}
        return false;
    }

    async recuperarPorCategoria(idCategoria: string): Promise<Produto[]> {
        const produtosPorCategoriaRecuperados = await this._datasource.produto.findMany({
            where: {
                dataExclusao: null,
                status: StatusProduto.ATIVO,
                AND: [
                    {
                        categorias: {
                            some: {
                                categoriaId: idCategoria
                            }
                        }
                    }
                ]
            },
            include: produtoIncludeCategoriaPrisma
        });
        const produtos: Array<Produto> = [];

        if (produtosPorCategoriaRecuperados.length > 0) {
            produtosPorCategoriaRecuperados.map((produto) => {
                produtos.push(ProdutoMap.fromPrismaModelToDomain(produto));
            });
        }
        return produtos;
    }

}

export { ProdutoPrismaRepository }