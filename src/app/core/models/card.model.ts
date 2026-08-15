export interface CardImages {
  full: string;
  small: string;
  cropped: string;
}

export interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

/**
 * Versão leve retornada por GET /cards — usada na listagem/índice do livro.
 */
export interface CardSummary {
  id: number;
  name: string;
  type: string;
  race: string;
  archetype?: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
  image: string;
}

/**
 * Carta completa retornada por GET /cards/:id — usada na página de detalhe.
 */
export interface Card {
  id: number;
  name: string;
  type: string;
  frameType: string;
  description: string;
  race: string;
  archetype?: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
  images: CardImages;
  price?: CardPrice;
}

export interface CardSearchParams {
  name?: string;
  fname?: string;
  type?: string;
  race?: string;
  attribute?: string;
  archetype?: string;
  num?: number;
  offset?: number;
}

export interface CardListResponse {
  data: CardSummary[];
  total: number;
}
