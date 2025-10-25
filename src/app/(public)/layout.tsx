import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PageLayoutProps } from "@/interface";

export default function PublicLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
