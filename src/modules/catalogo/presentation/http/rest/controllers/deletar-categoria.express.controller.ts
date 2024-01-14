import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { DeletarCategoriaUseCase } from "@modules/catalogo/application/use-cases/deletar-categoria/deletar-categoria.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
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
            if (error instanceof CategoriaApplicationExceptions.CategoriaNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { DeletarCategoriaExpressController }