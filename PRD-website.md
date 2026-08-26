# PRD — Website Minh Đức AIC (noithatminhduc)

> **Cập nhật 2026-08-26 (v3):** Site đã chuyển từ 1 trang cuộn sang **multi-page**. Ngoài các section trên `/`, đã thêm: `/san-pham`, `/ve-chung-toi`, `/lien-he`, `/quy-trinh` (+ 4 trang con: tu-van, khao-sat, thiet-ke, nghiem-thu), `/chinh-sach/thanh-toan`, `/chinh-sach/bao-hanh`, `/chinh-sach/khuyen-mai`. Nội dung quy trình lấy từ `Alan/03_Van_Hanh/Quy_Trinh/`, đã lược bỏ toàn bộ phần nội bộ (script bán hàng, margin, ghi chú "không nói với khách"). `/configure` đã đổi tên thành `/bao-gia`; `/configurator` (route trùng lặp) đã xoá — sẽ làm lại sau dưới dạng phiên bản có tài khoản. Menu "Dịch vụ" đổi thành "Sản phẩm". Blog vẫn chưa làm (chốt sau, theo quyết định trước đó).

> Trạng thái: Draft v2 — đã cập nhật theo feedback (màu sắc thương hiệu, thêm "Về chúng tôi" + "Sản phẩm tiêu biểu", thêm Blog). Chờ chốt các quyết định ở §9 trước khi code.
> Phạm vi: trang chủ tiếp thị (`frontend/app/page.tsx` + components) + mục Blog mới. Không bao gồm `/configure`, `/configurator` (công cụ báo giá — đã hoạt động đúng, xem §8).

## 1. Bối cảnh & vấn đề

Trang chủ hiện tại là nội dung mẫu SaaS chưa từng chỉnh sửa, định vị sai hoàn toàn:

| Hiện tại (sai) | Thực tế |
|---|---|
| Bán "hệ thống CPQ" cho **đại lý nội thất** (B2B), có "Đăng nhập", "Dùng thử 14 ngày" | Minh Đức AIC bán **trực tiếp cho chủ nhà** — dịch vụ thiết kế + thi công nội thất, không phải phần mềm |
| "1.200+ đại lý", "50K+ báo giá", "99.9% uptime" | Chưa có deal nào, đang giai đoạn validation (0–12 tháng đầu) |
| 3 testimonial bịa (người + công ty không tồn tại) | Chưa có công trình/khách hàng thật nào để làm chứng thực |
| Liên hệ giả: `info@d-furniture.vn`, `0123 456 789`, "Hà Nội" | SĐT thật: **0364 223 886**, email **minhducaiccompany@gmail.com**; chưa có mặt bằng/showroom; hoạt động tại Sun Urban City & Phủ Lý, Hà Nam |
| Thương hiệu "D-Furniture" / "MD-Furniture" | Tên công ty: **Minh Đức AIC** |
| Màu chủ đạo tím/xanh kiểu Stripe (`#635bff`, `#0a2540`) | **Không khớp bảng màu thương hiệu đã chốt** (xem §5) |

Rủi ro nếu giữ nguyên: số liệu + testimonial bịa mâu thuẫn trực tiếp với chính định vị "minh bạch" mà landing page `/uu-dai-thang-9` đang quảng bá.

## 2. Mục tiêu

- Website thể hiện đúng Minh Đức AIC là ai, làm gì, quy trình ra sao — **đủ chuyên nghiệp, không sơ sài, không phóng đại**
- **Đồng bộ màu sắc với bảng màu thương hiệu chính thức đã chốt** (logo, danh thiếp) — không dùng lại theme tím/xanh cũ
- Toàn bộ nội dung phải **verify được** từ tài liệu kinh doanh thật — không bịa số liệu/testimonial mới, nhưng **có thể** đăng sản phẩm bán lẻ thật (ảnh từ Minh Khôi) dù chưa có công trình thiết kế hoàn thiện
- Giữ nguyên hệ thống bố cục/animation hiện có (Framer Motion, `card-hover`) — chỉ đổi màu sắc + nội dung, không redesign layout
- Bắt đầu xây kênh chia sẻ tri thức (Blog) để build uy tín chuyên môn — đúng chiến thuật "tư vấn miễn phí → thành chuyên gia trong 2 tuần" đã có trong `marketing.md`

