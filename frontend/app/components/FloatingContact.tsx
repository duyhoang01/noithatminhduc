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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
      <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z" />
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
