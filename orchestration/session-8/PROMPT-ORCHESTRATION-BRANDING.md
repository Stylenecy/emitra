# PROMPT ORCHESTRATION — EMITRA BRANDING & PRODUCT BLUEPRINT
## Target: 4 AI (ChatGPT, Gemini, Grok, Qwen) | Mode: Parallel Brainstorm → Merge

---

## FILE KONTEKS YANG HARUS DIKIRIM KE AI (LAMPIRAN):

Kirim file ini bersama prompt ke masing-masing AI:

1. **`EMITRA-FINAL-MERGED.md`** — Proposal lengkap (WAJIB untuk semua AI, biar paham produk utuh, target market, fitur, dan finansial)
2. **`emitra_system_architecture.svg`** — Diagram arsitektur 5-layer (untuk Gemini & Grok)
3. **`BRIEFING-DOCUMENT-TIM.md`** — Briefing tim (untuk ChatGPT paham positioning & brand voice)

**Instruksi untuk AI:** Baca semua file lampiran SEBELUM menjawab. Jangan tebak produk — pahami dari dokumen.

---

## KONTEKS UNTUK AI:

**Emitra** adalah platform SaaS B2B yang mengotomatisasi kepatuhan CBAM (pajak karbon EU) untuk eksportir besi/baja/aluminium Indonesia.

**Tim:**
- Dex Bennett (SI) — CTO, vibe-coder, build dengan AI
- Efrant (Informatika) — Developer, mau bikin frontend HTML
- Imeldya (CEO), Adriel (CFO), Keren Tiara (CMO)

**Constraint Produk:**
- Working demo = **FRONTEND HTML dulu** (backend belakangan)
- Deploy ke **Vercel** buat kredibilitas (mock data + UI aja cukup)
- Tesseract OCR = open-source GRATIS (gak perlu bayar) — tapi buat demo cukup mock data + UI yang jelas
- Timeline: Grand Final BMC #12 tanggal **20 Agustus 2026**

**Kategori Lomba:** Sustainable Business & Green Innovation

---

## TUGAS UNTUK SETIAP AI:

Bagi 4 AI jadi 4 spesialisasi BERBEDA biar output gak redundant:

> **Logic pemilihan:** Setiap AI dapat tugas sesuai kekuatan alaminya:
> - ChatGPT = creative/brand voice → Branding & UI/UX
> - Gemini = technical depth & structured docs → PRD & Architecture
> - Grok = direct & systems thinking → Flow & Data Model
> - Qwen = practical execution → Roadmap & Demo
>
> *Note: Dex suka debat antar AI, tapi kali ini kita skip debat round biar efisien waktu. Output tetap di-merge oleh Home AI.*

### 🟢 CHATGPT → BRANDING & UI/UX DIRECTION
1. **Brand strategy**: Positioning "export continuity insurance" → how this translates to visual identity
2. **Logo concepts**: 3 alternatif (geometric, wordmark, emblem) — describe shapes, metaphor
3. **Color palette**: Primary, secondary, accent — hex codes + rationale (eco/corporate balance)
4. **Typography**: Font pairing (heading + body) — Google Fonts recommendation
5. **Design tokens**: Spacing scale, border-radius, shadow rules
6. **UI component library**: Button, Card, Input, Table, Badge — visual spec
7. **Landing page wireframe**: Hero, Features, How-it-works, Pricing, CTA

### 🔵 GEMINI → PRD & SYSTEM ARCHITECTURE
1. **PRD lengkap**: Goals, user stories, functional requirements, non-functional
2. **Tech stack (frontend-focused)**: HTML + Tailwind/Vite, atau rekomendasi terbaik untuk Vercel deploy
3. **Directory structure**: Folder blueprint untuk project HTML/JS
4. **Component export patterns**: Bagaimana struktur file komponen
5. **TypeScript definitions**: .d.ts buat mock data structures
6. **API payload signatures**: Mock API contract (request/response JSON)
7. **State management scope**: Bagaimana state di-handle di frontend (localStorage? Context?)
8. **Environment variable list**: .env.example
9. **Definition of Done (DoD)** & **Testing guidelines**

### 🟡 GROK → FLOW, DIAGRAM & DATA MODEL
1. **User flow diagram**: Onboarding → Upload → OCR → Review → XML export
2. **DFD (Data Flow Diagram)**: Level 0 & Level 1 — entity, process, data store
3. **ERD**: Entity relationship untuk mock data (User, Company, Document, EmissionRecord, CBAMReport)
4. **Edge cases**: 10 scenario (file corrupt, OCR gagal, network timeout, dll)
5. **Error & retry policies**: Bagaimana UI handle error
6. **Responsive breakpoint rules**: Mobile/tablet/desktop behavior
7. **Interactive state variants**: Loading, success, error, empty states
8. **Role-based access map**: CTO/CEO/CFO/CMO views (kalau ada dashboard multi-role)
9. **Route protection rules**: Halaman apa butuh auth

### 🟣 QWEN → ROADMAP & DEMO STRATEGY
1. **Vertically sliced roadmap**: Fase 1 (demo Aug) → Fase 2 → Fase 3
2. **Mock seed data script**: SQL/JSON buat generate 5 perusahaan contoh + dokumen
3. **Demo script**: Step-by-step buat presentasi 10 menit (apa yang diklik, apa yang muncul)
4. **Video demo storyboard**: 2-3 menit, scene per scene
5. **Analytics telemetry hooks**: Event tracking buat ukur engagement (dummy aja)
6. **Screenshots plan**: 5-7 layar wajib buat slide presentasi

---

## FORMAT OUTPUT SETIAP AI:

```
# [NAMA AI] — EMITRA [SPESIALISASI]

## 1. [Section]
[Detail...]

## 2. [Section]
[Detail...]

---

**Catatan untuk Dex:** [1-2 kalimat actionable insight]
```

---

## INSTRUKSI PENTING:

- Setiap AI KERJA MANDIRI di spesialisasinya — gak perlu baca output AI lain
- Output HARUS teknis & actionable (bukan essay)
- Gunakan code block untuk spec (JSON, CSS, SQL)
- Bahasa: Indonesia (kecuali code/technical terms)
- Panjang: 300-500 baris per AI
