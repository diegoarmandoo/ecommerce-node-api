Feature: Criar Produto
	Como um <Administrador>
	Eu quero <Criar um produto>
	De modo que <O produto possa ser comercializado eletrônicamente>

Scenario: Produto válido (Padrão)
	Dado (Given) [Produto válido]
	Quando (When) [Solicitar a criação de um produto]
	Então (Then) [O Produto deve ser criado corretamente]

Scenario: Produto inválido - Nome do produto não atende o tamanho mínimo (5) (Execeção)
	Dado [Um produto com nome que não atende ao tamanho mínimo]
	Quando [Solicitar a criação de um produto]
	Então [Um erro informando que o nome do produto não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Produto inválido - Nome do produto não atende o tamanho máximo (50)  (Execeção)
	Dado [Um produto com nome que não atende ao tamanho máximo]
	Quando [Solicitar a criação de um produto]
	Então [Um erro informando que o nome do produto não possui um tamanho máximo válido deve ser apresentado]

Scenario: Produto inválido - Descrição do produto não atende o tamanho mínimo (10) (Execeção)
    Dado [Um produto com descrição que não atende ao tamanho mínimo]
    Quando [Solicitar a criação de um produto]
    Então [Um erro informando que o descrição do produto não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Produto inválido - Descrição do produto não atende o tamanho máximo (200) (Execeção)
	Dado [Um produto com descrição que não atende ao tamanho máximo]
	Quando [Solicitar a criação de um produto]
	Então [Um erro informando que o descrição do produto não possui um tamanho máximo válido deve ser apresentado]

Scenario: Produto inválido - Valor do produto não atende ao valor mínimo (0) (Execeção)
	Dado [Um produto com valor que não atende ao valor mínimo]
	Quando [Solicitar a criação de um produto]
	Então [Um erro informando que o valor do produto não possui um valor mínimo válido deve ser apresentado]

Scenario: Produto inválido - Produto não tem um número mínimo válido de categorias (1) (Execeção)
    Dado [Um produto com um número mínimo inválido de categorias]
    Quando [Solicitar a criação de um produto]
    Então [Um erro informando que o produto não tem um número mínimo válido de categorias]

Scenario: Produto inválido - Produto não tem um número máximo válido de categorias (3) (Execeção)
    Dado [Um produto com um número máximo inválido de categorias]
    Quando [Solicitar a criação de um produto]
    Então [Um erro informando que o produto não tem um número máximo válido de categorias]