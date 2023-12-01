import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { InserirCategoriaUseCase } from "./inserir-categoria.use-case";
import { CriarCategoriaProps, ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";

let categoriaRepositorioMock: MockProxy<ICategoriaRepository<Categoria>>;;
let inserirCategoriaUseCase: InserirCategoriaUseCase;

describe('Caso de Uso: Inserir Categoria', () => {

    beforeAll(async () => {
        categoriaRepositorioMock = mock<ICategoriaRepository<Categoria>>();
        inserirCategoriaUseCase = new InserirCategoriaUseCase(categoriaRepositorioMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(categoriaRepositorioMock);
    });

    test('Deve Inserir Uma Categoria', async () => {

        //Dado (Given)
        const categoriaInputDTO: CriarCategoriaProps = {
            nome: "Cama"
        };

        const categoria: Categoria = Categoria.criar(categoriaInputDTO);

        categoriaRepositorioMock.inserir.mockResolvedValue(categoria);

        //Quando (When)
		const categoriaOutputDTO: ICategoria = await inserirCategoriaUseCase.execute(categoria);

        //Então (Then)
		expect(categoriaOutputDTO).toBeDefined();
        expect(categoriaOutputDTO).toMatchObject(
            expect.objectContaining({
                id:expect.any(String),
                nome:expect.any(String)
            })
        );
        expect(categoriaRepositorioMock.inserir).toHaveBeenCalledTimes(1);

    });

});