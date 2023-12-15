import { HttpError } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

const errorResponderMiddleware = (error: HttpError, request: Request, response: Response, next: NextFunction) => {
    let statusCode = error.statusCode || 500;
    response.status(statusCode).json({
        name: error.name,
        statusCode: statusCode,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    });
}

export { errorResponderMiddleware as errorResponder }