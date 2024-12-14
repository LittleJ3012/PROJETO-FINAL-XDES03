## Descrição do Projeto
O projeto Pokédex é uma aplicação web interativa que permite aos usuários cadastrar e gerenciar suas informações de maneira segura. A plataforma oferece uma interface intuitiva e visualmente atraente, onde os usuários podem explorar e escolher seus Pokémons favoritos da primeira geração. Ao selecionar até seis Pokémons, o usuário pode montar seu time e visualizar informações detalhadas sobre cada um deles, apresentadas por meio de cards informativos.
Além disso, após a formação do time, o usuário pode avaliar o poder dos pokemóns que ele escolheu. Caso a soma dos hp's (propriedade de cada pokemón no banco de dados) ultrapasse 380 pontos, o time vence. Caso contrário, perde.

## Tecnologias Utilizadas
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Next.js
- **Banco de Dados**: Arquivo JSON como base de dados, com informações da API Pokémon (https://pokeapi.co/)
- **Autenticação**: Geração de Token

## Problema
O projeto busca resolver a implementação de operações CRUD (Create, Read, Update, Delete) visto em sala de aula. Ele permite o cadastro de usuários, a remoção de Pokémons escolhidos pelo usuário durante a montagem de seu time, e a atualização dinâmica do time de Pokémons conforme o usuário altera suas escolhas. 

## Por que é um Problema Importante
Esse projeto é importante devido o aprendizado que proporciona. Ele permite aplicar o conhecimento adquirido na disciplina de Web - XDES03, consolidando conceitos de desenvolvimento web e o uso de ferramentas modernas. Além do aprendizado adquirido em operações CRUD, em que sua implementação é fundamental para desenvolver habilidades essenciais na criação de aplicações dinâmicas e interativas.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
