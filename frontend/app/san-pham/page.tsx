import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";

const segments = [
  {
    name: "Liền kề",
    area: "Sun Urban City",
    desc: "Thiết kế và thi công từ phần thô: điện, nước, sơn bả, trần thạch cao, đến nội thất trọn gói. Tính giá theo mô hình minh bạch từng hạng mục vật tư.",
    note: "Phần xây dựng (điện, nước, sơn bả, trần thạch cao) luôn tính theo đúng hóa đơn vật tư thực tế — không đổi theo gói. 3 gói dưới đây chỉ khác nhau ở phần nội thất.",
    tiers: [
      { name: "Cơ bản", desc: "Nội thất MDF Thái xanh, phụ kiện Hafele cơ bản — tối giản hạng mục, phù hợp hoàn thiện cho thuê" },
      { name: "Tiêu chuẩn", desc: "Nội thất MDF Thái xanh đầy đủ hạng mục, phụ kiện Hafele — mức phổ biến nhất" },
      { name: "Cao cấp", desc: "Nội thất An Cường, phụ kiện Blum/Hettich — cá nhân hóa cao cho ở thực lâu dài" },
    ],
  },
  {
    name: "Nhà dân",
    area: "Nam Định · Phủ Lý · Bình Lục",
    desc: "Chỉ phần nội thất và điện nhẹ (điều hòa, máy giặt, tủ lạnh) — không đụng vào phần xây dựng thô đã có sẵn.",
    note: null,
    tiers: [
      { name: "Cơ bản", desc: "Gỗ MDF Thái Lan, phụ kiện Ivan — đủ dùng, tối ưu chi phí" },
      { name: "Tiêu chuẩn", desc: "Gỗ MDF An Cường, phụ kiện Hafele — lựa chọn phổ biến nhất" },
      { name: "Cao cấp", desc: "Gỗ Sồi/Gỗ Đỏ, phụ kiện Blum — cá nhân hóa cao, dùng lâu dài" },
    ],
  },
  {
    name: "Căn hộ chung cư",
    area: "Sun Urban City",
    desc: "Nội thất trọn gói cho căn hộ đã bàn giao xây dựng — 3 tầng giá theo 2 kiểu bàn giao (thô/đồ liền tường), chọn đúng gói theo nhu cầu ở thực hay đầu tư cho thuê.",
    note: null,
    tiers: [
      { name: "Cơ bản", desc: "Gỗ MDF Thái Lan, phụ kiện Ivan — phù hợp đầu tư cho thuê" },
      { name: "Tiêu chuẩn", desc: "Gỗ MDF An Cường, phụ kiện Hafele — lựa chọn phổ biến nhất" },
      { name: "Cao cấp", desc: "Gỗ Sồi/Gỗ Đỏ, phụ kiện Blum — cá nhân hóa cao cho ở lâu dài" },
    ],
  },
];

export default function SanPhamPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Sản phẩm"
        title="Nội thất trọn gói theo từng loại hình nhà"
        subtitle="Mỗi phân khúc có scope thi công khác nhau — khảo sát tận nơi để nhận báo giá đúng với nhu cầu thực tế."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-8">
        {segments.map((seg) => (
          <div key={seg.name} className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm">
            <div className="flex flex-wrap items-baseline gap-3 mb-3">
              <h2 className="text-2xl font-bold text-[#241f1a]">{seg.name}</h2>
              <span className="text-sm text-[#8a6530] font-medium">{seg.area}</span>
            </div>
            <p className="text-[#6b6459] leading-relaxed mb-5">{seg.desc}</p>

            {seg.note && (
              <p className="text-sm text-[#8a6530] bg-[#F3EFE7] rounded-lg px-4 py-2.5 mb-5 inline-block">
                {seg.note}
              </p>
            )}

            {seg.tiers && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                {seg.tiers.map((t) => (
                  <div key={t.name} className="rounded-xl bg-[#F3EFE7] p-4">
                    <div className="font-semibold text-[#241f1a] mb-1 flex items-center gap-1.5">
                      <Check size={14} className="text-[#8a6530]" /> {t.name}
                    </div>
                    <div className="text-sm text-[#6b6459]">{t.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="text-center pt-8">
          <p className="text-[#6b6459] mb-4">
            Chưa chắc căn của bạn phù hợp gói nào? Đăng ký khảo sát miễn phí để
            được tư vấn đúng nhu cầu.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white font-medium text-sm transition-all"
            >
              Đăng ký khảo sát miễn phí
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/bao-gia"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#241f1a] font-medium text-sm border border-gray-200 transition-all"
            >
              Xem báo giá tham khảo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
