"use client";
import Photograph from "@/components/photograph";
import Link from "next/link";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  ShoppingBag,
  Heart,
  UserRound,
  Search,
  Menu,
  X,
  ArrowUpRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react";
import { products, Product, photo, money, categories } from "@/lib/products";
type Line = { id: string; size: string; qty: number };
type Profile = { name: string; email: string };
type State = {
  cart: Line[];
  wishlist: string[];
  profile: Profile | null;
  add: (id: string, size: string) => void;
  quantity: (id: string, size: string, qty: number) => void;
  wish: (id: string) => void;
  login: (p: Profile | null) => void;
  clear: () => void;
};
const Context = createContext<State | null>(null);
export const useStore = () => useContext(Context)!;
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>([]),
    [wishlist, setWish] = useState<string[]>([]),
    [profile, setProfile] = useState<Profile | null>(null),
    [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("kika-store") || "{}");
      setCart(s.cart || []);
      setWish(s.wishlist || []);
      setProfile(s.profile || null);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      localStorage.setItem(
        "kika-store",
        JSON.stringify({ cart, wishlist, profile }),
      );
  }, [cart, wishlist, profile, ready]);
  return (
    <Context.Provider
      value={{
        cart,
        wishlist,
        profile,
        add: (id, size) =>
          setCart((c) => {
            const item = c.find((l) => l.id === id && l.size === size);
            return item
              ? c.map((l) => (l === item ? { ...l, qty: l.qty + 1 } : l))
              : [...c, { id, size, qty: 1 }];
          }),
        quantity: (id, size, qty) =>
          setCart((c) =>
            c
              .map((l) => (l.id === id && l.size === size ? { ...l, qty } : l))
              .filter((l) => l.qty > 0),
          ),
        wish: (id) =>
          setWish((w) =>
            w.includes(id) ? w.filter((v) => v !== id) : [...w, id],
          ),
        login: setProfile,
        clear: () => setCart([]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function Header() {
  const { cart, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">
        A little more sole. A little more you.{" "}
        <span>
          Free shipping on orders $150+ <ArrowUpRight size={12} />
        </span>
      </div>
      <header>
        <div className="header-inner">
          <Link href="/" className="logo">
            KIKA<span>FOOTWEAR</span>
          </Link>
          <nav className="desktop-nav">
            <Link href="/shop">Shop all</Link>
            <Link href="/shop?category=Men">Men</Link>
            <Link href="/shop?category=Women">Women</Link>
            <Link href="/shop?category=Sneakers">Sneakers</Link>
            <Link href="/shop?sort=new">
              New arrivals <i />
            </Link>
          </nav>
          <div className="header-actions">
            <Link href="/shop" aria-label="Search products">
              <Search />
            </Link>
            <Link href="/account" aria-label="Account">
              <UserRound />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="count-icon">
              <Heart />
              {wishlist.length > 0 && <b>{wishlist.length}</b>}
            </Link>
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="count-icon"
            >
              <ShoppingBag />
              <b>{cart.reduce((s, l) => s + l.qty, 0)}</b>
            </Link>
            <button
              className="mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav">
            {["Shop all", ...categories].map((c) => (
              <Link
                key={c}
                onClick={() => setOpen(false)}
                href={c === "Shop all" ? "/shop" : `/shop?category=${c}`}
              >
                {c}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link href="/" className="logo">
            KIKA<span>FOOTWEAR</span>
          </Link>
          <p>
            Great brands. Good taste.
            <br />
            Your next favourite pair starts here.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/shop">Shop all</Link>
          <Link href="/shop?category=Men">Men’s footwear</Link>
          <Link href="/shop?category=Women">Women’s footwear</Link>
          <Link href="/wishlist">Your wishlist</Link>
        </div>
        <div>
          <h4>We’re here to help</h4>
          <Link href="/contact">Contact us</Link>
          <Link href="/shipping">Shipping & returns</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/account">My account</Link>
        </div>
        <div>
          <h4>The KIKA edit</h4>
          <p>
            A considered collection of shoes
            <br />
            from the brands you love.
          </p>
          <Link href="/about">
            Get to know us <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} KIKA Footwear. All rights reserved.
        </span>
        <span>Independent footwear retailer · Demo storefront</span>
        <span>Instagram ↗ &nbsp; Pinterest ↗</span>
      </div>
    </footer>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  const { wishlist, wish } = useStore();
  return (
    <article className="product-card">
      <div className="product-image">
        <Link href={`/product/${p.id}`}>
          <Photograph
            src={photo(p.image)}
            alt={`${p.brand} ${p.name}`}
            loading="lazy"
          />
        </Link>
        {p.tag && <span className="tag">{p.tag}</span>}
        <button
          className={`wish-button ${wishlist.includes(p.id) ? "selected" : ""}`}
          aria-label={`Toggle ${p.name} in wishlist`}
          onClick={() => wish(p.id)}
        >
          <Heart
            size={18}
            fill={wishlist.includes(p.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="product-meta">
        <span>{p.brand}</span>
        <span>{money(p.price)}</span>
      </div>
      <Link href={`/product/${p.id}`} className="product-name">
        {p.name}
      </Link>
      <p>
        {p.gender}’s {p.category.toLowerCase()} · {p.color}
      </p>
    </article>
  );
}
export function Benefits() {
  return (
    <div className="benefits">
      <div>
        <Truck />
        <span>
          <b>Good things, delivered</b>
          <small>Free shipping on orders $150+</small>
        </span>
      </div>
      <div>
        <RotateCcw />
        <span>
          <b>Find your perfect fit</b>
          <small>Easy returns within 30 days</small>
        </span>
      </div>
      <div>
        <ShieldCheck />
        <span>
          <b>Brands you can trust</b>
          <small>A curated edit of authentic footwear</small>
        </span>
      </div>
    </div>
  );
}
export function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="quantity">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span>{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
