import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sachok Job — The best jobs. Real opportunities.",
  description:
    "Sachok Job is a service where employers receive only 10 relevant applications per job, and job seekers get a real chance to stand out.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
