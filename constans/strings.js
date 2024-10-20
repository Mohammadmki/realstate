const services=[
  {name:"رهن",slog:"mortgage"},
  {name:"اجاره",slog:"rent"},
  {name:"خرید",slog:"buy"},
]

const cities = [
  {
    name: "تهران",
    slog: "Tehran",
    position: [35.6892, 51.3890],
  },
  {
    name: "اصفهان",
    slog: "Isfahan",
    position: [32.6546, 51.6680],
  },
  {
    name: "شیراز",
    slog: "Shiraz",
    position: [29.5918, 52.5837],
  },
  {
    name: "تبریز",
    slog: "Tabriz",
    position: [38.0800, 46.2919],
  },
  {
    name: "مشهد",
    slog: "Mashhad",
    position: [36.2970, 59.6062],
  },
];

const categories = {
  apartment: "آپارتمان",
  villa: "ویلا",
  store: "مغازه",
  office: "دفتر",
};


export { services, cities, categories };
