import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";
import { LiveChat } from "@/components/chat/live-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Rivals Boosting",
  description: "Professional Marvel Rivals rank boosting services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <LiveChat />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
