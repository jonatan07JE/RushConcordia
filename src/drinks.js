import pumpkinLattePhoto from "./assets/drink-pumpkin-latte.jpg";
import bananaLattePhoto from "./assets/drink-banana-latte.jpg";
import peachColdBrewPhoto from "./assets/drink-peach-cold-brew.jpg";

const realDrinkImages = {
  "latte-calabaza": pumpkinLattePhoto,
  "banana-latte": bananaLattePhoto,
  "peach-cold-brew": peachColdBrewPhoto,
  americano: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&w=900&q=80",
  capuccino: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?auto=format&fit=crop&w=900&q=80",
  latte: "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?auto=format&fit=crop&w=900&q=80",
  lechero: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80",
  "flat-white": "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
  macchiato: "https://images.unsplash.com/photo-1652391466264-9742101ffe54?auto=format&fit=crop&w=900&q=80",
  mocha: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80",
  "caramel-latte": "https://plus.unsplash.com/premium_photo-1789232590877-526c868ddb94?auto=format&fit=crop&w=900&q=80",
  "mar-negro-latte": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80",
  "dirty-chai": "https://images.unsplash.com/photo-1651789276450-2ba99bf5f270?auto=format&fit=crop&w=900&q=80",
  "tisana-caliente": "https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?auto=format&fit=crop&w=900&q=80",
  "chocolate-caliente": "https://plus.unsplash.com/premium_photo-1697648334184-8b8cfb3ccfd0?auto=format&fit=crop&w=900&q=80",
  "chai-caliente": "https://images.unsplash.com/photo-1573784540576-21ddeff9479b?auto=format&fit=crop&w=900&q=80",
  taro: "https://plus.unsplash.com/premium_photo-1661335265371-155707f2a739?auto=format&fit=crop&w=900&q=80",
  espresso: "https://plus.unsplash.com/premium_photo-1764184058803-bbf163649919?auto=format&fit=crop&w=900&q=80",
  "espresso-cortado": "https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?auto=format&fit=crop&w=900&q=80",
  matcha: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
  "golden-milk": "https://images.unsplash.com/photo-1604959807242-9eb8fd0b5bfa?auto=format&fit=crop&w=900&q=80",
  "coco-latte": "https://images.unsplash.com/photo-1547825407-2d060104b7f8?auto=format&fit=crop&w=900&q=80",
  "americano-frio": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
  "iced-latte": "https://images.unsplash.com/photo-1562447457-579fc34967fb?auto=format&fit=crop&w=900&q=80",
  "iced-mocha": "https://images.unsplash.com/photo-1741321723835-7c4f3ef95b5a?auto=format&fit=crop&w=900&q=80",
  "iced-caramel": "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=900&q=80",
  "cold-brew": "https://images.unsplash.com/photo-1759259639356-6eee63241869?auto=format&fit=crop&w=900&q=80",
  "iced-latte-vainilla": "https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=900&q=80",
  "iced-chocolate": "https://images.unsplash.com/photo-1637572815755-c4b80092dce1?auto=format&fit=crop&w=900&q=80",
  "iced-chai": "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=900&q=80",
  "iced-tisana": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
  "iced-taro": "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?auto=format&fit=crop&w=900&q=80",
  "coldbrew-tonic": "https://images.unsplash.com/photo-1700328971815-854758899c06?auto=format&fit=crop&w=900&q=80",
  "espresso-tonic": "https://plus.unsplash.com/premium_photo-1676979221494-0db2da5251f2?auto=format&fit=crop&w=900&q=80",
  "iced-mar-negro": "https://images.unsplash.com/photo-1621221814951-fa755dd0c993?auto=format&fit=crop&w=900&q=80",
  "soda-italiana": "https://images.unsplash.com/photo-1562562838-68210f83aebf?auto=format&fit=crop&w=900&q=80",
  "iced-golden-milk": "https://images.unsplash.com/photo-1575159249868-df58bf5e09ec?auto=format&fit=crop&w=900&q=80",
  "iced-coco-latte": "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=900&q=80",
  "iced-dirty-chai": "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80",
  "americano-electrico": "https://images.unsplash.com/photo-1642647391072-6a2416f048e5?auto=format&fit=crop&w=900&q=80",
  "strawberry-matcha": "https://images.unsplash.com/photo-1751033390078-b605c8727fa4?auto=format&fit=crop&w=900&q=80",
  "frappe-latte": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
  "frappe-mocha": "https://images.unsplash.com/photo-1601390483714-955fd3066695?auto=format&fit=crop&w=900&q=80",
  "frappe-oreo": "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=900&q=80",
  "frappe-caramel": "https://plus.unsplash.com/premium_photo-1695927470038-35a215e794f0?auto=format&fit=crop&w=900&q=80",
  "frappe-matcha": "https://images.unsplash.com/photo-1717398804998-ad2d48822518?auto=format&fit=crop&w=900&q=80",
  "frappe-taro": "https://images.unsplash.com/photo-1734770580735-796a00e42cb2?auto=format&fit=crop&w=900&q=80",
  "frappe-chai": "https://images.unsplash.com/photo-1494315153767-9c231f2dfe79?auto=format&fit=crop&w=900&q=80",
  "frappe-tisana": "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80",
  "smoothie-tisana": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80",
  "malteada-ferrero": "https://plus.unsplash.com/premium_photo-1695750678156-ed7b2ad39980?auto=format&fit=crop&w=900&q=80",
  "malteada-mazapan": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
  "pdf-coco-latte": "https://images.unsplash.com/photo-1521012012373-6a85bade18da?auto=format&fit=crop&w=900&q=80",
  "pdf-golden-milk": "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?auto=format&fit=crop&w=900&q=80",
  "espresso-orange-tonic": "https://images.unsplash.com/photo-1533007716222-4b465613a984?auto=format&fit=crop&w=900&q=80",
  "pdf-strawberry-matcha": "https://images.unsplash.com/photo-1751033390130-cdc5a6082089?auto=format&fit=crop&w=900&q=80",
  "pdf-coldbrew": "https://images.unsplash.com/photo-1549652127-2e5e59e86a7a?auto=format&fit=crop&w=900&q=80",
  "pdf-smoothie-tisana": "https://plus.unsplash.com/premium_photo-1663126827264-409d695e0be7?auto=format&fit=crop&w=900&q=80",
  "frappe-vainilla": "https://images.unsplash.com/photo-1622597468620-656aa1f981ea?auto=format&fit=crop&w=900&q=80",
  "jugo-verde": "https://plus.unsplash.com/premium_photo-1700084621249-b22c621ac4e9?auto=format&fit=crop&w=900&q=80",
};

