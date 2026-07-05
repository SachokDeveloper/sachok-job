interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/**
 * Vector recreation of the Sachok Job mark: a crescent swoosh with a
 * running figure carrying a bag. Rendered as inline SVG so it stays crisp
 * at any size and inherits color via currentColor.
 */
export default function Logo({ size = 34, showWordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-brand ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* crescent swoosh */}
        <path
          d="M40 5C25 5 13 16.5 13 31c0 12.8 9 23.6 21 27-16-1-29-14.4-29-31C5 10 19 -3 36 1.2 37.7 1.6 39 3 40 5Z"
          fill="currentColor"
        />
        <path
          d="M50.5 44c-1 3.8-3 7.2-5.7 10 3-.6 5.7-1.9 7.9-3.7-.3-2.3-1.1-4.4-2.2-6.3Z"
          fill="currentColor"
        />
        {/* running figure */}
        <g fill="currentColor">
          <circle cx="27" cy="16" r="4.2" />
          <path d="M23 22c1.4-1.6 3-2.4 4.6-2.4 2 0 3.4 1 5.6 3.1l4 3.8 5.6-3.3c1-.6 2.2-.2 2.8.8.6 1 .2 2.2-.8 2.8l-6.6 3.9c-.8.5-1.8.4-2.6-.2l-3-2.4-1.6 4.4 5 4.6c.6.5.9 1.3.8 2.1l-1.6 10.6c-.2 1.1-1.2 1.9-2.3 1.7-1.1-.2-1.9-1.2-1.7-2.3l1.4-9.6-5-4.6-3 8.2-4 9.6c-.4 1-1.6 1.5-2.6 1.1-1-.4-1.5-1.6-1.1-2.6l3.8-9.2 3.4-9.4-1.8-4.9c-.6-1.6-.3-3.1.8-4.5Z" />
        </g>
      </svg>
      {showWordmark && (
        <span className="font-extrabold text-lg leading-[1.05] text-ink">
          Sachok
          <br />
          Job
        </span>
      )}
    </span>
  );
}
