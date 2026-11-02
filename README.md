# Casamento Elisa & Sérgio

Convite de casamento estático, feito em HTML, CSS e JavaScript puro para publicação no GitHub Pages. Não há servidor, banco de dados, API ou serviço de hospedagem externo.

## Publicação

O conteúdo da pasta raiz pode ser publicado diretamente pelo GitHub Pages, usando a branch `main` e a pasta `/ (root)` como fonte. O site não precisa de build nem de instalação de dependências.

## Funcionamento

- `index.html` é a página principal do convite.
- `convidados.html` e `mensagens.html` são páginas auxiliares estáticas.
- As confirmações, mensagens e reservas de presentes são salvas no `localStorage` do navegador.
- Como não existe backend, esses dados são locais ao navegador e não são compartilhados entre visitantes ou dispositivos.
- Os mapas, fontes, ícones e imagens externas continuam sendo carregados pelo navegador quando a página é aberta.

Para testar localmente, abra `index.html` em um navegador ou use qualquer servidor HTTP estático.
