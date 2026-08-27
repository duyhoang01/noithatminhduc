import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

const mocsA = [
  { moc: "Mốc A1", noiDung: "Đi điện/nước âm tường, âm sàn đúng sơ đồ thiết kế" },
  { moc: "Mốc A2", noiDung: "Chống thấm hoàn tất (sàn vệ sinh, ban công, sân thượng nếu có)" },
  { moc: "Mốc A3", noiDung: "Trần thạch cao, trát/bả tường hoàn thiện" },
  { moc: "Mốc A4", noiDung: "Sơn hoàn thiện, nghiệm thu phần thô" },
];

const mocsB = [
  { moc: "Mốc 1", khi: "Ngày 7", noiDung: "Vật liệu nhập đúng spec đã chốt, điện đi đúng sơ đồ" },
  { moc: "Mốc 2", khi: "30% tiến độ", noiDung: "Kết cấu khung, kích thước" },
  { moc: "Mốc 3", khi: "70% tiến độ", noiDung: "Bề mặt, sơn, phụ kiện" },
  { moc: "Mốc 4", khi: "Trước bàn giao", noiDung: "Checklist 20 điểm nghiệm thu" },
];

const checklist = [
  "Với liền kề/nhà dân: đo lại hiện trạng miễn phí sau khi hoàn thiện phần thô, trước khi sản xuất nội thất",
  "Được mời tham gia trực tiếp bất kỳ mốc kiểm tra nào, không chỉ nghe báo cáo lại",
  "Trễ tiến độ bất kỳ mốc nào → phạt theo hợp đồng, không phải \"cố gắng nhanh nhất có thể\" chung chung",
  "Hạng mục nghiệm thu không đạt được sửa trong 5 ngày làm việc, không phát sinh chi phí",
];

export default function NghiemThuPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Quy trình — Bước 04"
        title="Thi công & giám sát"
        subtitle="Giám sát độc lập theo từng mốc kiểm tra trong suốt quá trình thi công — với liền kề/nhà dân, chia rõ 2 giai đoạn để không bỏ sót phần xây thô."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <h2 className="font-semibold text-[#241f1a] mb-2">
          Giai đoạn A — Thi công phần thô <span className="font-normal text-[#6b6459] text-sm">(chỉ áp dụng Liền kề/Nhà dân bàn giao thô)</span>
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[#241f1a]">
                <th className="py-2 pr-4 font-semibold">Mốc</th>
                <th className="py-2 font-semibold">Kiểm tra gì</th>
              </tr>
            </thead>
            <tbody>
              {mocsA.map((m) => (
                <tr key={m.moc} className="border-b border-gray-100 text-[#6b6459]">
                  <td className="py-2 pr-4 font-medium text-[#241f1a]">{m.moc}</td>
                  <td className="py-2">{m.noiDung}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#6b6459] leading-relaxed mb-8">
          Sau Mốc A4, chúng tôi <strong className="text-[#241f1a]">đo lại hiện trạng thực tế</strong> trước
          khi chốt bản vẽ kỹ thuật gửi xưởng nội thất — vì thi công phần thô
          có thể làm lệch vài cm so với lúc khảo sát ban đầu. Căn hộ chung cư
          (đã có sẵn xây dựng) bỏ qua Giai đoạn A, vào thẳng Giai đoạn B bên
          dưới.
        </p>

        <h2 className="font-semibold text-[#241f1a] mb-2">
          Giai đoạn B — Lắp đặt nội thất <span className="font-normal text-[#6b6459] text-sm">(áp dụng mọi loại hình nhà)</span>
        </h2>
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
              {mocsB.map((m) => (
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
          phục trước khi bàn giao chính thức —{" "}
          <Link href="/chinh-sach/bao-hanh" className="text-[#8a6530] font-medium underline underline-offset-2">
            xem chính sách bảo hành 24 tháng
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
            <ArrowLeft size={14} /> Bước trước: Thiết kế &amp; trình bày
          </Link>
          <Link
            href="/quy-trinh/sau-ban-giao"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white text-sm font-medium transition-colors"
          >
            Bước tiếp theo: Đồng hành sau bàn giao
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
