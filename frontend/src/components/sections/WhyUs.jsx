import React from "react";
import { Truck, Sparkles, Lock, MessageCircle } from "lucide-react";
import { useLang } from "../../contexts/LangContext";
import { ASSETS } from "../../i18n/translations";

const icons = [Truck, Sparkles, Lock, MessageCircle];
const bgs = [ASSETS.setup1, ASSETS.setup2, ASSETS.hero, ASSETS.about];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why" data-testid="why-section" className="py-28 lg:py-36 bg-[#090909] border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="kicker mb-4">{t.why.kicker}</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-tight text-white">
            {t.why.title}
          </h2>
        </div>
        {/* Immersive bento */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {t.why.items.map((it, i) => {
            const Icon = icons[i];
            const spanClass = [
              "lg:col-span-7",
              "lg:col-span-5",
              "lg:col-span-5",
              "lg:col-span-7",
            ][i];
            const minH = [
              "min-h-[280px] lg:min-h-[340px]",
              "min-h-[280px] lg:min-h-[340px]",
              "min-h-[280px] lg:min-h-[340px]",
              "min-h-[280px] lg:min-h-[340px]",
            ][i];
            return (
              <article
                key={it.t}
                data-testid={`why-card-${i}`}
                className={`${spanClass} ${minH} group relative overflow-hidden`}
              >
                <img
                  src={bgs[i]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }} />

                <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-6">
                    <p className="kicker font-mono">{String(i + 1).padStart(2, "0")}</p>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">{it.t}</h3>
                    <p className="text-neutral-200/90 leading-[1.85] max-w-md text-sm md:text-base">{it.d}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
