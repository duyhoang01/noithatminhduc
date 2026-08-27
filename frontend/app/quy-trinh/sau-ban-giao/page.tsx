import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const checklist = [
  "Nhận thẻ bảo hành 24 tháng ngay khi bàn giao",
  "Được chủ động hỏi thăm sau 1-2 tuần dọn vào ở — không phải chờ bạn báo mới liên hệ",
  "Có mặt khảo sát trong 48 giờ nếu phát sinh vấn đề trong thời gian bảo hành",
  "Lỗi phụ kiện đơn giản (bản lề, ray trượt...) xử lý trong tối đa 7 ngày làm việc",
];

export default function SauBanGiaoPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 05"
        title="Đồng hành sau bàn giao"
        subtitle="Không kết thúc ở lúc bàn giao. Chúng tôi vẫn đồng hành cùng bạn trong suốt 24 tháng bảo hành."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <p className="text-[#6b6459] leading-relaxed mb-6">
          Nhiều đơn vị coi ngày bàn giao là điểm kết thúc trách nhiệm. Với
          chúng tôi, đó mới là điểm bắt đầu của giai đoạn quan trọng nhất —
          khi bạn thực sự sống trong không gian đã được làm ra.
        </p>
        <p className="text-[#6b6459] leading-relaxed mb-8">
          Sau khi bạn dọn vào ở khoảng 1-2 tuần, chúng tôi chủ động liên hệ
          hỏi thăm — không đợi đến khi có sự cố mới nghe tin từ bạn. Nếu có
          vấn đề phát sinh trong suốt 24 tháng bảo hành, chúng tôi có mặt
          khảo sát trong 48 giờ.
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

        <p className="text-sm text-[#6b6459] mb-10">
          Xem đầy đủ phạm vi và quy trình xử lý bảo hành tại{" "}
          <Link href="/chinh-sach/bao-hanh" className="text-[#8a6530] font-medium underline underline-offset-2">
            Chính sách bảo hành 24 tháng
          </Link>.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/quy-trinh/nghiem-thu" className="inline-flex items-center gap-1 text-sm font-medium text-[#6b6459] hover:text-[#241f1a]">
            <ArrowLeft size={14} /> Bước trước: Thi công &amp; giám sát
          </Link>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white text-sm font-medium transition-colors"
          >
            Đăng ký khảo sát miễn phí
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
