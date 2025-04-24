import { ReactNode } from "react";
import Navbar from "../Navbar";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className={`${figtree.className}`}>
      <div className="relative">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}