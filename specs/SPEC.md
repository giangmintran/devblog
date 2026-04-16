# SPEC - Dev Blog (Markdown-first, Future-ready)

## 1. Muc tieu du an
Xay dung 1 trang web Dev Blog chia se kien thuc Software Engineering voi cac tieu chi:
- Hien tai: chi dung file Markdown (.md), khong backend, khong database.
- Tuong lai: mo rong de co the them backend, database, auth, workflow va cac tinh nang nang cao ma khong can viet lai toan bo.

## 2. Pham vi
### 2.1 In-scope (giai doan hien tai)
- Hien thi bai viet tu file Markdown.
- Trang danh sach bai viet + loc theo tag/chuyen muc.
- Trang chi tiet bai viet (co syntax highlight cho code, TOC).
- Tim kiem client-side.
- SEO co ban (meta, OG, sitemap, RSS).
- Responsive desktop/mobile.
- Co cau truc kien truc de thay nguon du lieu (Markdown -> API/DB) trong tuong lai.

### 2.2 Out-of-scope (giai doan hien tai)
- Khong co backend API.
- Khong co database.
- Khong co he thong dang nhap/phan quyen.
- Khong co CMS server-side.

## 3. Doi tuong nguoi dung
- Reader: doc bai viet, tim kiem, loc tag, xem series.
- Author (tam thoi qua git): viet va publish bai bang cach tao/sua file Markdown va deploy.

## 4. Yeu cau chuc nang
### FR-01: Trang chu
- Hien thi bai moi nhat, bai noi bat, cac tag pho bien.
- Co link toi trang Blog, Tags, About.

### FR-02: Danh sach bai viet
- Hien thi danh sach bai da publish.
- Ho tro phan trang hoac load-more.
- Sap xep mac dinh theo publishedAt giam dan.

### FR-03: Chi tiet bai viet
- Render Markdown thanh HTML an toan.
- Ho tro heading, list, image, link, table, blockquote, code block.
- Syntax highlight cho code block.
- Tao TOC tu heading H2/H3.

### FR-04: Tag/Category
- Moi bai co the co nhieu tag.
- Trang tag hien thi danh sach bai theo tung tag.

### FR-05: Tim kiem
- Tim theo title, summary, tags (client-side).
- Ket qua phan hoi nhanh tren trinh duyet.

### FR-06: SEO & Discoverability
- URL than thien theo slug: /blog/[slug].
- Co title, meta description, Open Graph/Twitter card.
- Tao sitemap.xml va RSS feed tu dong.

### FR-07: About/Contact
- Co trang gioi thieu tac gia.
- Co lien ket social/contact.

### FR-08: Analytics (khong backend)
- Tich hop script analytics ben thu 3 (vi du Plausible/GA).

### FR-09: Comments (tuy chon, khong backend)
- Tich hop Giscus/Utterances.

## 5. Mo hinh noi dung Markdown
Moi bai viet la 1 file .md trong 1 trong 2 thu muc: frontend/src/content/blog hoac frontend/src/content/dev-life, voi frontmatter chuan:

```yaml
title: "..."
slug: "..."
id: "..." # id on dinh, de san sang migrate DB
summary: "..."
tags: ["backend", "system-design"]
category: "software-engineering"
authorId: "admin"
seriesId: "" # optional
status: "published" # draft | published | archived
publishedAt: "2026-04-09"
updatedAt: "2026-04-09"
coverImage: "/images/..."
canonicalUrl: ""
```

Noi dung than bai viet nam ben duoi frontmatter.

## 6. Yeu cau kien truc (de mo rong sau nay)
### AR-01: Tach lop ro rang
- Domain layer: mo hinh bai viet + use case (list/get/filter/search).
- Data access layer qua interface PostRepository.
- Presentation layer chi dung du lieu tu use case, khong doc file truc tiep.

### AR-02: Adapter pattern cho nguon du lieu
- Hien tai: MarkdownPostRepository.
- Tuong lai: ApiPostRepository/DbPostRepository.
- Chuyen doi qua config CONTENT_PROVIDER ma khong doi UI.

### AR-03: Hop dong du lieu thong nhat
- Dinh nghia Post schema/type dung chung cho moi provider.
- Bao dam tinh tuong thich khi migrate markdown sang DB.

### AR-04: URL va SEO on dinh
- Giu nguyen route /blog/[slug] va /tags/[tag] khi mo rong.
- Khong thay doi permalink da public.

## 7. Yeu cau phi chuc nang
### NFR-01: Hieu nang
- LCP tot tren mobile va desktop.
- Lazy-load hinh anh.
- Build static toi uu, cache tai CDN.

### NFR-02: Bao mat
- Sanitize noi dung Markdown/HTML de tranh XSS.
- Kiem soat external links (rel=noopener/noreferrer).

### NFR-03: Kha dung
- Responsive tu 360px tro len.
- Co ban accessibility: semantic HTML, contrast, keyboard navigation.

### NFR-04: Van hanh
- Deploy static len Vercel/Netlify/Cloudflare Pages/GitHub Pages.
- CI/CD tu dong build va deploy khi merge nhanh chinh.

## 8. Cau truc thu muc de xuat
```text
/frontend/src/content/blog/*.md
/frontend/src/content/dev-life/*.md
/src/domain/posts/*
/src/infra/content-markdown/*
/src/infra/content-api/*        # placeholder cho tuong lai
/src/ui/*
/public/images/*
```

## 9. Lo trinh mo rong
### Phase 1 (Now)
- Chay 100% Markdown + static deploy.
- Hoan tat SEO, RSS, sitemap, search client-side.

### Phase 2
- Them backend read-only API.
- Chuyen provider tu markdown sang api bang bien cau hinh.

### Phase 3
- Them database + CMS/workflow (Draft -> Review -> Publish).
- Viet script import du lieu tu markdown vao DB.

### Phase 4
- Them auth, role (Admin/Editor/Author), comment noi bo, bookmark, newsletter.

## 10. Tieu chi nghiem thu (Acceptance Criteria)
- Co the tao 1 bai moi chi bang them 1 file .md va deploy thanh cong.
- Bai viet hien thi dung format va code highlight.
- Loc tag va tim kiem hoat dong tren client.
- Tao duoc RSS va sitemap tu dong.
- Diem mobile va desktop dat muc tot theo benchmark noi bo.
- Kien truc da co PostRepository interface va Markdown adapter tach biet.
- Co tai lieu huong dan migrate sang API/DB ma khong doi URL public.

## 11. Rui ro va giam thieu
- Rui ro parser Markdown khong an toan -> dung thu vien sanitize da duoc kiem chung.
- Rui ro doi route gay mat SEO -> khoa route convention ngay tu dau.
- Rui ro migration kho khan -> bat buoc frontmatter chuan + id on dinh.

## 12. Dinh nghia hoan thanh (Definition of Done)
- Dat du FR uu tien cao (FR-01 -> FR-07).
- Dat NFR co ban (hieu nang, bao mat, responsive).
- Build + deploy thanh cong tren moi truong production static.
- Tai lieu hoa day du setup va quy trinh viet bai/publish.
