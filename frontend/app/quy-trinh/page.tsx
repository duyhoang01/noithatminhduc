import Link from "next/link";
import { MessageCircle, Ruler, FileCheck, HardHat, HeartHandshake, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";

const steps = [
  {
    href: "/quy-trinh/tu-van",
    icon: MessageCircle,
    step: "01",
    title: "Tư vấn ban đầu",
    desc: "Bạn kể nhu cầu, ngân sách, phong cách — chúng tôi lắng nghe trước, tư vấn sau, hẹn lịch khảo sát.",
  },
  {
    href: "/quy-trinh/khao-sat",
    icon: Ruler,
    step: "02",
    title: "Khảo sát thực địa",
    desc: "Đo đạc thật tại căn hộ, xác nhận nhu cầu thiết kế và chốt ngân sách bằng số cụ thể.",
  },
  {
    href: "/quy-trinh/thiet-ke",
    icon: FileCheck,
    step: "03",
    title: "Thiết kế & trình bày",
    desc: "Nhận bản vẽ 2D và phối cảnh 3D, cùng xem trực tiếp trước khi nhận báo giá và ký hợp đồng.",
  },
  {
    href: "/quy-trinh/nghiem-thu",
    icon: HardHat,
    step: "04",
    title: "Thi công & giám sát",
    desc: "Giám sát theo mốc, đo lại hiện trạng trước khi lắp nội thất (liền kề/nhà dân), nghiệm thu theo checklist.",
  },
  {
    href: "/quy-trinh/sau-ban-giao",
    icon: HeartHandshake,
    step: "05",
    title: "Đồng hành sau bàn giao",
    desc: "Chủ động hỏi thăm sau khi bạn dọn vào ở, bảo hành 24 tháng, có mặt trong 48h khi cần.",
  },
];

export default function QuyTrinhPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình làm việc"
        title="Từ tư vấn đến bàn giao, rõ ràng từng bước"
        subtitle="Không báo giá chính xác trước khi khảo sát — mọi con số đều dựa trên đo đạc thực tế. Bấm vào từng bước để xem chi tiết và checklist."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-stone-300">{s.step}</span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8a6530] to-[#a67c3d] flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-[#241f1a]">{s.title}</h2>
              <p className="text-sm text-[#6b6459] leading-relaxed flex-1">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[#8a6530] group-hover:gap-2 transition-all">
                Xem chi tiết &amp; checklist
                <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
