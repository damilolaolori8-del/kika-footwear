import Photograph from "@/components/photograph";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ProductCard, Benefits } from "@/components/store";
import { products, photo } from "@/lib/products";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Photograph
          className="hero-image"
          src={photo("photo-1543508282-6319a3e2621f", 1800)}
          alt="A considered collection of casual sneakers"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow light">THE EVERYDAY, ELEVATED</span>
          <h1>
            Good shoes.
            <br />
            Great places.
          </h1>
          <p>
            Discover your next favourite pair.
            <br />
            The brands you love, the styles that move you.
          </p>
          <Link href="/shop" className="button white">
            Find your next step <ArrowUpRight size={19} />
          </Link>
          <div className="hero-note">
            <span>01 — THE NEW SEASON EDIT</span>
            <div className="slide-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <span className="hero-vertical">CURATED FOR THE WAY YOU MOVE</span>
      </section>
      <div className="brand-strip">
        <span>
          THE BRANDS YOU LOVE.
          <br />
          ALL IN ONE PLACE.
        </span>
        <b className="nike">NIKE</b>
        <b>adidas</b>
        <b className="new-balance">new balance</b>
        <b>
          CONVERSE <span>★</span>
        </b>
        <b className="puma">PUMA</b>
        <b className="timberland">Timberland</b>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A PAIR FOR EVERY PLAN</span>
            <h2>Find your kind of footwear.</h2>
          </div>
          <Link href="/shop" className="text-link">
            Explore all categories <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="category-grid">
          {[
            {
              title: "For him",
              label: "EVERYDAY TO ANYWHERE",
              category: "Men",
              image: "photo-1549298916-b41d501d3772",
            },
            {
              title: "For her",
              label: "YOUR STYLE. YOUR STRIDE.",
              category: "Women",
              image: "photo-1518049362265-d5b2a6467637",
            },
            {
              title: "Sneaker culture",
              label: "FRESH PAIRS. NEW PERSPECTIVES.",
              category: "Sneakers",
              image: "photo-1600269452121-4f2416e55c28",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={`/shop?category=${c.category}`}
              className="category-card"
            >
              <Photograph src={photo(c.image)} alt={c.title} />
              <div>
                <span>{c.label}</span>
                <h3>{c.title}</h3>
              </div>
              <span className="circle-arrow">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
        <div className="category-pills">
          {["Heels", "Sandals", "Boots", "Casual shoes"].map((c) => (
            <Link key={c} href={`/shop?category=${c}`}>
              {c}
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section favourites">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE PAIRS EVERYONE’S TALKING ABOUT</span>
            <h2>Meet your new favourites.</h2>
          </div>
          <Link href="/shop" className="text-link">
            Shop the edit <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="editorial">
        <div className="editorial-image">
          <Photograph
            src={photo("photo-1525966222134-fcfa99b8ae77", 1100)}
            alt="Classic sneakers with timeless character"
          />
          <span>THE KIKA POINT OF VIEW</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">MORE THAN A PAIR OF SHOES</span>
          <h2>
            A little confidence.
            <br />A lot of possibility.
          </h2>
          <p>
            We believe the right shoes change how you feel. That’s why we bring
            together exceptional footwear from the brands you know and the ones
            you’re about to love.
          </p>
          <p>Considered choices. Personal style. Every step of the way.</p>
          <Link href="/about" className="text-link">
            Our story <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Benefits />
      <section className="newsletter">
        <span className="eyebrow">STAY ONE STEP AHEAD</span>
        <h2>Your next favourite is out there.</h2>
        <p>
          Explore new arrivals, everyday icons, and a fresh perspective on
          footwear.
        </p>
        <Link href="/shop?sort=new" className="button dark">
          Discover new arrivals <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
