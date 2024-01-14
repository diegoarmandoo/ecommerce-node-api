import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const atualizarCategoriaSchema = z.object(
    {
        id: z.string().uuid(),
        nome: z.string().min(3).max(50)
    }
).strict();

const validaInputAtualizarCategoriaMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => { 
        try {
            atualizarCategoriaSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputAtualizarCategoriaMiddleware as validaInputAtualizarCategoria }