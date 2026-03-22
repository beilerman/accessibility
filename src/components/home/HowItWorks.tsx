import { Search, BookOpen, Navigation, MessageSquare } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Search",
    description:
      "Find venues near you by name, category, or neighborhood.",
  },
  {
    icon: BookOpen,
    title: "Read",
    description:
      "Read detailed accessibility reviews written by people who use mobility devices.",
  },
  {
    icon: Navigation,
    title: "Go",
    description:
      "Visit with confidence, knowing what to expect before you arrive.",
  },
  {
    icon: MessageSquare,
    title: "Review",
    description:
      "Share your own experience to help others in the community.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="py-12">
      <h2
        id="how-it-works-heading"
        className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center"
      >
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-accent/10 text-accent mb-4">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                Step {index + 1}
              </span>
              <h3 className="font-display text-lg font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
