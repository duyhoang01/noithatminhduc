"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const categories = [
  {
    name: "Căn hộ chung cư",
    count: "Sun Urban City",
    color: "from-[#a67c3d] to-[#c9974f]",
    items: ["Nội thất trọn gói", "3 gói: Cơ bản / Tiêu chuẩn / Cao cấp", "Áp dụng cho căn đã bàn giao xây dựng"],
  },
  {
    name: "Liền kề",
    count: "Sun Urban City",
    color: "from-[#8a6530] to-[#a67c3d]",
    items: ["Thiết kế + thi công điện, nước, sơn bả", "Trần thạch cao", "Nội thất trọn gói"],
  },
  {
    name: "Nhà dân",
    count: "Nam Định · Phủ Lý · Bình Lục",
    color: "from-stone-500 to-stone-700",
    items: ["Nội thất trọn gói", "Điện nhẹ (điều hòa, máy giặt, tủ lạnh)", "Không đụng xây dựng thô"],
  },
];

export default function Catalog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#8a6530] uppercase mb-4">
            Dịch vụ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#241f1a] mb-4">
            Dịch vụ theo{" "}
            <span className="gradient-text-warm">từng loại hình nhà</span>
          </h2>
          <p className="text-lg text-[#6b6459] max-w-xl mx-auto">
            Mỗi phân khúc có scope thi công khác nhau — khảo sát tận nơi để
            nhận báo giá đúng với nhu cầu thực tế.
          </p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 card-hover">
                {/* Gradient header */}
                <div
                  className={`bg-gradient-to-br ${cat.color} p-6 h-32 flex items-end`}
                >
                  <span className="text-white font-bold text-lg">
                    {cat.name}
                  </span>
                </div>
                {/* Content */}
                <div className="p-4 bg-white">
                  <div className="text-xs text-[#6b6459] mb-3">{cat.count}</div>
                  <div className="space-y-1">
                    {cat.items.map((item, j) => (
                      <div
                        key={j}
                        className="text-xs text-[#6b6459] flex items-center gap-1.5"
                      >
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/configure"
                    className="mt-4 flex items-center gap-1 text-xs font-medium text-[#8a6530] group-hover:gap-2 transition-all"
                  >
                    Xem báo giá tham khảo
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
