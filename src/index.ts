import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { Produto } from '@modules/catalogo/domain/produto/produto.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { ProdutoPrismaRepository } from '@modules/catalogo/infra/database/produto.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { DomainException } from '@shared/domain/domain.exception';

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado');
        }
    );

    const categoriaRepo = new CategoriaPrismaRepository(prisma);
    const produtoRepo = new ProdutoPrismaRepository(prisma);

    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
    //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("7061d559-ab25-4182-98ce-170afdf2acd2");

    //console.log(categoriaRecuperada);

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
    //const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

    //console.log(todasCategorias);

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    //const existeCategoria: boolean = await categoriaRepo.existe("7061d559-ab25-4182-98ce-170afdf2acd2");

    //console.log(existeCategoria);

    /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    //const categoria: Categoria = Categoria.criar({
    //    nome:'Quarto'
    //});     

    //const categoriaInserida = await categoriaRepo.inserir(categoria);

    //console.log(categoriaInserida);

    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
    //const categoria: Categoria = Categoria.recuperar({
    //    id: "96a7f212-e01d-4de7-8abc-70cabbc898fd",
    //    nome: "Banho"
    //});     

    //const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

    //console.log(atualizouCategoria)

    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    //const categoriaDeletada: boolean = await categoriaRepo.deletar("120a3d76-9ca6-4880-a1d6-d34685e1f6f8");
    
    //console.log(categoriaDeletada);

    ////////////////////////////////
	//Recuperar Produto por UUID//
	////////////////////////////////
		
	//const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("f01dbd3a-d8ac-4f66-80bf-c04e56e3ef56");

	//console.log(produtoRecuperado);

    ///////////////////
	//Inserir Produto//
	///////////////////
	
    /*
    const categoria01: Categoria = Categoria.recuperar({
        id: "34b051a9-ccb5-4c4c-a850-52f6cfb08da5",
        nome: 'Sala'
    });     

    const categoria02: Categoria = Categoria.recuperar({
        id: "73d77a06-9a29-4f91-8f7d-c7158fb13a6a",
        nome: 'Quarto'
    })

    const produto: Produto = Produto.criar({
        nome:'Toalha de Mesa',
        descricao:'toalha de algodão',
        valor:85,
        categorias:[categoria01, categoria02]
    });

	const produtoInserido = await produtoRepo.inserir(produto);

	console.log(produtoInserido);

    */
    
    
    /////////////////////////////////////////////////
	//Recuperar Todos os Produtos e Suas Categorias//
	/////////////////////////////////////////////////
		
	const todosProdutos: Array<Produto> = await produtoRepo.recuperarTodos();

	console.log(todosProdutos);

    ///////////////////////////////////////////////
	//Atualizar Produto - Sem Atulizar Categorias//
	///////////////////////////////////////////////

    /*
    const produto = {
        id: "f01dbd3a-d8ac-4f66-80bf-c04e56e3ef56",
        nome: "Toalha de Mesa Grande",
        descricao: "toalha de algodão",
        valor: 85
    }; 

    const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id,produto);
    */

    ///////////////////
	//Deletar Produto//
	///////////////////
		
	//const produtoDeletado: boolean = await produtoRepo.deletar("83d2e682-1f02-4556-867f-4de075cd3cb8");

	//console.log(produtoDeletado);

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
       if (error instanceof DomainException) {
           console.log('Execeção de Dóminio');
           console.log(error.message);
       }
       else {
           console.log('Outras Exceções');
           console.log(error.message);
       }
       await prisma.$disconnect()
       process.exit(1)
   })