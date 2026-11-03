import React from "react";
import { Button } from "../components/Button";

interface NotFoundViewProps {
  onNavigate: (href: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <main className="w-full pt-[52px]">
      <section className="bg-[#f5f5f7] text-center min-h-[70vh] flex items-center ap-section">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#6e6e73] mb-3">404</p>
          <h1 className="ap-hero mx-auto max-w-[14ch]">This page moved or never existed.</h1>
          <p className="ap-sub text-[#424245] mt-6 mx-auto max-w-[30ch]">
            Try the case studies, or head back to the start.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" href="/" onClick={go("/")}>
              Back to home
            </Button>
            <Button size="lg" variant="secondaryLight" href="/work" onClick={go("/work")}>
              Explore work
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
