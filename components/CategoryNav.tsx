import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";
import { CATEGORY_ICONS } from "@/lib/category-icons";

export default function CategoryNav() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta mb-1.5">
            Rubriques
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-forest">
            Explorer par thème
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(
            (key) => {
              const cat = CATEGORIES[key];
              const cfg = CATEGORY_ICONS[key];
              if (!cfg) return null;
              const Icon = cfg.icon;
              return (
                <Link
                  key={key}
                  href={`/categorie/${key}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3 sm:p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-terracotta/30"
                >
                  <div
                    className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${cfg.bg} ${cfg.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-sm md:text-base text-forest leading-tight group-hover:text-terracotta-dark transition-colors">
                    {cat.label}
                  </span>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
