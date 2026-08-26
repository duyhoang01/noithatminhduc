"use client";

import { Phone } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" width="20" height="20" fill="white">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 48 48" width="26" height="26">
      <rect x="3" y="8" width="42" height="24" rx="12" fill="white" />
      <path d="M21 30 L9 41 L14 30 Z" fill="white" />
      <text
        x="24"
        y="25.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fontStyle="italic"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#0068FF"
      >
        Zalo
      </text>
    </svg>
  );
}

const buttons = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/giangnc11",
    external: true,
    bg: "#1877F2",
    icon: <FacebookIcon />,
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0364223886",
    external: true,
    bg: "#0068FF",
    icon: <ZaloIcon />,
  },
  {
    label: "Gọi điện",
    href: "tel:0364223886",
    external: false,
    bg: "#a67c3d",
    icon: <Phone size={20} className="text-white" />,
  },
];

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-4">
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target={b.external ? "_blank" : undefined}
          rel={b.external ? "noopener noreferrer" : undefined}
          aria-label={b.label}
          className="relative w-14 h-14"
        >
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-40"
            style={{ background: b.bg }}
          />
          <span
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: b.bg }}
          >
            {b.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
