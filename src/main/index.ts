import dotenv from 'dotenv';
import { createHTTPServer } from './presentation/http/server';
import { prisma } from '@main/infra/database/orm/prisma/client';
import { Application } from 'express';
import { createExpressApplication } from './presentation/http/app.express';

async function bootstrap() {

    //Carrega variáveis de ambiente do arquivo .env
	dotenv.config();

    const api_name = process.env.API_NAME;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;

    console.log(`[${api_name}] 🚀 Inicializando a API....`);

    const app: Application = await createExpressApplication();
    console.log(`[${api_name}] Aplicação Express Instanciada e Configurada`);

    const httpServer = await createHTTPServer(app);
    console.log(`[${api_name}] Servidor HTTP foi Instanciado e Configurado`);

    httpServer.listen({ port: port }, async () => {
        console.log(`[${api_name}] ✅ Servidor HTTP pronto e ouvindo em http://${host_name}:${port}`);
    });

    prisma.$connect().then(
        async () => {
            console.log(`[${api_name}] ✅ Banco de dados conectado`);
        }
    );

}

bootstrap()
    .catch((error) => {
        console.error(error);
    });