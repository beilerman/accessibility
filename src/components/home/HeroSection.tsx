import { SearchBar } from "@/components/layout/SearchBar";

export function HeroSection() {
  return (
    <section className="py-16 sm:py-24 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Know before you go.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Real accessibility reviews by real people with mobility challenges.
          Greater Cincinnati &amp; Northern Kentucky.
        </p>
        <div className="mt-10">
          <SearchBar size="lg" className="max-w-xl mx-auto" />
        </div>
      </div>
    </section>
  );
}
