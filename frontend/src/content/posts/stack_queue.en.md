# Stack & Queue in Practice – Undo and Request Queues

> This article helps you understand how Stack and Queue work and how they are applied to real-world scenarios such as undo/redo functionality and request processing.

---

## 1. Problem

Developers often encounter the following challenges:

- Not knowing when to use a Stack versus a Queue
- Replacing them with a List, resulting in less clear code
- Not fully understanding FIFO vs. LIFO behavior

**Examples:**

- Implementing an undo feature without knowing the appropriate data structure
- Processing requests in the wrong order

---

## 2. Why it Matters

Choosing the wrong data structure can lead to:

- Incorrect business logic due to processing order issues
- Bugs that are difficult to debug
- Code that is harder to understand
- Scalability problems in concurrent systems

---

## 3. Concept Overview

### Stack (LIFO – Last In, First Out)

- The last element added is the first element removed

Similar to:

- A stack of plates
- Undo/Redo functionality

---

### Queue (FIFO – First In, First Out)

- The first element added is the first element removed

Similar to:

- A waiting line
- Request processing systems

---

## 4. How It Works

### Stack

Main operations:

- Push (add an item)
- Pop (remove and return the top item)
- Peek (view the top item without removing it)

Complexity:

- Push/Pop: O(1)

---

### Queue

Main operations:

- Enqueue (add an item)
- Dequeue (remove and return the first item)
- Peek

Complexity:

- Enqueue/Dequeue: O(1)

---

## 5. Code Example (C#)

### Basic Usage

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

## 6. Real-World Use Cases

### Undo/Redo (Stack)

```csharp
var undoStack = new Stack<string>();

undoStack.Push("Action1");
undoStack.Push("Action2");

var lastAction = undoStack.Pop(); // Undo Action2
```

Each action is pushed onto the stack.

Undo = Pop the most recent action.

---

### Request Queue (Queue)

```csharp
var requestQueue = new Queue<string>();

requestQueue.Enqueue("Req1");
requestQueue.Enqueue("Req2");

var processing = requestQueue.Dequeue(); // Req1
```

Requests are processed in the order they arrive.

---

### Background Jobs (Queue)

Examples include:

- Hangfire
- RabbitMQ

Both rely heavily on queue-based processing.

---

## 7. Quick Comparison

| Feature | Stack | Queue |
|----------|--------|--------|
| Principle | LIFO | FIFO |
| Use Cases | Undo, recursion | Requests, jobs |
| Operations | Push/Pop | Enqueue/Dequeue |

---

## 8. Common Mistakes

Using a Stack for request processing
→ Results in incorrect processing order

Using a Queue for undo functionality
→ Cannot correctly undo the most recent action

Using a List instead of Stack/Queue
→ Makes code harder to understand and more error-prone

---

## 9. Key Takeaway

- Stack → for "going back" operations
- Queue → for waiting-line style processing

A simple rule:

> Need to reverse the order? Use a Stack.  
> Need to preserve the order? Use a Queue.

---

## 10. Bonus Tip

In .NET, you can use:

- Stack<T>
- Queue<T>
- ConcurrentQueue<T> (for multi-threaded scenarios)

For backend development:

- Use Queue for job processing
- Use Stack for undo logic or parsing tasks
