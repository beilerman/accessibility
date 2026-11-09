/** The Threshold mark: an open doorway arch standing on a threshold line. */
export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 30"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 26V12a8 8 0 0 1 16 0v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M1.5 27h23"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="17.5" r="1.6" fill="currentColor" />
    </svg>
  );
}
