import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";
import { Entity } from "@shared/domain/entity";
import { CategoriaExceptions } from "./categoria.exception";
import { CriarCategoriaProps, ICategoria, RecuperarCategoriaProps } from "./categoria.types";

class Categoria extends Entity<ICategoria> implements ICategoria {

    ///////////////////////
	//Atributos de Classe//
	///////////////////////

	private _nome: string;
    private _dataCriacao?: Date | undefined;
	private _dataAtualizacao?: Date | undefined;

    //////////////
    //Constantes//
    //////////////

    public static readonly TAMANHO_MINIMO_NOME = 3;
    public static readonly TAMANHO_MAXIMO_NOME = 50;
    
    ///////////////
	//Gets e Sets//
	///////////////
   
    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {

        const tamanhoNome = nome.trim().length;

        if (nome === null || nome === undefined) {
            throw new CategoriaExceptions.NomeCategoriaNuloOuIndefinido();
        }

        if (tamanhoNome < Categoria.TAMANHO_MINIMO_NOME) {
            throw new CategoriaExceptions.NomeCategoriaTamanhoMinimoInvalido();
        }

        if (tamanhoNome > Categoria.TAMANHO_MAXIMO_NOME) {
            throw new CategoriaExceptions.NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = nome;
    }

    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }

    private set dataCriacao(dataCriacao: Date | undefined) {
        this._dataCriacao = dataCriacao;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }

    private set dataAtualizacao(dataAtualizacao: Date | undefined) {
        this._dataAtualizacao = dataAtualizacao;
    }

    //////////////
	//Construtor//
	//////////////

    private constructor(categoria:ICategoria){
        super(categoria.id);
        this.nome = categoria.nome;
        this.dataCriacao = categoria.dataCriacao;
        this.dataAtualizacao = categoria.dataAtualizacao;
    }

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarCategoriaProps): Categoria {
        return new Categoria(props);
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
