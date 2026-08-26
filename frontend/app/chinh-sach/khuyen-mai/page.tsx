import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import PageHeader from "../../components/PageHeader";

export default function KhuyenMaiPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Chính sách"
        title="Chương trình khuyến mãi"
        subtitle="Ưu đãi hiện có dành cho khách hàng ký hợp đồng sớm cùng Minh Đức AIC."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-2xl border border-amber-200 bg-[#F3EFE7] p-8 text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#a67c3d] flex items-center justify-center mx-auto mb-4">
            <Gift size={26} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#241f1a] mb-2">
            Chương trình Khách hàng Sáng lập
          </h2>
          <p className="text-[#6b6459] leading-relaxed">
            Tặng 1 hạng mục nhỏ (ví dụ: rèm cửa toàn bộ căn hộ) cho{" "}
            <strong className="text-[#241f1a]">3 khách hàng đầu tiên</strong>{" "}
            ký hợp đồng thi công cùng Minh Đức AIC — cùng sự quan tâm sát sao
            nhất từ đội ngũ trong giai đoạn khởi đầu.
          </p>
        </div>

        <p className="text-sm text-[#6b6459] leading-relaxed mb-8">
          Ưu đãi được xác nhận cụ thể khi ký hợp đồng, áp dụng theo số lượng
          giới hạn nêu trên. Các chương trình khuyến mãi theo từng đợt/mùa
          (nếu có) sẽ được cập nhật tại đây và trên các kênh Zalo/Facebook
          chính thức.
        </p>

        <div className="text-center">
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white font-medium text-sm transition-all"
          >
            Liên hệ để giữ suất ưu đãi
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
