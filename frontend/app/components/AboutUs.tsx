"use client";

import { MapPin, Sofa, Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const points = [
  {
    icon: Sofa,
    title: "Kinh nghiệm gia đình trong ngành nội thất",
    desc: "Lợi thế nguồn hàng và chuỗi cung ứng sẵn có, kiểm soát chất lượng từ đầu vào.",
  },
  {
    icon: Handshake,
    title: "Move-in Solution Provider",
    desc: "Không chỉ thi công — đồng hành từ khảo sát, thiết kế đến bàn giao, để bạn chỉ việc dọn vào ở.",
  },
  {
    icon: MapPin,
    title: "Bám sát địa bàn",
    desc: "Tập trung phục vụ Sun Urban City, Phủ Lý và khu vực Hà Nam — hiểu rõ đặc thù từng dự án.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#8a6530] uppercase mb-4">
              Về chúng tôi
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#241f1a] mb-6 leading-tight">
              Minh Đức AIC — Kiến trúc &amp;{" "}
              <span className="gradient-text">Nội thất</span>
            </h2>
            <p className="text-[#6b6459] leading-relaxed mb-4">
              Minh Đức AIC là đơn vị thiết kế và thi công nội thất trọn gói,
              ra đời từ mong muốn mang lại giải pháp nội thất minh bạch về
              giá cho các gia đình tại Sun Urban City và khu vực Hà Nam.
            </p>
            <p className="text-[#6b6459] leading-relaxed">
              Không chạy theo cạnh tranh giá rẻ, chúng tôi định vị ở phân khúc
              tin cậy — nơi khách hàng biết chính xác mình trả tiền cho điều
              gì, từ bản vẽ đầu tiên đến ngày nhận bàn giao.
            </p>
            <Link
              href="/ve-chung-toi"
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#8a6530] hover:gap-2 transition-all"
            >
              Tìm hiểu thêm về chúng tôi
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.15} className="space-y-5">
            {points.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-2xl bg-[#F3EFE7] border border-amber-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[#8a6530]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#241f1a] mb-1">{p.title}</div>
                    <div className="text-sm text-[#6b6459] leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
