# MERGED LANDING PAGE & USER FLOW BLUEPRINT
## Session 9: 4-AI Orchestration (ChatGPT · Gemini · Grok · Qwen)
### 8 Jul 2026

---

## A. USER PERSONAS (Gemini)

| | Persona 1: Decider | Persona 2: Recommender | Persona 3: Operator |
|---|---|---|---|
| **Nama** | Pak Bambang Hartono (53) | Ibu Lestari Wijaya (38) | Mas Eko Prasetyo (27) |
| **Jabatan** | Direktur Utama / Owner | Head of Ops & Compliance | Senior Logistics Admin |
| **Goals** | Jaga margin, amankan kontrak EU, hindari default value | Laporan emisi zero error, kurangi beban tim | Selesai input data lebih cepat, hindari salah ketik |
| **Pain** | Audit mahal (150-250jt/thn), takut kehilangan buyer EU | Bingung template EU sering update, dokumen pabrik kotor | Berjam-jam ketik ulang invoice, stress entri data |
| **Tech** | Low (WA, telepon, print-out) | Medium (ERP, Excel advanced) | High (digital native, SaaS) |
| **Power** | **Decider** | **Recommender** | **Spectator** |

### Key Insight Grok:
Owner pabrik (55-60 thn, konservatif) bukan tech buyer — mereka buyer **"jaminan gak rugi"**. Landing page harus bicara pain + ROI, bukan jargon AI.

---

## B. USER JOURNEY (Gemini)

| Stage | Pak Bambang | Ibu Lestari | Mas Eko |
|-------|-------------|--------------|---------|
| **Awareness** | Baca grup WA KADIN soal CBAM → cemas | Google "otomatisasi XML CBAM" → bingung | Dengar kabar dari Ibu Lestari → khawatir ribet |
| **Consideration** | Minta Lestari cari alternatif → skeptis sama software | Pelajari arsitektur Emitra → analitis, cek metodologi | Lihat demo video → tertarik setelah lihat UI |
| **Decision** | Setuju pilot gratis setelah lihat simulasi ROI | Bikin proposal untuk Bambang → percaya diri karena dual-compliance | Terima akun login → siap uji coba |
| **Daily Use** | Terima laporan ringkas "Compliant" → puas | Pantau dashboard, siapkan audit → 2 jam bukan 2 minggu | Upload dokumen, koreksi split-screen 3 detik → senang |
| **Advocacy** | Rekomendasi ke rekan asosiasi | Jadi pembicara webinar industri | Kasih tahu rekan admin pabrik lain |

---

## C. LANDING PAGE STRUCTURE (Qwen + Gemini)

### Sitemap (12 Sections)

```
Navbar (Logo · Solusi · Fitur · Harga · CTA "Login Demo")
│
├─ 1. Hero Section — ChatGPT V1: "Ekspor ke Eropa Tetap Jalan..."
├─ 2. Regulatory Urgency Bar — Countdown Feb 2027 + stats
├─ 3. Problem Section — 3 pain cards (Default Value · Biaya 14% · Deadline)
├─ 4. Solution — "Dari dokumen ke XML EU Registry dalam jam"
├─ 5. How It Works — 5 steps (Upload → OCR → Validate → Calculate → XML)
├─ 6. Features Grid — 4-6 feature cards
├─ 7. Stats Counter — 1.500+ · $757.7M · 67% · Feb 2027
├─ 8. Testimonials — 3 cards (ChatGPT copy + Qwen mock data)
├─ 9. Pricing — Basic vs Pro (ChatGPT copy)
├─ 10. FAQ Accordion — 5 items (ChatGPT)
├─ 11. Final CTA — "Jangan Tunggu Sampai Regulasi..."
└─ 12. Footer — Legal · Kontak · Badges
```

### Conversion Flow (Gemini)
```
CTA Button → Modal (5 fields: Nama · Perusahaan · WA · Sektor · Volume Ekspor)
          → Thank You Screen
          → WhatsApp (instan: checklist dokumen)
          → Email (T+10min: jadwal boundary session)
```

---

## D. COPY & BRAND (ChatGPT)

### Hero (Varian Recommended)
> **Headline:** Ekspor ke Eropa Tetap Jalan. Urusan CBAM, Serahkan ke Emitra.
> **Sub:** Upload dokumen pabrik Anda. Emitra mengubahnya menjadi laporan CBAM siap EU Registry dalam hitungan jam, bukan minggu.
> **CTA:** Jadwalkan Demo Gratis

### Hook / Metaphor
> **"Emitra adalah e-Faktur untuk kepatuhan karbon ekspor."**

