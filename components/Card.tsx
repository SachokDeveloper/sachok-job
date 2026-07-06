import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  padding = "md",
  hover = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl shadow-card ${
        hover ? "transition-all duration-200 hover:shadow-soft hover:-translate-y-1" : ""
      } ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
