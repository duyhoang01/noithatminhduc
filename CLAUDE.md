# D-Furniture — Claude Context

## 🎯 Mục tiêu dự án

Xây dựng website **D-Furniture** theo style của Stripe Apps (stripe.com/apps):
- Design: clean, modern, gradient accent tím/xanh, typography rõ ràng
- Tham chiếu: `stripe.com_apps_ref=godly.png` trong thư mục gốc
- Mỗi thay đổi lớn: chụp screenshot và so sánh với design gốc

D-Furniture là **hệ thống CPQ** (Configure Price Quote – cấu hình & báo giá nội thất).

### MVP
- User cấu hình sản phẩm theo phòng
- Tính giá realtime
- Xem báo giá
- KHÔNG checkout online (chỉ tạo quote)

---

## ❌ Out of Scope (MVP)

- Payment online
- Campaign engine phức tạp
- Commission system
- Microservices

---

## 🏗️ Architecture

```
d:\D-Furniture\
├── frontend/          ← Next.js app (hiện tại đang làm)
├── backend/           ← NestJS (chưa tạo)
└── CLAUDE.md
```

**Frontend:** Next.js + TypeScript + Tailwind CSS + Framer Motion  
**Backend:** Node.js (NestJS) + Clean Architecture (module + service + repository)  
**Database:** Supabase (PostgreSQL)  
**ORM:** Prisma  
**Cache:** Redis  
**Storage:** Supabase Storage  

---

## 🎨 Design Rules

- Style: Stripe-inspired (clean, white background, gradient purple/blue accents)
- Primary color: `#635bff`
- Text dark: `#0a2540`
- Text muted: `#425466`
- Surface: `#f6f9fc`
- Mobile-first, fully responsive
- **Mỗi section PHẢI có scroll animation** (dùng Framer Motion + useInView)
- Sau mỗi thay đổi lớn: chụp screenshot so sánh với `stripe.com_apps_ref=godly.png`

---

## ⚠️ Core Rules

- Backend = source of truth
- Pricing logic KHÔNG nằm ở frontend
- Pricing engine = pure function
- KHÔNG query DB trong pricing function
- Code đơn giản, ưu tiên MVP

---

## 🧠 Modules

- catalog
- configurator
- pricing
- order
- distributor
- lead

---

## 🗄️ Data Model (Simplified)

| Table | Key Fields |
|---|---|
| product | id, name |
| variant | id, product_id, name |
| product_images | id, product_id, variant_id, file_path, public_url, is_primary |
| distributor | id, name |
| distributor_variant_price | distributor_id, variant_id, price |
| configuration | id |
| configuration_rooms | id, configuration_id, name, floor_name |
| configuration_lines | id, configuration_id, product_id, variant_id, quantity, unit_price |
| pricing_snapshot | id, configuration_id, total_price |
| orders | id, configuration_id, total_price, status |
| order_items | id, order_id, product_id, variant_id, quantity, unit_price (immutable snapshot) |
| lead | id, name, phone |

---

## 💰 Pricing Logic (MVP)

```
total_price = SUM(configuration_lines.unit_price × quantity) - discount
```

Discount: manual (sale nhập) hoặc package (preset). NO campaign logic.

---

## 🛒 Order Logic

- KHÔNG checkout online
- Khi confirm: copy configuration_lines → order_items (snapshot immutable)

---

## ⚙️ Coding Rules

- Use Prisma, snake_case (DB)
- Keep services small
- No over-engineering, no unnecessary abstraction
- Code only, no explanation, minimal implementation (MVP)

---

## ❌ DO NOT

- Không dùng Supabase auto API
- Không viết pricing bằng SQL
- Không thêm bảng ngoài scope
- Không thêm business logic không được định nghĩa
- Không cài Puppeteer hay tools nặng không cần thiết
