# BỘ TÀI LIỆU THUYẾT TRÌNH 10 PHÚT: KIẾN TRÚC JAMSTACK
**Môn học:** Kiến Trúc Phần Mềm (Software Architecture)  
**Thời lượng:** 10 Phút (7 phút Thuyết trình + 3 phút Live Demo)  
**Hệ thống Demo:** Mini-Storefront Tĩnh (Static E-Commerce Storefront)

---

## MỤC LỤC BÀI THUYẾT TRÌNH
1. [Phân bổ Thời Gian Chuẩn Xác](#phan-bo-thoi-gian)
2. [Chi Tiết Từng Slide & Lời Thoại Thuyết Trình (Speaker Script)](#chi-tiet-slide)
   - [Slide 1: Đặt Vấn Đề & Khủng Hoảng Của Web Truyền Thống](#slide-1)
   - [Slide 2: Bản Chất Kiến Trúc JAMstack (J - A - M)](#slide-2)
   - [Slide 3: Thiết Kế Kiến Trúc Hệ Thống Demo](#slide-3)
   - [Slide 4: Kịch Bản Live Demo 180 Giây](#slide-4)
   - [Slide 5: Đánh Giá Thuộc Tính Chất Lượng (Quality Attributes)](#slide-5)
   - [Slide 6: Khi Nào Sử Dụng & Sự Tiến Hóa Của JAMstack](#slide-6)
   - [Slide 7: Kết Luận & Q&A](#slide-7)
3. [Bộ Câu Hỏi Phản Biện Của Giảng Viên & Gợi Ý Trả Lời](#phan-bien)

---

<a name="phan-bo-thoi-gian"></a>
## 1. PHÂN BỔ THỜI GIAN CHUẨN XÁC (10 PHÚT = 600 GIÂY)

```
[00:00 - 01:00] (60s)  : Mở đầu & Đặt vấn đề kiến trúc (Slide 1)
[01:00 - 02:15] (75s)  : Định nghĩa & 3 Nguyên tắc cốt lõi của JAMstack (Slide 2)
[02:15 - 03:45] (90s)  : Thiết kế Kiến trúc hệ thống Mini-Store (Slide 3)
[03:45 - 06:45] (180s) : LIVE DEMO THỰC NGHIỆM TRÊN TRÌNH DUYỆT (Slide 4)
[06:45 - 08:15] (90s)  : Phân tích Quality Attributes & Trade-offs (Slide 5)
[08:15 - 09:15] (60s)  : Bối cảnh áp dụng & Hiện đại hóa kiến trúc (Slide 6)
[09:15 - 10:00] (45s)  : Tổng kết & Mời đặt câu hỏi (Slide 7)
```

---

<a name="chi-tiet-slide"></a>
## 2. CHI TIẾT TỪNG SLIDE & LỜI THOẠI THUYẾT TRÌNH (SPEAKER SCRIPT)

---

<a name="slide-1"></a>
### SLIDE 1: ĐẶT VẤN ĐỀ & KHỦNG HOẢNG CỦA WEB TRUYỀN THỐNG (0:00 - 1:00)

#### Nội dung hiển thị trên Slide:
* **Tiêu đề:** *Từ Kiến trúc Nguyên khối (Monolith/SSR) đến Sự ra đời của JAMstack*
* **Hình ảnh/Icon:** Mô hình client gửi request -> Server CPU xử lý -> Database Query -> Dựng HTML -> Trả về.
* **3 Nút thắt lớn (Bottlenecks):**
  1. *Lãng phí tài nguyên CPU:* 90% nội dung trang tĩnh (tin tức, danh mục sản phẩm) nhưng máy chủ phải render lại hàng triệu lần cho mỗi request.
  2. *Độ trễ cao (High TTFB):* Trình duyệt phải chờ máy chủ kết nối Database xong mới nhận được byte HTML đầu tiên.
  3. *Bề mặt tấn công lớn (Security Attack Surface):* Database và Web Server lộ diện trực tiếp trên Internet, dễ bị SQL Injection, DDoS.
* **Câu hỏi dẫn dắt (Key Question):** *"Nếu trang web đã biết trước nội dung, tại sao phải bắt máy chủ tính toán lại mỗi lần có người truy cập?"*

#### Lời thoại thuyết trình (Speaker Script):
> *"Kính chào thầy và các bạn. Trong môn Kiến trúc Phần mềm, chúng ta luôn tìm kiếm cách tối ưu hóa hiệu năng, độ tin cậy và khả năng mở rộng của hệ thống. 
> Trong mô hình web truyền thống như LAMP stack hay Server-Side Rendering nguyên khối, mỗi khi người dùng truy cập, máy chủ phải khởi động một tiến trình: phân tích request, kết nối cơ sở dữ liệu, dựng cây DOM HTML và gửi về client. 
> Thực tế cho thấy, với hơn 90% nội dung như danh mục sản phẩm hay tin tức, nội dung không hề thay đổi từng giây, nhưng server vẫn phải tốn hàng ngàn chu kỳ CPU để làm lại cùng một việc. Điều này dẫn tới TTFB cao, chi phí hạ tầng tốn kém và nguy cơ sập web khi lượng truy cập tăng vọt. 
> Câu hỏi kiến trúc được đặt ra là: **Nếu nội dung đã có sẵn, tại sao chúng ta không biên dịch trước thành các file tĩnh và đặt tại các trạm CDN sát người dùng nhất?** Đó chính là khởi nguồn của kiến trúc **JAMstack**."*

---

<a name="slide-2"></a>
### SLIDE 2: BẢN CHẤT KIẾN TRÚC JAMSTACK (1:00 - 2:15)

#### Nội dung hiển thị trên Slide:
* **Tiêu đề:** *JAMstack là gì? Ba trụ cột cốt lõi*
* **Ba thành phần J - A - M:**
  * **J (JavaScript):** Xử lý trải nghiệm tương tác động phía trình duyệt của người dùng (Client-side interactivity).
  * **A (APIs):** Các dịch vụ nghiệp vụ (serverless, thanh toán, database) được trừu tượng hóa và gọi độc lập qua giao thức HTTPS.
  * **M (Markup):** Giao diện HTML được **Pre-rendered tại Build-time** thay vì Request-time.
* **Ba nguyên tắc vàng trong thiết kế (Golden Architectural Rules):**
  1. **Pre-render (Biên dịch trước):** Dựng sẵn toàn bộ HTML ngay khi có thay đổi mã nguồn hoặc nội dung.
  2. **Decouple (Phân tách hoàn toàn):** Tách bạch triệt để Frontend (Giao diện) và Backend (Nghiệp vụ).
  3. **Edge CDN-First (Phân phối biên):** Toàn bộ file tĩnh được lưu trên mạng lưới phân phối nội dung toàn cầu (CDN).

#### Lời thoại thuyết trình (Speaker Script):
> *"JAMstack là viết tắt của **JavaScript**, **APIs**, và **Markup**. Nhưng sâu xa hơn, đây là một triết lý kiến trúc xoay quanh 3 nguyên tắc cốt lõi:
> Thứ nhất là **Pre-render**: Thay vì đợi người dùng click mới bắt đầu render, toàn bộ trang web được biên dịch thành HTML tĩnh ngay từ **Build-time** thông qua các công cụ Static Site Generator (SSG).
> Thứ hai là **Decouple**: Tách biệt hoàn toàn giữa tầng hiển thị và tầng dịch vụ. Frontend không còn dính chặt vào database của backend. Bất kỳ tác vụ động nào—như xử lý đơn hàng hay gửi email—đều được ủy nhiệm cho các **APIs** hoặc **Serverless Functions** chuyên biệt.
> Và thứ ba là **Edge CDN-First**: Các file HTML/CSS/JS sau khi build được đẩy ra các PoP (Point of Presence) của CDN trên toàn cầu. Nhờ đó, người dùng tại Việt Nam sẽ nhận HTML từ máy chủ Edge tại TP.HCM hoặc Singapore chỉ trong 20-30 mili-giây, không cần chờ một máy chủ gốc nào cả."*

---

<a name="slide-3"></a>
### SLIDE 3: THIẾT KẾ KIẾN TRÚC HỆ THỐNG DEMO (2:15 - 3:45)

#### Nội dung hiển thị trên Slide:
* **Tiêu đề:** *Kiến Trúc Hệ Thống: Mini E-Commerce Storefront*
* **Sơ đồ 3 Ranh giới thời gian (Temporal Boundaries):**
  1. **Build-Time (CI/CD Pipeline):** Git Repository (Code + Markdown Collections) ➔ Astro SSG Compiler ➔ Static Artifacts (HTML, CSS, JS).
  2. **Deploy-Time (Atomic Edge Invalidation):** Vercel/Netlify Edge Network phân phối toàn cầu với cơ chế Deploy nguyên tử.
  3. **Run-Time (Client Execution & API Call):** Browser nhận HTML tĩnh (Zero JS) ➔ Component Cart được hydrate theo mô hình **Islands Architecture** ➔ Khi thanh toán, gọi độc lập sang Serverless Function (`/api/checkout`).
* **Bảng công nghệ sử dụng:**
  * *SSG Engine:* Astro (Zero-JS by default, Islands Architecture).
  * *Data Layer:* Git Content Collections (Markdown + YAML Frontmatter).
  * *Client Island:* Nano Stores + React (Cart Component).
  * *Backend API:* Serverless Function Edge Endpoint.

#### Lời thoại thuyết trình (Speaker Script):
> *"Để chứng minh tính khả thi của kiến trúc, nhóm chúng em đã xây dựng một hệ thống **Mini E-Commerce Storefront**.
> Trong hệ thống này, các bạn sẽ thấy sự phân định rạch ròi giữa 3 mốc thời gian kiến trúc:
> Ở **Build-time**, chúng em áp dụng mô hình **GitOps**: toàn bộ dữ liệu sản phẩm được lưu trữ dưới dạng các file Markdown có cấu trúc ngay trong Git. Trình biên dịch **Astro** sẽ đọc các file này và xuất ra các file HTML tĩnh độc lập.
> Đặc biệt, chúng em áp dụng mẫu kiến trúc **Islands Architecture** của Astro: Toàn bộ danh mục sản phẩm là 100% Zero-JavaScript HTML. Chỉ riêng khối Giỏ hàng là một 'hòn đảo tương tác' (Client Island) được nạp một lượng JS cực nhỏ.
> Ở **Run-time**, khi người dùng ấn Đặt hàng, một **Serverless Function** độc lập sẽ được đánh thức để kiểm tra tồn kho và sinh mã đơn hàng, hoàn toàn không phụ thuộc vào bất kỳ máy chủ truyền thống nào."*

---

<a name="slide-4"></a>
### SLIDE 4: KỊCH BẢN LIVE DEMO 180 GIÂY (3:45 - 6:45)
*(Xem chi tiết trong mục 3: Kịch bản demo)*

---

<a name="slide-5"></a>
### SLIDE 5: ĐÁNH GIÁ THUỘC TÍNH CHẤT LƯỢNG (QUALITY ATTRIBUTES) (6:45 - 8:15)

#### Nội dung hiển thị trên Slide:
* **Thuộc tính tích cực (+):**
  * **Performance (Hiệu năng):** TTFB cực thấp (15ms - 40ms). Điểm Lighthouse 100/100 tuyệt đối do không bị nghẽn CPU server và không tải JavaScript thừa.
  * **Security (An ninh):** Bề mặt tấn công (Attack Surface) giảm 95%. Không có Web Server chạy daemon 24/7 để bị khai thác lỗ hổng OS hay Database Connection String bị lộ.
  * **Scalability & Cost (Khả năng co giãn & Chi phí):** Phục vụ 10 khách hay 1 triệu khách thì CDN đều xử lý dễ dàng với chi phí gần như $0.
  * **Reliability (Độ tin cậy):** Nếu API backend gặp sự cố, khách hàng vẫn xem được toàn bộ danh mục sản phẩm (Graceful Degradation).
* **Đánh đổi kiến trúc (Architectural Trade-offs / Limitations):**
  * **Build Time Bottleneck:** Nếu hệ thống có 100.000 sản phẩm, việc build lại toàn bộ site sẽ mất nhiều thời gian.
  * **Nội dung thời gian thực:** Không phù hợp cho sàn chứng khoán hoặc hệ thống cần cập nhật từng giây.

#### Lời thoại thuyết trình (Speaker Script):
> *"Dưới góc độ Kiến trúc Phần mềm, không có kiến trúc nào là hoàn hảo mà luôn là sự cân bằng giữa các thuộc tính chất lượng (Trade-offs).
> **Về mặt ưu điểm:** JAMstack mang lại hiệu năng đỉnh cao vì file tĩnh được phục vụ từ bộ nhớ đệm CDN. Về mặt bảo mật, kẻ tấn công không thể thực hiện SQL Injection vào trang web tĩnh vì không có database engine nào kết nối trực tiếp. Về chi phí, chúng ta giải phóng hoàn toàn chi phí bảo trì server 24/7.
> **Tuy nhiên, sự đánh đổi là gì?** Nhược điểm lớn nhất là thời gian build sẽ tăng tuyến tính theo số lượng trang. Nếu một trang thương mại điện tử có 100.000 sản phẩm, chúng ta không thể build lại toàn bộ chỉ vì sửa một chữ. 
> Ngoài ra, với dữ liệu biến đổi liên tục từng giây như giá cổ phiếu hay đặt vé xem phim theo thời gian thực, JAMstack thuần túy sẽ gặp khó khăn nếu không kết hợp thêm các giải pháp bổ trợ."*

---

<a name="slide-6"></a>
### SLIDE 6: KHI NÀO SỬ DỤNG & SỰ TIẾN HÓA CỦA JAMSTACK (8:15 - 9:15)

#### Nội dung hiển thị trên Slide:
* **Khi nào NÊN sử dụng JAMstack?**
  * Trang thương mại điện tử tầm trung, danh mục sản phẩm.
  * Trang tin tức, blog, cổng thông tin tài liệu kỹ thuật, landing page tiếp thị.
  * Các ứng dụng web hướng tới tốc độ tải trang cao nhất (Core Web Vitals) và tối ưu SEO.
* **Khi nào KHÔNG NÊN sử dụng?**
  * Ứng dụng quản trị (Admin Dashboard) với nội dung cá nhân hóa 100% cho từng người dùng.
  * Ứng dụng Real-time cao độ: Bảng giá chứng khoán, công cụ chat nhiều người.
* **Sự tiến hóa (Jamstack Hiện đại / Hybrid):**
  * **ISR (Incremental Static Regeneration):** Chỉ build lại trang có thay đổi trên nền background mà không cần rebuild toàn bộ site.
  * **Edge Middleware / Edge SSR:** Xử lý A/B testing và định vị địa lý ngay tại trạm Edge của CDN.

#### Lời thoại thuyết trình (Speaker Script):
> *"Vậy khi nào kiến trúc sư nên chọn JAMstack? JAMstack là sự lựa chọn số 1 cho các website nội dung, trang bán hàng, cổng tài liệu và landing page – nơi mà tốc độ hiển thị và điểm SEO quyết định trực tiếp đến doanh thu. Ngược lại, nếu bạn đang xây dựng một ứng dụng realtime như sàn chứng khoán hay game online, hãy cân nhắc WebSockets và microservices truyền thống.
> Đáng chú ý, JAMstack ngày nay đã tiến hóa thành mô hình **Hybrid**. Với kỹ thuật **Incremental Static Regeneration (ISR)** và **Edge Functions**, chúng ta có thể làm mới từng trang theo nhu cầu (On-demand) mà không cần rebuild cả hệ thống. JAMstack hiện đại đã xóa nhòa ranh giới giữa tĩnh và động."*

---

<a name="slide-7"></a>
### SLIDE 7: KẾT LUẬN & Q&A (9:15 - 10:00)

#### Nội dung hiển thị trên Slide:
* **Thông điệp kết luận (Takeaways):**
  1. *Pre-rendered by default, Dynamic when needed.*
  2. *Decoupled components tăng tính Modularity và bảo mật.*
  3. *CDN-first mang lại trải nghiệm người dùng tối đa với chi phí tối thiểu.*
* **Thông tin dự án demo:** GitHub Repository Link & Live Demo Website URL.
* **Lời cảm ơn & Mời đặt câu hỏi:** *"Cảm ơn Thầy và các bạn đã lắng nghe. Nhóm sẵn sàng nhận câu hỏi phản biện!"*

#### Lời thoại thuyết trình (Speaker Script):
> *"Tóm lại, JAMstack không chỉ là một trào lưu công nghệ, mà là một bước chuyển dịch kiến trúc quan trọng: chuyển trọng tâm từ máy chủ tập trung (Centralized Server) sang biên mạng phân tán (Distributed Edge). Nó giúp các kỹ sư xây dựng những hệ thống siêu nhanh, bảo mật và tiết kiệm chi phí. 
> Em xin kết thúc bài báo cáo tại đây và rất mong nhận được những câu hỏi đóng góp từ Thầy và các bạn. Em xin cảm ơn!"*


