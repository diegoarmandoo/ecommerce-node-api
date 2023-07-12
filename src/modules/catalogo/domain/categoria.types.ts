//Todos os atributos/propriedades que uma categoria deve ter no sistema
//Auxilia na criação de invariantes e modelos ricos
interface ICategoria {
    id: string;
    nome:string;
}

//Atributos que são necessários para criar uma categoria
//Garantir a integridade dos dados de um objeto
type CriarCategoriaProps = Omit<ICategoria, "id">;

export {ICategoria , CriarCategoriaProps}