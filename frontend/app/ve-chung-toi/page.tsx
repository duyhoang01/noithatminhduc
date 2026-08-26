import Link from "next/link";
import { ArrowRight, Sofa, Handshake, MapPin, ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";

const points = [
  {
    icon: Sofa,
    title: "Kinh nghiệm gia đình trong ngành nội thất",
    desc: "Lợi thế nguồn hàng và chuỗi cung ứng sẵn có, kiểm soát chất lượng từ đầu vào.",
  },
  {
    icon: Handshake,
    title: "Move-in Solution Provider",
    desc: "Không chỉ thi công — đồng hành từ khảo sát, thiết kế đến bàn giao, để bạn chỉ việc dọn vào ở.",
  },
  {
    icon: MapPin,
    title: "Bám sát địa bàn",
    desc: "Tập trung phục vụ Sun Urban City, Phủ Lý và khu vực Hà Nam — hiểu rõ đặc thù từng dự án.",
  },
  {
    icon: ShieldCheck,
    title: "Định vị tin cậy, không chạy đua giá rẻ",
    desc: "Khách hàng biết chính xác mình trả tiền cho điều gì, từ bản vẽ đầu tiên đến ngày nhận bàn giao.",
  },
];

export default function VeChungToiPage() {
  return (
    <main className="bg-white">
      <PageHeader
        eyebrow="Về chúng tôi"
        title={
          <>
            Minh Đức AIC — Kiến trúc &amp; Nội thất
          </>
        }
        subtitle="Đơn vị thiết kế và thi công nội thất trọn gói, ra đời từ mong muốn mang lại giải pháp nội thất minh bạch về giá cho các gia đình tại Sun Urban City và khu vực Hà Nam."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="prose-none text-[#6b6459] leading-relaxed space-y-4 mb-12">
          <p>
            Minh Đức AIC hoạt động theo mô hình <strong className="text-[#241f1a]">asset-light</strong>:
            chúng tôi trực tiếp quản lý thiết kế, giám sát thi công và chăm sóc khách hàng,
            trong khi phần sản xuất/lắp đặt được thực hiện bởi xưởng đối tác có kinh nghiệm lâu năm.
            Cách vận hành này giúp tối ưu chi phí mà vẫn kiểm soát chặt chất lượng ở từng công đoạn.
          </p>
          <p>
            Không chạy theo cạnh tranh giá rẻ, chúng tôi định vị ở phân khúc tin cậy —
            nơi khách hàng biết chính xác mình trả tiền cho điều gì, từ bản vẽ đầu tiên
            đến ngày nhận bàn giao, và được bảo vệ bằng hợp đồng rõ ràng cùng chính sách
            bảo hành 24 tháng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex gap-4 p-5 rounded-2xl bg-[#F3EFE7] border border-amber-100">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[#8a6530]">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-semibold text-[#241f1a] mb-1">{p.title}</div>
                  <div className="text-sm text-[#6b6459] leading-relaxed">{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/quy-trinh"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#a67c3d] hover:bg-[#8a6530] text-white font-medium text-sm transition-all"
          >
            Xem quy trình làm việc
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
