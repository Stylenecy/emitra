# PROMPT ORCHESTRATION — EMITRA USER FLOW & LANDING PAGE
## Target: 4 AI (ChatGPT, Gemini, Grok, Qwen) | Mode: Parallel → Merge
## Deadline: Prompt hari ini, merge hari ini juga

---

## KONTEKS PRODUK (Baca Sebelum Jawab)

**Emitra** = AI-Powered CBAM Compliance SaaS untuk eksportir besi/baja/aluminium Indonesia.

**Masalah:** Sejak 1 Jan 2026, EU mewajibkan data emisi terverifikasi. Tanpa data, kena "default value" — tarif emisi tertinggi global. Biaya audit manual IDR 150-250jt/tahun.

**Solusi:** Upload dokumen pabrik → AI OCR → HITL validation → Deterministic calc → XML siap EU Registry.

**Pricing:** Basic (Setup 30jt + Annual 50jt) | Pro (Setup 50jt + Annual 80jt)
**Target user:** UKM besi/baja/aluminium Tier 2/3 di Cikarang, Karawang, Cilegon
**Lomba:** BMC #12 — Grand Final 20 Agustus 2026 (presentasi 15 menit + demo)
**Frontend:** Vite + React 18 + TypeScript + Tailwind (dark theme)
**Status:** 5 halaman internal (Dashboard, Upload, Validate, Calculate, Report) sudah built — **BELUM ada landing page**

---

## APA YANG KITA BUTUH DARI 4 AI

| AI | Spesialisasi | Output Utama |
|----|-------------|--------------|
| **ChatGPT** | Copywriting & Brand | Landing page copy, hero, value props, testimonials, pricing section |
| **Gemini** | UX Architecture | User personas, journey maps, information architecture, sitemap |
| **Grok** | Critical Review | Flow critique, edge cases, conversion optimization, user objections |
| **Qwen** | Practical Execution | Landing page components, sections detail, mock data for testimonials |

---

### 🟢 CHATGPT — COPYWRITING & BRAND

Kamu adalah copywriter B2B SaaS spesialis sustainability. Tulisanmu convert.

1. **Hero section:** Headline + subheadline + CTA — 3 varian, satu baris per varian. Target: owner pabrik. Bahasa Indonesia.
2. **Problem-agitation-solution:** 3 paragraf yang bikin owner pabrik ngerasa "ini gue banget" → "ini solusinya"
3. **Value propositions:** 4-6 cards (icon + short headline + 1 line desc) — yang bikin orang mau daftar trial
4. **Testimonial copy:** 3 testimoni fiktif tapi realistis — nama jabatan perusahaan, quote, hasil (angka)
5. **Pricing section copy:** Headline + subheadline + deskripsi per tier — bikin Basic keliatan wajib, Pro keliatan untung
6. **FAQ:** 5 pertanyaan + jawab — yang bikin objection hilang
7. **CTA section:** Final push — headline + subheadline + button text
8. **Metaphor/hook:** Satu analogi yang nempel di kepala — "Emitra itu [X]-nya [Y]"
9. **Brand voice guidelines untuk landing page:** Tone, words to use, words to avoid

Output: Langsung siap pakai. No essay. Copy siap tempel.

---

### 🔵 GEMINI — UX ARCHITECTURE & USER PERSONAS

Kamu adalah UX strategist B2B enterprise. Fokus ke clarity.

1. **User personas (3 minimum):**
   - Nama, jabatan, usia, background
   - Goals (apa yang mereka mau capai)
   - Pain points (kenapa mereka frustrasi)
   - Job-to-be-done (satu kalimat: "When X, I want to Y, so I can Z")
   - Tech literacy (low/medium/high)
   - Decision power (spectator/recommender/decider)

2. **User journey maps:** 3 journey — satu per persona
   - Awareness → Consideration → Decision → Onboarding → Daily use → Advocacy
   - Per stage: what user does, what user feels, touchpoints, opportunities

