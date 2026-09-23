# Casamento Elisa & Sérgio

O convite agora usa um pequeno servidor Node.js e o arquivo `data/store.json` como persistência compartilhada. As mensagens e intenções de presente não ficam mais no navegador: qualquer convidado, independentemente do ID, consulta a mesma API e a mesma lista de mensagens em `/mensagens`.

## Executar

```bash
npm start
```

Depois, abra `http://localhost:3000/` ou `http://localhost:3000/mensagens`.

## Como funciona

- `server.js` serve os arquivos estáticos e disponibiliza a API em `/api`.
- `data/store.json` guarda `messages`, `reservedGifts` e `guests`.
- Ao clicar em **Registrar Intenção de Presente**, o navegador envia `POST /api/gift-intents`.
- O servidor grava a mensagem e a reserva de forma compartilhada e retorna o resultado para a página.
- A página `/mensagens` carrega os dados com `GET /api/state`.
- A página `/convidados` também carrega o estado compartilhado e atualiza automaticamente a cada 10 segundos enquanto estiver aberta.
- A lista inicial contém os 94 convidados da planilha (84 adultos e 10 crianças). O servidor migra automaticamente convidados que ainda não existirem no `store.json` persistente.
- A exclusão de uma mensagem usa `DELETE /api/messages/:id` e libera o presente correspondente.

O projeto não contém mais chamadas a `localStorage` ou `sessionStorage`. Para produção, o processo Node precisa permanecer ativo e o arquivo `data/store.json` precisa estar em um volume com permissão de escrita.

## Resetar convidados

Para deixar todos os convidados como `Pendente` e remover mensagens e reservas de presentes, execute no servidor:

```bash
npm run reset-guests
```
