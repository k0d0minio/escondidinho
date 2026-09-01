export type BarItem = {
  /** Product names stay as printed on the list, in every locale. */
  name: string;
  /** Grape varieties / tasting note / alcohol — shown muted under the name. */
  detail?: string;
  price: string;
  /** Half-bottle (375ml) price, where the list offers one. */
  priceHalf?: string;
};

export type BarGroup = {
  /** Optional key into messages under `bar.regions.<id>` (e.g. wine regions). */
  id?: string;
  /** Region names are proper nouns — rendered as-is. */
  title?: string;
  items: BarItem[];
};

export type BarSection = {
  /** Key into messages under `bar.sections.<id>`. */
  id: string;
  groups: BarGroup[];
  /** Key into messages under `bar.notes.<id>`, shown under the section. */
  noteId?: string;
};

export const bar: BarSection[] = [
  {
    id: "aperitifs",
    groups: [
      {
        items: [
          { name: "Caipirinha", price: "6,50 €" },
          { name: "Caipiroska", price: "6,50 €" },
          { name: "Ginja", price: "3,00 €" },
          { name: "Martini", price: "3,50 €" },
          { name: "Moscatel", price: "3,50 €" },
          { name: "Vinho do Porto", price: "3,50 €" },
          { name: "Gin tónico (Gordon's)", price: "7,50 €" },
          { name: "Gin tónico (Bombay)", price: "8,50 €" },
          { name: "Gin tónico (Hendrick's)", price: "9,50 €" },
        ],
      },
    ],
  },
  {
    id: "waters",
    groups: [
      {
        items: [
          { name: "Água Serra da Estrela 50cl", price: "1,60 €" },
          { name: "Água das Pedras", price: "2,00 €" },
          { name: "Água tónica", price: "3,00 €" },
          { name: "Ginger ale", price: "3,00 €" },
        ],
      },
    ],
  },
  {
    id: "softDrinks",
    groups: [
      {
        items: [
          { name: "Coca-Cola · Coca-Cola Zero", price: "2,90 €" },
          { name: "7UP", price: "2,90 €" },
          { name: "Lipton: Pêssego · Limão · Manga", price: "2,90 €" },
          { name: "Sumo natural de laranja", price: "3,50 €" },
          { name: "Limonada", price: "3,20 €" },
        ],
      },
    ],
  },
  {
    id: "beers",
    groups: [
      {
        items: [
          { name: "Imperial Sagres 20cl", price: "2,10 €" },
          { name: "Caneca Sagres 40cl", price: "4,00 €" },
          { name: "Sagres s/ álcool 33cl", price: "2,60 €" },
          { name: "Super Bock Stout 33cl", price: "2,90 €" },
          {
            name: "1927 Munich Dunkel 33cl",
            detail: "Aroma a malte, chocolate, frutos secos e fumado · 6% vol.",
            price: "6,50 €",
          },
          { name: "Bandida 33cl", price: "3,50 €" },
        ],
      },
    ],
  },
  {
    id: "redWines",
    groups: [
      {
        title: "Lisboa",
        items: [
          {
            name: "Cabeça de Toiro",
            detail: "Syrah, Castelão, Touriga Nacional · 13,5% vol.",
            price: "14,90 €",
          },
          { name: "Quinto Elemento", detail: "Syrah · 14% vol.", price: "29,00 €" },
          { name: "Página", detail: "Touriga Nacional · 13% vol.", price: "27,40 €" },
        ],
      },
      {
        title: "Setúbal",
        items: [
          {
            name: "Quinta da Bacalhôa",
            detail: "Cabernet Sauvignon, Merlot · 14,5% vol.",
            price: "32,00 €",
          },
          {
            name: "Terras de Pó Reserva",
            detail:
              "Syrah, Aragonez, Alicante Bouschet, Castelão, Cabernet Sauvignon · 14% vol.",
            price: "17,10 €",
          },
        ],
      },
      {
        title: "Alentejo",
        items: [
          {
            name: "EA",
            detail:
              "Aragonez, Trincadeira, Alicante Bouschet, Syrah, Castelão · 14% vol.",
            price: "14,00 €",
          },
          {
            name: "Flor de Sal (Bronze)",
            detail: "Aragonez, Syrah · 14% vol.",
            price: "17,50 €",
          },
          {
            name: "Monte da Bonança",
            detail: "Alicante Bouschet, Aragonez, Trincadeira · 14% vol.",
            price: "18,00 €",
          },
          {
            name: "Lusitano Seleção",
            detail: "Cabernet Sauvignon, Alicante Bouschet, Aragonez · 13% vol.",
            price: "16,00 €",
          },
          {
            name: "Ravasqueira Vinha das Romãs",
            detail: "Touriga Franca, Syrah · 14,5% vol.",
            price: "30,00 €",
          },
        ],
      },
      {
        title: "Dão",
        items: [
          {
            name: "Alameda de Santar Parcelas",
            detail: "Touriga Nacional · 13% vol.",
            price: "28,00 €",
          },
          {
            name: "Serrado",
            detail: "Touriga Nacional, Alfrocheiro, Tinta Roriz, Jaen · 14,5% vol.",
            price: "15,00 €",
          },
        ],
      },
      {
        title: "Douro",
        items: [
          {
            name: "Duas Quintas",
            detail: "Tinta Roriz, Touriga Franca, Touriga Nacional · 14,5% vol.",
            price: "28,70 €",
          },
          {
            name: "Duvalley",
            detail: "Touriga Nacional, Touriga Franca, Tinta Roriz · 14% vol.",
            price: "19,50 €",
          },
          {
            name: "Little Odisseia",
            detail:
              "Touriga Franca, Tinta Roriz, Touriga Nacional, Tinta Barroca · 13,5% vol.",
            price: "13,00 €",
          },
          {
            name: "Papa Figos",
            detail: "Tempranillo, Touriga Nacional · 13% vol.",
            price: "16,80 €",
          },
        ],
      },
    ],
    noteId: "wineByGlass",
  },
  {
    id: "whiteWines",
    groups: [
      {
        title: "Lisboa",
        items: [
          {
            name: "Quinta de Sant'Ana",
            detail: "Fernão Pires, Arinto · 13% vol.",
            price: "18,00 €",
          },
        ],
      },
      {
        title: "Alentejo",
        items: [
          {
            name: "Flor de Sal",
            detail: "Antão Vaz, Sauvignon Blanc · 13,5% vol.",
            price: "17,00 €",
          },
          {
            name: "Monte da Bonança",
            detail: "Antão Vaz, Arinto, Malvasia Fina, Roupeiro · 13% vol.",
            price: "18,00 €",
          },
        ],
      },
      {
        title: "Dão",
        items: [
          {
            name: "Serrado",
            detail: "Malvasia Fina, Cerceal Branco, Encruzado, Bical · 13% vol.",
            price: "15,00 €",
          },
        ],
      },
      {
        title: "Douro",
        items: [
          {
            name: "Duvalley",
            detail: "Viosinho, Rabigato · 13,5% vol.",
            price: "19,50 €",
          },
          {
            name: "Little Odisseia",
            detail: "Viosinho, Rabigato, Moscatel Galego Branco · 12,5% vol.",
            price: "13,00 €",
          },
        ],
      },
    ],
  },
  {
    id: "greenWines",
    groups: [
      {
        items: [
          {
            name: "VLCT",
            detail: "Avesso, Arinto, Azal, Loureiro · 10% vol.",
            price: "13,80 €",
          },
        ],
      },
    ],
  },
  {
    id: "roseWines",
    groups: [
      {
        items: [
          {
            name: "Mateus",
            detail: "Baga, Rufete, Tinta Barroca, Touriga Franca · 11% vol.",
            price: "11,10 €",
            priceHalf: "7,50 €",
          },
          {
            name: "Quinta Nova",
            detail: "Tinta Roriz, Touriga Franca · 13,5% vol.",
            price: "25,00 €",
          },
          {
            name: "Papa Figos",
            detail: "Tinta Roriz, Touriga Franca, Touriga Nacional · 13% vol.",
            price: "18,00 €",
          },
          {
            name: "Serrado",
            detail: "Touriga Nacional · 12,5% vol.",
            price: "15,00 €",
          },
        ],
      },
    ],
    noteId: "bottleSizes",
  },
  {
    id: "sparkling",
    groups: [
      {
        items: [
          {
            name: "Raposeira — Bruto · Meio-Seco · Doce",
            detail: "Malvasia Fina, Cerceal, Gouveio Real · 12,5% vol.",
            price: "22,80 €",
          },
        ],
      },
    ],
  },
  {
    id: "spirits",
    groups: [
      {
        items: [
          { name: "Amêndoa Amarga", price: "4,50 €" },
          { name: "Licor Beirão", price: "5,00 €" },
          { name: "Rum", price: "6,00 €" },
          { name: "Macieira", price: "4,50 €" },
          { name: "1920", price: "4,50 €" },
          { name: "Chancella", price: "8,00 €" },
          { name: "Aliança Velha", price: "7,50 €" },
          { name: "Antiqua", price: "8,50 €" },
        ],
      },
    ],
  },
  {
    id: "whisky",
    groups: [
      {
        items: [
          { name: "Balvenie DoubleWood 12 anos", price: "15,00 €" },
          { name: "Johnnie Walker Double Black", price: "12,00 €" },
          { name: "Bushmills", price: "8,50 €" },
          { name: "Cutty Sark", price: "6,50 €" },
          { name: "J&B", price: "7,50 €" },
          { name: "Jameson", price: "8,00 €" },
        ],
      },
    ],
  },
  {
    id: "coffee",
    groups: [
      {
        items: [
          { name: "Café · Descafeinado", price: "1,30 €" },
          { name: "Abatanado", price: "1,30 €" },
          { name: "Café duplo", price: "2,60 €" },
          { name: "Garoto", price: "1,00 €" },
          { name: "Meia de leite", price: "1,60 €" },
          { name: "Cappuccino", price: "3,50 €" },
          { name: "Chá em bule — 1 pessoa", price: "1,70 €" },
          { name: "Chá em bule — 2 pessoas", price: "2,50 €" },
        ],
      },
    ],
  },
];
