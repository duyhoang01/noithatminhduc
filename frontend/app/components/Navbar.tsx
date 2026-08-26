"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Trang chủ", id: "top" },
  { label: "Sản phẩm", id: "san-pham" },
  { label: "Quy trình", id: "how-it-works" },
  { label: "Về chúng tôi", id: "about" },
  { label: "Liên hệ", id: "contact" },
];

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.png" alt="Minh Đức AIC" className="w-9 h-9 object-contain" />
            <span className="font-semibold text-[#241f1a] text-base">
              Minh Đức AIC
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-[#6b6459] hover:text-[#241f1a] transition-colors font-medium bg-transparent border-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-white bg-[#a67c3d] hover:bg-[#8a6530] px-4 py-2 rounded-full transition-colors border-0 cursor-pointer"
            >
              Nhận báo giá miễn phí
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#6b6459]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToSection(link.id);
                  }}
                  className="text-sm font-medium text-[#6b6459] hover:text-[#241f1a] py-2 text-left bg-transparent border-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToSection("contact");
                }}
                className="text-sm font-medium text-white bg-[#a67c3d] hover:bg-[#8a6530] px-4 py-2.5 rounded-full text-center transition-colors mt-2 border-0 cursor-pointer"
              >
                Nhận báo giá miễn phí
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
