import express from 'express';
import { atualizarCategoriaController, deletarCategoriaController, inserirCategoriaController, recuperarCategoriaPorIdController, recuperarTodasCategoriasController } from './controllers';
import { contentType } from '@main/presentation/http/middlewares/content-type.middleware';

const categoriaRouter = express.Router();

categoriaRouter.get(
    '/:id',
    (request, response, next) =>  recuperarCategoriaPorIdController.recuperar(request, response, next)
)

categoriaRouter.get(
    '/',
    (request, response, next) =>  recuperarTodasCategoriasController.recuperar(request, response, next)
)

categoriaRouter.post(
    '/',
    contentType,
    (request, response, next) =>  inserirCategoriaController.inserir(request, response, next)
)

categoriaRouter.put(
    '/:id',
    contentType,
    (request, response, next) =>  atualizarCategoriaController.atualizar(request, response, next)
)

categoriaRouter.delete(
    '/:id',
    (request, response, next) =>  deletarCategoriaController.deletar(request, response, next)
)

export { categoriaRouter };