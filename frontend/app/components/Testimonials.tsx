"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    quote:
      "D-Furniture giúp chúng tôi rút ngắn thời gian báo giá từ 1 tiếng xuống còn 5 phút. Khách hàng rất ấn tượng với sự chuyên nghiệp.",
    name: "Nguyễn Văn Minh",
    role: "Giám đốc kinh doanh",
    company: "Nội thất Hoàng Gia",
    avatar: "NM",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    quote:
      "Hệ thống cấu hình theo phòng rất trực quan. Nhân viên mới của chúng tôi chỉ mất 30 phút là thành thạo hoàn toàn.",
    name: "Trần Thị Hoa",
    role: "Trưởng phòng kinh doanh",
    company: "Đại lý Vinhomes Furniture",
    avatar: "TH",
    color: "bg-purple-100 text-purple-700",
  },
  {
    quote:
      "Giá realtime và PDF báo giá chuyên nghiệp là hai tính năng chúng tôi cần nhất. D-Furniture có cả hai, lại còn dễ dùng.",
    name: "Lê Quang Dũng",
    role: "CEO",
    company: "Smart Living Vietnam",
    avatar: "LD",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#f6f9fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-green-600 uppercase mb-4">
            Khách hàng nói gì
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4">
            Được tin dùng bởi{" "}
            <span className="gradient-text">các đại lý hàng đầu</span>
          </h2>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              className="bg-white rounded-2xl p-6 border border-gray-100 card-hover flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-[#425466] text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0a2540]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#425466]">
                    {t.role} · {t.company}
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
