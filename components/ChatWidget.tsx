"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Comment obtenir mon NIE ?",
  "Quel budget pour vivre à Málaga ?",
  "Quelle ville me conviendrait ?",
  "Trouver un appart sans galère ?",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "¡Hola ! Moi c'est **Lola**, l'assistante d'Expat Málaga. NIE, logement, budget, padel, quartier où poser les valises : posez-moi votre question, je vous aiguille vers la bonne réponse (et le bon article du site).",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.role !== "assistant" || m !== INITIAL_GREETING),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erreur ${res.status}`);
      }
      if (!res.body) throw new Error("Réponse vide");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streaming = "";
      // Ajoute un message assistant vide qu'on va remplir
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streaming += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (!last || last.role !== "assistant") return prev;
          const copy = prev.slice(0, -1);
          return [...copy, { role: "assistant", content: streaming }];
        });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError(msg);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant" && last.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      {!open && (
        <button
          aria-label="Ouvrir le chat avec Lola"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-terracotta pl-3 pr-4 py-2.5 text-white shadow-xl hover:bg-terracotta-dark transition"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 font-display text-lg font-bold">
            L
          </span>
          <span className="font-semibold text-sm pr-1 hidden sm:inline">
            Demander à Lola
          </span>
        </button>
      )}

      {/* Panneau */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end sm:p-5">
          {/* Overlay mobile */}
          <div
            className="absolute inset-0 bg-black/30 sm:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative flex w-full sm:w-[420px] h-[85vh] sm:h-[620px] sm:max-h-[calc(100vh-40px)] flex-col rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-forest/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 bg-forest px-4 py-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta font-display text-lg font-bold">
                L
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-base leading-tight">Lola</div>
                <div className="text-xs text-white/70">
                  Assistante Expat Málaga · en ligne
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="rounded-full p-1 hover:bg-white/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/40">
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {loading &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-center gap-2 text-sm text-forest/70">
                    <span className="inline-block h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                    Lola réfléchit...
                  </div>
                )}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                  {error}
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs rounded-full border border-forest/20 bg-white px-3 py-1.5 text-forest hover:bg-terracotta hover:text-white hover:border-terracotta transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-forest/10 bg-white p-3 flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Écris ta question..."
                rows={1}
                className="flex-1 resize-none rounded-lg border border-forest/15 px-3 py-2 text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta max-h-28"
                maxLength={1500}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-terracotta px-4 py-2 text-sm font-semibold text-white hover:bg-terracotta-dark disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Envoyer
              </button>
            </form>
            <div className="px-3 pb-2 text-[10px] text-ink/50 text-center">
              Lola peut se tromper. Vérifiez les infos sensibles auprès d'un
              professionnel.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta text-white text-sm font-bold font-display">
          L
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-forest text-cream rounded-br-sm"
            : "bg-white text-ink border border-forest/10 rounded-bl-sm"
        }`}
      >
        {isUser ? msg.content : renderMarkdownLite(msg.content)}
      </div>
    </div>
  );
}

/**
 * Rendu markdown très léger (liens + gras) — on évite une lib pour garder
 * le bundle petit. Sécurité : on n'accepte que des liens relatifs vers le
 * site ou des liens https externes.
 */
function renderMarkdownLite(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let idx = 0;
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > idx) parts.push(text.slice(idx, match.index));
    if (match[1]) {
      parts.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2] && match[3]) {
      const href = match[3];
      const safe = href.startsWith("/") || href.startsWith("https://");
      parts.push(
        safe ? (
          <a
            key={key++}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-terracotta-dark underline hover:text-terracotta"
          >
            {match[2]}
          </a>
        ) : (
          match[2]
        ),
      );
    }
    idx = match.index + match[0].length;
  }
  if (idx < text.length) parts.push(text.slice(idx));
  return parts;
}
