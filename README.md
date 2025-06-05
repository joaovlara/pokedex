
# Pokédex React

## Descrição

Este projeto é uma interface web desenvolvida em React que se conecta à API pública PokeAPI. A aplicação exibe uma tabela/lista de Pokémons que permite carregar mais resultados progressivamente, tambem possui funcionalidades de busca por nome ou ID.

O usuário pode favoritar Pokémons tanto diretamente pelos cards na lista quanto pelo modal com informações detalhadas do Pokémon. Os Pokémons favoritados são armazenados no armazenamento local (localStorage) do navegador, garantindo a persistência dos dados mesmo após o fechamento ou atualização da página.

A interface é direta e intuitiva, com um design moderno e objetivo, além de ser responsiva para funcionar bem em diferentes tamanhos de tela, desde dispositivos móveis até desktops.

O projeto foi desenvolvido com React e Axios para consumo da API, estruturado de forma modular para facilitar manutenções e futuras atualizações em escala.

---

## Tecnologias Utilizadas

- ReactJS  
- React Router DOM  
- Axios  
- Styled-Components  
- Vite (ferramenta de build e dev server)  
- LocalStorage (para persistência dos favoritos)  

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js instalado (versão recomendada >= 16)  
- npm ou yarn instalado  

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/joaovlara/pokedex.git
```

2. Acesse a pasta do projeto:

```bash
cd pokedex
```

3. Instale as dependências:

npm:

```bash
npm install
```

ou yarn:

```bash
yarn
```

4. Inicie o servidor de desenvolvimento:

npm:

```bash
npm run dev
```

ou yarn:

```bash
yarn run dev
```

5. Abra o navegador e acesse o endereço mostrado no terminal


---

## Observações Técnicas

- Utilização da API pública [PokeAPI](https://pokeapi.co/) para dados dos Pokémons.  
- Persistência dos favoritos via LocalStorage para manter os dados mesmo após reload.  
- Paginação implementada para carregar os Pokémons em blocos.  
- Busca e filtros implementados com debounce para otimização.  
- Detalhes do Pokémon exibidos em modal para melhor UX (alternativamente em rota dedicada).  
- Projeto responsivo, testado em diferentes tamanhos de tela.  
- Código escrito com foco em legibilidade e boas práticas.  

---

## Deploy

- Projeto disponível online em: [https://pokedex-plum-rho.vercel.app/](https://pokedex-plum-rho.vercel.app/)

---

## Contato

Para dúvidas, sugestões ou contribuições, abra uma issue no repositório ou envie uma mensagem.
