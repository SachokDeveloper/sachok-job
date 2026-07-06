import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-hover disabled:bg-primary-200",
  secondary:
    "bg-primary-50 text-primary-600 hover:bg-primary-100 hover:shadow-sm",
  outline:
    "bg-white text-ink-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm",
  ghost: "bg-transparent text-ink-700 hover:bg-gray-100",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2 rounded-lg gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-xl gap-2",
  lg: "text-base px-6 py-3.5 rounded-xl gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, fullWidth, className = "", children, ...props },
    ref
  ) => {
    const classes = `inline-flex items-center justify-center font-semibold transition-all duration-200 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 hover:scale-[1.03] active:scale-[0.97] disabled:hover:scale-100 ${variants[variant]} ${sizes[size]} ${
      fullWidth ? "w-full" : ""
    } ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
