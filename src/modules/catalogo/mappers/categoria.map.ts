import { Categoria } from "../domain/categoria.entity";
import { ICategoria, RecuperarCategoriaProps } from "../domain/categoria.types";

class CategoriaMap {

    public static toDTO(categoria: Categoria): ICategoria {
        return {
          id: categoria.id,
          nome: categoria.nome
        }
    }

    public static toDomain(categoria: RecuperarCategoriaProps): Categoria {
        return Categoria.recuperar(categoria);
    }

}

export { CategoriaMap }