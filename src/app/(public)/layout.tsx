import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
}
