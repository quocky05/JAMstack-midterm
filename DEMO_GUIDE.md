# KỊCH BẢN LIVE DEMO CHUẨN MỰC: JAMSTACK STOREFRONT (3 PHÚT)
**Môn học:** Kiến Trúc Phần Mềm (Software Architecture)  
**Thời lượng Demo:** 3 Phút (180 giây)  
**Tác phong:** Trình bày theo ý chính (Bullet Points), thao tác dứt khoát, không đọc nguyên văn.

---

## 1. CHUẨN BỊ KỸ THUẬT TRƯỚC BUỔI BÁO CÁO (PRE-FLIGHT)

* **Lựa chọn môi trường chạy:**
  * **Tùy chọn A (Ưu tiên số 1):** Chạy trên URL production đã deploy của Vercel (nếu mạng trường ổn định).
  * **Tùy chọn B (Offline / Dự phòng chống rớt mạng):** Chạy lệnh build tĩnh trước:
    ```bash
    npm run build && npm run preview
    ```
    Truy cập tại `http://localhost:4321`.
  * *(Lưu ý quan trọng: Tránh dùng `npm run dev` lúc demo vì dev server nạp thêm script HMR và dev-toolbar của Vite, làm tab Network hiển thị nhiều script không phản ánh đúng bản production).*

* **Thiết lập Chrome DevTools:**
  * Bấm `F12`. Nên để DevTools ở chế độ **Dock to bottom** (nằm ở nửa dưới màn hình) hoặc tách thành cửa sổ riêng để không làm hẹp viewport gây đổi giao diện web.
  * Phím đóng/mở DevTools: Bấm lại **`F12`** (không dùng `Esc` vì `Esc` chỉ bật/tắt Console).

---

## 2. KỊCH BẢN CHI TIẾT TỪNG PHẦN (180 GIÂY)

```
[00:00 - 00:45] (45s) : PHẦN 1 - [M - Markup]: HTML Tĩnh & Độc lập với JavaScript
[00:45 - 01:30] (45s) : PHẦN 2 - [J - JavaScript]: Islands Architecture & State Client
[01:30 - 02:20] (50s) : PHẦN 3 - [A - APIs]: Serverless Function & Server Validation
[02:20 - 03:00] (40s) : PHẦN 4 - Tổng kết: Minh chứng Build-time & Bề mặt tấn công
```

---

### PHẦN 1: CHỨNG MINH [M - MARKUP] - PRE-RENDERED TĨNH (00:00 - 00:45)

* **Mục đích:** Chứng minh trang web là HTML tĩnh hoàn chỉnh ngay từ server, độc lập hoàn toàn với JavaScript.
* **Thao tác trên màn hình:**
  1. Mở trang chủ cửa hàng. Bấm **`Ctrl + U`** (Xem nguồn trang).
  2. Bấm `Ctrl + F`, tìm chữ: `Tai Nghe` hoặc `99` ➔ Chỉ vào dòng HTML có sẵn nội dung.
  3. Quay lại tab cửa hàng. Bấm `F12` ➔ bấm tổ hợp **`Ctrl + Shift + P`** ➔ gõ `Disable JavaScript` ➔ nhấn `Enter`.
  4. Bấm **`Ctrl + R`** reload trang: Toàn bộ danh mục sản phẩm, ảnh, giá bán vẫn hiển thị 100%!
  5. Bấm thử nút "Thêm vào giỏ" ➔ Không phản hồi (vì JS đã tắt).
  6. Bật lại JS: Bấm `Ctrl + Shift + P` ➔ gõ `Enable JavaScript` ➔ `Enter` ➔ `Ctrl + R`.
* **Ý chính cần nói (Talking Points):**
  * *"Em xin kiểm chứng chữ **M (Markup)**: Khi xem source code bằng `Ctrl + U`, toàn bộ nội dung sản phẩm đã nằm sẵn trong HTML do đã được biên dịch từ Build-time, không phải trang trắng rỗng như SPA React truyền thống."*
  * *"Thậm chí khi em tắt hoàn toàn JavaScript trên trình duyệt và reload, trang web vẫn hiển thị đầy đủ thông tin. Điều này chứng minh tầng hiển thị (Markup) độc lập tuyệt đối với tầng logic (JavaScript)."*

---

### PHẦN 2: CHỨNG MINH [J - JAVASCRIPT] - ISLANDS ARCHITECTURE (00:45 - 01:30)

