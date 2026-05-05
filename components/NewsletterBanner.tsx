export default function NewsletterBanner() {
  return (
    <section className="py-14 bg-navy">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-sea mb-3">
          Restez informé
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-4 leading-tight">
          La newsletter des expats
        </h2>
        <p className="text-white/60 mb-8 leading-relaxed max-w-md mx-auto">
          Un email par semaine : les actualités qui changent quelque chose pour
          les Français en Andalousie. Pas de spam, désabonnement en un clic.
        </p>

        <form
          action="https://formsubmit.co/proswipe.limpieza@gmail.com"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input type="hidden" name="_subject" value="Nouvelle inscription newsletter — Expat Málaga" />
          <input type="hidden" name="_next" value="https://expatmalaga.org/?newsletter=ok" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="text" name="_honey" className="hidden" />

          <input
            type="email"
            name="email"
            required
            placeholder="votre@email.com"
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-sea focus:bg-white/15 transition-colors"
          />
          <button
            type="submit"
            className="rounded-full bg-sea hover:bg-sea-dark px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shadow-md"
          >
            Je m'inscris
          </button>
        </form>

        <p className="mt-4 text-xs text-white/30">
          Vos données sont utilisées uniquement pour l'envoi de la newsletter.
        </p>
      </div>
    </section>
  );
}
