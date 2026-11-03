# JAMstack E-Commerce Storefront (Midterm Software Architecture Project)

Hệ thống mẫu minh họa kiến trúc **JAMstack (JavaScript - APIs - Markup)** phục vụ bài thuyết trình và demo 10 phút môn **Kiến Trúc Phần Mềm (Software Architecture)**.

---

## 📌 Tổng Quan Kiến Trúc

Hệ thống được thiết kế theo 3 nguyên tắc nền tảng của JAMstack:
1. **Pre-render tại Build-Time:** Nội dung sản phẩm được lưu trữ dưới dạng **Git Content Collections (Markdown + YAML Frontmatter)**, được trình biên dịch **Astro** dựng trước thành các file HTML tĩnh thuần túy (Zero JavaScript by default).
2. **Decouple hoàn toàn Frontend & Backend:** Toàn bộ giao diện tĩnh được phân phối trên mạng lưới **Global Edge CDN (Vercel/Netlify)** với TTFB < 30ms.
3. **Dynamic Interactivity qua Client Islands & Serverless APIs:** Áp dụng **Islands Architecture** – chỉ hydrate JavaScript ở component Giỏ hàng (`CartIsland`). Nghiệp vụ thanh toán và kiểm tra tồn kho được ủy quyền cho **Serverless Function** (`/api/checkout`).

```
[Git Repo: Markdown Data + Astro Code] 
               │
               ▼ (Git Push / Webhook)
      [CI/CD Build Pipeline] 
               │
               ▼ (Pre-rendered Static HTML/CSS/JS)
     [Global Edge CDN PoPs] 
               │
      ┌────────┴────────┐
      ▼                 ▼
[Client Browser]   [Serverless Function: /api/checkout]
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Local

### 1. Yêu cầu môi trường
* Node.js version 18 trở lên (Khuyến nghị Node.js v20 hoặc v22).
* Quản lý gói: `npm` hoặc `pnpm`.

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Khởi động môi trường phát triển (Dev Mode)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:4321`

### 4. Build thử nghiệm sản phẩm tĩnh (Production Build)
```bash
npm run build
```
Astro sẽ quét toàn bộ thư mục `src/content/products/` và xuất ra thư mục tĩnh `dist/`. Bạn có thể preview bằng lệnh:
```bash
npm run preview
```

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
├── api/
│   └── checkout.js             # Vercel Serverless Function (Xử lý chữ "A" trong JAMstack)
├── public/
│   ├── api/checkout.json       # Fallback mock cho local static preview
│   └── favicon.svg             # Logo biểu tượng dự án
├── src/
│   ├── components/
│   │   ├── AddToCartButton.tsx # Client Island nhỏ gọn xử lý thêm vào giỏ
│   │   ├── ArchitectureModal.astro # Modal hiển thị sơ đồ kiến trúc trực tiếp trên web
│   │   ├── CartIsland.tsx      # Client Island Giỏ hàng & Form thanh toán
│   │   └── ProductCard.astro   # Component thẻ sản phẩm tĩnh (Zero JS)
│   ├── content/
│   │   ├── config.ts           # Schema định nghĩa Content Collections (Zod)
│   │   └── products/           # HEADLESS DATA: Các file Markdown sản phẩm
│   │       ├── headphone-anc.md # Mục tiêu demo: Sửa giá $99 -> $49
│   │       ├── keyboard-pro.md
│   │       ├── mouse-wireless.md
│   │       └── smart-desk-lamp.md
│   ├── layouts/
│   │   └── Layout.astro        # Layout chung có gắn thanh Inspect Kiến Trúc
│   ├── pages/
│   │   ├── index.astro         # Trang chủ danh mục (Pre-rendered)
│   │   └── product/
│   │       └── [slug].astro    # Chi tiết sản phẩm qua getStaticPaths()
│   └── stores/
│       └── cartStore.ts        # Quản lý trạng thái giỏ hàng bằng Nano Stores (<1KB)
├── DEMO_GUIDE.md               # Kịch bản Live Demo chi tiết 180 giây từng thao tác
├── PRESENTATION_DECK.md        # Toàn bộ slide thuyết trình 10 phút kèm kịch bản lời nói
├── astro.config.mjs            # Cấu hình Astro, Tailwind và React integration
├── package.json
└── vercel.json                 # Cấu hình deploy Vercel
```

---

## 🌐 Hướng Dẫn Triển Khai Lên Vercel (1 Phút)

1. Đưa mã nguồn lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial JAMstack storefront"
   git branch -M main
   git remote add origin <URL-REPO-GITHUB-CUA-BAN>
   git push -u origin main
   ```
2. Đăng nhập vào [Vercel](https://vercel.com/) bằng tài khoản GitHub.
3. Chọn **Add New...** -> **Project** -> Chọn repository vừa push.
4. Framework Preset: Vercel sẽ tự động nhận diện là **Astro**.
5. Bấm **Deploy**. Sau ~30 giây, website của bạn sẽ hoạt động toàn cầu với URL dạng `https://ten-du-an.vercel.app`!

---

## 📚 Tài Liệu Kèm Theo Cho Báo Cáo
* 📖 [PRESENTATION_DECK.md](file:///home/quocky05/academy/software-architecture/JAMstack-midterm/PRESENTATION_DECK.md): Slide outline, kịch bản thuyết minh theo phút, bảng phân tích Quality Attributes và câu hỏi phản biện của giảng viên.
* 🎯 [DEMO_GUIDE.md](file:///home/quocky05/academy/software-architecture/JAMstack-midterm/DEMO_GUIDE.md): Kịch bản thao tác live demo 180s chính xác từng bước, cách đo TTFB, test Serverless Function và trigger CI/CD GitOps.
