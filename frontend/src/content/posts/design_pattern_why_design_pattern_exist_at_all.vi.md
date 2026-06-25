# Design Pattern (Tại sao Design Pattern tồn tại?)

---

Về bản chất, design pattern tồn tại vì các developer ***chán ngấy*** việc phải tự phát minh lại bánh xe — và còn chán hơn khi phải sửa đi sửa lại cùng một lỗi kiến trúc.

Chúng không phải là những khái niệm lý thuyết được tạo ra bởi các học giả trong phòng thí nghiệm. Chúng là **các giải pháp được phát hiện** cho **các vấn đề lặp đi lặp lại**. Khi xây dựng các hệ thống phức tạp, các developer **độc lập *liên tục vấp phải*** những rào cản giống nhau: code trở nên quá tightly coupled, class phình to quá mức, hoặc một thay đổi nhỏ làm hỏng mười tính năng không liên quan.

Design pattern nổi lên như một danh mục blueprint tốc ký — đã được hàng nghìn developer trước bạn kiểm thử, phá vỡ, và tinh chỉnh.

Đây là lý do thực sự khiến chúng ta sử dụng chúng:

---

### 1. Cung cấp một Shared Vocabulary (Ngôn ngữ chung)

Hãy tưởng tượng bạn đang cố giải thích kiến trúc của một hệ thống phức tạp cho đồng đội bằng cách mô tả từng class interaction một: *"Vậy là, chúng ta có một manager class, rồi ta cần một cách để năm class kia lắng nghe các thay đổi từ manager đó mà không bị liên kết trực tiếp, vậy ta sẽ truyền vào một interface..."*

Thay vào đó, bạn chỉ cần nói: **"Dùng Observer pattern ở đây đi."**

**Ngay lập tức**, cả team hiểu được cấu trúc, hành vi, và ý định. Nó biến một cuộc thảo luận trừu tượng mười phút thành một quyết định thiết kế năm giây.

---

### 2. Ngăn chặn "Accidental" Architectural Debt

Khi bạn tự giải quyết một design problem từ đầu, bạn thường tối ưu cho yêu cầu trước mắt. Design pattern nhìn xa hơn. Chúng được cấu trúc đặc biệt để xử lý các thay đổi trong tương lai mà không buộc bạn phải viết lại toàn bộ codebase.

Ví dụ, các pattern thường tận dụng mạnh mẽ interface và abstract class để đảm bảo business logic cấp cao của bạn không phụ thuộc vào các chi tiết cấp thấp dễ thay đổi (như một database cụ thể hay một third-party API).

---

### 3. Giải quyết các Hidden Edge Case

Một cách implement ngây thơ thường bỏ sót những cái bẫy tinh vi. Nếu bạn tự tay viết một global access point cho một class, bạn có thể quên mất race condition trong môi trường multithreaded. Sử dụng một creational pattern đã được kiểm chứng đảm bảo rằng những thứ như thread safety, memory allocation, và state isolation đã được tính đến từ trước.

> **Nguyên tắc vàng của Pattern:** Chúng là blueprint, không phải mảnh ghép hình. Bạn không ép code của mình phải khớp với một pattern; bạn điều chỉnh pattern để giải quyết vấn đề cụ thể trong code của bạn.

---

### Cái bẫy: Pattern-itis

Sai lầm lớn nhất mà developer mắc phải khi khám phá design pattern là cố gắng dùng *tất cả* chúng ở khắp mọi nơi. Điều này dẫn đến code over-engineered, khó đọc — nơi một câu lệnh `if/else` đơn giản bị thay thế bằng ba factory, một strategy runner, và một abstract wrapper.

Nếu một pattern không thực sự giúp code của bạn dễ maintain hay dễ extend hơn, thì code đơn giản, thẳng thắn luôn là lựa chọn tốt hơn.