### Value Props (6 Cards)
1. 📄 Upload Sekali — Unggah invoice, tagihan listrik, dokumen produksi
2. 🤖 AI OCR Otomatis — Ekstraksi data dalam detik
3. ✅ Validasi yang Bisa Diaudit — Semua hasil AI dapat dikoreksi
4. 📊 Kalkulasi Sesuai Regulasi — Metodologi CBAM resmi
5. 📦 XML Siap EU Registry — Laporan siap submit
6. 💰 Hemat Waktu & Biaya — Tekan biaya kepatuhan

### Testimonials (ChatGPT copy + Qwen data)
1. **Budi Santoso** — Plant Manager PT Baja Nusantara: "Waktu pelaporan turun 90%"
2. **Siti Aminah** — CFO CV Logam Mulia Sejahtera: "Biaya turun 67%, hemat IDR 135jt/thn"
3. **Hendra Wijaya** — Export Director PT Cilegon Steel: "Kontrak Eropa aman 3 tahun"

### Brand Voice
- **Tone:** Profesional, meyakinkan, ringkas, berbasis hasil
- **Gunakan:** Kepatuhan, terverifikasi, siap audit, efisien, transparan
- **Hindari:** Revolusioner, AI tercanggih, disruptif, instan, magic

---

## E. GROK'S HARD TRUTHS (Critical)

### 3 Reason Owner Close Tab in 3 Detik
1. Hero penuh jargon "AI-Powered SaaS CBAM Compliance Platform"
2. Claim "hemat 67%" tanpa bukti konkret
3. Bahasa terlalu marketing — bau "startup Jakarta"

### 10 Objections + Counters → masuk ke FAQ + trust section

### 5 Micro-Optimizations
1. **Button:** "Coba Gratis 30 Hari untuk Pabrik Kamu" > generic "Get Started"
2. **ROI calculator** di atas fold — "Audit tahunan berapa? → Emitra hemat RpXXjt"
3. **Angka konkret** di headline: "Hemat Rp90jt/tahun seperti CV Logam Mulia"
4. **Urgency bar:** "Feb 2027 deadline — 1.500 eksportir mulai panik"
5. **Social proof bar:** "Dipakai oleh eksportir aluminium Ceper"

### Trust Checklist Wajib
- [ ] Logo IISIA / KADIN / Sucofindo
- [ ] Case study CV Logam Mulia (before/after)
- [ ] Screenshot audit trail + XML sample
- [ ] "Built for Indonesian factories" — foto tim
- [ ] Security badges (AES-256, UU PDP, ISO future)
- [ ] "3-month free pilot for first 5 companies"
- [ ] Testimoni + foto/avatar
- [ ] Clear "Who we are" — tim

---

## F. IMPLEMENTATION PLAN (Qwen)

### Mock Data (TypeScript)
```
stats: 4 items (1.500+, $757.7M, 67%, Feb 2027)
testimonials: 3 items (name, role, company, quote, result, avatar)
partners: 3 items (IISIA, KADIN, ALFI)
team: 4 items (Imeldya, Dex, Adriel, Keren)
```

### Component Tree
```tsx
<Navbar />
<Hero />
<ProblemSection />
<SolutionSection />
<HowItWorks />     {/* 5 steps */}
<FeaturesGrid />   {/* 4-6 cards */}
<StatsCounter />   {/* animated */}
<PartnersLogo />
<Testimonials />   {/* 3 cards */}
<PricingTable />   {/* 2 tiers */}
<FAQAccordion />   {/* 5 items */}
<FinalCTA />
<Footer />
```

### Animasi: Custom `useInView` hook (zero dependency)
### Responsive: Mobile-first (grid-cols-1 → sm:2 → lg:3)
### Screenshots untuk slide: 7 capture point

---

## G. PRIORITAS BUILD

| # | Task | Source | Depends On |
|---|------|--------|-----------|
| 1 | Buat `src/data/landing.ts` — mock data | Qwen | — |
| 2 | Buat `hooks/useInView.ts` — scroll animasi | Qwen | — |
| 3 | Hero section + CTA | ChatGPT copy | — |
| 4 | Problem → Solution → How It Works | ChatGPT + Gemini | — |
| 5 | Features Grid + Stats Counter | Qwen + ChatGPT | — |
| 6 | Testimonials + Partners + Team | ChatGPT copy + Qwen data | — |
| 7 | Pricing Table + FAQ Accordion | ChatGPT | — |
| 8 | Final CTA + Footer | ChatGPT | — |
| 9 | Navbar + routing ke /dashboard | Qwen | All sections |
| 10 | Polish + deploy Vercel | — | All sections |

---

**Insight utama dari 4 AI:**
> Landing page ini bukan jual software — ini jual **jaminan kelangsungan ekspor**. Bahasa, visual, dan flow harus bicara ke owner pabrik yang konservatif, takut rugi, dan butuh bukti sebelum percaya.
