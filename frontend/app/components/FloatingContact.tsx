"use client";

const buttons = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/giangnc11",
    external: true,
    bg: "white",
    // eslint-disable-next-line @next/next/no-img-element
    icon: <img src="/icon/Facebook.png" alt="Facebook" className="w-11 h-11 object-contain" />,
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
