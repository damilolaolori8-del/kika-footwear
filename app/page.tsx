import Photograph from "@/components/photograph";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { ProductCard, Benefits, SocialLinks } from "@/components/store";
import { products } from "@/lib/products";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-season">
            <i /> THE KIKA ROTATION / LAGOS, NG
          </span>
          <h1>
            Good shoes.
            <br />
            Better <em>energy.</em>
          </h1>
          <p>
            Original-brand icons. Campus favourites.
            <br />
            Smart pairs for your 9–5. Whatever your next move,
            <br className="desktop-break" /> step into it with your own kind of
            style.
          </p>
          <div className="hero-ctas">
            <Link href="/shop" className="button white">
              Find your next pair <ArrowUpRight size={20} />
            </Link>
            <Link href="/shop?collection=campus" className="hero-secondary">
              Shop campus picks <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hero-note">
            <span>KEEP IT KLASSIC ALWAYS</span>
            <span>01 / THE NEW EDIT</span>
          </div>
        </div>
        <div className="hero-visual">
          <span className="hero-outline" aria-hidden="true">
            KIKA
          </span>
          <div className="hero-photo-frame">
            <Photograph
              src="/products/nike-af1-white.png"
              loading="eager"
              sizes="(max-width: 600px) 70vw, 45vw"
              alt="Nike Air Force 1 Triple White — product reference"
            />
            <div className="hero-product-label">
              <span>THE DAILY OBSESSION</span>
              <b>Fresh pair. Fresh perspective.</b>
              <Link
                href="/shop?collection=icons"
                aria-label="Explore the icon edit"
              >
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
          <div className="hero-sticker">
            <Sparkles size={17} />
            <span>
              GOOD TASTE
              <br />
              COMES STANDARD.
            </span>
          </div>
          <span className="hero-visual-note">
            STYLE REFERENCE / THE ICON EDIT
          </span>
        </div>
      </section>
      <div className="brand-strip">
        <span>
          BIG NAMES.
          <br />
          PERSONAL STYLE.
        </span>
        <b className="nike">NIKE</b>
        <b>adidas</b>
        <b className="puma">PUMA</b>
        <b className="timberland">Timberland</b>
        <b className="martens">Dr. Martens</b>
        <span className="brand-strip-end">CURATED, ALWAYS. ↗</span>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THERE’S A PAIR FOR THAT</span>
            <h2>One you. So many moves.</h2>
          </div>
          <Link href="/shop" className="text-link">
            Explore the collection <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="category-grid">
          {[
            {
              title: "The icon edit",
              label: "BIG BRAND ENERGY",
              collection: "icons",
              image: "/products/black-sneakers.jpg",
              note: "Original-brand favourites",
            },
            {
              title: "Campus rotation",
              label: "LECTURE. LINK-UP. REPEAT.",
              collection: "campus",
              image: "/products/campus-court.png",
              note: "Independent-label picks from ₦25,000",
            },
            {
              title: "The 9–5 edit",
              label: "CLOCK IN. STAND OUT.",
              collection: "corporate",
              image: "/products/smart-shoes.jpg",
              note: "Smart doesn’t have to mean boring",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={`/shop?collection=${c.collection}`}
              className="category-card"
            >
              <Photograph
                src={c.image}
                alt={`${c.title} — illustrative footwear`}
              />
              <div>
                <span>{c.label}</span>
                <h3>{c.title}</h3>
                <p>{c.note}</p>
              </div>
              <span className="circle-arrow">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
        <div className="category-pills">
          {["Women", "Unisex", "Loafers", "Flats", "Sneakers", "Boots"].map(
            (c) => (
              <Link key={c} href={`/shop?category=${encodeURIComponent(c)}`}>
                {c}
                <ArrowUpRight size={15} />
              </Link>
            ),
          )}
        </div>
      </section>
      <section className="section favourites">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURRENT OBSESSIONS</span>
            <h2>Your rotation called.</h2>
          </div>
          <Link href="/shop?collection=icons" className="text-link">
            Meet the icons <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="catalogue-note">
          Indicative prices for the assignment. Exact stock, imagery and
          authenticity require supplier confirmation.
        </p>
      </section>
      <section className="campus-banner">
        <div>
          <span className="eyebrow">BIG STYLE. SMALLER BUDGET.</span>
          <h2>
            Student budget.
            <br />
            <em>Main-character</em> energy.
          </h2>
          <p>
            Good fits shouldn’t cost your entire allowance.
            <br />
            Explore independent-label sneakers, flats and smart shoes.
          </p>
          <Link href="/shop?collection=campus" className="button dark">
            Shop the campus rotation <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="campus-price">
          <span>THE CAMPUS EDIT</span>
          <b>
            ₦25k<span>—</span>₦55k
          </b>
          <p>Affordable. Versatile. Very you.</p>
          <div className="campus-tags">
            <span>LECTURES</span>
            <span>INTERNSHIPS</span>
            <span>WEEKENDS</span>
          </div>
        </div>
      </section>
      <section className="section smart-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SMART SHOES. ZERO HEELS REQUIRED.</span>
            <h2>For the days you mean business.</h2>
          </div>
          <Link href="/shop?collection=corporate" className="text-link">
            Shop the 9–5 edit <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {[
            "mary-jane-flats",
            "women-loafers",
            "unisex-derby",
            "mens-oxford",
          ].map((id) => (
            <ProductCard
              key={id}
              product={products.find((p) => p.id === id)!}
            />
          ))}
        </div>
      </section>
      <section className="editorial">
        <div className="editorial-image">
          <Photograph
            src="/products/boots.jpg"
            alt="Boot style reference for the KIKA edit"
          />
          <span>LAGOS ROOTS / GLOBAL TASTE</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">
            INDEPENDENT RETAILER. INDIVIDUAL STYLE.
          </span>
          <h2>
            Keep it klassic.
            <br />
            Make it <em>yours.</em>
          </h2>
          <p>
            KIKA brings the brands you love and the everyday pairs you need into
            one considered space. Luxury icons, affordable discoveries, and a
            point of view that’s always your own.
          </p>
          <p>
            We’re a Lagos-based footwear retailer. We curate shoes from other
            brands and independent labels — we don’t manufacture them.
          </p>
          <Link href="/about" className="text-link">
            Get to know KIKA <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <Benefits />
      <section className="community">
        <span className="eyebrow light">THE FIT DOESN’T END HERE</span>
        <h2>Find us on your feed.</h2>
        <p>New pairs. Outfit inspiration. All the KIKA energy.</p>
        <SocialLinks />
      </section>
    </>
  );
}
