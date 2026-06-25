# Array vs List vs LinkedList
> This article helps you clearly understand the differences between Array, List, and LinkedList in C#, and choose the right data structure for real-world scenarios.

---

## 1. Problem

Developers often run into the following issues:

- Not knowing whether to use Array or List
- Using List for everything out of habit
- Not understanding when LinkedList is actually beneficial

**Examples:**
- Using List to insert at the beginning → unexpectedly slow
- Using Array but needing to resize → complex code
- Not understanding the differences → poor choices → reduced performance

---

## 2. Why it matters

If you choose the wrong data structure:

- Insert/Delete operations may degrade from O(1) to O(n)
- Memory may be wasted unnecessarily
- Code becomes harder to maintain
- Applications may not scale with large datasets

---

## 3. Concept Overview

### 🔹 Array
- Fixed size
- Data is stored contiguously in memory
- Extremely fast index-based access (O(1))

Best suited when:
- The size is known in advance
- The data rarely changes

---

### List<T>
- A wrapper around an Array
- Can resize dynamically
- Still provides O(1) access by index

Best suited when:
- The number of elements is unknown beforehand
- Most additions/removals occur at the end

---

### LinkedList<T>
- A linked list of nodes
- Each element contains a reference to the next node
- Does not require contiguous memory

Best suited when:
- Frequent insertions/deletions occur at the beginning or middle

---

## 4. How it works

### Array

- Memory is allocated as one continuous block
- Direct index access

Complexity:
- Access: O(1)
- Insert/Delete: O(n)

---

### List<T>

- Internally backed by an Array
- When full → creates a larger array → copies existing data

Flow:
1. Check capacity
2. If there is space → add directly
3. Otherwise → resize (typically doubles capacity)
4. Copy all existing data

Complexity:
- Access: O(1)
- Append to end: Amortized O(1)
- Insert in middle: O(n)

---

### LinkedList<T>

- Each node contains:
  - Value
  - Next
  - Previous (doubly linked list)

Insertion flow:
1. Find the node
2. Update the pointers

Complexity:
- Access: O(n)
- Insert/Delete: O(1) (when you already have the node reference)

---

## 5. Code Example (C#)

### Basic usage

```csharp
// Array
int[] arr = new int[3] { 1, 2, 3 };
Console.WriteLine(arr[0]); // O(1)

// List
var list = new List<int> { 1, 2, 3 };
list.Add(4); // Resizes if needed

// LinkedList
var linkedList = new LinkedList<int>();
linkedList.AddLast(1);
linkedList.AddLast(2);

var node = linkedList.Find(1);
linkedList.AddAfter(node, 5); // O(1)
```

---

## 6. Quick Comparison

| Operation | Array | List<T> | LinkedList<T> |
|-----------|--------|----------|----------------|
| Access | O(1) | O(1) | O(n) |
| Append to End | ❌ | O(1) | O(1) |
| Insert in Middle | O(n) | O(n) | O(1)* |
| Memory Usage | Low | Medium | High |

*O(1) if you already have a reference to the node.

---

## 7. When to use

### Use Array when:
- The size is fixed
- Performance is critical
- Frequent index-based access is required

---

### Use List<T> when:
- The data is dynamic
- Most operations add/remove at the end
- It is a common general-purpose use case (default choice)

---

### Use LinkedList<T> when:
- Frequent insertions/deletions occur in the middle
- You already have node references
- Random access is not required

---

## 8. Common mistakes

Using List for everything
→ Not optimal for inserts at the beginning or middle

Assuming LinkedList is always faster
→ Incorrect, because:
- Finding a node is O(n)
- Cache misses occur more frequently than with Arrays

Ignoring memory usage
→ LinkedList consumes more memory because of node pointers

---

## 9. Key takeaway

- Array = fastest but fixed-size
- List = flexible and the default choice
- LinkedList = a niche solution for specific scenarios

A simple rule of thumb:

> 90% List, 9% Array, 1% LinkedList

---

## 10. Bonus tip

If you need:

- Fast lookup → use Dictionary
- Queue behavior → use Queue
- Stack behavior → use Stack

Don't force Array/List/LinkedList into every problem.
