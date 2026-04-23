import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function CategoryNav() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl md:text-4xl text-forest mb-6">
          Explorer par thème
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(
            (key) => {
              const cat = CATEGORIES[key];
              return (
                <Link
                  key={key}
                  href={`/categorie/${key}`}
                  className="group rounded-xl border border-forest/15 bg-white p-4 text-center transition hover:border-terracotta hover:bg-terracotta/5"
                >
                  <div className="text-3xl mb-2" aria-hidden>
                    {cat.emoji}
                  </div>
                  <div className="font-display text-lg text-forest group-hover:text-terracotta-dark">
                    {cat.label}
                  </div>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
