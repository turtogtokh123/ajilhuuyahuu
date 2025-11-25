import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviewHub - Company Reviews",
  description: "The premier platform for honest company reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="dark">
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <LanguageProvider>
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </QueryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