const makeDrinkImage = ({ title, accent, bg = "#f5efe7", subtitle = "Rush Concordia" }) => {
  const safeTitle = String(title || "Bebida");
  const safeSubtitle = String(subtitle || "Rush Concordia");
  const shortTitle = safeTitle.length > 20 ? `${safeTitle.slice(0, 20).trim()}…` : safeTitle;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f5efe8"/>
          <stop offset="100%" stop-color="#e9ddd1"/>
        </linearGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f6f0ea"/>
          <stop offset="100%" stop-color="#d8b79a"/>
        </linearGradient>
        <radialGradient id="liquidGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.72"/>
        </radialGradient>
        <radialGradient id="foamGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#fffdfb"/>
          <stop offset="100%" stop-color="#f0e8e1"/>
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="url(#bgGrad)"/>
      <circle cx="628" cy="124" r="84" fill="${accent}" opacity="0.12"/>
      <circle cx="180" cy="116" r="92" fill="${accent}" opacity="0.08"/>

      <g opacity="0.8">
        <ellipse cx="400" cy="485" rx="270" ry="84" fill="#7b563d" opacity="0.11"/>
      </g>

      <g>
        <ellipse cx="400" cy="472" rx="255" ry="72" fill="#a66d46" stroke="#5d3928" stroke-width="7"/>
        <ellipse cx="400" cy="458" rx="175" ry="32" fill="#f4e8dd" opacity="0.42"/>
      </g>

      <g>
        <path d="M245 155 C250 115, 550 115, 555 155 L535 414 C535 449, 507 474, 466 480 L334 480 C293 474, 265 449, 265 414 L245 155 Z" fill="url(#glassGrad)" stroke="#5a3929" stroke-width="9"/>
        <path d="M262 170 C338 116, 462 116, 538 170" fill="none" stroke="#62412c" stroke-width="10" stroke-linecap="round"/>
        <path d="M268 206 L270 382 C270 416, 298 432, 334 436 L466 436 C502 432, 530 416, 530 382 L532 206" fill="url(#liquidGrad)" opacity="0.92"/>
        <path d="M286 222 C330 202, 470 202, 514 222" fill="none" stroke="#f9f4f1" stroke-width="14" stroke-linecap="round" opacity="0.82"/>
        <path d="M318 248 C342 228, 458 228, 482 248" fill="none" stroke="#f9f4f1" stroke-width="12" stroke-linecap="round" opacity="0.76"/>

        <path d="M291 194 C326 166, 474 166, 509 194 C490 214, 467 230, 400 230 C333 230, 310 214, 291 194 Z" fill="url(#foamGrad)" opacity="0.96"/>
        <path d="M358 190 C371 175, 390 168, 400 168 C410 168, 429 175, 442 190" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity="0.9"/>
        <path d="M365 197 C380 185, 420 185, 435 197" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="0.9"/>

        <circle cx="400" cy="234" r="28" fill="${accent}" opacity="0.95"/>
        <circle cx="400" cy="234" r="12" fill="#fdfaf8" opacity="0.8"/>
        <path d="M298 438 C314 452, 330 456, 346 460 L454 460 C470 456, 486 452, 502 438" fill="none" stroke="#6b442f" stroke-width="9" stroke-linecap="round" opacity="0.8"/>
      </g>

      <g>
        <rect x="217" y="468" width="366" height="54" rx="15" fill="#2d211c" opacity="0.92"/>
        <text x="400" y="503" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#f7efe8">${shortTitle}</text>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const getDrinkImage = (id, title, accent, bg, subtitle) => {
  return realDrinkImages[id] || makeDrinkImage({ title, accent, bg, subtitle });
};

