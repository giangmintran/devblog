---
title: "Code Review và Empathy"
slug: "code-review-with-empathy"
id: "post-code-review-with-empathy"
summary: "Các thói quen thực tế giúp code review nhanh hơn, tích cực hơn và hiệu quả hơn cho cả team."
tags: ["team", "career", "decision-making"]
category: "dev-life"
authorId: "admin"
seriesId: "team-collaboration"
status: "published"
publishedAt: "2026-04-06"
updatedAt: "2026-04-07"
coverImage: ""
canonicalUrl: ""
---

## Review vào code, không review con người

Giọng điệu gay gắt sẽ làm chậm cộng tác. Comment review mang tính hỗ trợ giúp tăng chất lượng code và xây dựng niềm tin trong team cùng lúc.

## Mẫu comment mình thường dùng

- **Điều mình quan sát được**: nói cụ thể.
- **Vì sao quan trọng**: ảnh hưởng tới khả năng bảo trì hoặc lỗi.
- **Đề xuất**: một hướng thay thế rõ ràng.

### Ví dụ

```text
Quan sát: Hàm này đang làm hai trách nhiệm.
Vì sao: Sẽ khó test và khó thay đổi hơn.
Đề xuất: Tách phần parse và phần lưu dữ liệu thành hai hàm riêng.
```

## Thỏa thuận trong team

1. Ưu tiên đặt câu hỏi thay vì ra lệnh.
2. Giữ comment có thể hành động được.
3. Approve nhanh khi vấn đề đã được xử lý.

## Kết luận

Thấu cảm trong review không phải là mềm mỏng quá mức, mà là giúp phản hồi dễ tiếp nhận và dễ áp dụng hơn.