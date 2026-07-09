# <picture><source media="(prefers-color-scheme: dark)" srcset="https://emitra-app.vercel.app/logo-white.svg"><img alt="Emitra" src="https://emitra-app.vercel.app/logo.svg" height="40"></picture> Emitra

### AI-Powered Carbon Compliance & Export Intelligence

**Emitra** is an AI-native SaaS platform purpose-built for Indonesian SME exporters facing the EU Carbon Border Adjustment Mechanism (CBAM). It converts raw factory documents — invoices, PLN electricity bills, BBM logs, production reports — into EU-registry-ready XML declarations with full audit trail transparency.

[**Visit Live Demo →**](https://emitra-app.vercel.app)

---

## The Problem

The EU Carbon Border Adjustment Mechanism (CBAM) imposes a financial penalty on imported goods whose embedded emissions cannot be verified. Starting **February 2027**, EU importers must purchase CBAM certificates for every ton of CO₂ embedded in imported steel, aluminum, cement, and fertilizers.

**What this means for Indonesia:**

| Metric | Value |
| :--- | :--- |
| CBAM-affected exports | **USD 757.7 million** |
| Affected enterprises | **1,500–2,000 exporters** |
| Certificate cost (2034 full enforcement) | **€383 million national burden** |
| Manual audit cost per year (typical) | **IDR 150–250 million** |

Existing global solutions (Persefoni, Watershed) are priced at USD 15,000–80,000/year and assume mature ERP infrastructure that Tier-2/3 Indonesian manufacturers do not possess. Local platforms focus on voluntary domestic carbon markets and lack CBAM-specific technical output.

Emitra closes this gap.

## The Solution

Emitra automates the full CBAM compliance cycle in five steps:

```
📄 Upload → 🤖 AI OCR → ✅ HITL Validation → 🧮 Deterministic Calc → 📤 XML Generate
```

| Feature | What It Does |
| :--- | :--- |
| **Upload Sekali** | Accepts invoices, PLN bills, BBM logs, production reports — no special format needed |
| **AI OCR Otomatis** | LayoutLM extracts data from dirty thermal paper, faded scans, crumpled receipts |
| **Validasi HITL** | Human-in-the-Loop side-by-side correction when confidence < 90% — 3 seconds per field |
| **Kalkulasi Deterministik** | 100% auditable emission math following official EU CBAM methodology — not an AI black box |
| **XML Siap EU Registry** | One-click generate CBAM-compliant XML accepted directly by EU Customs |
| **Audit Trail** | Every number traceable to source document — who, when, old value, new value |

## Why Emitra Wins

- **67% cost savings** vs. manual environmental audit consultants
- **80% reduction** in manual data entry through AI automation
- **3 days → 2 hours** — reporting cycle compressed from weeks to minutes
- **CBAM-native** — not a generic ESG tool retrofitted for compliance

## Product Demo

The demo frontend (built with React 18 + TypeScript + Tailwind CSS) showcases the complete user journey:

| View | Function |
| :--- | :--- |
| **Dashboard** | Company overview, export stats, CO₂ metrics |
| **Upload** | Drag-drop document ingestion with real-time progress |
| **Validate** | HITL split-screen — AI extraction vs. manual correction |
| **Calculate** | Emission breakdown by scope, cost comparison (manual vs. Emitra) |
| **Report** | XML generation, download, full audit trail modal |

## Business Model

| Tier | Setup Fee | Annual Subscription | Target |
| :--- | :--- | :--- | :--- |
| **Basic** | IDR 30 million | IDR 50 million/year | Standard CBAM compliance |
| **Pro** | IDR 50 million | IDR 80 million/year | Advanced analytics + API |
| **Enterprise** | Custom | Custom | Multi-site, dedicated support |

## Market Opportunity

- **SAM:** 3,200 CBAM-exposed entities across Indonesia
- **TAM:** USD 1.2 billion — all heavy industrial exporters across Southeast Asia
- **SOM:** 100 client sites by Year 3 → 320 cumulative by Year 5 (regional ASEAN)

## Team

| Role | Name |
| :--- | :--- |
| **CEO** | Imeldya — B2B Strategy & Partnerships |
| **CTO** | Dex Bennett — AI/ML Architecture & Cloud |
| **CFO** | Adriel — Financial Modeling & Pricing |
| **CMO** | Keren Tiara — Market Research & Go-to-Market |

## Partners

| Organization | Role |
| :--- | :--- |
| **IISIA** | Indonesian Iron & Steel Industry Association |
| **KADIN** | Chamber of Commerce and Industry of Indonesia |
| **ALFI** | Indonesian Metal & Machinery Association |

## Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Infrastructure** | Vercel (edge-deployed) |
| **AI Engine** | LayoutLM (document OCR), deterministic calculation engine |

## Competition

Proud participant of **BMC #12 — International Business Plan Competition**
- **Theme:** Innovating Global Business Strategies for a Sustainable Future
- **Category:** Sustainable Business & Green Innovation
- **Host:** Universitas Kristen Duta Wacana

---

*"Ekspor ke Eropa Tetap Jalan. Urusan CBAM, Serahkan ke Emitra."*

[**Live Demo →**](https://emitra-app.vercel.app) | [**GitHub →**](https://github.com/Stylenecy/emitra)
