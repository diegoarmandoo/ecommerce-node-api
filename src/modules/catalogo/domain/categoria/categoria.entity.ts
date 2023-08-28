import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { Entity } from "@shared/domain/entity";
import { NomeCategoriaNuloOuIndefinido, NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "./categoria.exception";
import { CriarCategoriaProps, ICategoria, RecuperarCategoriaProps } from "./categoria.types";

class Categoria extends Entity<ICategoria> implements ICategoria {

    ///////////////////////
	//Atributos de Classe//
	///////////////////////

	private _nome: string;

    ///////////////
	//Gets e Sets//
	///////////////
   
    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new NomeCategoriaNuloOuIndefinido();
        }

        if (value.trim().length < 3) {
            throw new NomeCategoriaTamanhoMinimoInvalido();
        }

        if (value.trim().length > 50) {
            throw new NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = value;
    }

    //////////////
	//Construtor//
	//////////////

    private constructor(categoria:ICategoria){
        super(categoria.id);
        this.nome = categoria.nome;
    }

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarCategoriaProps): Categoria {
        let { nome } = props;
        return new Categoria({ nome });
    }

    public static recuperar(props: RecuperarCategoriaProps): Categoria {
        return new Categoria(props);
    }

    ///////////
    //Métodos//
    ///////////

    public toDTO(): ICategoria {
        return CategoriaMap.toDTO(this);
    }

}

export { Categoria };
