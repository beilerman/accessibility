import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell py-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div>
            <Link href="/" className="font-display text-3xl">
              Threshold
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Local access information, with sources you can follow.
              <br />
              Greater Cincinnati & Northern Kentucky.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/venues">Browse places</Link>
            <Link href="/visitor-reports">Visitor reports</Link>
            <Link href="/access-in-pictures">Visual guide</Link>
            <Link href="/sources">Sources & evidence</Link>
            <Link href="/accessibility">Using this site</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <p className="text-xs text-muted-foreground mt-8 pt-6 border-t border-border">
          Public website research · No field audits yet · Confirm essential
          details with the venue before visiting.
        </p>
      </div>
    </footer>
  );
}
