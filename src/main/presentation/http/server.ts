import http from 'node:http';

const createHTTPServer = async (app: object): Promise<http.Server>  => {
    const httpServer: http.Server = http.createServer(app);
    return httpServer;
};

export { createHTTPServer }