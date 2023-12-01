import http from 'node:http';
import express, { Application } from 'express';
import morgan from 'morgan';
import { apiv1Router } from './rest/api.v1';

const app: Application = express();

const createHTTPServer = async (): Promise<http.Server>  => {
    app.disabled('x-powered-by');
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api/v1', apiv1Router);
    const httpServer: http.Server = http.createServer(app);
    return httpServer;
};

export { createHTTPServer }