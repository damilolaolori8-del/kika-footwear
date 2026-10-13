"use client";
import Photograph from "@/components/photograph";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { ArrowRight, ShoppingBag, CheckCircle2, Heart } from "lucide-react";
import { useStore, ProductCard, Quantity } from "./store";
import AccountPage from "./account";
import { contact } from "@/lib/contact";
import { SocialLinks } from "./store";
import { Phone, MapPin } from "lucide-react";
import {
  products,
  photo,
  money,
  FREE_SHIPPING_MINIMUM,
  SHIPPING_COST,
} from "@/lib/products";
export default function UtilityPage({ page }: { page: string }) {
  const store = useStore();
  const [done, setDone] = useState(false),
    [order, setOrder] = useState(""),
    [error, setError] = useState("");
  const subtotal = store.cart.reduce(
      (s, l) => s + (products.find((p) => p.id === l.id)?.price || 0) * l.qty,
      0,
    ),
    shipping = subtotal >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_COST;
  function checkout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!store.cart.length) return;
    setOrder(`KIKA-DEMO-${Date.now().toString(36).toUpperCase()}`);
    store.clear();
    setDone(true);
  }
  if (page === "wishlist")
    return (
      <div className="page-shell">
        <span className="eyebrow">SAVED FOR A LATER STEP</span>
        <h1>Your wishlist.</h1>
        {store.wishlist.length ? (
          <div className="product-grid">
            {products
              .filter((p) => store.wishlist.includes(p.id))
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={40} />
            <h2>A little room for favourites.</h2>
            <p>Tap the heart on a pair you love to save it here.</p>
            <Link className="button dark" href="/shop">
              Explore the edit <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    );
  if (page === "cart")
    return (
      <div className="page-shell">
        <span className="eyebrow">YOUR NEXT FAVOURITES</span>
        <h1>Your shopping bag.</h1>
        {!store.cart.length ? (
          <div className="empty-state">
            <ShoppingBag size={40} />
            <h2>Your next step is waiting.</h2>
            <p>Find a pair you love and add it to your bag.</p>
            <Link href="/shop" className="button dark">
              Discover footwear <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <div>
              {store.cart.map((l) => {
                const p = products.find((p) => p.id === l.id);
                if (!p) return null;
                return (
                  <div className="cart-line" key={l.id + l.size}>
                    <Link href={`/product/${p.id}`}>
                      <Photograph src={photo(p.image, 300)} alt={p.name} />
                    </Link>
                    <div>
                      <span className="eyebrow">{p.brand}</span>
                      <Link href={`/product/${p.id}`}>
                        <h3>{p.name}</h3>
                      </Link>
                      <p>
                        EU {l.size} · {p.color}
                      </p>
                      <Quantity
                        value={l.qty}
                        onChange={(q) => store.quantity(l.id, l.size, q)}
                      />
                      <button
                        className="remove"
                        onClick={() => store.quantity(l.id, l.size, 0)}
                      >
                        Remove
                      </button>
                    </div>
                    <b>{money(p.price * l.qty)}</b>
                  </div>
                );
              })}
            </div>
            <aside className="summary">
              <h2>Order summary</h2>
              <p>
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </p>
              <p>
                <span>Shipping</span>
                <b>{shipping === 0 ? "Free" : money(shipping)}</b>
              </p>
              <p className="total">
                <span>Total</span>
                <b>{money(subtotal + shipping)}</b>
              </p>
              <Link href="/checkout" className="button dark">
                Continue to checkout <ArrowRight size={16} />
              </Link>
              <small>Demo checkout. No real payment is taken.</small>
            </aside>
          </div>
        )}
      </div>
    );
  if (page === "checkout")
    return (
      <div className="page-shell narrow">
        <span className="eyebrow">ONE STEP CLOSER</span>
        <h1>{done ? "Thanks for stepping in." : "Checkout."}</h1>
        {done ? (
          <div className="empty-state">
            <CheckCircle2 size={44} />
            <h2>Your demo order is confirmed.</h2>
            <p>Reference: {order}</p>
            <p>
              No payment was collected. No order will be shipped.
              <br />
              This confirmation is for demonstration only.
            </p>
            <Link href="/shop" className="button dark">
              Keep exploring
            </Link>
          </div>
        ) : !store.cart.length ? (
          <div className="empty-state">
            <p>Your bag is empty.</p>
            <Link href="/shop" className="button dark">
              Shop footwear
            </Link>
          </div>
        ) : (
          <>
            <div className="notice">
              Demo checkout · Do not enter real payment details. No payment
              provider is connected.
            </div>
            <form onSubmit={checkout} className="form">
              <h2>Delivery details</h2>
              <label>
                Full name
                <input required autoComplete="name" />
              </label>
              <label>
                Email address
                <input required type="email" autoComplete="email" />
              </label>
              <label>
                Street address
                <input required autoComplete="street-address" />
              </label>
              <div className="form-row">
                <label>
                  City
                  <input required autoComplete="address-level2" />
                </label>
                <label>
                  Postal code
                  <input required autoComplete="postal-code" />
                </label>
              </div>
              <label>
                Country
                <select required defaultValue="Nigeria">
                  <option value="" disabled>
                    Select country
                  </option>
                  <option>Nigeria</option>
                </select>
              </label>
              <div className="summary">
                <h2>Demo payment</h2>
                <p>Simulated payment — no card information needed.</p>
                <p className="total">
                  <span>
                    Total ({store.cart.reduce((n, l) => n + l.qty, 0)} items)
                  </span>
                  <b>{money(subtotal + shipping)}</b>
                </p>
              </div>
              <button className="button dark" type="submit">
                Place demo order <ArrowRight size={18} />
              </button>
              <small>
                Delivery details are used only in this page and are not
                submitted to a server.
              </small>
            </form>
          </>
        )}
      </div>
    );
  if (["account", "login", "signup", "signin"].includes(page))
    return (
      <AccountPage
        mode={
          page === "signup"
            ? "signup"
            : page === "account"
              ? "account"
              : "login"
        }
      />
    );
  if (page === "contact")
    return (
      <div className="page-shell narrow">
        <span className="eyebrow">LET’S TALK</span>
        <h1>We’re here for you.</h1>
        <p className="lead">
          Questions about a pair, your fit, or your next step? Tell us what’s on
          your mind.
        </p>
        <div className="contact-cards">
          <a href={`tel:${contact.internationalPhone}`}>
            <Phone size={23} />
            <span>Give us a call</span>
            <b>{contact.phone}</b>
          </a>
          <div>
            <MapPin size={23} />
            <span>Our home base</span>
            <b>{contact.location}</b>
          </div>
        </div>
        <div className="contact-social">
          <h2>Find us on your feed.</h2>
          <SocialLinks />
        </div>
        <div className="notice">
          The phone and social links connect to the details you provided. This
          assignment form is a demo and does not send messages.
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
            setError("");
          }}
        >
          <label>
            Name
            <input required />
          </label>
          <label>
            Email
            <input required type="email" />
          </label>
          <label>
            Your message
            <textarea required rows={5} />
          </label>
          <button className="button dark">
            Submit demo message <ArrowRight size={18} />
          </button>
          {done && (
            <p role="status">
              Your form was validated successfully. This demo does not send or
              save messages.
            </p>
          )}
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  if (page === "about")
    return (
      <div className="page-shell">
        <div className="about-grid">
          <div>
            <span className="eyebrow">OUR STORY</span>
            <h1>
              Good taste.
              <br />
              Great footwear.
            </h1>
            <p className="lead">
              Lagos roots. Global taste. A footwear edit made for every side of
              you.
            </p>
            <p>
              KIKA is an independent online footwear retailer based in Lagos,
              Nigeria. Our original-brand edit celebrates Nike, Adidas, PUMA,
              Timberland and Dr. Martens, alongside an affordable
              independent-label collection.
            </p>
            <p>
              From student-friendly campus pairs to sharp 9–5 loafers and smart
              flats, great style should feel like you. We curate shoes from
              other brands — we don’t manufacture them. Keep It Klassic Always.
            </p>
            <Link href="/shop" className="button dark">
              Find your next favourite <ArrowRight size={18} />
            </Link>
          </div>
          <Photograph
            src="/products/white-sneakers.jpg"
            alt="Footwear selected for everyday style"
          />
        </div>
      </div>
    );
  const faq = page === "faq";
  return (
    <div className="page-shell narrow">
      <span className="eyebrow">THE DETAILS THAT MATTER</span>
      <h1>{faq ? "A few good answers." : "Shipping & returns."}</h1>
      <p className="lead">
        {faq
          ? "Everything you need to take your next step."
          : "A little clarity, from our door to yours."}
      </p>
      {(faq
        ? [
            [
              "Is KIKA a shoe manufacturer?",
              "No. KIKA Footwear is an online retailer offering a selection of footwear from different brands.",
            ],
            [
              "Can I place a real order?",
              "This website is a demo. Checkout simulates an order without charging you or dispatching products. Real sales require payment, inventory, fulfilment and order-management integrations.",
            ],
            [
              "How do I choose a size?",
              "Product pages display EU sizes. Select your usual size and consult the brand’s size guide before purchasing. Demo sizes do not represent live inventory.",
            ],
            [
              "Can I save favourites?",
              "Yes. Tap the heart on any product. Your wishlist and cart are saved in this browser.",
            ],
            [
              "Are these prices live offers?",
              "No. Original-brand prices are indicative estimates for new stock, not verified supplier quotes. Campus products are independent-label budget alternatives, not branded replicas. Model imagery and stock are illustrative until confirmed.",
            ],
            [
              "Are accounts secure?",
              "Sign-up and password login work locally in the browser where you create your assignment account. Passwords are salted and hashed, but this is not secure backend authentication and does not sync between devices. Use a demo password only.",
            ],
          ]
        : [
            [
              "Delivery options",
              "Illustrative Lagos delivery: ₦3,500, with free demo delivery from ₦200,000. All prices are in Nigerian naira. Actual delivery rates require fulfilment confirmation.",
            ],
            [
              "Delivery times",
              "Illustrative standard delivery: 3–7 business days after dispatch. This storefront does not dispatch real orders.",
            ],
            [
              "Returns & exchanges",
              "Proposed policy: returns within 30 days for unworn footwear in original packaging. This policy must be confirmed before commercial launch.",
            ],
            [
              "Shipping outside Lagos",
              "Other Nigerian destinations will need a confirmed courier quote before commercial launch. International shipping is not configured.",
            ],
            [
              "Need a hand?",
              "Visit the Contact page for the demo contact experience.",
            ],
          ]
      ).map(([q, a]) => (
        <details key={q} className="faq">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
      <Link href="/contact" className="text-link">
        Still have questions? Get in touch <ArrowRight size={17} />
      </Link>
    </div>
  );
}
