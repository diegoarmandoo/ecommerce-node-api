import { Categoria } from "./modules/catalogo/domain/categoria.entity";
import { RecuperarCategoriaProps } from "./modules/catalogo/domain/categoria.types";
import { DomainException } from "./shared/domain/domain.exception";

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

} 
catch (error:any) {
    if (error instanceof DomainException) {
        console.log(error.message);
    }
    else {
        console.log(error.message);
    }
}
finally {
    console.log('Ação que deve ser executada em caso de sucesso e em caso de exceção');
}
