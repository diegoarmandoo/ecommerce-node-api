import express, { Application } from "express";
import { apiv1Router } from "./rest/api.v1";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const createExpressApplication = async (): Promise<Application>  => {
    const app: Application = express();
    app.disable('x-powered-by');

    //Middlewares Integrados (Built-in)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Middlewares de Terceiros
    app.use(helmet());
    app.use(compression);
    app.use(morgan('tiny'));

    //Middleware Customizados

    //Middlewares de Rotas
    app.use('/api/v1', apiv1Router);

    //Middleware de Tratamento de Erros (Error Handling)

    return app;
}

export { createExpressApplication }