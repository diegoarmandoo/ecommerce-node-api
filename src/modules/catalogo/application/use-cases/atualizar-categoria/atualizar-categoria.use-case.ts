import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { RecuperarCategoriaProps } from "@modules/catalogo/domain/categoria/categoria.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoriaApplicationExceptions } from "../../exceptions/categoria.application.exception";

class AtualizarCategoriaUseCase implements IUseCase<RecuperarCategoriaProps, boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(categoriaProps: RecuperarCategoriaProps): Promise<boolean> {
        
        const existeCategoria: boolean = await this._categoriaRepositorio.existe(categoriaProps.id);

        if (!existeCategoria){
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada();
        }

        const categoria: Categoria = Categoria.recuperar(categoriaProps);

        const atualizouCategoria: boolean = await this._categoriaRepositorio.atualizar(categoria.id, categoria);

        return atualizouCategoria;

    }

}

export { AtualizarCategoriaUseCase }