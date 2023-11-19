import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { CriarCategoriaProps, ICategoria, RecuperarCategoriaProps } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";
import { IUseCase } from "@shared/application/use-case.interface";

class InserirCategoriaUseCase implements IUseCase<CriarCategoriaProps,ICategoria> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(categoriaProps: CriarCategoriaProps): Promise<ICategoria> {
        
        const categoria: Categoria = Categoria.criar(categoriaProps);

        const categoriaInserida = await this._categoriaRepositorio.inserir(categoria);

        return CategoriaMap.toDTO(categoriaInserida);
    }

}

export { InserirCategoriaUseCase }