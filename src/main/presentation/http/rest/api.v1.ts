import { categoriaRouter } from '@modules/catalogo/presentation/http/rest/categoria.routes';
import express, { Router } from 'express';

const apiv1Router: Router = express.Router();

apiv1Router.use(
    '/categorias',
    categoriaRouter
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