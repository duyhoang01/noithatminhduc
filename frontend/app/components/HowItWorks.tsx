"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Ruler, FileCheck, HardHat, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    color: "from-[#8a6530] to-[#a67c3d]",
    title: "Tư vấn nhu cầu",
    desc: "Trao đổi online hoặc qua điện thoại/Zalo về nhu cầu, ngân sách và phong cách mong muốn.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#241f1a] mb-3">
          Tư vấn ban đầu
        </div>
        <div className="space-y-2 text-xs text-[#6b6459]">
          <div className="p-2 bg-amber-50 rounded-lg">Loại nhà: Chung cư / Liền kề / Nhà dân</div>
          <div className="p-2 bg-amber-50 rounded-lg">Ngân sách dự kiến</div>
          <div className="p-2 bg-amber-50 rounded-lg">Phong cách mong muốn</div>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    icon: Ruler,
    color: "from-[#a67c3d] to-[#c9974f]",
    title: "Khảo sát thực địa",
    desc: "Hẹn khảo sát và đo đạc tận nơi trong 48h, báo giá sơ bộ theo m² ngay tại buổi khảo sát.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#241f1a] mb-3">
          Khảo sát trong 48h
        </div>
        <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
          <span className="text-[#6b6459]">Đo đạc thực tế</span>
          <span className="font-medium text-[#241f1a]">✓</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
          <span className="text-[#6b6459]">Chốt ngân sách sơ bộ</span>
          <span className="font-medium text-[#241f1a]">✓</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-bold text-[#241f1a]">Báo giá sơ bộ / m²</span>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    icon: FileCheck,
    color: "from-[#8a6530] to-[#a67c3d]",
    title: "Thiết kế 3D & báo giá",
    desc: "Nhận phối cảnh 3D và báo giá chi tiết trong 48h sau khảo sát, trước khi ký hợp đồng.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <FileCheck size={16} className="text-[#8a6530]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#241f1a]">
              Phối cảnh 3D + Báo giá
            </div>
            <div className="text-xs text-[#6b6459]">Gửi trong 48h</div>
          </div>
          <span className="ml-auto text-xs font-medium text-[#8a6530] bg-amber-50 px-2 py-0.5 rounded-full">
            Sẵn sàng
          </span>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 text-center">
          <div className="text-xs text-[#6b6459]">Báo giá chi tiết theo hạng mục</div>
        </div>
      </div>
    ),
  },
  {
    step: "04",
    icon: HardHat,
    color: "from-stone-500 to-stone-700",
    title: "Thi công & bảo hành",
    desc: "Ký hợp đồng, thi công với giám sát 4 mốc kiểm tra, nghiệm thu và bảo hành 24 tháng.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#241f1a] mb-3">
          4 mốc giám sát
        </div>
        <div className="space-y-1.5 text-xs text-[#6b6459]">
          <div>Mốc 1 · Vật liệu &amp; điện đi đúng sơ đồ</div>
          <div>Mốc 2 · Kết cấu, kích thước</div>
          <div>Mốc 3 · Bề mặt, sơn, phụ kiện</div>
          <div>Mốc 4 · Nghiệm thu 20 điểm</div>
        </div>
        <div className="mt-3 bg-amber-50 rounded-lg p-2 text-center text-xs font-semibold text-[#8a6530]">
          Bảo hành 24 tháng
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#8a6530] uppercase mb-4">
            Quy trình làm việc
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#241f1a] mb-4">
            Từ tư vấn đến bàn giao{" "}
            <span className="gradient-text">rõ ràng từng bước</span>
          </h2>
          <p className="text-lg text-[#6b6459] max-w-xl mx-auto">
            Không báo giá chính xác trước khi khảo sát — mọi con số đều dựa
            trên đo đạc thực tế.
          </p>
        </AnimatedSection>

        <div ref={ref} className="space-y-20">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}
              >
                {/* Text */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black text-gray-100">
                      {step.step}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#241f1a]">
                    {step.title}
                  </h3>
                  <p className="text-[#6b6459] leading-relaxed">{step.desc}</p>
                </div>

                {/* Mockup */}
                <div className="flex-1 w-full max-w-sm lg:max-w-none">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                    {step.mockup}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/quy-trinh"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F3EFE7] text-[#8a6530] font-medium text-sm hover:bg-amber-100 transition-colors"
          >
            Xem chi tiết từng bước quy trình
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
