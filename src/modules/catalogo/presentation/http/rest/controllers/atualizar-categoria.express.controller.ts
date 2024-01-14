import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { AtualizarCategoriaUseCase } from "@modules/catalogo/application/use-cases/atualizar-categoria/atualizar-categoria.use-case";
import { RecuperarCategoriaProps } from "@modules/catalogo/domain/categoria/categoria.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AtualizarCategoriaExpressController extends ExpressController {

    private _atualizarCategoriaUseCase: AtualizarCategoriaUseCase;

    constructor(atualizarCategoriaUseCase: AtualizarCategoriaUseCase) {
        super();
        this._atualizarCategoriaUseCase = atualizarCategoriaUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const categoriaInputDTO: RecuperarCategoriaProps = request.body as RecuperarCategoriaProps;
            const categoriaAtualizada: boolean = await this._atualizarCategoriaUseCase.execute(categoriaInputDTO);
            this.sendSuccessResponse(response,categoriaAtualizada);
        } catch (error) {
            if (error instanceof CategoriaApplicationExceptions.CategoriaNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AtualizarCategoriaExpressController }