const createDrink = ({ id, name, type, description, price, accent, bg, subtitle }) => ({
  id,
  name,
  type,
  description,
  price,
  accent,
  bg,
  subtitle,
  image: getDrinkImage(id, name, accent, bg, subtitle),
  alt: `${name} de Rush Concordia`,
});

const drinks = [
  createDrink({ id: "latte-calabaza", name: "Latte de Calabaza Especiada", type: "Caliente o frío", description: "Calabaza de Castilla asada, piloncillo y especias de otoño con espresso RUSH.", price: 89, accent: "#d69548", bg: "#f9efe6", subtitle: "Temporada" }),
  createDrink({ id: "banana-latte", name: "Banana Latte", type: "Frío con espresso", description: "Jarabe casero de plátano maduro, vainilla y canela sobre leche fría y espresso.", price: 89, accent: "#f0c76d", bg: "#fff4d5", subtitle: "Plátano + vainilla" }),
  createDrink({ id: "peach-cold-brew", name: "Peach Cold Brew", type: "Cold brew con té", description: "Cold brew RUSH sobre té de durazno: dos capas, frutal y refrescante.", price: 79, accent: "#f2a179", bg: "#fff1ee", subtitle: "Durazno + frío" }),

  createDrink({ id: "americano", name: "Americano", type: "Bebida caliente", description: "Espresso intenso con agua, equilibrado y limpio.", price: 65, accent: "#b88f6d", bg: "#f6efe8", subtitle: "Espresso + agua" }),
  createDrink({ id: "capuccino", name: "Capuccino", type: "Bebida caliente", description: "Espresso, leche vaporizada y espuma cremosa con textura sedosa.", price: 79, accent: "#d8b780", bg: "#fdf4ea", subtitle: "Crema + espresso" }),
  createDrink({ id: "latte", name: "Latte", type: "Bebida caliente", description: "Espresso con leche cremosa y suave, perfecto para cualquier momento.", price: 82, accent: "#d7b47d", bg: "#f8f1ea", subtitle: "Leche + espresso" }),
  createDrink({ id: "lechero", name: "Lechero", type: "Bebida caliente", description: "Latte clásico con un toque dulce y un perfil muy balanceado.", price: 85, accent: "#d8a96c", bg: "#fef2e3", subtitle: "Clásico" }),
  createDrink({ id: "flat-white", name: "Flat White", type: "Bebida caliente", description: "Espresso con leche microespumada y un cuerpo más intenso.", price: 84, accent: "#b88f6d", bg: "#fbf1e9", subtitle: "Microespuma" }),
  createDrink({ id: "macchiato", name: "Macchiato", type: "Bebida caliente", description: "Espresso marcado con una pequeña capa de leche espumosa.", price: 72, accent: "#9b7d5f", bg: "#f4efe5", subtitle: "Espresso + espuma" }),
  createDrink({ id: "mocha", name: "Mocha", type: "Bebida caliente", description: "Espresso, cacao y leche con un final dulce y suave.", price: 88, accent: "#8d5a3c", bg: "#f6eeed", subtitle: "Cacao + espresso" }),
  createDrink({ id: "caramel-latte", name: "Caramel Latte", type: "Bebida caliente", description: "Latte con caramelo, cremosa, dulce y balanceada.", price: 92, accent: "#d48b4d", bg: "#fdf1e8", subtitle: "Caramelo" }),
  createDrink({ id: "mar-negro-latte", name: "Mar Negro Latte", type: "Bebida caliente", description: "Latte con una mezcla intensa de sabores tostados y oscuros.", price: 95, accent: "#2c2c36", bg: "#efeae7", subtitle: "Oscuro + cremoso" }),
  createDrink({ id: "dirty-chai", name: "Dirty Chai", type: "Bebida caliente", description: "Chai especiado con espresso para un toque intenso y aromático.", price: 90, accent: "#b56434", bg: "#f9f0e8", subtitle: "Chai + espresso" }),
  createDrink({ id: "tisana-caliente", name: "Tisana Caliente", type: "Bebida caliente", description: "Infusión aromática y reconfortante para un descanso suave.", price: 68, accent: "#6f8d63", bg: "#eef5eb", subtitle: "Infusión" }),
  createDrink({ id: "chocolate-caliente", name: "Chocolate Caliente", type: "Bebida caliente", description: "Chocolate espeso y envolvente con un toque de calor.", price: 80, accent: "#7a4b32", bg: "#f7eee8", subtitle: "Chocolate" }),
  createDrink({ id: "chai-caliente", name: "Chai Caliente", type: "Bebida caliente", description: "Especias tradicionales con leche para un sabor tibio y cálido.", price: 78, accent: "#c77f4d", bg: "#fbf0e7", subtitle: "Especias" }),
  createDrink({ id: "taro", name: "Taro", type: "Bebida caliente", description: "Bebida cremosa con notas dulces y un perfil suave.", price: 86, accent: "#7a6bb4", bg: "#f5f1fa", subtitle: "Crema + raíz" }),
  createDrink({ id: "espresso", name: "Espresso", type: "Bebida caliente", description: "Shot intenso con cuerpo, aroma y un final profundo.", price: 55, accent: "#4a3328", bg: "#f5efe9", subtitle: "Intenso" }),
  createDrink({ id: "espresso-cortado", name: "Espresso Cortado", type: "Bebida caliente", description: "Espresso balanceado con un toque de leche para suavizar el amargor.", price: 60, accent: "#8d614d", bg: "#f8efe9", subtitle: "Cortado" }),
  createDrink({ id: "matcha", name: "Matcha", type: "Bebida caliente", description: "Té verde matcha con textura cremosa y sabor herbal.", price: 92, accent: "#7fb66c", bg: "#edf7eb", subtitle: "Té verde" }),
  createDrink({ id: "golden-milk", name: "Golden Milk", type: "Bebida caliente", description: "Leche con cúrcuma, especias y un final cálido muy suave.", price: 88, accent: "#d8a73a", bg: "#faf3df", subtitle: "Cúrcuma" }),
  createDrink({ id: "coco-latte", name: "Coco Latte", type: "Bebida caliente", description: "Latte cremosa con leche de coco y un final tropical.", price: 90, accent: "#d7c77b", bg: "#f6f0dd", subtitle: "Coco" }),

  createDrink({ id: "americano-frio", name: "Americano Frío", type: "Bebida fría", description: "Espresso con agua, servido frío y muy refrescante.", price: 69, accent: "#7caec8", bg: "#edf6fb", subtitle: "Frío" }),
  createDrink({ id: "iced-latte", name: "Iced Latte", type: "Bebida fría", description: "Espresso con leche fría y textura ligera para tomar fresco.", price: 82, accent: "#91b8db", bg: "#ecf7ff", subtitle: "Leche fría" }),
  createDrink({ id: "iced-mocha", name: "Iced Mocha", type: "Bebida fría", description: "Mocha frio con cacao y leche para un sabor indulgente.", price: 90, accent: "#7a4f3a", bg: "#f7f0ef", subtitle: "Cacao frío" }),
  createDrink({ id: "iced-caramel", name: "Iced Caramel", type: "Bebida fría", description: "Caramelo y espresso sobre hielo con final dulce.", price: 94, accent: "#d88a46", bg: "#fdf2e8", subtitle: "Caramelo" }),
  createDrink({ id: "cold-brew", name: "Cold Brew", type: "Bebida fría", description: "Brew suave y menos ácido, enfriado para un sabor limpio.", price: 76, accent: "#5d7ba1", bg: "#edf4fb", subtitle: "Suave" }),
  createDrink({ id: "iced-latte-vainilla", name: "Iced Latte Vainilla", type: "Bebida fría", description: "Latte frío con vainilla y una base cremosa muy equilibrada.", price: 88, accent: "#d1b38c", bg: "#fdf3eb", subtitle: "Vainilla" }),
  createDrink({ id: "iced-chocolate", name: "Iced Chocolate", type: "Bebida fría", description: "Chocolate frío con leche y dulzor bien balanceado.", price: 82, accent: "#7d533a", bg: "#f5eae6", subtitle: "Chocolate frío" }),
  createDrink({ id: "iced-chai", name: "Iced Chai", type: "Bebida fría", description: "Chai especiado servido frío para una experiencia refrescante.", price: 84, accent: "#bf7747", bg: "#fbeee6", subtitle: "Especiado" }),
  createDrink({ id: "iced-tisana", name: "Iced Tisana", type: "Bebida fría", description: "Infusión refrescante y aromática, servida con hielo.", price: 72, accent: "#76a86d", bg: "#edf7eb", subtitle: "Refrescante" }),
  createDrink({ id: "iced-taro", name: "Iced Taro", type: "Bebida fría", description: "Taro refrescante y cremoso con cuerpo suave y dulce.", price: 86, accent: "#7b6ac8", bg: "#f5f0ff", subtitle: "Taro" }),
  createDrink({ id: "coldbrew-tonic", name: "Coldbrew Tonic", type: "Bebida fría", description: "Cold brew con tonic para un toque cítrico y vibrante.", price: 92, accent: "#5fb8a0", bg: "#eafaf4", subtitle: "Tonic" }),
  createDrink({ id: "espresso-tonic", name: "Espresso Tonic", type: "Bebida fría", description: "Espresso con tonic, ácido y con un final muy brillante.", price: 94, accent: "#4fa9a5", bg: "#ebfbf8", subtitle: "Brillante" }),
  createDrink({ id: "iced-mar-negro", name: "Iced Mar Negro", type: "Bebida fría", description: "Versión fría de un latte intenso con potente personalidad.", price: 96, accent: "#2f2d2f", bg: "#f1ece8", subtitle: "Oscuro" }),
  createDrink({ id: "soda-italiana", name: "Soda Italiana", type: "Bebida fría", description: "Refrescante mezclado efervescente con un perfil cítrico y suave.", price: 78, accent: "#f0a9b0", bg: "#fff0f3", subtitle: "Efervescente" }),
  createDrink({ id: "iced-golden-milk", name: "Iced Golden Milk", type: "Bebida fría", description: "Golden milk enfriado con cúrcuma y espuma muy suave.", price: 90, accent: "#d7a63b", bg: "#faf5e6", subtitle: "Frío" }),
  createDrink({ id: "iced-coco-latte", name: "Iced Coco Latte", type: "Bebida fría", description: "Latte con coco servido frío para un respiro tropical.", price: 92, accent: "#cdca77", bg: "#f5f4e9", subtitle: "Tropical" }),
  createDrink({ id: "iced-dirty-chai", name: "Iced Dirty Chai", type: "Bebida fría", description: "Chai especiado con espresso y hielo para un perfil intenso.", price: 95, accent: "#c06d36", bg: "#f9eee7", subtitle: "Chai frío" }),
  createDrink({ id: "americano-electrico", name: "Americano Eléctrico", type: "Bebida fría", description: "Americano con intensidad extra y una sensación moderna y vibrante.", price: 75, accent: "#5e7cd7", bg: "#ebf2ff", subtitle: "Vibrante" }),
  createDrink({ id: "strawberry-matcha", name: "Strawberry Matcha", type: "Bebida fría", description: "Matcha con fresa para una mezcla herbal y frutal.", price: 96, accent: "#ff7c9e", bg: "#fff1f5", subtitle: "Fresa + matcha" }),

  createDrink({ id: "frappe-latte", name: "Frappe Latte", type: "Frappé", description: "Latte congelado cremosa y espumosa con perfil balanceado.", price: 109, accent: "#d3ae75", bg: "#f7f0e5", subtitle: "Cremoso" }),
  createDrink({ id: "frappe-mocha", name: "Frappe Mocha", type: "Frappé", description: "Mocha helado con cacao denso y un final dulce intenso.", price: 115, accent: "#7c4d38", bg: "#f9eee9", subtitle: "Chocolate helado" }),
  createDrink({ id: "frappe-oreo", name: "Frappe Oreo", type: "Frappé", description: "Frappé con galleta Oreo para un sabor lleno y cremoso.", price: 118, accent: "#8a6a56", bg: "#f8f1ee", subtitle: "Oreo" }),
  createDrink({ id: "frappe-caramel", name: "Frappe Caramel", type: "Frappé", description: "Caramel frappé suave, dulce y con textura esponjosa.", price: 118, accent: "#d68345", bg: "#fff2e9", subtitle: "Caramelo helado" }),
  createDrink({ id: "frappe-matcha", name: "Frappe Matcha", type: "Frappé", description: "Matcha helado con textura cremosa y finish herbal.", price: 116, accent: "#87b66b", bg: "#edf8eb", subtitle: "Matcha helado" }),
  createDrink({ id: "frappe-taro", name: "Frappe Taro", type: "Frappé", description: "Taro helado con cuerpo cremoso y notas dulces muy suaves.", price: 117, accent: "#7d6bbd", bg: "#f6f3ff", subtitle: "Taro helado" }),
  createDrink({ id: "frappe-chai", name: "Frappe Chai", type: "Frappé", description: "Chai congelado con especias y un cuerpo rico muy equilibrado.", price: 112, accent: "#c07e46", bg: "#fbf1ea", subtitle: "Chai helado" }),
  createDrink({ id: "frappe-tisana", name: "Frappe Tisana", type: "Frappé", description: "Tisana congelada con mezcla aromática y refrescante.", price: 108, accent: "#71a66a", bg: "#eef8ee", subtitle: "Infusión helada" }),
  createDrink({ id: "smoothie-tisana", name: "Smoothie Tisana", type: "Frappé", description: "Tisana con base cremosa y textura más ligera para un frío suave.", price: 110, accent: "#8bbd74", bg: "#effaf2", subtitle: "Smoothie" }),
  createDrink({ id: "malteada-ferrero", name: "Malteada de Ferrero", type: "Malteada", description: "Malteada cremosa y muy dulce, con un perfil a chocolate avellana.", price: 125, accent: "#70432f", bg: "#f9efeb", subtitle: "Ferrero" }),
  createDrink({ id: "malteada-mazapan", name: "Malteada de Mazapán", type: "Malteada", description: "Malteada con nutty, dulce y muy cálida, ideal para caprichos.", price: 120, accent: "#d6aa5f", bg: "#fdf4e4", subtitle: "Mazapán" }),

  createDrink({ id: "pdf-coco-latte", name: "Coco Latte", type: "Bebida especial", description: "Latte con leche de coco y un perfil tropical y suave.", price: 94, accent: "#d0c16a", bg: "#f8f5df", subtitle: "Coco" }),
  createDrink({ id: "pdf-golden-milk", name: "Golden Milk", type: "Bebida especial", description: "Leche de cúrcuma, especias y un perfil cálido y reconfortante.", price: 90, accent: "#d4ac3d", bg: "#faf2db", subtitle: "Cúrcuma" }),
  createDrink({ id: "espresso-orange-tonic", name: "Espresso Orange Tonic", type: "Bebida especial", description: "Espresso con naranja y tonic para un brillo cítrico moderno.", price: 98, accent: "#ff9a5d", bg: "#fff2e8", subtitle: "Naranja + tonic" }),
  createDrink({ id: "pdf-strawberry-matcha", name: "Strawberry Matcha", type: "Bebida especial", description: "Matcha frutal con fresa para un perfil fresco y vibrante.", price: 98, accent: "#ff7ea5", bg: "#fff0f5", subtitle: "Fresa" }),
  createDrink({ id: "pdf-coldbrew", name: "Coldbrew", type: "Bebida especial", description: "Versión intensa y limpia del cold brew para un perfil concentrado.", price: 80, accent: "#557db4", bg: "#edf4ff", subtitle: "Intenso" }),
  createDrink({ id: "pdf-smoothie-tisana", name: "Smoothie Tisana", type: "Bebida especial", description: "Bebida ligera, aromática y refrescante con textura sedosa.", price: 112, accent: "#8ebd7b", bg: "#effaf0", subtitle: "Smoothie" }),
  createDrink({ id: "frappe-vainilla", name: "Frappe Vainilla", type: "Frappé", description: "Frappé de vainilla suave, cremoso y muy dulce.", price: 114, accent: "#d7ba90", bg: "#fff5ea", subtitle: "Vainilla" }),
  createDrink({ id: "jugo-verde", name: "Jugo Verde", type: "Bebida especial", description: "Jugo natural verde con un perfil fresco, herbal y energizante.", price: 88, accent: "#7eb868", bg: "#eefaf0", subtitle: "Natural" }),
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(price);

export default drinks;