"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden hero-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="inline-flex mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Sparkles size={12} />
              Hệ thống CPQ Nội thất #1 Việt Nam
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0a2540] leading-tight tracking-tight mb-6"
          >
            Cấu hình & Báo giá{" "}
            <span className="gradient-text">Nội thất</span>
            <br />
            Thông minh & Chính xác
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#425466] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            D-Furniture giúp bạn cấu hình nội thất theo từng phòng, tính giá
            realtime và tạo báo giá chuyên nghiệp chỉ trong vài phút — không
            cần nghiệp vụ phức tạp.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Link
              href="/configurator"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#635bff] hover:bg-[#4f46e5] text-white font-medium text-sm transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
            >
              Bắt đầu cấu hình ngay
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#0a2540] font-medium text-sm border border-gray-200 hover:border-gray-300 transition-all"
            >
              Xem tính năng
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#425466]"
          >
            <span className="flex items-center gap-2">
              <span className="flex -space-x-1">
                {["bg-indigo-400", "bg-purple-400", "bg-pink-400", "bg-blue-400"].map(
                  (color, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 rounded-full ${color} border-2 border-white`}
                    />
                  )
                )}
              </span>
              1,200+ đại lý đang dùng
            </span>
            <span className="hidden sm:block w-px h-4 bg-gray-200" />
            <span>Báo giá trong 5 phút</span>
            <span className="hidden sm:block w-px h-4 bg-gray-200" />
            <span>Không cần thẻ tín dụng</span>
          </motion.div>
        </div>

        {/* Hero UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Browser chrome */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 max-w-xs mx-auto text-center">
                    d-furniture.vn/configure
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white min-h-64">
                <div className="flex gap-4 h-52">
                  {/* Left sidebar */}
                  <div className="w-48 bg-gray-50 rounded-xl p-4 flex flex-col gap-3">
                    <div className="text-xs font-semibold text-[#0a2540] mb-1">
                      Phòng của bạn
                    </div>
                    {["Phòng khách", "Phòng ngủ", "Phòng bếp"].map((room, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          i === 0
                            ? "bg-[#635bff] text-white"
                            : "text-[#425466] hover:bg-gray-100"
                        }`}
                      >
                        {room}
                      </div>
                    ))}
                    <button className="mt-auto px-3 py-2 rounded-lg text-xs font-medium text-[#635bff] border border-indigo-200 hover:bg-indigo-50 transition-colors">
                      + Thêm phòng
                    </button>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="text-sm font-semibold text-[#0a2540]">
                      Phòng khách — Sofa & Bàn
                    </div>
                    {[
                      { name: "Sofa 3 chỗ Series L", variant: "Xám nhạt", qty: 1, price: "12,500,000" },
                      { name: "Bàn cà phê tròn", variant: "Gỗ sồi", qty: 1, price: "3,200,000" },
                      { name: "Kệ TV treo tường", variant: "Trắng", qty: 1, price: "5,800,000" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div>
                          <div className="text-xs font-medium text-[#0a2540]">{item.name}</div>
                          <div className="text-xs text-[#425466]">{item.variant} · SL: {item.qty}</div>
                        </div>
                        <span className="text-xs font-semibold text-[#635bff]">{item.price}đ</span>
                      </div>
                    ))}
                  </div>

                  {/* Right panel - Quote summary */}
                  <div className="w-44 bg-gradient-to-b from-indigo-50 to-purple-50 rounded-xl p-4 flex flex-col gap-2 border border-indigo-100">
                    <div className="text-xs font-semibold text-[#0a2540]">Báo giá</div>
                    <div className="text-xs text-[#425466]">3 sản phẩm</div>
                    <div className="mt-auto">
                      <div className="text-xs text-[#425466]">Tổng tiền</div>
                      <div className="text-base font-bold text-[#635bff]">21,500,000đ</div>
                    </div>
                    <button className="mt-2 w-full py-2 rounded-lg bg-[#635bff] text-white text-xs font-medium hover:bg-[#4f46e5] transition-colors">
                      Tạo báo giá
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden md:block"
            >
              <div className="text-xs text-[#425466]">Giá realtime</div>
              <div className="text-sm font-bold text-[#0a2540]">21.5M đ</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden md:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#0a2540]">Báo giá đã tạo</div>
                  <div className="text-xs text-[#425466]">PDF sẵn sàng</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
