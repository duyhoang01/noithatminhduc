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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241f1a] via-[#332b22] to-[#1a1611] p-12 md:p-16 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-widest text-amber-300 uppercase mb-4">
              Bắt đầu ngay hôm nay
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Sẵn sàng có không gian sống{" "}
              <span className="text-amber-400">minh bạch về giá</span>?
            </h2>
            <p className="text-amber-100/80 text-lg max-w-xl mx-auto mb-10">
              Đăng ký khảo sát miễn phí — đội ngũ tư vấn phản hồi trong 24h,
              hẹn khảo sát thực địa trong 48h.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0364223886"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#241f1a] font-semibold text-sm hover:bg-gray-100 transition-all shadow-xl"
              >
                Đăng ký khảo sát miễn phí
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="tel:0364223886"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
              >
                <Phone size={16} />
                Gọi tư vấn: 0364 223 886
              </a>
            </div>

            {/* Commitments */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              {[
                "Khảo sát tận nơi miễn phí",
                "Báo giá minh bạch, không phát sinh",
                "Thiết kế 3D trước khi thi công",
                "Bảo hành 24 tháng",
              ].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-amber-100/80 text-sm"
                >
                  <span className="text-amber-400">✓</span>
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
