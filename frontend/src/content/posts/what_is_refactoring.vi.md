# Refactoring – Hiểu đúng để không dùng sai

> Refactoring không phải là viết lại code hay thêm tính năng mới. Đây là quá trình cải thiện chất lượng mã nguồn mà không làm thay đổi hành vi của chương trình.

---

## 1. Problem (Vấn đề)

Theo thời gian, mã nguồn thường trở nên khó bảo trì do:

* Hàm quá dài.
* Code bị lặp.
* Tên biến, tên hàm không rõ nghĩa.
* Class đảm nhiệm quá nhiều trách nhiệm.
* Logic lồng nhau phức tạp.

Khi cần sửa hoặc thêm tính năng, những đoạn code này dễ phát sinh lỗi và mất nhiều thời gian để hiểu.

**Ví dụ**

* Copy & Paste cùng một đoạn code ở nhiều nơi.
* Một hàm dài hàng trăm dòng xử lý nhiều công việc khác nhau.
* Một class vừa xử lý nghiệp vụ vừa truy cập database và gửi email.

---

## 2. Why it matters (Tại sao quan trọng)

Nếu không Refactor:

* Technical Debt ngày càng lớn.
* Việc thêm tính năng mới trở nên khó khăn.
* Tăng nguy cơ phát sinh bug.
* Chi phí bảo trì cao.
* Code khó đọc và khó review.

Refactoring giúp mã nguồn sạch hơn, dễ mở rộng và dễ kiểm thử hơn.

---

## 3. Concept Overview (Tổng quan)

Refactoring là quá trình **cải thiện cấu trúc bên trong của mã nguồn mà không thay đổi hành vi bên ngoài**.

Nói cách khác:

* ✅ Người dùng không thấy sự khác biệt.
* ✅ Chương trình vẫn hoạt động như cũ.
* ✅ Chỉ chất lượng code được cải thiện.

Refactoring **không phải**:

* Sửa bug.
* Thêm tính năng.
* Rewrite toàn bộ dự án.

---

## 4. How it works (Cách hoạt động)

Thông thường quá trình Refactoring diễn ra theo các bước:

1. Đảm bảo có Unit Test hoặc Integration Test.
2. Thực hiện một thay đổi nhỏ.
3. Chạy toàn bộ test.
4. Commit nếu mọi thứ vẫn hoạt động.
5. Tiếp tục với thay đổi tiếp theo.

Việc Refactor nên được thực hiện từng bước nhỏ thay vì thay đổi toàn bộ hệ thống trong một lần.

---

## 5. Code Example (C#)

### Before

```csharp
public decimal Calculate(Order order)
{
    decimal total = 0;

    foreach (var item in order.Items)
    {
        total += item.Price * item.Quantity;
    }

    return total;
}
```

### After (Extract Method)

```csharp
public decimal Calculate(Order order)
{
    return CalculateTotal(order.Items);
}

private decimal CalculateTotal(IEnumerable<OrderItem> items)
{
    return items.Sum(i => i.Price * i.Quantity);
}
```

Hành vi của chương trình không thay đổi, nhưng code dễ đọc và dễ tái sử dụng hơn.

---

## 6. Common Refactoring Techniques

Một số kỹ thuật phổ biến:

* Extract Method
* Extract Class
* Rename Variable
* Rename Method
* Inline Method
* Move Method
* Replace Magic Number with Constant
* Simplify Conditional Expression

---

## 7. Best Practices

* Refactor thường xuyên thay vì chờ đến khi code quá tệ.
* Luôn có Automated Test trước khi Refactor.
* Chỉ thay đổi một vấn đề trong mỗi lần Refactor.
* Không trộn Refactoring với việc thêm Feature.
* Ưu tiên code dễ đọc hơn code quá "thông minh".

---

## 8. Common Misconceptions

❌ Refactoring = Rewrite

→ Sai. Rewrite tạo lại hệ thống, Refactoring chỉ cải thiện cấu trúc hiện có.

❌ Refactoring sẽ làm ứng dụng chạy nhanh hơn

→ Không phải lúc nào cũng vậy. Mục tiêu chính là cải thiện khả năng bảo trì. Hiệu năng chỉ được cải thiện nếu đó là mục tiêu cụ thể.

❌ Chỉ cần Refactor khi code rất xấu

→ Nên Refactor liên tục với những thay đổi nhỏ để tránh tích lũy Technical Debt.

---

## 9. Key Takeaways

* Refactoring giúp cải thiện chất lượng code mà **không thay đổi hành vi**.
* Mục tiêu chính là tăng khả năng đọc, bảo trì và mở rộng.
* Refactor từng bước nhỏ, luôn đi kèm với Automated Test.
* Đây là một phần không thể thiếu trong quá trình phát triển phần mềm chuyên nghiệp.
