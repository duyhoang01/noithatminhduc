import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const checklist = [
  "Phản hồi trong vòng 2 giờ làm việc qua Zalo/điện thoại",
  "Trao đổi diện tích, loại bàn giao (thô/đồ liền tường), mục đích sử dụng và ngân sách dự kiến",
  "Nhận báo giá sơ bộ theo m² để cân đối ngân sách (chưa phải báo giá chính xác)",
  "Trao đổi thẳng thắn ngay nếu ngân sách hoặc điều kiện công trình chưa phù hợp — để không mất thời gian của bạn",
  "Hẹn lịch khảo sát thực địa cụ thể trong vòng 48 giờ — hoàn toàn miễn phí",
];

export default function TuVanPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 01"
        title="Tư vấn ban đầu"
        subtitle="Bước đầu tiên trước khi khảo sát — trao đổi để hiểu đúng nhu cầu và hẹn lịch khảo sát phù hợp."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <p className="text-[#6b6459] leading-relaxed mb-8">
          Sau khi liên hệ qua Zalo, nhóm cư dân hoặc gọi điện trực tiếp, đội ngũ
          tư vấn sẽ trao đổi nhanh với bạn để hiểu rõ căn hộ/nhà, mục đích sử
          dụng và ngân sách dự kiến — chưa cần khảo sát tận nơi ở bước này.
          Nếu căn hộ chưa nhận bàn giao, chúng tôi sẽ theo dõi và chủ động liên
          hệ lại khi bạn đã có mặt bằng thật, thay vì khảo sát trên số liệu
          phỏng đoán dễ sai lệch.
        </p>

        <div className="rounded-2xl bg-[#F3EFE7] border border-amber-100 p-6 mb-10">
          <h2 className="font-semibold text-[#241f1a] mb-4">Bạn sẽ nhận được</h2>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#6b6459]">
                <Check size={16} className="text-[#8a6530] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/quy-trinh" className="inline-flex items-center gap-1 text-sm font-medium text-[#6b6459] hover:text-[#241f1a]">
            <ArrowLeft size={14} /> Toàn bộ quy trình
          </Link>
          <Link
            href="/quy-trinh/khao-sat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white text-sm font-medium transition-colors"
          >
            Bước tiếp theo: Khảo sát thực địa
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
