import { Instagram, Linkedin, Twitter } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { navLinks } from "@/mock/content";

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
] as const;

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-4 md:px-12 xl:px-28">
      <nav aria-label="Primary navigation" className="mx-auto flex h-11 max-w-[1600px] items-center justify-between">
        <a href="#home" className="flex min-h-11 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
          <LogoMark />
          <span className="font-bold tracking-[-0.02em]">Mindloop</span>
        </a>

        <div className="hidden items-center gap-3 lg:flex">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center gap-3">
              {index > 0 && <span className="text-muted-foreground/50">•</span>}
              <a className="rounded px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground" href={link.href}>
                {link.label}
              </a>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} aria-label={label} href={href} target="_blank" rel="noreferrer" className="liquid-glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
              <Icon aria-hidden="true" size={17} strokeWidth={1.6} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
