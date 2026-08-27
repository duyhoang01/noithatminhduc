"use client";

import { Sofa, Handshake, Gem, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const points = [
  {
    icon: Sofa,
    title: "Chúng tôi biết rõ nội thất được làm ra như thế nào",
    desc: "Nhờ hợp tác với xưởng sản xuất lâu năm, mọi vật liệu đều được kiểm tra kỹ trước khi đến tay bạn.",
  },
  {
    icon: Handshake,
    title: "Đồng hành đến khi bạn dọn vào ở",
    desc: "Không chỉ thi công rồi bàn giao — chúng tôi lo từ khảo sát, thiết kế đến ngày bạn thật sự chuyển vào sống.",
  },
  {
    icon: Gem,
    title: "Không chạy đua giá rẻ",
    desc: "Chúng tôi cạnh tranh bằng việc để bạn biết rõ mình đang trả tiền cho điều gì, không phải bằng cách hạ giá.",
  },
  {
    icon: ShieldCheck,
    title: "Sai là chúng tôi nhận, không đổ lỗi",
    desc: "Nếu công trình không đúng với thiết kế đã duyệt, chúng tôi là người chịu trách nhiệm sửa lại — không viện cớ từ xưởng hay nhà cung cấp.",
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
              Minh Đức AIC bắt đầu từ một câu hỏi rất đơn giản: tại sao làm
              nội thất trọn gói cho một căn nhà lại khó biết trước mình sẽ
              trả bao nhiêu, cho những gì?
            </p>
            <p className="text-[#6b6459] leading-relaxed mb-4">
              Gia đình chúng tôi vốn đã quen với xưởng gỗ, với vật liệu, với
              cách một món đồ nội thất thật sự được làm ra. Nhưng nhìn vào
              thị trường, chúng tôi thấy phần lớn khách hàng phải tin gần như
              mù quáng — không biết vật liệu có đúng như cam kết không, không
              biết giá có bị đội lên không, chỉ đến khi dọn vào ở mới biết
              mọi thứ có ổn hay không.
            </p>
            <p className="text-[#6b6459] leading-relaxed">
              Chúng tôi làm Minh Đức AIC để thay đổi điều đó: cho bạn xem
              trước khi làm, cho bạn kiểm tra trong lúc làm, và chịu trách
              nhiệm sau khi làm xong.
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
