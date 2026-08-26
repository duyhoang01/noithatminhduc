import { Check } from "lucide-react";
import PageHeader from "../../components/PageHeader";

export default function ThanhToanPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Chính sách"
        title="Chính sách thanh toán"
        subtitle="Minh bạch từng khoản, thanh toán theo tiến độ thực tế — không thu trước phần lớn giá trị hợp đồng."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
        <section>
          <h2 className="text-lg font-bold text-[#241f1a] mb-3">1. Phí thiết kế</h2>
          <p className="text-[#6b6459] leading-relaxed mb-3">
            Thu tại buổi khảo sát, trước khi bắt đầu thiết kế phối cảnh:{" "}
            <strong className="text-[#241f1a]">130.000đ/m²</strong> diện tích căn hộ/nhà.
          </p>
          <ul className="space-y-2">
            {[
              "Khấu trừ 100% vào giá trị hợp đồng thi công nếu ký hợp đồng trong vòng 30–45 ngày kể từ khi nhận bản thiết kế",
              "Không hoàn lại nếu không tiếp tục — đây là phí công sức thiết kế thực tế, không phải tiền cọc giữ chỗ",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-[#6b6459]">
                <Check size={16} className="text-[#8a6530] mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#241f1a] mb-3">2. Hợp đồng thi công — 3 đợt theo tiến độ</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left text-[#241f1a]">
                  <th className="py-2 pr-4 font-semibold">Đợt</th>
                  <th className="py-2 pr-4 font-semibold">Tỷ lệ</th>
                  <th className="py-2 font-semibold">Thời điểm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 text-[#6b6459]">
                  <td className="py-2 pr-4 font-medium text-[#241f1a]">Đợt 1</td>
                  <td className="py-2 pr-4">40%</td>
                  <td className="py-2">Khi ký hợp đồng</td>
                </tr>
                <tr className="border-b border-gray-100 text-[#6b6459]">
                  <td className="py-2 pr-4 font-medium text-[#241f1a]">Đợt 2</td>
                  <td className="py-2 pr-4">40%</td>
                  <td className="py-2">Khi thi công đạt 70% tiến độ</td>
                </tr>
                <tr className="border-b border-gray-100 text-[#6b6459]">
                  <td className="py-2 pr-4 font-medium text-[#241f1a]">Đợt 3</td>
                  <td className="py-2 pr-4">20%</td>
                  <td className="py-2">Khi nghiệm thu hoàn tất</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-sm text-[#6b6459] italic">
          Chi tiết đầy đủ và các điều khoản liên quan được ghi rõ trong hợp
          đồng thi công — chính sách trên áp dụng cho nội thất trọn gói tiêu
          chuẩn, có thể điều chỉnh theo thỏa thuận riêng với từng dự án liền
          kề/nhà dân quy mô lớn.
        </p>
      </div>
    </main>
  );
}
