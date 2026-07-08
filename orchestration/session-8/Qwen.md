# Qwen — Roadmap & Grand Final Demo Strategy
## Session 8 Emitra | Roadmap + Demo | 7 Jul 2026

---

## Phased Roadmap

### Phase 1: Foundation (Jul–Dec 2026) — Grand Final Demo Scope
| Item | Detail |
|------|--------|
| **Target** | Functional prototype with mock data |
| **Demo Scope** | 5 halaman: Dashboard, Upload, Validate, Calculate, Report |
| **Data** | Mock only — no real backend/OCR |
| **Deploy** | Vercel (free tier) for credibility |
| **Fitur** | Document upload UI, HITL split-screen, emission calc, XML preview, audit trail |

### Phase 2: MVP Launch (Jan–Jun 2027)
| Item | Detail |
|------|--------|
| **Backend** | Node.js/Python + PostgreSQL |
| **AI Pipeline** | LayoutLM v3 OCR integration |
| **Integrations** | Jurnal.id, Accurate Online, PLN API |
| **Pilot** | 5 free pilot clients via IISIA |
| **Pricing** | Basic (30jt + 50jt/yr) & Pro (50jt + 80jt/yr) |

### Phase 3: Growth (2028–2029)
| Item | Detail |
|------|--------|
| **Scope 3** | Supply chain emission tracking |
| **Green Financing** | KUR Hijau with Mandiri/BNI |
| **Target** | 100 clients (Indonesia) |

### Phase 4: Regional (2030+)
| Item | Detail |
|------|--------|
| **Expansion** | Vietnam, Malaysia, Thailand |
| **Target** | 320 cumulative clients |
| **Product** | Local CBAM adapter per country |

---

## Grand Final Demo Strategy (20 Aug 2026)

### Demo Format
- **15 menit presentasi + 5 menit Q&A** — via Zoom
- **3-4 menit** untuk live demo aplikasi

### Demo Script (3 Menit)

| Waktu | Slide / Aksi | Pembicara |
|-------|-------------|-----------|
| 0:00-0:30 | Dashboard: lihat stats emisi, compliance status | Dex |
| 0:30-1:00 | Upload dokumen: drag-drop file factory | Dex |
| 1:00-1:30 | HITL: AI confidence 85% → koreksi manual | Dex |
| 1:30-2:00 | Kalkulasi: lihat perhitungan emisi EU method | Dex |
| 2:00-2:30 | XML: generate & preview file siap EU | Dex |
| 2:30-3:00 | Audit trail: bukti tiap angka tercatat | Dex |

### Fallback Plan
- **Backup recording:** Record 2-3 menit video demo — upload ke YouTube unlisted
- **Kalau screen share error:** Play video, presenter voice-over
- **Screenshot slides di PPT** — sebagai cadangan terakhir

### Tips Qwen untuk Demo

1. **Mock data harus realistis** — nama pabrik beneran (PT XYZ Cilegon), angka masuk akal
2. **Demo flow linear** — jangan lompat-lompat, juri bisa bingung
3. **Siapkan "error scenario"** — tunjukkin HITL: "Ini dokumennya robek, AI cuma 85% yakin, admin koreksi 3 detik" — ini yang bikin kredibel
4. **Highlight timing** — "Dari upload ke XML siap: 2 menit. Manual: 2 minggu."
5. **XML visual** — jangan tunjukkin raw XML, tunjukkin preview yang sudah di-render

---

## UI/UX Notes untuk Frontend

| Halaman | Elemen Kunci |
|---------|-------------|
| **Dashboard** | 4 stat cards + recent reports table + compliance status chart |
| **Upload** | Drag-drop zone + file list + progress per file |
| **Validate** | Split-screen (AI extracted vs document scan) + field-by-field correction |
| **Calculate** | Emission breakdown per product + methodology selector + visualization |
| **Report** | XML preview + download button + audit trail timeline |

---

## Status
✅ Roadmap 4 fase — Demo script Grand Final — siap eksekusi
