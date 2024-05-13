import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen w-full flex-col`}>
        <Header></Header>
        <main
          className=" bg-muted/40">
          <div className="min-h-[calc(100vh_-_theme(spacing.16))] flex flex-1 flex-col gap-4  p-4 md:gap-8 md:p-10 mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
);
}
