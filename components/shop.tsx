"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "./store";
export default function Shop() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "All"),
    [sort, setSort] = useState(params.get("sort") || "featured"),
    [query, setQuery] = useState(""),
    [max, setMax] = useState(200);
  useEffect(() => {
    setCategory(params.get("category") || "All");
    setSort(params.get("sort") || "featured");
  }, [params]);
  let list = products.filter(
    (p) =>
      (category === "All" ||
        p.category === category ||
        p.gender === category) &&
      p.price <= max &&
      `${p.brand} ${p.name}`.toLowerCase().includes(query.toLowerCase()),
  );
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "new") list.reverse();
  return (
    <div className="page-shell">
      <span className="eyebrow">YOUR NEXT STEP STARTS HERE</span>
      <h1>The footwear edit.</h1>
      <p className="lead">
        Great brands. Thoughtful choices. A pair for every version of you.
      </p>
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            aria-label="Search shoes"
            placeholder="Search styles or brands"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="new">New arrivals</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>
      <div className="shop-layout">
        <aside className="filters">
          <h3>
            <SlidersHorizontal size={17} /> Filters
          </h3>
          <h4>Category</h4>
          {["All", ...categories].map((c) => (
            <button
              className={category === c ? "active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
              <span>
                {
                  products.filter(
                    (p) => c === "All" || p.category === c || p.gender === c,
                  ).length
                }
              </span>
            </button>
          ))}
          <h4>Maximum price: ${max}</h4>
          <input
            aria-label="Maximum price"
            type="range"
            min="75"
            max="200"
            step="5"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
          <button
            onClick={() => {
              setCategory("All");
              setQuery("");
              setMax(200);
              setSort("featured");
            }}
          >
            Reset filters
          </button>
        </aside>
        <div>
          <p className="result-count">{list.length} considered choices</p>
          <div className="product-grid shop-products">
            {list.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
          {!list.length && (
            <div className="empty-state">
              <h2>No pairs found.</h2>
              <p>Try another search or adjust your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
