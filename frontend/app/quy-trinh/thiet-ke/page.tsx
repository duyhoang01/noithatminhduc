import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const tiers = [
  { name: "Cơ bản", detail: "2D mặt bằng bố trí + phối cảnh 3D 1 góc" },
  { name: "Tiêu chuẩn", detail: "2D mặt bằng bố trí + phối cảnh 3D 2–3 góc nhìn" },
  { name: "Cao cấp", detail: "2D mặt bằng bố trí + phối cảnh 3D đầy đủ không gian chính" },
];

const checklist = [
  "Nhận bản vẽ 2D mặt bằng bố trí trong khoảng 3 ngày làm việc sau khảo sát",
  "Nhận phối cảnh 3D theo đúng gói đã chọn, thêm 3–5 ngày làm việc",
  "1 buổi trình bày phối cảnh trực tiếp (hoặc video call) — không chỉ gửi file qua Zalo",
  "2 lần chỉnh sửa miễn phí theo hợp đồng",
  "Bản vẽ đóng watermark, thuộc quyền Minh Đức AIC cho đến khi ký hợp đồng thi công",
];

export default function ThietKePage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 03"
        title="Đủ tin để ký, không phải đi quá xa để quay đầu"
        subtitle="Bản vẽ và phối cảnh 3D theo đúng gói đã chọn, cùng xem trực tiếp — để bạn ký hợp đồng vì hiểu và tin, không phải vì tiếc công đã đi đến đây."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <p className="text-[#6b6459] leading-relaxed mb-6">
          Dựa trên kết quả khảo sát và ngân sách đã chốt, đội thiết kế triển
          khai bản vẽ 2D mặt bằng bố trí và phối cảnh 3D theo đúng gói bạn đã
          chọn. Toàn bộ hạng mục, màu sắc và phong cách được lấy đúng từ những
          gì bạn chia sẻ ở buổi khảo sát.
        </p>
        <p className="text-[#6b6459] leading-relaxed mb-6">
          Khi có bản phối cảnh 3D, chúng tôi hẹn một buổi trực tiếp (hoặc
          video call nếu bạn ở xa) để cùng xem và giải thích lý do chọn từng
          vật liệu, bố cục — không phải gửi file qua Zalo để bạn tự đoán rồi
          ký vì đã lỡ đi đến bước này.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-xl bg-[#F3EFE7] p-4">
              <div className="font-semibold text-[#241f1a] mb-1">{t.name}</div>
              <div className="text-sm text-[#6b6459]">{t.detail}</div>
            </div>
          ))}
        </div>

        <p className="text-[#6b6459] leading-relaxed mb-8">
          Sau khi bạn duyệt phối cảnh (đồng ý bố cục, màu sắc, vật liệu
          chính), chúng tôi chuyển sang chốt báo giá chi tiết theo đúng thiết
          kế và tiến hành ký hợp đồng thi công.
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
          <Link href="/quy-trinh/khao-sat" className="inline-flex items-center gap-1 text-sm font-medium text-[#6b6459] hover:text-[#241f1a]">
            <ArrowLeft size={14} /> Bước trước: Khảo sát thực địa
          </Link>
          <Link
            href="/quy-trinh/nghiem-thu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white text-sm font-medium transition-colors"
          >
            Bước tiếp theo: Thi công &amp; giám sát
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
