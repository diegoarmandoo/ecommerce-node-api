import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { Request, Response } from "express";
import { CriarCategoriaProps, ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { InserirCategoriaExpressController } from "./inserir-categoria.express.controller";
import { InserirCategoriaUseCase } from "@modules/catalogo/application/use-cases/inserir-categoria/inserir-categoria.use-case";


let inserirCategoriaUseCaseMock:  MockProxy<InserirCategoriaUseCase>;
let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let inserirCategoriaController: InserirCategoriaExpressController;

describe('Controller Express: Inserir Categoria por ID', () => {

    beforeAll(async () => {
        inserirCategoriaUseCaseMock = mock<InserirCategoriaUseCase>();
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        inserirCategoriaController = new InserirCategoriaExpressController(inserirCategoriaUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(inserirCategoriaUseCaseMock);
    });

    test('Deve Inserir Uma Categoria por UUID', async () => {

        //Dado (Given)
        const categoriaInputDTO: CriarCategoriaProps = {
            nome: "Cama"
        };

        requestMock.body = categoriaInputDTO;
        inserirCategoriaUseCaseMock.execute.mockResolvedValue(categoriaInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await inserirCategoriaController.inserir(requestMock, responseMock, nextMock);

        //Então (Then)
        expect(inserirCategoriaUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(categoriaInputDTO);
        expect(nextMock).not.toHaveBeenCalled();
        
    });

});