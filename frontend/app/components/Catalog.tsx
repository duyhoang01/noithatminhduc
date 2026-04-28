"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const categories = [
  {
    name: "Phòng khách",
    count: "48 sản phẩm",
    color: "from-indigo-400 to-purple-500",
    items: ["Sofa", "Bàn cà phê", "Kệ TV", "Tủ trang trí"],
  },
  {
    name: "Phòng ngủ",
    count: "36 sản phẩm",
    color: "from-purple-400 to-pink-500",
    items: ["Giường", "Tủ quần áo", "Bàn phấn", "Kệ đầu giường"],
  },
  {
    name: "Phòng bếp",
    count: "29 sản phẩm",
    color: "from-orange-400 to-red-500",
    items: ["Tủ bếp", "Bàn đảo bếp", "Ghế bar", "Giá đồ"],
  },
  {
    name: "Phòng làm việc",
    count: "22 sản phẩm",
    color: "from-blue-400 to-cyan-500",
    items: ["Bàn làm việc", "Ghế văn phòng", "Kệ sách", "Tủ hồ sơ"],
  },
];

export default function Catalog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-600 uppercase mb-4">
            Danh mục sản phẩm
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4">
            Khám phá danh mục{" "}
            <span className="gradient-text-warm">nội thất phong phú</span>
          </h2>
          <p className="text-lg text-[#425466] max-w-xl mx-auto">
            Hàng trăm sản phẩm từ các nhà sản xuất uy tín, cập nhật liên tục.
            Mỗi sản phẩm có đầy đủ hình ảnh, variant và giá niêm yết.
          </p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
                  <div className="text-xs text-[#425466] mb-3">{cat.count}</div>
                  <div className="space-y-1">
                    {cat.items.map((item, j) => (
                      <div
                        key={j}
                        className="text-xs text-[#425466] flex items-center gap-1.5"
                      >
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-indigo-600 group-hover:gap-2 transition-all">
                    Xem tất cả
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
