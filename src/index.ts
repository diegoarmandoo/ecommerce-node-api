import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { Produto } from '@modules/catalogo/domain/produto/produto.entity';
import { StatusProduto } from '@modules/catalogo/domain/produto/produto.types';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { ProdutoPrismaRepository } from '@modules/catalogo/infra/database/produto.prisma.repository';
import { DomainException } from '@shared/domain/domain.exception';
import { prisma } from '@main/infra/database/orm/prisma/client';
import { categoriaRepositorio as categoriaRepo } from '@modules/catalogo/infra/database';
import { produtoRepositorio as produtoRepo } from '@modules/catalogo/infra/database';
import { atualizarCategoriaUseCase, deletarCategoriaUseCase, inserirCategoriaUseCase, recuperarCategoriaPorIdUseCase, recuperarProdutoPorIdUseCase, recuperarTodasCategoriasUseCase } from '@modules/catalogo/application/use-cases';


async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado');
        }
    );

    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
    //console.log(await recuperarCategoriaPorIdUseCase.execute("80830927-8c3e-4db9-9ddf-30ea191f139b"));

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
    //console.log(await recuperarTodasCategoriasUseCase.execute());

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    //const existeCategoria: boolean = await categoriaRepo.existe("7061d559-ab25-4182-98ce-170afdf2acd2");

    //console.log(existeCategoria);

    /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    //console.log(await inserirCategoriaUseCase.execute({nome:'Cozinha Francesa'}));  

    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
    /*
    console.log(
        await atualizarCategoriaUseCase.execute({
            id: "3ef71a0e-752a-4d0e-9dc5-cb40eeb55e21",
            nome: "Co"
        })
    );
    */

    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    //console.log(await deletarCategoriaUseCase.execute("1f2c7f0d-d074-46f6-b835-ec1fed480363"));

    ////////////////////////////////
	//Recuperar Produto por UUID//
	////////////////////////////////
		
	console.log(await recuperarProdutoPorIdUseCase.execute("738f111b-eba1-457f-9552-5b5f28511d5d"));

    ///////////////////
	//Inserir Produto//
	///////////////////
	/*
    
    const categoria01: Categoria = Categoria.recuperar({
        id: "03f890b0-684a-44ba-a887-170e26bb2cd2",
        nome: 'Cozinha'
    });     

    const categoria02: Categoria = Categoria.recuperar({
        id: "fc762da1-8d2c-4ffa-9559-901db94cb92e",
        nome: 'Banho'
    })

    const produto: Produto = Produto.criar({
        nome:'Pano de Pratro',
        descricao:'Algodão fio 60',
        valor:30,
        categorias:[categoria01]
    });

	const produtoInserido = await produtoRepo.inserir(produto);

	console.log(produtoInserido);
    */

    

    /////////////////////////////////////////////////
	//Recuperar Todos os Produtos e Suas Categorias//
	/////////////////////////////////////////////////
		
	//const todosProdutos: Array<Produto> = await produtoRepo.recuperarTodos();

	//console.log(todosProdutos);

    ///////////////////////////////////////////////
	//Atualizar Produto - Sem Atulizar Categorias//
	///////////////////////////////////////////////

    /*
    const produto = {
        id: "7d6a14d5-02f3-4b6d-8cb8-8601ff151f10",
        nome: "Toalha de Cozinha",
        descricao: "toalha de algodão",
        valor: 200
    }; 

    const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id,produto);
    
    */
    ///////////////////
	//Deletar Produto//
	///////////////////
		
	//const produtoDeletado: boolean = await produtoRepo.deletar("7d6a14d5-02f3-4b6d-8cb8-8601ff151f10");

	//console.log(produtoDeletado);

    ////////////////////////////////////////////
	//Adicionar e Remover Categoria ao Produto//
	////////////////////////////////////////////
    
    //const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("737f111b-eba1-457f-9552-5b5f28511d5d");

    //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("03f890b0-684a-44ba-a887-170e26bb2cd2");

    //if (produtoRecuperado && categoriaRecuperada){

        //if (produtoRecuperado.adicionarCategoria(categoriaRecuperada)) {
        //    await produtoRepo.adicionarCategoria(produtoRecuperado,categoriaRecuperada);
        //}

       //if (produtoRecuperado.removerCategoria(categoriaRecuperada)) {
        //    await produtoRepo.removerCategoria(produtoRecuperado,categoriaRecuperada);
        //}

    //}

    //////////////////////////
    //Alterar Status Produto//
    //////////////////////////

    //const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("ace8780f-1aac-4219-9b36-e13b60159e4b");

    //if (produtoRecuperado) {
    //    const alterouStatusProduto: boolean = await produtoRepo.alterarStatus(produtoRecuperado,StatusProduto.ATIVO)
    //    console.log(alterouStatusProduto);
    //}

    ////////////////////////////////////
	//Recuperar Produtos por Categoria//
	////////////////////////////////////
			
	//const todosProdutosPorCategoria: Array<Produto> = await produtoRepo.recuperarPorCategoria("03f890b0-684a-44ba-a887-170e26bb2cd2");

	//console.log(todosProdutosPorCategoria);
    

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