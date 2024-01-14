import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const inserirCategoriaSchema = z.object(
    {
        nome: z.string().min(3).max(50)
    }
).strict();

const validaInputInserirCategoriaMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => {
        try {
            inserirCategoriaSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputInserirCategoriaMiddleware as validaInputInserirCategoria }