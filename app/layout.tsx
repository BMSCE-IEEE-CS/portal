import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal | BMSCE IEEE CS",
  description: "Portal to manage events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${font.className} antialiased bg-gradient-to-br from-slate-500 text-white to-slate-900 animate-grad-xy min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
