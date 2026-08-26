"use client";

import AnimatedSection from "./AnimatedSection";

const images = [
  "/anh-noi-that/minh-khoi-1.jpg",
  "/anh-noi-that/minh-khoi-3.jpg",
  "/anh-noi-that/minh-khoi-7.jpg",
  "/anh-noi-that/minh-khoi-6.jpg",
  "/anh-noi-that/minh-khoi-4.jpg",
  "/anh-noi-that/minh-khoi-2.jpg",
];

export default function SpaceGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#8a6530] uppercase mb-4">
            Không gian tham khảo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#241f1a] mb-4 leading-tight">
            Chất lượng thật, không phải{" "}
            <span className="gradient-text">ảnh minh họa</span>
          </h2>
          <p className="text-lg text-[#6b6459] max-w-2xl mx-auto">
            Hình ảnh không gian thực tế từ nguồn cung ứng và kinh nghiệm sản
            xuất nội thất nhiều năm của gia đình chúng tôi — nền tảng đứng sau
            mọi dự án Minh Đức AIC thực hiện.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((src) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-2xl border border-black/5 aspect-square card-hover"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Không gian nội thất thực tế"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
