import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Camera,
  Accessibility,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AccessReview — real accessibility reviews by people who live it every day. Founded by Matthew Brothers, TBI survivor and scooter user, and Brad Eilerman, MD.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="py-4">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <span aria-current="page" className="text-foreground font-medium">
                About
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero / Intro */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              About AccessReview
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
              Real accessibility reviews by people who live it every day.
            </p>
          </div>
        </section>

        {/* Matthew's Story */}
        <section aria-labelledby="why-heading" className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2
              id="why-heading"
              className="font-display text-2xl sm:text-3xl font-bold mb-6"
            >
              Why This Exists
            </h2>
            <div className="space-y-5 text-lg leading-relaxed">
              <p>
                My name is Matthew Brothers. Thirty years ago, a traumatic brain injury
                changed the way I move through the world. I have spastic gait. I use a
                mobility scooter. I live in Maysville, Kentucky, and I work as an
                accessibility consultant at Novant Health. Accessibility isn&apos;t an
                abstract concern for me &mdash; it&apos;s the difference between going
                somewhere and staying home.
              </p>
              <p>
                Here&apos;s what I got tired of: Google tells you a place is
                &ldquo;wheelchair accessible.&rdquo; Great. That checkbox means nothing.
                It doesn&apos;t tell you the ramp is around back through an unpaved
                alley. It doesn&apos;t mention the bathroom door is 28 inches wide. It
                doesn&apos;t warn you the only accessible table is next to the kitchen
                door and the staff will look at you like you&apos;re an inconvenience.
              </p>
              <p>
                Every review app out there is the same thing: a database with star
                ratings. Nobody writes about what it actually <em>feels like</em> to
                navigate a venue when you roll instead of walk. Nobody tells you whether
                you can get your scooter to the bathroom without asking three people to
                move, or whether the hostess will seat you or stare at you.
              </p>
              <p>
                So I decided to do it myself. Real reviews. Narrative, specific,
                photo-backed. Not a database with a checkbox &mdash; an editorial voice
                that tells you the truth about a place before you waste your time, your
                energy, and your dignity finding out the hard way.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section aria-labelledby="mission-heading" className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2
              id="mission-heading"
              className="font-display text-2xl sm:text-3xl font-bold mb-6"
            >
              Our Mission
            </h2>
            <div className="space-y-5 text-lg leading-relaxed">
              <p className="text-xl font-semibold text-accent">
                Know before you go.
              </p>
              <p>
                Honest, specific, photo-backed accessibility reviews. No gamification.
                No star ratings. No feel-good fluff.
              </p>
              <p>
                When a venue falls short, we say so &mdash; by name, with specifics. When
                they get it right, we give them genuine praise. Vague positivity helps
                nobody. Specificity helps everyone.
              </p>
              <p>
                We lead with photos: the entrance, the path to your table, the
                bathroom. If we can&apos;t show it, we tell you why. A review without
                photos is just an opinion. A review with photos is evidence.
              </p>
            </div>
          </div>
        </section>

        {/* How Reviews Work */}
        <section aria-labelledby="review-heading" className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2
              id="review-heading"
              className="font-display text-2xl sm:text-3xl font-bold mb-6"
            >
              How We Review
            </h2>
            <div className="space-y-5 text-lg leading-relaxed mb-8">
              <p>
                Editorial reviews are first-class citizens here. Every editorial review
                is narrative, photo-documented, and specific to the experience of
                navigating that venue with a mobility device. Community reviews
                supplement the editorial voice &mdash; more perspectives make better
                information.
              </p>
            </div>

            <h3 className="font-display text-xl font-bold mb-4">What We Assess</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { icon: MapPin, label: "Parking & drop-off access" },
                { icon: Accessibility, label: "Entrance (ramp, door width, threshold)" },
                { icon: Accessibility, label: "Interior navigation & table access" },
                { icon: Accessibility, label: "Bathroom (door width, grab bars, space)" },
                { icon: Accessibility, label: "Scooter-specific considerations" },
                { icon: Users, label: "Staff attitude & willingness to help" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-3 text-base"
                >
                  <item.icon
                    className="h-5 w-5 text-accent mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-display text-xl font-bold mb-4">Rating System</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-rating-accessible mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="font-semibold text-rating-accessible">
                    Accessible
                  </span>
                  <span className="text-muted-foreground">
                    {" "}&mdash; Genuinely usable. You can get in, navigate, and use
                    the facilities independently.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="h-5 w-5 text-rating-partial mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="font-semibold text-rating-partial">
                    Partially Accessible
                  </span>
                  <span className="text-muted-foreground">
                    {" "}&mdash; Possible with caveats. You can make it work, but
                    expect compromises or ask for help.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle
                  className="h-5 w-5 text-rating-not-accessible mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="font-semibold text-rating-not-accessible">
                    Not Accessible
                  </span>
                  <span className="text-muted-foreground">
                    {" "}&mdash; Significant barriers. Don&apos;t waste your time
                    unless you enjoy frustration.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Team */}
        <section aria-labelledby="team-heading" className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2
              id="team-heading"
              className="font-display text-2xl sm:text-3xl font-bold mb-8"
            >
              The Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matthew */}
              <article className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces"
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      Matthew Brothers
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Writer &amp; Accessibility Reviewer
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-4">
                  TBI survivor and scooter user with 30 years navigating the world
                  with spastic gait. Accessibility consultant at Novant Health.
                </p>
                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-accent pl-3">
                  &ldquo;I review venues so you know what you&apos;re getting into
                  before you get there.&rdquo;
                </blockquote>
              </article>

              {/* Brad */}
              <article className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=faces"
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      Brad Eilerman, MD
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Technology &amp; Strategy
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Physician and technologist based in Northern Kentucky. Builds the
                  platform so Matthew&apos;s reviews reach the people who need them.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section aria-labelledby="involved-heading" className="py-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <h2
              id="involved-heading"
              className="font-display text-2xl sm:text-3xl font-bold mb-6"
            >
              Get Involved
            </h2>
            <div className="space-y-5 text-lg leading-relaxed">
              <p>
                Have a venue you want reviewed? Know a place that gets it right
                &mdash; or spectacularly wrong? We want to hear about it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="https://substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  Subscribe on Substack
                </a>
                <a
                  href="mailto:contact@accessreview.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  Suggest a Venue
                </a>
              </div>
              <p className="text-sm text-muted-foreground bg-muted rounded-lg px-4 py-3">
                Community reviews are coming soon. For now, editorial reviews are
                written by Matthew. If you have firsthand experience with a venue,
                reach out &mdash; your perspective matters.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
