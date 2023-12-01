import express from 'express';
import { recuperarCategoriaPorIdController, recuperarTodasCategoriasController } from './controllers';

const categoriaRouter = express.Router();

categoriaRouter.get(
    '/:id',
    (request, response, next) =>  recuperarCategoriaPorIdController.recuperar(request, response, next)
)

categoriaRouter.get(
    '/',
    (request, response, next) =>  recuperarTodasCategoriasController.recuperar(request, response, next)
)

export { categoriaRouter };