## Hệ thống đề xuất: **Mini-shop tĩnh (Static E-commerce Storefront)**

Với 10 phút, nên chọn hệ thống nhỏ nhưng thể hiện đủ cả 3 chữ **J – A – M**. Blog tĩnh thì quá đơn giản (thiếu "A"), còn một shop nhỏ thì có đủ: nội dung tĩnh, dữ liệu động và logic phía server.

| Thành phần | Công nghệ gợi ý (miễn phí) | Vai trò JAMstack |
|---|---|---|
| **Frontend / SSG** | Astro hoặc Next.js (static export) | Build ra HTML/CSS/JS tĩnh (Markup) + JavaScript phía client |
| **Headless CMS / dữ liệu** | Markdown/JSON trong Git, hoặc Strapi / Sanity / Contentful | Nội dung sản phẩm, lấy tại **build time** |
| **APIs (serverless)** | Netlify Functions / Vercel Functions / Cloudflare Workers | Giỏ hàng, đặt hàng, form liên hệ, tồn kho realtime |
| **Thanh toán (tuỳ chọn)** | Stripe Checkout (test mode) | API bên thứ ba |
| **Hosting + CDN** | Netlify / Vercel / Cloudflare Pages | Deploy tự động, phân phối qua CDN |
| **CI/CD** | Git push → build hook | Đổi nội dung → tự rebuild |

Nếu muốn tiết kiệm thời gian chuẩn bị, bạn có thể dùng lại domain Product/Cart đã có từ demo Micro-Frontends (danh sách sản phẩm + thêm vào giỏ), chỉ đổi cách xây dựng và triển khai. Như vậy khán giả dễ thấy sự khác biệt về kiến trúc.

**Vì sao hợp lý:** có trang danh sách và chi tiết sản phẩm (pre-render), có phần động (giỏ hàng, tồn kho qua API), có luồng "sửa nội dung → rebuild → lên CDN" rất dễ demo trực quan.

---

## Cấu trúc bài trình bày 10 phút

**1. Mở đầu và vấn đề (1 phút)**
- Web truyền thống (LAMP/monolith): server render mỗi request, chậm, tốn tài nguyên, khó scale, bề mặt tấn công lớn.
- Câu hỏi dẫn dắt: *"Nếu trang đã biết trước nội dung, sao phải dựng lại mỗi lần?"*

**2. JAMstack là gì (1.5 phút)**
- **J**avaScript (xử lý phía client), **A**PIs (tái sử dụng, qua HTTPS), **M**arkup (pre-rendered tại build time).
- Nguyên tắc cốt lõi: **pre-render, decouple, serve từ CDN**.
- Vẽ 1 sơ đồ: so sánh luồng request truyền thống với JAMstack.

**3. Kiến trúc hệ thống demo (2 phút)**
- Sơ đồ: `Git repo → CI build (SSG + fetch từ CMS) → file tĩnh → CDN → Browser → JS gọi Serverless API`.
- Chỉ rõ từng thành phần trong bảng trên nằm ở đâu trong sơ đồ.
- Phân biệt **build time** (trang sản phẩm) và **runtime** (giỏ hàng, đặt hàng).

**4. Live demo (3 phút)** – nên có kịch bản cố định:
1. Mở site, mở DevTools → Network: HTML tĩnh trả về rất nhanh, header cho thấy cache từ CDN.
2. Sửa một sản phẩm (tên hoặc giá) trong CMS/Markdown → commit/push.
3. Cho xem build tự chạy, deploy xong và trang cập nhật.
4. Bấm "Thêm vào giỏ/Gửi form" → gọi serverless function, xem request trong tab Network.
- *Mẹo:* quay sẵn video dự phòng phòng khi build chậm hoặc mạng yếu.

**5. Ưu điểm và đánh đổi (1.5 phút)**
- Ưu: hiệu năng (CDN), bảo mật (không có server/DB lộ ra), chi phí thấp, scale tốt, dev experience (Git workflow).
- Nhược: thời gian build tăng theo số trang, nội dung động phụ thuộc API, preview/thay đổi nội dung cần rebuild (có thể giảm bằng ISR/incremental builds).
- Khi **không** nên dùng: ứng dụng realtime nặng, dữ liệu thay đổi từng giây, nội dung cá nhân hoá mạnh.

**6. Kết luận (1 phút)**
- Tóm tắt 3 ý: pre-render, decouple, CDN-first.
- JAMstack hiện đại ≈ "static + serverless + headless", gần với Jamstack/hybrid (SSG + ISR + edge).
- Mời câu hỏi.

---

## Gợi ý chuẩn bị
- Đo sẵn một con số so sánh (ví dụ Lighthouse hoặc TTFB) giữa bản JAMstack và bản render phía server để có bằng chứng định lượng.
- Chuẩn bị 1 slide sơ đồ kiến trúc duy nhất, vì 10 phút không đủ cho nhiều slide.
- Giữ code demo tối giản: 3–4 trang, 1 serverless function.

Bạn muốn mình đi tiếp phần nào: kịch bản demo chi tiết từng bước, sơ đồ kiến trúc, hay cấu trúc repo mẫu (Astro + Netlify Functions)?