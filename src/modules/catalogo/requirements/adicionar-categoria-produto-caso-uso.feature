Feature: Adicionar categoria ao produto
    Como um <Administrador>
    Eu quero <Adicionar uma categoria ao produto>
    De modo que <O produto possa ter categorias condizantes com sua natureza>

Scenario: Categoria válida e produto válido apto a ter uma nova categoria adicionada (Padrão)
    Dado (Given) [
        Um produto válido apto a ter uma nova categoria adicionada - Ter no mínimo (1) e no máximo (2) categoria(s) já adicionada(s)
        Uma categoria válida
    ]
    Quando (When) [Solicitar a adição da categoria ao produto]
    Então (Then) [A categoria deve ser adicionada e retornada]

Scenario: Categoria válida e produto válido inapto a ter uma nova categoria adicionada - quantidade máxima de categorias
    Dado (Given) [
        Um produto válido inapto a ter uma nova categoria adicionada - Ter (3) categorias já adicionadas
        Uma categoria válida
    ]
    Quando (When) [Solicitar a adição da categoria ao produto]
    Então (Then) [Um erro informando que o produto já possui número máximo de categorias adicionadas]

Scenario: Categoria válida e produto válido inapto a ter uma categoria adicionada - categoria já adicionada
    Dado (Given) [
        Um produto válido inapto a ter uma categoria adicionada - categoria já adicionada
        Uma categoria válida
    ]
    Quando (When) [Solicitar a adição da categoria ao produto]
    Então (Then) [Um erro informando que o produto já possui possui a categoria adicionada]