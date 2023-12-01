import { RecuperarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-cases/recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarCategoriaPorIdExpressController extends ExpressController {

    private _recuperarCategoriaPorIdUseCase: RecuperarCategoriaPorIdUseCase;

    constructor(recuperarCategoriaPorIdUseCase: RecuperarCategoriaPorIdUseCase) {
        super();
        this._recuperarCategoriaPorIdUseCase = recuperarCategoriaPorIdUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const categoriaOutputDTO: ICategoria = await this._recuperarCategoriaPorIdUseCase.execute(uuid);
            this.sendSuccessResponse(response,categoriaOutputDTO);
        }
        catch (error) {
            next(error);
        }
    }

}

export { RecuperarCategoriaPorIdExpressController }