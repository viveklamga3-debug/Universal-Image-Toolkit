import ToolCard from "@/components/tool-card";
import { TOOLS } from "@/lib/tools";
import type { SVGProps } from "react";

function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M168 224h-28a28 28 0 0 1-28-28V168h28M32 168h28a28 28 0 0 1 28 28v28M88 32v28a28 28 0 0 1-28 28H32m192 0h-28a28 28 0 0 1-28-28V32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M32 112h192"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-12">
        <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
          <Logo className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground font-headline">
          Filemaster 
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
          Fast, Simple &amp; Safe Image Tools. All processing happens in your browser, so your images remain private.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </section>
    </div>
  );
}
