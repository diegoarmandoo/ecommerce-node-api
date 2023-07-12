import { Categoria } from "./modules/catalogo/domain/categoria.entity";

let categoria = Categoria.criar({nome:'teste'});
console.log(categoria);