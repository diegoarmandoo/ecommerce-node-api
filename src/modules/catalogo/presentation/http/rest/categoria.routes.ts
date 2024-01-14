import express from 'express';
import { atualizarCategoriaController, deletarCategoriaController, inserirCategoriaController, recuperarCategoriaPorIdController, recuperarTodasCategoriasController } from './controllers';
import { contentType } from '@main/presentation/http/middlewares/content-type.middleware';
import { validaInputInserirCategoria } from '../middlewares/valida-input-inserir-categoria.middleware';
import { validaInputAtualizarCategoria } from '../middlewares/valida-input-atualizar-categoria.middleware';

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
    validaInputInserirCategoria,
    (request, response, next) =>  inserirCategoriaController.inserir(request, response, next)
)

categoriaRouter.put(
    '/:id',
    contentType,
    validaInputAtualizarCategoria,
    (request, response, next) =>  atualizarCategoriaController.atualizar(request, response, next)
)

categoriaRouter.delete(
    '/:id',
    (request, response, next) =>  deletarCategoriaController.deletar(request, response, next)
)

export { categoriaRouter };