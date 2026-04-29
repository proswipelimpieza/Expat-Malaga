import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communauté",
  description:
    "Rejoignez le groupe WhatsApp des expatriés francophones à Málaga.",
  alternates: { canonical: "https://expatmalaga.org/communaute" },
};

// ─── CONFIGURER ICI ─────────────────────────────────────────────────────────
// 1. Ouvrez votre groupe WhatsApp
// 2. Nom du groupe → "Ajouter des membres" → "Lien d'invitation"
// 3. "Copier le lien"  →  collez-le ici
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/EdpbraSDwnfHfAgUAukPeY?mode=gi_t";
// ────────────────────────────────────────────────────────────────────────────

const isPlaceholder = WHATSAPP_GROUP_URL.includes("VOTRE_LIEN_ICI");

export default function CommunautePage() {
  return (
    <section className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-lg mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-9 w-9 fill-white" aria-hidden>
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.67 4.77 1.83 6.76L2 30l7.45-1.8A13.92 13.92 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2Zm0 25.4c-2.14 0-4.15-.58-5.88-1.6l-.42-.25-4.42 1.07 1.1-4.3-.28-.44A11.4 11.4 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6c6.3 0 11.4 5.1 11.4 11.4 0 6.3-5.1 11.4-11.4 11.4Zm6.26-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.07 1.33-.2.23-.4.26-.74.09-.34-.17-1.43-.53-2.72-1.67-1.01-.9-1.69-2.01-1.88-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.54-.28-.67-.56-.58-.77-.59h-.65c-.23 0-.6.09-.91.43-.31.34-1.18 1.15-1.18 2.81 0 1.65 1.21 3.25 1.38 3.48.17.23 2.39 3.65 5.79 5.12.81.35 1.44.56 1.93.72.81.26 1.55.22 2.13.13.65-.1 2.02-.83 2.3-1.63.29-.8.29-1.49.2-1.63-.08-.15-.31-.23-.65-.4Z" />
        </svg>
      </div>

      <h1 className="font-display text-4xl text-forest mb-4">
        Rejoignez la communauté
      </h1>
      <p className="text-ink/70 leading-relaxed mb-10 max-w-sm mx-auto">
        Le groupe WhatsApp des expatriés francophones à Málaga — entraide,
        bons plans et actualités de terrain.
      </p>

      {isPlaceholder ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800 text-left">
          <strong>⚙️ Lien à configurer</strong><br />
          Remplacez <code className="bg-amber-100 px-1 rounded">VOTRE_LIEN_ICI</code> dans{" "}
          <code className="bg-amber-100 px-1 rounded">app/communaute/page.tsx</code> par le
          vrai lien d'invitation de votre groupe WhatsApp.
        </div>
      ) : (
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-white font-semibold text-lg shadow-lg hover:bg-[#1ebe5d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 fill-white" aria-hidden>
            <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.67 4.77 1.83 6.76L2 30l7.45-1.8A13.92 13.92 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2Zm0 25.4c-2.14 0-4.15-.58-5.88-1.6l-.42-.25-4.42 1.07 1.1-4.3-.28-.44A11.4 11.4 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6c6.3 0 11.4 5.1 11.4 11.4 0 6.3-5.1 11.4-11.4 11.4Zm6.26-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.07 1.33-.2.23-.4.26-.74.09-.34-.17-1.43-.53-2.72-1.67-1.01-.9-1.69-2.01-1.88-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.54-.28-.67-.56-.58-.77-.59h-.65c-.23 0-.6.09-.91.43-.31.34-1.18 1.15-1.18 2.81 0 1.65 1.21 3.25 1.38 3.48.17.23 2.39 3.65 5.79 5.12.81.35 1.44.56 1.93.72.81.26 1.55.22 2.13.13.65-.1 2.02-.83 2.3-1.63.29-.8.29-1.49.2-1.63-.08-.15-.31-.23-.65-.4Z" />
          </svg>
          Rejoindre le groupe
        </a>
      )}
    </section>
  );
}
