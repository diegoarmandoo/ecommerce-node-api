import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoriaApplicationExceptions } from "../../exceptions/categoria.application.exception";

class DeletarCategoriaUseCase implements IUseCase<string,boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {
      
        const existeCategoria: boolean = await this._categoriaRepositorio.existe(uuid);

        if (!existeCategoria){
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada();
        }

        const deletouCategoria:boolean = await this._categoriaRepositorio.deletar(uuid);

        return deletouCategoria;

    }

}

export { DeletarCategoriaUseCase }