import dotenv from 'dotenv';
import { createHTTPServer } from './presentation/http/server';

async function bootstrap() {

    //Carrega variáveis de ambiente do arquivo .env
	dotenv.config();

    const api_name = process.env.API_NAME;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;

    console.log(`[${api_name}] 🚀 Inicializando a API....`);

    const httpServer = await createHTTPServer();

    httpServer.listen({ port: port }, async () => {
        console.log(`[${api_name}] ✅ Servidor HTTP pronto e ouvindo em http://${host_name}:${port}`);
    });

}

bootstrap()
    .catch((error) => {
        console.error(error);
    });