3. **Information architecture landing page:**
   - Sitemap: Navigation items + footer links
   - Section hierarchy: Urutan section dari atas ke bawah — dengan justifikasi kenapa urutan itu

4. **Conversion flow:**
   - Landing page → CTA → apa yang terjadi?
   - Form fields minimal
   - Follow-up sequence (email/WA)

5. **Accessibility notes:** Kontras warna, font size, focus states

Output: Persona tabel + journey table + sitemap tree. Praktis, ga perlu essay.

---

### 🟡 GROK — CRITICAL REVIEW & CONVERSION

Kamu adalah devil's advocate. Tugasmu: cari celah, objective, dan bikin flow ini tahan banting.

1. **Kritik landing page assumptions:** 
   - "Apa yang akan bikin pengunjung landing page ini nge-close dalam 3 detik?"
   - "Apa yang akan bikin owner pabrik bilang 'ah, ini cuma drama'?"
   - "Apa yang kurang kredibel dari Emitra sebagai startup?"

2. **User objection list:** 10 objections — setiap objection + counter argument
   - Contoh: "Ini mah cuma export Excel" / "Aku tunggu aja sampe wajib beneran" / "Data pabrikku rahasia"
   
3. **Flow critique:** Di titik mana user paling mungkin drop out? Kenapa? Fix?

4. **Competitor radar:** Siapa aja yang bisa muncul dan bikin user ragu? Bukan kompetitor langsung, tapi alternatif (Excel, trust issue, "tunggu pemerintah")

5. **Trust building checklist:** Apa yang WAJIB ada di landing page biar owner pabrik yang konservatif percaya?

6. **Conversion micro-optimizations:** 5 specific changes di landing page yang bisa naikin conversion (no fluff — spesifik: "ganti button dari 'Get Started' ke 'Coba Gratis 30 Hari'")

Output: Blunt, no sugarcoat. Langsung ke point.

---

### 🟣 QWEN — PRACTICAL EXECUTION (COMPONENTS & DATA)

Kamu adalah frontend lead yang practical. Fokus ke implementasi.

1. **Landing page section list (detail implementasi):**
   - Setiap section: nama, tujuan, komponen, konten minimal
   - Urutan dari hero sampai footer — final sitemap

2. **Mock data untuk landing page:**
   - 3 testimonial entries: nama, jabatan, perusahaan, quote, avatar inisial, hasil
   - 3 logo partner/asosiasi (fiktif: logo IISIA, KADIN, ALFI)
   - Stat counter: angka-angca yang impactful (1500+ perusahaan terdampak, dst)
   - Team section: 4 founder (nama, role, foto inisial)

3. **Landing page component tree:**
   - Navbar → Hero → Problem → Solution → How It Works → Features → Stats → Testimonials → Pricing → FAQ → CTA → Footer
   - Per komponen: props, variants, states

4. **Technical implementation notes:**
   - Dark theme konsisten dengan halaman internal (zinc-950 bg)
   - Reusable dari komponen existing (Button, Card, Badge)
   - Animasi: fade-in on scroll (AOS atau Tailwind)
   - Responsive breakpoints

5. **7 screenshots untuk slide presentasi:**
   - Apa yang di-capture, angle, caption presentasi

Output: Praktis, code-ready, komponen bisa langsung di-build.

---

## FORMAT OUTPUT

```
# [NAMA AI] — EMITRA [SPESIALISASI]

## 1. [Section]
[Output langsung — tabel/bullet/code]

## 2. [Section]
...

---

**1 insight actionable buat Dex:**
```

## ATURAN

- Setiap AI kerja mandiri — jangan baca output AI lain
- Output HARUS actionable — langsung bisa dipake buat build
- BAHASA INDONESIA (kecuali code & technical terms)
- 200-400 baris per AI
- Prioritas: **kualitas > kuantitas**. Gue lebih suka 3 persona yang tajam daripada 5 yang generic.
