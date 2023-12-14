import dotenv from 'dotenv';
import { createHTTPServer } from './presentation/http/server';
import { prisma } from '@main/infra/database/orm/prisma/client';
import { Application } from 'express';
import { createExpressApplication } from './presentation/http/app.express';
import { logger } from '@shared/helpers/logger.winston';

async function bootstrap() {

    logger.info(`Inicializando a API....🚀`);

    //Carrega variáveis de ambiente do arquivo .env
	dotenv.config();
    const api_name = process.env.API_NAME;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;
    logger.ok(`Carregando variáveis de ambiente do arquivo .env`);

    const app: Application = await createExpressApplication();
    logger.ok(`Aplicação Express Instanciada e Configurada`);

    const httpServer = await createHTTPServer(app);
    logger.ok('Servidor HTTP Instanciado e Configurado');

    httpServer.listen({ port: port }, async () => {
        logger.ok(`Servidor HTTP Pronto e Ouvindo em http://${host_name}:${port}`);
    });

    prisma.$connect().then(
        async () => {
            logger.ok(`Banco de Dados Conectado`);
        }
    );

}

bootstrap()
    .catch((error) => {
        logger.error(error.message);
    });