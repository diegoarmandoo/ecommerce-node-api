import { Response } from "express";

abstract class ExpressController {

    protected sendSuccessResponse(response: Response, data: any, status = 200) {
        response.status(status).json(data);
    }

    protected sendErrorResponse(response: Response, error: Error, status = 500) {
        response.status(status).json({ error: error.message });
    }

    protected sendNotFoundResponse(response: Response, message = 'Not found') {
        response.status(404).json({ error: message });
    }

}

export { ExpressController }