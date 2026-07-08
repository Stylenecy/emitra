# Gemini — Product Requirements Document & System Architecture
## Session 8 Emitra | PRD + Architecture | 7 Jul 2026

---

## PRD: Feature Specifications

### MVP Features (Phase 1 — Grand Final Demo)

| Feature | Priority | Description | User Story |
|---------|----------|-------------|------------|
| Document Upload | P0 | Upload factory docs (PDF, JPG, PNG) via drag-drop | "Sebagai admin pabrik, saya bisa upload dokumen produksi dan energi" |
| AI OCR Extraction | P0 | Extract structured data from unstructured docs | "Saya ingin data dari dokumen di-ekstrak otomatis" |
| HITL Validation | P0 | Review & correct AI-extracted data | "Saya bisa koreksi kalau AI salah baca angka" |
| Emission Calculator | P0 | Calculate CBAM emissions using EU methodology | "Saya ingin lihat emisi per ton produk saya" |
| XML Export | P0 | Generate CBAM-compliant XML | "Saya bisa download file XML siap submit ke EU" |
| Audit Trail | P0 | Record every data change with timestamp | "Saya perlu track siapa ubah apa dan kapan" |
| Dashboard | P0 | Overview stats: emissions saved, reports, status | "Saya mau lihat status kepatuhan di satu layar" |

### Post-MVP (Phase 2-3)

| Feature | Phase | Description |
|---------|-------|-------------|
| Multi-factory dashboard | P1 | Consolidated view for enterprises |
| API integration | P1 | Connect to Jurnal.id, Accurate, PLN API |
| Green Financing Gateway | P2 | KUR Hijau matching with BUMN banks |
| Scope 3 module | P3 | Supply chain emissions |
| ASEAN expansion | P3 | Vietnam & Malaysia regulation adapters |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      EMITRA PLATFORM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │
│  │ UPLOAD   │  │  OCR     │  │ VALIDATE │  │  CALCULATE   │ │
│  │ LAYER    │→│  ENGINE  │→│  (HITL)  │→│  ENGINE      │ │
│  │ (docs)   │  │(LayoutLM)│  │(human-in │  │(EU method)   │ │
│  │          │  │          │  │-loop)    │  │              │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────┬───────┘ │
│                                                    │         │
│                                           ┌────────▼───────┐ │
│                                           │  XML GENERATOR  │ │
│                                           │  (CBAM format)  │ │
│                                           └────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              AUDIT TRAIL (every operation logged)      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **OCR Model** | LayoutLM v3 | Best for structured document understanding (invoices, manifests) |
| **Calc Engine** | Deterministic (not AI) | Auditability — every number traceable to formula |
| **Storage** | Per-tenant isolation | Security — UU PDP compliance |
| **Auth** | JWT + RBAC | Row-level access per factory |

---

## Tech Stack Recommendation

| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React 18 + TypeScript + Tailwind CSS |
| Backend | Node.js (Express) or Python (FastAPI) |
| DB | PostgreSQL |
| AI | LayoutLM v3 (HuggingFace) |
| Deployment | Vercel (FE) + Railway/Render (BE) |
| Storage | AWS S3 / Cloudflare R2 |

---

## Status
✅ PRD + Architecture — siap implementasi
