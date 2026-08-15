# yugioh-tcg-web

Front-end em Angular para o catálogo de cartas de Yu-Gi-Oh!, consumindo a
[yugioh-tcg-api](https://github.com/VhMuzini/yugioh-tcg-api). Conceito visual: um livro
antigo em estilo egípcio, onde cada página apresenta uma carta e seus detalhes.

## Estrutura

```
src/app/
├── core/
│   ├── models/       # tipos que espelham as respostas da API (Card, CardSummary...)
│   └── services/      # CardService — comunicação HTTP com a API
├── features/
│   ├── card-index/    # tela de listagem — o "índice" do livro
│   └── card-detail/    # tela de detalhe — a "página" de uma carta
└── shared/
    ├── components/     # componentes reutilizáveis (ex: moldura de página, spinner)
    └── pipes/
```

- `core` — serviços e modelos únicos, usados pela aplicação inteira.
- `features` — cada tela é um componente standalone, carregado via lazy loading nas rotas.
- `shared` — peças de UI reutilizáveis entre features (a identidade visual egípcia deve
  nascer aqui: molduras, hieróglifos decorativos, texturas de papiro etc).

## Setup

```bash
npm install
npm start        # http://localhost:4200, aponta para http://localhost:3333 (API local)
```

Para build de produção (aponta para a API no Render, ver `src/environments/environment.prod.ts`):

```bash
npm run build
```

## Próximos passos

- [ ] Direção de arte: paleta, tipografia, moldura estilo papiro/hieróglifo
- [ ] Implementar CardIndexComponent (grid/lista consumindo `CardService.search`)
- [ ] Implementar CardDetailComponent (consumindo `CardService.getById`)
- [ ] Loading states e tratamento de erro (ex: 404 quando a busca não encontra nada)
- [ ] Ajustar CORS_ORIGIN na API (Render) para a URL de deploy deste front