## 3. Ngoài phạm vi

- `/configure`, `/configurator` — công cụ tính giá đã nối API thật, chỉ có 1 việc nhỏ optional: thêm dòng disclaimer "giá sơ bộ, cần khảo sát để chốt chính xác"
- **Sản phẩm bán lẻ ("Sản phẩm tiêu biểu")** — **tạm hoãn theo quyết định 2026-08-26**, không triển khai đợt này. Giữ lại ý tưởng trong §7 để làm sau khi có ảnh/quyết định mô hình bán lẻ rõ ràng hơn
- CMS quản trị bài viết Blog — bắt đầu bằng nội dung tĩnh (xem §7), chưa cần hệ thống đăng bài động

## 4. Đối tượng người dùng

Chủ nhà 28–45 tuổi tại Sun Urban City (chung cư, liền kề) và TP Nam Định/Phủ Lý/H. Bình Lục (nhà dân), đang tìm đơn vị thiết kế + thi công nội thất trọn gói, quan tâm: giá không phát sinh, tiến độ, uy tín, portfolio thực tế.

## 5. Hệ thống màu sắc (nguồn: `Alan/02_Chien_Luoc/prompt-logo-minh-duc.md`, đã chốt 2026-08-04)

| Vai trò | Mã màu | Dùng cho |
|---|---|---|
| Chủ đạo (dark) | `#241F1A` | Text chính, section nền tối (thay `#0a2540`) |
| Điểm nhấn (accent) | `#A67C3D` | Nút CTA, gradient-text, icon nổi bật (thay tím `#635bff`) |
| Nền (surface) | `#F3EFE7` | Nền section xen kẽ, thẻ (thay xanh nhạt `#f6f9fc`) |

