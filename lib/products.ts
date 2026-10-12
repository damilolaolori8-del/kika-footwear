export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  gender: string;
  image: string;
  color: string;
  tag?: string;
};
export const products: Product[] = [
  {
    id: "air-classic",
    name: "Air Classic 90",
    brand: "NIKE",
    price: 145,
    category: "Sneakers",
    gender: "Men",
    image: "photo-1542291026-7eec264c27ff",
    color: "University Red",
    tag: "BESTSELLER",
  },
  {
    id: "city-runner",
    name: "City Runner",
    brand: "NEW BALANCE",
    price: 120,
    category: "Sneakers",
    gender: "Women",
    image: "photo-1549298916-b41d501d3772",
    color: "Sand / White",
    tag: "NEW ARRIVAL",
  },
  {
    id: "everyday-court",
    name: "Everyday Court",
    brand: "ADIDAS",
    price: 95,
    category: "Casual shoes",
    gender: "Men",
    image: "photo-1600269452121-4f2416e55c28",
    color: "Cloud White",
  },
  {
    id: "essential-heel",
    name: "The Essential Heel",
    brand: "STEVE MADDEN",
    price: 110,
    category: "Heels",
    gender: "Women",
    image: "photo-1518049362265-d5b2a6467637",
    color: "Classic Black",
    tag: "EDITOR’S PICK",
  },
  {
    id: "weekend-sandal",
    name: "Weekend Sandal",
    brand: "BIRKENSTOCK",
    price: 85,
    category: "Sandals",
    gender: "Women",
    image: "photo-1562273138-f46be4ebdf33",
    color: "Natural Tan",
  },
  {
    id: "heritage-boot",
    name: "Heritage Boot",
    brand: "TIMBERLAND",
    price: 180,
    category: "Boots",
    gender: "Men",
    image: "photo-1520639888713-7851133b1ed0",
    color: "Wheat",
  },
  {
    id: "retro-low",
    name: "Retro Low",
    brand: "CONVERSE",
    price: 75,
    category: "Casual shoes",
    gender: "Women",
    image: "photo-1525966222134-fcfa99b8ae77",
    color: "Off White",
  },
  {
    id: "sport-runner",
    name: "Sport Runner",
    brand: "PUMA",
    price: 130,
    category: "Sneakers",
    gender: "Men",
    image: "photo-1469334031218-e382a71b716b",
    color: "Black / White",
  },
];
export const categories = [
  "Men",
  "Women",
  "Sneakers",
  "Heels",
  "Sandals",
  "Boots",
  "Casual shoes",
];
export const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
export const photo = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
