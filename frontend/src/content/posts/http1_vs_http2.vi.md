# HTTP/1.1 vs HTTP/2

---

## So sánh tổng quan

| Tính năng | HTTP/1.1 | HTTP/2 |
|---|---|---|
| **Định dạng dữ liệu** | Văn bản (Text-based) | Nhị phân (Binary) |
| **Xử lý Request** | Tuần tự (Sequential/Pipelining) | Đa luồng (Multiplexing) |
| **Kết nối TCP** | Nhiều kết nối cho mỗi tên miền | Một kết nối duy nhất |
| **Nén Header** | Không (Header gửi nguyên bản) | Có (HPACK) |
| **Server Push** | Không hỗ trợ | Có hỗ trợ |
| **Vấn đề lớn nhất** | Head-of-Line Blocking | Giải quyết được HOL ở tầng HTTP |

---

## Các điểm khác biệt chi tiết

### 1. Multiplexing vs. Xử lý tuần tự

Đây là sự khác biệt quan trọng nhất giữa hai phiên bản.

**HTTP/1.1 — Tuần tự:**
- Trình duyệt gửi một request và phải đợi server phản hồi xong mới gửi request tiếp theo trên cùng một kết nối.
- Nếu một request bị tắc (ví dụ: tải ảnh lớn), các request phía sau đều phải chờ — hiện tượng này gọi là **Head-of-Line (HOL) Blocking**.
- Để khắc phục, trình duyệt thường mở nhiều kết nối TCP song song (thường là 6 kết nối/domain), gây tốn tài nguyên.

**HTTP/2 — Multiplexing:**
- Cho phép gửi và nhận hàng loạt request/response cùng lúc trên **một kết nối TCP duy nhất**.
- Các gói tin được chia nhỏ thành các frame và truyền song song mà không cần chờ đợi lẫn nhau.

---

### 2. Giao thức Nhị phân (Binary) vs. Văn bản (Text)

**HTTP/1.1 — Text-based:**
- Các lệnh (`GET`, `POST`, ...) và header được gửi dưới dạng plain text.
- Dễ đọc khi debug, nhưng máy tính tốn công phân tích cú pháp (parse) và dễ gặp lỗi định dạng.

**HTTP/2 — Binary:**
- Toàn bộ dữ liệu được đóng gói thành các **binary frame** nhỏ.
- Máy tính xử lý nhanh hơn, ít lỗi hơn và hiệu quả hơn trên đường truyền mạng.

---

### 3. Nén Header (HPACK)

**HTTP/1.1:**
- Mỗi request phải gửi kèm một bộ header đầy đủ (`User-Agent`, `Cookies`, `Referer`, ...).
- Các thông tin này thường lặp đi lặp lại và chiếm nhiều băng thông — đôi khi dung lượng header còn lớn hơn cả payload thực tế.

**HTTP/2 — HPACK:**
- Sử dụng thuật toán nén chuyên dụng **HPACK**.
- Loại bỏ thông tin dư thừa, chỉ gửi **phần thay đổi (delta)** của header so với request trước đó.
- Giúp tiết kiệm băng thông đáng kể.

---

### 4. Server Push

**HTTP/1.1 — Thụ động:**
- Server chỉ trả về những gì client yêu cầu.
- Ví dụ: Client tải `index.html` → phân tích xong mới thấy cần `style.css` → gửi thêm request để lấy `style.css`.

**HTTP/2 — Chủ động:**
- Khi client yêu cầu `index.html`, server **đoán trước** client sẽ cần `style.css` và "push" file này xuống ngay lập tức.
- Khi client cần dùng đến, file đã có sẵn trong cache — giảm độ trễ đáng kể.

---

## Tóm tắt

HTTP/2 giải quyết hầu hết các điểm yếu của HTTP/1.1 thông qua multiplexing, binary protocol, nén header HPACK và server push. Kết quả là trang web tải nhanh hơn, sử dụng ít tài nguyên mạng hơn và cải thiện trải nghiệm người dùng rõ rệt — đặc biệt trên các kết nối có độ trễ cao.
