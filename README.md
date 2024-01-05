# Aplicativo de Tabela Dinâmica com React, Bootstrap, Sass, Axios e outras bibliotecas

Este é um aplicativo de tabela dinâmica construído com React, Bootstrap, Sass, Axios e outras bibliotecas. Ele permite visualizar e interagir com dados de produtos de maquiagem obtidos a partir da [Makeup API](https://makeup-api.herokuapp.com/).

## Funcionalidades

- **Tabela Dinâmica:** Exibe os dados dos produtos em uma tabela com recursos de paginação, filtragem e ordenação.

- **Filtragem:** Permite filtrar os dados com base em valores específicos em colunas selecionadas.

- **Ordenação:** Possui a capacidade de ordenar os dados com base em colunas escolhidas, em ordem ascendente ou descendente.

- **Agrupamento de Colunas:** Oferece a opção de selecionar quais colunas deseja exibir na tabela.

- **Pesquisa:** Inclui uma barra de pesquisa para filtrar dados de forma rápida e eficiente.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construir interfaces de usuário.
- **Bootstrap:** Framework de design para estilização e componentes.
- **Sass:** Pré-processador CSS para estilização mais avançada.
- **Axios:** Biblioteca para realizar requisições HTTP no navegador e Node.js.
- **React Icons:** Biblioteca para ícones em React.
- **Bootstrap Table:** Extensão do Bootstrap para tabelas interativas.
- **React Bootstrap:** Componentes Bootstrap adaptados para React.
- **TypeScript:** Superset JavaScript com tipagem estática.

## Componentes

### `TableComponent`

O componente principal responsável por renderizar a tabela. Ele inclui funcionalidades como paginação, filtragem e ordenação.

### `TableFilter`

Componente utilizado para realizar a filtragem e ordenação dos dados na tabela.

### `TablePagination`

Componente que fornece os controles de paginação, permitindo a navegação entre as diferentes páginas de dados.

### `Grouping`

Componente responsável por agrupar os dados da tabela com base em uma coluna escolhida pelo usuário.

### `Search`

Componente que fornece uma barra de pesquisa para filtrar rapidamente os dados da tabela.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- `src/`
  - `components/`: Contém os componentes React utilizados no aplicativo.
  - `context/`: Armazena o contexto React utilizado para compartilhar estados globais entre os componentes.
  - `styles/`: Contém os arquivos Sass para estilização.

## Instruções de Uso

1. Clone o repositório: `git clone https://github.com/IzamaraJordao/my-app`

2. Instale as dependências: `npm install`

3. Execute o aplicativo: `npm start`

4. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).
