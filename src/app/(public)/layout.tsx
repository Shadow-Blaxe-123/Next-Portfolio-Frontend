import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
