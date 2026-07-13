import React from "react";
import { Truck, Sparkles, Lock, MessageCircle } from "lucide-react";
import { useLang } from "../../contexts/LangContext";

const icons = [Truck, Sparkles, Lock, MessageCircle];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why" data-testid="why-section" className="py-28 lg:py-36 bg-[#090909] border-y border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <p className="kicker mb-4">{t.why.kicker}</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-tight text-white">
            {t.why.title}
          </h2>
        </div>
        {/* Bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {t.why.items.map((it, i) => {
            const Icon = icons[i];
            // Asymmetric spans
            const spanClass = [
              "lg:col-span-7",
              "lg:col-span-5",
              "lg:col-span-5",
              "lg:col-span-7",
            ][i];
            return (
              <div
                key={it.t}
                data-testid={`why-card-${i}`}
                className={`${spanClass} group relative bg-[#0f0f0f] border border-white/10 p-9 lg:p-11 min-h-[220px] hover:border-white/25 transition-colors duration-500`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="kicker mb-2 font-mono">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">{it.t}</h3>
                    <p className="text-neutral-400 leading-[1.9] max-w-md">{it.d}</p>
                  </div>
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
