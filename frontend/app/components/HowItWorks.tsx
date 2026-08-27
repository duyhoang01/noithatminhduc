"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Ruler, FileCheck, HardHat, HeartHandshake, ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    color: "from-[#8a6530] to-[#a67c3d]",
    title: "Tư vấn ban đầu",
    desc: "Bạn kể cho chúng tôi nghe về ngôi nhà mình đang hình dung — diện tích, ngân sách, phong cách sống. Chúng tôi lắng nghe trước, tư vấn sau — và nói thẳng ngay nếu ngân sách hoặc điều kiện công trình chưa phù hợp, để không mất thời gian của bạn.",
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
    desc: "Hẹn lịch khảo sát trong 48h — đo đạc tận nơi và chốt ngân sách bằng con số cụ thể, không còn là ước lượng.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#241f1a] mb-3">
          Lịch khảo sát trong 48h
        </div>
        <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
          <span className="text-[#6b6459]">Đo đạc thực tế</span>
          <span className="font-medium text-[#241f1a]">✓</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
          <span className="text-[#6b6459]">Chốt ngân sách cụ thể</span>
          <span className="font-medium text-[#241f1a]">✓</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-bold text-[#241f1a]">Không còn là ước lượng</span>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    icon: FileCheck,
    color: "from-[#8a6530] to-[#a67c3d]",
    title: "Thiết kế 3D & báo giá",
    desc: "Nhận phối cảnh 3D trong 5-8 ngày, cùng xem trực tiếp (hoặc video call) để bạn hiểu rõ từng lựa chọn — rồi mới nhận báo giá chi tiết, trước khi ký hợp đồng.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <FileCheck size={16} className="text-[#8a6530]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#241f1a]">
              Buổi trình bày phối cảnh
            </div>
            <div className="text-xs text-[#6b6459]">Trực tiếp hoặc video call</div>
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
    title: "Thi công & giám sát",
    desc: "Ký hợp đồng, thi công với giám sát 4 mốc kiểm tra và nhóm Zalo riêng cập nhật ảnh/video theo từng mốc — không phải chờ hỏi mới biết tiến độ. Với liền kề/nhà dân, chúng tôi đo lại hiện trạng sau khi hoàn thiện phần thô, trước khi lắp nội thất.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#241f1a] mb-3">
          4 mốc giám sát lắp đặt
        </div>
        <div className="space-y-1.5 text-xs text-[#6b6459]">
          <div>Mốc 1 · Vật liệu &amp; điện đi đúng sơ đồ</div>
          <div>Mốc 2 · Kết cấu, kích thước</div>
          <div>Mốc 3 · Bề mặt, sơn, phụ kiện</div>
          <div>Mốc 4 · Nghiệm thu 20 điểm</div>
        </div>
        <div className="mt-3 bg-amber-50 rounded-lg p-2 text-center text-xs font-semibold text-[#8a6530]">
          + Đo lại hiện trạng (liền kề/nhà dân)
        </div>
      </div>
    ),
  },
  {
    step: "05",
    icon: HeartHandshake,
    color: "from-[#a67c3d] to-[#c9974f]",
    title: "Đồng hành sau bàn giao",
    desc: "Không kết thúc ở lúc bàn giao. Chúng tôi chủ động hỏi thăm sau 1-2 tuần bạn dọn vào ở, và có mặt trong 48h nếu phát sinh vấn đề trong suốt 24 tháng bảo hành.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#241f1a] mb-3">
          Sau khi bạn dọn vào ở
        </div>
        <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
          <span className="text-[#6b6459]">Hỏi thăm sau 1-2 tuần</span>
          <span className="font-medium text-[#241f1a]">✓</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
          <span className="text-[#6b6459]">Có mặt trong 48h nếu cần</span>
          <span className="font-medium text-[#241f1a]">✓</span>
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

        <AnimatedSection className="flex items-start gap-3 rounded-2xl bg-[#F3EFE7] border border-amber-100 p-5 mb-16 max-w-2xl mx-auto">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 text-[#8a6530]">
            <KeyRound size={18} />
          </div>
          <p className="text-sm text-[#6b6459] leading-relaxed">
            <strong className="text-[#241f1a]">Mỗi bước có một &quot;cổng xác nhận&quot; riêng</strong> — phiếu khảo sát, biên nhận phí thiết kế, bản phối cảnh được duyệt... Không bước nào bắt đầu khi bước trước chưa được chính bạn xác nhận.
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
                    <span className="text-5xl font-black text-stone-300">
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