* **Mục đích:** Chứng minh cơ chế Islands Architecture: Catalog là Zero-JS, chỉ hydrate riêng cho Giỏ hàng, state xử lý tức thì tại client.
* **Thao tác trên màn hình:**
  1. Trong cửa sổ DevTools (`F12`), chọn tab **Network** ➔ Click vào filter **JS**.
  2. Bấm **`Ctrl + R`** để DevTools bắt đầu ghi nhận các request JavaScript.
  3. Chỉ vào danh sách: Lượng JS nạp vào rất nhỏ (chỉ nạp bundle của Giỏ hàng React và Nano Stores), hoàn toàn không có bundle nào dành cho danh mục sản phẩm.
  4. Bấm nút **"Thêm vào giỏ"** ở sản phẩm Tai nghe ➔ Drawer Giỏ hàng trượt ra.
  5. Nhập mã giảm giá: `JAMSTACK10` ➔ Bấm **"Áp dụng"** ➔ Giá giảm 10% tức thì (từ `$99` xuống `$89`).
* **Ý chính cần nói (Talking Points):**
  * *"Tiếp theo là chữ **J (JavaScript)**: Nhìn vào tab Network, lượng JS tải về nhỏ hơn rất nhiều so với một web SPA nguyên trang, vì toàn bộ catalog là Zero-JS, chỉ có khối Giỏ hàng là một Client Island được nạp JS."*
  * *"Khi em bấm Thêm vào giỏ và áp mã `JAMSTACK10`, giao diện phản hồi giảm 10% tức thì. Mọi tính toán diễn ra ngay trong bộ nhớ trình duyệt qua Nano Stores, không cần gửi request nào về máy chủ để render lại giao diện."*

---

### PHẦN 3: CHỨNG MINH [A - APIS] - SERVERLESS CHECKOUT (01:30 - 02:20)

* **Mục đích:** Chứng minh giao tiếp tách rời với Serverless API qua HTTPS, trả về `200 OK`, và nhấn mạnh tính toàn vẹn dữ liệu tại Server.
* **Thao tác trên màn hình:**
  1. Trong DevTools, chuyển filter sang **Fetch/XHR**.
  2. Trong Drawer giỏ hàng, bấm nút: **"Xác nhận Đặt hàng (POST /api/checkout)"**.
  3. Dòng request `checkout` xuất hiện với status **`200 OK` (xanh lá)**.
  4. Click vào request `checkout`:
     * Tab **Payload**: Cho thấy client gửi lên giỏ hàng và mã coupon.
     * Tab **Response**: Cho thấy JSON trả về `success: true`, mã `orderId`, và `serverVerifiedTotal: 89`.
* **Ý chính cần nói (Talking Points):**
  * *"Cuối cùng là chữ **A (APIs)**: Khi bấm Đặt hàng, trình duyệt gửi `POST /api/checkout` và nhận phản hồi `200 OK` từ một Serverless Function độc lập chạy theo yêu cầu (on-demand)."*
  * *"Ở đây em dùng mock logic để đảm bảo độ sẵn sàng cho demo, nhưng điểm quan trọng về mặt kiến trúc là: **Serverless Function tự thẩm định lại mã giảm giá và chốt lại tổng tiền**, không tin tưởng tuyệt đối vào số tiền client gửi lên (chống gian lận Client-side tampering). Frontend và backend hoàn toàn Decoupled."*

---

### PHẦN 4: MINH CHỨNG BUILD-TIME & TỔNG KẾT (02:20 - 03:00)

* **Mục đích:** Chứng minh luồng Build-time tĩnh (hoặc mở ảnh Vercel Deployments) và chốt lại giá trị kiến trúc.
* **Thao tác trên màn hình:**
  1. Đóng DevTools bằng phím `F12`.
  2. Bấm vào nút **"Xem Sơ đồ Kiến trúc (Inspect)"** trên thanh header của website (hoặc chuyển sang slide Sơ đồ kiến trúc).
  3. *(Nếu muốn chứng minh kết quả build tĩnh):* Cho xem file `dist/product/headphone-anc/index.html` trong thư mục project hoặc tab Vercel Deployments đã chụp sẵn.
* **Ý chính cần nói (Talking Points):**
  * *"Toàn bộ các trang chi tiết này đều tương ứng với các file tĩnh trong thư mục `dist/` được sinh ra tự động bởi quá trình build."*
  * *"Tóm lại, kiến trúc này giúp **bề mặt tấn công (Attack Surface) được thu hẹp tối đa** vì không có web server hay database nào đứng trực tiếp trước trang tĩnh, đồng thời tối ưu hiệu năng và giải phóng chi phí vận hành. Em xin kết thúc phần Live Demo!"*


