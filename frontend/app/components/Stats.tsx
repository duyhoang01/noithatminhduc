"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, HandCoins, MapPin, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const commitments = [
  { icon: ShieldCheck, label: "Bảo hành 24 tháng" },
  { icon: HandCoins, label: "Giá minh bạch — không phát sinh" },
  { icon: MapPin, label: "Khảo sát & tư vấn tận nơi" },
  { icon: Users, label: "Chuỗi cung ứng nội thất nhiều năm kinh nghiệm" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-[#241f1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Cam kết của Minh Đức AIC
          </h2>
          <p className="text-amber-100/70">
            Những điều chúng tôi giữ đúng với mọi khách hàng
          </p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="text-center flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Icon size={22} className="text-amber-400" />
                </div>
                <div className="text-amber-100/90 text-sm font-medium">{c.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
