import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const checklist = [
  "Được phản hồi trong vòng 2 giờ làm việc — không phải chờ đợi mòn mỏi",
  "Được hỏi đúng trọng tâm: diện tích, ngân sách, mong muốn thực tế — không hỏi lan man",
  "Có ngay khoảng giá tham khảo theo m² để tự cân đối, trước khi quyết định đi tiếp",
  "Biết ngay, thẳng thắn nếu ngân sách hoặc điều kiện công trình chưa phù hợp — không bị dẫn dắt vô ích",
  "Từ chối cũng không sao — không bị gọi lại làm phiền nhiều lần",
  "Có lịch khảo sát cụ thể trong 48 giờ nếu muốn tiếp tục — hoàn toàn miễn phí",
];

export default function TuVanPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 01"
        title="Được lắng nghe trước khi bị chào bán"
        subtitle="Bạn được hỏi thật, trả lời thật — trước khi chúng tôi đề xuất bất cứ điều gì."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <p className="text-[#6b6459] leading-relaxed mb-8">
          Bạn liên hệ qua Zalo, nhóm cư dân hoặc gọi điện trực tiếp — trong
          vòng 2 giờ, sẽ có người lắng nghe thật về căn hộ/nhà, ngân sách và
          mong muốn của bạn, không phải một kịch bản bán hàng dựng sẵn. Nếu
          căn hộ chưa nhận bàn giao, bạn không cần lo bị mời khảo sát vội —
          chúng tôi chủ động theo dõi và liên hệ lại đúng lúc bạn đã có mặt
          bằng thật, thay vì làm bạn tốn thời gian cho số liệu phỏng đoán dễ
          sai lệch.
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
