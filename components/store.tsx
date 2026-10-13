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
  Phone,
  MapPin,
} from "lucide-react";
import {
  products,
  Product,
  photo,
  money,
  categories,
  FREE_SHIPPING_MINIMUM,
} from "@/lib/products";
import { contact, socials } from "@/lib/contact";
import { useAuth } from "./account";
type Line = { id: string; size: string; qty: number };
type State = {
  cart: Line[];
  wishlist: string[];
  ready: boolean;
  add: (id: string, size: string) => void;
  quantity: (id: string, size: string, qty: number) => void;
  wish: (id: string) => void;
  clear: () => void;
};
const Context = createContext<State | null>(null);
export const useStore = () => useContext(Context)!;
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>([]),
    [wishlist, setWish] = useState<string[]>([]),
    [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("kika-store") || "{}");
      setCart(
        Array.isArray(s.cart)
          ? s.cart.filter(
              (l: Line) =>
                l &&
                products.some(
                  (p) => p.id === l.id && p.sizes.includes(l.size),
                ) &&
                Number.isInteger(l.qty) &&
                l.qty > 0 &&
                l.qty <= 99,
            )
          : [],
      );
      setWish(
        Array.isArray(s.wishlist)
          ? s.wishlist.filter((id: string) => products.some((p) => p.id === id))
          : [],
      );
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("kika-store", JSON.stringify({ cart, wishlist }));
      } catch {}
  }, [cart, wishlist, ready]);
  return (
    <Context.Provider
      value={{
        cart,
        wishlist,
        ready,
        add: (id, size) =>
          setCart((c) => {
            if (!products.some((p) => p.id === id && p.sizes.includes(size)))
              return c;
            const item = c.find((l) => l.id === id && l.size === size);
            return item
              ? c.map((l) =>
                  l === item ? { ...l, qty: Math.min(99, l.qty + 1) } : l,
                )
              : [...c, { id, size, qty: 1 }];
          }),
        quantity: (id, size, qty) =>
          setCart((c) =>
            c
              .map((l) =>
                l.id === id && l.size === size
                  ? { ...l, qty: Math.min(99, Math.max(0, Math.floor(qty))) }
                  : l,
              )
              .filter((l) => l.qty > 0),
          ),
        wish: (id) => {
          if (products.some((p) => p.id === id))
            setWish((w) =>
              w.includes(id) ? w.filter((v) => v !== id) : [...w, id],
            );
        },
        clear: () => setCart([]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="KIKA Footwear home">
      <img
        src="/brand/kika-logo.png"
        alt="KIKA — Keep It Klassic Always"
        width={1942}
        height={809}
      />
    </Link>
  );
}
export function Header() {
  const { cart, wishlist } = useStore();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">
        <span>LAGOS ROOTS. GLOBAL TASTE.</span>
        <span>
          Keep It Klassic Always <ArrowUpRight size={12} />
        </span>
        <span className="announcement-demo">Assignment storefront</span>
      </div>
      <header>
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/shop">Shop all</Link>
            <Link href="/shop?collection=icons">The icons</Link>
            <Link href="/shop?collection=campus">Campus rotation</Link>
            <Link href="/shop?collection=corporate">The 9–5 edit</Link>
          </nav>
          <div className="header-actions">
            <Link href="/shop" aria-label="Search products">
              <Search />
            </Link>
            <Link
              href="/account"
              aria-label={
                profile ? "Your account" : "Sign in or create an account"
              }
            >
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
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              { name: "Shop all", href: "/shop" },
              { name: "Campus rotation", href: "/shop?collection=campus" },
              { name: "The 9–5 edit", href: "/shop?collection=corporate" },
              ...categories.map((name) => ({
                name,
                href: `/shop?category=${encodeURIComponent(name)}`,
              })),
              {
                name: profile ? "Your account" : "Sign in / Create account",
                href: "/account",
              },
            ].map((c) => (
              <Link key={c.name} href={c.href} onClick={() => setOpen(false)}>
                {c.name}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
export function SocialLinks() {
  return (
    <div className="social-links">
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.name} — ${s.handle} (opens in new tab)`}
        >
          {s.name}
          <ArrowUpRight size={13} />
        </a>
      ))}
    </div>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            Original-brand icons. Everyday possibilities.
            <br />
            From lectures to late nights. From desk to dinner.
          </p>
          <p className="footer-tagline">KEEP IT KLASSIC ALWAYS.</p>
        </div>
        <div>
          <h4>Find your rotation</h4>
          <Link href="/shop">Shop everything</Link>
          <Link href="/shop?collection=icons">The icon edit</Link>
          <Link href="/shop?collection=campus">Campus rotation</Link>
          <Link href="/shop?collection=corporate">The 9–5 edit</Link>
          <Link href="/shop?category=Flats">Flats & smart shoes</Link>
        </div>
        <div>
          <h4>Good to know</h4>
          <Link href="/about">About KIKA</Link>
          <Link href="/shipping">Shipping & returns</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/account">Your account</Link>
          <Link href="/contact">Contact us</Link>
        </div>
        <div>
          <h4>Let’s connect</h4>
          <a
            className="contact-link"
            href={`tel:${contact.internationalPhone}`}
          >
            <Phone size={14} />
            {contact.phone}
          </a>
          <p className="contact-link">
            <MapPin size={14} />
            {contact.location}
          </p>
          <SocialLinks />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} KIKA Footwear</span>
        <span>
          Independent retailer · Assignment demo · Prices are indicative
        </span>
        <span>Step into your style. ↗</span>
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
            alt={`${p.brand} ${p.name} — style reference`}
            loading="lazy"
          />
        </Link>
        {p.tag && <span className="tag">{p.tag}</span>}
        <button
          className={`wish-button ${wishlist.includes(p.id) ? "selected" : ""}`}
          aria-label={`Toggle ${p.name} ${p.color} in wishlist`}
          aria-pressed={wishlist.includes(p.id)}
          onClick={() => wish(p.id)}
        >
          <Heart
            size={18}
            fill={wishlist.includes(p.id) ? "currentColor" : "none"}
          />
        </button>
        {p.imageNote && (
          <span className="image-caption">
            {p.imageNote.startsWith("Generated")
              ? "CONCEPT IMAGE"
              : "REFERENCE IMAGE"}
          </span>
        )}
      </div>
      <div className="product-meta">
        <span>{p.brand}</span>
        <span>{money(p.price)}</span>
      </div>
      <Link href={`/product/${p.id}`} className="product-name">
        {p.name}
      </Link>
      <p>
        {p.gender} · {p.color}
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
          <b>Lagos, with love</b>
          <small>Demo free delivery from {money(FREE_SHIPPING_MINIMUM)}</small>
        </span>
      </div>
      <div>
        <RotateCcw />
        <span>
          <b>Your fit comes first</b>
          <small>EU sizes · A considered selection</small>
        </span>
      </div>
      <div>
        <ShieldCheck />
        <span>
          <b>Great brands. Personal style.</b>
          <small>Original-brand edit + affordable independent labels</small>
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
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
