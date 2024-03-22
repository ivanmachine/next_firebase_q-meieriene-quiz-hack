import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import s from "./layout.module.scss";
import Navbar from "@/components/global/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q-meieriene hack",
  description: "Laget av Ivan Tarnyagin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${s.body}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
