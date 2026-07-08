# Qwen3.7 — EMITRA FRONTEND LEAD

## 1. Landing Page Section List (Sitemap & Implementasi)

| # | Section | Tujuan | Komponen Utama | Konten Minimal |
|---|---------|--------|----------------|----------------|
| 1 | **Navbar** | Navigasi & CTA awal | `Logo`, `NavLink`, `Button` | Logo Emitra, Menu (Solusi, Fitur, Harga), CTA "Login Demo" |
| 2 | **Hero** | Value proposition & hook | `Headline`, `Subtext`, `ButtonGroup`, `Badge` | "Asuransi Kelanjutan Ekspor Anda", "Otomatisasi CBAM EU", CTA "Lihat Demo" & "Hitung ROI" |
| 3 | **Problem** | Validasi pain point | `Card` (3 kolom) | "Default Value Trap", "Biaya Audit 14% Laba", "Deadline Feb 2027" |
| 4 | **Solution** | Kenalin Emitra | `ImagePlaceholder`, `TextBlock` | "Dari Dokumen Kertas → XML EU Registry dalam hitungan jam" |
| 5 | **How It Works** | Edukasi alur sistem | `StepCard` (5 langkah) | Upload → OCR → Validasi → Kalkulasi → XML |
| 6 | **Features** | Highlight kapabilitas | `FeatureGrid`, `Icon` | AI OCR, Deterministic Engine, HITL, Audit Trail |
| 7 | **Stats** | Social proof & urgensi | `Counter` (4 kolom) | 1.500+ Eksportir, $757.7M Ekspor, 67% Hemat, Feb 2027 |
| 8 | **Testimonials** | Kepercayaan B2B | `TestimonialCard` | Quote dari Plant Manager & CFO eksportir |
| 9 | **Pricing** | Transparansi biaya | `PricingCard` (2 tier) | Basic (30+50jt) vs Pro (50+80jt), highlight ROI |
| 10 | **FAQ** | Handle objection | `Accordion` | "Bedanya sama Excel?", "Aman gak datanya?" |
| 11 | **Final CTA** | Konversi akhir | `Banner`, `Button` | "Amankan kontrak Eropa Anda sekarang" |
| 12 | **Footer** | Legal & kontak | `LinkList`, `Logo` | Copyright, Privacy Policy, Kontak, Alamat |

## 2. Mock Data untuk Landing Page

```typescript
// src/data/landing.ts
export const stats = [
  { value: "1.500+", label: "Eksportir Terdampak" },
  { value: "USD 757,7 Jt", label: "Nilai Ekspor Terancam" },
  { value: "67%", label: "Hemat Biaya Kepatuhan" },
  { value: "Feb 2027", label: "Deadline Sertifikat EU" },
];

export const testimonials = [
  {
    name: "Budi Santoso", role: "Plant Manager", company: "PT Baja Nusantara Prima",
    quote: "Emitra memangkas waktu pelaporan CBAM dari 3 minggu menjadi 2 hari. Audit trail-nya bikin verifikator EU langsung ACC.",
    result: "Hemat 120 jam kerja/tahun", avatar: "BS"
  },
  {
    name: "Siti Aminah", role: "CFO", company: "CV Logam Mulia Sejahtera",
    quote: "Biaya konsultan lingkungan kami turun 67% di tahun kedua. ROI-nya terasa banget di margin bersih pabrik.",
    result: "Hemat IDR 135 Juta/tahun", avatar: "SA"
  },
  {
    name: "Hendra Wijaya", role: "Export Director", company: "PT Cilegon Steel Works",
    quote: "Buyer Jerman kami minta data emisi real-time. Emitra satu-satunya tools lokal yang output XML-nya langsung accepted EU Registry.",
    result: "Kontrak Eropa aman 3 tahun", avatar: "HW"
  }
];

export const partners = [
  { name: "IISIA", label: "Indonesian Iron & Steel Industry Association" },
  { name: "KADIN", label: "Kamar Dagang dan Industri Indonesia" },
  { name: "ALFI", label: "Asosiasi Logam dan Mesin Indonesia" }
];

export const team = [
  { name: "Imeldya", role: "CEO", avatar: "IM", desc: "B2B Strategy & Partnerships" },
  { name: "Dex Bennett", role: "CTO", avatar: "DB", desc: "AI/ML Architecture & Cloud" },
  { name: "Adriel", role: "CFO", avatar: "AD", desc: "Financial Modeling & Pricing" },
  { name: "Keren Tiara", role: "CMO", avatar: "KT", desc: "Market Research & GTM" }
];
```

