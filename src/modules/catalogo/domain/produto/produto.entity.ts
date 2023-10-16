import { Entity } from "@shared/domain/entity";
import { ProdutoMap } from "../../infra/mappers/produto.map";
import { Categoria } from "../categoria/categoria.entity";
import { ProdutoExceptions } from "./produto.exception";
import { CriarProdutoProps, IProduto, RecuperarProdutoProps, StatusProduto } from "./produto.types";
import { RecuperarCategoriaProps } from "../categoria/categoria.types";

class Produto extends Entity<IProduto> implements IProduto {

    ///////////////////////
    //Atributos de Classe//
    ///////////////////////

    private _nome: string;
    private _descricao: string;
    private _valor: number;
    private _categorias: Array<Categoria>;
    private _dataCriacao?: Date | undefined; 
	private _dataAtualizacao?: Date | undefined; 
	private _dataExclusao?: Date | null | undefined;
    private _status?: StatusProduto | undefined;
    
    //////////////
	//Constantes//
	//////////////

    public static readonly TAMANHO_MINIMO_NOME = 5;
	public static readonly TAMANHO_MAXIMO_NOME = 50;
    public static readonly TAMANHO_MINIMO_DESCRICAO = 10;
	public static readonly TAMANHO_MAXIMO_DESCRICAO = 200;
    public static readonly VALOR_MINIMO = 0;
    public static readonly QTD_MINIMA_CATEGORIAS = 1; 
    public static readonly QTD_MAXIMA_CATEGORIAS = 3;
    
    ///////////////
    //Gets e Sets//
    ///////////////

    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {

        const tamanhoNome = nome.trim().length;
        
        if (tamanhoNome < Produto.TAMANHO_MINIMO_NOME) {
            throw new ProdutoExceptions.NomeProdutoTamanhoMinimoInvalido();
        }

        if (tamanhoNome > Produto.TAMANHO_MAXIMO_NOME) {
            throw new ProdutoExceptions.NomeProdutoTamanhoMaximoInvalido();
        }

        this._nome = nome;
    }
    
    public get descricao(): string {
        return this._descricao;
    }

    private set descricao(descricao: string) {

        const tamanhoDescricao = descricao.trim().length;

        if (tamanhoDescricao < Produto.TAMANHO_MINIMO_DESCRICAO) {
            throw new ProdutoExceptions.DescricaoProdutoTamanhoMinimoInvalido();
        }

        if (tamanhoDescricao > Produto.TAMANHO_MAXIMO_DESCRICAO) {
            throw new ProdutoExceptions.DescricaoProdutoTamanhoMaximoInvalido();
        }

        this._descricao = descricao;
    }

    public get valor(): number {
        return this._valor;
    }

    private set valor(valor: number) {

        if (valor < Produto.VALOR_MINIMO) {
            throw new ProdutoExceptions.ValorMinimoProdutoInvalido();
        }

        this._valor = valor;
    }

    public get categorias(): Array<Categoria> {
        return this._categorias;
    }

    private set categorias(categorias: Array<Categoria>) {

        const qtdCategorias = categorias.length;

        if (qtdCategorias < Produto.QTD_MINIMA_CATEGORIAS){
            throw new ProdutoExceptions.QtdMinimaCategoriasProdutoInvalida();
        }

        if (qtdCategorias > Produto.QTD_MAXIMA_CATEGORIAS){
            throw new ProdutoExceptions.QtdMaximaCategoriasProdutoInvalida();
        }

        this._categorias = categorias;
    }

    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }

    private set dataCriacao(value: Date | undefined) {
        this._dataCriacao = value;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }

    private set dataAtualizacao(value: Date | undefined) {
        this._dataAtualizacao = value;
    }

    public get dataExclusao(): Date | null | undefined {
        return this._dataExclusao;
    }

    private set dataExclusao(value: Date | null | undefined) {
        this._dataExclusao = value;
    }

    public get status(): StatusProduto | undefined {
        return this._status;
    }

    private set status(value: StatusProduto | undefined) {
        this._status = value;
    }
    
    //////////////
    //Construtor//
    //////////////

    private constructor(produto:IProduto){
        super(produto.id);
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.valor = produto.valor;
        this.categorias = produto.categorias.map((categoria) => { return Categoria.recuperar(categoria as RecuperarCategoriaProps)});
        this.dataCriacao = produto.dataCriacao;
		this.dataAtualizacao = produto.dataAtualizacao;
		this.dataExclusao = produto.dataExclusao;
        this.status = produto.status;
    }

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarProdutoProps): Produto {
        return new Produto(props);
    }

    public static recuperar(props: RecuperarProdutoProps): Produto {
        return new Produto(props);
    }

    ///////////
    //Métodos//
    ///////////

    public toDTO(): IProduto {
        return ProdutoMap.toDTO(this);
    }

    public estaDeletado(): boolean {
        return this.dataExclusao !== null ? true : false;
    }

    public quantidadeCategorias(): number {
        return this.categorias.length;
    }

    public possuiCategoria(categoria: Categoria): boolean {

        const categoriaExistente = this.categorias.find((categoriaExistente) => categoriaExistente.id === categoria.id);

        if (categoriaExistente) {
            return true;
        }
        return false;
    }

    public adicionarCategoria(categoria: Categoria): Categoria {
        if (this.quantidadeCategorias() >= Produto.QTD_MAXIMA_CATEGORIAS){
            throw new ProdutoExceptions.ProdutoJaPossuiQtdMaximaCategorias();
        }

        if (this.possuiCategoria(categoria)) {
            throw new ProdutoExceptions.ProdutoJaPossuiCategoriaInformada();
        }

        this.categorias.push(categoria);
        return categoria;
    }

    public removerCategoria(categoria: Categoria): Categoria {

        const qtdCategoriasDoProduto: number = this.quantidadeCategorias();

        if (qtdCategoriasDoProduto <= Produto.QTD_MINIMA_CATEGORIAS) {
            throw new ProdutoExceptions.ProdutoJaPossuiQtdMinimaCategorias();
        }

        const produtoNaoPossuiCategoria: boolean = !this.possuiCategoria(categoria);

        if (produtoNaoPossuiCategoria) {
            throw new ProdutoExceptions.ProdutoNaoPossuiCategoriaInformada();
        }

        //Removendo uma categoria do array
        this.categorias.filter((categoriaExistente, index, arrayCategorias) => {
            if (categoriaExistente.id === categoria.id) {
                arrayCategorias.splice(index, 1)
            }
        });
        return categoria;
    }


}

export { Produto };

