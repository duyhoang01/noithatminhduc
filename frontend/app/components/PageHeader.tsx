import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 pt-32 pb-12">
      <span className="inline-block text-xs font-semibold tracking-widest text-[#8a6530] uppercase mb-4">
        {eyebrow}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#241f1a] mb-4 leading-tight">
        {title}
      </h1>
      {subtitle && <p className="text-lg text-[#6b6459] leading-relaxed">{subtitle}</p>}
    </div>
  );
}
