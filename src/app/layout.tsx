import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import TutorialModal from "@/components/TutorialModal"; // <-- Added this import

// Setup High-End Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "L'Étoile | Fine Dining",
  description: "A luxury restaurant experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-zinc-950 text-white antialiased`}>
        <StoreProvider>
          <Navbar />
          <TutorialModal /> {/* <-- Injected the modal here */}
          <main className="pt-24 min-h-screen">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}