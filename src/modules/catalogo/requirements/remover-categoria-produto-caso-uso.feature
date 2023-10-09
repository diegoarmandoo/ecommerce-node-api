Feature: Remover Categoria do Produto
    Como um <Administrador>
    Eu quero <Remover uma categoria do produto>
    De modo que <O produto possa estar com suas categorias corretas>

Scenario: Categoria válida e produto válido apto a ter uma categoria removida (Padrão)
    Dado (Given) [
        Um produto válido apto a ter uma categoria removida - Ter no mínimo (2) e no máximo (3) categorias já adicionadas
        Uma categoria válida
    ]
    Quando (When) [Solicitar a remoção da categoria do produto]
    Então (Then) [A categoria deve ser removida corretamente e retornada]

Scenario: Categoria válida e produto válido inapto a ter uma categoria removida - quantidade mínima de categorias
    Dado (Given) [
        Um produto válido inapto a ter uma categoria removida - Ter apenas (1) categoria adicionada
        Uma categoria válida
    ]
    Quando (When) [Solicitar a remoção da categoria do produto]
    Então (Then) [Um erro informando que o produto já possui número mínimo de categorias]

Scenario: Categoria válida e produto válido inapto a ter uma categoria removida - categoria não associada ao produto
    Dado (Given) [
        Um produto válido inapto a ter uma categoria removida - categoria não associada ao produto
        Uma categoria válida
    ]
    Quando (When) [Solicitar a remoção da categoria do produto]
    Então (Then) [Um erro informando que o produto não possui a categoria informada a ser removida]  