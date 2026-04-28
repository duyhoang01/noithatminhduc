"use client";

const footerLinks = {
  "Sản phẩm": ["Cấu hình nội thất", "Báo giá tự động", "Quản lý đại lý", "Danh mục sản phẩm"],
  "Doanh nghiệp": ["Về chúng tôi", "Blog", "Đối tác", "Tuyển dụng"],
  "Hỗ trợ": ["Tài liệu hướng dẫn", "FAQ", "Liên hệ", "Chính sách bảo mật"],
  "Liên hệ": ["0123 456 789", "info@d-furniture.vn", "Hà Nội, Việt Nam"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a2540] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-white">D-Furniture</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Hệ thống CPQ Nội thất thông minh cho đại lý và nhà phân phối.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-blue-200 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-blue-300 text-sm">
            © 2024 D-Furniture. Bảo lưu mọi quyền.
          </span>
          <div className="flex gap-4">
            {["Điều khoản", "Bảo mật", "Cookie"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-blue-300 text-sm hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
