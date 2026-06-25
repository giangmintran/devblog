# OOP (Object-Oriented Programming)

> A concise guide to understanding OOP and knowing when to use it in real-world applications.

---

## 1. Problem

Developers often encounter the following issues when working with OOP:

- Overusing OOP → unnecessary complexity
- Misunderstanding abstraction → creating "God objects" (classes that do too much)
- Poor encapsulation → exposing internal implementation details
- Excessive inheritance → difficult maintenance

**Examples:**

- Creating a single `UserService` class that handles database access, validation, and email sending
- Using deep inheritance hierarchies (Base → Mid → Child → ...) that make debugging extremely difficult
- Not using interfaces, resulting in tightly coupled code

---

## 2. Why it matters

If OOP is not understood correctly:

- Code becomes difficult to maintain and extend
- SOLID principles are violated, causing changes in one place to break many others
- Testing becomes difficult (unit tests may be nearly impossible to write)
- Performance can suffer due to poorly designed abstractions

---

## 3. Concept Overview

OOP is a way of organizing code around **objects** rather than standalone functions.

An object consists of:
- **Data (properties/state)**
- **Behavior (methods/actions)**

### The Four Main Pillars of OOP

1. **Encapsulation**
   → Hide internal implementation details and expose only what is necessary

2. **Abstraction**
   → Focus on "what" something does rather than "how" it does it

3. **Inheritance**
   → Reuse code from a parent class

4. **Polymorphism**
   → Use a common interface with multiple implementations

👉 Real-world example:

- You ride a motorcycle and only need to know how to use the throttle
- You do not need to understand how the engine works internally

→ This is abstraction.

---

## 4. How it Works

### Basic Flow

1. Define a class (the blueprint)
2. Create objects from the class
3. Call methods to perform behaviors

---

### Example Scenario

Imagine a payment system:

- Interface: `IPayment`
- Implementations:
  - `MomoPayment`
  - `VnPayPayment`
  - `CreditCardPayment`

Flow:

1. The client calls `IPayment.Pay()`
2. The runtime determines which concrete implementation to execute
3. No client code changes are required when adding a new payment method

---

### Time & Space Complexity

OOP does not directly affect Big-O complexity, but:

- **Deep inheritance hierarchies** increase cognitive complexity when reading code
- **Large numbers of objects** consume more memory than structs or primitive types
- **Poor abstractions** can introduce unnecessary overhead

---

## 5. Code Example (C#)

### Basic Usage

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
```
