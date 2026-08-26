"use client";

const footerLinks = {
  "Dịch vụ": ["Nội thất căn hộ chung cư", "Nội thất liền kề", "Nội thất nhà dân", "Xem báo giá tham khảo"],
  "Về Minh Đức AIC": ["Về chúng tôi", "Quy trình làm việc", "Chính sách bảo hành"],
  "Liên hệ": ["Hotline/Zalo: 0364 223 886", "minhducaiccompany@gmail.com", "Sun Urban City & khu vực Hà Nam"],
};

export default function Footer() {
  return (
    <footer className="bg-[#241f1a] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F3EFE7] flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-icon.png" alt="Minh Đức AIC" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-white">Minh Đức AIC</span>
            </div>
            <p className="text-amber-100/70 text-sm leading-relaxed">
              Thiết kế &amp; thi công nội thất trọn gói — giá minh bạch, bảo hành 24 tháng.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-amber-100/70 text-sm">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-amber-100/60 text-sm">
            © 2026 Minh Đức AIC. Bảo lưu mọi quyền.
          </span>
          <span className="text-amber-100/60 text-sm">
            Bảo hành 24 tháng cho mọi hạng mục nội thất — chi tiết theo hợp đồng
          </span>
        </div>
      </div>
    </footer>
  );
}
