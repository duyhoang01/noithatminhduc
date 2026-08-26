import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const mocs = [
  { moc: "Mốc 1", khi: "Ngày 7", noiDung: "Vật liệu nhập đúng spec đã chốt, điện đi đúng sơ đồ" },
  { moc: "Mốc 2", khi: "30% tiến độ", noiDung: "Kết cấu khung, kích thước" },
  { moc: "Mốc 3", khi: "70% tiến độ", noiDung: "Bề mặt, sơn, phụ kiện" },
  { moc: "Mốc 4", khi: "Trước bàn giao", noiDung: "Checklist 20 điểm nghiệm thu" },
];

const checklist = [
  "Được mời tham gia trực tiếp bất kỳ mốc kiểm tra nào, không chỉ nghe báo cáo lại",
  "Trễ tiến độ bất kỳ mốc nào → phạt theo hợp đồng, không phải \"cố gắng nhanh nhất có thể\" chung chung",
  "Hạng mục nghiệm thu không đạt được sửa trong 5 ngày làm việc, không phát sinh chi phí",
  "Nhận thẻ bảo hành 24 tháng ngay khi bàn giao",
];

export default function NghiemThuPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 04"
        title="Thi công, nghiệm thu & bảo hành"
        subtitle="Giám sát độc lập theo 4 mốc kiểm tra bắt buộc trong suốt quá trình thi công, không đợi đến khi hoàn thiện mới phát hiện sai sót."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[#241f1a]">
                <th className="py-2 pr-4 font-semibold">Mốc</th>
                <th className="py-2 pr-4 font-semibold">Thời điểm</th>
                <th className="py-2 font-semibold">Kiểm tra gì</th>
              </tr>
            </thead>
            <tbody>
              {mocs.map((m) => (
                <tr key={m.moc} className="border-b border-gray-100 text-[#6b6459]">
                  <td className="py-2 pr-4 font-medium text-[#241f1a]">{m.moc}</td>
                  <td className="py-2 pr-4">{m.khi}</td>
                  <td className="py-2">{m.noiDung}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[#6b6459] leading-relaxed mb-8">
          Sau khi hoàn thiện Mốc 4, hai bên cùng nghiệm thu trực tiếp tại hiện
          trường theo checklist 20 điểm. Hạng mục nào chưa đạt sẽ được khắc
          phục trước khi bàn giao chính thức và trao thẻ bảo hành —{" "}
          <Link href="/chinh-sach/bao-hanh" className="text-[#8a6530] font-medium underline underline-offset-2">
            xem chi tiết chính sách bảo hành 24 tháng
          </Link>.
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
          <Link href="/quy-trinh/thiet-ke" className="inline-flex items-center gap-1 text-sm font-medium text-[#6b6459] hover:text-[#241f1a]">
            <ArrowLeft size={14} /> Bước trước: Thiết kế &amp; phối cảnh
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
