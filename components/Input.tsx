import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, rightElement, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-ink-800 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3.5 text-gray-400 flex items-center">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={`w-full rounded-xl border border-gray-200 bg-white text-sm text-ink-900 placeholder:text-gray-400 py-2.5 ${
              icon ? "pl-10" : "pl-3.5"
            } ${rightElement ? "pr-10" : "pr-3.5"} outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition ${
              error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3.5 flex items-center">{rightElement}</span>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
