# Kanban Board
Bem-vindo ao Kanban Board, um projeto que simula o funcionamento de um board Kanban. Com esta aplicação, você pode:

- Visualizar tarefas de maneira intuitiva 🤓
- Alterar o status das tarefas arrastando e soltando os cards 🃏
- Criar novas tarefas facilmente 🎯

### Tecnologias Utilizadas
O Kanban Board foi desenvolvido com as seguintes tecnologias:

**Frontend:** Vite, React, TypeScript, TailwindCSS

**Backend:** PHP, Laravel

**Banco de Dados:** MySQL

**Autenticação:** Sistema simples com JWT

### Como Executar o Projeto
Siga as instruções abaixo para rodar o Kanban Board na sua máquina:

1. Clonar o Repositório
Primeiro, clone o repositório usando o seguinte comando:

``` bash
git clone https://github.com/colomeramonica/kanbam-board
```
 
2. Iniciar o Docker
Navegue até a pasta do projeto e inicie o Docker:

``` bash
cd kanban-board  
docker compose up -d
```

3. Configurar o Banco de Dados
Entre no container criado pelo Docker e atualize as dependências, além de inicializar o banco de dados:

``` bash
docker exec -it kanban_app /bin/bash  
composer install
php artisan migrate && php artisan db:seed
```
 
4. Instalar Dependências do Frontend
Saia do container e navegue até a pasta do frontend para instalar as dependências:

``` bash
cd client/  
npm install
npm run dev
```

### Acessando o Projeto
Após realizar os passos acima, o Kanban Board estará acessível nos seguintes endereços:

API: http://localhost:8000

Frontend: http://localhost:5173

#### Caso não seja possível acessar com o Docker, os comandos para execução seguem os mesmos fora do container.

#### Nesse caso, é necessário possuir o composer, Laravel e node instalados localmente