**Lưu ý cần xử lý:** landing page `/uu-dai-thang-9.html` hiện dùng `--accent: #2F4B3C` (xanh rêu đậm) + `--wood: #9C6B3F`, không khớp hoàn toàn với accent vàng đồng `#A67C3D` đã chốt sau đó (logo chốt 2026-08-04, landing page làm trước đó). Đề xuất: trang chủ mới dùng đúng bảng màu đã chốt; **cập nhật lại landing page cho khớp** ở một lần sửa riêng (không bắt buộc làm ngay, nhưng nên làm sớm để toàn bộ hệ thống nhất quán như yêu cầu #1).

Giữ nguyên: bố cục trắng làm nền chính, gradient nhẹ, `card-hover`, animation Framer Motion — chỉ đổi mã màu, không đổi cấu trúc thị giác.

## 6. Sitemap trang chủ

| # | Section (file) | Vai trò cũ (xóa) | Vai trò mới |
|---|---|---|---|
| 0 | `Navbar.tsx` | Nav SaaS + "Đăng nhập" | Nav công ty: Dịch vụ · Quy trình · Về chúng tôi · **Blog** · Liên hệ + CTA "Nhận báo giá miễn phí" |
| 1 | `Hero.tsx` | "Hệ thống CPQ #1 VN" | Định vị dịch vụ + CTA khảo sát miễn phí |
| 2 | **`AboutUs.tsx` (mới)** | — | "Về chúng tôi" — câu chuyện Minh Đức AIC (xem §7) |
| 3 | `Features.tsx` | 6 tính năng phần mềm | "Vì sao chọn Minh Đức AIC" — 6 lý do thật |
| 4 | `HowItWorks.tsx` | 3 bước dùng app | "Quy trình làm việc" — 4 bước bán hàng thật |
| 5 | `Stats.tsx` | Số liệu bịa | "Cam kết" — 4 cam kết định tính |
| 6 | `Catalog.tsx` | Danh mục sản phẩm giả | "Dịch vụ" — 3 phân khúc thật (Chung cư/Liền kề/Nhà dân) |
| 7 | ~~`FeaturedProducts.tsx`~~ | — | **Tạm hoãn** — chưa vào bán lẻ đợt này (xem §3, §7) |
| 8 | `Testimonials.tsx` | 3 quote bịa | Bỏ khỏi trang lần này (chưa có khách hàng thật — xem quyết định §9) |
| 9 | `CTA.tsx` | "Dùng thử 14 ngày" | "Đăng ký khảo sát miễn phí" + hotline thật |
| 10 | `Footer.tsx` | Link + liên hệ giả | Dịch vụ thật + liên hệ thật + chính sách bảo hành + link Blog |
| — | **`/blog`, `/blog/[slug]` (mới)** | — | Trang danh sách + chi tiết bài viết chia sẻ kiến thức (xem §7) |

## 7. Nội dung chi tiết

### Navbar / Hero / Features / HowItWorks / Stats / Catalog / CTA / Footer
Giữ đúng nội dung đã thống nhất ở bản v1 của PRD này (xem lịch sử — không lặp lại ở đây), chỉ đổi mã màu theo §5.

### Về chúng tôi (mới)
- Người sáng lập: **Nguyễn Công Giang**
- Câu chuyện ngắn: gia đình có kinh nghiệm sẵn trong ngành nội thất (lợi thế chuỗi cung ứng qua Minh Khôi), định vị "Move-in Solution Provider" — không phải nhà thầu thi công thông thường
- Định vị: Tier 2+ (mid price/high trust), giá minh bạch, không cạnh tranh giá rẻ
- Khu vực hoạt động: Sun Urban City, Phủ Lý, Hà Nam
- Có thể kèm ảnh chân dung/đội ngũ nếu có sẵn (không bắt buộc — nếu chưa có ảnh thật thì dùng minh họa trung tính, không dùng ảnh stock giả làm "đội ngũ")

### Sản phẩm tiêu biểu / bán lẻ — **TẠM HOÃN (quyết định 2026-08-26)**
Chưa triển khai đợt này. Giữ ý tưởng lại để tham khảo khi cần: bán lẻ sản phẩm nội thất từ nguồn Minh Khôi, mô hình "bán lẻ → giao hàng tận nơi", tách biệt với dịch vụ thiết kế/thi công trọn gói, không làm giỏ hàng thật (đặt hàng qua Zalo/Hotline). Không cần action gì ở lần sửa này.

### Blog / Bài viết (mới — mảng nội dung mới)
Mục tiêu: chia sẻ kiến thức chuyên môn để xây uy tín ("sau 2 tuần → trở thành chuyên gia trong nhóm", theo `marketing.md`), hỗ trợ SEO dài hạn.

**Chủ đề (content pillars):**
- Trước khi thi công: chọn đơn vị, đọc bản vẽ, chuẩn bị ngân sách
- Thi công thô: móng, mái, chống thấm
- Hệ thống: điện, nước
- Hoàn thiện: sàn, trần, sơn
- Nội thất: lưu ý khi chọn vật liệu (gỗ công nghiệp, phụ kiện Blum/Hettich), nghiệm thu
- Sau thi công: bảo hành, bảo trì

**Đề xuất 6 bài đầu tiên** (mỗi bài giải quyết 1 nỗi sợ thật của khách, khớp `kinh-doanh.md`/`van-hanh.md`):
1. "5 lỗi thi công điện nước khiến bạn tốn thêm chục triệu sau khi ở"
2. "Chống thấm nhà liền kề: làm đúng ngay từ đầu, tránh sửa đi sửa lại"
3. "Cách đọc hợp đồng nội thất để không bị đội giá phát sinh"
4. "MDF chống ẩm, phụ kiện Blum/Hettich — vì sao vật liệu quyết định tuổi thọ nội thất"
5. "Checklist 20 điểm nghiệm thu trước khi nhận bàn giao nội thất"
6. "Bảo hành nội thất 24 tháng — bạn được bảo vệ những gì?"

**Kỹ thuật (đề xuất, tránh over-engineer theo CLAUDE.md):**
- Bắt đầu đơn giản: nội dung dạng MDX/markdown tĩnh trong repo (`app/blog/posts/*.mdx` hoặc mảng dữ liệu), route `/blog` (danh sách) + `/blog/[slug]` (chi tiết) bằng Next.js static rendering
- **Không cần** CMS, database bài viết, hay hệ thống comment ở giai đoạn này — thêm sau nếu tần suất đăng bài đủ nhiều để cần quản trị qua giao diện
- Navbar thêm mục "Blog"; Footer thêm link tới 2–3 bài mới nhất (optional)

## 8. Ghi chú kỹ thuật

- Máy hiện tại **không có Node.js** → không chạy được `npm run build` cục bộ. Verify bằng cách push branch preview lên Vercel rồi xem bằng mắt (đã áp dụng cho landing page `/uu-dai-thang-9`)
- Chỉ đổi màu/nội dung trong component đã có, giữ nguyên cấu trúc JSX/props để giảm rủi ro lỗi cú pháp
- `/configure`, `/configurator` dùng logic pricing thật — không đụng vào trong lần sửa trang chủ này

## 9. Quyết định & action cần chốt trước khi code

**Đã chốt (2026-08-26):**
- ~~Sản phẩm bán lẻ~~ → tạm hoãn, không triển khai đợt này (§3, §7)
- ~~Ai viết blog~~ → dùng AI để viết nội dung 6 bài đầu (và các bài sau)
- ~~Ưu tiên~~ → **thiết kế/nội dung website chính làm trước, Blog (kể cả mốc đăng bài) chốt sau** — không block nhau, Blog để đợt riêng theo §10

**Còn cần chốt (không block việc bắt đầu sửa website — dùng phương án đề xuất làm mặc định nếu không có ý kiến khác):**
1. **Testimonials**: mặc định **bỏ hẳn khỏi trang** (an toàn nhất, chưa có khách hàng thật)
2. **Rebrand "MD-Furniture"**: mặc định đổi luôn thành "Minh Đức AIC" ở `WizardHeader.tsx` cho nhất quán (đúng yêu cầu #1 — đồng bộ toàn site)
3. **Màu landing page `/uu-dai-thang-9`**: để riêng sau, không sửa trong đợt này
4. **Domain thật cho mockup Hero**: dùng placeholder trung tính (bỏ URL giả `d-furniture.vn`, thay bằng tên miền tạm hoặc ẩn thanh URL) cho đến khi có domain chính thức

## 10. Rollout

1. Chốt §9 với người phụ trách
2. Sửa màu sắc (design tokens trong `globals.css`) trước tiên — ảnh hưởng toàn bộ site, làm 1 lần
3. Sửa nội dung từng section theo thứ tự: `layout.tsx` → `Footer.tsx`+`CTA.tsx` → `Navbar.tsx`+`Hero.tsx` → `AboutUs.tsx` (mới) → `Features.tsx`/`Catalog.tsx`/`HowItWorks.tsx`/`Stats.tsx` → `Testimonials.tsx`
4. Blog `/blog` làm thành đợt riêng sau khi trang chủ ổn định (không block nhau) — nội dung do AI viết theo 6 chủ đề đề xuất ở §7
5. Mỗi phần = 1 commit trên branch riêng → xem Preview Deployment trên Vercel → duyệt → merge `master`
