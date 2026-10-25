import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fahim's VS Code Portfolio",
  description: "Interactive developer portfolio built like VS Code",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0 bg-vs-color text-vs-foreground overflow-hidden">{children}</body>
    </html>
  );
}
