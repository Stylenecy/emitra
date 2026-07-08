# Grok — Data Flow Diagrams & Entity Relationship Diagram
## Session 8 Emitra | DFD + ERD | 7 Jul 2026

---

## DFD Level 0 (Context Diagram)

```
┌──────────┐     Upload Dokumen     ┌────────────────────┐
│          │───────────────────────→│                    │
│  Admin   │                        │                    │
│  Pabrik  │←──────────────────────│      EMITRA        │
│          │  Validation Results    │      SYSTEM        │
└──────────┘                        │                    │
                                    │                    │
┌──────────┐     CBAM XML Report    │                    │
│   EU     │←──────────────────────│                    │
│ Registry │                        └────────────────────┘
└──────────┘

External Entities: Admin Pabrik, EU Registry
Data Store: Emitra Database
```

---

## DFD Level 1

```
                    ┌─────────────────────┐
                    │   1.0 UPLOAD &      │
   Dokumen          │   PREPROCESS        │
───Raw─────────────→│                     │
                    │  File validation,    │
                    │  format detection,   │
                    │  page splitting      │
                    └─────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   2.0 OCR ENGINE     │
                    │                     │
                    │  LayoutLM ekstraksi, │
                    │  field mapping,     │
                    │  confidence scoring  │
                    └─────────┬───────────┘
                              │
                    ┌─────────▼───────────┐
                    │                     │
                    │   Confidence ≥ 90%?  │
                    │                     │
                    └───┬─────────────┬───┘
                   YES  │             │  NO
                        ▼             ▼
              ┌─────────────────┐  ┌─────────────────┐
              │  3.0 AUTO-PASS   │  │  3.1 HITL UI    │
              │                 │  │                 │
              │  Skip to calc   │  │  Admin koreksi  │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
                       └─────┬──────────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │   4.0 CALCULATION    │
                   │                     │
                   │  EU methodology,    │
                   │  CBAM formula,      │
                   │  unit conversion    │
                   └─────────┬───────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │   5.0 XML EXPORT     │
                   │                     │
                   │  CBAM schema,       │
                   │  digital signature, │
                   │  audit trail append │
                   └─────────────────────┘
```

---

## ERD (Entity Relationship)

```
┌──────────────────┐       ┌──────────────────────┐
│     Company      │       │       Document        │
├──────────────────┤       ├──────────────────────┤
│ id (PK)          │1──→many│ id (PK)               │
│ name             │       │ company_id (FK)        │
│ industry_type    │       │ filename               │
│ address          │       │ file_type              │
│ plant_location   │       │ upload_date            │
│ eu_export_value  │       │ ocr_status             │
│ subscription_tier│       │ confidence_score       │
│ created_at       │       └──────────┬──────────────┘
└──────────────────┘                  │
      1                               │
      │                               │
      │ many                          │
      ▼                               ▼
┌──────────────────┐       ┌──────────────────────┐
│    Emission      │       │    ExtractionField    │
│    Report        │       ├──────────────────────┤
├──────────────────┤       │ id (PK)               │
│ id (PK)          │       │ document_id (FK)      │
│ company_id (FK)  │       │ field_name            │
│ period_start     │       │ extracted_value       │
│ period_end       │       │ corrected_value       │
│ total_emissions  │       │ confidence            │
│ methodology_ver  │       │ corrected_by          │
│ xml_export_url   │       │ corrected_at          │
│ status           │       └──────────────────────┘
│ created_at       │                │
│ audited_by       │                │
└──────────────────┘                │
      1                            many
      │                             │
      │ many                        │
      ▼                             ▼
┌──────────────────┐       ┌──────────────────────┐
│   AuditLog       │       │   CalculatorInput     │
├──────────────────┤       ├──────────────────────┤
│ id (PK)          │       │ id (PK)               │
│ report_id (FK)   │       │ report_id (FK)        │
│ action_type      │       │ production_volume     │
│ user_id          │       │ energy_consumption     │
│ timestamp        │       │ emission_factor       │
│ old_value        │       │ calculated_emission    │
│ new_value        │       │ calculation_method     │
│ metadata (JSON)  │       └──────────────────────┘
└──────────────────┘
```

---

## Key Relationships

| Entity | Relates To | Type | Business Rule |
|--------|-----------|------|--------------|
| Company → Document | One-to-Many | 1:N | Satu perusahaan bisa upload banyak dokumen |
| Document → ExtractionField | One-to-Many | 1:N | Satu dokumen punya banyak field yang diekstrak |
| Company → EmissionReport | One-to-Many | 1:N | Satu perusahaan punya banyak report periodik |
| EmissionReport → CalculatorInput | One-to-Many | 1:N | Satu report punya banyak kalkulasi per produk |
| EmissionReport → AuditLog | One-to-Many | 1:N | Setiap perubahan di report tercatat |

---

## Status
✅ DFD Level 0 & 1 — ERD dengan relasi — ready for database schema
