"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, DollarSign, FileCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    step: "01",
    icon: Settings,
    color: "from-indigo-500 to-purple-600",
    bgLight: "bg-indigo-50",
    title: "Cấu hình nội thất",
    desc: "Chọn phòng, thêm sản phẩm và variant phù hợp. Hệ thống hỗ trợ nhiều phòng và nhiều tầng trong cùng một dự án.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#0a2540] mb-3">
          Cấu hình phòng khách
        </div>
        <div className="space-y-2">
          {[
            { name: "Sofa 3 chỗ", color: "Xám nhạt" },
            { name: "Bàn cà phê", color: "Gỗ sồi" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 bg-indigo-50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-200" />
              <div>
                <div className="text-xs font-medium text-[#0a2540]">
                  {item.name}
                </div>
                <div className="text-xs text-[#425466]">{item.color}</div>
              </div>
              <span className="ml-auto text-xs text-indigo-600 font-medium">
                ×1
              </span>
            </div>
          ))}
          <button className="w-full text-xs text-indigo-600 border border-dashed border-indigo-200 rounded-lg py-2 hover:bg-indigo-50 transition-colors">
            + Thêm sản phẩm
          </button>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    icon: DollarSign,
    color: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
    title: "Giá tự động tính",
    desc: "Hệ thống pricing engine tự động tính tổng giá theo đơn giá của từng đại lý, cập nhật realtime mỗi khi bạn thay đổi.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs font-semibold text-[#0a2540] mb-3">
          Tổng hợp giá
        </div>
        <div className="space-y-2">
          {[
            { name: "Sofa 3 chỗ", price: "12,500,000" },
            { name: "Bàn cà phê", price: "3,200,000" },
            { name: "Kệ TV", price: "5,800,000" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs py-1 border-b border-gray-50"
            >
              <span className="text-[#425466]">{item.name}</span>
              <span className="font-medium text-[#0a2540]">{item.price}đ</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-bold text-[#0a2540]">Tổng cộng</span>
            <span className="text-sm font-bold text-[#635bff]">
              21,500,000đ
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    icon: FileCheck,
    color: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
    title: "Tạo & gửi báo giá",
    desc: "Xác nhận cấu hình và tạo báo giá PDF ngay lập tức. Gửi cho khách hàng hoặc lưu trữ trong hệ thống để theo dõi.",
    mockup: (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileCheck size={16} className="text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#0a2540]">
              BG-2024-001
            </div>
            <div className="text-xs text-[#425466]">Phòng khách — 3 SP</div>
          </div>
          <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            Đã tạo
          </span>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-xs text-[#425466] mb-2">Tổng báo giá</div>
          <div className="text-lg font-bold text-blue-700">21,500,000đ</div>
        </div>
        <button className="mt-3 w-full py-2 rounded-lg bg-[#635bff] text-white text-xs font-medium hover:bg-[#4f46e5] transition-colors">
          Tải PDF
        </button>
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
          <span className="inline-block text-xs font-semibold tracking-widest text-purple-600 uppercase mb-4">
            Cách hoạt động
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4">
            Từ cấu hình đến báo giá{" "}
            <span className="gradient-text">chỉ 3 bước</span>
          </h2>
          <p className="text-lg text-[#425466] max-w-xl mx-auto">
            Quy trình đơn giản, không cần đào tạo phức tạp. Nhân viên kinh
            doanh có thể bắt đầu ngay sau 10 phút làm quen.
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
                  <h3 className="text-2xl font-bold text-[#0a2540]">
                    {step.title}
                  </h3>
                  <p className="text-[#425466] leading-relaxed">{step.desc}</p>
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
      </div>
    </section>
  );
}
