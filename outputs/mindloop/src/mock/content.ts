export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Use Cases", href: "#use-cases" },
] as const;

export const platforms = [
  { name: "ChatGPT", icon: "/icon-chatgpt.png", description: "Shape clear answers for conversational discovery." },
  { name: "Perplexity", icon: "/icon-perplexity.png", description: "Make valuable ideas legible, useful, and easy to cite." },
  { name: "Google AI", icon: "/icon-google.png", description: "Build content that earns a place in evolving search." },
] as const;

export const features = [
  { title: "Curated Feed", description: "A calm reading space built around relevance, not endless volume." },
  { title: "Writer Tools", description: "Simple publishing tools that keep the focus on thinking and craft." },
  { title: "Community", description: "Thoughtful conversation between readers and the people they follow." },
  { title: "Distribution", description: "Reach subscribers wherever they prefer to discover and return." },
] as const;
