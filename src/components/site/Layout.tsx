import type { ReactNode } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="w-full flex-1 pt-[72px] sm:pt-[76px]">
        {children}
      </main>

      <Footer />
    </div>
  );
}
