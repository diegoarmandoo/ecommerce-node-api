import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { CategoriaPrismaRepository } from "./categoria.prisma.repository";
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";

const categoriaRepositorio: ICategoriaRepository<Categoria> = new CategoriaPrismaRepository(prisma);
const produtoRepositorio: IProdutoRepository<Produto> = new ProdutoPrismaRepository(prisma);

export {
    categoriaRepositorio,
    produtoRepositorio
}