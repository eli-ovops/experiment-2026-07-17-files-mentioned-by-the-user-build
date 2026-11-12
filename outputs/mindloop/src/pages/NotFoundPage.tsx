import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";

export function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5 text-foreground">
      <div className="flex max-w-xl flex-col items-center text-center">
        <LogoMark large />
        <p className="mt-10 text-sm text-muted-foreground">404</p>
        <h1 className="mt-4 font-serif text-6xl italic tracking-[-0.04em] md:text-8xl">A loop went quiet.</h1>
        <p className="mt-6 text-muted-foreground">This page does not exist, but the main feed is still waiting.</p>
        <Button asChild className="mt-10"><a href="/">Return Home</a></Button>
      </div>
    </main>
  );
}
