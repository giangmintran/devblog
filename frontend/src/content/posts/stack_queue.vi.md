# Stack & Queue trong thực tế – Undo & Request Queue

> Bài này giúp bạn hiểu rõ Stack và Queue hoạt động như thế nào và cách áp dụng vào các bài toán thực tế như undo/redo và xử lý request.

---

## 1. Problem (Vấn đề)

Developer thường gặp:

- Không biết khi nào dùng Stack hay Queue
- Dùng List thay thế → code không rõ ràng
- Không hiểu bản chất FIFO vs LIFO

**Ví dụ:**
- Implement undo nhưng không biết dùng cấu trúc nào
- Xử lý request nhưng thứ tự bị sai

---

## 2. Why it matters (Tại sao quan trọng)

Nếu chọn sai:

- Logic bị sai (thứ tự xử lý)
- Bug khó debug
- Code khó đọc
- Không scale được trong hệ thống concurrent

---

## 3. Concept Overview (Tổng quan)

### Stack (LIFO – Last In First Out)
- Phần tử vào sau → ra trước

Giống:
- Ngăn xếp đĩa
- Undo/Redo

---

### Queue (FIFO – First In First Out)
- Phần tử vào trước → ra trước

Giống:
- Hàng chờ
- Request processing

---

## 4. How it works (Cách hoạt động)

### Stack

Operations chính:
- Push (thêm)
- Pop (lấy ra)
- Peek (xem phần tử đầu)

Complexity:
- Push/Pop: O(1)

---

### Queue

Operations chính:
- Enqueue (thêm)
- Dequeue (lấy ra)
- Peek

Complexity:
- Enqueue/Dequeue: O(1)

---

## 5. Code Example (C#)

### Basic usage

```csharp
// Stack
var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
Console.WriteLine(stack.Pop()); // 2

// Queue
var queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);
Console.WriteLine(queue.Dequeue()); // 1
```

---

## 6. Use case thực tế

### Undo/Redo (Stack)

```csharp
var undoStack = new Stack<string>();

undoStack.Push("Action1");
undoStack.Push("Action2");

var lastAction = undoStack.Pop(); // Undo Action2
```

Mỗi action push vào stack
Undo = pop

---

### Request Queue (Queue)

```csharp
var requestQueue = new Queue<string>();

requestQueue.Enqueue("Req1");
requestQueue.Enqueue("Req2");

var processing = requestQueue.Dequeue(); // Req1
```

Request đến trước xử lý trước

---

### Background Job (Queue)

- Hangfire
- RabbitMQ

Tất cả đều dựa trên Queue

---

## 7. So sánh nhanh

| Feature     | Stack        | Queue        |
|------------|-------------|-------------|
| Nguyên lý   | LIFO        | FIFO        |
| Use case    | Undo, recursion | Request, job |
| Operation   | Push/Pop    | Enqueue/Dequeue |

---

## 8. Common mistakes

Dùng Stack cho request processing
→ Sai thứ tự

Dùng Queue cho undo
→ Không undo đúng hành động gần nhất

Dùng List thay Stack/Queue
→ Code khó hiểu, dễ bug

---

## 9. Key takeaway

- Stack → xử lý "quay lại"
- Queue → xử lý "hàng chờ"

Rule đơn giản:
> Cần đảo ngược thứ tự → Stack
> Cần giữ thứ tự → Queue

---

## 10. Bonus tip

Trong .NET:

- Stack<T>
- Queue<T>
- ConcurrentQueue<T> (multi-thread)

Nếu làm backend:
- Dùng Queue cho job processing
- Dùng Stack cho undo logic hoặc parsing

