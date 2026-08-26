import Link from "next/link";
import { Check, Phone } from "lucide-react";
import PageHeader from "../../components/PageHeader";

export default function BaoHanhPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Chính sách"
        title="Chính sách bảo hành 24 tháng"
        subtitle="Cam kết đầy đủ trong hợp đồng cho mọi hạng mục nội thất do Minh Đức AIC thi công."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
        <section>
          <h2 className="text-lg font-bold text-[#241f1a] mb-3">Phạm vi bảo hành</h2>
          <ul className="space-y-2">
            {[
              "Lỗi kỹ thuật thi công (kết cấu, khung, lắp đặt)",
              "Lỗi phụ kiện: bản lề, ray trượt, tay nắm và các phụ kiện đi kèm",
              "Vật liệu không đúng spec đã cam kết trong hợp đồng",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-[#6b6459]">
                <Check size={16} className="text-[#8a6530] mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#241f1a] mb-3">Quy trình xử lý khi có sự cố</h2>
          <ul className="space-y-2">
            {[
              "Liên hệ hotline/Zalo — có mặt khảo sát trong 48 giờ làm việc kể từ khi nhận phản ánh",
              "Lỗi phụ kiện đơn giản (bản lề, ray trượt...): hoàn tất xử lý trong tối đa 7 ngày làm việc",
              "Lỗi cần thay vật liệu/làm lại: thông báo thời gian cụ thể sau khi khảo sát, tùy khối lượng vật tư cần chuẩn bị",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-[#6b6459]">
                <Check size={16} className="text-[#8a6530] mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#241f1a] mb-3">Không thuộc phạm vi bảo hành</h2>
          <p className="text-[#6b6459] leading-relaxed">
            Hao mòn tự nhiên theo thời gian sử dụng, hư hỏng do tác động bên
            ngoài (va đập, ngập nước, sử dụng sai công năng) hoặc do bên thứ
            ba tự ý sửa chữa/thay đổi kết cấu không thông qua Minh Đức AIC.
          </p>
        </section>

        <div className="rounded-2xl bg-[#F3EFE7] border border-amber-100 p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#a67c3d] flex items-center justify-center flex-shrink-0">
            <Phone size={20} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-[#241f1a]">Cần hỗ trợ bảo hành?</div>
            <Link href="/lien-he" className="text-sm text-[#8a6530] underline underline-offset-2">
              Liên hệ hotline/Zalo 0364 223 886
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
