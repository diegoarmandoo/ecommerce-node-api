import { DeletarCategoriaUseCase } from "@modules/catalogo/application/use-cases/deletar-categoria/deletar-categoria.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class DeletarCategoriaExpressController extends ExpressController {

    private _deletarCategoriaUseCase: DeletarCategoriaUseCase;   

    constructor(deletarCategoriaUseCase: DeletarCategoriaUseCase) {
        super();
        this._deletarCategoriaUseCase = deletarCategoriaUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const categoriaDeletada: boolean = await this._deletarCategoriaUseCase.execute(uuid);
            this.sendSuccessResponse(response,categoriaDeletada);
        } catch (error) {
            next(error);
        }
    }

}

export { DeletarCategoriaExpressController }