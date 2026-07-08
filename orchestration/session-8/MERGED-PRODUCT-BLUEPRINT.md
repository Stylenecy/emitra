# MERGED PRODUCT BLUEPRINT — EMITRA
## Session 8: Branding + PRD + Architecture + Roadmap
### Disintesis dari: ChatGPT · Gemini · Grok · Qwen | 7 Jul 2026

---

## A. BRAND IDENTITY (ChatGPT)

### Logo: Concept A — Geometric (Recommended)
Hexagon (karbon) + upward arrow (growth). Emerald + Navy.

### Color Palette
| Usage | Color | Hex |
|-------|-------|-----|
| Primary | Emerald | `#0A8754` |
| Secondary | Navy | `#1A2E4A` |
| Accent | Amber | `#F5A623` |
| Background | Light Gray | `#F5F7FA` |

### Brand Voice
Professional, urgent-but-calm, Indonesian pride, data-driven.

### Tagline Primary
*"Navigating CBAM, Empowering Exporters"*

---

## B. PRODUCT REQUIREMENTS (Gemini)

### MVP Features (5 Pages for Demo)

| View | Priority | Description |
|------|----------|-------------|
| Dashboard | P0 | Overview stats, compliance status |
| Upload | P0 | Drag-drop factory docs |
| Validate (HITL) | P0 | Split-screen review + correction |
| Calculate | P0 | EU methodology emission calc |
| Report | P0 | XML preview + audit trail |

### System Architecture

```
Upload → OCR (LayoutLM) → HITL Validation → Deterministic Calc → XML Export
                                        ↓
                                  Audit Trail
```

### Tech Stack
| Layer | Choice |
|-------|--------|
| Frontend | Vite + React 18 + TS + Tailwind |
| Backend | Node.js/Express or Python/FastAPI |
| DB | PostgreSQL |
| AI | LayoutLM v3 (HuggingFace) |
| Deploy | Vercel (FE), Railway/Render (BE) |

---

## C. DATA MODEL (Grok)

### Core Entities
- **Company** → Documents (1:N)
- **Document** → ExtractionFields (1:N)
- **Company** → EmissionReports (1:N)
- **EmissionReport** → CalculatorInputs (1:N)
- **EmissionReport** → AuditLogs (1:N)

### Audit Trail: Every data change logged (who, what, when, old/new value)

---

## D. ROADMAP & DEMO (Qwen)

### 4-Phase Roadmap
| Phase | Timeline | Focus |
|-------|----------|-------|
| Phase 1 | Jul–Dec 2026 | Mock prototype + Grand Final demo |
| Phase 2 | Jan–Jun 2027 | MVP launch + pilot clients |
| Phase 3 | 2028–2029 | 100 clients + Green Financing |
| Phase 4 | 2030+ | ASEAN expansion (320 clients) |

### Demo Script (3 menit — Grand Final 20 Aug)
1. Dashboard → Upload → HITL → Calculate → XML → Audit Trail
2. Fallback: recorded video (YouTube unlisted)

### Qwen's Tips
- Mock data harus realistis (nama pabrik beneran)
- Siapkan "error scenario" (dokumen robek → HITL koreksi)
- Jangan tunjukkin raw XML — tunjukkin preview
- Timing hook: "Upload ke XML: 2 menit. Manual: 2 minggu."

---

## E. IMPLEMENTASI FRONTEND PRIORITAS

| # | Task | File |
|---|------|------|
| 1 | Routing (React Router) | App.tsx |
| 2 | Dashboard view | views/Dashboard.tsx |
| 3 | Document Upload view | views/ (baru) |
| 4 | HITL Validate view | views/ (baru) |
| 5 | Calculate view | views/ (baru) |
| 6 | Report view | views/ComplianceReport.tsx |
| 7 | Deploy to Vercel | — |

---

*Referensi lengkap ada di orchestration/session-8/ masing-masing AI.*
