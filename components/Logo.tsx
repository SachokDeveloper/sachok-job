import Image from "next/image";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Sachok Job"
      width={5000}
      height={2035}
      priority
      className={`${className} object-contain`}
    />
  );
}
