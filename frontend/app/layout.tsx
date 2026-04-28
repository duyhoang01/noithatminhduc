import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD-Furniture — Hệ thống Cấu hình & Báo giá Nội thất",
  description:
    "MD-Furniture là hệ thống CPQ giúp đại lý nội thất cấu hình sản phẩm theo phòng, tính giá realtime và tạo báo giá chuyên nghiệp chỉ trong 5 phút.",
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
