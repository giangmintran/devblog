# Nợ Kỹ Thuật (Technical Debt)

> *Tham khảo: [Refactoring Guru — Technical Debt](https://refactoring.guru/refactoring/technical-debt)*

## Tổng Quan

Mọi lập trình viên đều cố gắng viết code sạch ngay từ đầu — không ai cố tình viết code cẩu thả để gây hại cho dự án. Tuy nhiên, code sạch vẫn có thể xuống cấp theo thời gian. Đây chính là lúc khái niệm **nợ kỹ thuật** xuất hiện.

Thuật ngữ này được đặt ra bởi **Ward Cunningham**. Nó hoạt động giống như một khoản vay ngân hàng: vay tiền giúp bạn hành động nhanh hơn lúc này, nhưng sau đó bạn phải trả nhiều hơn — cả gốc lẫn lãi. Nếu lãi tích lũy nhanh hơn khả năng trả nợ, đến một lúc nào đó bạn sẽ không thể trả hết được nữa.

Điều tương tự xảy ra với code. Bỏ qua việc viết test để ship tính năng nhanh hơn có vẻ là lợi trước mắt, nhưng sự chậm trễ tích lũy dần mỗi ngày — cho đến khi bạn phải "trả nợ" bằng cách refactor và bổ sung test một cách bài bản.

---

## Nguyên Nhân Gây Ra Nợ Kỹ Thuật

### 1. Áp Lực Từ Phía Kinh Doanh
Áp lực deadline hoặc cạnh tranh thị trường có thể buộc đội ngũ phải ship tính năng trước khi hoàn thiện. Hệ quả là những đoạn vá víu, giải pháp tạm thời được nhồi vào code để che đi những phần chưa hoàn chỉnh.

### 2. Thiếu Hiểu Biết Về Hậu Quả
Quản lý có thể không nhận ra rằng nợ kỹ thuật tích lũy "lãi suất" — tức là nó khiến tốc độ phát triển ngày càng chậm lại. Nếu không hiểu điều này, sẽ rất khó để dành thời gian refactor, vì cấp trên không thấy giá trị của việc đó.

### 3. Kết Hợp Các Thành Phần Quá Chặt Chẽ
Khi dự án phát triển thành một khối nguyên (monolith) thay vì các module tách biệt, việc thay đổi một phần sẽ ảnh hưởng đến mọi phần khác. Điều này khiến làm việc nhóm trở nên khó khăn và làm tăng nguy cơ gây lỗi hệ thống.

### 4. Thiếu Kiểm Thử (Tests)
Không có test nghĩa là không có lưới an toàn — các lập trình viên buộc phải dùng giải pháp nhanh và rủi ro. Trong trường hợp xấu nhất, các thay đổi chưa qua kiểm thử được đẩy thẳng lên môi trường production với hậu quả nghiêm trọng (mất dữ liệu, gửi email sai, sập hệ thống).

### 5. Thiếu Tài Liệu (Documentation)
Tài liệu kém khiến việc onboard người mới trở nên chậm chạp, và có thể làm tê liệt cả dự án nếu những thành viên chủ chốt rời đi.

### 6. Thiếu Giao Tiếp Giữa Các Thành Viên
Khi kiến thức không được chia sẻ trong nhóm, mọi người làm việc dựa trên những hiểu biết lỗi thời. Vấn đề này càng trầm trọng hơn khi các junior developer bị hướng dẫn sai hoặc làm việc trong sự cô lập.

### 7. Phát Triển Song Song Trên Nhiều Nhánh Quá Lâu
Làm việc trên các nhánh tính năng tồn tại lâu dài sẽ tích lũy nợ kỹ thuật — và nợ này nhân lên khi các nhánh được merge. Thời gian cô lập càng dài, gánh nặng tích hợp càng lớn.

### 8. Trì Hoãn Việc Refactor
Yêu cầu dự án liên tục thay đổi, và những đoạn code từng hợp lý có thể trở nên lỗi thời hoặc cồng kềnh. Càng trì hoãn refactor, càng có nhiều code mới được xây dựng dựa trên nền tảng cũ kỹ — khiến việc dọn dẹp sau này tốn kém hơn rất nhiều.

### 9. Thiếu Giám Sát Quy Chuẩn Code
Khi không có tiêu chuẩn coding được thực thi, mỗi người viết code theo phong cách riêng. Sự không nhất quán tích lũy theo thời gian thành một codebase manh mún, khó bảo trì.

### 10. Năng Lực Hạn Chế
Đôi khi nguyên nhân đơn giản là lập trình viên chưa có đủ kiến thức để viết code có thể bảo trì lâu dài. Điều này không phải lúc nào cũng tránh được, nhưng có thể cải thiện thông qua mentoring, code review và học tập liên tục.

---

## Điểm Mấu Chốt

- Nợ kỹ thuật **không phải lúc nào cũng cố ý** — nó thường tích lũy dần từ những quyết định hợp lý trong ngắn hạn.
- Giống như nợ tài chính, nó **sinh lãi**: để càng lâu, chi phí xử lý càng cao.
- Cách quản lý nợ kỹ thuật tốt nhất là **refactor chủ động**, tài liệu rõ ràng, kiểm thử đầy đủ, và xây dựng văn hóa coi trọng chất lượng code trong cả đội.
- **Sự đồng thuận từ quản lý** là yếu tố then chốt — nếu không hiểu chi phí của nợ kỹ thuật, đội ngũ sẽ không có thời gian để "trả nợ" một cách bài bản.
