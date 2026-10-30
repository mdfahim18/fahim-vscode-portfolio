import type { Metadata } from "next";
import { Fira_Code, JetBrains_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fahim's VS Code Portfolio",
  description: "Interactive developer portfolio built like VS Code",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${firaCode.variable} ${jetbrainsMono.variable} ${sourceCodePro.variable} h-full m-0 p-0 bg-vs-color text-vs-foreground overflow-hidden`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
