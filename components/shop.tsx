"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import {
  products,
  categories,
  collections,
  money,
  matchesCategory,
} from "@/lib/products";
import { ProductCard } from "./store";
const PRICE_LIMIT = Math.max(...products.map((p) => p.price));
export default function Shop() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "All"),
    [collection, setCollection] = useState(params.get("collection") || "all"),
    [sort, setSort] = useState(params.get("sort") || "featured"),
    [query, setQuery] = useState(""),
    [max, setMax] = useState(PRICE_LIMIT),
    [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    setCategory(params.get("category") || "All");
    setCollection(params.get("collection") || "all");
    setSort(params.get("sort") || "featured");
  }, [params]);
  const edit = collections.find((c) => c.id === collection);
  const list = products.filter(
    (p) =>
      matchesCategory(p, category) &&
      (collection === "all" || p.collections.some((c) => c === collection)) &&
      p.price <= max &&
      `${p.brand} ${p.name} ${p.color} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "new") list.reverse();
  const reset = () => {
    setCategory("All");
    setCollection("all");
    setQuery("");
    setMax(PRICE_LIMIT);
    setSort("featured");
  };
  return (
    <div className="page-shell">
      <div className="shop-page-heading">
        <span className="eyebrow">
          {edit?.caption || "CONSIDER THIS YOUR NEXT OBSESSION"}
        </span>
        <h1>{edit?.name || "The footwear collection."}</h1>
        <p className="lead">
          {edit?.description ||
            "From campus to the corner office. Find a pair for every side of you."}
        </p>
      </div>
      <div
        className="collection-tabs"
        role="group"
        aria-label="Shop collections"
      >
        <button
          className={collection === "all" ? "active" : ""}
          onClick={() => setCollection("all")}
        >
          Everything
        </button>
        {collections.map((c) => (
          <button
            key={c.id}
            className={collection === c.id ? "active" : ""}
            onClick={() => setCollection(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            aria-label="Search shoes"
            placeholder="Search styles, colours or brands"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="sort-controls">
          <button
            className="filter-toggle"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
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
      </div>
      <div className="shop-layout">
        <aside className={`filters ${filtersOpen ? "filters-open" : ""}`}>
          <h3>
            <SlidersHorizontal size={17} /> A little more specific?
          </h3>
          <h4>Category</h4>
          {["All", ...categories].map((c) => (
            <button
              className={category === c ? "active" : ""}
              aria-pressed={category === c}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
              <span>
                {
                  products.filter(
                    (p) =>
                      matchesCategory(p, c) &&
                      (collection === "all" ||
                        p.collections.some((v) => v === collection)),
                  ).length
                }
              </span>
            </button>
          ))}
          <h4>Maximum price: {money(max)}</h4>
          <input
            aria-label="Maximum price"
            type="range"
            min="25000"
            max={PRICE_LIMIT}
            step="5000"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
          <p className="filter-price-range">
            <span>{money(25000)}</span>
            <span>{money(PRICE_LIMIT)}</span>
          </p>
          <button onClick={reset} className="reset-filters">
            Reset filters
          </button>
        </aside>
        <div>
          <div className="shop-results">
            <p className="result-count">
              {list.length} {list.length === 1 ? "pair" : "pairs"} matching your
              filters
            </p>
            <span>Prices in NGN · Indicative catalogue</span>
          </div>
          <div className="product-grid shop-products">
            {list.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
          {!list.length && (
            <div className="empty-state">
              <h2>No pairs found.</h2>
              <p>Try another search or give your filters a little room.</p>
              <button className="button dark" onClick={reset}>
                See all pairs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
