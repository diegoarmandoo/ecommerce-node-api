Feature: Criar Categoria
    Como um <Administrador>
    Eu quero <Criar uma categoria>
    De modo que <Os produtos possam ser associados a uma ou mais categorias facilitando a organização e busca dos produtos> 

Scenario: Categoria válida (Padrão)
    Dado (Given) [Categoria válida]
    Quando (When) [Solicitar a Criação de uma Categoria]
    Então (Then) [A categoria deve ser criada corretamente]

Scenario: Categoria inválida - Nome da Categoria é nulo ou indefinido
    Dado [Uma categoria com nome nulo ou indefinido]
	Quando [Solicitar a Criação de uma Categoria]
	Então [Um erro informando que o nome da categoria é nulo ou indefinido deve ser apresentado]

Scenario: Categoria inválida - Nome da Categoria não atende o tamanho mínino (Execeção)
    Dado [Uma categoria com nome que não atende ao tamanho mínimo]
	Quando [Solicitar a Criação de uma Categoria]
	Então [Um erro informando que o nome da categoria não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Categoria inválida - Nome da Categoria não atende o tamanho máximo (Execeção)			
    Dado [Uma categoria com nome que não atende ao tamanho máximo]
    Quando [Solicitar a Criação de uma Categoria]
    Então [Um erro informando que o nome da categoria não possui um tamanho máximo válido deve ser apresentado]    