import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";
import { CATEGORY_ICONS } from "@/lib/category-icons";

export default function CategoryNav() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2"
            style={{ letterSpacing: "-0.015em" }}
          >
            Explorer par thème
          </h2>
          <p className="text-base text-ink-soft max-w-md mx-auto">
            Cinq rubriques pour tout savoir avant de poser vos valises.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>)
            .filter((key) => key !== "actualites")
            .map((key) => {
              const cat = CATEGORIES[key];
              const cfg = CATEGORY_ICONS[key];
              if (!cfg) return null;
              const Icon = cfg.icon;
              return (
                <Link
                  key={key}
                  href={`/categorie/${key}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-sand p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-sea/30 hover:shadow-[0_12px_28px_rgba(0,150,199,0.13)]"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${cfg.bg} ${cfg.color} transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-sm md:text-base text-ink leading-tight transition-colors group-hover:text-sea">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
