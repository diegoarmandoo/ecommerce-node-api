import { NextFunction, Request, Response } from "express";

const allowedContentTypes = ['application/json'];

const contentTypeMiddleware = (request: Request, response: Response, next: NextFunction) => {

    const contentType = request.headers['content-type'];

    if (!contentType || !allowedContentTypes.includes(contentType)) {
        return response.status(415).send('Tipo de Mídia Não Suportado');
    }

    next();
}

export { contentTypeMiddleware as contentType }