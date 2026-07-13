import React, { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useLang } from "../../contexts/LangContext";
import { PRODUCTS } from "../../i18n/translations";

export default function Products() {
  const { t } = useLang();
  const [detail, setDetail] = useState(null);

  return (
    <section id="products" data-testid="products-section" className="relative py-28 lg:py-36 bg-[#090909]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <p className="kicker mb-4" data-testid="products-kicker">{t.products.kicker}</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-tight text-white">
              {t.products.title}
            </h2>
          </div>
          <p className="text-neutral-400 text-base leading-[1.9] max-w-md">
            {t.products.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((p, i) => {
            const item = t.products.items[p.slug];
            return (
              <article
                key={p.slug}
                data-testid={`product-${p.slug}`}
                className="group relative bg-[#0f0f0f] border border-white/10 overflow-hidden transition-colors duration-500 hover:border-white/25"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-4 start-4 flex gap-2">
                    <span className="text-[10px] tracking-[0.22em] uppercase bg-white text-black px-2.5 py-1 font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] tracking-[0.22em] uppercase bg-black/60 backdrop-blur-md border border-white/15 text-white px-2.5 py-1">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 end-4">
                    <span className="text-[11px] tracking-[0.22em] uppercase bg-black/60 backdrop-blur-md border border-white/15 text-white px-3 py-1.5 font-mono">
                      {p.price}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold text-white mb-3">{item.name}</h3>
                  <p className="text-neutral-400 text-sm leading-[1.9] mb-6 min-h-[70px]">{item.desc}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDetail(p.slug)}
                      data-testid={`product-quickview-${p.slug}`}
                      className="flex-1 text-xs tracking-[0.18em] uppercase border border-white/20 text-white py-3 hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      {t.products.specTitle}
                    </button>
                    <a
                      href={p.storeUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`product-cta-${p.slug}`}
                      className="group/btn inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 text-xs tracking-[0.18em] uppercase font-semibold hover:bg-neutral-200 transition-colors duration-300"
                    >
                      <span>{t.products.cta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl-flip" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Product detail modal */}
      {detail && (
        <ProductModal
          slug={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </section>
  );
}

function ProductModal({ slug, onClose }) {
  const { t } = useLang();
  const p = PRODUCTS.find((x) => x.slug === slug);
  const item = t.products.items[slug];
  return (
    <div
      className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md flex items-center justify-center px-4 py-8 animate-fadeUp"
      onClick={onClose}
      data-testid="product-modal"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#0d0d0d] border border-white/10 grid md:grid-cols-2 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          data-testid="product-modal-close"
          className="absolute top-3 end-3 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="relative aspect-square md:aspect-auto">
          <img src={p.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-10">
          <p className="kicker mb-3">{item.tag} · UR SETUP</p>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{item.name}</h3>
          <p className="text-neutral-400 leading-[1.9] mb-6">{item.desc}</p>
          <div className="border-t border-white/10">
            {t.products.specs.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-3.5 border-b border-white/10 text-sm">
                <span className="text-neutral-500 uppercase tracking-[0.18em] text-xs">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-mono text-sm text-white">{p.price}</span>
            <a
              href={p.storeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 text-xs tracking-[0.22em] uppercase font-semibold hover:bg-neutral-200 transition-colors duration-300"
            >
              <span>{t.products.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl-flip" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
