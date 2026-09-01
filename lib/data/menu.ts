export type Allergen =
  | "gluten"
  | "milk"
  | "eggs"
  | "shellfish"
  | "mollusc"
  | "fish"
  | "nuts"
  | "peanut"
  | "soy";

export type Diet = "vegan" | "vegetarian" | "glutenFree";

export type Dish = {
  /** Key into messages under `menu.dishes.<id>` (description, when present). */
  id: string;
  /** Dish names stay in Portuguese in every locale, as on a printed menu. */
  name: string;
  price: string;
  allergens?: Allergen[];
  diet?: Diet;
  /** 1 = mild, 2 = medium */
  spice?: 1 | 2;
  image?: string;
  hasDescription?: boolean;
};

export type MenuSection = {
  /** Key into messages under `menu.sections.<id>` (title + intro). */
  id: "starters" | "fish" | "meat" | "vegetarian";
  dishes: Dish[];
};

export const menu: MenuSection[] = [
  {
    id: "starters",
    dishes: [
      {
        id: "cremeDeMarisco",
        name: "Creme de Marisco",
        price: "5,50 €",
        allergens: ["mollusc", "gluten"],
        spice: 1,
        image: "/images/creme-de-marisco.jpg",
      },
      {
        id: "volAuVent",
        name: "Vol-au-Vent de Caça e Shimeji",
        price: "6,00 €",
        allergens: ["gluten", "milk"],
        image: "/images/hero-vol-au-vent.jpg",
      },
      {
        id: "burrata",
        name: "Burrata com Azeite Trufado",
        price: "10,30 €",
        allergens: ["milk", "gluten"],
        hasDescription: true,
      },
      {
        id: "queijoOvelha",
        name: "Queijo 100% Ovelha",
        price: "9,00 €",
        allergens: ["milk", "peanut"],
        image: "/images/queijo-ovelha.jpg",
      },
      {
        id: "bolaDePao",
        name: "Bola de Pão",
        price: "0,80 €",
        allergens: ["gluten"],
        diet: "vegan",
        image: "/images/pao.jpg",
      },
      {
        id: "azeitonas",
        name: "Azeitonas",
        price: "1,80 €",
        diet: "vegan",
        image: "/images/azeitonas.jpg",
      },
    ],
  },
  {
    id: "fish",
    dishes: [
      {
        id: "risottoCamarao",
        name: "Risotto de Moqueca de Camarão",
        price: "16,00 €",
        allergens: ["shellfish", "milk"],
        spice: 1,
        image: "/images/risotto-de-camarao.jpg",
        hasDescription: true,
      },
      {
        id: "bacalhauNatas",
        name: "Bacalhau com Natas",
        price: "13,00 €",
        allergens: ["milk", "gluten", "fish", "nuts"],
        image: "/images/bacalhau-com-natas.jpg",
        hasDescription: true,
      },
    ],
  },
  {
    id: "meat",
    dishes: [
      {
        id: "ovosRotos",
        name: "Ovos Rotos",
        price: "11,50 €",
        allergens: ["eggs"],
        diet: "glutenFree",
        image: "/images/ovos-rotos.jpg",
        hasDescription: true,
      },
      {
        id: "tagyke",
        name: "Tagyke — Kebab Artesanal",
        price: "12,00 €",
        allergens: ["nuts", "gluten"],
        spice: 1,
        image: "/images/tagyke.jpg",
        hasDescription: true,
      },
      {
        id: "arrozDePato",
        name: "Arroz de Pato",
        price: "13,00 €",
        image: "/images/arroz-de-pato.jpg",
        hasDescription: true,
      },
      {
        id: "bifeCortador",
        name: "Bife à Cortador",
        price: "18,00 €",
        allergens: ["eggs", "gluten"],
        hasDescription: true,
      },
      {
        id: "bife3Pimentas",
        name: "Bife de 3 Pimentas",
        price: "18,00 €",
        allergens: ["gluten", "milk"],
        spice: 1,
        image: "/images/bife-3-pimentas.jpg",
        hasDescription: true,
      },
      {
        id: "bifeReducaoVinho",
        name: "Bife com Redução de Vinho",
        price: "18,00 €",
        allergens: ["gluten"],
        image: "/images/bife-reducao-vinho.jpg",
        hasDescription: true,
      },
      {
        id: "francesinha",
        name: "Francesinha",
        price: "18,90 €",
        allergens: ["gluten", "eggs", "milk"],
        spice: 2,
        image: "/images/francesinha.jpg",
        hasDescription: true,
      },
    ],
  },
  {
    id: "vegetarian",
    dishes: [
      {
        id: "tofuCortador",
        name: "Tofu à Cortador",
        price: "14,00 €",
        diet: "vegan",
        image: "/images/tofu-a-cortador.jpg",
      },
      {
        id: "alhoFrancesBras",
        name: "Alho-Francês à Brás",
        price: "14,90 €",
        allergens: ["eggs", "gluten"],
        diet: "vegetarian",
        hasDescription: true,
      },
      {
        id: "tagykeVegetariano",
        name: "Tagyke Vegetariano",
        price: "15,20 €",
        allergens: ["soy", "gluten"],
        diet: "vegan",
        hasDescription: true,
      },
      {
        id: "risottoFunghi",
        name: "Risotto de Funghi",
        price: "15,20 €",
        allergens: ["milk"],
        diet: "vegetarian",
        image: "/images/gallery-risotto.jpg",
        hasDescription: true,
      },
    ],
  },
];
