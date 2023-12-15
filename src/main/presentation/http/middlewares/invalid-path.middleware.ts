import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

//Lança um erro 404 para caminhos indefinidos que vai ser tratado pelos middlewares de erros (log de erro e o responder de erro)
const invalidPathMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const error = new HttpErrors.NotFoundError();
    next(error);
}

export { invalidPathMiddleware as invalidPath }