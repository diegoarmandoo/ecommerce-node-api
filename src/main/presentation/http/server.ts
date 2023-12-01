import http from 'node:http';

const createHTTPServer = async (): Promise<http.Server>  => {
    const httpServer: http.Server = http.createServer(
        function (request, response) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<html><body><p>Hello, Servidor Web com Node.js</p></body></html>');
            response.end();
        }
    );
    return httpServer;
};

export { createHTTPServer }