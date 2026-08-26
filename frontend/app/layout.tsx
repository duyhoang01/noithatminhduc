import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minh Đức AIC — Thiết kế & Thi công Nội thất trọn gói",
  description:
    "Minh Đức AIC thiết kế và thi công nội thất trọn gói cho căn hộ, liền kề và nhà dân tại Sun Urban City, Phủ Lý, Hà Nam. Giá minh bạch, khảo sát tận nơi, bảo hành 24 tháng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
