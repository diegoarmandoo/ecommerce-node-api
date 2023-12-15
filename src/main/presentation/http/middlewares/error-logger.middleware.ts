import { logger } from "@shared/helpers/logger.winston";
import { HttpError } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

const errorLoggerMiddleware = (error: HttpError, request: Request, response: Response, next: NextFunction) => {
    let statusCode = error.statusCode || 500;

    const logErro = JSON.stringify({
        name: error.name,
        statusCode: statusCode,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    }, null, 2);

    logger.error(logErro);

    next(error);
}

export { errorLoggerMiddleware as errorLogger }