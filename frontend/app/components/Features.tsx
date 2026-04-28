"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  LayoutGrid,
  Calculator,
  FileText,
  Users,
  ImageIcon,
  Zap,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: LayoutGrid,
    color: "bg-indigo-50 text-indigo-600",
    title: "Cấu hình theo phòng",
    desc: "Tổ chức nội thất theo từng phòng và tầng. Dễ dàng thêm, sửa, xóa sản phẩm trong từng không gian.",
  },
  {
    icon: Calculator,
    color: "bg-purple-50 text-purple-600",
    title: "Tính giá realtime",
    desc: "Giá được tính ngay lập tức khi bạn thêm hoặc thay đổi sản phẩm. Không cần chờ đợi, không cần tính tay.",
  },
  {
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    title: "Báo giá chuyên nghiệp",
    desc: "Tạo báo giá PDF đẹp, có thể gửi cho khách hàng ngay. Bao gồm danh sách sản phẩm, giá và thông tin đại lý.",
  },
  {
    icon: Users,
    color: "bg-green-50 text-green-600",
    title: "Quản lý đại lý",
    desc: "Hệ thống phân quyền cho đại lý, nhân viên kinh doanh. Mỗi đại lý có giá riêng được cấu hình sẵn.",
  },
  {
    icon: ImageIcon,
    color: "bg-orange-50 text-orange-600",
    title: "Hình ảnh sản phẩm",
    desc: "Hiển thị hình ảnh thực tế của từng variant sản phẩm. Khách hàng thấy đúng màu sắc, kiểu dáng họ chọn.",
  },
  {
    icon: Zap,
    color: "bg-pink-50 text-pink-600",
    title: "Nhanh & Đáng tin cậy",
    desc: "Xây dựng trên nền tảng Supabase + Redis. Dữ liệu an toàn, tốc độ phản hồi cực nhanh, uptime 99.9%.",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 bg-[#f6f9fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-4">
            Tính năng
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] mb-4 leading-tight">
            Mọi công cụ bạn cần để{" "}
            <span className="gradient-text">báo giá nội thất</span>
          </h2>
          <p className="text-lg text-[#425466] max-w-xl mx-auto">
            Từ cấu hình sản phẩm đến tạo báo giá — tất cả trong một nền tảng
            thống nhất, không cần phần mềm phức tạp.
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
                <h3 className="font-semibold text-[#0a2540] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#425466] leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
