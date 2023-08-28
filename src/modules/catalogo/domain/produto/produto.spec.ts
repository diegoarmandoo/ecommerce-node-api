import { describe, expect, test } from "vitest";
import { Categoria } from "../categoria/categoria.entity";
import { CriarProdutoProps } from "./produto.types";
import { Produto } from "./produto.entity";
import { DescricaoProdutoTamanhoMaximoInvalido, DescricaoProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido, NomeProdutoTamanhoMinimoInvalido, QtdMaximaCategoriasProdutoInvalida, QtdMinimaCategoriasProdutoInvalida, ValorMinimoProdutoInvalido } from "./produto.exception";

//Suite de Testes de Unidade - Entidade de Domínio
//Usando o 'describe', você pode definir como um conjunto de testes ou benchmarks relacionados
describe('Entidade de Domínio: Criar Produto', () => {
    
    //Teste define um conjunto de expectativas relacionadas. 
    test('Deve Criar Um Produto Válido', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho' }));

        //Dado (Given)
        const produtoValido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de Algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(Produto.criar(produtoValido))
            .to.be.instanceof(Produto);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Mínimo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho' }));

        //Dado (Given)
        //Nome menor que cinco caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toa',
            descricao: 'Toalha de Algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Máximo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho' }));

        //Dado (Given)
        //Nome maior que cinquenta caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc',
            descricao: 'Toalha de Algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido);

    });
    
    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Mínimo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho' }));

        //Dado (Given)
        //Descrição menor que dez caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMinimoInvalido);

    });
    
    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Máximo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho' }));

        //Dado (Given)
        //Descrição maior que duzentos caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijasc',
            valor: 10,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMaximoInvalido);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Valor Mínimo Inválido', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho' }));

        //Dado (Given)
        //Valor mínimo menor que 0
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de Banho',
            valor: -50,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ValorMinimoProdutoInvalido);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Número Mínimo de Categorias Inválido', async () => {

        let categoriasQtdMinInvalidas: Array<Categoria> = [];

        //Dado (Given)
        //Nenhuma categoria é atribuida - menor que 1
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de Banho',
            valor: 10,
            categorias: categoriasQtdMinInvalidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMinimaCategoriasProdutoInvalida);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Número Máximo de Categorias Inválido', async () => {

        let categoriasQtdMaxInvalidas: Array<Categoria> = [];
        categoriasQtdMaxInvalidas.push(Categoria.criar({ nome: 'Cama' }));
        categoriasQtdMaxInvalidas.push(Categoria.criar({ nome: 'Mesa' }));
        categoriasQtdMaxInvalidas.push(Categoria.criar({ nome: 'Banho' }));
        categoriasQtdMaxInvalidas.push(Categoria.criar({ nome: 'Enxoval' }));

        //Dado (Given)
        //4 categorias é atribuidas - maior que 3
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de Banho',
            valor: 10,
            categorias: categoriasQtdMaxInvalidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMaximaCategoriasProdutoInvalida);

    });
    
});