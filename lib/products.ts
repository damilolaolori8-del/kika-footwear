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
    id: "puma-speedcat-red",
    name: "Speedcat OG",
    brand: "PUMA",
    price: 175000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/puma-speedcat-red.jpg",
    imageNote:
      "Online Speedcat reference. Availability and authenticity are not verified stock claims.",
    color: "Red / White",
    tag: "THE IT PAIR",
    collections: ["icons"],
    material: "Suede upper · Rubber outsole",
    description:
      "A low-profile motorsport silhouette with serious street-style energy. The red-and-white colourway brings a bold finishing touch to a simple outfit.",
  }),
  create({
    id: "nike-af1-white",
    name: "Air Force 1 ’07",
    brand: "NIKE",
    price: 195000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/nike-af1-white.png",
    imageNote:
      "Online product reference. Stock and availability are illustrative.",
    color: "Triple White",
    tag: "KLASSIC ICON",
    collections: ["icons"],
    material: "Leather upper · Rubber outsole",
    description:
      "The all-white sneaker that belongs in every rotation. A clean court-inspired silhouette, substantial sole and an easy match for denim, tailoring or everyday layers.",
  }),
  create({
    id: "penny-loafers",
    name: "Chunky Penny Loafers",
    brand: "INDEPENDENT EDIT",
    price: 55000,
    category: "Loafers",
    gender: "Unisex",
    image: "/products/penny-loafers.png",
    imageNote:
      "Generated product concept. This independent-label assignment item is illustrative.",
    color: "Black",
    tag: "9–5 FAVOURITE",
    collections: ["corporate", "campus"],
    material: "Synthetic leather upper · Chunky rubber sole",
    description:
      "A polished penny-loafer profile on a chunky sole. Slip-on ease for lectures, presentations and the office. A smart choice without the heel.",
  }),
  create({
    id: "timberland-wheat",
    name: "6-Inch Premium Boot",
    brand: "TIMBERLAND",
    price: 350000,
    category: "Boots",
    gender: "Unisex",
    image: "/products/timberland-wheat.png",
    imageNote:
      "Online product reference. Stock and availability are illustrative.",
    color: "Wheat",
    tag: "BUILT DIFFERENT",
    collections: ["icons"],
    material: "Nubuck leather upper · Rubber lug outsole",
    description:
      "The recognisable wheat boot with a padded collar and confident lug sole. A timeless addition to relaxed streetwear and an investment in your rotation.",
  }),
  create({
    id: "nike-air-max-95",
    name: "Air Max 95",
    brand: "NIKE",
    price: 320000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/nike-air-max-95.jpg",
    imageNote:
      "Air Max 95 silhouette reference in an alternate colourway. Triple Black stock is illustrative.",
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
    id: "timberland-black",
    name: "6-Inch Premium Boot",
    brand: "TIMBERLAND",
    price: 350000,
    category: "Boots",
    gender: "Unisex",
    image: "/products/timberland-black.png",
    imageNote:
      "Online product reference. Stock and availability are illustrative.",
    color: "Black",
    collections: ["icons"],
    material: "Nubuck leather upper · Rubber lug outsole",
    description:
      "The signature 6-inch shape in a black finish. Pair with denim, wide-leg trousers or an oversized jacket for a considered everyday look.",
  }),
  create({
    id: "dr-martens-1461",
    name: "1461 Smooth Leather",
    brand: "DR. MARTENS",
    price: 260000,
    category: "Smart shoes",
    gender: "Unisex",
    image: "/products/dr-martens-1461.webp",
    imageNote:
      "1461 silhouette reference in Cherry Red. Black stock is illustrative.",
    color: "Black",
    collections: ["corporate", "icons"],
    material: "Smooth leather upper · Air-cushioned outsole",
    description:
      "A three-eye lace-up with unmistakable character. The low-cut 1461 brings a rebellious edge to tailoring, campus fits and everything in between.",
  }),
  create({
    id: "puma-speedcat-black",
    name: "Speedcat OG",
    brand: "PUMA",
    price: 175000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/puma-speedcat-red.jpg",
    imageNote:
      "Speedcat silhouette reference in Red / White. Black / White stock is illustrative.",
    color: "Black / White",
    collections: ["icons"],
    material: "Suede upper · Rubber outsole",
    description:
      "An understated colourway of the slim motorsport-inspired favourite. Low-profile proportions make it easy to wear with straight-leg and wide-leg trousers.",
  }),
  create({
    id: "adidas-campus",
    name: "Campus 00s",
    brand: "ADIDAS",
    price: 170000,
    category: "Sneakers",
    gender: "Unisex",
    image: "/products/adidas-campus.jpg",
    imageNote:
      "Online Campus model reference. Stock and authenticity require supplier verification.",
    color: "Grey / White",
    collections: ["icons"],
    material: "Suede upper · Rubber outsole",
    description:
      "A skate-inspired silhouette with padded proportions and everyday versatility. A heritage look for a new generation of personal style.",
  }),
  create({
    id: "women-running",
    name: "Everyday Running Shoes",
    brand: "INDEPENDENT EDIT",
    price: 40000,
    category: "Running shoes",
    gender: "Women",
    image: "/products/campus-running.png",
    imageNote:
      "Generated unbranded concept. This affordable assignment item is illustrative.",
    color: "White / Silver",
    tag: "CAMPUS PICK",
    collections: ["campus"],
    material: "Breathable mesh upper · Lightweight foam sole",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    description:
      "Lightweight trainers for your daily routine. A breathable upper and flexible feel, designed to take you from your morning commute to a busy day on campus.",
  }),
  create({
    id: "mary-jane-flats",
    name: "Everyday Mary Jane Flats",
    brand: "INDEPENDENT EDIT",
    price: 35000,
    category: "Flats",
    gender: "Women",
    image: "/products/mary-jane-flats.png",
    imageNote:
      "Generated product concept. This independent-label assignment item is illustrative.",
    color: "Black",
    tag: "NO HEELS NEEDED",
    collections: ["campus", "corporate"],
    material: "Synthetic leather upper · Flat rubber sole",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    description:
      "A neat strap, a comfortable flat profile, and plenty of outfit possibilities. A smart, heel-free option for lectures, the office and after-work plans.",
  }),
  create({
    id: "women-loafers",
    name: "Classic Slip-On Loafers",
    brand: "INDEPENDENT EDIT",
    price: 45000,
    category: "Loafers",
    gender: "Women",
    image: "/products/penny-loafers.png",
    imageNote:
      "Generated product concept. This independent-label assignment item is illustrative.",
    color: "Black",
    collections: ["campus", "corporate"],
    material: "Synthetic leather upper · Low rubber sole",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    description:
      "Smart slip-on loafers with a refined everyday shape. Wear with straight-leg trousers, a midi skirt or relaxed tailoring. A polished alternative to heels.",
  }),
  create({
    id: "unisex-derby",
    name: "Everyday Derby Shoes",
    brand: "INDEPENDENT EDIT",
    price: 55000,
    category: "Smart shoes",
    gender: "Unisex",
    image: "/products/smart-shoes.jpg",
    color: "Brown",
    collections: ["campus", "corporate"],
    material: "Synthetic leather upper · Rubber outsole",
    description:
      "Clean lace-up shoes for a sharp but effortless look. The unisex design makes them an easy choice for presentations, internships and smart everyday dressing.",
  }),
  create({
    id: "mens-oxford",
    name: "Classic Oxford Shoes",
    brand: "INDEPENDENT EDIT",
    price: 65000,
    category: "Smart shoes",
    gender: "Men",
    image: "/products/smart-shoes.jpg",
    color: "Brown",
    collections: ["corporate"],
    material: "Leather upper · Rubber outsole",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    description:
      "A tailored silhouette for your 9–5 rotation. A classic lace-up finish that works with suits, formal trousers and important first impressions.",
  }),
  create({
    id: "women-leather-boots",
    name: "City Leather Ankle Boots",
    brand: "INDEPENDENT EDIT",
    price: 75000,
    category: "Boots",
    gender: "Women",
    image: "/products/boots.jpg",
    color: "Black",
    collections: ["corporate"],
    material: "Leather upper · Low block sole",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    description:
      "An understated ankle boot with a low profile and a polished finish. A wardrobe staple for trousers, denim and city days.",
  }),
  create({
    id: "campus-casual",
    name: "Campus Court Sneakers",
    brand: "INDEPENDENT EDIT",
    price: 30000,
    category: "Casual shoes",
    gender: "Unisex",
    image: "/products/campus-court.png",
    imageNote:
      "Generated unbranded concept. This affordable assignment item is illustrative.",
    color: "White",
    tag: "BUDGET, BUT MAKE IT STYLE",
    collections: ["campus"],
    material: "Canvas upper · Rubber outsole",
    description:
      "Simple court-style sneakers at a student-friendly price. A clean everyday pair for lectures, errands and weekend plans. Part of our independent-label edit.",
  }),
  create({
    id: "everyday-canvas",
    name: "Everyday Canvas Low",
    brand: "INDEPENDENT EDIT",
    price: 25000,
    category: "Casual shoes",
    gender: "Unisex",
    image: "/products/campus-court.png",
    imageNote:
      "Generated unbranded concept. This affordable assignment item is illustrative.",
    color: "Cream",
    collections: ["campus"],
    material: "Canvas upper · Rubber outsole",
    description:
      "Easy canvas shoes with a relaxed low-top shape. Affordable, versatile and ready to become part of your everyday campus rotation.",
  }),
  create({
    id: "minimal-sandals",
    name: "Minimal Everyday Sandals",
    brand: "INDEPENDENT EDIT",
    price: 28000,
    category: "Sandals",
    gender: "Women",
    image: "/products/sandals.jpg",
    color: "Burgundy",
    collections: ["campus"],
    material: "Synthetic straps · Platform sole",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    description:
      "A relaxed platform sandal for warm days and unhurried plans. An easy finishing touch to dresses, jeans and laid-back weekend outfits.",
  }),
  create({
    id: "occasion-heels",
    name: "Sparkle Occasion Heels",
    brand: "INDEPENDENT EDIT",
    price: 45000,
    category: "Heels",
    gender: "Women",
    image: "/products/heels.jpg",
    color: "Champagne",
    collections: [],
    material: "Synthetic upper · Mid-height heel",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    description:
      "A simple heel for celebrations and dressed-up moments. A considered addition for the days when you want a little extra height.",
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
  "Heels",
  "Sandals",
  "Boots",
  "Casual shoes",
];
export const collections = [
  {
    id: "icons" as const,
    name: "The icon edit",
    caption: "Original-brand favourites",
    description: "The names you know. The silhouettes you keep coming back to.",
  },
  {
    id: "campus" as const,
    name: "Campus rotation",
    caption: "Student-friendly · ₦25k–₦55k",
    description:
      "Lecture to link-up. Affordable independent-label pairs that do the most.",
  },
  {
    id: "corporate" as const,
    name: "The 9–5 edit",
    caption: "Smart shoes, zero boring fits",
    description:
      "Loafers, flats and polished lace-ups. Clock in with your own kind of confidence.",
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
