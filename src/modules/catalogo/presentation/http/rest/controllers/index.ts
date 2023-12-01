import { recuperarCategoriaPorIdUseCase, recuperarTodasCategoriasUseCase } from "@modules/catalogo/application/use-cases";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";
import { RecuperarTodasCategoriaExpressController } from "./recuperar-todas-categorias.express.controller";

const recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCase);
const recuperarTodasCategoriasController = new RecuperarTodasCategoriaExpressController(recuperarTodasCategoriasUseCase);

export {
    recuperarCategoriaPorIdController,
    recuperarTodasCategoriasController
}