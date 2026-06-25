# HTTP/1.1 vs HTTP/2

---

## Overview Comparison

| Feature | HTTP/1.1 | HTTP/2 |
|---|---|---|
| **Data Format** | Text-based | Binary |
| **Request Handling** | Sequential (Pipelining) | Multiplexed |
| **TCP Connections** | Multiple per domain | Single connection |
| **Header Compression** | None (headers sent as-is) | Yes (HPACK) |
| **Server Push** | Not supported | Supported |
| **Biggest Issue** | Head-of-Line Blocking | HOL resolved at HTTP layer |

---

## Key Differences

### 1. Multiplexing vs. Sequential Processing

This is the most significant difference between the two versions.

**HTTP/1.1 — Sequential:**
- The browser sends one request and must wait for the server's full response before sending the next request on the same connection.
- If one request stalls (e.g., a large image loading), all subsequent requests are blocked — this is known as **Head-of-Line (HOL) Blocking**.
- As a workaround, browsers typically open multiple parallel TCP connections (usually 6 per domain), which wastes resources.

**HTTP/2 — Multiplexing:**
- Allows sending and receiving multiple requests/responses simultaneously over **a single TCP connection**.
- Data is split into small frames and transmitted in parallel without waiting for each other.

---

### 2. Binary Protocol vs. Text-based

**HTTP/1.1 — Text-based:**
- Commands (`GET`, `POST`, ...) and headers are sent as plain text.
- Easy to read when debugging, but requires more CPU to parse and is prone to formatting errors.

**HTTP/2 — Binary:**
- All data is packaged into small **binary frames**.
- Faster for machines to process, fewer errors, and more efficient over the network.

---

### 3. Header Compression (HPACK)

**HTTP/1.1:**
- Every request must include a full set of headers (`User-Agent`, `Cookies`, `Referer`, ...).
- This information is often repetitive and consumes significant bandwidth — sometimes the headers are larger than the actual payload.

**HTTP/2 — HPACK:**
- Uses a dedicated compression algorithm called **HPACK**.
- Eliminates redundant information and only sends the **delta** (changes) of headers compared to previous requests.
- Results in significant bandwidth savings.

---

### 4. Server Push

**HTTP/1.1 — Reactive:**
- The server only returns what the client explicitly requests.
- Example: Client requests `index.html` → parses it → discovers it needs `style.css` → sends another request for `style.css`.

**HTTP/2 — Proactive:**
- When a client requests `index.html`, the server **anticipates** that `style.css` will be needed and pushes it immediately.
- By the time the client needs it, the file is already in cache — significantly reducing latency.

---

## Summary

HTTP/2 addresses nearly all of HTTP/1.1's weaknesses through multiplexing, a binary protocol, HPACK header compression, and server push. The result is faster page loads, lower resource consumption, and a noticeably better user experience — especially on high-latency connections.