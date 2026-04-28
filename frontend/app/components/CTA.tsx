"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#1a3a5c] to-[#0d2035] p-12 md:p-16 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-4">
              Bắt đầu ngay hôm nay
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Sẵn sàng tối ưu{" "}
              <span className="text-indigo-400">quy trình báo giá</span>
              <br />
              của bạn?
            </h2>
            <p className="text-blue-200 text-lg max-w-xl mx-auto mb-10">
              Dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng. Hỗ trợ setup
              và đào tạo tận nơi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#0a2540] font-semibold text-sm hover:bg-gray-100 transition-all shadow-xl"
              >
                Bắt đầu miễn phí
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="tel:0123456789"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                <Phone size={16} />
                Gọi tư vấn ngay
              </a>
            </div>

            {/* Features list */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              {[
                "Dùng thử 14 ngày",
                "Không cần thẻ tín dụng",
                "Hỗ trợ 24/7",
                "Xuất PDF chuyên nghiệp",
              ].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-blue-200 text-sm"
                >
                  <span className="text-green-400">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
