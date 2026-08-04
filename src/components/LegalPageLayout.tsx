import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100">
      <div className="container mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-700">
            Horse Trails
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-stone-900">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            {subtitle}
          </p>
        </div>

        <div className="rounded-3xl border border-white/50 bg-white/90 p-10 shadow-2xl backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  );
}