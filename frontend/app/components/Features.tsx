"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Ruler,
  Wallet,
  Boxes,
  ClipboardCheck,
  BadgeCheck,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: ShieldCheck,
    color: "bg-amber-50 text-[#8a6530]",
    title: "Giá minh bạch, không phát sinh",
    desc: "Báo giá rõ từng hạng mục sau khảo sát thực tế. Không đội giá giữa chừng, không phí ẩn.",
  },
  {
    icon: Ruler,
    color: "bg-orange-50 text-orange-700",
    title: "Khảo sát & đo đạc tận nơi",
    desc: "Đội ngũ đến tận nhà đo đạc trước khi báo giá, đảm bảo thiết kế khớp đúng không gian thật.",
  },
  {
    icon: Wallet,
    color: "bg-stone-100 text-stone-700",
    title: "Thanh toán theo đúng tiến độ",
    desc: "Không thu phần lớn tiền ngay từ đầu — bạn trả theo từng giai đoạn thi công đã hoàn thành thực tế.",
  },
  {
    icon: Boxes,
    color: "bg-amber-50 text-[#8a6530]",
    title: "Thiết kế 3D trước khi thi công",
    desc: "Nhận phối cảnh 3D và báo giá chi tiết trước khi ký hợp đồng, hình dung đúng không gian trước khi làm thật.",
  },
  {
    icon: ClipboardCheck,
    color: "bg-orange-50 text-orange-700",
    title: "Giám sát thi công 4 mốc",
    desc: "Kiểm tra vật liệu, kết cấu, bề mặt và nghiệm thu theo checklist rõ ràng ở từng giai đoạn.",
  },
  {
    icon: BadgeCheck,
    color: "bg-stone-100 text-stone-700",
    title: "Bảo hành 24 tháng",
    desc: "Cam kết bảo hành đầy đủ cho mọi hạng mục nội thất, chi tiết theo hợp đồng.",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 bg-[#F3EFE7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#8a6530] uppercase mb-4">
            Vì sao chọn chúng tôi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#241f1a] mb-4 leading-tight">
            Minh bạch{" "}
            <span className="gradient-text">không chỉ ở giá</span>
          </h2>
          <p className="text-lg text-[#6b6459] max-w-xl mx-auto">
            Minh Đức AIC đồng hành cùng bạn từ khảo sát, thiết kế đến thi công
            và bảo hành — không phát sinh bất ngờ.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 border border-gray-100 card-hover"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-[#241f1a] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6b6459] leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
