# Array vs List vs LinkedList
> Bài này giúp bạn hiểu rõ sự khác nhau giữa Array, List và LinkedList trong C#, và chọn đúng cấu trúc dữ liệu cho từng bài toán thực tế.

---

## 1. Problem (Vấn đề)

Developer thường gặp những vấn đề sau:

- Không biết nên dùng Array hay List
- Dùng List cho mọi trường hợp (thói quen)
- Không hiểu khi nào LinkedList thực sự có lợi

**Ví dụ:**
- Dùng List để insert đầu → chậm bất ngờ
- Dùng Array nhưng lại cần resize → code phức tạp
- Không hiểu sự khác biệt → chọn sai → performance kém

---

## 2. Why it matters (Tại sao quan trọng)

Nếu chọn sai cấu trúc dữ liệu:

- Insert/Delete có thể từ O(1) thành O(n)
- Tốn memory không cần thiết
- Code khó maintain
- Không scale được khi data lớn

---

## 3. Concept Overview (Tổng quan)

### 🔹 Array
- Kích thước cố định
- Dữ liệu nằm liên tiếp trong memory
- Truy cập cực nhanh qua index (O(1))

Phù hợp khi:
- Biết trước size
- Không thay đổi nhiều

---

### List<T>
- Wrapper của Array
- Có thể resize động
- Vẫn truy cập nhanh O(1)

Phù hợp khi:
- Không biết trước số lượng phần tử
- Thêm/xóa chủ yếu ở cuối

---

### LinkedList<T>
- Danh sách liên kết (node)
- Mỗi phần tử chứa reference tới node tiếp theo
- Không cần contiguous memory

Phù hợp khi:
- Insert/Delete nhiều ở giữa hoặc đầu

---

## 4. How it works (Cách hoạt động)

### Array

- Memory được cấp phát 1 block liên tục
- Index truy cập trực tiếp

Complexity:
- Access: O(1)
- Insert/Delete: O(n)

---

### List<T>

- Bên trong là Array
- Khi đầy → tạo array mới lớn hơn → copy dữ liệu

Flow:
1. Check capacity
2. Nếu đủ → add trực tiếp
3. Nếu không → resize (thường x2)
4. Copy toàn bộ data

Complexity:
- Access: O(1)
- Add cuối: Amortized O(1)
- Insert giữa: O(n)

---

### LinkedList<T>

- Mỗi node có:
  - Value
  - Next
  - Previous (double linked list)

Flow insert:
1. Tìm node
2. Update pointer

Complexity:
- Access: O(n)
- Insert/Delete: O(1) (khi có node)

---

## 5. Code Example (C#)

### Basic usage

```csharp
// Array
int[] arr = new int[3] { 1, 2, 3 };
Console.WriteLine(arr[0]); // O(1)

// List
var list = new List<int> { 1, 2, 3 };
list.Add(4); // resize nếu cần

// LinkedList
var linkedList = new LinkedList<int>();
linkedList.AddLast(1);
linkedList.AddLast(2);

var node = linkedList.Find(1);
linkedList.AddAfter(node, 5); // O(1)
```

---

## 6. So sánh nhanh

| Operation        | Array     | List<T>        | LinkedList<T> |
|-----------------|----------|---------------|---------------|
| Access          | O(1)     | O(1)          | O(n)          |
| Add cuối        | ❌        | O(1)          | O(1)          |
| Insert giữa     | O(n)     | O(n)          | O(1)*         |
| Memory          | Thấp     | Trung bình    | Cao           |

*O(1) nếu đã có reference tới node

---

## 7. When to use (Khi nào dùng?)

### Dùng Array khi:
- Size cố định
- Performance critical
- Truy cập index nhiều

---

### Dùng List<T> khi:
- Data dynamic
- Chủ yếu add/remove cuối
- Use-case phổ biến (default choice)

---

### Dùng LinkedList<T> khi:
- Insert/Delete nhiều ở giữa
- Đã có reference node
- Không cần random access

---

## 8. Common mistakes

Dùng List cho mọi thứ
→ Không tối ưu khi insert đầu/giữa

Nghĩ LinkedList luôn nhanh hơn
→ Sai, vì:
- Tìm node = O(n)
- Cache miss nhiều hơn Array

Không để ý memory
→ LinkedList tốn nhiều memory hơn do pointer

---

## 9. Key takeaway

- Array = nhanh nhất nhưng cố định
- List = linh hoạt, dùng mặc định
- LinkedList = niche case, dùng khi thật sự cần

Rule đơn giản:
> 90% dùng List, 9% dùng Array, 1% dùng LinkedList

---

## 10. Bonus tip

Nếu bạn cần:

- Fast lookup → dùng Dictionary
- Queue → dùng Queue
- Stack → dùng Stack

Đừng cố ép Array/List/LinkedList cho mọi bài toán
