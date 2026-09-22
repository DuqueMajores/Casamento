# Site do casamento — Elisa & Sérgio

Este é um site **HTML estático**. Para publicar no GitHub Pages, suba o conteúdo desta pasta diretamente para a raiz do repositório. Não precisa rodar Node, build ou servidor.

## Como editar

- **Presentes, links e textos dos cards:** edite `data.js`.
- **Texto e estrutura:** edite `index.html`, `convidados.html` ou `mensagens.html`.
- **Cores e aparência:** edite `style.css`.

Depois, faça commit e push:

```bash
git add .
git commit -m "Atualiza site do casamento"
git push
```

O GitHub Pages publica a raiz do repositório. Portanto, o `data.js` editado é exatamente o arquivo carregado pelo site. Não existe uma etapa de `dist`.

Os cards vêm sempre do `data.js`: título, preço, link, imagem, categoria e descrição. O Firebase é usado apenas para guardar se um card está reservado e para as mensagens. Assim, uma alteração feita no `data.js` aparece no site depois do commit e push, mesmo que a coleção `giftcards` do Firebase esteja vazia ou tenha dados antigos.

## Firebase

O site já está conectado ao Firebase pelo arquivo público `firebase-config.js`. A chave do Firebase Web pode ficar visível no frontend; ela não é uma chave administrativa. A proteção dos dados fica nas regras do Firestore, disponíveis em `firestore.rules`.

O site usa as coleções `giftcards` e `messages`. Para publicar as regras usando a CLI do Firebase:

```bash
firebase deploy --only firestore:rules
```

## Arquivos importantes

- `index.html` — página principal.
- `data.js` — conteúdo editável dos presentes e dados iniciais.
- `app.js` — comportamento do site.
- `firebase-config.js` — conexão pública com o Firebase.
- `convidados.html` e `mensagens.html` — páginas auxiliares.
- `style.css` — estilos.
- `public/assets/` — imagens.
- `.nojekyll` — evita processamento indevido pelo GitHub Pages.
