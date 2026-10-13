export type Collection = "campus" | "corporate" | "icons";
export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  image: string;
  color: string;
  description: string;
  material: string;
  collections: Collection[];
  sizes: string[];
  tag?: string;
  imageNote?: string;
};
const allSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const create = (
  product: Omit<Product, "sizes"> & { sizes?: string[] },
): Product => ({
  sizes: allSizes,
  imageNote: "Illustrative photography. Exact model imagery is being updated.",
  ...product,
});
export const products: Product[] = [
  create({
    id: "leopard-mary-janes",
    name: "Leopard Mary Janes",
    brand: "INDEPENDENT LABELS",
    price: 35000,
    category: "Flats",
    gender: "Women",
    image: "/products/leopard-mary-janes.png",
    color: "Leopard / Black",
    tag: "ANIMAL PRINT",
    material: "Soft fabric upper · Flat rubber sole",
    description:
      "Leopard print and a slim black strap. A statement flat for denim, relaxed trousers and all-black outfits.",
    collections: ["campus"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "gingham-mary-janes",
    name: "Gingham Mary Janes",
    brand: "INDEPENDENT LABELS",
    price: 30000,
    category: "Flats",
    gender: "Women",
    image: "/products/gingham-mary-janes.png",
    color: "Black / White",
    tag: "CHECK PLEASE",
    material: "Gingham fabric upper · Flat rubber sole",
    description:
      "A black-and-white check with a delicate buckle strap. Wear with socks, a mini skirt or your favourite wide-leg jeans.",
    collections: ["campus"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "cap-toe-flats",
    name: "Cap-Toe Ballet Flats",
    brand: "INDEPENDENT LABELS",
    price: 40000,
    category: "Flats",
    gender: "Women",
    image: "/products/cap-toe-flats.png",
    color: "Cream / Black",
    tag: "TWO-TONE",
    material: "Synthetic leather upper · Flat rubber sole",
    description:
      "Cream uppers, black cap toes and a slim strap. A polished flat for campus presentations, office days and weekends.",
    collections: ["campus", "corporate"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "silver-ballet-flats",
    name: "Metallic Ballet Flats",
    brand: "INDEPENDENT LABELS",
    price: 38000,
    category: "Flats",
    gender: "Women",
    image: "/products/silver-ballet-flats.png",
    color: "Silver",
    tag: "SILVER MOMENT",
    material: "Metallic synthetic upper · Flat rubber sole",
    description:
      "A silver finish and tiny bow bring personality to a simple ballet flat. Let them shine with denim or muted tailoring.",
    collections: ["campus", "corporate"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "pointed-slingback-flats",
    name: "Pointed Slingback Flats",
    brand: "INDEPENDENT LABELS",
    price: 45000,
    category: "Flats",
    gender: "Women",
    image: "/products/pointed-slingback-flats.png",
    color: "Cream",
    tag: "SLEEK & FLAT",
    material: "Synthetic leather upper · Flat rubber sole",
    description:
      "A pointed toe and delicate slingback strap on a flat sole. Clean, understated shoes for long workdays and smart outfits.",
    collections: ["corporate"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "quilted-bow-flats",
    name: "Quilted Bow Flats",
    brand: "INDEPENDENT LABELS",
    price: 35000,
    category: "Flats",
    gender: "Women",
    image: "/products/quilted-bow-flats.png",
    color: "Powder Blue",
    tag: "SOFT BLUE",
    material: "Quilted synthetic upper · Flat rubber sole",
    description:
      "Soft powder blue, subtle quilting and a small bow. A fresh flat to pair with white shirts, denim and matching pastel details.",
    collections: ["campus", "corporate"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "square-toe-flats",
    name: "Square-Toe Bar Flats",
    brand: "INDEPENDENT LABELS",
    price: 42000,
    category: "Flats",
    gender: "Women",
    image: "/products/square-toe-flats.png",
    color: "Burgundy / Gold",
    tag: "GOLD DETAIL",
    material: "Synthetic leather upper · Flat rubber sole",
    description:
      "Burgundy square toes with a slim gold bar. A modern workwear flat with just enough detail to finish your outfit.",
    collections: ["corporate"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "horsebit-loafers",
    name: "Horsebit Loafers",
    brand: "INDEPENDENT LABELS",
    price: 55000,
    category: "Loafers",
    gender: "Women",
    image: "/products/horsebit-loafers.png",
    color: "Cream / Gold",
    tag: "OFFICE TO OFF-DUTY",
    material: "Synthetic leather upper · Flat rubber sole",
    description:
      "Cream loafers with polished horsebit hardware and a low-profile flat sole. Style with tailored trousers, denim or a midi skirt.",
    collections: ["campus", "corporate"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated independent-label style concept inspired by the supplied references. Assignment stock is illustrative.",
  }),
  create({
    id: "nike-dunk-low",
    name: "Dunk Low",
    brand: "NIKE",
    price: 205000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/nike-dunk-low.png",
    color: "Yellow / White",
    tag: "COLOUR POP",
    material: "Leather-look upper · Flat rubber sole",
    description:
      "Yellow overlays and crisp white panels on a low-top court silhouette. Bring a bold pop to denim, cargos or neutral outfits.",
    collections: ["icons"],
    imageNote:
      "Generated model-style reference based on the supplied boards. Exact colourway, stock and authenticity require supplier confirmation.",
  }),
  create({
    id: "converse-chuck-70",
    name: "Chuck 70",
    brand: "CONVERSE",
    price: 115000,
    category: "Casual shoes",
    gender: "Unisex",
    image: "/products/converse-chuck-70.png",
    color: "Green / Cream",
    tag: "HIGH-TOP KLASSIC",
    material: "Canvas upper · Flat rubber sole",
    description:
      "Deep green high-top canvas with a cream toe cap. A versatile match for baggy denim, shorts and relaxed tailoring.",
    collections: ["icons"],
    imageNote:
      "Generated model-style reference based on the supplied boards. Exact colourway, stock and authenticity require supplier confirmation.",
  }),
  create({
    id: "puma-palermo",
    name: "Palermo",
    brand: "PUMA",
    price: 150000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/puma-palermo.png",
    color: "Green / White",
    tag: "TERRACE FAVOURITE",
    material: "Suede-look upper · Flat gum rubber sole",
    description:
      "Forest green, a white formstrip and a gum sole. A retro low-profile sneaker that works with jeans, jorts and wide-leg trousers.",
    collections: ["icons"],
    imageNote:
      "Generated model-style reference based on the supplied boards. Exact colourway, stock and authenticity require supplier confirmation.",
  }),
  create({
    id: "asics-gel-1130",
    name: "GEL-1130",
    brand: "ASICS",
    price: 185000,
    category: "Running shoes",
    gender: "Unisex",
    image: "/products/asics-gel-1130.png",
    color: "Silver / Cream",
    tag: "SILVER RUNNER",
    material: "Mesh and synthetic upper · Cushioned rubber outsole",
    description:
      "Layered silver details and cream mesh create a distinctive runner silhouette. An easy addition to sporty everyday fits.",
    collections: ["icons"],
    imageNote:
      "Generated model-style reference based on the supplied boards. Exact colourway, stock and authenticity require supplier confirmation.",
  }),
  create({
    imageNote:
      "Online model reference. Prices, availability and authenticity require supplier confirmation.",
    id: "adidas-samba",
    name: "Samba OG",
    brand: "ADIDAS",
    price: 180000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/adidas-samba.jpg",
    color: "White / Burgundy",
    tag: "LOW-PROFILE",
    collections: ["icons"],
    material: "Leather and suede upper · Flat gum rubber sole",
    description:
      "A slim terrace silhouette in white and burgundy. Pair with baggy denim, jorts or tailored wide-leg trousers.",
  }),
  create({
    imageNote:
      "Generated cutout reference based on an online Gazelle image. Stock is illustrative.",
    id: "adidas-gazelle",
    name: "Gazelle",
    brand: "ADIDAS",
    price: 185000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/adidas-gazelle.png",
    color: "Tan / White",
    tag: "SUEDE & GUM",
    collections: ["icons"],
    material: "Suede upper · Flat gum rubber sole",
    description:
      "Tan suede, white stripes and a gum sole. A soft neutral sneaker for relaxed trousers and oversized layers.",
  }),
  create({
    imageNote:
      "Online model reference. Prices, availability and authenticity require supplier confirmation.",
    id: "new-balance-530",
    name: "530",
    brand: "NEW BALANCE",
    price: 185000,
    category: "Running shoes",
    gender: "Unisex",
    image: "/products/new-balance-530.webp",
    color: "White / Natural Indigo",
    tag: "RETRO RUNNER",
    collections: ["icons"],
    material: "Mesh and synthetic upper · Cushioned running sole",
    description:
      "An athletic retro silhouette with layered white mesh and indigo details. Wear with parachute trousers, long socks or everyday denim.",
  }),
  create({
    imageNote:
      "Generated model reference sourced online. Exact product details and stock are illustrative.",
    id: "new-balance-9060",
    name: "9060",
    brand: "NEW BALANCE",
    price: 265000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/new-balance-9060.png",
    color: "Triple Black",
    tag: "CHUNKY SILHOUETTE",
    collections: ["icons"],
    material: "Mesh and suede-look upper · Sculpted rubber outsole",
    description:
      "A sculpted sole and layered black upper bring a bigger silhouette to your rotation. An easy match for wide-leg trousers and oversized tees.",
  }),
  create({
    imageNote:
      "Online model reference. Prices, availability and authenticity require supplier confirmation.",
    id: "onitsuka-mexico-66",
    name: "Mexico 66",
    brand: "ONITSUKA TIGER",
    price: 220000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/onitsuka-mexico-66.jpg",
    color: "Cream / Red",
    tag: "SLIM & RETRO",
    collections: ["icons"],
    material: "Leather-look upper · Flat rubber sole",
    description:
      "A slim retro shape with cream and red detailing. A distinctive low-profile option for denim, cropped trousers and skirts.",
  }),
  create({
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Online model reference. Prices, availability and authenticity require supplier confirmation.",
    id: "puma-speedcat-ballet",
    name: "Speedcat Ballet",
    brand: "PUMA",
    price: 170000,
    category: "Flats",
    gender: "Women",
    image: "/products/puma-speedcat-ballet.jpg",
    color: "Pink / White",
    tag: "BALLET MEETS STREET",
    collections: ["corporate"],
    material: "Mesh upper · Flat motorsport-inspired rubber sole",
    description:
      "Ballet-inspired straps meet a low-profile sneaker sole. Pink mesh and white detailing bring a fresh contrast to jeans and smart-casual workwear.",
  }),
  create({
    imageNote:
      "Online model reference. Prices, availability and authenticity require supplier confirmation.",
    id: "birkenstock-boston",
    name: "Boston",
    brand: "BIRKENSTOCK",
    price: 250000,
    category: "Clogs",
    gender: "Unisex",
    image: "/products/birkenstock-boston.png",
    color: "Taupe",
    tag: "OFF-DUTY",
    collections: [],
    material: "Suede-look upper · Contoured footbed · Flat outsole",
    description:
      "A slip-on clog with a buckle and rounded toe. Style with socks, denim or relaxed linen for a laid-back look.",
  }),
  create({
    imageNote:
      "Generated cutout based on an online Crocs campaign. Charms are illustrative; stock is not verified.",
    id: "crocs-classic",
    name: "Classic Clog",
    brand: "CROCS",
    price: 95000,
    category: "Clogs",
    gender: "Unisex",
    image: "/products/crocs-classic.png",
    color: "Navy / Charms",
    tag: "MAKE IT YOURS",
    collections: [],
    material: "Moulded foam upper and sole · Pivoting strap",
    description:
      "The navy Classic clog styled with colourful charms. A playful flat option for errands, campus downtime and relaxed weekends.",
  }),
  create({
    imageNote:
      "Online Speedcat reference. Availability and authenticity are not verified stock claims.",
    id: "puma-speedcat-red",
    name: "Speedcat OG",
    brand: "PUMA",
    price: 175000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/puma-speedcat-red.jpg",
    color: "Red / White",
    tag: "THE IT PAIR",
    collections: ["icons"],
    material: "Suede upper · Rubber outsole",
    description:
      "A low-profile motorsport silhouette with serious street-style energy. The red-and-white colourway brings a bold finishing touch to a simple outfit.",
  }),
  create({
    imageNote:
      "Online product reference. Stock and availability are illustrative.",
    id: "nike-af1-white",
    name: "Air Force 1 ’07",
    brand: "NIKE",
    price: 195000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/nike-af1-white.png",
    color: "Triple White",
    tag: "KLASSIC ICON",
    collections: ["icons"],
    material: "Leather upper · Rubber outsole",
    description:
      "The all-white sneaker that belongs in every rotation. A clean court-inspired silhouette, substantial sole and an easy match for denim, tailoring or everyday layers.",
  }),
  create({
    imageNote:
      "Generated product concept. This independent-label assignment item is illustrative.",
    id: "penny-loafers",
    name: "Chunky Penny Loafers",
    brand: "INDEPENDENT LABELS",
    price: 55000,
    category: "Loafers",
    gender: "Unisex",
    image: "/products/penny-loafers.png",
    color: "Black",
    tag: "9–5 FAVOURITE",
    collections: ["corporate", "campus"],
    material: "Synthetic leather upper · Chunky rubber sole",
    description:
      "A polished penny-loafer profile on a chunky sole. Slip-on ease for lectures, presentations and the office. Easy to dress up or keep casual.",
  }),
  create({
    imageNote:
      "Online product reference. Stock and availability are illustrative.",
    id: "timberland-wheat",
    name: "6-Inch Premium Boot",
    brand: "TIMBERLAND",
    price: 350000,
    category: "Boots",
    gender: "Unisex",
    image: "/products/timberland-wheat.png",
    color: "Wheat",
    tag: "BUILT DIFFERENT",
    collections: [],
    material: "Nubuck leather upper · Rubber lug outsole",
    description:
      "The recognisable wheat boot with a padded collar and confident lug sole. A timeless addition to relaxed streetwear and an investment in your rotation.",
  }),
  create({
    imageNote:
      "Air Max 95 silhouette reference in an alternate colourway. Triple Black stock is illustrative.",
    id: "nike-air-max-95",
    name: "Air Max 95",
    brand: "NIKE",
    price: 320000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/nike-air-max-95.jpg",
    color: "Triple Black",
    collections: ["icons"],
    material: "Mixed-material upper · Visible Air cushioning",
    description:
      "Layered lines, visible cushioning and an all-black finish. An expressive everyday silhouette that holds its own from your first stop to your last.",
  }),
  create({
    id: "nike-af1-black",
    name: "Air Force 1 ’07",
    brand: "NIKE",
    price: 195000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/black-sneakers.jpg",
    color: "Triple Black",
    collections: ["icons"],
    material: "Leather upper · Rubber outsole",
    description:
      "An all-black take on a court classic. A versatile silhouette for a monochrome wardrobe, with clean lines and a substantial rubber sole.",
  }),
  create({
    imageNote:
      "Online product reference. Stock and availability are illustrative.",
    id: "timberland-black",
    name: "6-Inch Premium Boot",
    brand: "TIMBERLAND",
    price: 350000,
    category: "Boots",
    gender: "Unisex",
    image: "/products/timberland-black.png",
    color: "Black",
    collections: [],
    material: "Nubuck leather upper · Rubber lug outsole",
    description:
      "The signature 6-inch shape in a black finish. Pair with denim, wide-leg trousers or an oversized jacket for a considered everyday look.",
  }),
  create({
    imageNote:
      "1461 silhouette reference in Cherry Red. Black stock is illustrative.",
    id: "dr-martens-1461",
    name: "1461 Smooth Leather",
    brand: "DR. MARTENS",
    price: 260000,
    category: "Smart shoes",
    gender: "Unisex",
    image: "/products/dr-martens-1461.webp",
    color: "Black",
    collections: ["corporate"],
    material: "Smooth leather upper · Air-cushioned outsole",
    description:
      "A three-eye lace-up with unmistakable character. The low-cut 1461 brings a rebellious edge to tailoring, campus fits and everything in between.",
  }),
  create({
    imageNote:
      "Speedcat silhouette reference in Red / White. Black / White stock is illustrative.",
    id: "puma-speedcat-black",
    name: "Speedcat OG",
    brand: "PUMA",
    price: 175000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/puma-speedcat-red.jpg",
    color: "Black / White",
    collections: ["icons"],
    material: "Suede upper · Rubber outsole",
    description:
      "An understated colourway of the slim motorsport-inspired favourite. Low-profile proportions make it easy to wear with straight-leg and wide-leg trousers.",
  }),
  create({
    imageNote:
      "Online Campus model reference. Stock and authenticity require supplier verification.",
    id: "adidas-campus",
    name: "Campus 00s",
    brand: "ADIDAS",
    price: 170000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/adidas-campus.jpg",
    color: "Grey / White",
    collections: ["icons"],
    material: "Suede upper · Rubber outsole",
    description:
      "A skate-inspired silhouette with padded proportions and everyday versatility. A heritage look for a new generation of personal style.",
  }),
  create({
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated unbranded concept. This affordable assignment item is illustrative.",
    id: "women-running",
    name: "Everyday Running Shoes",
    brand: "INDEPENDENT LABELS",
    price: 40000,
    category: "Running shoes",
    gender: "Women",
    image: "/products/campus-running.png",
    color: "White / Silver",
    tag: "CAMPUS PICK",
    collections: ["campus"],
    material: "Breathable mesh upper · Lightweight foam sole",
    description:
      "Lightweight trainers for your daily routine. A breathable upper and flexible feel, designed to take you from your morning commute to a busy day on campus.",
  }),
  create({
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    imageNote:
      "Generated product concept. This independent-label assignment item is illustrative.",
    id: "mary-jane-flats",
    name: "Mesh Mary Janes",
    brand: "INDEPENDENT LABELS",
    price: 35000,
    category: "Flats",
    gender: "Women",
    image: "/products/mesh-mary-janes.png",
    color: "Black",
    tag: "SHEER MESH",
    collections: ["campus", "corporate"],
    material: "Sheer mesh upper · Flat rubber sole",
    description:
      "Sheer black mesh, a slim buckle strap and a flat sole. Style with wide-leg denim, tailored trousers or a mini skirt.",
  }),
  create({
    imageNote:
      "Generated unbranded concept. This affordable assignment item is illustrative.",
    id: "campus-casual",
    name: "Retro Gum-Sole Sneakers",
    brand: "INDEPENDENT LABELS",
    price: 25000,
    category: "Casual shoes",
    gender: "Unisex",
    image: "/products/retro-gum-sneakers.png",
    color: "Chocolate / Powder Blue",
    tag: "CAMPUS PICK",
    collections: ["campus"],
    material: "Suede-look upper · Flat gum rubber sole",
    description:
      "Slim chocolate-brown lows with powder-blue details and a gum sole. An affordable unbranded option for relaxed campus fits.",
  }),
];
export const categories = [
  "Men",
  "Women",
  "Unisex",
  "Sneakers",
  "Running shoes",
  "Loafers",
  "Smart shoes",
  "Flats",
  "Boots",
  "Clogs",
  "Casual shoes",
];
export const collections = [
  {
    id: "icons" as const,
    name: "Sneakers",
    caption: "Original-brand favourites",
    description: "Low-profile favourites, retro runners and bold colourways.",
  },
  {
    id: "campus" as const,
    name: "Campus",
    caption: "Student-friendly · ₦25k–₦55k",
    description:
      "Lecture to link-up. Affordable independent-label pairs that do the most.",
  },
  {
    id: "corporate" as const,
    name: "9–5",
    caption: "Smart shoes, zero boring fits",
    description:
      "Loafers, ballet flats and slingback flats for smart-casual workdays.",
  },
];
export const money = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
export const FREE_SHIPPING_MINIMUM = 200000;
export const SHIPPING_COST = 3500;
export const photo = (id: string, w = 800) =>
  id.startsWith("/") || id.startsWith("https://")
    ? id
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
export const matchesCategory = (p: Product, category: string) =>
  category === "All" ||
  p.category === category ||
  p.gender === category ||
  ((category === "Men" || category === "Women") && p.gender === "Unisex");

export const featuredProductIds = [
  "adidas-samba",
  "new-balance-530",
  "puma-speedcat-red",
  "puma-speedcat-ballet",
  "leopard-mary-janes",
  "cap-toe-flats",
  "silver-ballet-flats",
  "gingham-mary-janes",
];
