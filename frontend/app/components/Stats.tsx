"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: "1,200+", label: "Đại lý tin dùng", color: "text-indigo-600" },
  { value: "50K+", label: "Báo giá đã tạo", color: "text-purple-600" },
  { value: "< 5 phút", label: "Thời gian báo giá", color: "text-blue-600" },
  { value: "99.9%", label: "Uptime đảm bảo", color: "text-green-600" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-[#0a2540]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Được tin dùng bởi hàng nghìn đại lý
          </h2>
          <p className="text-blue-200">
            Từ đại lý nhỏ đến tập đoàn phân phối nội thất lớn
          </p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="text-center"
            >
              <div className={`text-4xl font-black mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
