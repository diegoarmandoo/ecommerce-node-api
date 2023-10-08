import { IDatasControle, KeysDatasControle } from "@shared/domain/datas.types";

//Todos os atributos/propriedades que uma categoria deve ter no sistema
//Auxilia na criação de invariantes e modelos ricos
interface ICategoria extends IDatasControle {
    id?: string;
    nome:string;
}

//Atributos que são necessários para criar uma categoria
//Garantir a integridade dos dados de um objeto
type CriarCategoriaProps = Omit<ICategoria, "id" | KeysDatasControle>;

//Atributos que são necessários para recuperar uma categoria
type RecuperarCategoriaProps = ICategoria & {
    id: NonNullable<ICategoria['id']>
}

export {
    ICategoria , 
    CriarCategoriaProps,
    RecuperarCategoriaProps
}