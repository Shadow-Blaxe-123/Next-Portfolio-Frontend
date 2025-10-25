import { PageLayoutProps } from "@/interface";

function Dashboardlayout({ children }: PageLayoutProps) {
  return (
    <div>
      <h1>This is layout component.</h1>
      <main>{children}</main>
    </div>
  );
}
export default Dashboardlayout;
