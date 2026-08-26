"use client";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" width="20" height="20" fill="white">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
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
    bg: "white",
    // eslint-disable-next-line @next/next/no-img-element
    icon: <img src="/icon/stick_zalo.png" alt="Zalo" className="w-9 h-9 object-contain" />,
  },
  {
    label: "Gọi điện",
    href: "tel:0364223886",
    external: false,
    bg: "white",
    // eslint-disable-next-line @next/next/no-img-element
    icon: <img src="/icon/phone.png" alt="Gọi điện" className="w-7 h-7 object-contain" />,
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
            style={{ background: b.bg === "white" ? "#a67c3d" : b.bg }}
          />
          <span
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg border border-black/5"
            style={{ background: b.bg }}
          >
            {b.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
