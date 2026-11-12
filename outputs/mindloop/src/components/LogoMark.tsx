import { cn } from "@/lib/utils";

export function LogoMark({ large = false, className }: { large?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid shrink-0 place-items-center rounded-full border-2 border-foreground/60", large ? "h-10 w-10" : "h-7 w-7", className)}
    >
      <span className={cn("rounded-full border border-foreground/60", large ? "h-5 w-5" : "h-3 w-3")} />
    </span>
  );
}
