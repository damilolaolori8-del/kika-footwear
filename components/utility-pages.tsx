"use client";
import Photograph from "@/components/photograph";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { ArrowRight, ShoppingBag, CheckCircle2, Heart } from "lucide-react";
import { useStore, ProductCard, Quantity } from "./store";
import { products, photo, money } from "@/lib/products";
export default function UtilityPage({ page }: { page: string }) {
  const store = useStore();
  const [done, setDone] = useState(false),
    [order, setOrder] = useState(""),
    [email, setEmail] = useState(""),
    [name, setName] = useState(""),
    [error, setError] = useState("");
  const subtotal = store.cart.reduce(
      (s, l) => s + (products.find((p) => p.id === l.id)?.price || 0) * l.qty,
      0,
    ),
    shipping = subtotal >= 150 ? 0 : 10;
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
                <select required defaultValue="">
                  <option value="" disabled>
                    Select country
                  </option>
                  <option>Nigeria</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
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
  if (["account", "login", "signup"].includes(page)) {
    if (page === "account" && store.profile)
      return (
        <div className="page-shell narrow">
          <span className="eyebrow">YOUR KIKA SPACE</span>
          <h1>Hello, {store.profile.name}.</h1>
          <div className="notice">
            Demo profile stored in this browser. This is not a secure
            authenticated account.
          </div>
          <div className="account-card">
            <h2>Your profile</h2>
            <p>{store.profile.email}</p>
            <Link className="text-link" href="/wishlist">
              View your wishlist <ArrowRight size={16} />
            </Link>
            <p>
              Order history and account management require an authentication and
              order backend.
            </p>
            <button className="button dark" onClick={() => store.login(null)}>
              Sign out of demo
            </button>
          </div>
        </div>
      );
    return (
      <div className="page-shell narrow auth">
        <span className="eyebrow">WELCOME TO KIKA</span>
        <h1>
          {page === "signup" ? "Make yourself at home." : "Welcome back."}
        </h1>
        <div className="notice">
          Demo account experience only. No passwords are collected and no
          identity is verified.
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            store.login({ name: name.trim() || email.split("@")[0], email });
            setDone(true);
          }}
        >
          {done ? (
            <div role="status">
              <h2>Your demo profile is ready.</h2>
              <Link href="/account" className="button dark">
                Visit your account
              </Link>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input
                  value={name}
                  required={page === "signup"}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label>
                Email address
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <button type="submit" className="button dark">
                {page === "signup"
                  ? "Create demo profile"
                  : "Enter demo account"}{" "}
                <ArrowRight size={18} />
              </button>
              <p>
                {page === "signup"
                  ? "Already have a profile?"
                  : "New around here?"}{" "}
                <Link
                  className="text-link"
                  href={page === "signup" ? "/login" : "/signup"}
                >
                  {page === "signup" ? "Log in" : "Sign up"}
                </Link>
              </p>
            </>
          )}
        </form>
      </div>
    );
  }
  if (page === "contact")
    return (
      <div className="page-shell narrow">
        <span className="eyebrow">LET’S TALK</span>
        <h1>We’re here for you.</h1>
        <p className="lead">
          Questions about a pair, your fit, or your next step? Tell us what’s on
          your mind.
        </p>
        <div className="notice">
          Demo contact form. Messages are not sent to a support team.
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
              KIKA Footwear is your destination for discovering shoes from a
              variety of brands and styles.
            </p>
            <p>
              We’re an independent online retailer. We bring together footwear
              from established brands, helping you find a pair that suits your
              style, your plans, and your everyday life.
            </p>
            <p>
              From statement heels to everyday sneakers, our edit celebrates
              personal expression. We don’t manufacture shoes — we help you
              discover them.
            </p>
            <Link href="/shop" className="button dark">
              Find your next favourite <ArrowRight size={18} />
            </Link>
          </div>
          <Photograph
            src={photo("photo-1549298916-b41d501d3772", 1000)}
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
              "Are accounts secure?",
              "The current account flow creates a local demo profile. It does not verify identity. Secure login will require an authentication backend.",
            ],
          ]
        : [
            [
              "Delivery options",
              "Illustrative policy: standard delivery costs $10, with free delivery for orders of $150 or more. Shipping costs use USD throughout the demo.",
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
              "International shipping",
              "Available countries and regional delivery rates will be confirmed when fulfilment is integrated.",
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
