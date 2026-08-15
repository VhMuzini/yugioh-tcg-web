# yugioh-tcg-web

Front-end em Angular para o catálogo de cartas de Yu-Gi-Oh!, consumindo a
[yugioh-tcg-api](https://github.com/VhMuzini/yugioh-tcg-api). Conceito visual: um livro
antigo em estilo egípcio, onde cada página apresenta uma carta e seus detalhes.

## Direção de arte

- **Paleta**: papiro (`--color-papyrus`), tinta escura (`--color-ink`), ouro (`--color-gold`),
  lápis-lazúli (`--color-lapis`) e vermelho ocre (`--color-ochre`) sobre um fundo basalto
  (`--color-void`). Tokens completos em `src/styles.scss`.
- **Tipografia**: Cinzel (títulos monumentais/entalhados), Spectral (corpo de texto, estilo
  manuscrito) e JetBrains Mono (estatísticas ATK/DEF/Level).
- **Elemento de assinatura**: um escaravelho estilizado (`ScarabIconComponent`) usado como
  ornamento nos 4 cantos de cada `PageFrameComponent` e como ícone de carregamento — o motivo
  visual que amarra a identidade do "livro" em toda a aplicação.

## Estrutura

```
src/app/
├── core/
│   ├── models/       # tipos que espelham as respostas da API (Card, CardSummary...)
│   └── services/      # CardService — comunicação HTTP com a API
├── features/
│   ├── card-index/    # tela de listagem — busca + grid + paginação (o "índice" do livro)
│   └── card-detail/    # tela de detalhe — spread com imagem e estatísticas da carta
└── shared/
    └── components/
        ├── page-frame/     # moldura de papiro com ornamentos dourados
        ├── scarab-icon/    # ícone de escaravelho (elemento de assinatura)
        ├── loading-state/  # spinner temático
        └── empty-state/    # estado vazio/erro
```

- `core` — serviços e modelos únicos, usados pela aplicação inteira.
- `features` — cada tela é um componente standalone, carregado via lazy loading nas rotas.
- `shared` — peças de UI reutilizáveis entre features.

## Setup

```bash
npm install
npm start        # http://localhost:4200, aponta para http://localhost:3333 (API local)
```

Para build de produção (aponta para a API no Render, ver `src/environments/environment.prod.ts`):

```bash
npm run build
```

> O build de produção busca as fontes do Google Fonts para inline-las (recurso do Angular CLI).
> Isso requer acesso à internet no momento do build — funciona normalmente no Render, mas falha
> em ambientes sem esse acesso.

## Próximos passos

- [x] Direção de arte: paleta, tipografia, moldura estilo papiro/hieróglifo
- [x] Implementar CardIndexComponent (busca por nome, grid, paginação)
- [x] Implementar CardDetailComponent (spread com imagem e estatísticas)
- [x] Loading states e tratamento de erro (404 e falha de rede)
- [ ] Ajustar CORS_ORIGIN na API (Render) para a URL de deploy deste front
- [ ] Deploy do front (Vercel/Netlify/Render static site)
- [ ] Exibir preços de mercado (`card.price`) na página de detalhe
- [ ] Filtro por tipo/atributo na busca
