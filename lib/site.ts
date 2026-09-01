export const site = {
  name: "Restaurante Escondidinho",
  shortName: "Escondidinho",
  legalName: "Leandra Freire Unipessoal Lda",
  url: "https://escondidinho-mafra.com",
  established: 2009,
  nameSince: 1943,
  seats: 36,
  phone: "+351261814983",
  phoneDisplay: "261 814 983",
  accessibilityPhone: "+351925808255",
  accessibilityPhoneDisplay: "925 808 255",
  email: "escondidinho.mafra@gmail.com",
  privacyEmail: "cliente.escondidinho@gmail.com",
  address: {
    street: "Travessa da Quinta Nova, nº 17",
    postalCode: "2640-473",
    locality: "Mafra",
    region: "Lisboa",
    country: "PT",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Restaurante+Escondidinho+Travessa+da+Quinta+Nova+17+Mafra",
  social: {
    facebook: "https://www.facebook.com/restaurante.escondidinho",
    instagram: "https://www.instagram.com/escondidinho.mafra/",
    tripadvisor:
      "https://www.tripadvisor.pt/Restaurant_Review-g189159-d6424442-Reviews-Escondidinho-Mafra_Lisbon_District_Central_Portugal.html",
  },
} as const;

// Lunch Wed–Sun, dinner Wed–Sat. Closed Monday, Tuesday and Sunday dinner.
export const openingHours = {
  lunch: { days: [3, 4, 5, 6, 0], from: "12:00", to: "15:30" },
  dinner: { days: [3, 4, 5, 6], from: "19:30", to: "22:30" },
} as const;

export const schemaOpeningHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "12:00",
    closes: "15:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "19:30",
    closes: "22:30",
  },
];
