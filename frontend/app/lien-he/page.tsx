import { Mail, MapPin, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function LienHePage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Liên hệ"
        title="Đăng ký khảo sát miễn phí"
        subtitle="Để lại thông tin qua hotline hoặc Zalo — đội ngũ tư vấn phản hồi trong 24h, hẹn khảo sát thực địa trong 48h."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <a
            href="tel:0364223886"
            className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-[#F3EFE7] hover:border-amber-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon/phone.png" alt="" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <div className="text-sm text-[#6b6459]">Gọi điện</div>
              <div className="font-semibold text-[#241f1a] text-lg">0364 223 886</div>
            </div>
          </a>

          <a
            href="https://zalo.me/0364223886"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-[#F3EFE7] hover:border-amber-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon/stick_zalo.png" alt="" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-sm text-[#6b6459]">Chat Zalo</div>
              <div className="font-semibold text-[#241f1a] text-lg">0364 223 886</div>
            </div>
          </a>
        </div>

        <div className="space-y-4 text-[#6b6459]">
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-[#8a6530] flex-shrink-0" />
            <span>minhducaiccompany@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-[#8a6530] flex-shrink-0" />
            <span>Sun Urban City &amp; khu vực Hà Nam (khảo sát tận nơi, chưa có showroom)</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#8a6530] flex-shrink-0" />
            <span>Phản hồi trong 24h · Hẹn khảo sát thực địa trong 48h</span>
          </div>
        </div>
      </div>
    </main>
  );
}
