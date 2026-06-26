# Khi Nào Cần Refactor?

> Refactor không phải là viết lại — đó là làm cho code tốt hơn mà không thay đổi hành vi của nó.

---

## Refactor là gì?

Refactor (tái cấu trúc code) là quá trình cải thiện cấu trúc bên trong của code mà **không thay đổi chức năng bên ngoài**. Mục tiêu là làm cho code dễ đọc hơn, dễ bảo trì hơn và dễ mở rộng hơn.

---

## Dấu Hiệu Cần Refactor

### 1. Code Smell — "Mùi" của code tệ

Đây là những dấu hiệu cảnh báo phổ biến nhất:

- **Hàm quá dài**: Một hàm làm quá nhiều việc, khó đọc và khó test.
- **Lớp quá lớn (God Class)**: Một class biết và làm quá nhiều thứ.
- **Magic numbers/strings**: Các giá trị cứng (hardcode) rải rác khắp nơi không có giải thích.
- **Code trùng lặp (Duplication)**: Cùng một logic xuất hiện ở nhiều nơi — sửa một chỗ phải nhớ sửa tất cả.
- **Tên biến/hàm vô nghĩa**: `x`, `temp`, `doStuff()` không nói lên điều gì.
- **Nested sâu**: Nhiều tầng `if/else` lồng nhau khiến code trở thành "mê cung".

### 2. Rule of Three

> Lần đầu: viết thẳng. Lần hai: nhăn mặt. Lần ba: refactor.

Khi bạn copy-paste một đoạn code lần thứ ba, đó là lúc phải trừu tượng hóa nó thành hàm hoặc module dùng chung.

### 3. Khó Thêm Tính Năng Mới

Nếu mỗi lần thêm một tính năng nhỏ, bạn phải sửa code ở 5–10 nơi khác nhau — đó là tín hiệu rõ ràng rằng kiến trúc đang cần được cải thiện.

### 4. Khó Viết Test

Code tốt thường dễ test. Nếu bạn không thể viết unit test cho một đoạn code mà không phải mock quá nhiều thứ, rất có thể code đó đang làm quá nhiều việc hoặc phụ thuộc quá chặt vào các thành phần khác.

### 5. Sau Khi Fix Bug

Khi bạn vừa fix xong một bug, hãy nhìn lại đoạn code đó. Nếu nó khiến bạn cảm thấy "ồ, đây là nơi nguy hiểm", đây là thời điểm lý tưởng để refactor — khi bạn đang hiểu rõ code nhất.

### 6. Trước Khi Thêm Tính Năng Mới

Refactor trước, rồi mới thêm tính năng. Thêm tính năng vào code lộn xộn sẽ chỉ làm nó lộn xộn hơn.

### 7. Code Review Liên Tục Phát Sinh Nhận Xét Giống Nhau

Nếu reviewer liên tục nhắc đến cùng một vấn đề (ví dụ: "tách hàm này ra", "đặt tên lại đi"), đó là dấu hiệu cần refactor có hệ thống.

---

## Khi Nào **Không** Nên Refactor?

- **Deadline cận kề**: Refactor khi không có thời gian kiểm thử sẽ sinh ra bug mới.
- **Không có test coverage**: Refactor mà không có test như đi trong bóng tối — bạn không biết mình có làm hỏng gì không.
- **Code sắp bị xóa/thay thế**: Không nên đầu tư vào code sắp bị loại bỏ.
- **Không hiểu code đủ sâu**: Refactor vội vàng khi chưa hiểu rõ logic có thể gây hại nhiều hơn lợi.

---

## Quy Trình Refactor An Toàn

```
1. Đảm bảo có test (unit/integration) bao phủ phần cần refactor
2. Refactor từng bước nhỏ — không thay đổi quá nhiều cùng lúc
3. Chạy test sau mỗi bước
4. Commit thường xuyên với message rõ ràng
5. Review lại kết quả
```

---

## Tổng Kết

| Tình huống | Nên refactor? |
|---|---|
| Code trùng lặp nhiều lần | ✅ Có |
| Khó thêm tính năng mới | ✅ Có |
| Vừa fix bug xong | ✅ Có |
| Deadline ngày mai | ❌ Không |
| Không có test | ⚠️ Thêm test trước |
| Code sắp bị xóa | ❌ Không |

---

> **Nguyên tắc vàng**: Hãy để code luôn sạch hơn một chút so với lúc bạn bắt đầu chạm vào nó — *Boy Scout Rule*.
