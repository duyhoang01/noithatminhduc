import Link from "next/link";
import { ArrowRight, Sofa, Handshake, Gem, ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";

const points = [
  {
    icon: Sofa,
    title: "Chúng tôi biết rõ nội thất được làm ra như thế nào",
    desc: "Nhờ hợp tác với xưởng sản xuất lâu năm, mọi vật liệu đều được kiểm tra kỹ trước khi đến tay bạn.",
  },
  {
    icon: Handshake,
    title: "Đồng hành đến khi bạn dọn vào ở",
    desc: "Không chỉ thi công rồi bàn giao — chúng tôi lo từ khảo sát, thiết kế đến ngày bạn thật sự chuyển vào sống.",
  },
  {
    icon: Gem,
    title: "Không chạy đua giá rẻ",
    desc: "Chúng tôi cạnh tranh bằng việc để bạn biết rõ mình đang trả tiền cho điều gì, không phải bằng cách hạ giá.",
  },
  {
    icon: ShieldCheck,
    title: "Sai là chúng tôi nhận, không đổ lỗi",
    desc: "Nếu công trình không đúng với thiết kế đã duyệt, chúng tôi là người chịu trách nhiệm sửa lại — không viện cớ từ xưởng hay nhà cung cấp.",
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
        subtitle="Nhìn thấy tận mắt, an tâm tận lòng — câu chuyện phía sau cách chúng tôi làm việc."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="prose-none text-[#6b6459] leading-relaxed space-y-4 mb-8">
          <p>
            Minh Đức AIC bắt đầu từ một câu hỏi rất đơn giản: tại sao làm nội
            thất trọn gói cho một căn nhà lại khó biết trước mình sẽ trả bao
            nhiêu, cho những gì?
          </p>
          <p>
            Chúng tôi vốn đã quen với xưởng gỗ, với vật liệu, với
            cách một món đồ nội thất thật sự được làm ra. Nhưng nhìn vào thị
            trường, chúng tôi thấy phần lớn khách hàng phải tin gần như mù
            quáng — không biết vật liệu có đúng như cam kết không, không
            biết giá có bị đội lên không, chỉ đến khi dọn vào ở mới biết mọi
            thứ có ổn hay không.
          </p>
          <p>
            Chúng tôi làm Minh Đức AIC để thay đổi điều đó: cho bạn xem trước
            khi làm, cho bạn kiểm tra trong lúc làm, và chịu trách nhiệm sau
            khi làm xong.
          </p>
          <p>
            Cụ thể, chúng tôi trực tiếp lo phần thiết kế, giám sát thi công
            và chăm sóc bạn từ đầu đến cuối. Phần sản xuất và lắp đặt được
            thực hiện bởi xưởng đối tác nhiều năm kinh nghiệm — cách làm này
            giúp tối ưu chi phí mà vẫn kiểm soát chặt chất lượng ở từng công
            đoạn, và dù ai làm phần nào, người chịu trách nhiệm trước bạn
            luôn là chúng tôi.
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