## 3. Landing Page Component Tree

```tsx
// App.tsx
<Navbar />
<main>
  <Hero />
  <ProblemSection />
  <SolutionSection />
  <HowItWorks /> {/* 5 Step Cards */}
  <FeaturesGrid /> {/* 4 Feature Cards */}
  <StatsCounter /> {/* Animated numbers */}
  <PartnersLogo /> {/* Grayscale SVGs */}
  <Testimonials /> {/* 3 Cards */}
  <PricingTable /> {/* 2 Tiers */}
  <FAQAccordion /> {/* 5 Items */}
  <FinalCTA />
</main>
<Footer />
```

**Props & States Kunci:**
- `<Button variant="primary" | "ghost" size="sm" | "md" />`
- `<Card hover={true} glow={false} />`
- `<Counter target={number} duration={2000} />` (State: `currentValue`, trigger on `isInView`)
- `<AccordionItem isOpen={boolean} onToggle={fn} />`

## 4. Technical Implementation Notes

**Theme & Tokens (Tailwind):**
```js
// tailwind.config.js
colors: {
  bg: '#09090b', // zinc-950
  card: '#18181b', // zinc-900
  border: '#27272a', // zinc-800
  primary: '#34d399', // emerald-400 (Green/Sustainability)
  secondary: '#22d3ee', // cyan-400 (Tech/AI)
}
```

**Animasi (Zero Dependency `useInView` Hook):**
```tsx
// hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';
export function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isInView };
}

// Usage di komponen:
const { ref, isInView } = useInView();
<div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
```

**Responsive Breakpoints:**
- Mobile First: Default `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`.
- Navbar: Hidden menu di mobile (`md:flex`), hamburger icon.

## 5. 7 Screenshots untuk Slide Presentasi

1. **Hero Section (Landing Page)**
   - *Angle:* Full width, fokus ke headline & CTA button.
   - *Caption:* "Landing page Emitra — positioning sebagai 'Asuransi Kelanjutan Ekspor'."
2. **How It Works (Arsitektur 5 Layer)**
   - *Angle:* Horizontal scroll/flowchart dari Upload sampai XML.
   - *Caption:* "5-layer architecture: Dari dokumen kertas ke XML EU Registry dalam hitungan jam."
3. **Upload & OCR Processing (Internal App)**
   - *Angle:* Drag & drop zone dengan progress bar "AI OCR Processing 85%".
   - *Caption:* "AI OCR otomatis ekstrak data dari invoice PLN & BBM tanpa input manual."
4. **HITL Validation (Internal App)**
   - *Angle:* Split screen (Kiri: gambar invoice, Kanan: form terisi + confidence score 94%).
   - *Caption:* "Human-in-the-Loop: Koreksi 3 detik jika confidence score < 90%."
5. **Emission Calculation (Internal App)**
   - *Angle:* Big numbers Scope 1 & 2, formula EU methodology, embedded emission per ton.
   - *Caption:* "Deterministic engine: 100% auditable mengikuti metodologi resmi EU."
6. **CBAM Report & XML Export (Internal App)**
   - *Angle:* Tombol "Download XML (EU Registry)" dengan badge "Schema Validated".
   - *Caption:* "Satu klik generate XML siap submit ke EU Customs Registry."
7. **ROI & Savings Dashboard (Internal App)**
   - *Angle:* Bar chart perbandingan biaya (Manual 200jt vs Emitra 65jt) + badge "67% Savings".
   - *Caption:* "ROI nyata: Hemat 67% biaya kepatuhan mulai tahun kedua."

---

**1 insight actionable buat Dex:**
"Pastikan `Navbar` di landing page punya tombol 'Login Demo' yang langsung nge-link ke halaman internal `/dashboard`. Juri harus bisa ngerasain transisi mulus dari 'marketing site' ke 'product demo' tanpa break immersion. Gunakan design token yang sama persis (zinc-950, emerald-400) biar terasa satu ekosistem."