import { ReactNode } from "react";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
