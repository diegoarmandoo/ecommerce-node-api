import express, { Router } from 'express';

const apiv1Router: Router = express.Router();

apiv1Router.use(
    '/categorias',
    function (request, response, next) {
        response.json({"entidade":"Categoria"});
    } 
);

apiv1Router.use(
    '/produtos',
    function (request, response, next) {
        response.json({"entidade":"Produtos"});
    }  
);

apiv1Router.use(
    '/usuarios',
    function (request, response, next) {
        response.json({"entidade":"Usuários"});
    }  
);

apiv1Router.use(
    '/pedidos',
    function (request, response, next) {
        response.json({"entidade":"Pedidos"});
    }  
);

export { apiv1Router }