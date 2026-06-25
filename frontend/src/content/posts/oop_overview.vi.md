# OOP là gì và tại sao nó quan trọng?

> Object-Oriented Programming (OOP) là một phương pháp lập trình giúp bạn tổ chức code theo **đối tượng (object)** thay vì chỉ là các hàm rời rạc.

---

## 1. OOP là gì?

OOP (Lập trình hướng đối tượng) là cách thiết kế phần mềm xoay quanh **đối tượng**.

Một **object (đối tượng)** bao gồm:
- **Thuộc tính (properties)**: dữ liệu
- **Phương thức (methods)**: hành vi

**Ví dụ đơn giản:**

```csharp
public class Car
{
    public string Brand { get; set; }

    public void Run()
    {
        Console.WriteLine("Car is running");
    }
}
```

Ở đây:
- `Brand` là dữ liệu
- `Run()` là hành vi

---

## 2. 4 tính chất cốt lõi của OOP

### 2.1. Encapsulation (Đóng gói)

Ẩn chi tiết bên trong, chỉ expose những gì cần thiết.

```csharp
public class BankAccount
{
    private decimal balance;

    public void Deposit(decimal amount)
    {
        balance += amount;
    }
}
```

👉 Giúp bảo vệ dữ liệu và tránh bị thay đổi sai cách.

---

### 2.2. Abstraction (Trừu tượng)

Chỉ quan tâm "làm gì" chứ không cần biết "làm như thế nào".

```csharp
public interface IPayment
{
    void Pay();
}
```

👉 Giúp code dễ hiểu và giảm độ phức tạp.

---

### 2.3. Inheritance (Kế thừa)

Class con kế thừa từ class cha.

```csharp
public class Animal
{
    public void Eat() {}
}

public class Dog : Animal
{
    public void Bark() {}
}
```

👉 Tái sử dụng code, giảm lặp.

---

### 2.4. Polymorphism (Đa hình)

Một interface – nhiều cách triển khai.

```csharp
public class MomoPayment : IPayment
{
    public void Pay() => Console.WriteLine("Pay with Momo");
}

public class VnPayPayment : IPayment
{
    public void Pay() => Console.WriteLine("Pay with VNPAY");
}
```

👉 Giúp mở rộng hệ thống mà không sửa code cũ.

---

## 3. OOP quan trọng như thế nào?

### 3.1. Giúp code dễ bảo trì

- Code được chia nhỏ thành các object
- Khi sửa chỉ ảnh hưởng phạm vi nhỏ

---

### 3.2. Dễ mở rộng (scalable)

Ví dụ: thêm phương thức thanh toán mới
👉 chỉ cần tạo class mới, không sửa code cũ

---

### 3.3. Tái sử dụng code (reusability)

- Kế thừa
- Interface
- Composition

---

### 3.4. Phù hợp với hệ thống lớn

Các hệ thống như:
- Banking
- E-commerce
- Microservices

👉 đều sử dụng OOP để quản lý complexity

---

### 3.5. Mapping gần với thế giới thực

- User
- Order
- Product

👉 mỗi thứ là một object → dễ tư duy

---

## 4. Khi nào nên dùng OOP?

Nên dùng khi:
- Hệ thống lớn, nhiều logic
- Cần mở rộng lâu dài
- Có nhiều domain object

Không nên lạm dụng khi:
- Script nhỏ
- Tool đơn giản
- Performance cực cao (low-level)

---

## 5. OOP trong thực tế .NET

Trong .NET, OOP xuất hiện ở khắp nơi:

- ASP.NET Controller
- Service layer
- Repository pattern
- Dependency Injection

👉 Nếu không hiểu OOP, rất khó làm backend chuyên nghiệp.

---

## 6. Kết luận

OOP không chỉ là lý thuyết.

Nó là nền tảng giúp bạn:
- Viết code sạch hơn
- Dễ mở rộng
- Làm việc trong team lớn

> Hiểu OOP = bước đầu để trở thành Software Engineer thực thụ.
