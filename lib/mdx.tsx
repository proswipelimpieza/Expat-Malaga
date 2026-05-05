import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="font-display text-2xl sm:text-3xl mt-12 mb-6 text-forest scroll-mt-24 pb-3 border-b border-forest/10"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="font-display text-xl sm:text-2xl mt-10 mb-5 text-forest scroll-mt-24"
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      {...props}
      className="font-display text-lg mt-8 mb-3 text-forest scroll-mt-24"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="my-5 leading-[1.85] text-ink/90" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-5 pl-6 list-disc space-y-2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="my-5 pl-6 list-decimal space-y-2" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed text-ink/90" />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href}
        {...props}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-terracotta-dark underline underline-offset-2 hover:text-terracotta transition-colors"
      />
    );
  },
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-8 border-l-[3px] border-terracotta pl-5 py-2 italic text-ink/75 bg-cream/60 rounded-r-lg"
    />
  ),
  /* Inline code — has no className. Code inside <pre> has className="language-xxx" so we pass it through. */
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) =>
    className ? (
      <code {...props} className={className} />
    ) : (
      <code
        {...props}
        className="bg-forest/10 text-forest px-1.5 py-0.5 rounded text-[0.875em] font-mono"
      />
    ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl bg-forest p-5 text-sm text-cream/90 font-mono leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
    />
  ),
  hr: () => (
    <hr className="my-10 border-none h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent" />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-forest/15">
      <table {...props} className="w-full text-sm border-collapse" />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      {...props}
      className="bg-forest text-cream px-4 py-2.5 text-left font-semibold text-sm"
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td {...props} className="border-b border-ink/10 px-4 py-2.5 text-ink/85" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-forest" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-ink/80" />
  ),
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents as any,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: ["no-underline"] } },
          ],
        ],
      },
    },
  });
  return content;
}
