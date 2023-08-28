import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { RecuperarCategoriaProps } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { DomainException } from "@shared/domain/domain.exception";
import { readFile, writeFile } from "fs";

try {

    ///////////////////
    //Criar Categoria//
    ///////////////////

    let categoria: Categoria;
    categoria = Categoria.criar({nome:'mesa'});
    console.log(categoria);

    ///////////////////////
    //Recuperar Categoria//
    ///////////////////////

    let propsCategoria: RecuperarCategoriaProps = {
        id:'6ad12850-abe4-49fe-967e-ab915cce9b3a',
        nome: 'cama'
    };
    let categoria2: Categoria = Categoria.recuperar(propsCategoria);
    console.log(categoria2);

    //////////////////////////////////////////////////////
    //Persistinto e Recuperando em Arquivo - File System//
    //////////////////////////////////////////////////////

    let arrayCategorias = [];
    arrayCategorias.push(categoria.toDTO());
	arrayCategorias.push(categoria2.toDTO());
    
    writeFile('categorias.json', JSON.stringify(arrayCategorias), function (error:any) {
        if (error) throw error;
        console.log('Arquivo Salvo com Sucesso!');
        readFile('categorias.json', (error, dadoGravadoArquivo) => {
            if (error) throw error;
            console.log('Leitura de Arquivo!');
            let categoriasSalvas: [] = JSON.parse(dadoGravadoArquivo.toString());
            categoriasSalvas.forEach(categoriaJSON => {
                console.log(categoriaJSON);
                console.log(CategoriaMap.toDomain(categoriaJSON));
            })
        });
    });
} 
catch (error:any) {
    if (error instanceof DomainException) {
        console.log('Execeção de Dóminio');
        console.log(error.message);
    }
    else {
        console.log('Outras Exceções');
        console.log(error.message);
    }
}
finally {
    console.log('Ação que deve ser executada em caso de sucesso e em caso de exceção');
}
