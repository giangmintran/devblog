# OOP (Object-Oriented-Programming)

> Một câu mô tả ngắn: Bài này giúp bạn hiểu rõ OOP và khi nào nên dùng trong thực tế.

---

## 1. Problem (Vấn đề)

Developer thường gặp vấn đề với OOP:

- Lạm dụng OOP → code phức tạp không cần thiết  
- Hiểu sai abstraction → class “God object” (class làm quá nhiều thứ)  
- Không nắm rõ encapsulation → lộ logic nội bộ  
- Dùng inheritance bừa bãi → khó maintain  

**Ví dụ:**

- Tạo 1 class `UserService` chứa cả logic DB, validate, gửi email  
- Dùng inheritance sâu (Base → Mid → Child → …) khiến debug cực khó  
- Không dùng interface → code bị tightly coupled  

---

## 2. Why it matters (Tại sao quan trọng)

Nếu không hiểu đúng OOP:

- Code khó maintain, khó mở rộng  
- Vi phạm SOLID → sửa 1 chỗ vỡ nhiều chỗ  
- Khó test (unit test gần như không viết được)  
- Performance có thể bị ảnh hưởng do abstraction sai cách  

---

## 3. Concept Overview (Tổng quan)

OOP là cách tổ chức code xoay quanh **object (đối tượng)** thay vì function thuần.

Một object gồm:
- **Data (thuộc tính)**
- **Behavior (hành vi)**

### 4 trụ cột chính của OOP:

1. **Encapsulation (Đóng gói)**  
   → Ẩn chi tiết bên trong, chỉ expose cái cần thiết  

2. **Abstraction (Trừu tượng)**  
   → Chỉ quan tâm “làm gì”, không cần biết “làm như nào”  

3. **Inheritance (Kế thừa)**  
   → Tái sử dụng code từ class cha  

4. **Polymorphism (Đa hình)**  
   → Cùng 1 interface, nhiều cách implement khác nhau  

👉 Ví dụ đời thường:  
- Bạn dùng xe máy → chỉ cần biết “vặn ga để chạy”  
- Không cần biết động cơ bên trong hoạt động thế nào  
→ Đó là abstraction

---

## 4. How it works (Cách hoạt động)

### Flow cơ bản

1. Define class (blueprint)  
2. Tạo object từ class  
3. Gọi method để thực hiện hành vi  

---

### Ví dụ internal thinking

Giả sử có hệ thống thanh toán:

- Interface: `IPayment`
- Implement:
  - `MomoPayment`
  - `VnPayPayment`
  - `CreditCardPayment`

Flow:

1. Client gọi `IPayment.Pay()`  
2. Runtime quyết định gọi implementation cụ thể  
3. Không cần sửa code client khi thêm payment mới  

---

### Time & Space Complexity

OOP không trực tiếp ảnh hưởng Big-O, nhưng:

- **Inheritance sâu** → tăng complexity khi đọc code  
- **Object nhiều** → tốn memory hơn so với struct/primitive  
- **Abstraction sai** → thêm overhead không cần thiết  

---

## 5. Code Example (C#)

### Basic usage

```csharp
// Abstraction
public interface IPayment
{
    void Pay(decimal amount);
}

// Implementation 1
public class MomoPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Pay {amount} via Momo");
    }
}

// Implementation 2
public class VnPayPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Pay {amount} via VnPay");
    }
}

// Usage
public class PaymentService
{
    private readonly IPayment _payment;

    public PaymentService(IPayment payment)
    {
        _payment = payment;
    }

    public void Process(decimal amount)
    {
        _payment.Pay(amount);
    }
}

// Program
class Program
{
    static void Main()
    {
        IPayment payment = new MomoPayment();
        var service = new PaymentService(payment);

        service.Process(100000);
    }
}