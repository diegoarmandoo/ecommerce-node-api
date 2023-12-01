import { RecuperarTodasCategoriasUseCase } from "@modules/catalogo/application/use-cases/recuperar-todas-categorias/recuperar-todas-categorias.use-case";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodasCategoriaExpressController extends ExpressController {

    private _recuperarTodasCategoriaUseCase: RecuperarTodasCategoriasUseCase;

    constructor(recuperarTodasCategoriaUseCase: RecuperarTodasCategoriasUseCase) {
        super();
        this._recuperarTodasCategoriaUseCase = recuperarTodasCategoriaUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listaCategoriasDTO: Array<ICategoria> = await this._recuperarTodasCategoriaUseCase.execute();
            this.sendSuccessResponse(response,listaCategoriasDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodasCategoriaExpressController }