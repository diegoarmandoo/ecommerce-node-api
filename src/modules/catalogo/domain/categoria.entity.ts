import { ICategoria, CriarCategoriaProps } from "./categoria.types";
import { NomeCategoriaNuloOuIndefinido, NomeCategoriaTamanhoMinimoInvalido, NomeCategoriaTamanhoMaximoInvalido } from "./categoria.exception";

class Categoria implements ICategoria {

    ///////////////////////
	//Atributos de Classe//
	///////////////////////

    private _id: string;
	private _nome: string;

    ///////////////
	//Gets e Sets//
	///////////////

    public get id(): string {
        return this._id;
    }

    private set id(value: string) {
        this._id = value;
    }

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
        this.id = categoria.id;
        this.nome = categoria.nome;
    }

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarCategoriaProps): Categoria {
        let id = "12345"; //Refatorar para gerar id com UUID
        let { nome } = props;
        return new Categoria({id, nome});
    }

}

export { Categoria }