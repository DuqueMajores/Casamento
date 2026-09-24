# Casamento Elisa & Sérgio

O convite usa um pequeno servidor Node.js e uma API compartilhada. Em produção, os dados são armazenados em Postgres por meio da variável `DATABASE_URL`; localmente, sem essa variável, o projeto usa `data/store.json`.

## Executar

```bash
npm start
```

Depois, abra `http://localhost:3000/` ou `http://localhost:3000/mensagens`.

## Como funciona

- `server.js` serve os arquivos estáticos e disponibiliza a API em `/api`.
- Com `DATABASE_URL`, a tabela `wedding_state` guarda `messages`, `reservedGifts` e `guests` em armazenamento persistente.
- Sem `DATABASE_URL`, `data/store.json` é usado apenas para desenvolvimento local.
- Ao clicar em **Registrar Intenção de Presente**, o navegador envia `POST /api/gift-intents`.
- O servidor grava a mensagem e a reserva de forma compartilhada e retorna o resultado para a página.
- A página `/mensagens` carrega os dados com `GET /api/state`.
- A página `/convidados` também carrega o estado compartilhado e atualiza automaticamente a cada 10 segundos enquanto estiver aberta.
- A lista inicial contém os 94 convidados da planilha (84 adultos e 10 crianças). O servidor migra automaticamente convidados que ainda não existirem no `store.json` persistente.
- A exclusão de uma mensagem usa `DELETE /api/messages/:id` e libera o presente correspondente.
- A reserva de presente usa transação com lock no Postgres, impedindo reservas duplicadas simultâneas.

O projeto não contém chamadas a `localStorage` ou `sessionStorage`. Para publicar no Render, crie um banco **Render Postgres** e adicione a variável `DATABASE_URL` ao Web Service (ou use a opção de conexão automática do banco). Na primeira inicialização, o servidor cria a tabela e migra o `data/store.json` existente somente se a tabela estiver vazia. Não dependa do disco local do Render para guardar dados.

## Resetar convidados

Para deixar todos os convidados como `Pendente` e remover mensagens e reservas de presentes, execute no servidor:

```bash
npm run reset-guests
```
