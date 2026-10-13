"use client";
import Photograph from "@/components/photograph";
import Link from "next/link";
import { useState } from "react";
import { Heart, ArrowRight, Truck, RotateCcw } from "lucide-react";
import {
  Product,
  products,
  photo,
  money,
  FREE_SHIPPING_MINIMUM,
} from "@/lib/products";
import { useStore, ProductCard } from "./store";
export default function ProductDetail({ product: p }: { product: Product }) {
  const { add, wish, wishlist } = useStore();
  const [size, setSize] = useState(""),
    [message, setMessage] = useState("");
  return (
    <div className="page-shell">
      <div className="breadcrumbs">
        <Link href="/shop">Shop</Link> / {p.category} / {p.name}
      </div>
      <div className="detail-grid">
        <div className="detail-image">
          <Photograph
            src={photo(p.image, 1200)}
            alt={`${p.brand} ${p.name} — reference image`}
          />
          <p className="detail-image-note">{p.imageNote}</p>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{p.brand}</span>
          <h1>{p.name}</h1>
          <p className="detail-price">{money(p.price)}</p>
          <p className="price-caption">
            Indicative pricing · Assignment catalogue
          </p>
          <p className="lead">{p.description}</p>
          <p>
            Colour: <b>{p.color}</b>
          </p>
          <div className="size-heading">
            <b>Select size (EU)</b>
            <span>Standard EU sizing</span>
          </div>
          <div className="sizes">
            {p.sizes.map((s) => (
              <button
                className={size === s ? "active" : ""}
                key={s}
                onClick={() => {
                  setSize(s);
                  setMessage("");
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="add-row">
            <button
              className="button dark"
              onClick={() => {
                if (!size) {
                  setMessage("Please choose your size first.");
                  return;
                }
                add(p.id, size);
                setMessage("Added to your bag.");
              }}
            >
              Add to bag <ArrowRight size={18} />
            </button>
            <button
              className="detail-heart"
              aria-label="Toggle wishlist"
              onClick={() => wish(p.id)}
            >
              <Heart fill={wishlist.includes(p.id) ? "currentColor" : "none"} />
            </button>
          </div>
          <p role="status" className="status">
            {message}
            {message === "Added to your bag." && (
              <>
                {" "}
                <Link href="/cart">View bag →</Link>
              </>
            )}
          </p>
          <div className="detail-service">
            <p>
              <Truck size={18} /> Demo free shipping from{" "}
              {money(FREE_SHIPPING_MINIMUM)}
            </p>
            <p>
              <RotateCcw size={18} /> Proposed 30-day returns · Unworn, original
              packaging
            </p>
          </div>
          <details open>
            <summary>About this pair</summary>
            <p>
              {p.gender} {p.category.toLowerCase()} in {p.color}. {p.material}.
              Listed products, prices and availability are illustrative demo
              catalogue data and require supplier verification before launch.
            </p>
          </details>
          <details>
            <summary>Care & fit</summary>
            <p>
              Choose your usual EU size. Fit varies by brand. Follow the
              manufacturer’s care label and clean gently with a soft cloth.
            </p>
          </details>
        </div>
      </div>
      <section className="section related">
        <h2>Keep exploring.</h2>
        <div className="product-grid">
          {products
            .filter((v) => v.id !== p.id)
            .slice(0, 4)
            .map((v) => (
              <ProductCard key={v.id} product={v} />
            ))}
        </div>
      </section>
    </div>
  );
}
