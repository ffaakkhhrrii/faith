import { ReactNode } from "react";
import { Amiri, Figtree } from "next/font/google";
import Navbar from "../Navbar";
import Footer from "../Footer";

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: ["400", "700"] });

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className={`${figtree.variable} ${amiri.variable} font-sans`}>
      <Navbar />
      <main id="konten">{children}</main>
      <Footer />
    </div>
  );
}
