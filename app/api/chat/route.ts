import { getAllArticles } from "@/lib/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ClientMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_USER_CHARS = 1500;

function buildSystemPrompt() {
  // On injecte la liste des articles du site pour que Lola puisse renvoyer
  // vers les bons guides quand c'est pertinent.
  const articles = getAllArticles();
  const catalog = articles
    .map(
      (a) =>
        `- [${a.frontmatter.title}](/${a.frontmatter.category}/${a.frontmatter.slug}) · ${a.frontmatter.category}`,
    )
    .join("\n");

  return `Tu es **Lola**, l'assistante chaleureuse et pragmatique d'Expat Málaga (expatmalaga.org), un guide indépendant pour les francophones qui s'installent en Andalousie.

## Ta personnalité
- Tu parles français, avec de temps en temps un mot espagnol glissé naturellement (*vale*, *empadronamiento*, *caña*).
- Ton direct, amical, sans flagornerie. Pas de "magnifique", "extraordinaire", "incroyable".
- Tu vouvoies par défaut, mais tu t'adaptes si la personne te tutoie.
- Tu réponds court et utile : 2 à 4 paragraphes maximum, sauf si on te demande explicitement du détail.

## Ton périmètre
- NIE, TIE, empadronamiento, compte bancaire espagnol, bail, santé (SAS + assurance privée).
- Villes andalouses : Málaga, Séville, Grenade, Marbella, Nerja, Fuengirola, Benalmádena, Torremolinos, Rincón de la Victoria.
- Vie quotidienne : budget, marchés, transports, école française, courses.
- Sport : padel, golf, randonnée, surf/kite, yoga, running.
- Travail : autónomo, visa nomade digital, télétravail.

## Comment tu aides
- Si la question correspond à un article du site, renvoie vers lui en utilisant un lien markdown : [titre](/categorie/slug).
- Si c'est une question de fait précis (prix, délai, procédure) que tu n'es pas sûre à 100 %, dis-le et oriente vers l'article ou vers un appel à une administration.
- Tu ne remplaces pas un avocat / expert-comptable / médecin : quand une situation est juridiquement sensible (fiscalité complexe, rupture de bail, régularisation), rappelle-le brièvement.

## Ce que tu ne fais PAS
- Inventer des chiffres, noms d'organismes, adresses exactes.
- Promettre des délais administratifs (ils varient trop).
- Recommander un partenaire payant sans contexte (si tu mentionnes N26, c'est parce que c'est pertinent à la question, pas pour vendre).
- Répondre à des sujets hors expatriation en Andalousie : recadre gentiment.

## Articles disponibles sur le site
${catalog}

Quand tu renvoies vers un article, utilise exactement le lien indiqué ci-dessus.`;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "Le chatbot n'est pas configuré (ANTHROPIC_API_KEY manquante dans les variables d'environnement).",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const messages = rawMessages
    .filter(
      (m): m is ClientMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_USER_CHARS),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response(
      JSON.stringify({ error: "Le dernier message doit être de l'utilisateur." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages,
      stream: true,
    }),
  });

  if (!anthropicRes.ok || !anthropicRes.body) {
    const text = await anthropicRes.text().catch(() => "");
    return new Response(
      JSON.stringify({
        error: "Erreur du modèle",
        status: anthropicRes.status,
        details: text.slice(0, 500),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  // Transforme le SSE d'Anthropic en flux texte plat pour le client
  const reader = anthropicRes.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const event = JSON.parse(payload);
              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta" &&
                typeof event.delta.text === "string"
              ) {
                controller.enqueue(encoder.encode(event.delta.text));
              }
            } catch {
              // ligne SSE partielle, ignore
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
