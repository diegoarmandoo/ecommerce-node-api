import { RecuperarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-cases/recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { Request, Response } from "express";
import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { HttpError, HttpErrors } from "@shared/presentation/http/http.error";


let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recuperarCategoriaPorIdUseCaseMock:  MockProxy<RecuperarCategoriaPorIdUseCase>;
let recuperarCategoriaPorIdController: RecuperarCategoriaPorIdExpressController;

describe('Controller Express: Recuperar Categoria por ID', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recuperarCategoriaPorIdUseCaseMock = mock<RecuperarCategoriaPorIdUseCase>();
        recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recuperarCategoriaPorIdUseCaseMock);
    });

    test('Deve Recuperar Uma Categoria por UUID', async () => {

        //Dado (Given)
        const categoriaInputDTO: ICategoria = {
            id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
            nome: "Cama"
        }

        requestMock.params.id = categoriaInputDTO.id as string;
        recuperarCategoriaPorIdUseCaseMock.execute.mockResolvedValue(categoriaInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await recuperarCategoriaPorIdController.recuperar(requestMock, responseMock, nextMock);

        //Então (Then
		expect(recuperarCategoriaPorIdUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO.id);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(categoriaInputDTO);
        expect(nextMock).not.toHaveBeenCalled();

    });

    test('Deve Tratar uma Exceção de Categoria Não Encontrada', async () => {

        //Dado (Given)
        const categoriaInputDTO: ICategoria = {
            id: "80830927-8c3e-4db9-9ddf-30ea191f139b",
            nome: "Cama"
        }

        requestMock.params.id = categoriaInputDTO.id as string;
        recuperarCategoriaPorIdUseCaseMock.execute.mockRejectedValue(new CategoriaApplicationExceptions.CategoriaNaoEncontrada());
        responseMock.status.mockReturnThis();

        //Quando (When) 
        await recuperarCategoriaPorIdController.recuperar(requestMock, responseMock, nextMock);

        expect(recuperarCategoriaPorIdUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO.id);
        expect(nextMock).toHaveBeenCalled();
        expect(nextMock.mock.lastCall[0].name).toBe(HttpErrors.NotFoundError.name);

    });

});