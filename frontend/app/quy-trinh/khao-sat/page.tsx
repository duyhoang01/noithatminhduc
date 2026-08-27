import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const checklist = [
  "Đo đạc thực tế toàn bộ không gian bằng thước laser, đối chiếu với bản vẽ chủ đầu tư",
  "Trao đổi sâu về phong cách, màu sắc và thói quen sinh hoạt của từng thành viên",
  "Chốt ngân sách bằng số cụ thể, xác nhận bằng văn bản trước khi thiết kế",
  "Biên nhận phí thiết kế rõ ràng — có điều khoản khấu trừ khi ký hợp đồng",
];

export default function KhaoSatPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 02"
        title="Khảo sát thực địa"
        subtitle="Chỉ thực hiện khi căn hộ/nhà đã có mặt bằng thật — đo đạc chính xác là nền tảng của một thiết kế đúng."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <p className="text-[#6b6459] leading-relaxed mb-6">
          Đội ngũ đến tận nơi đo đạc chi tiết từng không gian, kiểm tra hiện
          trạng điện/nước, đánh giá hướng nắng và ánh sáng. Bên cạnh đo đạc kỹ
          thuật, chúng tôi trao đổi sâu để hiểu phong cách, màu sắc yêu thích
          và thói quen sinh hoạt của gia đình — đây là dữ liệu đầu vào trực
          tiếp cho bản thiết kế, không chỉ hỏi cho có.
        </p>
        <p className="text-[#6b6459] leading-relaxed mb-8">
          Cuối buổi khảo sát, ngân sách được chốt bằng một con số cụ thể (không
          còn là khoảng ước lượng) để thiết kế đúng trọng tâm, tránh làm dư
          hạng mục ngoài khả năng chi trả. Từ đây, phí thiết kế{" "}
          <strong className="text-[#241f1a]">130.000đ/m²</strong> diện tích
          được thu để bắt đầu bước thiết kế phối cảnh — khoản này được{" "}
          <strong className="text-[#241f1a]">khấu trừ 100%</strong> vào giá trị
          hợp đồng thi công nếu bạn ký hợp đồng trong vòng 30–45 ngày kể từ khi
          nhận bản thiết kế.
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
          <Link href="/quy-trinh/tu-van" className="inline-flex items-center gap-1 text-sm font-medium text-[#6b6459] hover:text-[#241f1a]">
            <ArrowLeft size={14} /> Bước trước: Tư vấn ban đầu
          </Link>
          <Link
            href="/quy-trinh/thiet-ke"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white text-sm font-medium transition-colors"
          >
            Bước tiếp theo: Thiết kế &amp; trình bày
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
